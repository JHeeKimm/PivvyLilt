import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast/useToastStore";
import { POST_KEY } from "../key";
// import { TPosts } from "../types";

export const useEditPost = (postId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<unknown, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }
      //   return response.json();
    },
    onSuccess: () => {
      // 성공 시 캐시 업데이트
      //   queryClient.setQueryData<TPosts>([POST_KEY, postId], (oldData) => ({
      //     ...(oldData as TPosts),
      //     ...(updatedPost as TPosts),
      //   }));
      queryClient.invalidateQueries({ queryKey: [POST_KEY, postId] });
      console.log(
        "Updated cache data:",
        queryClient.getQueryData([POST_KEY, postId])
      );

      router.refresh();
      addToast("게시글 등록 성공!", "success");
    },
    onError: (error: Error) => {
      addToast("게시글 등록에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
