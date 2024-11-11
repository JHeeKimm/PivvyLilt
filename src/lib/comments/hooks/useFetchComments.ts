import { useInfiniteQuery } from "@tanstack/react-query";
import { COMMENT_KEY } from "../keys";
import { customFetchServer } from "@/lib/fetch/server";
import { FetchCommentsResponse } from "../types";

export const useFetchComments = (postId: string) => {
  return useInfiniteQuery({
    queryKey: [COMMENT_KEY, postId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await customFetchServer<FetchCommentsResponse>({
        endpoint: `/api/posts/${postId}/comments?page=${pageParam}`,
      });
      if (!response) {
        return { comments: [], nextPage: undefined };
      }
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
