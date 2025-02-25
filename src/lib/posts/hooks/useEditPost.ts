import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast/useToastStore";
import { queryKeys } from "../key";
import { updatePost } from "../api";

export const useEditPost = (postId: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<unknown, Error, FormData>({
    mutationFn: (formData) => updatePost(postId, formData),
    onSuccess: () => {
      addToast("게시글 수정 성공!", "success");
      queryClient.invalidateQueries({ queryKey: queryKeys.post(postId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
    onError: (error: Error) => {
      addToast("게시글 수정에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
