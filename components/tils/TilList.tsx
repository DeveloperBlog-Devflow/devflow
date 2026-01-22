'use client';

import type { TilItem } from '@/types/til';
import TilCard from './TilCard';

type Props = {
  items: TilItem[];
  onDelete: (id: string) => Promise<void>;
};

const TilList = ({ items, onDelete }: Props) => {
  return (
    <div className="space-y-8">
      {items.map((it) => (
        <TilCard item={it} key={it.id} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TilList;
