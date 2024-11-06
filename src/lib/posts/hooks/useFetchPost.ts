import { useQuery } from "@tanstack/react-query";
import { POST_KEY } from "../key";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const useFetchPost = (postId: string) => {
  const { user } = useAuthStore();
  const userId = user?.uid as string;

  return useQuery({
    queryKey: [POST_KEY, postId, userId],
    queryFn: async () => {
      const res = await fetch(`/api/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const result = await res.json();
      return result.post;
    },
    enabled: !!postId,
  });
};
