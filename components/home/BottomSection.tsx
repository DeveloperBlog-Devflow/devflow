'use client';

import TodayPlanContainer from './TodayPlanContainer';
import UpcomingPlanContainer from '@/components/home/UpcomingPlanContainer';
import type { PlanItem } from '@/services/plans/planManageService.service';
import { useUpcomingPlanItems } from '@/hooks/useUpcomingPlanItems';

interface BottomSectionProps {
  uid: string;
  className?: string;
  items: PlanItem[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string, checked: boolean) => void;
  todoTotal: number;
}

export default function BottomSection({
  uid,
  className,
  items,
  loading,
  error,
  onToggle,
  todoTotal,
}: BottomSectionProps) {
  const upcoming = useUpcomingPlanItems(uid);

  return (
    <div className={className}>
      {/* 오늘의 목표 */}
      <TodayPlanContainer
        items={items}
        loading={loading}
        error={error}
        onToggle={onToggle}
      ></TodayPlanContainer>

      {/* 다가오는 일정 */}
      <UpcomingPlanContainer
        items={upcoming.items}
        loading={upcoming.loading}
        error={upcoming.error}
        limit={todoTotal}
      />
    </div>
  );
}
