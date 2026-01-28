'use client';

import { useEffect, useState } from 'react';
import { Todo } from '@/services/home/todoService.service';
import { CheckItem } from './CheckItem';
import { HiPlus } from 'react-icons/hi';

type CheckListProps = {
  items: Todo[];
  onToggleTodo: (id: string, checked: boolean) => void;
  emptyText?: string;
  showAdd?: boolean;
  onAdd?: (text: string) => void;
  onCancelAdd?: () => void;
  onRemoveTodo: (id: string) => void;
  onEditTodoText: (id: string, text: string) => void;
};

export default function CheckList({
  items,
  onToggleTodo,
  showAdd,
  onAdd,
  onRemoveTodo,
  onEditTodoText,
}: CheckListProps) {
  const [draft, setDraft] = useState('');

  useEffect(() => {
    if (showAdd) setDraft('');
  }, [showAdd]);

  const handleSubmit = () => {
    if (showAdd) setDraft('');
    const text = draft.trim();
    if (!text) return;
    onAdd?.(text);
    setDraft('');
  };
  return (
    <div className="space-y-2.5">
      {showAdd && (
        <div className="flex gap-2">
          <input
            autoFocus
            placeholder="할 일을 입력하세요"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm"
            onKeyDown={(e) => {
              if (e.key !== 'Enter') return;
              if (e.nativeEvent.isComposing) return;
              if (e.key === 'Enter') handleSubmit();
            }}
          />
          <div
            className="text-primary flex w-10 items-center text-sm font-bold"
            onClick={handleSubmit}
          >
            추가
          </div>
        </div>
      )}
      {items.map((item) => (
        <CheckItem
          key={item.id}
          checked={item.isChecked}
          text={item.text}
          onToggle={() => {
            onToggleTodo(item.id, item.isChecked);
          }}
          onDelete={() => {
            onRemoveTodo(item.id);
          }}
          onEdit={(nextText) => onEditTodoText(item.id, nextText)}
        />
      ))}
    </div>
  );
}
