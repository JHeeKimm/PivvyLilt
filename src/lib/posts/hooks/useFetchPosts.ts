import { useInfiniteQuery } from "@tanstack/react-query";
import { queryOptions } from "../key";

export const useFetchPosts = () => {
  const { queryKey: fetchPostsKey, queryFn: fetchPostsFn } =
    queryOptions.posts();

  return useInfiniteQuery({
    queryKey: fetchPostsKey,
    queryFn: fetchPostsFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};
