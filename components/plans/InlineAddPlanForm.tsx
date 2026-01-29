'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

interface InlineAddPlanFormProps {
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}

const InlineAddPlanForm = ({ onSave, onCancel }: InlineAddPlanFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!title.trim()) {
      toast.info('플랜 제목을 입력해주세요.');
      return;
    }
    onSave(title, description);
  };

  return (
    <div className="bg-surface w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 border-gray-300 p-6 transition-all">
      <div className="flex w-full flex-col gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="플랜 제목 (예: React Hooks 마스터하기)"
          className="border-border focus:border-border-focus-blue w-full rounded-lg border-2 p-3 text-base font-bold placeholder-gray-400 focus:outline-none"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="소제목 또는 간단한 설명 (선택 사항)"
          className="focus:border-border-focus-blue border-border w-full rounded-lg border-2 p-3 text-sm placeholder-gray-400 focus:outline-none"
          rows={2}
        />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-lg px-4 py-2 font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          플랜 저장
        </button>
      </div>
    </div>
  );
};

export default InlineAddPlanForm;
