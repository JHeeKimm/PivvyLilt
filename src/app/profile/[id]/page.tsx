"use client";
import { useAuthStore } from "@/store/auth/useAuthStore";

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div>
      마이페이지 프로필페이지 <div>유저 정보{user?.nickName}</div>
    </div>
  );
}
