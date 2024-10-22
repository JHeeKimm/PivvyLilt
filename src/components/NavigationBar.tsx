"use client";

import { useAuthStore } from "@/store/auth/useAuthStore";
import { useCallback } from "react";

export default function NavigationBar() {
  const { checkLoginStatus, user } = useAuthStore();

  useCallback(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  console.log("NavigationBar user", user);

  return (
    <div>
      유저 정보가 나올 겁니다..
      <div>{user?.email}</div>
    </div>
  );
}
