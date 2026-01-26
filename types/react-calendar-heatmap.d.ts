declare module 'react-calendar-heatmap' {
  import * as React from 'react';

  export type HeatmapValue = {
    date: string;
    count: number;
  } & Record<string, unknown>;

  export interface CalendarHeatmapProps {
    startDate: Date;
    endDate: Date;
    values: HeatmapValue[];

    classForValue?: (value: HeatmapValue | null) => string;
    tooltipDataAttrs?: (value: HeatmapValue | null) => Record<string, string>;

    showWeekdayLabels?: boolean;
    showMonthLabels?: boolean;
    gutterSize?: number;
    horizontal?: boolean;
    onClick?: (value: HeatmapValue | null) => void;
  }

  const CalendarHeatmap: React.FC<CalendarHeatmapProps>;
  export default CalendarHeatmap;
}
