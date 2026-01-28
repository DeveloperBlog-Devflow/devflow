'use client';

import HeaderSection from '@/components/home/HeaderSection';
import ProfileSection from '@/components/home/ProfileSection';
import GraphSection from '@/components/home/GraphSection';
import ButtonSection from '@/components/home/ButtonSection';
import BottomSection from '@/components/home/BottomSection';

import { useEffect, useState } from 'react';
import { useAuthUser } from '@/hooks/useAuthUser';
import { getProfile, Profile } from '@/services/home/profileService.service';
import { useTodos } from '@/hooks/useTodos';

const Page = () => {
  const { user: currentUser, authLoading } = useAuthUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uid = currentUser?.uid;

  const {
    todos,
    progressText,
    toggleTodo,
    createTodo,
    removeTodo,
    editTodoText,
    loading: todosLoading,
    error: todosError,
  } = useTodos(uid);

  useEffect(() => {
    if (!uid) return;

    (async () => {
      try {
        setError(null);
        const userProfile = await getProfile(uid);
        setProfile(userProfile);
      } catch (e) {
        console.error(e);
        setError('프로필 정보를 불러오는 데 실패하였습니다');
      }
    })();
  }, [uid]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로그인 확인 중...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }

  const mergedError = error ?? todosError;

  return (
    <div className="bg-background flex min-h-screen flex-col gap-4 font-sans md:p-[137px]">
      <HeaderSection />

      <ProfileSection
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        profile={profile}
        uid={uid!}
        progressText={progressText}
      />

      <GraphSection uid={uid!} />

      <BottomSection
        uid={uid!}
        todos={todos}
        loading={todosLoading}
        error={mergedError}
        onToggleTodo={toggleTodo}
        onAddTodo={createTodo}
        onRemoveTodo={removeTodo}
        onEditTodoText={editTodoText}
      />

      <ButtonSection />
    </div>
  );
};

export default Page;
