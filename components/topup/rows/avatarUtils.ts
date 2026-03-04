const AVATAR_COLORS = [
  "#4DA3FF",
  "#4ED173",
  "#B07CFF",
  "#FF6B6B",
  "#FFB347",
  "#47C2C2",
  "#FF69B4",
  "#5B8CFF",
];

export function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + hash * 31;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "?";
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
