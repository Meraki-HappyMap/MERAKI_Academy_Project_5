import { useMutation, useQuery } from "@tanstack/react-query";
import { createApiRequest, queryClient } from "@/lib/api/config";

// Query keys
const keys = {
  all: ["places"],
  lists: () => [...keys.all, "list"],
  list: (filters) => [...keys.lists(), { filters }],
  details: () => [...keys.all, "detail"],
  detail: (id) => [...keys.details(), id],
  user: (userId) => [...keys.all, "user", userId],
};

const placesApi = {
  // Direct API methods
  getAll: (params) => createApiRequest({ path: "/places", config: { params } }),

  getById: (id) => createApiRequest({ path: `/places/${id}` }),

  getByUser: (userId) => createApiRequest({ path: `/places/user/${userId}` }),

  create: (data) =>
    createApiRequest({
      path: "/places",
      method: "POST",
      body: data,
    }),

  update: (id, data) =>
    createApiRequest({
      path: `/places/${id}`,
      method: "PUT",
      body: data,
    }),

  delete: (id) =>
    createApiRequest({
      path: `/places/${id}`,
      method: "DELETE",
    }),

  // React Query hooks
  useList: (params, options = {}) =>
    useQuery({
      queryKey: keys.list(params),
      queryFn: () => placesApi.getAll(params),
      ...options,
    }),

  useOne: (id, options = {}) =>
    useQuery({
      queryKey: keys.detail(id),
      queryFn: () => placesApi.getById(id),
      enabled: !!id,
      ...options,
    }),

  useUserPlaces: (userId, options = {}) =>
    useQuery({
      queryKey: keys.user(userId),
      queryFn: () => placesApi.getByUser(userId),
      enabled: !!userId,
      ...options,
    }),

  useCreate: (options = {}) =>
    useMutation({
      mutationFn: placesApi.create,
      onSuccess: () => {
        queryClient.invalidateQueries(keys.lists());
      },
      ...options,
    }),

  useUpdate: (id, options = {}) =>
    useMutation({
      mutationFn: (data) => placesApi.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries(keys.detail(id));
        queryClient.invalidateQueries(keys.lists());
      },
      ...options,
    }),

  useDelete: (options = {}) =>
    useMutation({
      mutationFn: placesApi.delete,
      onSuccess: (_, id) => {
        queryClient.invalidateQueries(keys.lists());
        queryClient.removeQueries(keys.detail(id));
      },
      ...options,
    }),
};

export default placesApi;
