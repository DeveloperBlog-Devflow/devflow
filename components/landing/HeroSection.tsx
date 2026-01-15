'use client';

import { useLayoutEffect, useRef } from 'react';
import { initHeroSectionAnimation } from '@/animations/landingGSAP';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!titleRef.current || !subTextRef.current) return;

    const cleanup = initHeroSectionAnimation({
      titleEl: titleRef.current,
      subTextEl: subTextRef.current,
    });

    return cleanup;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center space-y-3 pt-100 text-center">
      <h1 ref={titleRef} className="text-8xl font-bold">
        매일 성장하는
      </h1>
      <h1 className="text-primary text-8xl font-bold">개발자의 여정</h1>
      <div ref={subTextRef} className="text-2xl font-light">
        <h2>TIL 작성부터 목표 관리까지, DevFlow와 함께</h2>
        <h2>체계적인 학습으로 더 나은 개발자로 성장하세요</h2>
      </div>
    </div>
  );
};

export default HeroSection;
