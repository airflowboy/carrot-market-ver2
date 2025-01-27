"use client";

import { useFormStatus } from "react-dom";

interface FormBtnProps {
  text: string;
}

export default function FormBtn({ text }: FormBtnProps) {
  // 폼 상태를 확인 (ex) 로딩중인지 )
  // 폼 상태를 확인하여 변화를 줄 컴포넌트에서 사용해야됨.
  // Form의 자식컴포넌트에서 사용
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? <span>로딩중...</span> : <span>{text}</span>}
    </button>
  );
}
