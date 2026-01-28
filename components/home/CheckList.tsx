'use client';

import { CheckItem } from './CheckItem';

type CheckableItem = {
  id: string;
  text: string;
  isChecked: boolean;
};

type CheckListProps<T extends CheckableItem> = {
  items: T[];
  onToggleTodo: (id: string, checked: boolean) => void;
  emptyText?: string;
};

export default function CheckList<T extends CheckableItem>({
  items,
  onToggleTodo,
  emptyText = '아직 항목이 없습니다',
}: CheckListProps<T>) {
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
          onToggle={() => onToggleTodo(item.id, item.isChecked)}
        />
      ))}
    </div>
  );
}
