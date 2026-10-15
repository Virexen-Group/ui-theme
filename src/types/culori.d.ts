declare module 'culori' {
  export type Oklch = { mode: 'oklch'; l: number; c: number; h?: number };
  export function converter(mode: 'oklch'): (value: string) => Oklch | undefined;
  export function formatHex(color: Oklch): string | undefined;
  export function wcagContrast(a: string, b: string): number;
}
