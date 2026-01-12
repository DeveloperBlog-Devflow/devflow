import Card from './Card';

interface BottomSectionProps {
  className?: string;
}

const BottomSection = ({ className }: BottomSectionProps) => {
  return (
    <div className={className}>
      <Card title="오늘 할 일">대충 할 일</Card>
      <Card title="다가오는 일정">대충 일정</Card>
    </div>
  );
};

export default BottomSection;
