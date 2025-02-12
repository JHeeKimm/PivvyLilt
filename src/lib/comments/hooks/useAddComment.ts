import { useMutation, useQueryClient } from "@tanstack/react-query";
import { INewComment } from "../types";
import { queryKeys } from "../key";
import { useToastStore } from "@/store/toast/useToastStore";
import { uploadComment } from "../api";

export const useAddComment = (postId: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: (newComment: INewComment) => uploadComment(postId, newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments(postId) });
    },
    onError: (error: Error) => {
      addToast("댓글 등록에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
