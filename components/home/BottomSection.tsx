'use client';
import TodoContainer from './TodoContainer';
import type { Todo } from '@/services/home/todoService.service';

interface BottomSectionProps {
  uid: string;

  todos: Todo[];
  loading?: boolean;
  error?: string | null;

  onToggleTodo: (id: string, currentStatus: boolean) => Promise<void> | void;
  onAddTodo: (text: string) => Promise<void> | void;
  onRemoveTodo: (id: string) => Promise<void> | void;
  onEditTodoText: (id: string, text: string) => Promise<void> | void;
}

export default function BottomSection({
  uid,
  todos,
  loading,
  error,
  onToggleTodo,
  onAddTodo,
  onRemoveTodo,
  onEditTodoText,
}: BottomSectionProps) {
  return (
    <div>
      <TodoContainer
        uid={uid}
        todos={todos}
        loading={loading}
        error={error}
        onToggleTodo={onToggleTodo}
        onAddTodo={onAddTodo}
        onRemoveTodo={onRemoveTodo}
        onEditTodoText={onEditTodoText}
      ></TodoContainer>

      {/* <Card title="다가오는 일정">
        <CheckList
          items={upcoming}
          onToggle={toggleUpcoming}
          emptyText="다가오는 일정이 없습니다"
        />
      </Card> */}
    </div>
  );
}
