import { formatHex, converter, wcagContrast } from 'culori';
const toOklch = converter('oklch');
export type BrandSwatch = { step: number; hex: string; contrastOnWhite: number; preferredText: '#ffffff' | '#111827' };
/** Generate a uniform OKLCH palette from a supplied brand colour. Source logo pixels are NOT sampled here. */
export function generateBrandPalette(seed: string): BrandSwatch[] {
  const base = toOklch(seed);
  if (!base) throw new Error('Invalid CSS brand colour');
  return [50,100,200,300,400,500,600,700,800,900,950].map(step => {
    const lightness = step === 950 ? .16 : step === 50 ? .97 : .97 - (step / 900) * .69;
    const hex = formatHex({ mode: 'oklch', l: lightness, c: Math.min(base.c ?? 0, step < 200 ? .045 : .17), h: base.h ?? 200 }) ?? seed;
    return { step, hex, contrastOnWhite: wcagContrast(hex, '#ffffff'),
      preferredText: wcagContrast(hex,'#ffffff') >= wcagContrast(hex,'#111827') ? '#ffffff' : '#111827' };
  });
}
export function meetsTextContrast(foreground:string, background:string, large=false) {
  return wcagContrast(foreground, background) >= (large ? 3 : 4.5);
}
