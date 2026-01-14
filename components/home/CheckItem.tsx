'use client';

import { Check } from 'lucide-react';

type CheckItemProps = {
  checked: boolean;
  text: string;
  onToggle: () => void;
};

export function CheckItem({ checked, text, onToggle }: CheckItemProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        'flex w-full items-center gap-2.5 rounded-2xl border px-4 py-2 text-left transition',
        'bg-gray-50 hover:bg-gray-100',
        'border-gray-300',
      ].join(' ')}
    >
      <div
        className={[
          'flex h-6 w-6 items-center justify-center rounded-full border-2 transition',
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
      <span
        className={[
          'text-sm',
          checked ? 'text-gray-400 line-through' : 'text-gray-800',
        ].join(' ')}
      >
        {text}
      </span>
    </button>
  );
}
