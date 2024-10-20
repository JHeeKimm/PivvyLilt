"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { pageRoutes } from "@/apiRoutes";
import { ErrorMessage } from "../ErrorMessage";
import { useFormState } from "react-dom";
import { createUser } from "@/actions/createUser";

export default function SignUpForm() {
  const [state, formAction, isPending] = useFormState(createUser, undefined);

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     // validateField(name, value);
  //     formAction.validateField({ name, value });
  //   };

  return (
    <div className="flex gap-x-20 justify-center items-center">
      <div className="flex flex-col gap-y-6 items-center">
        <form action={formAction} className="flex flex-col gap-y-6 min-w-72">
          <h2 className="font-bold text-center">회원가입</h2>
          <div className="">
            <Label>Nickname</Label>
            <Input
              type="name"
              name="nickName"
              placeholder="닉네임을 입력해주세요"
              required
            />
            {state?.errors?.nickName && (
              <ErrorMessage message={state?.errors?.nickName[0]} />
            )}
          </div>
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
          <Button
            disabled={isPending}
            className="bg-white border border-primary text-secondary-foreground"
          >
            회원가입
          </Button>
        </form>
        <Link className="text-sm text-sky-700" href={pageRoutes.login}>
          이미 계정이 있나요?
        </Link>
      </div>
      {/* <div className="basis-56">이미지</div> */}
    </div>
  );
}
