import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FOLLOWER_KEY, FOLLOWING_KEY } from "../key";

export function useFollowMutation(
  followingId: string,
  followerId: string,
  isFollowing: boolean
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const method = isFollowing ? "DELETE" : "POST";

      const response = await fetch(`/api/follows`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId, followingId }),
      });

      if (!response.ok) throw new Error("Failed to update follow status");

      return response.json();
    },
    // 낙관적 업데이트를 사용해 UI에 즉각 반영
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [FOLLOWING_KEY, followerId, followingId],
      });

      const previousIsFollowing = queryClient.getQueryData([
        FOLLOWING_KEY,
        followerId,
        followingId,
      ]);

      // 현재 팔로우 상태 낙관적 업데이트
      queryClient.setQueryData(
        [FOLLOWING_KEY, followerId, followingId],
        !isFollowing
      );

      // 팔로우/언팔로우에 따른 팔로워 카운트 변경
      // if (isFollowing) {
      //   decrementFollowersCount();
      // } else {
      //   incrementFollowersCount();
      // }

      // 낙관적 업데이트가 실패할 경우를 대비해 이전 데이터 반환
      return { previousIsFollowing };
    },
    // 실패하면 onMutate에서 반환된 컨텍스트를 사용하여 롤백
    onError: (err, isFollowing, context) => {
      if (context?.previousIsFollowing) {
        queryClient.setQueryData(
          [FOLLOWING_KEY, followerId, followingId],
          context.previousIsFollowing
        );
      }
      // 카운트 상태도 롤백
      // if (isFollowing) {
      //   incrementFollowersCount();
      // } else {
      //   decrementFollowersCount();
      // }
    },
    // 성공 또는 실패 후 쿼리 무효화하여 서버에서 최신 데이터 재요청
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [FOLLOWING_KEY, followerId, followingId],
      });
      queryClient.invalidateQueries({ queryKey: [FOLLOWER_KEY] });
    },
  });
}
