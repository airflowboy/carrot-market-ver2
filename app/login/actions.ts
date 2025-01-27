"use server";

export const handleForm = async (prevState: any, formData: FormData) => {
  // formData는 폼 데이터를 담은 객체
  // 폼 데이터를 사용하여 로그인 검증 및 처리

  // 3초 딜레이로 로딩중일때 작업 구현
  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log(formData);
  return {
    errors: ["로그인 실패", "이메일 또는 비밀번호를 확인해주세요."],
  };
};
