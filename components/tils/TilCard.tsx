'use client';

import { MoreVertical } from 'lucide-react';
import type { TilItem } from '@/types/til';

type Props = {
  item: TilItem;
};

const TilCard = ({ item }: Props) => {
  return (
    <article className="relative rounded-3xl border border-black/10 bg-white px-10 py-8">
      <h3 className="text-xl font-extrabold text-black/70">{item.title}</h3>

      <div className="mt-6 space-y-1 text-sm font-semibold text-black/45">
        <p className="truncate">{item.preview}</p>
      </div>

      <button
        type="button"
        className="absolute top-10 right-8 rounded-full p-2 text-black/35 hover:bg-black/5 hover:text-black/60"
        aria-label="더보기"
      >
        <MoreVertical className="h-5 w-5" />
      </button>
    </article>
  );
};

export default TilCard;
