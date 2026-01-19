import { ReactNode } from 'react';

// 흰 바탕의 카드

interface CardProps {
  children: ReactNode; // 카드 내부 내용들
  className?: string; // 추가 스타일링
  title?: string; // 좌측 상단 제목이 있는 경우
}

const Card = ({ children, className = '', title }: CardProps) => {
  return (
    <div className={`bg-surface rounded-[10px] p-6 shadow-sm ${className}`}>
      {title && (
        <h2 className="mb-4 text-lg font-bold text-gray-900">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;
