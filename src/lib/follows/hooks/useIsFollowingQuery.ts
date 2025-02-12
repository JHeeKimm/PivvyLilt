import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "../key";

export const useIsFollowingQuery = (
  followerId: string,
  followingId: string
) => {
  const { queryKey: fetchIsFollowingKey, queryFn: fetchIsFollowingFn } =
    queryOptions.isFollowing(followerId, followingId);
  return useQuery({
    queryKey: fetchIsFollowingKey,
    queryFn: fetchIsFollowingFn,
  });
};
