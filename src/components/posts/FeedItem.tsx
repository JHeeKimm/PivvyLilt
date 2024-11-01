"use client";

import PostCard from "./PostCard";
import Link from "next/link";
import { useFetchPosts } from "@/lib/posts/hooks/useFetchPosts";
import { TPosts } from "@/lib/posts/types";
import AddPostButton from "@/components/posts/AddPostButton";
import { PostCardSkeleton } from "./PostCardSkeleton";
import { useCallback, useEffect, useRef } from "react";

export default function FeedItem() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchPosts();

  console.log("FeedItem data", data);
  // 감지할 요소의 ref
  const triggerRef = useRef(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      console.log("entry", entry);
      // 요소가 화면에 관찰되고, 다음 페이지가 있다면 다음 페이지 fetch
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    // 관찰자 초기화
    const observer = new IntersectionObserver(observerCallback, {
      // 옵저버가 실행되기 위해 관찰 요소가 얼마나 보여야 하는 지에 대한 백분율
      threshold: 0.2,
    });

    // 관찰 요소 등록
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    // 모든 요소 관찰 중지
    return () => observer.disconnect();
  }, [observerCallback]);

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

      {/* 스크롤 시 추가 데이터 로딩 트리거 */}
      <div ref={triggerRef}>
        {isFetchingNextPage && <p>Loading more posts...</p>}
      </div>
    </>
  );
}
