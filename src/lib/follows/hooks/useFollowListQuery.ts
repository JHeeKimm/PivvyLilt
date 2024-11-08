import { useQuery } from "@tanstack/react-query";
import { FOLLOWER_KEY, FOLLOWING_KEY } from "../key";

export const useFollowListQuery = (userId: string, type: string) => {
  // type이 'followers' 또는 'following'인지 확인
  if (![FOLLOWER_KEY, FOLLOWING_KEY].includes(type)) {
    throw new Error("Type must be either 'followers' or 'following'");
  }

  return useQuery({
    queryKey: [type, userId],
    queryFn: async () => {
      const response = await fetch(`/api/follows?type=${type}`, {
        headers: { "Content-Type": "application/json", "user-id": userId },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch ${type} list`);
      }
      const data = await response.json();
      return data.followsList;
    },
  });
};
