import FollowsList from "@/components/follows/FollowsList";
import { FOLLOWER_KEY, FOLLOWING_KEY } from "@/lib/follows/key";

export default function ProfilePage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  return (
    <div>
      마이페이지 프로필페이지
      <FollowsList userId={userId} type={FOLLOWER_KEY} />
      <FollowsList userId={userId} type={FOLLOWING_KEY} />
    </div>
  );
}
