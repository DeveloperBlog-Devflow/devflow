// components/dashboard/PlanSection.tsx
'use client'; // 상태 관리를 위해 클라이언트 컴포넌트 선언

import { useState } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import Card from '../home/Card'; // 기존에 만든 Card 재사용
import TaskItem from './TaskItem';

interface Task {
  id: number;
  text: string;
  date: string;
  isChecked: boolean;
}

interface PlanSectionProps {
  title: string;
  description: string;
  tasks: Task[];
}

export default function PlanSection({
  title,
  description,
  tasks,
}: PlanSectionProps) {
  const [isOpen, setIsOpen] = useState(true); // 기본적으로 열려있게 설정

  // 완료된 할 일 개수 계산
  const completedCount = tasks.filter((t) => t.isChecked).length;
  const totalCount = tasks.length;

  return (
    <Card className="mb-4 transition-all duration-200">
      {/* 헤더 영역 (클릭 시 토글) */}
      <div
        className="flex cursor-pointer items-start justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="block text-xs text-gray-500">진행률</span>
            <span className="text-lg font-bold text-[#556BD6]">
              {completedCount}/{totalCount}
            </span>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </button>
        </div>
      </div>

      {/* 펼쳐지는 내용 영역 */}
      {isOpen && (
        <div className="animate-fadeIn mt-6">
          {/* 할 일 목록 */}
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                text={task.text}
                date={task.date}
                isCompleted={task.isChecked}
              />
            ))}
          </div>

          {/* 하위 항목 추가 버튼 (점선) */}
          <button className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[#556BD6]/30 py-3 text-sm font-medium text-[#556BD6] transition-colors hover:bg-[#556BD6]/5">
            <Plus size={16} /> 새 하위항목 추가
          </button>
        </div>
      )}
    </Card>
  );
}
