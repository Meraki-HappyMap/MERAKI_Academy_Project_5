import { useMutation, useQuery } from "@tanstack/react-query";
import { createApiRequest, queryClient } from "@/lib/api/config";

const keys = {
  all: ["favorites"],
  lists: () => [...keys.all, "list"],
  list: (filters) => [...keys.lists(), { filters }],
  check: (placeId) => [...keys.all, "check", placeId],
};

const favoritesApi = {
  // Direct API methods
  getAll: () => createApiRequest({ path: "/favorites" }),

  add: (placeId) =>
    createApiRequest({
      path: `/favorites/${placeId}`,
      method: "POST",
    }),

  remove: (placeId) =>
    createApiRequest({
      path: `/favorites/${placeId}`,
      method: "DELETE",
    }),

  check: (placeId) => createApiRequest({ path: `/favorites/check/${placeId}` }),

  // React Query hooks
  useList: (options = {}) =>
    useQuery({
      queryKey: keys.lists(),
      queryFn: favoritesApi.getAll,
      ...options,
    }),

  useCheck: (placeId, options = {}) =>
    useQuery({
      queryKey: keys.check(placeId),
      queryFn: () => favoritesApi.check(placeId),
      enabled: !!placeId,
      ...options,
    }),

  useAdd: (options = {}) =>
    useMutation({
      mutationFn: favoritesApi.add,
      onSuccess: (_, placeId) => {
        queryClient.invalidateQueries(keys.lists());
        queryClient.invalidateQueries(keys.check(placeId));
      },
      ...options,
    }),

  useRemove: (options = {}) =>
    useMutation({
      mutationFn: favoritesApi.remove,
      onSuccess: (_, placeId) => {
        queryClient.invalidateQueries(keys.lists());
        queryClient.invalidateQueries(keys.check(placeId));
      },
      ...options,
    }),
};

export default favoritesApi;
