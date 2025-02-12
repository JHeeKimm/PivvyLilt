"use client";

import { BASE_URL, CHAT_ROUTES, PROFILE_ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { ChatIcon } from "../icons/ChatIcon";
import NavLink from "./NavLink";
import { LogoutButton } from "../../auth/LogoutButton";
import UserImage from "../UserImage";

export default function SideBar() {
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="hidden md:flex w-64 h-full bg-primary text-white flex-col p-4 transition-transform duration-300 md:translate-x-0 -translate-x-full z-10">
      <div className="flex flex-col items-center space-y-2 pb-6 mb-6 border-b border-accent">
        <UserImage profileImage={user?.profileImage || ""} size="lg" />
        <span className="text-sm font-semibold">{user?.nickname}</span>
      </div>
      <nav className="flex flex-col space-y-4">
        <NavLink href={BASE_URL} icon={<HomeIcon />} text="Feed" />
        <NavLink href={CHAT_ROUTES.CHAT_ROOM} icon={<ChatIcon />} text="Chat" />
        <NavLink
          href={`${PROFILE_ROUTES.PROFILE}/${user?.nickname}`}
          icon={<PersonIcon />}
          text="MyProfile"
        />
      </nav>
      <div className="mt-auto flex items-center space-x-2 p-2 hover:bg-secondary/60 rounded-lg">
        <LogoutButton />
      </div>
    </aside>
  );
}
