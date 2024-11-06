import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast/useToastStore";
import { POST_KEY } from "../key";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useEditPost = (postId: string) => {
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();
  const { user } = useAuthStore();
  const userId = user?.uid;

  return useMutation<unknown, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: formData,
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POST_KEY, postId, userId] });
      queryClient.invalidateQueries({ queryKey: [POST_KEY] });

      addToast("게시글 등록 성공!", "success");
    },
    onError: (error: Error) => {
      addToast("게시글 등록에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
