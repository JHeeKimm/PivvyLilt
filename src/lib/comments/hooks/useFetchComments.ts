import { useInfiniteQuery } from "@tanstack/react-query";
import { queryOptions } from "../key";

export const useFetchComments = (postId: string) => {
  const { queryKey: fetchCommentKey, queryFn: fetchCommentFn } =
    queryOptions.comments(postId);

  return useInfiniteQuery({
    queryKey: fetchCommentKey,
    queryFn: ({ pageParam = 1 }) => fetchCommentFn(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
