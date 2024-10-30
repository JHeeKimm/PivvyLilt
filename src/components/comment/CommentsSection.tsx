"use client";

import { useFetchComments } from "@/lib/comments/hooks/useFetchComments";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { TComments } from "@/lib/comments/types";

interface CommentSectionProps {
  postId: string;
}

export default function CommentsSection({ postId }: CommentSectionProps) {
  const { data: comments, isLoading } = useFetchComments(postId);

  if (isLoading) return <p>Loading comments...</p>;

  return (
    <>
      <div className="border border-gray-200 my-4"></div>
      <div className="p-2">
        {comments && comments.length > 0 ? (
          comments.map((comment: TComments) => (
            <CommentItem key={comment.id} commentId={comment.id} {...comment} />
          ))
        ) : (
          <p>댓글이 없습니다. 댓글을 남겨보세요.</p>
        )}
        <CommentForm postId={postId} />
      </div>
    </>
  );
}
