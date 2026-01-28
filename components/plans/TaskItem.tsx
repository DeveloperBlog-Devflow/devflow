'use client';

import { Check, Calendar, Edit2, Trash2, MoreVertical, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import DatePicker from './DatePicker';

interface TaskItemProps {
  id: string; // id (토글 식별용)
  text: string;
  isCompleted: boolean;
  deadline?: Date; // Date 타입 받을 수 있게 유연하게
  onToggle: (id: string, currentStatus: boolean) => void; // 토글 핸들러
  onDelete: (itemId: string, text: string) => void;
  onUpdate: (
    itemId: string,
    newText: string,
    newDeadline?: Date | null
  ) => void;
}

export default function TaskItem({
  id,
  text,
  isCompleted,
  deadline,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [showPlanItemMenu, setShowPlanItemMenu] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  // deadline이 string으로 올 수도 있으니 안전하게 변환 (보통은 Date로 옴)
  const [editDeadline, setEditDeadline] = useState<Date | undefined>(undefined);

  const menuRef = useRef<HTMLDivElement>(null);

  // 날짜 포맷팅 (Date 객체나 문자열 모두 처리)
  const formatDate = (d: string | Date | undefined) => {
    if (!d) return '';
    if (typeof d === 'string') return d;

    // 로컬 시간 메서드 사용 (시차 방지)
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
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

  // 하위항목 수정 모드 시작
  const handleStartEdit = (e: React.MouseEvent) => {
    e.stopPropagation();

    setEditText(text);
    setEditDeadline(deadline);

    setIsEditing(true);
    setShowPlanItemMenu(false);
  };

  // 하위 항목 수정 저장
  const handleSaveEdit = () => {
    if (!editText.trim()) return;
    // 변경된 내용 부모에게 전달 (날짜가 없으면 null)
    onUpdate(id, editText, editDeadline || null);
    setIsEditing(false);
  };

  // 하위 항목 수정 취소
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="animate-fadeIn mb-2 flex items-center gap-3 rounded-xl border-2 border-[#556BD6]/30 bg-white p-2 pl-4 shadow-sm">
        {/* 아이콘 (수정 모드임을 표시) */}
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50">
          <Edit2 size={14} className="text-[#556BD6]" />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          {/* 텍스트 입력 */}
          <input
            autoFocus
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing)
                handleSaveEdit();
              if (e.key === 'Escape') handleCancelEdit();
            }}
            className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />

          {/* 날짜 선택 (DatePicker 재사용) */}
          <div className="flex items-center">
            <DatePicker date={editDeadline} setDate={setEditDeadline} />
          </div>
        </div>

        {/* 저장/취소 버튼 */}
        <div className="flex items-center gap-1 pr-2">
          <button
            onClick={handleSaveEdit}
            className="rounded-lg p-2 text-[#556BD6] transition-colors hover:bg-[#556BD6]/10"
          >
            <span className="text-xs font-bold">저장</span>
          </button>
          <button
            onClick={handleCancelEdit}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`mb-2 flex items-center justify-between rounded-xl p-4 transition-colors ${
          isCompleted ? 'bg-gray-50' : 'bg-gray-100'
        }`}
      >
        <div className="flex w-full items-center gap-3">
          {/* 체크박스 */}
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

          {/* 텍스트 및 날짜 표시 */}
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
                <Calendar size={10} />
                마감: {formatDate(deadline)}
              </span>
            )}
          </div>
        </div>

        {/* 메뉴 버튼 */}
        <div
          ref={menuRef}
          className={`relative ${showPlanItemMenu ? 'z-50' : 'z-10'}`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
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
                onClick={handleStartEdit} // ✅ 수정 시작
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
}
