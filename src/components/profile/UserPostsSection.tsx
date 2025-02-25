"use client";

import PhotoCard from "../posts/PhotoCard";
import { useFetchUserPosts } from "@/lib/posts/hooks/useFetchUserPosts";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { TPosts } from "@/lib/posts/types";

export default function UserPostsSection({ userId }: { userId: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchUserPosts(userId);

  // 관찰 대상 ref
  const triggerRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage) fetchNextPage();
    },
    hasNextPage,
  });

  if (error) return <p>Error: {error.message}</p>;

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  return (
    <>
      <section className="grid md:grid-cols-3 grid-cols-2 gap-1 p-1">
        {isLoading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>현재 피드가 없습니다.</p>
        ) : (
          posts.map((post: TPosts, index) => (
            <PhotoCard
              key={post.id}
              postId={post.id}
              imageUrl={post.imageUrl || ""}
              priority={index < 9}
            />
          ))
        )}
      </section>
      <div ref={triggerRef} className="min-w-80">
        {isFetchingNextPage && (
          <p className="text-center">Loading more posts...</p>
        )}
      </div>
    </>
  );
}
