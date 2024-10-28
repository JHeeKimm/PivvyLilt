"use client";

import PostCard from "./PostCard";
import Link from "next/link";
import { usePosts } from "@/lib/posts/hooks/usePosts";
import { TPosts } from "@/lib/posts/types";
import AddPostButton from "@/components/posts/AddPostButton";

export default function FeedItem() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>오류가 발생했습니다. {error.message}</p>;

  return (
    <>
      <AddPostButton />
      {posts?.length > 0 ? (
        posts.map((post: TPosts) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <PostCard postId={post.id} {...post} />
          </Link>
        ))
      ) : (
        <p>현재 피드가 없습니다.</p>
      )}
    </>
  );
}
