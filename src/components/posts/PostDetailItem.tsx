"use client";

import PostCard from "@/components/posts/PostCard";
import { useFetchPost } from "@/lib/posts/hooks/useFetchPost";
import EditPost from "@/components/posts/EditPost";
import { useEditStore } from "@/store/posts/useEditStore";

export default function PostDetailItem({ postId }: { postId: string }) {
  const { data: post, isLoading, error } = useFetchPost(postId);
  const { isEditing, startEditing, stopEditing } = useEditStore();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>오류가 발생했습니다. {error.message}</p>;

  return post ? (
    <div>
      {isEditing ? (
        <EditPost post={post} onCancel={stopEditing} />
      ) : (
        <PostCard postId={post.id} onEdit={startEditing} {...post} />
      )}
    </div>
  ) : (
    <p>게시물을 찾을 수 없습니다.</p>
  );
}
