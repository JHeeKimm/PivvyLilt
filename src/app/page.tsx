import FeedItem from "@/components/posts/FeedItem";

export default function FeedPage() {
  return (
    <div className="relative md:mt-10 mb-10 p-8 gap-8 flex flex-wrap items-center justify-center md:justify-start">
      <FeedItem />
    </div>
  );
}
