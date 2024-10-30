import { useMutation, useQueryClient } from "@tanstack/react-query";
import { POST_KEY } from "../key";
import { useRouter } from "next/navigation";

export const useDeltePost = (postId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [POST_KEY] });
      router.back();
    },
  });
};
