'use client';

import { MoreVertical } from 'lucide-react';
import type { TilItem } from '@/types/til';
import { useRouter } from 'next/navigation';
import { Menu } from '@headlessui/react';
import { useAuthUser } from '@/hooks/useAuthUser';
import { toast } from 'react-toastify';
import { toastConfirm } from '@/utils/toastUtils';

type Props = {
  item: TilItem;
  onDelete: (id: string) => Promise<void>;
};

const TilCard = ({ item, onDelete }: Props) => {
  const router = useRouter();
  const { user } = useAuthUser();

  if (!user) return;

  const onClickCard = async () => {
    router.push(`/write/${item.id}`);
  };
  const onClickEdit = async () => {
    router.push(`/edit/${item.id}`);
  };
  const onClickDelete = async () => {
    const ok = await toastConfirm('정말 삭제하시겠습니까?', {
      confirmText: '삭제',
      cancelText: '취소',
    });

    if (!ok) return;

    await onDelete?.(item.id);
    toast.success('성공적으로 삭제되었습니다.');
  };
  return (
    <article className="relative rounded-3xl border border-black/10 bg-white px-10 py-8">
      <h3
        className="cursor-pointer text-xl font-extrabold text-black/70"
        onClick={onClickCard}
      >
        {item.title}
      </h3>

      <div className="mt-6 space-y-1 text-sm font-semibold text-black/45">
        <p className="truncate">{item.preview}</p>
      </div>
      {/* ⋮ 메뉴 */}
      <Menu as="div" className="absolute top-10 right-8">
        <Menu.Button
          type="button"
          className="rounded-full p-2 text-black/35 hover:bg-black/5 hover:text-black/60"
          aria-label="더보기"
          onClick={(e) => e.stopPropagation()} // 카드 클릭 이벤트랑 분리
        >
          <MoreVertical className="h-5 w-5" />
        </Menu.Button>

        <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/10 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${
                  active ? 'bg-black/5' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onClickEdit();
                }}
              >
                수정
              </button>
            )}
          </Menu.Item>

          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={`w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 ${
                  active ? 'bg-black/5' : ''
                }`}
                onClick={async (e) => {
                  e.stopPropagation();
                  await onClickDelete();
                }}
              >
                삭제
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
      {/* <button
        type="button"
        className="absolute top-10 right-8 rounded-full p-2 text-black/35 hover:bg-black/5 hover:text-black/60"
        aria-label="더보기"
      >
        <MoreVertical className="h-5 w-5" onClick={onClickEdit} />
      </button> */}
    </article>
  );
};

export default TilCard;
