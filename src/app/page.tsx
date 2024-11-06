import FeedItem from "@/components/posts/FeedItem";
import getQueryClient from "@/config/tanstack-query/get-query-client";
import { POST_KEY } from "@/lib/posts/key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function FeedPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [POST_KEY],
    queryFn: async () => {
      console.log("Fetching data from server");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=1`,
        {
          cache: "no-store",
        }
      );
      if (!res.ok) throw new Error("Failed to fetch initial posts");
      return await res.json();
    },
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="relative md:mt-10 mb-10 p-8 gap-8 flex flex-wrap items-center justify-center md:justify-start">
        <FeedItem />
      </div>
    </HydrationBoundary>
  );
}
