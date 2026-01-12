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

  // gsap.context를 쓰면 cleanup이 아주 깔끔해짐
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
          start: 'right bottom+=100 60%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });

  return () => ctx.revert(); // ✅ cleanup 반환
}
