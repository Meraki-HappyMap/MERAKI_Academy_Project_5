import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
      retry: 1,
      refetchOnMount: true,
    },
  },
});

export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const defaultConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

// API response handler with success/error structure matching backend
export const handleApiResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data.data; // Backend always returns data inside a data property
};

// Create API request with auth
export const createApiRequest = async ({
  path,
  method = "GET",
  body,
  config = {},
}) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...defaultConfig.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
    ...config.headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...config,
  });

  return handleApiResponse(response);
};

// Query key factory
export const createQueryKey = (base, params) => {
  if (!params) return [base];
  return [base, ...(Array.isArray(params) ? params : [params])];
};
