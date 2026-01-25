'use client';

import BottomSection from '@/components/home/BottomSection';
import GraphSection from '@/components/home/GraphSection';
import HeaderSection from '@/components/home/HeaderSection';
import ProfileSection from '@/components/home/ProfileSection';
import ButtonSection from '@/components/home/ButtonSection';

import { useEffect, useState } from 'react';
import { useAuthUser } from '@/lib/auth/useAuthUser';

import {
  Todo,
  fetchTodos,
  AddTodo,
  toggleTodoStatus,
} from '@/lib/home/todoService';
import { getProfile, Profile } from '@/lib/home/profileService';

const Page = () => {
  // 현재 사용자 정보
  const { user: currentUser, authLoading } = useAuthUser();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 1. 할 일 목록 불러오기
  const loadTodos = async (uid: string) => {
    try {
      setError(null);

      const fetchedTodos = await fetchTodos(uid);
      setTodos(fetchedTodos);
    } catch (err) {
      console.error(err);
      setError('데이터를 불러오는 데 실패하였습니다');
    }
  };

  // 3. 할 일 상태 토글
  const handleToggleTodo = async (id: string, currentStatus: boolean) => {
    if (!currentUser) return;
    try {
      setError(null);

      await toggleTodoStatus(currentUser.uid, id, currentStatus);
      await loadTodos(currentUser.uid);
    } catch (err) {
      console.error(err);
      setError('상태를 업데이트하는 데 실패하였습니다');
    }
  };

  // 사용자가 존재하면 데이터 불러옴
  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      try {
        const userProfile = await getProfile(currentUser.uid);
        setProfile(userProfile);
        await loadTodos(currentUser.uid);
      } catch (err) {
        console.error(err);
        setError('프로필 정보를 불러오는 데 실패하였습니다');
      }
    })();
  }, [currentUser]);

  // 유저 정보 로딩 처리
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로그인 확인 중...</p>
      </div>
    );
  }

  // 유저 정보가 없을 시
  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }

  // 유저 정보가 있을 시
  return (
    <div className="bg-background flex min-h-screen flex-col gap-4 font-sans md:p-[137px]">
      {/* 1. Header */}
      <HeaderSection />

      {/* 2-1. ProfileSection */}
      <ProfileSection
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        profile={profile}
        uid={currentUser.uid}
      />

      {/* 2-2. GraphSection */}
      <GraphSection></GraphSection>

      {/* 2-3. BottomSection */}
      <BottomSection
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        todos={todos}
        onToggleTodo={handleToggleTodo}
      />

      {/* 3. ButtonSection */}
      <ButtonSection />
    </div>
  );
};

export default Page;
