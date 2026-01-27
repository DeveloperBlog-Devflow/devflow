'use client';

import { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  addPlan,
  deletePlan,
  deletePlanItem,
  fetchAllPlanItems,
  fetchPlans,
  Plan,
  PlanItem,
  updatePlan,
} from '@/services/plans/planManageService.service';

import PageHeader from '@/components/common/PageHeader';
import Card from '@/components/home/Card';
import AddPlanButton from '@/components/plans/AddPlanButton';
import PlanSection from '@/components/plans/PlanSection';
import SearchBar from '@/components/plans/SearchBar';
import InlineAddPlanForm from '@/components/plans/InlineAddPlanForm';
import { Target, Calendar, CheckCircle2 } from 'lucide-react';
import Pagination from '@/components/common/Pagination';

const Page = () => {
  const [user, setUser] = useState<User | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [stats, setStats] = useState({
    total: 0,
    working: 0, // 진행중
    completed: 0, // 완료됨
  });

  // 카드 업데이트를 위한 stats 가져오기 메서드
  const fetchAndCalculate = async (uid: string) => {
    try {
      // 1. 데이터 병렬 로드
      const [fetchedPlans, fetchedItems] = await Promise.all([
        fetchPlans(uid),
        fetchAllPlanItems(uid),
      ]);

      setPlans(fetchedPlans); // 플랜 목록 업데이트

      // 2. 통계 계산 로직
      let completedCount = 0;
      let workingCount = 0;

      fetchedPlans.forEach((plan) => {
        const myItems = fetchedItems.filter(
          (item: PlanItem) => item.planId === plan.id
        );
        // ⚠️ 하위 항목이 하나라도 있는 경우에만 상태를 판별합니다.
        if (myItems.length > 0) {
          const isAllChecked = myItems.every(
            (item: PlanItem) => item.isChecked
          );

          if (isAllChecked) {
            completedCount++; // 모두 완료됨
          } else {
            workingCount++; // 항목은 있는데 아직 다 완료 안 됨 -> 진행중
          }
        }
      });

      // 3. 통계 State 업데이트
      setStats({
        total: fetchedPlans.length,
        completed: completedCount,
        working: workingCount,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 사용자 인증 상태 리스너 및 초기 플랜 목록 로드
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const [fetchedPlans, fetchedItems] = await Promise.all([
            fetchPlans(currentUser.uid),
            fetchAllPlanItems(currentUser.uid),
          ]);

          setPlans(fetchedPlans);
          setCurrentPage(1);

          await fetchAndCalculate(currentUser.uid);
        } catch (err) {
          console.error('플랜 목록 로딩 실패:', err);
          setPlans([]);

          setCurrentPage(1);
        }
      } else {
        setPlans([]);
      }
      setIsLoading(false);
    });
    return () => unsubscribe(); // 클린업
  }, []);

  // 플랜 생성(추가) 핸들러
  const handleSavePlan = async (title: string, description: string) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    try {
      await addPlan(user.uid, title, description);

      // 목록 새로고침
      const fetchedPlans = await fetchPlans(user.uid);
      setPlans(fetchedPlans);
      setCurrentPage(1);

      await fetchAndCalculate(user.uid);

      setIsAdding(false); // 폼 닫기
    } catch (err) {
      console.error('플랜 추가 실패:', err);
    }
  };

  // 플랜 추가 취소 핸들러
  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  // 플랜 삭제 핸들러
  const handleDeletePlan = async (planId: string, title: string) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (
      confirm(
        `'${title}' 플랜을 정말 삭제하시겠습니까? 포함된 모든 할 일이 삭제됩니다.`
      )
    ) {
      try {
        await deletePlan(user.uid, planId);

        // 목록 새로고침
        const fetchedPlans = await fetchPlans(user.uid);
        setPlans(fetchedPlans);

        await fetchAndCalculate(user.uid);

        // 페이지 조절
        if (
          currentPage > Math.ceil((plans.length - 1) / itemsPerPage) &&
          Math.ceil((plans.length - 1) / itemsPerPage) > 0
        ) {
          setCurrentPage(Math.ceil((plans.length - 1) / itemsPerPage));
        } else if (Math.ceil((plans.length - 1) / itemsPerPage) === 0) {
          setCurrentPage(1);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  // 플랜 수정 핸들러
  const handleUpdatePlan = async (
    planId: string,
    title: string,
    description: string
  ) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      await updatePlan(user.uid, planId, { title, description });

      // 목록 새로고침
      const fetchedPlans = await fetchPlans(user.uid);
      setPlans(fetchedPlans);
    } catch (err) {
      console.error(err);
    }
  };

  // 페이지네이션 파트
  const totalPages = Math.ceil(plans.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPlans = plans.slice(startIndex, endIndex);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [plans.length, totalPages, currentPage]);

  return (
    <div className="bg-background min-h-screen p-11">
      <PageHeader
        title="플랜"
        highlight="관리하기"
        description="학습 주제를 만들고 세부 과제를 관리해보세요"
      />

      {/* 상단 통계 카드 (Grid) */}
      <div className="mb-4 grid grid-cols-1 gap-3.5 md:grid-cols-3">
        <Card className="flex items-center justify-between border-2 border-[#D5DCFB]">
          {/* 왼쪽: 텍스트 영역 */}
          <div className="flex flex-col gap-1">
            <span className="text-text-sub text-sm font-medium">
              전체 플랜 수
            </span>
            <span className="text-4xl font-bold text-[#4757D3]">
              {plans.length}
            </span>
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
            <span className="text-4xl font-bold text-[#7B44C4]">
              {stats.working}
            </span>
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
            <span className="text-4xl font-bold text-[#00841F]">
              {stats.completed}
            </span>
          </div>

          {/* 오른쪽: 아이콘 영역 */}
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C6F6D7] text-[#00841F]">
            <CheckCircle2 size={24} strokeWidth={2.5} />
          </div>
        </Card>
      </div>

      {/* 검색 바 */}
      <SearchBar />

      {/* 하단 추가 버튼 or 인라인 폼 */}
      <div className="mt-6 mb-4">
        {isAdding ? (
          <InlineAddPlanForm
            onSave={handleSavePlan}
            onCancel={handleCancelAdd}
          />
        ) : (
          <div onClick={() => setIsAdding(true)}>
            <AddPlanButton />
          </div>
        )}
      </div>

      <section className="space-y-6">
        {isLoading ? (
          <p>플랜을 불러오는 중...</p>
        ) : (
          <div>
            {paginatedPlans.length > 0 && user ? (
              paginatedPlans.map((plan) => (
                <PlanSection
                  key={plan.id}
                  userId={user.uid}
                  planId={plan.id}
                  title={plan.title}
                  description={plan.description}
                  onDeletePlan={handleDeletePlan}
                  onUpdatePlan={handleUpdatePlan}
                  onChangeStats={() => fetchAndCalculate(user!.uid)}
                />
              ))
            ) : (
              <p>아직 생성된 플랜이 없습니다. 첫 플랜을 추가해보세요!</p>
            )}
          </div>
        )}
      </section>

      {/* 페이지네이션 컴포넌트 */}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Page;
