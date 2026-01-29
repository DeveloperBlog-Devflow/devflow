'use client';

import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import FormField from './FormField';
import { auth } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

type FindPasswordModalProps = {
  onClose: () => void;
};

const FindPasswordModal = ({ onClose }: FindPasswordModalProps) => {
  // 이메일 state
  const [email, setEmail] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);

  // 모달이 열릴 때 이메일 input에 포커스
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  // 재전송 버튼 클릭 시 이벤트 메서드
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.info('이메일을 입력해주세요');
      return;
    }

    // 이메일 요청 로직
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('이메일이 발송되었습니다.');
      })
      .catch((error) => {
        console.log('에러 발생: ' + error.message);
        toast.error('오류가 발생했습니다.');
      });
  };

  // esc로 모달을 닫을 수 있는 기능
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-opacity"
      onClick={onClose}
    >
      <div
        className="bg-surface relative w-full max-w-lg rounded-2xl p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="text-text-sub hover:bg-surface-alt hover:text-text absolute top-5 right-5 flex size-8 items-center justify-center rounded-xl transition-colors"
          aria-label="모달 닫기"
        >
          <span className="text-2xl">&times;</span>
        </button>

        {/* 헤더 */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">비밀번호 재설정</h2>
          <p className="text-text-sub mt-2 text-sm">
            가입한 메일로 재설정 링크를 보내드려요
          </p>
        </div>

        {/* 입력창 */}
        <form className="space-y" onSubmit={handleSubmit}>
          <FormField
            id="sending-email"
            type="email"
            label="이메일"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailInputRef}
          />

          {/* 보내기 버튼 */}
          <Button type="submit" variant="primary" className="mt-8">
            <span>재설정 링크 보내기</span>
          </Button>
        </form>
      </div>
    </div>
  );
};

export default FindPasswordModal;
