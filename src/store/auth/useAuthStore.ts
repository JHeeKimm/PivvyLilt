import Cookies from "js-cookie";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthStore } from "./types";
import { IUser } from "@/lib/auth/types";
import { auth, db } from "@/config/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLogin: !!Cookies.get("accessToken"),
      user: null,

      checkLoginStatus: () => {
        const token = Cookies.get("accessToken");
        if (token) {
          try {
            onAuthStateChanged(auth, async (currentUser) => {
              console.log("currentUser:", currentUser);
              if (currentUser) {
                // Firestore에서 추가 사용자 정보 가져오기
                const userDocRef = doc(db, "users", currentUser.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                  const userData = userDocSnap.data();
                  set({
                    user: {
                      uid: currentUser.uid,
                      email: currentUser.email ?? "",
                      bio: userData.bio ?? "",
                      nickname: userData.nickname ?? "",
                      profileImage: userData.profileImage ?? "",
                    },
                    isLogin: true,
                  });
                } else {
                  console.error(
                    "유저 정보를 Firestore에서 가져올 수 없습니다."
                  );
                  set({ user: null, isLogin: false });
                }
              } else {
                set({
                  user: null,
                  isLogin: false,
                });
                console.error("유저 정보를 가져올 수 없습니다.");
              }
            });
          } catch (error) {
            console.error(
              "유저 정보를 가져오는 중 에러가 발생했습니다.",
              error
            );
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
    }),
    {
      name: "userInfo",
    }
  )
);
