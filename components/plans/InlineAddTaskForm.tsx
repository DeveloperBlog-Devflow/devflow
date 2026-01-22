import { useState } from 'react';
import { Calendar, Plus, X } from 'lucide-react';

interface InlineAddTaskFormProps {
  onSave: (text: string, date?: Date) => Promise<void>; // 저장 핸들러
  onCancel: () => void; // 취소 핸들러
}

export default function InlineAddTaskForm({
  onSave,
  onCancel,
}: InlineAddTaskFormProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 날짜 라이브러리를 붙일 예정이므로 지금은 임시 상태
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSave(text, selectedDate);
      setText(''); // 저장 후 초기화 (연속 입력을 위해 폼을 닫지 않을 수도 있음)
      // onCancel(); // 저장 후 닫고 싶다면 주석 해제
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 엔터키 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      handleSubmit();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="mb-2 flex items-center gap-3 rounded-xl border-2 border-purple-100 bg-white p-2 pl-4 shadow-sm">
      {/* 1. 체크박스 자리 (비활성 모양) */}
      <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-gray-200 bg-gray-50">
        <Plus size={14} className="text-gray-400" />
      </div>

      {/* 2. 입력 필드 (투명 배경) */}
      <div className="flex flex-1 flex-col gap-1">
        <input
          autoFocus
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="할 일을 입력하고 Enter를 누르세요"
          className="w-full bg-transparent text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
          disabled={isSubmitting}
        />

        {/* 3. 마감일 버튼 (요청하신 부분) */}
        <div className="flex items-center">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200"
            onClick={() => alert('나중에 달력 라이브러리 연결될 곳!')}
          >
            <Calendar size={12} />
            {selectedDate ? selectedDate.toLocaleDateString() : '마감일 설정'}
          </button>
        </div>
      </div>

      {/* 4. 우측 저장/취소 버튼 그룹 */}
      <div className="flex items-center gap-1 pr-2">
        <button
          onClick={() => handleSubmit()}
          disabled={!text.trim()}
          className="rounded-lg p-2 text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:hover:bg-transparent"
        >
          <span className="text-xs font-bold">추가</span>
        </button>
        <button
          onClick={onCancel}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
