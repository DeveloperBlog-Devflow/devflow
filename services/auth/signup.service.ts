import { auth, db } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GithubAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { getDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';

export type SignupPayload = {
  nickname: string;
  email: string;
  password: string;
};

export const signupWithEmail = async (p: SignupPayload) => {
  const cred = await createUserWithEmailAndPassword(auth, p.email, p.password);
  await updateProfile(cred.user, { displayName: p.nickname });
  await setDoc(doc(db, 'users', cred.user.uid), {
    nickname: p.nickname,
    email: p.email,
    createdAt: serverTimestamp(),
    streakDays: 0,
    tilCount: 0,
  });
  return cred.user;
};

export const signupWithGithub = async () => {
  const provider = new GithubAuthProvider();

  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const info = getAdditionalUserInfo(result);
  const githubUsername = info?.username ?? null;
  const avatar_url = info?.profile?.avatar_url;
  console.log(info);
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      nickname: user.displayName ?? githubUsername ?? '익명',
      email: user.email ?? '',
      createdAt: serverTimestamp(),
      streakDays: 0,
      tilCount: 0,
      avatar_url: avatar_url,
    });
  }
  return user;
};
