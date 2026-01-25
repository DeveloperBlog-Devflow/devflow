'use client';

import { useEffect, useState } from 'react';

import PageHeader from '@/components/common/PageHeader';
import ToolBar from '@/components/tils/ToolBar';
import TilList from '@/components/tils/TilList';

import { useAuthUser } from '@/lib/auth/useAuthUser';
import { fetchTilList } from '@/lib/tils/tilListService';
import { deleteTil } from '@/services/write/til.service';

import type { TilItem } from '@/types/til';

const Page = () => {
  const { user, authLoading } = useAuthUser();

  const [items, setItems] = useState<TilItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!user) return;

    await deleteTil(user.uid, id);

    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (!user) {
      setItems([]);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setError(null);
        setLoading(true);

        const list = await fetchTilList(user.uid);
        setItems(list);
      } catch (e) {
        console.error(e);
        setError('일지 목록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로그인 확인 중...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>로그인이 필요합니다.</p>
      </div>
    );
  }
  return (
    <div className="bg-background flex min-h-screen flex-col gap-5 px-30 py-11">
      <PageHeader
        title="일지"
        highlight="관리하기"
        description="작성한 일지를 관리해보세요"
      />

      <ToolBar items={items} />

      {error && <p className="text-sm text-red-500">{error}</p>}

      {loading ? (
        <p className="text-sm text-slate-400">불러오는 중...</p>
      ) : (
        <TilList items={items} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Page;
