import { useMutation, useQueryClient } from "@tanstack/react-query";
import { INewComment } from "../types";
import { COMMENT_KEY } from "../keys";
import { useToastStore } from "@/store/toast/useToastStore";

export const useAddComment = (postId: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation({
    mutationFn: async (newComment: INewComment) => {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      // return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [COMMENT_KEY, postId] });
    },
    onError: (error: Error) => {
      addToast("댓글 등록에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
