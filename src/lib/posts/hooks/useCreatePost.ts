import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastStore } from "@/store/toast/useToastStore";
import { queryKeys } from "../key";
import { uploadPost } from "../api";

export const useCreatePost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToastStore();

  return useMutation<unknown, Error, FormData>({
    mutationFn: uploadPost,
    onSuccess: () => {
      addToast("게시글 등록 성공!", "success");
      router.back();
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
    onError: (error: Error) => {
      addToast("게시글 등록에 실패하였습니다.", "error");
      console.error(error);
    },
  });
};
