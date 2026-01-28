import { ReactNode } from 'react';

// 흰 바탕의 카드

interface CardProps {
  children: ReactNode; // 카드 내부 내용들
  className?: string; // 추가 스타일링
  title?: string; // 좌측 상단 제목이 있는 경우
  rightSlot?: ReactNode;
}

const Card = ({ children, className = '', title, rightSlot }: CardProps) => {
  return (
    <div className={`bg-surface rounded-[10px] p-6 shadow-sm ${className}`}>
      {(title || rightSlot) && (
        <div className="mb-4 flex items-center justify-between">
          {title ? (
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          ) : (
            <div />
          )}

          {rightSlot}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
