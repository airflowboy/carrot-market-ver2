"use client";

import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import Input from "@/components/input";
import { createAccount } from "./actions";
import { useActionState } from "react";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
  const [state, formAction] = useActionState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">가입을 위해 내용을 채워주세요</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="유저이름"
          required={true}
          errors={state?.fieldErrors?.username}
        />
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          required={true}
          errors={state?.fieldErrors?.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required={true}
          errors={state?.fieldErrors?.password}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          required={true}
          errors={state?.fieldErrors?.confirmPassword}
          minLength={PASSWORD_MIN_LENGTH}
        />
        <Button text="계정 생성하기" />
      </form>
      <SocialLogin />
    </div>
  );
}
