import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let pluginsRegistered = false;

const ensurePlugins = () => {
  if (pluginsRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  pluginsRegistered = true;
};

export type HeroSectionRefs = {
  titleEl: HTMLHeadingElement;
  subTextEl: HTMLDivElement;
};

export function initHeroSectionAnimation({
  titleEl,
  subTextEl,
}: HeroSectionRefs) {
  ensurePlugins();

  const ctx = gsap.context(() => {
    gsap.fromTo(
      subTextEl,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleEl,
          start: 'top center-=150',
          toggleActions: 'play none none reverse',
          // markers: true,
        },
      }
    );
  });

  return () => ctx.revert(); // ✅ cleanup 반환
}
export type FeatureListRefs = {
  titleEl: HTMLHeadingElement; // "개발자 성장을 위한"
  subTextEl: HTMLDivElement; // 서브 텍스트 wrapper
  cardsContainerEl: HTMLDivElement; // grid wrapper
};

export function initFeatureListAnimation({
  titleEl,
  subTextEl,
  cardsContainerEl,
}: FeatureListRefs) {
  ensurePlugins();

  const ctx = gsap.context(() => {
    // 카드들: grid 안의 직계 자식(FeatureCard wrapper)을 전부 잡음
    const cards = Array.from(cardsContainerEl.children) as HTMLElement[];

    // 초기 상태 (깜빡임 방지)
    gsap.set(subTextEl, { opacity: 0, y: 24 });
    gsap.set(cards, { opacity: 0, y: 28 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleEl,
        start: 'top center-=50', // 타이틀 끝이 화면 중간보다 조금 아래에 걸리면
        toggleActions: 'play none none reverse',
        // markers: true,
      },
    });

    // 1) 서브 텍스트 먼저
    tl.to(subTextEl, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    // 2) 카드들 stagger로 아래→위 쓱~
    tl.to(
      cards,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.12,
      },
      '-=0.15' // 서브텍스트 끝나기 조금 전에 겹쳐서 시작
    );
  });

  return () => ctx.revert();
}
export type LandingPreviewRefs = {
  rootEl: HTMLElement; // 섹션 전체
  titleEl: HTMLHeadingElement; // "체계적인 학습으로" h1
  contentContainerEl: HTMLDivElement; // FeatureContent 감싸는 div
};

export function initLandingPreviewAnimation({
  rootEl,
  titleEl,
  contentContainerEl,
}: LandingPreviewRefs) {
  ensurePlugins();

  const ctx = gsap.context(() => {
    const items = contentContainerEl.querySelectorAll<HTMLElement>('.fc-item');

    // ✅ 레이아웃 유지한 채로 숨김 (grid 비율 절대 안 깨짐)
    gsap.set(items, { opacity: 0, y: 24 });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: titleEl,
        start: 'top center-=50', // 필요하면 75%~85%로 튜닝
        toggleActions: 'play none none reverse',
        // markers: true,
      },
    });
  }, rootEl);

  return () => ctx.revert();
}
