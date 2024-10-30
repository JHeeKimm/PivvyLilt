"use server";

import { LoginSchema } from "@/lib/auth/schema";
import { AuthError } from "firebase/auth";
import { loginAPI } from "@/lib/auth/api";

export const authenticate = async (_: unknown, formData: FormData) => {
  const validateFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validateFields.data;
  try {
    const response = await loginAPI({ email, password });
    console.log("response", response);
    if (!response.uid) {
      return {
        errorMessage: "존재하지 않는 사용자입니다. 회원가입을 해주세요.",
      };
    }
    // 로그인 성공 시 유저 정보를 반환
    return {
      success: true,
      user: {
        uid: response.uid,
        email: response.email,
        bio: response.bio || "",
        nickname: response.nickname || "",
        profileImage: response.profileImage || "",
      },
    };
  } catch (err) {
    const error = err as AuthError;

    switch (error.code) {
      case "auth/invalid-email":
        return { errorMessage: "잘못된 이메일 형식입니다." };
      case "auth/user-not-found":
        return {
          errorMessage: "존재하지 않는 사용자입니다. 회원가입을 해주세요.",
        };
      case "auth/wrong-password":
        return { errorMessage: "비밀번호가 일치하지 않습니다." };
      case "auth/invalid-credential":
        return { errorMessage: "이메일 또는 비밀번호를 확인해주세요." };
      case "auth/internal-error":
        return { errorMessage: "잘못된 요청입니다." };
      default:
        return { errorMessage: "입력 정보를 확인해주세요." };
    }
  }
};
