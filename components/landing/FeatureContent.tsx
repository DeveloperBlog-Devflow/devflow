import { FiCheckCircle } from 'react-icons/fi';

const ITEMS = [
  {
    title: '일관된 학습 습관',
    description: '매일 TIL을 작성하며 꾸준한 학습 습관을 만듭니다',
  },
  {
    title: '명확한 목표 설정',
    description: '구체적인 목표를 세우고 달성하며 성장합니다',
  },
  {
    title: '시각화된 진행상황',
    description: '그래프와 통계로 학습 현황을 한눈에 확인합니다',
  },
  {
    title: '지속적인 동기부여',
    description: '연속 기록을 통해 학습 동기를 유지합니다',
  },
];

const FeatureContent = () => {
  return (
    <ul className="space-y-6">
      {ITEMS.map((item) => (
        <li key={item.title} id="fc-item">
          <div className="flex gap-3">
            <FiCheckCircle className="text-primary text-2xl" />
            <p className="text-xl font-medium">{item.title}</p>
          </div>
          <p className="text-text-sub text-l mt-1 pl-10 text-left">
            {item.description}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default FeatureContent;
