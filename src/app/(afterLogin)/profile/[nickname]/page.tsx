// import UserPostsSection from "@/components/profile/UserPostsSection";
import UserProfileSection from "@/components/profile/UserProfileSection";

export default function ProfilePage({
  params: { nickname },
}: {
  params: { nickname: string };
}) {
  const decodedNickname = decodeURIComponent(nickname);
  return (
    <div>
      <UserProfileSection nickname={decodedNickname} />
      {/* <UserPostsSection nickname={nickname} /> */}
    </div>
  );
}
