import {
  doc,
  runTransaction,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface DailyStat {
  date: string; // YYYY-MM-DD
  total: number;
}

function dateKeyKST(date = new Date()) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export const bumpDailyStat = async (
  uid: string,
  deltaTil: number,
  deltaTodoDone: number
) => {
  const key = dateKeyKST();
  const ref = doc(db, `users/${uid}/dailyStats/${key}`);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);

    const prev = snap.exists()
      ? (snap.data() as {
          tilCount?: number;
          todoDoneCount?: number;
          total?: number;
        })
      : {};

    const nextTil = Math.max(0, (prev.tilCount ?? 0) + deltaTil);
    const nextTodo = Math.max(0, (prev.todoDoneCount ?? 0) + deltaTodoDone);
    const nextTotal = Math.max(0, nextTil + nextTodo);

    tx.set(
      ref,
      {
        date: key,
        tilCount: nextTil,
        todoDoneCount: nextTodo,
        total: nextTotal,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  });
};

export const fetchDailyStats = async (uid: string) => {
  const colRef = collection(db, 'users', uid, 'dailyStats');

  const endDate = dateKeyKST(new Date());
  const startDate = (() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 1);
    d.setDate(d.getDate() + 1);
    return dateKeyKST(d);
  })();

  const q = query(
    colRef,
    where('date', '>=', startDate),
    where('date', '<=', endDate),
    orderBy('date', 'asc')
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => {
    const data = doc.data();
    return {
      date: data.date,
      total: data.total ?? 0,
    };
  });
};
