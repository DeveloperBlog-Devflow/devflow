'use client';

import { useEffect, useMemo, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { fetchDailyStats } from '@/services/heatmap/dailyStat.service';

type HeatmapValue = { date: string; count: number };

function endOfWeek(date = new Date()) {
  const d = new Date(date);
  d.setDate(d.getDate() + (6 - d.getDay()));
  return d;
}

type Props = { uid?: string };

export default function GrassHeatmap({ uid }: Props) {
  const endDate = useMemo(() => endOfWeek(new Date()), []);
  const startDate = useMemo(() => {
    const d = new Date(endDate);
    d.setFullYear(d.getFullYear() - 1);
    d.setDate(d.getDate() + 1);
    return d;
  }, [endDate]);

  const [values, setValues] = useState<
    { date: string; total: number; tilCount?: number; todoDoneCount?: number }[]
  >([]);

  useEffect(() => {
    if (!uid) return;
    (async () => {
      const stats = await fetchDailyStats(uid);
      setValues(stats);
    })();
  }, [uid]);

  const byDate = useMemo(() => {
    const m = new Map<
      string,
      { tilCount: number; todoDoneCount: number; total: number }
    >();
    for (const s of values) {
      m.set(s.date, {
        tilCount: s.tilCount ?? 0,
        todoDoneCount: s.todoDoneCount ?? 0,
        total: s.total ?? 0,
      });
    }
    return m;
  }, [values]);

  const heatmapValues: HeatmapValue[] = useMemo(
    () => values.map((s) => ({ date: s.date, count: s.total ?? 0 })),
    [values]
  );

  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={heatmapValues}
            gutterSize={2}
            showWeekdayLabels
            classForValue={(value) => {
              if (!value) return 'grass-empty';
              if (value.count >= 4) return 'grass-4';
              if (value.count === 3) return 'grass-3';
              if (value.count === 2) return 'grass-2';
              return 'grass-1';
            }}
            tooltipDataAttrs={(value) => {
              if (!value?.date)
                return { 'data-tooltip-id': '', 'data-tooltip-html': '' };
              const d = byDate.get(value.date);

              const til = d?.tilCount ?? 0;
              const todo = d?.todoDoneCount ?? 0;
              const total = d?.total ?? 0;

              return {
                'data-tooltip-id': 'grass-tip',
                // HTML 툴팁 (작은 박스)
                'data-tooltip-html':
                  total === 0
                    ? `<div style="font-size:12px"><b>${value.date}</b><br/>기록 없음</div>`
                    : `<div style="font-size:12px">
                        <b>${value.date}</b><br/>
                        📘 TIL: ${til}개<br/>
                        ✅ Plan: ${todo}개<br/>
                        🔥 합계: ${total}개
                       </div>`,
              };
            }}
          />
        </div>
      </div>

      {/* 툴팁 컴포넌트 */}
      <Tooltip
        id="grass-tip"
        place="top"
        className="!rounded-lg !bg-black/80 !px-3 !py-2 !text-xs !text-white"
      />
      {/* 범례 */}
      <div className="mt-4 flex items-center justify-end gap-2 text-xs text-slate-500">
        <span>Less</span>
        <span className="h-3 w-3 rounded-sm bg-slate-100" />
        <span className="h-3 w-3 rounded-sm bg-emerald-200" />
        <span className="h-3 w-3 rounded-sm bg-emerald-400" />
        <span className="h-3 w-3 rounded-sm bg-emerald-600" />
        <span className="h-3 w-3 rounded-sm bg-emerald-800" />
        <span>More</span>
      </div>
    </>
  );
}
