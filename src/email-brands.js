import {sanitizeEmailHtml, escapeHtml} from './email.js';
// Each brand provides a shell. Message-specific templates supply bodyHtml and subject separately.
export const emailBrands=Object.freeze([
  {
    "name": "Virexen",
    "id": "Virexen",
    "primary": "#193b9f",
    "soft": "#edf2ff",
    "logo": "https://edge.virexen.com/brands/Virexen/PNG/Virexen-512x512.png",
    "privacyUrl": "https://virexen.com/privacy"
  },
  {
    "name": "Virexen Pay",
    "id": "Virexen-Pay",
    "primary": "#2345a9",
    "soft": "#eff3ff",
    "logo": "https://edge.virexen.com/brands/Virexen-Pay/PNG/Virexen-Pay-512x512.png",
    "privacyUrl": "https://virexen.com/privacy"
  },
  {
    "name": "Virexen Workspace",
    "id": "Virexen-Workspace",
    "primary": "#225b8e",
    "soft": "#eaf4fb",
    "logo": "https://edge.virexen.com/brands/Virexen-Workspace/PNG/Virexen-Workspace-512x512.png",
    "privacyUrl": "https://virexen.com/privacy"
  },
  {
    "name": "Virexen Identity",
    "id": "Virexen-Identity",
    "primary": "#193b9f",
    "soft": "#edf2ff",
    "logo": "https://edge.virexen.com/brands/Virexen-Identity/PNG/Virexen-Identity-512x512.png",
    "privacyUrl": "https://virexen.com/privacy"
  },
  {
    "name": "My Virexen",
    "id": "My-Virexen",
    "primary": "#24659d",
    "soft": "#eaf5fd",
    "logo": "https://edge.virexen.com/brands/My-Virexen/PNG/My-Virexen-512x512.png",
    "privacyUrl": "https://virexen.com/privacy"
  },
  {
    "name": "Virexen Cloud",
    "id": "Virexen-Cloud",
    "primary": "#1b508c",
    "soft": "#edf3fb",
    "logo": "https://edge.virexen.com/brands/Virexen-Cloud/PNG/Virexen-Cloud-512x512.png",
    "privacyUrl": "https://virexen.com/privacy"
  },
  {
    "name": "Virexen CMS",
    "id": "Virexen-CMS",
    "primary": "#274d91",
    "soft": "#eff2fc",
    "logo": "https://edge.virexen.com/brands/Virexen-CMS/PNG/Virexen-CMS-512x512.png",
    "privacyUrl": "https://virexen.com/privacy"
  },
  {
    "name": "Virexen Support",
    "id": "Virexen-Support",
    "primary": "#176f83",
    "soft": "#eaf8fb",
    "logo": "https://edge.virexen.com/brands/Virexen-Support/PNG/Virexen-Support-512x512.png",
    "privacyUrl": "https://virexen.com/privacy"
  },
  {
    "name": "Virexen Developer",
    "id": "Virexen-Developer",
    "primary": "#343b85",
    "soft": "#f0f0ff",
    "logo": "https://edge.virexen.com/brands/Virexen-Developer/PNG/Virexen-Developer-512x512.png",
    "privacyUrl": "https://virexen.com/privacy"
  },
  {
    "name": "Marlo",
    "id": "Marlo",
    "primary": "#5148a0",
    "soft": "#f2f0ff",
    "logo": "https://edge.virexen.com/brands/Marlo/PNG/Marlo-512x512.png",
    "privacyUrl": "https://virexen.com/privacy"
  },
  {
    "name": "CampPulze",
    "id": "CampPulze",
    "primary": "#225c88",
    "soft": "#edf6fb",
    "logo": "https://edge.virexen.com/apps/CampPulze/PNG/CampPulze-512x512.png",
    "privacyUrl": "https://camppulze.com/privacy"
  },
  {
    "name": "CampPulze Health",
    "id": "CampPulze-Health",
    "primary": "#236b78",
    "soft": "#ebf8f8",
    "logo": "https://edge.virexen.com/apps/CampPulze-Health/PNG/CampPulze-Health-512x512.png",
    "privacyUrl": "https://camppulze.com/privacy"
  },
  {
    "name": "PulzeConnect",
    "id": "PulzeConnect",
    "primary": "#27678f",
    "soft": "#edf7fe",
    "logo": "https://edge.virexen.com/apps/PulzeConnect/PNG/PulzeConnect-512x512.png",
    "privacyUrl": "https://camppulze.com/privacy"
  }
]);
export const VIREXEN_GROUP_WORDMARK = 'https://edge.virexen.com/corporate/branding/Virexen/logo/text/png/Modern%20Virexen%20Text-01.png';
export const CAMPPULZE_HEADER_LOGO = 'https://edge.virexen.com/corporate/branding/CampPulze/logo/full/svg/CampPulze.svg';
export const CAMPPULZE_HEADER_LOGO_PNG = 'https://edge.virexen.com/corporate/branding/CampPulze/logo/text/png/CampPulzeText.png';

