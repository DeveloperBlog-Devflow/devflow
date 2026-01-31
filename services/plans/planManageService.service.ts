import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { recomputeDailyStat } from '@/services/heatmap/dailyStat.service';

// 플랜 데이터 타입
export interface Plan {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
}

// 하위 항목 데이터 타입
export interface PlanItem {
  id: string;
  planId: string;
  text: string;
  isChecked: boolean;
  deadline?: Date;
  createdAt: Date;
  dateKey?: string;
}
function dateKeyKST(date = new Date()) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().slice(0, 10);
}

// 1. 플랜 생성하기
export const addPlan = async (
  uid: string,
  title: string,
  description: string = ''
) => {
  await addDoc(collection(db, 'users', uid, 'plans'), {
    title,
    description,
    createdAt: Timestamp.now(),
  });
};

// 2. 모든 플랜 가져오기
export const fetchPlans = async (uid: string): Promise<Plan[]> => {
  const plansRef = collection(db, 'users', uid, 'plans');
  const q = query(plansRef, orderBy('createdAt', 'desc')); // 최신순 정렬
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt?.toDate(),
  })) as Plan[];
};

// 3. 특정 플랜의 모든 하위 항목 가져오기
export const fetchPlanItems = async (
  uid: string,
  planId: string
): Promise<PlanItem[]> => {
  const itemsRef = collection(db, 'users', uid, 'planItems');

  // 쿼리: 내 UID + 특정 planId를 가진 항목만 필터링
  const q = query(
    itemsRef,
    where('planId', '==', planId),
    orderBy('createdAt', 'asc') // 생성순 정렬 (또는 deadline으로 정렬 가능)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      // Firestore Timestamp를 JS Date로 변환
      createdAt: data.createdAt?.toDate(),
      deadline: data.deadline?.toDate(),
    };
  }) as PlanItem[];
};

// 4. 하위 항목 추가하기
export const addPlanItem = async (
  uid: string,
  planId: string,
  text: string,
  deadline?: Date
) => {
  await addDoc(collection(db, 'users', uid, 'planItems'), {
    planId,
    text,
    isChecked: false,
    deadline: deadline ? Timestamp.fromDate(deadline) : null,
    createdAt: Timestamp.now(),
    dateKey: deadline ? dateKeyKST(deadline) : null,
  });
};

// 5. 하위 항목 토글
export const toggleItemStatus = async (
  uid: string,
  itemId: string,
  currentStatus: boolean
) => {
  const itemRef = doc(db, 'users', uid, 'planItems', itemId);
  await updateDoc(itemRef, {
    isChecked: !currentStatus,
  });
  await recomputeDailyStat(uid);
};

// 6. 플랜 삭제
export const deletePlan = async (uid: string, planId: string) => {
  // 1. 일괄 처리(Batch) 생성
  const batch = writeBatch(db);

  // 2. 이 플랜에 속한 하위 항목들을 먼저 찾기
  const itemsRef = collection(db, 'users', uid, 'planItems');
  const q = query(itemsRef, where('planId', '==', planId));
  const snapshot = await getDocs(q);

  // 3. 찾은 하위 항목들을 삭제 목록(batch)에 담기
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // 4. 마지막으로 플랜 본체를 삭제 목록에 담기
  const planRef = doc(db, 'users', uid, 'plans', planId);
  batch.delete(planRef);

  // 5. 한 번에 실행 (Atomic Operation)
  await batch.commit();
};

// 7. 하위 항목 삭제
export const deletePlanItem = async (uid: string, itemId: string) => {
  const itemRef = doc(db, 'users', uid, 'planItems', itemId);
  await deleteDoc(itemRef);
};

// 8. 플랜 수정 (제목, 설명)
export const updatePlan = async (
  uid: string,
  planId: string,
  updates: { title?: string; description?: string }
) => {
  const planRef = doc(db, 'users', uid, 'plans', planId);

  const updatePayload: {
    title?: string;
    description?: string;
  } = {};

  if (updates.title !== undefined) {
    updatePayload.title = updates.title;
  }
  if (updates.description !== undefined) {
    updatePayload.description = updates.description;
  }

  if (Object.keys(updatePayload).length > 0) {
    await updateDoc(planRef, updatePayload);
  }
};

