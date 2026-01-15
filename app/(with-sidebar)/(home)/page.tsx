'use client';

import BottomSection from '@/components/home/BottomSection';
import GraphSection from '@/components/home/GraphSection';
import HeaderSection from '@/components/home/HeaderSection';
import ProfileSection from '@/components/home/ProfileSection';
import ButtonSection from '@/components/home/ButtonSection';

import { useEffect, useState } from 'react';

import {
  Todo,
  fetchTodos,
  AddTodo,
  toggleTodoStatus,
} from '@/lib/home/todoService';

import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const Page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 현재 사용자 정보
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 사용자 로그인 상태 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  // 사용자가 존재하면 데이터 불러옴
  useEffect(() => {
    if (currentUser) {
      loadTodos(currentUser.uid);
    } else {
      setTodos([]);
    }
  }, [currentUser]);

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

  // 2. 할 일 추가
  const handleAddTodo = async (text: string) => {
    if (!currentUser) return;

    try {
      setError(null);

      await AddTodo(currentUser.uid, text);
      await loadTodos(currentUser.uid);
    } catch (err) {
      console.error(err);
      setError('할 일을 추가하는 데 실패하였습니다');
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

  if (!currentUser) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-background flex min-h-screen flex-col gap-4 font-sans md:p-[137px]">
      {/* 1. Header */}
      <HeaderSection />

      {/* 2-1. ProfileSection */}
      <ProfileSection className="grid grid-cols-1 gap-4 md:grid-cols-3" />

      {/* 2-2. GraphSection */}
      <GraphSection></GraphSection>

      {/* 2-3. BottomSection */}
      <BottomSection
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        todos={todos}
        onToggleTodo={handleToggleTodo}
      />

      {/* 3. ButtonSection */}
      <ButtonSection onAddTodo={handleAddTodo} />
    </div>
  );
};

export default Page;
