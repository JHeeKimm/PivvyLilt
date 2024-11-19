"use client";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchProfile } from "@/lib/user/hooks/useFetchProfile";
import UserImage from "../common/UserImage";
import IconButton from "../common/IconButton";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { PROFILE_ROUTES } from "@/constants/routes";
import { useFetchFollowerCounts } from "@/lib/follows/hooks/useFetchFollowerCount";

export default function UserProfileInfo({ nickname }: { nickname: string }) {
  const user = useAuthStore((state) => state.user);
  const isMyProfile = user?.nickname === nickname;
  const { data: otherUserData, isLoading } = useFetchProfile(nickname);
  const userData = isMyProfile ? user : otherUserData;

  const { data, error } = useFetchFollowerCounts(user?.uid as string);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>오류가 발생했습니다. {error.message}</p>;

  return (
    <div className="gap-y-6 flex flex-col items-center p-6 bg-gray-800 text-white">
      <div className="relative">
        <UserImage
          profileImage={(userData?.profileImage as string) || ""}
          size="lg"
        />
        {isMyProfile && (
          <Link
            href={`${PROFILE_ROUTES.PROFILE}/${user?.nickname}/edit`}
            className="absolute -bottom-4 -right-4"
          >
            <IconButton
              icon={<Pencil2Icon className="h-7 w-7 text-gray-500" />}
            />
          </Link>
        )}
      </div>
      <div>{userData?.nickname}</div>
      <div className="flex justify-center space-x-4 text-sm">
        <span>팔로워: {data?.followersCount}</span>
        <span>팔로잉: {data?.followingsCount}</span>
      </div>
      <div>{userData?.bio}</div>
    </div>
  );
}
