import { useMutation, useQuery } from "@tanstack/react-query";
import { createApiRequest, queryClient } from "@/lib/api/config";

const keys = {
  all: ["categories"],
  lists: () => [...keys.all, "list"],
  list: (filters) => [...keys.lists(), { filters }],
  details: () => [...keys.all, "detail"],
  detail: (id) => [...keys.details(), id],
};

const categoriesApi = {
  // Direct API methods
  getAll: () => createApiRequest({ path: "/categories" }),

  getById: (id) => createApiRequest({ path: `/categories/${id}` }),

  create: (data) =>
    createApiRequest({
      path: "/categories",
      method: "POST",
      body: data,
    }),

  update: (id, data) =>
    createApiRequest({
      path: `/categories/${id}`,
      method: "PUT",
      body: data,
    }),

  delete: (id) =>
    createApiRequest({
      path: `/categories/${id}`,
      method: "DELETE",
    }),

  // React Query hooks
  useList: (options = {}) =>
    useQuery({
      queryKey: keys.lists(),
      queryFn: categoriesApi.getAll,
      ...options,
    }),

  useOne: (id, options = {}) =>
    useQuery({
      queryKey: keys.detail(id),
      queryFn: () => categoriesApi.getById(id),
      enabled: !!id,
      ...options,
    }),

  useCreate: (options = {}) =>
    useMutation({
      mutationFn: categoriesApi.create,
      onSuccess: () => {
        queryClient.invalidateQueries(keys.lists());
      },
      ...options,
    }),

  useUpdate: (id, options = {}) =>
    useMutation({
      mutationFn: (data) => categoriesApi.update(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries(keys.detail(id));
        queryClient.invalidateQueries(keys.lists());
      },
      ...options,
    }),

  useDelete: (options = {}) =>
    useMutation({
      mutationFn: categoriesApi.delete,
      onSuccess: (_, id) => {
        queryClient.invalidateQueries(keys.lists());
        queryClient.removeQueries(keys.detail(id));
      },
      ...options,
    }),
};

export default categoriesApi;
