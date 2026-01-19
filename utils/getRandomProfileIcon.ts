const PROFILE_ICONS = [
  '🌱',
  '🔥',
  '😎',
  '😈',
  '🖤',
  '💀',
  '⚡',
  '🌸',
  '🐣',
] as const;

export type ProfileIcon = (typeof PROFILE_ICONS)[number];

export function getRandomProfileIcon(seed: string): ProfileIcon {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0; // 32bit
  }

  const index = Math.abs(hash) % PROFILE_ICONS.length;
  return PROFILE_ICONS[index];
}
