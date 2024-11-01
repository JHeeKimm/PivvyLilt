import { useQuery } from "@tanstack/react-query";
import { POST_KEY } from "../key";

export const useFetchPost = (postId: string) => {
  return useQuery({
    queryKey: [POST_KEY, postId],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${postId}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const result = await res.json();
      return result.post;
    },
    enabled: !!postId,
  });
};
