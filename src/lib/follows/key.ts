import { fetchFollowerCounts, fetchIsFollowing } from "./api";

export const FOLLOWER_KEY = "FOLLOWERS";
export const FOLLOWING_KEY = "FOLLOWING";

export const queryKeys = {
  isFollowing: (followerId: string, followingId: string) => [
    FOLLOWING_KEY,
    followerId,
    followingId,
  ],
  followCounts: (userId: string) => [FOLLOWER_KEY, FOLLOWING_KEY, userId],
};

export const queryOptions = {
  isFollowing: (followerId: string, followingId: string) => ({
    queryKey: queryKeys.isFollowing(followerId, followingId),
    queryFn: () => fetchIsFollowing(followerId, followingId),
  }),
  followCounts: (userId: string) => ({
    queryKey: queryKeys.followCounts(userId),
    queryFn: fetchFollowerCounts,
  }),
};
