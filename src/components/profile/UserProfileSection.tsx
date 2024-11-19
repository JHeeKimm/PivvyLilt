import UserProfileInfo from "./UserProfileInfo";

export default function UserProfileSection({ nickname }: { nickname: string }) {
  return (
    <section className="">
      <UserProfileInfo nickname={nickname} />
    </section>
  );
}
