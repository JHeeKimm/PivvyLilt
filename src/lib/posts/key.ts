import { fetchPost, fetchPosts, fetchUserPosts } from "./api";

export const POST_KEY = "POST";
export const USER_POST_KEY = "USER_POST";

export const queryKeys = {
  posts: [POST_KEY],
  post: (postId: string) => [POST_KEY, postId],
  userPosts: (userId: string) => [POST_KEY, USER_POST_KEY, userId],
};

export const queryOptions = {
  post: (postId: string) => ({
    queryKey: queryKeys.post(postId),
    queryFn: () => fetchPost(postId),
  }),
  posts: () => ({
    queryKey: [...queryKeys.posts],
    queryFn: fetchPosts,
  }),
  // 사용자가 작성한 게시물 조회용
  userPosts: (userId: string) => ({
    queryKey: queryKeys.userPosts(userId),
    queryFn: fetchUserPosts,
  }),
};
