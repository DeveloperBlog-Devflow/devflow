'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import Card from '../home/Card';
import TaskItem from './TaskItem';
import InlineAddTaskForm from './InlineAddTaskForm';
import {
  fecthPlanItems, // lib/planManageService의 함수명 오타 주의 (fetchPlanItems인지 확인)
  toggleItemStatus,
  PlanItem,
  addPlanItem,
} from '@/lib/planManageService';

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
  const [isAddingTask, setIsAddingTask] = useState(false);

  // 1. 초기 데이터 로드 (Page.tsx와 동일한 패턴)
  // useEffect 안에서 로직을 직접 수행합니다.
  useEffect(() => {
    const loadInitialTasks = async () => {
      // userId나 planId가 없으면 로드하지 않음
      if (!userId || !planId) return;

      try {
        setIsTasksLoading(true);
        const fetchedTasks = await fecthPlanItems(userId, planId);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('하위 항목 로딩 실패:', error);
        setTasks([]);
      } finally {
        setIsTasksLoading(false);
      }
    };

    loadInitialTasks();
  }, [userId, planId]); // userId나 planId가 바뀔 때만 실행됨

  // 2. 하위 항목 상태(완료/미완료) 토글 핸들러
  const handleToggleTask = async (itemId: string, currentStatus: boolean) => {
    try {
      // (옵션) UI 반응성을 위해 미리 상태 업데이트 (Optimistic Update)
      setTasks((prev) =>
        prev.map((task) =>
          task.id === itemId ? { ...task, isChecked: !currentStatus } : task
        )
      );

      // DB 업데이트
      await toggleItemStatus(userId, itemId, currentStatus);

      // 데이터 최신화: DB 업데이트 후 목록을 다시 불러옵니다.
      const updatedTasks = await fecthPlanItems(userId, planId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('상태 변경 실패:', error);
      // 에러 시 원래대로 돌리거나 다시 불러오기
      const rolledBackTasks = await fecthPlanItems(userId, planId);
      setTasks(rolledBackTasks);
    }
  };

  // 3. 하위 항목 추가 저장 핸들러
  const handleSaveTask = async (text: string, deadline?: Date) => {
    try {
      // DB에 추가
      await addPlanItem(userId, planId, text, deadline);

      // 데이터 최신화: 추가 후 목록을 다시 불러옵니다.
      const updatedTasks = await fecthPlanItems(userId, planId);
      setTasks(updatedTasks);

      setIsAddingTask(false); // 입력 폼 닫기
    } catch (error) {
      console.error('하위 항목 추가 실패:', error);
    }
  };

  // 완료된 할 일 개수 계산
  const completedCount = tasks.filter((t) => t.isChecked).length;
  const totalCount = tasks.length;

  return (
    <Card className="mb-4 transition-all duration-200">
      {/* 헤더 영역 */}
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
          <div className="flex flex-col gap-2">
            {isTasksLoading ? (
              <p className="py-4 text-center text-sm text-gray-400">
                로딩 중...
              </p>
            ) : tasks.length === 0 && !isAddingTask ? (
              <p className="py-2 text-center text-sm text-gray-400">
                등록된 하위 항목이 없습니다.
              </p>
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

          {/* 추가 폼 영역 */}
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
