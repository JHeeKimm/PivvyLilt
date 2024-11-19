import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../key";
import { updateFollow } from "../api";

export function useFollowMutation(
  followingId: string,
  followerId: string,
  isFollowingState: boolean
) {
  const queryClient = useQueryClient();
  const isFollowingQueryKey = queryKeys.isFollowing(followerId, followingId);
  const followerCountsKey = queryKeys.followCounts(followerId);
  const method = isFollowingState ? "DELETE" : "POST";

  return useMutation({
    mutationFn: () => {
      return updateFollow(method, followerId, followingId);
    },
    // 낙관적 업데이트를 사용해 UI에 즉각 반영
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: isFollowingQueryKey,
      });

      const previousIsFollowing = queryClient.getQueryData(isFollowingQueryKey);

      // 현재 팔로우 상태 낙관적 업데이트
      queryClient.setQueryData(isFollowingQueryKey, !isFollowingState);

      // 낙관적 업데이트가 실패할 경우를 대비해 이전 데이터 반환
      return { previousIsFollowing };
    },
    // 실패하면 onMutate에서 반환된 컨텍스트를 사용하여 롤백
    onError: (err, isFollowing, context) => {
      if (context?.previousIsFollowing) {
        queryClient.setQueryData(
          isFollowingQueryKey,
          context.previousIsFollowing
        );
      }
    },
    // 성공 또는 실패 후 쿼리 무효화하여 서버에서 최신 데이터 재요청
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: isFollowingQueryKey,
      });
      queryClient.invalidateQueries({
        queryKey: followerCountsKey,
      });
    },
  });
}
