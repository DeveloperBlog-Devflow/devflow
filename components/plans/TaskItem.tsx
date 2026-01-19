import { Check } from 'lucide-react';

interface TaskItemProps {
  text: string;
  date: string;
  isCompleted: boolean;
}

export default function TaskItem({ text, date, isCompleted }: TaskItemProps) {
  return (
    <div
      className={`mb-2 flex items-center gap-3 rounded-xl p-4 transition-colors ${
        isCompleted ? 'bg-gray-50' : 'bg-gray-100'
      }`}
    >
      {/* 체크박스 커스텀 */}
      <div
        className={`flex h-6 w-6 cursor-pointer items-center justify-center rounded-md border transition-colors ${
          isCompleted
            ? 'border-green-500 bg-green-500 text-white'
            : 'border-gray-300 bg-white hover:border-purple-400'
        }`}
      >
        {isCompleted && <Check size={16} strokeWidth={3} />}
      </div>

      <div className="flex flex-col">
        <span
          className={`text-sm font-medium ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700'}`}
        >
          {text}
        </span>
        <span className="text-xs text-gray-400">마감: {date}</span>
      </div>
    </div>
  );
}
