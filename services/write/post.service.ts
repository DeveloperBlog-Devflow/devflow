import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export async function createPost(uid: string, content: string, title?: string) {
  const postsCol = collection(db, 'users', uid, 'posts');
  const docRef = await addDoc(postsCol, {
    title: title ?? '',
    content,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}
