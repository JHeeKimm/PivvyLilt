import { useInfiniteQuery } from "@tanstack/react-query";
import { POST_KEY } from "../key";

export const useFetchPosts = (userId: string) => {
  return useInfiniteQuery({
    queryKey: [POST_KEY, userId],
    queryFn: async ({ pageParam = 1 }) => {
      // 무한 스크롤: 클라이언트에서 쿼리 파라미터 전달
      const res = await fetch(`/api/posts?page=${pageParam}`, {
        headers: {
          "Content-Type": "application/json",
          "user-id": userId, // userId를 헤더로 전달
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const result = await res.json();
      return result;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
