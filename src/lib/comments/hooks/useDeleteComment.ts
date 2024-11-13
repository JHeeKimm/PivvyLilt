import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../key";
import { deleteComment } from "../api";

export const useDeleteComment = (postId: string, commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments(postId) });
    },
  });
};
