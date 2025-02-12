import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "../key";

export const useFetchPost = (postId: string) => {
  const { queryKey: fetchPostKey, queryFn: fetchPostFn } =
    queryOptions.post(postId);
  return useQuery({
    queryKey: fetchPostKey,
    queryFn: fetchPostFn,
    enabled: !!postId,
  });
};
