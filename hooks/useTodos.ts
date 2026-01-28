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

  const todayKey = useMemo(() => dateKeyKST(new Date()), []);

  const loadTodos = useCallback(async () => {
    if (!uid) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTodos(uid, todayKey);
      setTodos(data);
    } catch (e) {
      console.error(e);
      setError('할 일을 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [uid, todayKey]);

  // ✅ 추가: 일단 화면에 바로 추가(낙관적), 이후 서버와 동기화는 선택
  const createTodo = useCallback(
    async (text: string) => {
      if (!uid) return;
      const trimmed = text.trim();
      if (!trimmed) return;

      setError(null);

      // 임시 아이템 (서버 id 나오기 전까지)
      const tempId = `temp_${Date.now()}`;
      const optimistic: Todo = {
        id: tempId,
        text: trimmed,
        isChecked: false,
        createdAt: new Date(),
      };

      // UI 즉시 반영
      setTodos((prev) => [...prev, optimistic]);

      try {
        await addTodo(uid, trimmed);

        // 여기서만 실제 데이터로 동기화(리스트 안 비게 유지됨)
        const data = await fetchTodos(uid, todayKey);
        setTodos(data);
      } catch (e) {
        console.error(e);
        // 실패 시 롤백
        setTodos((prev) => prev.filter((t) => t.id !== tempId));
        setError('할 일을 추가하는 데 실패했습니다.');
      }
    },
    [uid, todayKey]
  );

  // ✅ 토글: 로컬 먼저 뒤집고, 실패하면 롤백
  const toggleTodo = useCallback(
    async (id: string, currentStatus: boolean) => {
      if (!uid) return;
      setError(null);

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isChecked: !currentStatus } : t))
      );

      try {
        await toggleTodoStatus(uid, id, currentStatus);
      } catch (e) {
        console.error(e);
        // 롤백
        setTodos((prev) =>
          prev.map((t) =>
            t.id === id ? { ...t, isChecked: currentStatus } : t
          )
        );
        setError('상태를 업데이트하는 데 실패했습니다.');
      }
    },
    [uid]
  );

  // ✅ 삭제: 로컬에서 먼저 빼고, 실패하면 복구
  const removeTodo = useCallback(
    async (id: string) => {
      if (!uid) return;
      setError(null);

      let backup: Todo | undefined;
      setTodos((prev) => {
        backup = prev.find((t) => t.id === id);
        return prev.filter((t) => t.id !== id);
      });

      try {
        await deleteTodo(uid, id);
      } catch (e) {
        console.error(e);
        // 복구
        if (backup)
          setTodos((prev) =>
            [...prev, backup!].sort((a, b) => +a.createdAt - +b.createdAt)
          );
        setError('할 일을 삭제하는 데 실패했습니다.');
      }
    },
    [uid]
  );

  // ✅ 수정: 로컬 먼저 바꾸고, 실패하면 롤백
  const editTodoText = useCallback(
    async (id: string, text: string) => {
      if (!uid) return;
      const trimmed = text.trim();
      if (!trimmed) return;

      setError(null);

      let prevText = '';
      setTodos((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          prevText = t.text;
          return { ...t, text: trimmed };
        })
      );

      try {
        await updateTodoText(uid, id, trimmed);
      } catch (e) {
        console.error(e);
        // 롤백
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, text: prevText } : t))
        );
        setError('할 일을 수정하는 데 실패했습니다.');
      }
    },
    [uid]
  );

  useEffect(() => {
    if (!uid) return;
    loadTodos();
  }, [uid, loadTodos]);

  return {
    todos,
    loading,
    error,
    todayKey,
    loadTodos,
    toggleTodo,
    createTodo, // ✅ 네 TodoContainer에서 쓰던 이름 그대로
    removeTodo,
    editTodoText,
  };
};
