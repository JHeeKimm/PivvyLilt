import { useInfiniteQuery } from "@tanstack/react-query";
import { POST_KEY } from "../key";
import { customFetchServer } from "@/lib/fetch/server";
import { FetchPostsResponse } from "../types";

export const useFetchPosts = (userId: string) => {
  return useInfiniteQuery<FetchPostsResponse>({
    queryKey: [POST_KEY, userId],
    queryFn: async ({ pageParam = 1 }) => {
      // 무한 스크롤: 클라이언트에서 쿼리 파라미터 전달
      const response = await customFetchServer<FetchPostsResponse>({
        endpoint: `/api/posts?page=${pageParam}`,
      });
      if (!response) {
        return { posts: [], nextPage: undefined };
      }
      console.log("useFetchPosts response", response);
      return response;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
