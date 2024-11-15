"use client";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useFetchProfile } from "@/lib/user/hooks/useFetchProfile";
import UserImage from "../common/UserImage";
import IconButton from "../common/IconButton";
import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import { PROFILE_ROUTES } from "@/constants/routes";

export default function UserProfileInfo({ nickname }: { nickname: string }) {
  const { user } = useAuthStore();
  const isMyProfile = user?.nickname === nickname;
  const { data: otherUserData, isLoading } = useFetchProfile(nickname);
  const userData = isMyProfile ? user : otherUserData;
  console.log("user", user);
  if (isLoading) return <p>Loading...</p>;

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
      <div>{userData?.bio}</div>
    </div>
  );
}
