import { FormField } from '@/components/auth/FormField';
import { FaGithub } from 'react-icons/fa';

export function LoginForm() {
  return (
    <>
      <div className="space-y-6">
        <FormField id="email" label="이메일" type="email" />
        <FormField id="password" label="비밀번호" type="password" />
      </div>

      <p className="text-primary mt-2 ml-1 cursor-pointer text-right text-xs font-medium">
        비밀번호를 잊으셨나요?
      </p>
      <button className="bg-primary hover:bg-primary-hover active:bg-primary-active mt-6 h-12 w-full cursor-pointer rounded-lg text-base font-medium text-white transition-all duration-150 active:scale-[0.98]">
        이메일로 로그인하기
      </button>

      <p className="text-text-sub mt-4 text-center text-sm">
        계정이 없으신가요?
        <a className="text-primary ml-1 cursor-pointer font-medium">회원가입</a>
      </p>
      <div className="text-muted my-6 flex items-center gap-4 text-sm">
        <div className="bg-border h-px flex-1" />
        <span>또는</span>
        <div className="bg-border h-px flex-1" />
      </div>

      <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-black text-white transition-colors duration-150 hover:bg-neutral-900 active:scale-[0.98] active:bg-neutral-800">
        <FaGithub className="text-xl" />
        <span className="text-base font-medium">Github로 로그인</span>
      </button>
    </>
  );
}
