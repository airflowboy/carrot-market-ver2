interface FormBtnProps {
  text: string;
  loading: boolean;
}

export default function FormBtn({ text, loading }: FormBtnProps) {
  return (
    <button
      disabled={loading}
      className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {loading ? <span>로딩중...</span> : <span>{text}</span>}
    </button>
  );
}
