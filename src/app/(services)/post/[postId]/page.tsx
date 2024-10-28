import PostCard from "@/components/posts/PostCard";
import { FeedItemProps } from "@/lib/posts/types";

export default async function PostDetailPage({
  postId,
  title,
  content,
  imageUrl,
  userId,
  createdAt,
}: FeedItemProps) {
  return (
    <div>
      <PostCard
        postId={postId}
        title={title}
        content={content}
        imageUrl={imageUrl}
        userId={userId}
        createdAt={createdAt}
      />
    </div>
  );
}
