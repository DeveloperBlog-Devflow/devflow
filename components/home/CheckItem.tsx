'use client';

import { useState } from 'react';
import { Check, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { Menu } from '@headlessui/react';

type CheckItemProps = {
  checked: boolean;
  text: string;
  onToggle: () => void;

  onDelete: () => void;
  onEdit: (nextText: string) => void;
};

export function CheckItem({
  checked,
  text,
  onToggle,
  onDelete,
  onEdit,
}: CheckItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState('');

  const startEdit = () => {
    setDraft(text);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraft('');
  };

  const submitEdit = () => {
    const next = draft.trim();
    if (!next) return cancelEdit();
    if (next !== text) onEdit(next);
    cancelEdit();
  };

  return (
    <div
      className={[
        'flex w-full items-center justify-between gap-2.5 rounded-2xl border px-4 py-2 transition',
        'bg-gray-50 hover:bg-gray-100',
        'border-gray-300',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex flex-1 items-center gap-2.5 text-left"
      >
        <div
          className={[
            'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition',
            checked ? 'border-green-500' : 'border-gray-400',
          ].join(' ')}
        >
          <Check
            className={[
              'transition-all',
              checked
                ? 'scale-100 text-green-500 opacity-100'
                : 'scale-50 opacity-0',
            ].join(' ')}
            size={16}
            strokeWidth={4}
          />
        </div>

        {isEditing ? (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white px-2 py-1 text-sm outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setDraft(text);
                setIsEditing(false);
                return;
              }
              if (e.key !== 'Enter') return;
              if (
                (e.nativeEvent as unknown as { isComposing?: boolean })
                  ?.isComposing
              )
                return;
              e.preventDefault();
              submitEdit();
            }}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <span
            className={[
              'text-sm',
              checked ? 'text-gray-400 line-through' : 'text-gray-800',
            ].join(' ')}
          >
            {text}
          </span>
        )}
      </button>

      <Menu as="div" className="relative flex-shrink-0">
        {({ open }) => (
          <>
            <Menu.Button
              type="button"
              className={[
                'rounded-full p-2 text-gray-400 hover:bg-black/5 hover:text-gray-600',
                open ? 'pointer-events-none opacity-0' : 'opacity-100',
              ].join(' ')}
              aria-label="더보기"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-5 w-5" />
            </Menu.Button>

            <Menu.Items className="absolute top-0 right-0 z-50 w-24 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/10 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm ${
                      active ? 'bg-black/5' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      startEdit();
                    }}
                  >
                    <Edit2 size={14} />
                    수정
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 ${
                      active ? 'bg-black/5' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                  >
                    <Trash2 size={14} />
                    삭제
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </>
        )}
      </Menu>
    </div>
  );
}
