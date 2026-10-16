import { VIREXEN_PRODUCT_BRANDS } from './virexen-brand';
/** Public Virexen destinations. Internal/private applications are intentionally excluded. */
export const VIREXEN_LAUNCHER_APPS = [
  { id: 'Virexen', label: 'Virexen', href: 'https://virexen.com' },
  { id: 'Virexen-Pay', label: 'Virexen Pay', href: 'https://pay.virexen.com' },
  { id: 'My-Virexen', label: 'My Virexen', href: 'https://my.virexen.com' },
  { id: 'Virexen-Workspace', label: 'Workspace', href: 'https://workspace.virexen.com' },
  { id: 'Virexen-Support', label: 'Support', href: 'https://support.virexen.com' },
  { id: 'Marlo', label: 'Marlo', href: 'https://marlo.virexen.com' },
].map(app => ({ ...app, logoUrl: VIREXEN_PRODUCT_BRANDS[app.id as keyof typeof VIREXEN_PRODUCT_BRANDS].svg }));
/** Other Apps must be supplied from the application's authenticated, authorised account data. */
