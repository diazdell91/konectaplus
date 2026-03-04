type Section<T> = { title: string; data: T[] };

const normalize = (s: string) =>
  (s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export function filterCountries<T>(
  list: T[],
  q: string,
  getName: (item: T) => string,
  getIso?: (item: T) => string,
  getPrefix?: (item: T) => string,
) {
  const s = normalize(q);
  if (!s) return list;

  return list.filter((c) => {
    const name = normalize(getName(c));
    const iso = normalize(getIso?.(c) ?? "");
    const prefix = normalize(getPrefix?.(c) ?? "");
    return (
      name.includes(s) ||
      iso.includes(s) ||
      prefix.includes(s) ||
      `+${prefix}`.includes(s)
    );
  });
}

export function makeSections<T>(
  list: T[],
  getName: (item: T) => string,
): Section<T>[] {
  const map = new Map<string, T[]>();

  for (const item of list) {
    const label = normalize(getName(item));
    const first = (label[0] || "").toUpperCase();
    const key = first >= "A" && first <= "Z" ? first : "#";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(item);
  }

  const titles = Array.from(map.keys()).sort((a, b) => {
    if (a === "#") return 1;
    if (b === "#") return -1;
    return a.localeCompare(b);
  });

  return titles.map((title) => ({
    title,
    data: map
      .get(title)!
      .slice()
      .sort((a, b) => getName(a).localeCompare(getName(b), "es")),
  }));
}

export function buildLetterIndex<T>(sections: Section<T>[]) {
  return sections.map((s) => s.title).filter((t) => t !== "#");
}
