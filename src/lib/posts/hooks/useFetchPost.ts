import { useQuery } from "@tanstack/react-query";
import { POST_KEY } from "../key";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { customFetchServer } from "@/lib/fetch/server";
import { FetchPostResponse } from "../types";

export const useFetchPost = (postId: string) => {
  const { user } = useAuthStore();
  const userId = user?.uid as string;

  return useQuery({
    queryKey: [POST_KEY, postId, userId],
    queryFn: async () => {
      const response = await customFetchServer<FetchPostResponse>({
        endpoint: `/api/posts/${postId}`,
      });
      console.log("useFetchPost response => ", response);

      return response.post;
    },
    enabled: !!postId,
  });
};
