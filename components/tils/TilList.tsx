import type { TilItem } from '@/types/til';
import TilCard from './TilCard';

type Props = {
  items: TilItem[];
};

const TilList = ({ items }: Props) => {
  return (
    <div className="space-y-8">
      {items.map((it) => (
        <TilCard item={it} key={it.id} />
      ))}
    </div>
  );
};

export default TilList;
