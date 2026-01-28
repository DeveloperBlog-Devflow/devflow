import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Todo,
  fetchTodos,
  toggleTodoStatus,
  addTodo,
  deleteTodo,
  updateTodoText,
} from '@/services/home/todoService.service';
import { dateKeyKST } from '@/lib/date';

export const useTodos = (uid?: string) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTodos = useCallback(
    async (dateKey = dateKeyKST(new Date())) => {
      if (!uid) return;
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTodos(uid, dateKey);
        setTodos(data);
      } catch (e) {
        console.error(e);
        setError('할 일을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    },
    [uid]
  );

  const createTodo = useCallback(
    async (text: string) => {
      if (!uid) return;
      try {
        setError(null);
        await addTodo(uid, text);
        await loadTodos();
      } catch (e) {
        console.error(e);
        setError('할 일을 추가하는 데 실패했습니다.');
      }
    },
    [uid, loadTodos]
  );

  const toggleTodo = useCallback(
    async (id: string, currentStatus: boolean) => {
      if (!uid) return;
      try {
        setError(null);
        await toggleTodoStatus(uid, id, currentStatus);
        await loadTodos();
      } catch (e) {
        console.error(e);
        setError('상태를 업데이트하는 데 실패했습니다.');
      }
    },
    [uid, loadTodos]
  );

  const removeTodo = useCallback(
    async (id: string) => {
      if (!uid) return;
      try {
        setError(null);
        await deleteTodo(uid, id);
        await loadTodos();
      } catch (e) {
        console.error(e);
        setError('할 일을 삭제하는 데 실패했습니다.');
      }
    },
    [uid, loadTodos]
  );

  const editTodoText = useCallback(
    async (id: string, text: string) => {
      if (!uid) return;
      try {
        setError(null);
        await updateTodoText(uid, id, text);
        await loadTodos();
      } catch (e) {
        console.error(e);
        setError('할 일을 수정하는 데 실패했습니다.');
      }
    },
    [uid, loadTodos]
  );

  useEffect(() => {
    if (!uid) return;
    loadTodos();
  }, [uid, loadTodos]);

  return {
    todos,
    loading,
    error,
    loadTodos,
    createTodo,
    toggleTodo,
    removeTodo,
    editTodoText,
  };
};
