import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// 프로필 데이터 타입
export interface Profile {
  nickname: string;
  email: string;
  streakDays: number;
  tilCount: number;
}

// 1. 유저 프로필 정보 가져오기
export const getProfile = async (uid: string): Promise<Profile | null> => {
  const userDocRef = doc(db, 'users', uid);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    return docSnap.data() as Profile;
  } else return null;
};

// 2. 사용자 프로필 정보 업데이트
