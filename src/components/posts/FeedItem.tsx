"use client";

import PostCard from "./PostCard";
import { useFetchPosts } from "@/lib/posts/hooks/useFetchPosts";
import { TPosts } from "@/lib/posts/types";
import AddPostButton from "@/components/posts/AddPostButton";
import { PostCardSkeleton } from "./PostCardSkeleton";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
// import { useUserLikes } from "@/lib/likes/hooks/useUserLikes";
import { useAuthStore } from "@/store/auth/useAuthStore";

export default function FeedItem() {
  const { user } = useAuthStore();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchPosts(user?.uid as string);

  // 관찰 대상 ref
  const triggerRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage) fetchNextPage();
    },
    hasNextPage,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];
  // const { data: likedPostIds } = useUserLikes(user?.uid as string);

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
          <PostCard key={post.id} postId={post.id} {...post} />
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
