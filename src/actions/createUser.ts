"use server";

import { SignUpSchema } from "@/lib/auth/schema";
import { signUpAPI } from "@/lib/auth/api";
import { AuthError } from "firebase/auth";
import { redirect } from "next/navigation";
import { AUTH_ROUTES } from "@/constants/routes";

export const createUser = async (_: unknown, formData: FormData) => {
  // 유효성 검사
  const validateFields = SignUpSchema.safeParse({
    nickName: formData.get("nickName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  //
  const { nickName, email, password } = validateFields.data;
  try {
    const response = await signUpAPI({ nickName, email, password });
    if (!response) {
      throw new Error("회원가입 중에 문제가 발생했습니다.");
    }
  } catch (err) {
    const error = err as AuthError;
    if (error.code === "auth/email-already-in-use") {
      return { errorMessage: "이미 등록된 이메일입니다." };
    }
    return {
      errorMessage: "회원가입 중에 문제가 발생했습니다. 다시 시도해 주세요.",
    };
  }
  redirect(AUTH_ROUTES.LOGIN);
};
