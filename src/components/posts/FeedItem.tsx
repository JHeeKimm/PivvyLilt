import { FeedItemProps } from "@/lib/posts/types";
import PostCard from "./PostCard";
import Link from "next/link";

export default function FeedItem({
  postId,
  title,
  content,
  imageUrl,
  userId,
  createdAt,
}: FeedItemProps) {
  return (
    <Link href={`/post/${postId}`}>
      <PostCard
        postId={postId}
        title={title}
        content={content}
        imageUrl={imageUrl}
        userId={userId}
        createdAt={createdAt}
      />
    </Link>
  );
}
