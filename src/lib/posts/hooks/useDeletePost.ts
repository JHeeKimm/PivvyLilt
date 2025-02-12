import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../key";
import { useRouter } from "next/navigation";
import { deletePost } from "../api";

export const useDeletePost = (postId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
      router.back();
    },
  });
};
