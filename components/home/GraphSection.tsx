import Card from './Card';
import GrassHeatmap from '../heatmap/GrassHeatmap';

interface GraphSectionProps {
  className?: string;
}

const GraphSection = ({ className }: GraphSectionProps) => {
  return (
    <div className={className}>
      <Card title="학습 기록">
        <GrassHeatmap />
      </Card>
    </div>
  );
};

export default GraphSection;
