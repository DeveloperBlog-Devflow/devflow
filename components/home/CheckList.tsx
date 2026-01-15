'use client';

import { Todo } from '@/lib/home/todoService';
import { CheckItem } from './CheckItem';

// export type ChecklistItem = {
//   id: string;
//   text: string;
//   isChecked: boolean;
// };

interface CheckListProps {
  items: Todo[];
  onToggleTodo: (id: string, currentStatus: boolean) => void;
  emptyText?: string;
}

export default function CheckList({
  items,
  onToggleTodo,
  emptyText = '아직 항목이 없습니다',
}: CheckListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-400">{emptyText}</p>;
  }

  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <CheckItem
          key={item.id}
          checked={item.isChecked}
          text={item.text}
          onToggle={() => {
            onToggleTodo(item.id, item.isChecked);
          }}
        />
      ))}
    </div>
  );
}
