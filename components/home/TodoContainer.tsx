// components/home/TodoContainer.tsx
'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/home/Card';
import CheckList from '@/components/home/CheckList';
import { useTodos } from '@/hooks/useTodos';
import { HiPlus } from 'react-icons/hi';

type Props = {
  uid: string;
};

export default function TodoContainer({ uid }: Props) {
  const { todos, loading, error, loadTodos, toggleTodo, createTodo } =
    useTodos(uid);
  const [showAddTodo, setShowAddTodo] = useState(false);
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  if (loading) {
    return <div className="text-sm text-gray-400">할 일 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-sm text-red-500">{error}</div>;
  }
  return (
    <>
      <Card
        title="오늘의 할 일"
        rightSlot={
          <button
            type="button"
            onClick={() => setShowAddTodo(true)}
            className="bg-primary hover:bg-primary-hover inline-flex h-8 w-8 items-center justify-center rounded-xl text-white shadow-sm active:scale-95"
            aria-label="할 일 추가"
          >
            <HiPlus size={20} />
          </button>
        }
      >
        <CheckList
          items={todos}
          onToggleTodo={toggleTodo}
          emptyText="오늘 할 일이 없습니다"
          showAdd={showAddTodo}
          onAdd={async (text) => {
            await createTodo(text);
            setShowAddTodo(false);
          }}
          onCancelAdd={() => setShowAddTodo(false)}
        />
      </Card>
    </>
  );
}
