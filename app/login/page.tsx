"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { handleForm } from "./actions";
import { useActionState } from "react";

export default function Login() {
  // 폼 상태 확인 후 상태표출. ex)에러 발생시 에러메시지 표출등.
  // useFormState -> useActionState로 변경됨.
  const [state, formAction] = useActionState(handleForm, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">이메일과 비밀번호를 입력해주세요</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        <Input name="email" type="email" placeholder="이메일" required={true} />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required={true}
        />
        <Button text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
