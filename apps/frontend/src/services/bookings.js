import { useMutation, useQuery } from "@tanstack/react-query";
import { createApiRequest, queryClient } from "@/lib/api/config";

const keys = {
  all: ["bookings"],
  lists: () => [...keys.all, "list"],
  list: (filters) => [...keys.lists(), { filters }],
  details: () => [...keys.all, "detail"],
  detail: (id) => [...keys.details(), id],
  user: () => [...keys.all, "user"],
  place: (placeId) => [...keys.all, "place", placeId],
  availability: (placeId) => [...keys.all, "availability", placeId],
};

const bookingsApi = {
  getUserBookings: () => createApiRequest({ path: "/bookings/user" }),

  getPlaceBookings: (placeId) =>
    createApiRequest({ path: `/places/${placeId}/bookings` }),

  create: (placeId, data) =>
    createApiRequest({
      path: `/places/${placeId}/bookings`,
      method: "POST",
      body: data,
    }),

  update: (bookingId, data) =>
    createApiRequest({
      path: `/bookings/${bookingId}`,
      method: "PUT",
      body: data,
    }),

  cancel: (bookingId) =>
    createApiRequest({
      path: `/bookings/${bookingId}/cancel`,
      method: "POST",
    }),

  checkAvailability: (placeId, data) =>
    createApiRequest({
      path: `/places/${placeId}/bookings/check`,
      method: "POST",
      body: data,
    }),

  // React Query hooks
  useUserBookings: (options = {}) =>
    useQuery({
      queryKey: keys.user(),
      queryFn: bookingsApi.getUserBookings,
      ...options,
    }),

  usePlaceBookings: (placeId, options = {}) =>
    useQuery({
      queryKey: keys.place(placeId),
      queryFn: () => bookingsApi.getPlaceBookings(placeId),
      enabled: !!placeId,
      ...options,
    }),

  useCreate: (placeId, options = {}) =>
    useMutation({
      mutationFn: (data) => bookingsApi.create(placeId, data),
      onSuccess: () => {
        queryClient.invalidateQueries(keys.user());
        queryClient.invalidateQueries(keys.place(placeId));
      },
      ...options,
    }),

  useUpdate: (bookingId, options = {}) =>
    useMutation({
      mutationFn: (data) => bookingsApi.update(bookingId, data),
      onSuccess: () => {
        queryClient.invalidateQueries(keys.user());
        queryClient.invalidateQueries(keys.detail(bookingId));
      },
      ...options,
    }),

  useCancel: (options = {}) =>
    useMutation({
      mutationFn: bookingsApi.cancel,
      onSuccess: (_, bookingId) => {
        queryClient.invalidateQueries(keys.user());
        queryClient.invalidateQueries(keys.detail(bookingId));
      },
      ...options,
    }),

  useCheckAvailability: (placeId, options = {}) =>
    useMutation({
      mutationFn: (data) => bookingsApi.checkAvailability(placeId, data),
      ...options,
    }),
};

export default bookingsApi;
