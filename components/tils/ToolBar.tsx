'use client';

import { ChevronDown } from 'lucide-react';

const ToolBar = () => {
  return (
    <div>
      {/* SearchBar */}
      <div className="rounded-2xl border-2 border-[#C9D0FF] bg-white/40 px-6 py-4">
        <input
          placeholder="검색어를 입력하세요"
          className="max-w-full bg-transparent text-lg font-semibold text-black/70 outline-none placeholder:text-black/35"
        />
      </div>

      {/* Result + Sort */}
      <div className="mt-10 flex items-center justify-between">
        <span className="text-primary text-sm font-bold">
          1건
          <span className="test-sm text-text-sub font-medium">의 검색결과</span>
        </span>

        <div className="relative">
          <select className="appearance-none rounded-md border border-black/30 bg-white px-4 py-2 pr-10 text-sm font-medium shadow-sm outline-none">
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-black/60" />
        </div>
      </div>
    </div>
  );
};

export default ToolBar;
