import { IUser } from "@/lib/auth/types";

export interface AuthStore {
  isLogin: boolean;
  user: IUser | null;
  checkLoginStatus: () => void;
  logout: () => void;
  setIsLogin: (isLogin: boolean) => void;
  setUser: (user: IUser) => void;
}
