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
  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
  //   cache: "no-store",
  // });

  // if (!res.ok) {
  //   throw new Error("Failed to fetch posts");
  // }
  // const { posts }: { posts: TPosts[] } = await res.json();

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
