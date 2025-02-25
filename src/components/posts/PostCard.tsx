import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FeedItemProps } from "@/lib/posts/types";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useParams } from "next/navigation";
import { useDeletePost } from "@/lib/posts/hooks/useDeletePost";
import CommentsSection from "../comment/CommentsSection";
import { elapsedTime } from "@/utils/elapsedTime";
import UserImage from "../common/UserImage";
import { useLikeMutation } from "@/lib/likes/hooks/useLikeMutation";
import LikeButton from "../common/buttons/LikeButton";
import Link from "next/link";
import CommentButton from "../common/buttons/CommentButton";
import DotMenuButton from "../common/buttons/DotMenuButton";

export default function PostCard({
  postId,
  content,
  imageUrl,
  userId,
  createdAt,
  likesCount,
  commentsCount,
  isLikedByUser,
  author,
  priority = false,
  onEdit,
}: FeedItemProps) {
  const params = useParams();
  const user = useAuthStore((state) => state.user);

  const isDetailPage = params?.postId === postId;
  const isAuthor = user?.uid === userId;

  const followerId = user?.uid as string;
  const followingId = userId;

  const { mutateAsync: deletePost } = useDeletePost(postId);
  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      await deletePost();
    }
  };
  const { mutateAsync: toggleLike } = useLikeMutation(postId, isLikedByUser);
  const handleLike = async () => {
    await toggleLike();
  };

  return (
    <Card className="grow min-w-80 max-w-md bg-white shadow-md rounded-lg">
      {/* Header: User Info and 더보기 Button */}
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* User Image */}
          <UserImage profileImage={author.profileImage || ""} size="sm" />
          <div>
            <CardTitle className="text-sm font-semibold">
              {author.nickname}
            </CardTitle>
            <CardDescription className="text-xs text-gray-500">
              {elapsedTime(createdAt)}
            </CardDescription>
          </div>
        </div>
        {/* 더보기 button */}
        <DotMenuButton followerId={followerId} followingId={followingId} />
      </CardHeader>
      <Link href={`/post/${postId}`}>
        {/* Post Image */}
        <CardContent className="p-0 bg-gray-200 relative min-h-48 max-h-80">
          <Image
            src={imageUrl ? imageUrl : ""}
            alt="Post Image"
            fill={true}
            className="object-cover"
            placeholder="blur"
            blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsrKmpBwAE2QHyUe82OwAAAABJRU5ErkJggg=="
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
          />
        </CardContent>

        {/* Post Text */}
        <CardContent className="p-4 text-sm">{content}</CardContent>
      </Link>

      {/* Action Buttons */}
      <CardFooter className="p-2 flex justify-between items-center">
        <div className="flex">
          <LikeButton
            count={likesCount}
            isLiked={isLikedByUser}
            onClick={handleLike}
          />
          <CommentButton count={commentsCount} />
        </div>
        {isDetailPage && isAuthor && (
          <div>
            <Button
              variant="ghost"
              className="text-gray-500"
              onClick={() => onEdit?.()}
            >
              수정
            </Button>
            <Button
              variant="ghost"
              className="text-gray-500"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </div>
        )}
      </CardFooter>
      {isDetailPage && <CommentsSection postId={postId} />}
    </Card>
  );
}
