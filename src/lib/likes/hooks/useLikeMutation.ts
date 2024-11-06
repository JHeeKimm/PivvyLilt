import { POST_KEY } from "@/lib/posts/key";
import { TPosts } from "@/lib/posts/types";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostPage {
  posts: TPosts[];
  hasNextPage: boolean;
}

interface InfinitePosts {
  pages: PostPage[];
  pageParams: number[];
}

export function useLikeMutation(postId: string, isLiked: boolean) {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const userId = user?.uid;
  return useMutation({
    mutationFn: async () => {
      const endpoint = isLiked
        ? `/api/likes/${postId}/unlike`
        : `/api/likes/${postId}/like`;
      const method = isLiked ? "DELETE" : "POST";
      console.log("mutation isLiked", isLiked);
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error("Failed to update like");

      return response.json();
    },
    // 낙관적 업데이트를 사용해 UI에 즉각 반영
    onMutate: async () => {
      // 낙관적 업데이트를 캐시된 데이터로 덮어쓰지 않기 위해 쿼리 취소
      await queryClient.cancelQueries({ queryKey: [POST_KEY, userId] }); // 전체 페이지
      await queryClient.cancelQueries({ queryKey: [POST_KEY, postId, userId] }); // 상세 페이지

      // 이전 게시물 데이터를 캐시에 저장하여 롤백에 사용
      const previousPost = queryClient.getQueryData([POST_KEY, userId]);
      const previousPostDetails = queryClient.getQueryData([
        POST_KEY,
        postId,
        userId,
      ]);

      // 전체 페이지 게시물 낙관적 업데이트: 전체 구조를 유지하면서 특정 게시물 업데이트
      queryClient.setQueryData<InfinitePosts>([POST_KEY, userId], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            posts: page.posts.map((post) =>
              post.id === postId
                ? {
                    ...post,
                    isLikedByUser: !isLiked,
                    likesCount: post.likesCount + (isLiked ? -1 : 1),
                  }
                : post
            ),
          })),
        };
      });

      // 상세 페이지 게시물 낙관적 업데이트
      queryClient.setQueryData<TPosts>([POST_KEY, postId, userId], (old) => {
        if (!old) return old;
        console.log("상세 페이지 old", old);
        return {
          ...old,
          isLikedByUser: !isLiked,
          likesCount: old.likesCount + (isLiked ? -1 : 1),
        };
      });

      // 낙관적 업데이트가 실패할 경우를 대비해 이전 데이터 반환
      return { previousPost, previousPostDetails };
    },
    // 실패하면 onMutate에서 반환된 컨텍스트를 사용하여 롤백
    onError: (err, newPost, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(
          [POST_KEY, postId, userId],
          context.previousPost
        );
      }
      if (context?.previousPostDetails) {
        queryClient.setQueryData(
          [POST_KEY, postId, userId],
          context.previousPostDetails
        );
      }
    },
    // 성공 또는 실패 후 쿼리 무효화하여 서버에서 최신 데이터 재요청
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [POST_KEY, userId] }); // 전체 페이지
      queryClient.invalidateQueries({ queryKey: [POST_KEY, postId, userId] }); // 상세 페이지
    },
  });
}
