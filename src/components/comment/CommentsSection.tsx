"use client";

import { useFetchComments } from "@/lib/comments/hooks/useFetchComments";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { TComments } from "@/lib/comments/types";
import { Button } from "../ui/button";

interface CommentSectionProps {
  postId: string;
}

export default function CommentsSection({ postId }: CommentSectionProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useFetchComments(postId);

  const comments = data?.pages.flatMap((page) => page.comments) || [];

  if (error) return <p>오류가 발생했습니다. {error.message}</p>;

  return (
    <>
      <div className="border border-gray-200 my-4"></div>
      <div className="p-2">
        {isLoading ? (
          <p className="m-1.5">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="m-1.5">댓글이 없습니다. 댓글을 남겨보세요.</p>
        ) : (
          comments.map((comment: TComments) => (
            <CommentItem key={comment.id} commentId={comment.id} {...comment} />
          ))
        )}

        {hasNextPage && (
          <div className="min-w-80">
            <Button
              variant="ghost"
              className="pl-2 text-gray-800"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "로딩 중..." : "댓글 더 보기"}
            </Button>
          </div>
        )}
        <CommentForm postId={postId} />
      </div>
    </>
  );
}
