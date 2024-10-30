import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMENT_KEY } from "../keys";
import { useToastStore } from "@/store/toast/useToastStore";

export const useEditComment = (postId: string, commentId: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: async ({ comment }: { comment: string }) => {
      const response = await fetch(
        `/api/posts/${postId}/comments/${commentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
          cache: "no-store",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update comment");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [COMMENT_KEY, postId],
      });
    },
    onError: (error: Error) => {
      addToast("댓글 수정에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
