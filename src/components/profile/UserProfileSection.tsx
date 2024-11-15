// import FollowsList from "@/components/follows/FollowsList";
// import { FOLLOWER_KEY, FOLLOWING_KEY } from "@/lib/follows/key";

import UserProfileInfo from "./UserProfileInfo";

export default function UserProfileSection({ nickname }: { nickname: string }) {
  return (
    <section className="">
      <div>
        {/* <FollowsList userId={userId} type={FOLLOWER_KEY} />
        <FollowsList userId={userId} type={FOLLOWING_KEY} /> */}
      </div>
      <UserProfileInfo nickname={nickname} />
    </section>
  );
}
