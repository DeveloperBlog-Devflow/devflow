'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { fetchMyTil } from '@/services/write/til.service';
import type { Til } from '@/services/write/til.service'; // 같은 파일에 타입 넣었다면 거기서 export한 Post 쓰세요

const Markdown = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);

const PostDetail = ({ tilId }: { tilId: string }) => {
  const router = useRouter();
  const [data, setData] = useState<Til | null>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.replace('/landing');
        return;
      }

      const post = await fetchMyTil(user.uid, tilId);
      setData(post);
    });

    return () => unsub();
  }, [tilId, router]);

  if (!data) return <div className="min-h-screen p-6">글이 없습니다.</div>;

  return (
    <div className="mx-auto min-h-screen max-w-3xl p-6" data-color-mode="light">
      <h1 className="mb-4 text-xl font-semibold">
        {data.title || '제목 없음'}
      </h1>
      <Markdown source={data.content} />
    </div>
  );
};

export default PostDetail;
