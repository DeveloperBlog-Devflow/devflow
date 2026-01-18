import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type PostData = {
  title: string;
  content: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
};

export type Post = PostData & { id: string };

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

/** 런타임 최소 검증(안전하게 any 제거) */
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function parsePostData(raw: unknown): PostData | null {
  if (!isRecord(raw)) return null;

  const content = raw.content;
  if (typeof content !== 'string') return null; // content는 필수

  const title = typeof raw.title === 'string' ? raw.title : '';

  const createdAt = raw.createdAt instanceof Timestamp ? raw.createdAt : null;

  const updatedAt = raw.updatedAt instanceof Timestamp ? raw.updatedAt : null;

  return { title, content, createdAt, updatedAt };
}

export async function fetchMyPost(
  uid: string | null | undefined,
  postId: string | null | undefined
): Promise<Post | null> {
  // ✅ 여기서 uid/postId 실물 확인
  console.log('[fetchMyPost] path =', { uid, postId });

  if (!uid || !postId) return null;

  const ref = doc(db, 'users', uid, 'posts', postId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const parsed = parsePostData(snap.data());
  if (!parsed) return null;

  return { id: snap.id, ...parsed };
}
