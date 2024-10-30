import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMENT_KEY } from "../keys";

export const useDeleteComment = (postId: string, commentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `/api/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          cache: 'no-store'
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENT_KEY, postId] });
    },
  });
};
