'use client';

import AuthCard from '@/components/auth/AuthCard';
import FindPasswordModal from '@/components/auth/FindPasswordModal';
import LoginForm from '@/components/auth/LoginForm';
import { useState } from 'react';

const Page = () => {
  // 비밀번호 재설정 모달 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달 열기 & 닫기 메서드
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background">
      <AuthCard title="로그인" description="로그인해서 학습을 이어가세요">
        <LoginForm handleOpenModal={handleOpenModal} />
      </AuthCard>
      {isModalOpen && <FindPasswordModal onClose={handleCloseModal} />}
    </div>
  );
};

export default Page;
