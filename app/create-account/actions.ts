"use server";

import bcrypt from "bcrypt";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR_MESSAGE,
} from "@/lib/constants";
import db from "@/lib/db";
// zod를 사용하여 formData를 검증
import { z } from "zod";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const checkPasswordIsEqualConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
};

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

// formData를 검증할 스키마
// 각 필드에 parameter를 추가하여 규칙을 추가할 수 있음
// ex) string에는 required_error를 추가하여 필수 입력 항목임을 알림

// toLowerCase() : 문자열을 소문자로 변환
// trim() : 문자열 양쪽의 공백을 제거
// refine() : 추가적인 검증 규칙을 추가할 수 있음
const formSchema = z
  .object({
    username: z
      .string()
      .toLowerCase()
      .trim()
      .refine(
        (username) => checkUniqueUsername(username),
        "This username is already taken"
      ),
    email: z
      .string()
      .email()
      .toLowerCase()
      .trim()
      .refine(checkUniqueEmail, "This email is already taken"),
    password: z
      .string()
      .min(PASSWORD_MIN_LENGTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR_MESSAGE),
    confirmPassword: z.string().min(4),
  })
  .refine(
    ({ password, confirmPassword }) =>
      checkPasswordIsEqualConfirmPassword(password, confirmPassword),
    {
      // confirmPassword 에러라는 것을 알려줌
      message: "비밀번호가 일치하지 않습니다",
      path: ["confirmPassword"], // 에러를 표시할 필드
    }
  );

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  // 검증 후 결과를 return
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getIronSession(await cookies(), {
      cookieName: "session",
      password: process.env.IRON_SESSION_PASSWORD!,
    });
    // @ts-expect-error
    session.id = user.id;
    await session.save();

    redirect("/profile");
  }
}