// 9. 하위 항목 수정 (제목, 설명, 마감일)
export const updatePlanItem = async (
  uid: string,
  itemId: string,
  updates: {
    text?: string; // 수정할 제목
    description?: string; // 수정할 설명
    deadline?: Date | null; // 수정할 마감일 (null이면 마감일 삭제)
    dateKey?: string;
  }
) => {
  const itemRef = doc(db, 'users', uid, 'planItems', itemId);

  // Firestore에 보낼 데이터 객체 만들기
  const updatePayload: {
    text?: string;
    description?: string;
    deadline?: Timestamp | null;
    dateKey?: string | null;
  } = {};

  // 1. 제목이 전달되었으면 업데이트 목록에 추가
  if (updates.text !== undefined) {
    updatePayload.text = updates.text;
  }

  // 2. 설명이 전달되었으면 업데이트 목록에 추가
  if (updates.description !== undefined) {
    updatePayload.description = updates.description;
  }

  // 3. 마감일 처리 (Date -> Timestamp 변환 또는 삭제)
  if (updates.deadline !== undefined) {
    updatePayload.deadline = updates.deadline
      ? Timestamp.fromDate(updates.deadline)
      : null; // null을 넘기면 DB에서 마감일이 사라짐
    updatePayload.dateKey = updates.deadline
      ? dateKeyKST(updates.deadline)
      : null;
  }

  // 변경사항이 있을 때만 DB 요청
  if (Object.keys(updatePayload).length > 0) {
    await updateDoc(itemRef, updatePayload);
  }
};

// 10. 하위 항목 모두 가져오기
export const fetchAllPlanItems = async (uid: string): Promise<PlanItem[]> => {
  const allPlanItemsRef = collection(db, 'users', uid, 'planItems');
  const q = query(allPlanItemsRef);
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      deadline: data.deadline?.toDate() ?? null,
    };
  }) as PlanItem[];
};
// 오늘의 할일 가져오기
export const fetchTodayPlanItems = async (uid: string): Promise<PlanItem[]> => {
  const itemsRef = collection(db, 'users', uid, 'planItems');

  // KST 기준 오늘 00:00 ~ 내일 00:00
  const now = new Date();
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const startKST = new Date(kst.getFullYear(), kst.getMonth(), kst.getDate());
  const start = new Date(startKST.getTime() - 9 * 60 * 60 * 1000);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

  const q = query(
    itemsRef,
    where('deadline', '>=', Timestamp.fromDate(start)),
    where('deadline', '<', Timestamp.fromDate(end)),
    orderBy('deadline', 'asc'),
    orderBy('createdAt', 'asc')
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((docSnap) => {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
      deadline: data.deadline?.toDate(),
    };
  }) as PlanItem[];
};

// 다가오는 일정 가져오기
export const fetchUpcomingPlanItems = async (
  uid: string,
  fromDate: Date
): Promise<PlanItem[]> => {
  const itemsRef = collection(db, 'users', uid, 'planItems');

  const q = query(
    itemsRef,
    where('deadline', '>=', Timestamp.fromDate(fromDate))
  );

  const snapshot = await getDocs(q);

  const items = snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
      deadline: data.deadline?.toDate?.() ?? new Date(),
    } as PlanItem;
  });

  //정렬
  items.sort((a, b) => {
    const deadlineA = a.deadline ? a.deadline.getTime() : Infinity;
    const deadlineB = b.deadline ? b.deadline.getTime() : Infinity;

    // deadline이 다르면 deadline으로 정렬
    if (deadlineA !== deadlineB) {
      return deadlineA - deadlineB;
    }

    // deadline이 같거나 둘 다 없으면 createdAt으로 정렬
    return +a.createdAt - +b.createdAt;
  });

  return items;
};
