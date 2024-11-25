import FeedItem from "@/components/posts/FeedItem";
import getQueryClient from "@/config/tanstack-query/get-query-client";
import { queryOptions } from "@/lib/posts/key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function FeedPage() {
  const queryClient = getQueryClient();
  const { queryKey: fetchPostsKey, queryFn: fetchPostsFn } =
    queryOptions.posts();

  await queryClient.prefetchInfiniteQuery({
    queryKey: fetchPostsKey,
    queryFn: fetchPostsFn,
    initialPageParam: 1,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="relative md:mt-10 mb-10 p-8 md:gap-8 gap-16 flex flex-wrap items-center justify-center md:justify-start">
        <FeedItem />
      </div>
    </HydrationBoundary>
  );
}
