'use client';

import * as Popover from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface DatePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectDate = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setIsOpen(false); // 날짜 고르면 팝오버 닫기
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          className={`bg-background flex items-center gap-1.5 rounded-md border-2 px-2 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200 ${
            date
              ? 'bg-background border-[#d5dcfb] text-gray-900 hover:bg-gray-50'
              : 'bg-surface border-gray-200 text-gray-400 hover:text-gray-600'
          } focus:outline-none`}
        >
          <CalendarIcon size={16} />
          {date ? format(date, 'yyyy-MM-dd') : <span>마감일 선택</span>}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="animate-in fade-in zoom-in-95 z-50 rounded-xl border border-gray-100 bg-white p-2 shadow-xl duration-200"
          align="start" // 버튼의 왼쪽 라인에 맞춰서 열림
          sideOffset={5} // 버튼과 5px 간격
        >
          <DayPicker
            mode="single" // 날짜 하나만 선택
            selected={date} // 현재 선택된 날짜 표시
            onSelect={handleSelectDate} // 선택 핸들러
            locale={ko} // 한국어 달력 (월, 요일)
            // 커스텀 스타일 (Tailwind 색상 적용)
            modifiersClassNames={{
              selected:
                'bg-purple-600 text-white hover:bg-purple-500 rounded-full', // 선택된 날짜 색상
              today: 'text-purple-600 font-bold', // 오늘 날짜 색상
            }}
            // DayPicker 기본 스타일 오버라이드 (선택사항)
            styles={{
              head_cell: { width: '40px', color: '#9ca3af' },
              cell: { width: '40px' },
              day: { margin: 'auto', borderRadius: '50%' },
            }}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DatePicker;
