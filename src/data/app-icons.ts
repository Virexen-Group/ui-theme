/** Owner-provided official application artwork. No generated or substituted assets. */
export const VIREXEN_APP_ICON_NAMES = ['CampPulze','CampPulze-Health','PulzeConnect'] as const;
export type VirexenAppIconName = typeof VIREXEN_APP_ICON_NAMES[number];
export type VirexenAppIconFormat = 'png' | 'webp' | 'svg' | 'ico';
export type VirexenAppIconSize = 16|32|48|64|128|192|256|512|1024;
export const VIREXEN_APP_ICON_SIZES = [16,32,48,64,128,192,256,512,1024] as const;
export const VIREXEN_ASSET_ORIGIN = 'https://edge.virexen.com';
export const VIREXEN_ASSET_FALLBACK_ORIGIN = 'https://edge-fallback.virexengroup.com';
/** Retry only approved CDN paths on the fallback host, preserving the full pathname and query. */
export function getVirexenFallbackUrl(primaryUrl: string): string | null {
  try {
    const url = new URL(primaryUrl);
    if (url.origin !== VIREXEN_ASSET_ORIGIN) return null;
    return VIREXEN_ASSET_FALLBACK_ORIGIN + url.pathname + url.search;
  } catch { return null; }
}
export function getVirexenAppIconUrl(app: VirexenAppIconName, format: VirexenAppIconFormat='svg', size: VirexenAppIconSize=512): string {
  if (!VIREXEN_APP_ICON_NAMES.includes(app)) throw new Error(`Unsupported app icon: ${app}`);
  if (format === 'svg') return `${VIREXEN_ASSET_ORIGIN}/apps/${app}/SVG/${app}.svg`;
  if (format === 'ico') return `${VIREXEN_ASSET_ORIGIN}/apps/${app}/ICO/${app}.ico`;
  if (!VIREXEN_APP_ICON_SIZES.includes(size)) throw new Error(`Unsupported app icon size: ${size}`);
  const dir = format === 'png' ? 'PNG' : 'WebP';
  return `${VIREXEN_ASSET_ORIGIN}/apps/${app}/${dir}/${app}-${size}x${size}.${format}`;
}
