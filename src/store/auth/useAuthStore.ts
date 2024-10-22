import Cookies from "js-cookie";
import { create } from "zustand";
import { AuthStore } from "./types";
import { IUser } from "@/lib/auth/types";
import { auth } from "@/lib/config/firebase";

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: !!Cookies.get("accessToken"),
  user: null,

  checkLoginStatus: async () => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const currentUser = auth.currentUser;

        if (currentUser) {
          set({
            user: {
              uid: currentUser.uid,
              email: currentUser.email ?? "",
              nickName: currentUser.displayName ?? "",
            },
            isLogin: true,
          });
        } else {
          set({
            user: null,
            isLogin: false,
          });
          console.error("유저 정보를 가져올 수 없습니다.");
        }
      } catch (error) {
        console.error("유저 정보를 가져오는 중 에러가 발생했습니다.", error);
        set({ user: null, isLogin: false });
      }
    }
  },

  logout: () => {
    Cookies.remove("accessToken");
    set({
      isLogin: false,
      user: null,
    });
  },

  setIsLogin: (isLogin: boolean) => {
    set({ isLogin });
  },

  setUser: (user: IUser) => {
    set({ user, isLogin: true });
  },
}));
