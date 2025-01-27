import { InputHTMLAttributes } from "react";

interface InputProps {
  // FromInput의 타입에 InputHTMLAttributes를 추가하여 모든 속성을 사용할 수 있도록 함 (ex) type, placeholder, required 등)
  // name을 남기는 이유는 input태그의 name을 누락했을때 타입스크립트 에러가 발생하여 확인할 수 있도록 하기 위해서
  errors?: string[];
  name: string;
}

export default function Input({
  errors = [],
  name,

  // ...props를 사용하여 명시적으로 input의 속성을 받아오는 것이 아니라 모든 속성을 받아올 수 있도록 함
  ...props
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  console.log(props);
  return (
    <div className="flex flex-col gap-2">
      <input
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-orange-500
            border-none placeholder:text-neutral-400"
        name={name}
        {...props}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
