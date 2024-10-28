import FeedItem from "@/components/posts/FeedItem";
import { TPosts } from "@/lib/posts/types";
import AddPostButton from "@/components/posts/AddPostButton";

export default async function FeedPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const { posts }: { posts: TPosts[] } = await res.json();
  return (
    <div className="relative md:mt-10 mb-10 p-8 gap-8 flex flex-wrap items-center justify-center md:justify-start">
      <AddPostButton />
      {posts.length > 0 ? (
        posts.map((post) => (
          <FeedItem
            key={post.id}
            postId={post.id}
            title={post.title}
            content={post.content}
            imageUrl={post.imageUrl}
            userId={post.userId}
            createdAt={post.createdAt}
          />
        ))
      ) : (
        <p>현재 피드가 없습니다.</p>
      )}
    </div>
  );
}
