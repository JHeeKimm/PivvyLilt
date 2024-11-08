import { useQuery } from "@tanstack/react-query";
import { FOLLOWING_KEY } from "../key";

export const useIsFollowingQuery = (
  followerId: string,
  followingId: string
) => {
  return useQuery({
    queryKey: [FOLLOWING_KEY, followerId, followingId],
    queryFn: async () => {
      const response = await fetch(
        `/api/follows/is-following?followerId=${followerId}&followingId=${followingId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch follow status");
      }
      const data = await response.json();
      return data.isFollowing;
    },
  });
};
