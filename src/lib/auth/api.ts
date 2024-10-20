import { auth, db } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { IUser, LoginRequest, LoginResponse, SignUpRequest } from "./types";

export const signUpAPI = async ({
  email,
  password,
  nickName,
}: SignUpRequest): Promise<IUser> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await updateProfile(user, { displayName: nickName });
  await setDoc(doc(db, "users", user.uid), {
    nickName,
    email,
  });

  return {
    uid: user.uid,
    email: user.email!,
    nickName,
  };
};

export const loginAPI = async (
  loginData: LoginRequest
): Promise<LoginResponse> => {
  try {
    const { email, password } = loginData;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    // cookies.set('accessToken', token, {expires: 5});

    return {
      uid: user.uid,
      email: user.email ?? "",
      nickName: user.displayName ?? "",
      accessToken: token,
    };
  } catch (error) {
    throw new Error("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
  }
};
