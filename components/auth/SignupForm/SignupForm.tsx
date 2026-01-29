'use client';

import Link from 'next/link';
import FormField from '@/components/auth/FormField';
import { SignupValues, useSignupForm } from './useSignupForm';
import { useRouter } from 'next/navigation';
import { signupWithEmail } from '@/services/auth/signup.service';
import { toast } from 'react-toastify';

const toPayload = (v: SignupValues) => ({
  nickname: v.nickname,
  email: v.email,
  password: v.password,
});

const SignupForm = () => {
  const router = useRouter();
  const { values, errors, register, showError, hasError, touchAll } =
    useSignupForm();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    touchAll();
    if (hasError()) return;

    try {
      await signupWithEmail(toPayload(values));
      toast.success('회원가입 완료되었습니다.');
      router.push('/login');
    } catch (e: unknown) {
      const code =
        typeof e === 'object' &&
        e &&
        'code' in e &&
        typeof (e as { code: unknown }).code === 'string'
          ? (e as { code: string }).code
          : '';

      if (code === 'auth/email-already-in-use')
        toast.info('이미 가입된 이메일입니다.');
      else toast.error('회원가입에 실패했습니다');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-6">
        <FormField
          id="nickname"
          label="닉네임"
          error={errors.nickname}
          showError={showError('nickname')}
          {...register('nickname')}
        />
        <FormField
          id="email"
          label="이메일"
          type="email"
          error={errors.email}
          showError={showError('email')}
          {...register('email')}
        />
        <FormField
          id="password"
          label="비밀번호"
          type="password"
          error={errors.password}
          showError={showError('password')}
          {...register('password')}
        />
        <FormField
          id="passwordConfirm"
          label="비밀번호 확인"
          type="password"
          error={errors.passwordConfirm}
          showError={showError('passwordConfirm')}
          {...register('passwordConfirm')}
        />
      </div>

      <button
        type="submit"
        className="bg-primary hover:bg-primary-hover active:bg-primary-active mt-6 h-12 w-full cursor-pointer rounded-lg text-base font-medium text-white transition-all duration-150 active:scale-[0.98]"
      >
        가입하기
      </button>

      <p className="text-text-sub mt-4 text-center text-sm">
        계정이 있으신가요?
        <Link
          className="text-primary ml-1 cursor-pointer font-medium"
          href="/login"
        >
          로그인
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
