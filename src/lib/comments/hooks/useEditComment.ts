import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../key";
import { useToastStore } from "@/store/toast/useToastStore";
import { updateComment } from "../api";

export const useEditComment = (postId: string, commentId: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: ({ comment }: { comment: string }) =>
      updateComment(postId, commentId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments(postId),
      });
    },
    onError: (error: Error) => {
      addToast("댓글 수정에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
