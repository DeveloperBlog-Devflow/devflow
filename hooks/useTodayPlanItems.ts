// hooks/useTodayPlanItems.ts
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PlanItem } from '@/services/plans/planManageService.service';
import {
  fetchTodayPlanItems,
  toggleItemStatus,
} from '@/services/plans/planManageService.service';

export const useTodayPlanItems = (uid?: string) => {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!uid) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodayPlanItems(uid);
      setItems(data);
    } catch (e) {
      console.error(e);
      setError('오늘의 계획을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [uid]);

  const total = useMemo(() => items.length, [items]);
  const completed = useMemo(
    () => items.reduce((acc, it) => acc + (it.isChecked ? 1 : 0), 0),
    [items]
  );
  const progressText = useMemo(
    () => `${completed}/${total}`,
    [completed, total]
  );

  // ✅ 토글만
  const toggle = useCallback(
    async (id: string, current: boolean) => {
      if (!uid) return;
      setError(null);

      // optimistic update
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, isChecked: !current } : it))
      );

      try {
        await toggleItemStatus(uid, id, current);
      } catch (e) {
        console.error(e);
        // rollback
        setItems((prev) =>
          prev.map((it) => (it.id === id ? { ...it, isChecked: current } : it))
        );
        setError('상태 변경에 실패했습니다.');
      }
    },
    [uid]
  );

  useEffect(() => {
    load();
  }, [load]);

  return {
    items,
    loading,
    error,
    toggle,
    progressText,
  };
};
