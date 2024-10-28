"use client";

import PostCard from "@/components/posts/PostCard";
import { usePost } from "@/lib/posts/hooks/usePost";

export default function PostDetailPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const { data: post, isLoading, error } = usePost(postId);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>오류가 발생했습니다. {error.message}</p>;

  return post ? (
    <div>
      <PostCard
        postId={post.id}
        title={post.title}
        content={post.content}
        imageUrl={post.imageUrl}
        userId={post.userId}
        createdAt={post.createdAt}
      />
    </div>
  ) : (
    <p>게시물을 찾을 수 없습니다.</p>
  );
}
