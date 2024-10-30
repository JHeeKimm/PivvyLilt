"use client";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useRouter } from "next/navigation";
// import { AUTH_ROUTES } from "@/constants/routes";

export const LogoutButton = () => {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    console.log("로그아웃 버튼 클릭됨");
    logout();
    // router.replace(AUTH_ROUTES.LOGIN);
    router.refresh();
  };

  return <button onClick={handleLogout}>로그아웃</button>;
};
