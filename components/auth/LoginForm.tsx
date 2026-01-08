'use client';

import FormField from '@/components/auth/FormField';
import { FaGithub } from 'react-icons/fa';
import Button from '@/components/auth/Button';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import {
  GithubAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

type LoginFormProps = {
  handleOpenModal: () => void;
};

const LoginForm = ({ handleOpenModal }: LoginFormProps) => {
  const router = useRouter();

  const githubProvider = new GithubAuthProvider();
  const handleGithubLogin = async () => {
    try {
      const result: UserCredential = await signInWithPopup(
        auth,
        githubProvider
      );
      const user = result.user;
      console.log('로그인 성공 : ', user);
      router.push('/main');
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log('로그인 에러 : ', err.message);
      }
    }
  };

  return (
    <>
      <div className="space-y-6">
        <FormField id="email" label="이메일" type="email" />
        <FormField id="password" label="비밀번호" type="password" />
      </div>

      <button
        type="button"
        className="text-primary mt-2 ml-auto block cursor-pointer text-xs font-medium"
        onClick={handleOpenModal}
      >
        비밀번호를 잊으셨나요?
      </button>
      <Button className="mt-6"> 이메일로 로그인하기</Button>

      <p className="text-text-sub mt-4 text-center text-sm">
        계정이 없으신가요?
        <Link
          className="text-primary ml-1 cursor-pointer font-medium"
          href="/signup"
        >
          회원가입
        </Link>
      </p>
      <div className="text-muted my-6 flex items-center gap-4 text-sm">
        <div className="bg-border h-px flex-1" />
        <span>또는</span>
        <div className="bg-border h-px flex-1" />
      </div>

      <Button variant="github">
        <FaGithub className="text-xl" />
        <span onClick={handleGithubLogin}>Github로 로그인</span>
      </Button>
    </>
  );
};

export default LoginForm;
