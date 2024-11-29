import { useAddComment } from "@/lib/comments/hooks/useAddComment";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { CommentFormProps } from "@/lib/comments/types";
import { useToastStore } from "@/store/toast/useToastStore";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/constants/routes";

export default function CommentForm({ postId }: CommentFormProps) {
  const router = useRouter();
  const { addToast } = useToastStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ comment: string }>();
  const { user } = useAuthStore();
  const { mutateAsync: addComment, isPending: isSaving } =
    useAddComment(postId);

  const onSubmit = async (data: { comment: string }) => {
    if (!user?.uid) {
      addToast("로그인이 필요합니다.", "error");
      router.push(AUTH_ROUTES.LOGIN);
      return;
    }

    if (data.comment.trim()) {
      const newCommentData = {
        comment: data.comment,
        userId: user.uid,
        postId,
      };
      await addComment(newCommentData);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center justify-center mt-4 p-2 space-x-2 w-full"
    >
      <input
        type="text"
        {...register("comment", { required: true })}
        placeholder="댓글 달기..."
        className="w-full p-2 border rounded"
        disabled={isSaving}
      />
      {errors.comment && (
        <span className="text-red-500 text-sm">댓글을 입력해주세요.</span>
      )}
      <Button disabled={isSaving} type="submit" className="">
        {isSaving ? "게시 중..." : "게시"}
      </Button>
    </form>
  );
}
