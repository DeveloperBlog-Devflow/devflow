'use client';

import { useState } from 'react';
import { Button } from './Button';

type FindPasswordModalProps = {
  onClose: () => void;
};

export function FindPasswordModal({ onClose }: FindPasswordModalProps) {
  // 이메일 state
  const [email, setEmail] = useState('');

  // 재전송 버튼 클릭 시 이벤트 메서드
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email);

    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    // 이메일 요청 로직
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 transition-opacity">
      <div className="bg-surface relative w-full max-w-lg rounded-2xl p-8 shadow-xl">
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
        <form className="space-y-1.5" onSubmit={handleSubmit}>
          <label
            htmlFor="sending-email"
            className="text-text text-sm font-medium"
          >
            이메일
          </label>
          <input
            id="sending-email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-border focus:border-primary focus:ring-primary/30 w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:ring-2 focus:outline-none"
          />

          {/* 보내기 버튼 */}
          <Button type="submit" variant="primary" className="mt-8">
            <span>재설정 링크 보내기</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
