'use client';

import { useState } from 'react';
import Card from './Card';
import CheckList, { ChecklistItem } from './CheckList';
import { Todo } from '@/lib/home/todoService';

interface BottomSectionProps {
  className?: string;
  todos: Todo[];
  onToggleTodo: (id: string, currentStatus: boolean) => void;
}

const TODAY_DUMMY = [
  { id: 't1', text: 'React Hooks 정리', isChecked: false },
  { id: 't2', text: 'GSAP ScrollTrigger 복습', isChecked: true },
  { id: 't3', text: '알고리즘 1문제 풀기', isChecked: false },
];

const UPCOMING_DUMMY = [
  { id: 'u1', text: 'Next.js App Router 정리', isChecked: false },
  { id: 'u2', text: '포트폴리오 리팩토링', isChecked: false },
];

export default function BottomSection({
  className,
  todos,
  onToggleTodo,
}: BottomSectionProps) {
  const [today, setToday] = useState<ChecklistItem[]>(TODAY_DUMMY);
  const [upcoming, setUpcoming] = useState<ChecklistItem[]>(UPCOMING_DUMMY);

  const toggleToday = (id: string) => {
    setToday((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, isChecked: !it.isChecked } : it
      )
    );
  };

  const toggleUpcoming = (id: string) => {
    setUpcoming((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, isChecked: !it.isChecked } : it
      )
    );
  };

  return (
    <div className={className}>
      <Card title="오늘 할 일">
        <CheckList
          items={todos}
          onToggleTodo={onToggleTodo}
          emptyText="오늘 할 일이 없습니다"
        />
      </Card>

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
