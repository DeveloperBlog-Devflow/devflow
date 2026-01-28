'use client';

import Card from '@/components/home/Card';
import CheckList from '@/components/home/CheckList';
import { PlanItem } from '@/services/plans/planManageService.service';

type Props = {
  items: PlanItem[];
  loading: boolean;
  error: string | null;
  limit: number;
};

export default function UpcomingPlanContainer({
  items,
  loading,
  error,
  limit,
}: Props) {
  if (loading) {
    return <div className="text-sm text-gray-400">불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }

  const visible = items.slice(0, limit);
  const hiddenCount = Math.max(items.length - limit, 0);

  return (
    <Card title="다가오는 일정">
      <CheckList
        items={visible}
        onToggleTodo={() => {}}
        emptyText="다가오는 일정이 없습니다"
      />

      {hiddenCount > 0 && (
        <p className="mt-2 text-xs text-gray-400">
          +{hiddenCount}개의 일정이 더 있습니다
        </p>
      )}
    </Card>
  );
}
