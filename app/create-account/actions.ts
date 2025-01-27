"use server";

// zod를 사용하여 formData를 검증
import { z } from "zod";

// 비밀번호 정규식
const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const checkUsername = (username: string) => {
  return !username.includes("potato");
};

const checkPasswordIsEqualConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  return password === confirmPassword;
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
      .min(3)
      .max(10)
      .toLowerCase()
      .trim()
      .refine((username) => checkUsername(username), "No patato"),
    email: z.string().email().toLowerCase().trim(),
    password: z
      .string()
      .min(4)
      .regex(
        passwordRegex,
        "비밀번호 형식이 올바르지 않습니다. 비밀번호는 반드시 소문자, 대문자, 숫자, 특수문자를 포함해야 됩니다."
      ),
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
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
