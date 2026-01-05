import { FormField } from '@/components/auth/FormField';

export function SignupForm() {
  return (
    <>
      <div className="space-y-6">
        <FormField id="nickname" label="닉네임" />
        <FormField id="email" label="이메일" type="email" />
        <FormField id="password" label="비밀번호" type="password" />
        <FormField id="passwordConfirm" label="비밀번호 확인" type="password" />
      </div>

      <button className="bg-primary hover:bg-primary-hover active:bg-primary-active mt-6 h-12 w-full cursor-pointer rounded-lg text-base font-medium text-white transition-all duration-150 active:scale-[0.98]">
        가입하기
      </button>

      <p className="text-text-sub mt-4 text-center text-sm">
        계정이 있으신가요?
        <a className="text-primary ml-1 cursor-pointer font-medium">로그인</a>
      </p>
    </>
  );
}
