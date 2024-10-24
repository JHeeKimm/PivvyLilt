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
import { FeedCardProps } from "@/lib/posts/types";

export default function FeedCard({
  title,
  content,
  imageUrl,
  userId,
  createdAt,
}: FeedCardProps) {
  const defaultImageUrl = "/profile.jpg";
  return (
    <Card className="grow min-w-80 max-w-lg bg-white shadow-md rounded-lg">
      {/* Header: User Info and 더보기 Button */}
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <div className="flex items-center space-x-3">
          {/* User Image */}
          <Image
            src="/profile.jpg"
            alt="User profile"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <CardTitle className="text-sm font-semibold">{userId}</CardTitle>
            <CardDescription className="text-xs text-gray-500">
              {createdAt}
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
          src={defaultImageUrl}
          alt="User profile"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </CardContent>

      {/* Post Text */}
      <CardContent className="p-4 text-sm">{title}</CardContent>
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
      </CardFooter>
    </Card>
  );
}
