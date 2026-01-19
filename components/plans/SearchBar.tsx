// components/dashboard/SearchBar.tsx
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="mb-4 flex justify-end">
      <div className="relative">
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          className="w-64 rounded-full border border-gray-200 bg-white py-2 pr-10 pl-4 text-sm shadow-sm focus:border-purple-400 focus:outline-none"
        />
        <Search className="absolute top-2.5 right-3 text-gray-400" size={18} />
      </div>
    </div>
  );
}
