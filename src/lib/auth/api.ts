import { auth, db } from "@/lib/config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { IUser, LoginRequest, LoginResponse, SignUpRequest } from "./types";
import { cookies } from "next/headers";

export const signUpAPI = async ({
  email,
  password,
  nickname,
}: SignUpRequest): Promise<IUser> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await updateProfile(user, { displayName: nickname });
  await setDoc(doc(db, "users", user.uid), {
    nickname,
    email,
  });

  return {
    uid: user.uid,
    email: user.email!,
    nickname,
  };
};

export const loginAPI = async (
  loginData: LoginRequest
): Promise<LoginResponse> => {
  const { email, password } = loginData;
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const token = await user.getIdToken();

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  cookies().set("accessToken", token, {
    // httpOnly: true,
    // secure: true,
    expires: expiresAt,
    // sameSite: "lax",
    // path: "/",
  });

  return {
    uid: user.uid,
    bio: user.bio ?? "",
    email: user.email ?? "",
    nickname: user.displayName ?? "",
    profileImage: user.profile_image ?? "",
    accessToken: token,
  };
};
