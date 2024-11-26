import UserProfileInfo from "./UserProfileInfo";

export default function UserProfileSection({
  nickname,
  userId,
}: {
  nickname: string;
  userId: string;
}) {
  return (
    <section className="">
      <UserProfileInfo nickname={nickname} userId={userId} />
    </section>
  );
}
