'use client';

import TodayPlanContainer from './TodayPlanContainer';
import type { PlanItem } from '@/services/plans/planManageService.service';

interface BottomSectionProps {
  className?: string;
  items: PlanItem[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string, checked: boolean) => void;
}

export default function BottomSection({
  className,
  items,
  loading,
  error,
  onToggle,
}: BottomSectionProps) {


  return (
    <div className={className}>
      <TodayPlanContainer
        items={items}
        loading={loading}
        error={error}
        onToggle={onToggle}
      ></TodayPlanContainer>

      {/* <Card title="다가오는 일정">
        <CheckList
          items={upcoming}
          onToggle={toggleUpcoming}
          emptyText="다가오는 일정이 없습니다"
        />
      </Card> */}
    </div>
  );
}
