import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  deleteDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { dateKeyKST } from '@/lib/date';

// 할 일 데이터 타입
export interface Todo {
  id: string;
  text: string;
  isChecked: boolean;
  createdAt: Date;
}

// 0시 초기화

// 1. 할 일 목록 가져오기
export const fetchTodos = async (
  uid: string,
  dateKey: string
): Promise<Todo[]> => {
  const todosCollectionPath = collection(db, 'users', uid, 'todos');
  const q = query(
    todosCollectionPath,
    where('dateKey', '==', dateKey),
    orderBy('createdAt', 'asc')
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      text: data.text,
      isChecked: !!data.isChecked,
      createdAt: doc.data().createdAt?.toDate?.() ?? new Date(),
    };
  });
};

// 2. 할 일 추가하기
export const addTodo = async (uid: string, text: string): Promise<string> => {
  const ref = await addDoc(collection(db, 'users', uid, 'todos'), {
    text,
    isChecked: false,
    dateKey: dateKeyKST(),
    createdAt: Timestamp.now(),
  });

  return ref.id;
};

// 3. 할 일 삭제하기
export const deleteTodo = async (uid: string, todoId: string) => {
  const todoRef = doc(db, 'users', uid, 'todos', todoId);
  await deleteDoc(todoRef);
};

// 4. 할 일 수정하기
export const updateTodoText = async (
  uid: string,
  todoId: string,
  text: string
) => {
  const todoRef = doc(db, 'users', uid, 'todos', todoId);
  await updateDoc(todoRef, {
    text,
  });
};

// 5. 완료 상태 토글
export const toggleTodoStatus = async (
  uid: string,
  todoId: string,
  currentStatus: boolean
) => {
  const todoRef = doc(db, 'users', uid, 'todos', todoId);
  await updateDoc(todoRef, {
    isChecked: !currentStatus,
  });
};
