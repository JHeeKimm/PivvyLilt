import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DotsHorizontalIcon,
  HeartIcon,
  Share1Icon,
} from "@radix-ui/react-icons";
import Image from "next/image";
import { CommentIcon } from "../common/icons/CommentIcon";
import { FeedItemProps } from "@/lib/posts/types";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useParams } from "next/navigation";
import { useDeltePost } from "@/lib/posts/hooks/useDeletePost";
import CommentsSection from "../comment/CommentsSection";
import { elapsedTime } from "@/utils/elapsedTime";
import UserImage from "../common/UserImage";

export default function PostCard({
  postId,
  content,
  imageUrl,
  userId,
  createdAt,
  // likesCount,
  // commentsCount,
  onEdit,
}: FeedItemProps) {
  const defaultImageUrl = "/profile.jpg";
  const params = useParams();
  const { user } = useAuthStore();

  const isDetailPage = params?.postId === postId;
  const isAuthor = user?.uid === userId;

  const { mutateAsync: deletePost } = useDeltePost(postId);
  const handleDelete = async () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      await deletePost();
    }
  };
  return (
    <Card className="grow min-w-80 max-w-lg bg-white shadow-md rounded-lg">
      {/* Header: User Info and 더보기 Button */}
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* User Image */}
          <UserImage profileImage={user?.profileImage || ""} size="sm" />
          <div>
            <CardTitle className="text-sm font-semibold">{userId}</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              {elapsedTime(createdAt)}
            </CardDescription>
          </div>
        </div>
        {/* 더보기 button */}
        <Button variant="ghost" size="icon">
          <DotsHorizontalIcon className="h-6 w-6 text-gray-500" />
        </Button>
      </CardHeader>

      {/* Post Image */}
      <CardContent className="p-0 bg-gray-200 relative min-h-48 max-h-80">
        <Image
          src={imageUrl ? imageUrl : defaultImageUrl}
          alt="User profile"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </CardContent>

      {/* Post Text */}
      <CardContent className="p-4 text-sm">{content}</CardContent>

      {/* Action Buttons */}
      <CardFooter className="p-2 flex justify-between items-center">
        <div className="flex">
          <Button variant="ghost" size="icon" className="text-red-500">
            <HeartIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <CommentIcon />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Share1Icon className="h-5 w-5" />
          </Button>
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
