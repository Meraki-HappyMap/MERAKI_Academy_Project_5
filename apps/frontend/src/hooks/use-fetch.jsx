import { useToast } from "@/hooks/use-toast";

export const useFetch = () => {
  const { toast } = useToast();

  const fetchData = async (path, method = "GET", body, options) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}${path}`,
        {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("tokenFallback")}`,
          },
          body: body ? JSON.stringify(body) : null,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Something went wrong");
      }

      return response;
    } catch (error) {
      // Show toast by default unless explicitly disabled
      if (options?.showErrorToast !== false) {
        toast({
          variant: "destructive",
          title: "Oopsie!",
          description: `${error}`,
        });
      }
      throw error;
    }
  };

  return { fetchData };
};
