import { Plus } from 'lucide-react';

export default function AddPlanButton() {
  return (
    <button className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 py-6 font-medium text-gray-500 transition-all hover:border-gray-400 hover:bg-gray-50">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        <Plus size={20} />
      </div>
      새로운 플랜 추가하기
    </button>
  );
}
