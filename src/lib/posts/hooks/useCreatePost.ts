import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast/useToastStore";
import { POST_KEY } from "../key";

export const useCreatePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<unknown, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const response = await fetch("/api/posts/newpost", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Unknown error occurred");
      }
      return response.json();
    },
    onSuccess: () => {
      addToast("게시글 등록 성공!", "success");
      router.back();
      // queryClient.invalidateQueries({ queryKey: [POST_KEY] });
    },
    onError: (error: Error) => {
      addToast("게시글 등록에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
