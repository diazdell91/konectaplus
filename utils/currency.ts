export function formatUsd(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function discountPercent(sell: number, compare: number): number {
  if (compare <= sell) return 0;
  return Math.round(((compare - sell) / compare) * 100);
}
