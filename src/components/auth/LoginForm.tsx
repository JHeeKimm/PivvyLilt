"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "../ErrorMessage";
import { useFormState } from "react-dom";
import { authenticate } from "@/actions/authenticate";
import { AUTH_ROUTES } from "@/constants/routes";

export default function LoginForm() {
  const [state, formAction, isPending] = useFormState(authenticate, undefined);

  return (
    <div className="flex gap-x-20 justify-center items-center">
      <div className="flex flex-col gap-y-6 items-center">
        <form action={formAction} className="flex flex-col gap-y-6 min-w-72">
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
          <Button
            disabled={isPending}
            className="bg-white border border-primary text-secondary-foreground"
          >
            회원가입
          </Button>
        </form>
        <Link className="text-sm text-sky-700" href={AUTH_ROUTES.LOGIN}>
          아직 계정이 없으신가요?
        </Link>
      </div>
      {/* <div className="basis-56">이미지</div> */}
    </div>
  );
}