const safeUrl = (url, fallback='') => { if (!url) return fallback; try {const parsed = new URL(url); if (parsed.protocol === 'https:' && !parsed.username && !parsed.password) return parsed.href;} catch {} throw new Error('Email assets and links require absolute HTTPS URLs');};
const safeColour = (colour, fallback) => /^#[\da-f]{3}(?:[\da-f]{3})?$/i.test(colour || '') ? colour : fallback;
export function resolveEmailBrand(brand='Virexen', overrides={}) {
  const found=emailBrands.find(b=>b.id===brand||b.name===brand);
  if(!found && !overrides.name) throw new Error('Unknown email brand: '+brand);
  const base=found||{name:brand,id:brand,primary:'#193b9f',soft:'#edf2ff',logo:'',privacyUrl:'https://virexen.com/privacy'};
  return {...base,...overrides,name:overrides.name||base.name,primary:safeColour(overrides.primary,base.primary),soft:safeColour(overrides.soft,base.soft),dividerColor:safeColour(overrides.dividerColor,overrides.primary||base.primary),logo:safeUrl(overrides.logo,base.logo),secondaryLogo:overrides.secondaryLogo ? safeUrl(overrides.secondaryLogo) : (['CampPulze','CampPulze-Health','PulzeConnect'].includes(base.id)?CAMPPULZE_HEADER_LOGO_PNG:''),privacyUrl:safeUrl(overrides.privacyUrl,base.privacyUrl),supportUrl:safeUrl(overrides.supportUrl,'https://support.virexen.com')};
}
export function renderBrandedEmailText({subject='Account update',bodyHtml='',to='user@example.com',reason='You have an account with us.'}={}) {
  const content=sanitizeEmailHtml(bodyHtml).replace(/<br\s*\/?\s*>/gi,'\n').replace(/<\/(p|div|li|h[1-6])>/gi,'\n\n').replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/[ \t]{2,}/g,' ').trim();
  return `${subject}\n\n${content}\n\nThis email was sent to ${to} because ${reason}\n\nVirexen Group`;
}
export function renderBrandedEmail({brand='Virexen',brandConfig={},subject='Account update',preheader='',bodyHtml='<p>Your message goes here.</p>',to='user@example.com',reason='You have an account with us.',year=new Date().getFullYear(),privacyUrl,secondaryBranding=true,legalLinks=[],footerBranding='A Virexen Group service'}={}) {
 const theme=resolveEmailBrand(brand,{...brandConfig,...(privacyUrl?{privacyUrl}:{})});
 const title=escapeHtml(subject),recipient=escapeHtml(to),why=escapeHtml(reason),pre=escapeHtml(preheader),name=escapeHtml(theme.name);
 const content=sanitizeEmailHtml(bodyHtml);
 const mainLogo=theme.logo?`<img src="${escapeHtml(theme.logo)}" width="42" height="42" alt="${name} logo" style="display:block;width:42px;height:42px;border:0;border-radius:10px;">`:'';
 const secondary=secondaryBranding&&theme.secondaryLogo?`<td align="right" valign="middle" style="padding-left:12px"><img src="${escapeHtml(theme.secondaryLogo)}" width="112" alt="Secondary brand" style="display:block;width:112px;max-width:112px;height:auto;border:0;"></td>`:'';
 const links=[{text:'Privacy policy',url:theme.privacyUrl},{text:'Support',url:theme.supportUrl},...legalLinks].map(link=>`<a href="${escapeHtml(safeUrl(link.url))}" style="color:${theme.primary};text-decoration:underline">${escapeHtml(link.text||'Legal')}</a>`).join(' &nbsp;·&nbsp; ');
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>${title}</title></head><body style="margin:0;padding:0;background:${theme.soft};font-family:Arial,Helvetica,sans-serif;color:#17263b;">
<div style="display:none;font-size:1px;color:${theme.soft};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all">${pre}</div>
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="width:100%;background:${theme.soft}"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid #e2e8f0;border-collapse:separate;border-spacing:0;">
<tr><td style="padding:24px 36px 21px"><table role="presentation" cellspacing="0" cellpadding="0" width="100%"><tr><td width="54" valign="middle">${mainLogo}</td><td valign="middle" style="font-size:18px;line-height:1.35;font-weight:700;color:#182a44">${name}</td>${secondary}</tr></table></td></tr>
<tr><td height="4" style="height:4px;background:${theme.dividerColor};font-size:1px;line-height:4px">&nbsp;</td></tr>
<tr><td style="padding:36px 36px 38px"><h1 style="font-family:Arial,Helvetica,sans-serif;font-size:25px;line-height:1.3;color:#15253c;margin:0 0 22px">${title}</h1><div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.75;color:#344358">${content}</div></td></tr>
<tr><td style="padding:23px 36px 25px;border-top:1px solid #e8edf4;background:#f8fafc"><p style="font-size:12px;line-height:1.7;margin:0 0 5px;color:#52657c">This email was sent to <strong>${recipient}</strong> because ${why}</p><p style="font-size:12px;line-height:1.7;margin:0 0 9px;color:#52657c">© ${escapeHtml(year)} Virexen Group. All rights reserved.</p><p style="font-size:12px;line-height:1.7;margin:0 0 19px">${links}</p>
<table role="presentation" cellspacing="0" cellpadding="0" width="100%" style="border-top:1px solid #e1e7ef"><tr><td valign="middle" style="padding-top:15px;color:#64748b;font-size:11px;line-height:1.4">${escapeHtml(footerBranding)}</td><td align="right" valign="middle" style="padding-top:15px"><img src="${VIREXEN_GROUP_WORDMARK}" alt="Virexen Group" width="106" style="display:block;width:106px;max-width:106px;height:auto;border:0"></td></tr></table></td></tr>
</table></td></tr></table></body></html>`;
}
