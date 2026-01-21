import FormField from '@/components/auth/FormField';
import PageHeader from '@/components/common/PageHeader';
import Card from '@/components/home/Card';
import AddPlanButton from '@/components/plans/AddPlanButton';
import PlanSection from '@/components/plans/PlanSection';
import SearchBar from '@/components/plans/SearchBar';

import { Target, Calendar, CheckCircle2 } from 'lucide-react';

const sampleTasks = [
  {
    id: 1,
    text: 'useState, useEffect 기초',
    date: '2025-01-20',
    isChecked: true,
  },
  {
    id: 2,
    text: 'useContext, useReducer',
    date: '2025-01-22',
    isChecked: false,
  },
  {
    id: 3,
    text: 'Custom Hooks 만들기',
    date: '2025-01-22',
    isChecked: false,
  },
];

const Page = () => {
  return (
    <div className="bg-background min-h-screen p-11">
      {/* 1. 페이지 헤더 */}
      <PageHeader
        title="플랜"
        highlight="관리하기"
        description="학습 주제를 만들고 세부 과제를 관리해보세요"
      />

      {/* 2. 상단 통계 카드 (Grid) */}
      <div className="mb-4 grid grid-cols-1 gap-3.5 md:grid-cols-3">
        <Card className="flex items-center justify-between border-2 border-[#D5DCFB]">
          {/* 왼쪽: 텍스트 영역 */}
          <div className="flex flex-col gap-1">
            <span className="text-text-sub text-sm font-medium">
              전체 플랜 수
            </span>
            <span className="text-4xl font-bold text-[#4757D3]">1</span>
          </div>

          {/* 오른쪽: 아이콘 영역 */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D5DCFB] text-[#556BD6]">
            <Target size={24} strokeWidth={2.5} />
          </div>
        </Card>
        <Card className="flex items-center justify-between border-2 border-[#EBDBFC]">
          {/* 왼쪽: 텍스트 영역 */}
          <div className="flex flex-col gap-1">
            <span className="text-text-sub text-sm font-medium">
              진행중인 플랜 수
            </span>
            <span className="text-4xl font-bold text-[#7B44C4]">1</span>
          </div>

          {/* 오른쪽: 아이콘 영역 */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EBDBFC] text-[#7B44C4]">
            <Calendar size={24} strokeWidth={2.5} />
          </div>
        </Card>
        <Card className="flex items-center justify-between border-2 border-[#C6F6D7]">
          {/* 왼쪽: 텍스트 영역 */}
          <div className="flex flex-col gap-1">
            <span className="text-text-sub text-sm font-medium">
              완료된 플랜 수
            </span>
            <span className="text-4xl font-bold text-[#00841F]">1</span>
          </div>

          {/* 오른쪽: 아이콘 영역 */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C6F6D7] text-[#00841F]">
            <CheckCircle2 size={24} strokeWidth={2.5} />
          </div>
        </Card>
      </div>

      {/* 3. 검색 바 */}
      <SearchBar />

      {/* 4. 메인 플랜 목록 */}
      <section className="space-y-6">
        <PlanSection
          title="React Hooks 학습"
          description="React Hooks의 기본부터 고급 패턴까지 학습"
          tasks={sampleTasks}
        />

        {/* 추가적인 PlanSection이 있다면 여기에 배치 */}
      </section>

      {/* 5. 하단 추가 버튼 */}
      <div className="mt-6">
        <AddPlanButton />
      </div>
    </div>
  );
};

export default Page;
