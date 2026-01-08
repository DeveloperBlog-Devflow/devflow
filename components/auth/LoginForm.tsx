'use client';

import FormField from '@/components/auth/FormField';
import { FaGithub } from 'react-icons/fa';
import Button from '@/components/auth/Button';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import {
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type LoginFormProps = {
  handleOpenModal: () => void;
};

const LoginForm = ({ handleOpenModal }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const githubProvider = new GithubAuthProvider();

  const handleGithubLogin = async () => {
    try {
      const result: UserCredential = await signInWithPopup(
        auth,
        githubProvider
      );
      const user = result.user;
      // console.log('로그인 성공 : ', user);
      router.push('/main');
    } catch (err: unknown) {
      if (err instanceof Error) {
        // console.log('로그인 에러 : ', err.message);
      }
    }
  };

  // 이메일 로그인 메서드
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (isLoading) return;
    setIsLoading(true);

    // 유효성 검사
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log('로그인 성공!', userCredential.user);
      router.push('/main');
    } catch (err) {
      // console.error('로그인 에러:', err);
      setError('이메일 또는 비밀번호가 잘못되었습니다.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <FormField
          id="email"
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
        />
        <FormField
          id="password"
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

      <button
        type="button"
        className="text-primary mt-2 ml-auto block cursor-pointer text-xs font-medium"
        onClick={handleOpenModal}
      >
        비밀번호를 잊으셨나요?
      </button>
      <Button className="mt-6" type="submit">
        {isLoading ? '로그인 중...' : '이메일로 로그인하기'}
      </Button>

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

      <Button
        variant="github"
        onClick={handleGithubLogin}
        type="button"
        disabled={isLoading}
      >
        <FaGithub className="text-xl" />
        <span>Github로 로그인</span>
      </Button>
    </form>
  );
};

export default LoginForm;
