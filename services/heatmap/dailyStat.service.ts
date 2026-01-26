import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function dateKeyKST(date = new Date()) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

export async function bumpDailyStat(
  uid: string,
  deltaTil: number,
  deltaTodoDone: number
) {
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
}
