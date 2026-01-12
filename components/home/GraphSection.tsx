import Card from './Card';

interface GraphSectionProps {
  className?: string;
}

const GraphSection = ({ className }: GraphSectionProps) => {
  return (
    <div className={className}>
      <Card title="학습 기록">대충 잔디그래프</Card>
    </div>
  );
};

export default GraphSection;
