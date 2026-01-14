import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

// 할 일 데이터 타입
export interface Todo {
  id: string;
  text: string;
  isChecked: boolean;
  createAt: Date;
}

// 1. 할 일 목록 가져오기
export const fetchTodos = async (): Promise<Todo[]> => {
  const q = query(collection(db, 'todos'), orderBy('createAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createAt: doc.data().createAt.toDate(),
  })) as Todo[];
};

// 2. 할 일 추가하기
export const AddTodo = async (text: string) => {
  await addDoc(collection(db, 'todos'), {
    text,
    isChecked: false,
    createAt: Timestamp.now(),
  });
};

// 3. 완료 상태 토글
export const toggleTodoStatus = async (id: string, currentStatus: boolean) => {
  const todoRef = doc(db, 'todos', id);
  await updateDoc(todoRef, {
    isChecked: !currentStatus,
  });
};
