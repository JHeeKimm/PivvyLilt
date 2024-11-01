import { useInfiniteQuery } from "@tanstack/react-query";
import { COMMENT_KEY } from "../keys";

export const useFetchComments = (postId: string) => {
  return useInfiniteQuery({
    queryKey: [COMMENT_KEY, postId],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `/api/posts/${postId}/comments?page=${pageParam}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }

      const result = await res.json();
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
