"use server";

import PostDetailItem from "@/components/posts/PostDetailItem";
import getQueryClient from "@/config/tanstack-query/get-query-client";
import { fetchPost } from "@/lib/posts/api";
import { queryOptions } from "@/lib/posts/key";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export async function generateMetadata({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const post = await fetchPost(postId);

  return {
    title: `${post.content} 게시물`,
    description: `${post.content}`,
    openGraph: {
      title: `${post.content} 게시물`,
      description: `${post.content}`,
      images: [post.imageUrl ? post.imageUrl : "/thumbnail.png"],
    },
  };
}

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
