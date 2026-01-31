import {
  doc,
  getDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp,
  getCountFromServer,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { recomputeDailyStat } from '@/services/heatmap/dailyStat.service';

function dateKeyKST(date = new Date()) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export type TilData = {
  title: string;
  content: string;
  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
  dateKey: string;
};

export type Til = TilData & { id: string };

export async function createTil(uid: string, content: string, title: string) {
  const tilsCol = collection(db, 'users', uid, 'tils');
  const docRef = await addDoc(tilsCol, {
    title: title,
    content,
    dateKey: dateKeyKST(),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  await recomputeDailyStat(uid);
  await fetchTilCount(uid);
  return docRef.id;
}

/** 런타임 최소 검증 */
const isRecord = (v: unknown): v is Record<string, unknown> => {
  return typeof v === 'object' && v !== null;
};

const parseTilData = (raw: unknown): TilData | null => {
  if (!isRecord(raw)) return null;

  const content = raw.content;
  if (typeof content !== 'string') return null;

  const title = raw.title;
  if (typeof title !== 'string') return null;

  const dateKey = raw.dateKey;
  if (typeof dateKey !== 'string') return null;

  const createdAt = raw.createdAt instanceof Timestamp ? raw.createdAt : null;
  const updatedAt = raw.updatedAt instanceof Timestamp ? raw.updatedAt : null;

  return { title, content, dateKey, createdAt, updatedAt };
};

export const fetchMyTil = async (
  uid: string | null | undefined,
  tilId: string | null | undefined
): Promise<Til | null> => {
  // console.log('[fetchMyPost] path =', { uid, tilId });

  if (!uid || !tilId) return null;

  const ref = doc(db, 'users', uid, 'tils', tilId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;

  const parsed = parseTilData(snap.data());
  if (!parsed) return null;

  return { id: snap.id, ...parsed };
};

export const updateTil = async (
  uid: string,
  tilId: string,
  title: string,
  content: string
) => {
  const ref = doc(db, 'users', uid, 'tils', tilId);
  await updateDoc(ref, {
    title,
    content,
    updatedAt: serverTimestamp(),
  });
};

export const deleteTil = async (uid: string, tilId: string) => {
  await deleteDoc(doc(db, 'users', uid, 'tils', tilId));
  await recomputeDailyStat(uid);
  await fetchTilCount(uid);
};

export const fetchTilCount = async (uid: string) => {
  const colRef = collection(db, 'users', uid, 'tils');
  const ref = doc(db, 'users', uid);
  const snap = await getCountFromServer(colRef);
  await updateDoc(ref, {
    tilCount: snap.data().count,
  });
};
