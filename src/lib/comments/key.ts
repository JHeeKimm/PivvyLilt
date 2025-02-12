import { fetchComments } from "./api";

export const COMMENT_KEY = "COMMENT";

export const queryKeys = {
  comments: (postId: string) => [COMMENT_KEY, postId],
};

export const queryOptions = {
  comments: (postId: string) => ({
    queryKey: queryKeys.comments(postId),
    queryFn: (pageParam: number) => fetchComments(postId, pageParam),
  }),
};
