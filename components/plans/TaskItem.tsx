'use client';

import { Check, Calendar, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface TaskItemProps {
  id: string; // id (토글 식별용)
  text: string;
  isCompleted: boolean;
  deadline?: string | Date; // Date 타입 받을 수 있게 유연하게
  onToggle: (id: string, currentStatus: boolean) => void; // 토글 핸들러
  onDelete: (itemId: string, text: string) => void;
}

export default function TaskItem({
  id,
  text,
  isCompleted,
  deadline,
  onToggle,
  onDelete,
}: TaskItemProps) {
  const [showPlanItemMenu, setShowPlanItemMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // 날짜 포맷팅 (Date 객체나 문자열 모두 처리)
  const formatDate = (d: string | Date | undefined) => {
    if (!d) return '';
    if (typeof d === 'string') return d;
    return d.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  };

  // 1-2. 마우스 클릭 감지
  useEffect(() => {
    // 메뉴가 닫혀있으면 실행하지 않음
    if (!showPlanItemMenu) return;

    const handleClickOutside = (event: MouseEvent) => {
      // menuRef가 존재하고, 클릭한 요소가 menuRef 내부가 아니라면 닫기
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowPlanItemMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPlanItemMenu]);

  const handleDeletePlanItem = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 열림/닫힘 방지

    onDelete(id, text);

    setShowPlanItemMenu(false);
  };

  return (
    <div
      className={`mb-2 flex items-center justify-between rounded-xl p-4 transition-colors ${
        isCompleted ? 'bg-gray-50' : 'bg-gray-100'
      }`}
    >
      <div className="flex w-full items-center gap-3">
        {/* 체크박스 (클릭 가능) */}
        <div
          onClick={() => onToggle(id, isCompleted)}
          className={`flex h-6 w-6 flex-shrink-0 cursor-pointer items-center justify-center rounded-md border transition-colors ${
            isCompleted
              ? 'border-green-500 bg-green-500 text-white'
              : 'border-gray-300 bg-white hover:border-purple-400'
          }`}
        >
          {isCompleted && <Check size={16} strokeWidth={3} />}
        </div>

        {/* 텍스트 내용 */}
        <div className="flex flex-col">
          <span
            className={`text-sm font-medium ${
              isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'
            }`}
          >
            {text}
          </span>
          {deadline && (
            <span className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
              {/* 작은 달력 아이콘 추가 */}
              <Calendar size={10} />
              마감: {formatDate(deadline)}
            </span>
          )}
        </div>
      </div>
      <div
        ref={menuRef}
        className={`relative ${showPlanItemMenu ? 'z-50' : 'z-10'}`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation(); // 부모 클릭(아코디언 토글) 방지
            setShowPlanItemMenu(!showPlanItemMenu);
          }}
          className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100"
        >
          <MoreVertical size={20} />
        </button>

        {showPlanItemMenu && (
          <div className="absolute top-8 right-0 w-32 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                alert('수정 기능');
              }}
            >
              <Edit2 size={14} /> 수정
            </button>
            <button
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              onClick={handleDeletePlanItem}
            >
              <Trash2 size={14} /> 삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
