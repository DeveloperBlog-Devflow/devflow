'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';

type UseAuthGuardOptions = {
  /** 로그인 안 됐을 때 보낼 경로 */
  redirectTo?: string;
};

type UseAuthGuardResult = {
  user: User | null;
  loading: boolean;
  isAuthed: boolean;
};

export function useAuthGuard(
  options: UseAuthGuardOptions = {}
): UseAuthGuardResult {
  const { redirectTo = '/login' } = options;

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        setUser(null);
        setLoading(true);
        router.replace(redirectTo);
        return;
      }
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, [router, redirectTo]);

  return { user, loading, isAuthed: !!user };
}
