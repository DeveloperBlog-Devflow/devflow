import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TilItem } from '@/types/til';

const makePreview = (content: string, len = 80) =>
  content
    .replace(/[#*_>`~-]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, len);

export const fetchTilList = async (uid: string): Promise<TilItem[]> => {
  const tilsCollectionPath = collection(db, 'users', uid, 'tils');
  const q = query(tilsCollectionPath, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();

    const title = typeof data.title === 'string' ? data.title : '';
    const content = typeof data.content === 'string' ? data.content : '';

    // createdAt: serverTimestamp() 직후엔 null일 수 있으니 안전 처리
    const createdAt =
      data.createdAt instanceof Timestamp
        ? data.createdAt.toMillis()
        : Date.now();

    return {
      id: docSnap.id,
      title,
      preview: makePreview(content),
      createdAt,
    };
  });
};
