"use server";

import { SignUpSchema } from "@/lib/auth/schema";
import { signUpAPI } from "@/lib/auth/api";
import { AuthError } from "firebase/auth";

export const createUser = async (_: unknown, formData: FormData) => {
  // 유효성 검사
  const validateFields = SignUpSchema.safeParse({
    nickname: formData.get("nickname"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
    };
  }

  //
  const { nickname, email, password } = validateFields.data;
  try {
    const response = await signUpAPI({ nickname, email, password });
    if (!response) {
      throw new Error("회원가입 중에 문제가 발생했습니다.");
    } else {
      return {
        status: "success",
        message: "회원가입이 완료되었습니다. 로그인 후 이용해 주세요:)",
      };
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
};
