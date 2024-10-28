import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TPosts } from "@/lib/posts/types";
import { POST_KEY } from "../key";

export const usePost = (postId: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: [POST_KEY, postId],
    queryFn: async () => {
      const cachedPosts = queryClient.getQueryData<TPosts[]>([POST_KEY]);
      const cachedPost = cachedPosts?.find((post) => post.id === postId);

      // 캐싱된 데이터가 있으면 반환
      if (cachedPost) {
        return cachedPost;
      }

      // 캐싱된 데이터가 없다면 fetch
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const result = await res.json();
      return result.post;
    },
    enabled: !!postId,
  });
};
