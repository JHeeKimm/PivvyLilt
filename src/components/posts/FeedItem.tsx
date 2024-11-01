"use client";

import PostCard from "./PostCard";
import Link from "next/link";
import { useFetchPosts } from "@/lib/posts/hooks/useFetchPosts";
import { TPosts } from "@/lib/posts/types";
import AddPostButton from "@/components/posts/AddPostButton";
import { PostCardSkeleton } from "./PostCardSkeleton";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export default function FeedItem() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchPosts();

  // 관찰 대상 ref
  const triggerRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage) fetchNextPage();
    },
    hasNextPage,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (error) return <p>오류가 발생했습니다. {error.message}</p>;

  return (
    <>
      <AddPostButton />
      {isLoading ? (
        Array.from({ length: 4 }, (_, index) => (
          <PostCardSkeleton key={index} />
        ))
      ) : posts.length === 0 ? (
        <p>현재 피드가 없습니다.</p>
      ) : (
        posts.map((post: TPosts) => (
          <Link key={post.id} href={`/post/${post.id}`}>
            <PostCard postId={post.id} {...post} />
          </Link>
        ))
      )}

      {/* Intersection Observer의 관찰 대상 요소로 triggerRef를 연결 */}
      <div ref={triggerRef} className="min-w-80">
        {isFetchingNextPage && (
          <p className="text-center">Loading more posts...</p>
        )}
      </div>
    </>
  );
}
