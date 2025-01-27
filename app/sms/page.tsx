"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { smsLogin } from "./actions";
import { useActionState } from "react";

const initialState = {
  token: false,
  errors: undefined,
};

export default function SMSLogin() {
  const [state, formAction] = useActionState(smsLogin, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">휴대폰 번호를 인증해주세요</h2>
      </div>
      <form action={formAction} className="flex flex-col gap-3">
        {!state?.token ? (
          <Input
            name="phone"
            type="text"
            placeholder="휴대폰 번호"
            required={true}
            errors={state?.errors?.formErrors}
          />
        ) : null}
        {state?.token ? (
          <Input
            name="token"
            type="number"
            placeholder="전송 토큰"
            required={true}
            errors={state?.errors?.formErrors}
            min={100000}
            max={999999}
          />
        ) : null}
        <Button text={state?.token ? "토큰 인증" : "인증 요청"} />
      </form>
    </div>
  );
}
