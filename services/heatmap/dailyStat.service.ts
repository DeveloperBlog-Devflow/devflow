import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
  getDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface DailyStat {
  date: string; // YYYY-MM-DD
  tilCount: number;
  planDoneCount: number;
  total: number;
  updatedAt?: Timestamp;
}

function dateKeyKST(date = new Date()) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

const formatDate = (d: string | Date | undefined) => {
  if (!d) return '';
  if (typeof d === 'string') return d;
  return d.toISOString().split('T')[0]; // YYYY-MM-DD 형식
};

export const recomputeDailyStat = async (uid: string) => {
  const dateKey = dateKeyKST();

  /** 1. 오늘 완료된 planItems */

  const planItemsRef = collection(db, 'users', uid, 'planItems');
  const planQuery = query(
    planItemsRef,
    where('dateKey', '==', dateKey),
    where('isChecked', '==', true)
  );
  const planSnap = await getDocs(planQuery);
  const planDoneCount = planSnap.size;

  /** 2. 오늘 작성한 TIL */
  const tilRef = collection(db, 'users', uid, 'tils');
  const tilQuery = query(tilRef, where('dateKey', '==', dateKey));
  const tilSnap = await getDocs(tilQuery);
  const tilCount = tilSnap.size;

  /** 3. DailyStat 덮어쓰기 */
  const ref = doc(db, 'users', uid, 'dailyStats', dateKey);

  await setDoc(
    ref,
    {
      date: dateKey,
      tilCount,
      planDoneCount,
      total: tilCount + planDoneCount,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

export const fetchDailyStats = async (uid: string): Promise<DailyStat[]> => {
  const colRef = collection(db, 'users', uid, 'dailyStats');

  const endDate = dateKeyKST();
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);
  const startDate = dateKeyKST(start);

  const q = query(
    colRef,
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date', 'asc')
  );

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    date: d.data().date,
    tilCount: d.data().tilCount ?? 0,
    planDoneCount: d.data().planDoneCount ?? 0,
    total: d.data().total ?? 0,
  }));
};

export const fetchDailyStatByDate = async (
  uid: string,
  date: string
): Promise<DailyStat | null> => {
  const ref = doc(db, 'users', uid, 'dailyStats', date);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();
  return {
    date: data.date,
    tilCount: data.tilCount ?? 0,
    planDoneCount: data.planDoneCount ?? 0,
    total: data.total ?? 0,
  };
};
