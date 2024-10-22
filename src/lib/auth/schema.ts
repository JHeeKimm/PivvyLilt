import { z } from "zod";

const easyPatterns = ["123456", "password", "qwerty", "asdf", "admin"];

export const SignUpSchema = z.object({
  nickName: z
    .string()
    .min(1, { message: "닉네임을 입력해주세요." })
    .regex(/^[a-zA-Zㄱ-ㅎ가-힣]+$/, {
      message: "닉네임은 문자만 입력할 수 있습니다.",
    }),
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .regex(/[a-zA-Z]/, {
      message: "비밀번호는 최소 1개 이상의 영문자를 포함해야 합니다.",
    })
    .regex(/[0-9]/, {
      message: "비밀번호는 최소 1개 이상의 숫자를 포함해야 합니다.",
    })
    .regex(/[\W_]/, {
      message: "비밀번호는 최소 1개 이상의 특수문자를 포함해야 합니다.",
    })
    .refine(
      (password) => !easyPatterns.some((pattern) => password.includes(pattern)),
      {
        message:
          "비밀번호에 쉬운 패턴(예: '123456', 'qwerty')이 포함되어 있습니다.",
      }
    )
    .refine(
      (password) => !/\d{3,}/.test(password), // 세 자리 이상의 연속된 숫자 방지
      { message: "비밀번호에 연속된 숫자나 전화번호가 포함되어 있습니다." }
    )
    .refine(
      (password) => !/([a-zA-Z])\1{2,}/.test(password), // 동일한 문자가 3번 이상 연속되는 패턴 방지
      {
        message:
          "비밀번호에 동일한 문자가 연속해서 3번 이상 포함되어 있습니다.",
      }
    ),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "올바른 이메일 형식을 입력해주세요.",
  }),
  password: z.string().min(1, {
    message: "비밀번호를 입력해주세요.",
  }),
});
