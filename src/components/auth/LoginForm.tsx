"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "../ErrorMessage";
import { useFormState } from "react-dom";
import { authenticate } from "@/actions/authenticate";
import { BASE_URL, AUTH_ROUTES } from "@/constants/routes";
import { useAuthStore } from "@/store/auth/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "../Logo";

export default function LoginForm() {
  const router = useRouter();
  const [state, formAction, isPending] = useFormState(authenticate, undefined);
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLogin = useAuthStore((state) => state.setIsLogin);

  useEffect(() => {
    if (state?.success) {
      const { uid, email, displayName } = state.user;
      setUser({
        uid,
        email,
        nickName: displayName,
      });
      setIsLogin(true);
      router.push(BASE_URL);
    }
  }, [state, setUser, setIsLogin, router]);

  return (
    <div className="flex md:flex-row flex-col gap-x-20 justify-center items-center">
      <div className="flex flex-col gap-y-6 items-center">
        <Logo />
        <form action={formAction} className="flex flex-col gap-y-6 min-w-80">
          <h2 className="font-bold text-center">로그인</h2>
          <div className="">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="example@example.com"
              required
            />
            {state?.errors?.email && (
              <ErrorMessage message={state?.errors?.email[0]} />
            )}
          </div>
          <div className="">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              required
            />
            {state?.errors?.password && (
              <ErrorMessage message={state?.errors?.password[0]} />
            )}
          </div>
          {state?.errorMessage && (
            <ErrorMessage message={state?.errorMessage} />
          )}
          <Button disabled={isPending} className="">
            로그인
          </Button>
        </form>
        <Link className="text-sm text-sky-700" href={AUTH_ROUTES.SIGN_UP}>
          아직 계정이 없으신가요?
        </Link>
      </div>
      <div className="basis-56">이미지</div>
    </div>
  );
}
