import Card from './Card';
import GrassHeatmap from '../heatmap/GrassHeatmap';

interface GraphSectionProps {
  className?: string;
  uid?: string;
}

const GraphSection = ({ className, uid }: GraphSectionProps) => {
  return (
    <div className={className}>
      <Card title="학습 기록">
        <GrassHeatmap uid={uid} />
      </Card>
    </div>
  );
};

export default GraphSection;
