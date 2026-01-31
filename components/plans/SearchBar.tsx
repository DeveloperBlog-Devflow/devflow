import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="mb-4 flex justify-end">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="플랜 제목으로 검색..."
          className="w-64 rounded-full border border-gray-200 bg-white py-2 pr-10 pl-4 text-sm shadow-sm focus:border-purple-400 focus:outline-none"
        />
        <Search className="absolute top-2.5 right-3 text-gray-400" size={18} />
      </div>
    </div>
  );
}
