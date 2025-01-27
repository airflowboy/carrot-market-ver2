export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const PASSWORD_REGEX_ERROR_MESSAGE =
  "비밀번호 형식이 올바르지 않습니다. 비밀번호는 반드시 소문자, 대문자, 숫자, 특수문자를 포함해야 됩니다.";
