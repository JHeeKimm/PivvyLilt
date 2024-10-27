import { BASE_URL, CHAT_ROUTES, PROFILE_ROUTES } from "@/constants/routes";
// import { useAuthStore } from "@/store/auth/useAuthStore";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { ChatIcon } from "./icons/ChatIcon";
import NavLink from "./NavLink";

export default function NavigationBar() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-opacity-80 bg-gray-800 text-white flex justify-around py-3 backdrop-blur-sm shadow-lg z-10">
      <div className="flex flex-col items-center">
        <NavLink href={BASE_URL} icon={<HomeIcon />} text="Feed" />
      </div>
      <div className="flex flex-col items-center">
        <NavLink href={CHAT_ROUTES.CHAT_ROOM} icon={<ChatIcon />} text="Chat" />
      </div>
      <div className="flex flex-col items-center">
        <NavLink
          href={PROFILE_ROUTES.PROFILE}
          icon={<PersonIcon />}
          text="Profile"
        />
      </div>
    </nav>
  );
}
