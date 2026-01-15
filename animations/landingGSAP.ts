import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let pluginsRegistered = false;

interface AnimateOptions {
  trigger: HTMLElement; // 스크롤 트리거 기준 요소
  targets: gsap.TweenTarget; // 애니메이션 대상
  stagger?: number; // 순차 재생 간격
  start?: string; // 스크롤 시작 지점
  yOffset?: number; // y축 이동 거리
}

/* Fad Up 함수 */
const animateFadeUp = ({
  trigger,
  targets,
  stagger = 0,
  start = 'top center-=50',
  yOffset = 24,
}: AnimateOptions) => {
  if (!pluginsRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    pluginsRegistered = true;
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      targets,
      { opacity: 0, y: yOffset },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: stagger,
        scrollTrigger: {
          trigger: trigger,
          start: start,
          toggleActions: 'play none none reverse',
          // markers: true,
        },
      }
    );
  });

  return () => ctx.revert();
};

/* --- 1. Hero Section --- */
export type HeroSectionRefs = {
  titleEl: HTMLHeadingElement;
  subTextEl: HTMLDivElement;
};

export const initHeroSectionAnimation = ({
  titleEl,
  subTextEl,
}: HeroSectionRefs) => {
  return animateFadeUp({
    trigger: titleEl,
    targets: subTextEl,
    start: 'top center-=150',
    yOffset: 40,
  });
};

/* --- 2. Feature List Section --- */
export type FeatureListRefs = {
  titleEl: HTMLHeadingElement;
  subTextEl: HTMLDivElement;
  cardsContainerEl: HTMLDivElement;
};

export const initFeatureListAnimation = ({
  titleEl,
  subTextEl,
  cardsContainerEl,
}: FeatureListRefs) => {
  const cards = Array.from(cardsContainerEl.children);

  return animateFadeUp({
    trigger: titleEl,
    targets: [subTextEl, ...cards],
    stagger: 0.12,
  });
};

/* --- 3. Landing Preview Section --- */
export type LandingPreviewRefs = {
  rootEl: HTMLElement;
  titleEl: HTMLHeadingElement;
  contentContainerEl: HTMLDivElement;
};

export const initLandingPreviewAnimation = ({
  titleEl,
  contentContainerEl,
}: LandingPreviewRefs) => {
  const items = contentContainerEl.querySelectorAll('#fc-item');

  return animateFadeUp({
    trigger: titleEl,
    targets: items,
    stagger: 0.2,
  });
};
