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
  limit,
  updateDoc,
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

  /** 4. 연속 잔디 심기 일 수 계산 */
  const streakDays = await fetchStreakDays(uid);
  await updateDoc(doc(db, 'users', uid), { streakDays });
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

function prevDateKey(key: string) {
  const [y, m, d] = key.split('-').map(Number);
  // UTC로 만들고 하루 빼서 다시 YYYY-MM-DD
  const utc = new Date(Date.UTC(y, m - 1, d));
  utc.setUTCDate(utc.getUTCDate() - 1);
  return utc.toISOString().slice(0, 10);
}

async function fetchStreakDays(uid: string): Promise<number> {
  const todayKey = dateKeyKST();

  // 최근 400일 정도만 읽어도 충분 (1년 스트릭 기준)
  const statsRef = collection(db, 'users', uid, 'dailyStats');
  const q = query(
    statsRef,
    where('date', '<=', todayKey),
    orderBy('date', 'desc'),
    limit(400)
  );

  const snap = await getDocs(q);

  // 빠른 조회용 map
  const map = new Map<string, number>();
  snap.docs.forEach((d) => {
    const data = d.data() as DailyStat;
    map.set(data.date, data.total ?? 0);
  });

  const todayTotal = map.get(todayKey) ?? 0;
  let cursor = todayTotal > 0 ? todayKey : prevDateKey(todayKey);

  let streak = 0;
  while ((map.get(cursor) ?? 0) > 0) {
    streak += 1;
    cursor = prevDateKey(cursor);
  }

  return streak;
}
