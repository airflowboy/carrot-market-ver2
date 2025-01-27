import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">휴대폰 번호를 인증해주세요</h2>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          name="phone"
          type="number"
          placeholder="휴대폰 번호"
          required={true}
          errors={[]}
        />
        <FormInput
          name="code"
          type="number"
          placeholder="전송 코드"
          required={true}
          errors={[]}
        />
        <FormBtn text="인증하기" />
      </form>
    </div>
  );
}
