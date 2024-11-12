"use server";

import PostDetailItem from "@/components/posts/PostDetailItem";
import getQueryClient from "@/config/tanstack-query/get-query-client";
import { queryOptions } from "@/lib/posts/key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function PostDetailPage({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const { queryKey: fetchPostKey, queryFn: fetchPostFn } =
    queryOptions.post(postId);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: fetchPostKey,
    queryFn: fetchPostFn,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PostDetailItem postId={postId} />
    </HydrationBoundary>
  );
}
