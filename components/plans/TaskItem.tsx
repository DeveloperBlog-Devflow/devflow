import { Check, Calendar } from 'lucide-react';

interface TaskItemProps {
  id: string; // id (토글 식별용)
  text: string;
  isCompleted: boolean;
  deadline?: string | Date; // Date 타입 받을 수 있게 유연하게
  onToggle: (id: string, currentStatus: boolean) => void; // 토글 핸들러
}

export default function TaskItem({
  id,
  text,
  isCompleted,
  deadline,
  onToggle,
}: TaskItemProps) {
  // 날짜 포맷팅 (Date 객체나 문자열 모두 처리)
  const formatDate = (d: string | Date | undefined) => {
    if (!d) return '';
    if (typeof d === 'string') return d;
    return d.toISOString().split('T')[0]; // YYYY-MM-DD 형식
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
    </div>
  );
}
