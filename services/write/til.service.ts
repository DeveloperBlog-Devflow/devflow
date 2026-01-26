import {
  doc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { bumpDailyStat } from '@/services/heatmap/dailyStat.service';

export type TilData = {
  title: string;
  content: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
};

export type Til = TilData & { id: string };

export async function createTil(uid: string, content: string, title: string) {
  const tilsCol = collection(db, 'users', uid, 'tils');
  const docRef = await addDoc(tilsCol, {
    title: title,
    content,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await bumpDailyStat(uid, 1, 0);
  return docRef.id;
}

/** 런타임 최소 검증(안전하게 any 제거) */
function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

function parseTilData(raw: unknown): TilData | null {
  if (!isRecord(raw)) return null;

  const content = raw.content;
  if (typeof content !== 'string') return null; // content는 필수

  const title = raw.title;
  if (typeof title !== 'string') return null;

  const createdAt = raw.createdAt instanceof Timestamp ? raw.createdAt : null;

  const updatedAt = raw.updatedAt instanceof Timestamp ? raw.updatedAt : null;

  return { title, content, createdAt, updatedAt };
}

export async function fetchMyTil(
  uid: string | null | undefined,
  tilId: string | null | undefined
): Promise<Til | null> {
  // 여기서 uid/tilId 실물 확인
  console.log('[fetchMyPost] path =', { uid, tilId });

  if (!uid || !tilId) return null;

  const ref = doc(db, 'users', uid, 'tils', tilId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const parsed = parseTilData(snap.data());
  if (!parsed) return null;

  return { id: snap.id, ...parsed };
}

export async function updateTil(
  uid: string,
  tilId: string,
  title: string,
  content: string
) {
  const ref = doc(db, 'users', uid, 'tils', tilId);
  await updateDoc(ref, {
    title,
    content,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTil(uid: string, tilId: string) {
  await deleteDoc(doc(db, 'users', uid, 'tils', tilId));
}
