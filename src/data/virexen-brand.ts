/** Official Virexen family brand icons (remote CDN assets). */
export const VIREXEN_PRODUCT_BRANDS = {
  'Virexen': { png: 'https://edge.virexen.com/brands/Virexen/PNG/Virexen-512x512.png', svg: 'https://edge.virexen.com/brands/Virexen/SVG/Virexen.svg' },
  'Virexen-Pay': { png: 'https://edge.virexen.com/brands/Virexen-Pay/PNG/Virexen-Pay-512x512.png', svg: 'https://edge.virexen.com/brands/Virexen-Pay/SVG/Virexen-Pay.svg' },
  'Virexen-Workspace': { png: 'https://edge.virexen.com/brands/Virexen-Workspace/PNG/Virexen-Workspace-512x512.png', svg: 'https://edge.virexen.com/brands/Virexen-Workspace/SVG/Virexen-Workspace.svg' },
  'Virexen-Identity': { png: 'https://edge.virexen.com/brands/Virexen-Identity/PNG/Virexen-Identity-512x512.png', svg: 'https://edge.virexen.com/brands/Virexen-Identity/SVG/Virexen-Identity.svg' },
  'My-Virexen': { png: 'https://edge.virexen.com/brands/My-Virexen/PNG/My-Virexen-512x512.png', svg: 'https://edge.virexen.com/brands/My-Virexen/SVG/My-Virexen.svg' },
  'Virexen-Cloud': { png: 'https://edge.virexen.com/brands/Virexen-Cloud/PNG/Virexen-Cloud-512x512.png', svg: 'https://edge.virexen.com/brands/Virexen-Cloud/SVG/Virexen-Cloud.svg' },
  'Virexen-CMS': { png: 'https://edge.virexen.com/brands/Virexen-CMS/PNG/Virexen-CMS-512x512.png', svg: 'https://edge.virexen.com/brands/Virexen-CMS/SVG/Virexen-CMS.svg' },
  'Virexen-Support': { png: 'https://edge.virexen.com/brands/Virexen-Support/PNG/Virexen-Support-512x512.png', svg: 'https://edge.virexen.com/brands/Virexen-Support/SVG/Virexen-Support.svg' },
  'Virexen-Developer': { png: 'https://edge.virexen.com/brands/Virexen-Developer/PNG/Virexen-Developer-512x512.png', svg: 'https://edge.virexen.com/brands/Virexen-Developer/SVG/Virexen-Developer.svg' },
  'Marlo': { png: 'https://edge.virexen.com/brands/Marlo/PNG/Marlo-512x512.png', svg: 'https://edge.virexen.com/brands/Marlo/SVG/Marlo.svg' },
} as const;
export type VirexenBrand = keyof typeof VIREXEN_PRODUCT_BRANDS;
export type VirexenBrandFormat = 'svg' | 'png';
/** Use the exact approved CDN artwork; size is controlled by the consumer. */
export function getVirexenBrandUrl(brand: VirexenBrand = 'Virexen', format: VirexenBrandFormat = 'svg'): string {
  return VIREXEN_PRODUCT_BRANDS[brand][format];
}

/** Exact artwork URLs provided by the Virexen owner. These are remote, not bundled assets. */
export const VIREXEN_BRAND_ASSETS = {
  svg32: 'https://edge.virexen.com/corporate/branding/Virexen/logo/icon/svg/32/Modern%20Virexen%20Icon%2032x32.svg',
  svg512: 'https://edge.virexen.com/corporate/branding/Virexen/logo/icon/svg/512/Modern%20Virexen%20Icon%20512x512.svg',
  png32: 'https://edge.virexen.com/corporate/branding/Virexen/logo/icon/png/32/Modern%20Virexen%20Icon%2032x32-01.png',
  png512: 'https://edge.virexen.com/corporate/branding/Virexen/logo/icon/png/512/Modern%20Virexen%20Icon%20512x512-01.png'
} as const;
/** Provisional Virexen teal palette based on existing UI theme, NOT colour-sampled from logo. */
export const VIREXEN_BRAND_COLORS = {
  teal: {50:'#e9f8f7',100:'#c9eeeb',200:'#9cddd7',300:'#6bc8bf',400:'#39aea4',500:'#159f96',600:'#10887f',700:'#106d67',800:'#115753',900:'#133f3e'},
  neutral: {50:'#f8fafb',100:'#f1f5f6',200:'#e2e9eb',300:'#c9d4d7',400:'#94a5aa',500:'#687a80',600:'#4a5d63',700:'#36474c',800:'#243338',900:'#152428'},
  white:'#ffffff', ink:'#132f32'
} as const;
