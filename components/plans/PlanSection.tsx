'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import Card from '../home/Card';
import TaskItem from './TaskItem';
import InlineAddTaskForm from './InlineAddTaskForm'; // 새로 추가
import {
  fecthPlanItems,
  toggleItemStatus,
  PlanItem,
  addPlanItem,
} from '@/lib/planManageService';

// PlanSection이 받을 Props 타입 정의
interface PlanSectionProps {
  userId: string;
  planId: string;
  title: string;
  description?: string;
}

export default function PlanSection({
  userId,
  planId,
  title,
  description,
}: PlanSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [tasks, setTasks] = useState<PlanItem[]>([]);
  const [isTasksLoading, setIsTasksLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false); // 하위 항목 추가 폼 표시 여부

  // 하위 항목 목록을 불러오는 함수
  const loadTasks = async () => {
    try {
      setIsTasksLoading(true);
      const fetchedTasks = await fecthPlanItems(userId, planId);
      setTasks(fetchedTasks);
    } catch (error) {
      console.error('하위 항목을 불러오는 데 실패했습니다.', error);
      setTasks([]); // 에러 발생 시 목록 비우기
    } finally {
      setIsTasksLoading(false);
    }
  };

  // 컴포넌트가 마운트되거나, planId가 바뀔 때 하위 항목을 불러옵니다.
  useEffect(() => {
    if (userId && planId) {
      loadTasks();
    }
  }, [userId, planId]);

  // 하위 항목 상태(완료/미완료)를 토글하는 핸들러
  const handleToggleTask = async (itemId: string, currentStatus: boolean) => {
    try {
      await toggleItemStatus(userId, itemId, currentStatus);
      await loadTasks(); // 토글 후 목록 새로고침
    } catch (error) {
      console.error('항목 상태 변경에 실패했습니다.', error);
    }
  };

  // 하위 항목을 저장하는 핸들러 (InlineAddTaskForm의 onSave에 연결)
  const handleSaveTask = async (text: string, deadline?: Date) => {
    try {
      await addPlanItem(userId, planId, text, deadline);
      await loadTasks(); // 추가 후 목록 새로고침
      setIsAddingTask(false); // 폼 닫기
    } catch (error) {
      console.error('하위 항목 추가에 실패했습니다.', error);
    }
  };

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
            {isTasksLoading ? (
              <p className="text-center text-gray-500">하위 항목을 불러오는 중...</p>
            ) : (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  id={task.id}
                  text={task.text}
                  deadline={task.deadline}
                  isCompleted={task.isChecked}
                  onToggle={handleToggleTask}
                />
              ))
            )}
          </div>

          {/* 하위 항목 추가 폼 또는 버튼 */}
          {isAddingTask ? (
            <InlineAddTaskForm
              onSave={handleSaveTask}
              onCancel={() => setIsAddingTask(false)}
            />
          ) : (
            <button
              onClick={() => setIsAddingTask(true)}
              className="mt-2 flex w-full items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[#556BD6]/30 py-3 text-sm font-medium text-[#556BD6] transition-colors hover:bg-[#556BD6]/5"
            >
              <Plus size={16} /> 새 하위항목 추가
            </button>
          )}
        </div>
      )}
    </Card>
  );
}
