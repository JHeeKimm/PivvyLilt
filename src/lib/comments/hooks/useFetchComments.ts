import { useQuery } from "@tanstack/react-query";
import { COMMENT_KEY } from "../keys";

export const useFetchComments = (postId: string) => {
  return useQuery({
    queryKey: [COMMENT_KEY, postId],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${postId}/comments`, {
        cache: "no-store",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }

      const result = await res.json();
      return result;
    },
  });
};
