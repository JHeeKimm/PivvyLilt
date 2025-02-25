"use client";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useRouter } from "next/navigation";
import { AUTH_ROUTES } from "@/constants/routes";
import { ExitIcon } from "@radix-ui/react-icons";

export const LogoutButton = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    router.replace(AUTH_ROUTES.LOGIN);
    router.refresh();
  };

  return (
    <div className="cursor-pointer" onClick={handleLogout}>
      <ExitIcon className="text-xl inline-block mr-2" />
      <span>Logout</span>
    </div>
  );
};
