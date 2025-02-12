import { useInfiniteQuery } from "@tanstack/react-query";
import { queryOptions } from "../key";

export const useFetchUserPosts = (userId: string) => {
  const { queryKey: fetchUserPostsKey, queryFn: fetchUserPostsFn } =
    queryOptions.userPosts(userId);

  return useInfiniteQuery({
    queryKey: fetchUserPostsKey,
    queryFn: fetchUserPostsFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!userId,
  });
};
