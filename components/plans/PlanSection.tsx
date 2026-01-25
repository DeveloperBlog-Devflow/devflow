'use client';

import { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Edit2,
  MoreVertical,
  Plus,
  Trash2,
} from 'lucide-react';
import Card from '../home/Card';
import TaskItem from './TaskItem';
import InlineAddTaskForm from './InlineAddTaskForm';
import {
  fetchPlanItems,
  toggleItemStatus,
  PlanItem,
  addPlanItem,
  deletePlanItem,
} from '@/lib/planManageService';

interface PlanSectionProps {
  userId: string;
  planId: string;
  title: string;
  description?: string;
  onDeletePlan: (planId: string, title: string) => void;
}

export default function PlanSection({
  userId,
  planId,
  title,
  description,
  onDeletePlan,
}: PlanSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [tasks, setTasks] = useState<PlanItem[]>([]);
  const [isTasksLoading, setIsTasksLoading] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const [showPlanMenu, setShowPlanMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // 1. 초기 데이터 로드
  useEffect(() => {
    const loadInitialTasks = async () => {
      // userId나 planId가 없으면 로드하지 않음
      if (!userId || !planId) return;

      try {
        setIsTasksLoading(true);
        const fetchedTasks = await fetchPlanItems(userId, planId);
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

  // 1-2. 마우스 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 메뉴가 열려있고, 클릭된 요소가 menuRef 내부가 아니라면 닫기
      if (
        showPlanMenu &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setShowPlanMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // 언마운트 시 제거
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPlanMenu]);

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
      const updatedTasks = await fetchPlanItems(userId, planId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('상태 변경 실패: ', error);
      // 에러 시 원래대로 돌리거나 다시 불러오기
      const rolledBackTasks = await fetchPlanItems(userId, planId);
      setTasks(rolledBackTasks);
    }
  };

  // 3. 하위 항목 추가 핸들러
  const handleSaveTask = async (text: string, deadline?: Date) => {
    try {
      // DB에 추가
      await addPlanItem(userId, planId, text, deadline);

      // 데이터 최신화: 추가 후 목록을 다시 불러옵니다.
      const updatedTasks = await fetchPlanItems(userId, planId);
      setTasks(updatedTasks);

      setIsAddingTask(false); // 입력 폼 닫기
    } catch (error) {
      console.error('하위 항목 추가 실패: ', error);
    }
  };

  // 4. 플랜 삭제 핸들러
  const handleDeletePlan = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 열림/닫힘 방지

    onDeletePlan(planId, title);

    setShowPlanMenu(false);
  };

  // 5. 하위 항목 삭제 핸들러
  const handleDeletePlanItem = async (itemId: string, title: string) => {
    if (confirm(`'${title}' 하위 항목을 정말 삭제하시겠습니까?`)) {
      try {
        await deletePlanItem(userId, itemId);

        // 목록 새로고침
        const fetchedPlanItems = await fetchPlanItems(userId, planId);
        setTasks(fetchedPlanItems);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 완료된 할 일 개수 계산
  const completedCount = tasks.filter((t) => t.isChecked).length;
  const totalCount = tasks.length;

  // isOpen 상태 false 시 포커스 초기화
  useEffect(() => {
    setIsAddingTask(false); //
    setShowPlanMenu(false); // 드롭다운 메뉴
  }, [isOpen]);

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
          <div className="relative z-10" ref={menuRef}>
            <button
              onClick={(e) => {
                e.stopPropagation(); // 부모 클릭(아코디언 토글) 방지
                setShowPlanMenu(!showPlanMenu);
              }}
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100"
            >
              <MoreVertical size={20} />
            </button>

            {/* 드롭다운 메뉴 (절대 위치) */}
            {showPlanMenu && (
              <div className="absolute top-8 right-0 w-32 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('플랜 수정 기능');
                  }}
                >
                  <Edit2 size={14} /> 수정
                </button>
                <button
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  onClick={handleDeletePlan}
                >
                  <Trash2 size={14} /> 삭제
                </button>
              </div>
            )}
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
                  onDelete={handleDeletePlanItem}
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
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#556BD6]/30 py-3 text-sm font-medium text-[#556BD6] transition-colors hover:bg-[#556BD6]/5"
            >
              <Plus size={16} /> 새 하위항목 추가
            </button>
          )}
        </div>
      )}
    </Card>
  );
}
