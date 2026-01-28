'use client';

import Card from '@/components/home/Card';
import CheckList from '@/components/home/CheckList';
import { PlanItem } from '@/services/plans/planManageService.service';

type TodayPlanContainerProps = {
  items: PlanItem[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string, checked: boolean) => void;
};

export default function TodayPlanContainer({
  items,
  loading,
  error,
  onToggle,
}: TodayPlanContainerProps) {
  if (loading) {
    return <div className="text-sm text-gray-400">불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  return (
    <Card title="오늘의 할 일">
      <CheckList
        items={items}
        onToggleTodo={(id, checked) => onToggle(id, checked)}
        emptyText="오늘 완료할 계획이 없습니다"
        checkbox={true}
      />
    </Card>
  );
}
