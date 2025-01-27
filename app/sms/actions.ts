"use server";
import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "올바른 휴대폰 번호를 입력해주세요."
  );
// coerce -> 문자열을 숫자로 변환, abc 같은 문자열이 들어오면 자동으로 검증해줌.
const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

export const smsLogin = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get("phone");
  const token = formData.get("token");

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);

    if (!result.success) {
      return {
        token: false,
        errors: result.error.flatten(),
      };
    } else {
      return {
        token: true,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        errors: result.error.flatten(),
      };
    } else {
      redirect("/");
    }
  }
};
