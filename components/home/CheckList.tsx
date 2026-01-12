'use client';

import { CheckItem } from './CheckItem';

export type ChecklistItem = {
  id: string;
  text: string;
  checked: boolean;
};

interface CheckListProps {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
  emptyText?: string;
}

export default function CheckList({
  items,
  onToggle,
  emptyText = '아직 항목이 없습니다',
}: CheckListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-400">{emptyText}</p>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CheckItem
          key={item.id}
          checked={item.checked}
          text={item.text}
          onToggle={() => onToggle(item.id)}
        />
      ))}
    </div>
  );
}
