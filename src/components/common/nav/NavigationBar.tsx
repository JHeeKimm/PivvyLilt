"use client";

import { BASE_URL, CHAT_ROUTES, PROFILE_ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { ChatIcon } from "../icons/ChatIcon";
import NavLink from "./NavLink";

export default function NavigationBar() {
  const { user } = useAuthStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-primary/90 text-white flex justify-around py-3 backdrop-blur-sm shadow-lg z-10">
      <NavLink href={BASE_URL} icon={<HomeIcon />} text="Feed" />
      <NavLink href={CHAT_ROUTES.CHAT_ROOM} icon={<ChatIcon />} text="Chat" />
      <NavLink
        href={`${PROFILE_ROUTES.PROFILE}/${user?.nickname}`}
        icon={<PersonIcon />}
        text="MyProfile"
      />
    </nav>
  );
}
