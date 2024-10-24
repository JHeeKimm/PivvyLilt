import FeedCard from "@/components/feed/FeedCard";
import { TPosts } from "@/lib/posts/types";

export default async function FeedPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const { posts }: { posts: TPosts[] } = await res.json();
  return (
    <div className="p-8 gap-8 flex flex-wrap items-center justify-center md:justify-start">
      {posts.length > 0 ? (
        posts.map((post) => (
          <FeedCard
            key={post.id}
            title={post.title}
            content={post.content}
            imageUrl={post.image_url}
            userId={post.user_id}
            createdAt={post.created_at}
          />
        ))
      ) : (
        <p>현재 피드가 없습니다.</p>
      )}
    </div>
  );
}
