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
export const fetchTodos = async (uid: string): Promise<Todo[]> => {
  const todosCollectionPath = collection(db, 'users', uid, 'todos');
  const q = query(todosCollectionPath, orderBy('createAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createAt: doc.data().createAt.toDate(),
  })) as Todo[];
};

// 2. 할 일 추가하기
export const AddTodo = async (uid: string, text: string) => {
  await addDoc(collection(db, 'users', uid, 'todos'), {
    text,
    isChecked: false,
    createAt: Timestamp.now(),
  });
};

// 3. 완료 상태 토글
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
