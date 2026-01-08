import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

export type SignupPayload = {
  nickname: string;
  email: string;
  password: string;
};

export async function signupWithEmail(p: SignupPayload) {
  const cred = await createUserWithEmailAndPassword(auth, p.email, p.password);
  await updateProfile(cred.user, { displayName: p.nickname });
  await setDoc(doc(db, 'users', cred.user.uid), {
    nickname: p.nickname,
    email: p.email,
    createdAt: serverTimestamp(),
  });
  return cred.user;
}
