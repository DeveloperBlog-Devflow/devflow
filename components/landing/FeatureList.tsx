'use client';

import FeatureCard from '@/components/landing/FeatureCard';
import { useLayoutEffect, useRef } from 'react';
import { initFeatureListAnimation } from '@/animations/landingGSAP';

import {
  FiBookOpen,
  FiTarget,
  FiCheckCircle,
  FiTrendingUp,
} from 'react-icons/fi';

const FEATURES = [
  {
    icon: <FiBookOpen className="text-xl" />,
    title: 'TIL 작성',
    description:
      '매일 배운 내용을 기록하고 정리하세요. 마크다운 지원으로 편리하게 작성할 수 있습니다.',
  },
  {
    icon: <FiTarget className="text-xl" />,
    title: '목표 관리',
    description:
      '일일 목표를 설정하고 달성률을 추적하세요. 체계적인 학습 습관을 만들어 줍니다.',
  },
  {
    icon: <FiCheckCircle className="text-xl" />,
    title: '할 일 관리',
    description:
      '오늘 할 일과 다가오는 일정을 관리하여 학습 계획을 체계적으로 수립하세요.',
  },
  {
    icon: <FiTrendingUp className="text-xl" />,
    title: '학습 시각화',
    description:
      'GitHub 스타일 잔디 그래프로 학습 활동을 한눈에 확인하고 동기부여를 받아보세요.',
  },
];
const FeatureList = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current || !subTextRef.current || !gridRef.current) return;

    const cleanup = initFeatureListAnimation({
      titleEl: titleRef.current,
      subTextEl: subTextRef.current,
      cardsContainerEl: gridRef.current,
    });

    return cleanup;
  }, []);
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-3 pt-100 text-center">
      <h1 ref={titleRef} className="text-4xl font-bold">
        개발자 성장을 위한
      </h1>
      <h1 className="text-primary text-4xl font-bold">완벽한 도구</h1>
      <div ref={subTextRef} className="text-xl font-light">
        <h2>체계적인 학습과 지속적인 성장을 돕는 강력한 기능들</h2>
      </div>
      <div
        ref={gridRef}
        className="mt-15 grid max-w-7xl grid-cols-1 gap-6 px-20 sm:grid-cols-2 lg:grid-cols-4"
      >
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
};

export default FeatureList;
