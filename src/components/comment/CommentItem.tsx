import { Button } from "@/components/ui/button";
import { CommentItemProps } from "@/lib/comments/types";
import { useForm } from "react-hook-form";
import { useEditComment } from "@/lib/comments/hooks/useEditComment";
import { useDeleteComment } from "@/lib/comments/hooks/useDeleteComment";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useState } from "react";
import { elapsedTime } from "@/utils/elapsedTime";

export default function CommentItem({
  commentId,
  comment,
  userId,
  createdAt,
  postId,
}: CommentItemProps) {
  const { user } = useAuthStore();
  const isAuthor = user?.uid === userId;
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm<{ comment: string }>({
    defaultValues: { comment },
  });

  const { mutateAsync: editComment, isPending: isSaving } = useEditComment(
    postId,
    commentId
  );
  const { mutateAsync: deleteComment, isPending: isDeleting } =
    useDeleteComment(postId, commentId);

  const onEditSubmit = async (data: { comment: string }) => {
    if (data.comment.trim()) {
      await editComment({ comment: data.comment });
      setIsEditing(false);
    }
  };
  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      await deleteComment();
    }
  };

  return (
    <div className="mb-2 flex justify-between items-center space-x-4">
      {isEditing ? (
        <form
          onSubmit={handleSubmit(onEditSubmit)}
          className=" flex justify-center items-center w-full"
        >
          <input
            type="text"
            {...register("comment", { required: true })}
            className="w-full p-2 border rounded"
          />
          <div className="flex">
            <Button
              type="submit"
              variant="ghost"
              className="text-gray-500"
              disabled={isSaving}
            >
              {isSaving ? "저장 중..." : "저장"}
            </Button>
            <Button
              variant="ghost"
              className="text-gray-500"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              취소
            </Button>
          </div>
        </form>
      ) : (
        <>
          <p className="px-2 text-gray-800">{comment}</p>
          <span className="text-gray-400">{elapsedTime(createdAt)}</span>
          {isAuthor && (
            <div className="">
              <Button
                variant="ghost"
                className="text-gray-500"
                onClick={() => setIsEditing(true)}
                disabled={isDeleting}
              >
                수정
              </Button>
              <Button
                variant="ghost"
                className="text-gray-500"
                onClick={handleDelete}
              >
                {isDeleting ? "삭제 중..." : "삭제"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
