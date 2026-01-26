'use client';

import { useMemo } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

type HeatmapValue = {
  date: string;
  count: number;
};

/** 이번 주 토요일 기준으로 endDate 맞추기 (GitHub 느낌) */
function endOfWeek(date = new Date()) {
  const d = new Date(date);
  const diff = 6 - d.getDay(); // 0=Sun, 6=Sat
  d.setDate(d.getDate() + diff);
  return d;
}

/** mock data: 최근 1년 */
function buildMockValues(days = 366): HeatmapValue[] {
  const out: HeatmapValue[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);

    const iso = d.toISOString().slice(0, 10);

    const r = Math.random();
    const count =
      r < 0.65 ? 0 : r < 0.85 ? 1 : r < 0.95 ? 2 : r < 0.985 ? 3 : 4;

    if (count > 0) out.push({ date: iso, count });
  }

  return out;
}

export default function GrassHeatmap() {
  const endDate = useMemo(() => endOfWeek(new Date()), []);
  const startDate = useMemo(() => {
    const d = new Date(endDate);
    d.setFullYear(d.getFullYear() - 1);
    d.setDate(d.getDate() + 1);
    return d;
  }, [endDate]);

  const values = useMemo(() => buildMockValues(366), []);

  return (
    <>
      {/* 가로 길어질 때 대비 */}
      <div className="overflow-x-auto">
        <div className="min-w-max">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={values}
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
              if (!value) return { 'data-tip': '기록 없음' };
              return { 'data-tip': `${value.date} · ${value.count}개 완료` };
            }}
          />
        </div>
      </div>

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
