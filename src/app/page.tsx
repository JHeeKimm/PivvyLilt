import FeedItem from "@/components/posts/FeedItem";
import getQueryClient from "@/config/tanstack-query/get-query-client";
import { customFetchServer } from "@/lib/fetch/server";
import { POST_KEY } from "@/lib/posts/key";
import { FetchPostsResponse } from "@/lib/posts/types";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function FeedPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [POST_KEY],
    queryFn: async () => {
      const response = await customFetchServer<FetchPostsResponse>({
        endpoint: `/api/posts?page=1`,
      });
      if (!response) {
        return { posts: [], nextPage: undefined };
      }
      return response;
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
