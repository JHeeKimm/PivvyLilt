import UserPostsSection from "@/components/profile/UserPostsSection";
import UserProfileSection from "@/components/profile/UserProfileSection";

export default function ProfilePage({
  params: { userId },
}: {
  params: { userId: string };
}) {
  return (
    <div>
      마이페이지 프로필페이지
      <UserProfileSection userId={userId} />
      <UserPostsSection userId={userId} />
    </div>
  );
}
