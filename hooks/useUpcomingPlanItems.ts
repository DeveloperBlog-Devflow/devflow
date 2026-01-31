'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PlanItem } from '@/services/plans/planManageService.service';
import { fetchUpcomingPlanItems } from '@/services/plans/planManageService.service';

const startOfTomorrowKST = () => {
  // KST 기준 "내일 00:00"
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);

  const y = kst.getUTCFullYear();
  const m = kst.getUTCMonth();
  const d = kst.getUTCDate();

  // 내일 00:00 KST => UTC로 다시 변환(= -9h)
  const tomorrowKSTMidnightUTC = new Date(Date.UTC(y, m, d + 1, 0, 0, 0));
  const backToLocal = new Date(
    tomorrowKSTMidnightUTC.getTime() - 9 * 60 * 60 * 1000
  );

  return backToLocal;
};

export const useUpcomingPlanItems = (uid?: string) => {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fromDate = useMemo(() => startOfTomorrowKST(), []);

  const loadUpcoming = useCallback(async () => {
    if (!uid) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUpcomingPlanItems(uid, fromDate);
      setItems(data);
    } catch (e) {
      console.error(e);
      setError('다가오는 일정을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [uid, fromDate]);

  useEffect(() => {
    if (!uid) return;
    loadUpcoming();
  }, [uid, loadUpcoming]);

  return {
    items,
    loading,
    error,
    loadUpcoming,
  };
};
