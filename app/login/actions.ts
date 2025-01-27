"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR_MESSAGE,
} from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z
    .string({
      required_error: "비밀번호를 입력해주세요.",
    })
    .min(PASSWORD_MIN_LENGTH)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MESSAGE),
});

export const login = async (prevState: any, formData: FormData) => {
  // formData는 폼 데이터를 담은 객체
  // 폼 데이터를 사용하여 로그인 검증 및 처리

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
