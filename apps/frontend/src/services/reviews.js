import { useMutation, useQuery } from "@tanstack/react-query";
import { createApiRequest, queryClient } from "@/lib/api/config";

const keys = {
  all: ["reviews"],
  lists: () => [...keys.all, "list"],
  list: (filters) => [...keys.lists(), { filters }],
  details: () => [...keys.all, "detail"],
  detail: (id) => [...keys.details(), id],
  place: (placeId) => [...keys.all, "place", placeId],
  user: () => [...keys.all, "user"],
};

const reviewsApi = {
  // Direct API methods
  getAll: (params) =>
    createApiRequest({ path: "/reviews", config: { params } }),

  getPlaceReviews: (placeId) =>
    createApiRequest({ path: `/places/${placeId}/reviews` }),

  getUserReviews: () => createApiRequest({ path: "/reviews/user" }),

  create: (data) =>
    createApiRequest({
      path: "/reviews",
      method: "POST",
      body: data,
    }),

  update: (id, data) =>
    createApiRequest({
      path: `/reviews/${id}`,
      method: "PUT",
      body: data,
    }),

  delete: (id) =>
    createApiRequest({
      path: `/reviews/${id}`,
      method: "DELETE",
    }),

  // React Query hooks
  useList: (params, options = {}) =>
    useQuery({
      queryKey: keys.list(params),
      queryFn: () => reviewsApi.getAll(params),
      ...options,
    }),

  usePlaceReviews: (placeId, options = {}) =>
    useQuery({
      queryKey: keys.place(placeId),
      queryFn: () => reviewsApi.getPlaceReviews(placeId),
      enabled: !!placeId,
      ...options,
    }),

  useUserReviews: (options = {}) =>
    useQuery({
      queryKey: keys.user(),
      queryFn: reviewsApi.getUserReviews,
      ...options,
    }),

  useCreate: (options = {}) =>
    useMutation({
      mutationFn: reviewsApi.create,
      onSuccess: (_, { placeId }) => {
        queryClient.invalidateQueries(keys.place(placeId));
        queryClient.invalidateQueries(keys.user());
      },
      ...options,
    }),

  useUpdate: (id, options = {}) =>
    useMutation({
      mutationFn: (data) => reviewsApi.update(id, data),
      onSuccess: (_, { placeId }) => {
        queryClient.invalidateQueries(keys.place(placeId));
        queryClient.invalidateQueries(keys.user());
        queryClient.invalidateQueries(keys.detail(id));
      },
      ...options,
    }),

  useDelete: (options = {}) =>
    useMutation({
      mutationFn: reviewsApi.delete,
      onSuccess: (_, { id, placeId }) => {
        queryClient.invalidateQueries(keys.place(placeId));
        queryClient.invalidateQueries(keys.user());
        queryClient.removeQueries(keys.detail(id));
      },
      ...options,
    }),
};

export default reviewsApi;
