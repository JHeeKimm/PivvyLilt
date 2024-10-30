import { useQuery } from "@tanstack/react-query";
import { POST_KEY } from "../key";

export const useFetchPosts = () => {
  return useQuery({
    queryKey: [POST_KEY],
    queryFn: async () => {
      const res = await fetch(`/api/posts`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const result = await res.json();
      return result.posts || [];
    },
  });
};
