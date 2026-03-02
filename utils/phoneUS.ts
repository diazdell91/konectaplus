// Valida NANP: 10 dígitos donde el área (NPA) y el exchange (NXX) empiezan 2-9
const NANP_10_REGEX = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;

/** Limpia todo menos dígitos */
export const onlyDigits = (s: string) => s.replace(/\D+/g, "");

/** Normaliza a E.164 (+1XXXXXXXXXX) si es válido US; de lo contrario null */
export const toE164US = (input: string): string | null => {
  let d = onlyDigits(input);

  // Permite 11 dígitos si empieza en 1 (código país)
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);

  if (d.length !== 10) return null;
  if (!NANP_10_REGEX.test(d)) return null;

  return `+1${d}`;
};

/** Valida si el input es un US válido (NANP) */
export const isValidUSPhone = (input: string): boolean =>
  toE164US(input) !== null;

/** Formato bonito (XXX) XXX-XXXX para la UI (no para guardar) */
export const prettyUS = (input: string): string => {
  const d = onlyDigits(input).replace(/^1/, ""); // quita 1 inicial si viene con +1
  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 10);
  if (d.length <= 3) return p1;
  if (d.length <= 6) return `(${p1}) ${p2}`;
  return `(${p1}) ${p2}-${p3}`;
};
