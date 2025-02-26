"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "../common/ErrorMessage";
import { useFormState } from "react-dom";
import { createUser } from "@/actions/createUser";
import { AUTH_ROUTES } from "@/constants/routes";
import Logo from "../common/Logo";
import { useEffect, useState } from "react";
import { SignUpSchema } from "@/lib/auth/schema";
import { checkAvailability } from "@/lib/auth/checkAvailability";
import { debounce } from "@/utils/debounce";
import { useToastStore } from "@/store/toast/useToastStore";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [state, formAction, isPending] = useFormState(createUser, undefined);
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({
    nickname: false,
    email: false,
    password: false,
  });

  const addToast = useToastStore((state) => state.addToast);
  const router = useRouter();

  useEffect(() => {
    if (state?.status === "success") {
      addToast(state.message, "success");
      router.push(AUTH_ROUTES.LOGIN);
    }
  }, [state, addToast]);

  const validateField = async (name: string, value: string) => {
    const newErrors = { ...errors };

    const data = { ...formData, [name]: value };
    const validation = SignUpSchema.safeParse(data);

    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      if (fieldErrors[name as keyof typeof fieldErrors]) {
        newErrors[name] = fieldErrors[
          name as keyof typeof fieldErrors
        ] as string[]; // 해당 필드의 에러만 업데이트
      } else {
        delete newErrors[name]; // 해당 필드에 에러가 없다면 삭제
      }
    } else {
      delete newErrors[name]; // 전체 검증 통과 시 해당 필드 에러 삭제
    }

    // 중복 검사 (닉네임과 이메일만)
    if (name === "nickname" || name === "email") {
      const isAvailable = await checkAvailability(name, value);
      if (!isAvailable) {
        newErrors[name] = [
          `이미 사용 중인 ${name === "nickname" ? "닉네임" : "이메일"}입니다.`,
        ];
      }
    }

    setErrors(newErrors);
  };

  // 디바운스 적용된 유효성 검사
  const debouncedValidateField = debounce(validateField, 500);

  // 입력이 변경될 때마다 호출되는 함수 (디바운스 적용)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 입력 값 업데이트
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 첫 입력 시에만 touched 업데이트
    if (!touched[name]) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    }

    debouncedValidateField(name, value);
  };

  return (
    <div className="flex gap-x-20 justify-center items-center">
      <div className="flex flex-col gap-y-6 items-center">
        <Logo className="py-4" withBorder={true} />
        <form action={formAction} className="flex flex-col gap-y-6 min-w-80">
          <h2 className="font-bold text-center">회원가입</h2>
          <div className="">
            <Label>Nickname</Label>
            <Input
              type="name"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              required
              value={formData.nickname}
              onChange={handleInputChange}
            />
            {touched.nickname && errors.nickname && (
              <ErrorMessage message={errors.nickname[0]} />
            )}
          </div>
          <div className="">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="example@example.com"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            {touched.email && errors.email && (
              <ErrorMessage message={errors.email[0]} />
            )}
          </div>
          <div className="">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <p className="max-w-xs break-words text-xs text-gray-600 mt-1 ml-1">
              비밀번호는 최소 8자 이상이며, 영문자, 숫자, 특수문자를 포함해야
              합니다.
            </p>
            {touched.password && errors.password && (
              <ErrorMessage message={errors.password[0]} />
            )}
          </div>
          {state?.errorMessage && (
            <ErrorMessage message={state?.errorMessage} />
          )}
          <Button
            disabled={Object.keys(errors).length > 0 || isPending}
            className=""
          >
            회원가입
          </Button>
        </form>
        <Link className="text-sm text-sky-700" href={AUTH_ROUTES.LOGIN}>
          이미 계정이 있으신가요?
        </Link>
      </div>
    </div>
  );
}
