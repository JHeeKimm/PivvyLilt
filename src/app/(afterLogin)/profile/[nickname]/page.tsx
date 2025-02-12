import UserPostsSection from "@/components/profile/UserPostsSection";
import UserProfileSection from "@/components/profile/UserProfileSection";
import getQueryClient from "@/config/tanstack-query/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { queryOptions as userQueryOptions } from "@/lib/user/key";
import { queryOptions as postsQueryOptions } from "@/lib/posts/key";
import { queryOptions as followQueryOptions } from "@/lib/follows/key";
import { cookies } from "next/headers";
import { decodeAccessToken } from "@/lib/auth/decodeAccessToken";
import { fetchUserProfile } from "@/lib/user/api";

export async function generateMetadata({
  params: { nickname },
}: {
  params: { nickname: string };
}) {
  const user = await fetchUserProfile(nickname);

  return {
    title: `${user.nickname}의 프로필`,
    description: `${user.bio}`,
    openGraph: {
      title: `${user.nickname}의 프로필`,
      description: `${user.bio}`,
      images: [user.profileImage],
    },
  };
}

export default async function ProfilePage({
  params: { nickname },
}: {
  params: { nickname: string };
}) {
  const decodedNickname = decodeURIComponent(nickname);
  const accessToken = cookies().get("accessToken")?.value;
  const userId = await decodeAccessToken(accessToken as string);

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const queryClient = getQueryClient();

  // Prefetch user profile
  const { queryKey: fetchProfileKey, queryFn: fetchProfileFn } =
    userQueryOptions.userProfile(decodedNickname);

  // Prefetch user posts
  const { queryKey: fetchUserPostsKey, queryFn: fetchUserPostsFn } =
    postsQueryOptions.userPosts(userId);

  // Prefetch follower counts
  const { queryKey: fetchFollowerCountsKey, queryFn: fetchFollowerCountsFn } =
    followQueryOptions.followCounts(userId);

  await Promise.all([
    queryClient
      .prefetchQuery({
        queryKey: fetchProfileKey,
        queryFn: fetchProfileFn,
      })
      .then(() => console.log("Prefetched profile")),
    queryClient
      .prefetchInfiniteQuery({
        queryKey: fetchUserPostsKey,
        queryFn: fetchUserPostsFn,
        initialPageParam: 1,
      })
      .then(() => console.log("Prefetched user posts")),
    queryClient
      .prefetchQuery({
        queryKey: fetchFollowerCountsKey,
        queryFn: fetchFollowerCountsFn,
      })
      .then(() => console.log("Prefetched follower counts")),
  ]);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <UserProfileSection nickname={decodedNickname} userId={userId} />
      <UserPostsSection userId={userId} />
    </HydrationBoundary>
  );
}
