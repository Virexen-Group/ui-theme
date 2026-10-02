import sanitizeHtml from "sanitize-html";

const token = /\{\{\s*([a-zA-Z][a-zA-Z0-9_]*)\s*\}\}|\{([a-zA-Z][a-zA-Z0-9_]*)\}/g;
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
export function templateVariables(template) {
  return [...new Set([template.subject, template.title, template.preheader, template.html, template.text].flatMap(s => [...(s ?? "").matchAll(token)].map(m => m[1] ?? m[2])))].sort();
}
const safeOptions = {
  allowedTags: ["p","br","h1","h2","h3","strong","em","b","i","a","ul","ol","li","div","span","table","tbody","tr","td","blockquote"],
  allowedAttributes: {a:["href","title"], "*": ["style"]},
  allowedSchemes: ["https", "http", "mailto"],
  allowProtocolRelative: false,
  allowedStyles: {"*": {
    color:[/^#[0-9a-f]{3,8}$/i], "background-color":[/^#[0-9a-f]{3,8}$/i],
    "font-size":[/^\d{1,2}px$/], "font-weight":[/^(normal|bold|[1-9]00)$/],
    padding:[/^[0-9px ]{1,24}$/], margin:[/^[0-9px ]{1,24}$/],
    "border-radius":[/^\d{1,2}px$/], "text-align":[/^(left|center|right)$/],
    display:[/^(block|inline-block)$/], "text-decoration":[/^(none|underline)$/],
  }},
};
export function sanitizeEmailHtml(html) { return sanitizeHtml(html, safeOptions); }
export function renderEmail(template, variables, options = {}) {
  const required = templateVariables(template);
  for (const name of required) {
    if (!Object.hasOwn(variables, name) || typeof variables[name] !== "string") throw new Error(`Missing email variable: ${name}`);
  }
  for (const name of template.urlVariables ?? []) {
    if (!required.includes(name)) throw new Error(`Unused URL variable: ${name}`);
    const url = new URL(variables[name]);
    if (!["https:", "http:"].includes(url.protocol) || url.username || url.password) throw new Error(`Invalid email URL: ${name}`);
  }
  const inject = (s, html = false) => (s ?? "").replace(token, (_, a, b) => html ? escapeHtml(variables[a ?? b]) : variables[a ?? b]);
  const subject = inject(template.subject);
  if (/[\r\n]/.test(subject)) throw new Error("Email subjects cannot contain newlines");
  const body = sanitizeEmailHtml(inject(template.html, true));
  const title = escapeHtml(inject(template.title ?? template.subject));
  const preheader = escapeHtml(inject(template.preheader ?? ""));
  const recipient = escapeHtml(options.to ?? variables.to ?? "");
  const year = new Date().getUTCFullYear();
  const logo = "https://edge.virexen.com/corporate/branding/Virexen/logo/icon/png/512/Modern%20Virexen%20Icon%20512x512-01.png";
  return {subject, text: inject(template.text), html: `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
<body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
<div style="display:none;max-height:0;overflow:hidden;">${preheader}</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:32px 16px;"><tr><td align="center">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #00bfb3;border-radius:24px;overflow:hidden;">
<tr><td align="center" style="padding:28px 24px;border-bottom:1px solid #e2e8f0;"><img src="${logo}" width="40" height="40" alt="Virexen" style="vertical-align:middle;"> <strong style="font-size:20px;">Virexen</strong><p style="margin:14px 0 0;font-size:13px;letter-spacing:2px;color:#64748b;">${title}</p></td></tr>
<tr><td style="padding:28px;font-size:16px;line-height:1.65;">${body}</td></tr>
<tr><td style="padding:24px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:13px;line-height:1.6;color:#64748b;"><p>This email was sent to ${recipient}.</p><p>Keep account codes and security links private. Share a support approval code only with the support agent you are speaking to.</p><p>© ${year} Virexen. All rights reserved.</p></td></tr></table>
<p style="font-size:13px;color:#94a3b8;">Powered by <strong>Virexen</strong></p></td></tr></table></body></html>`};
}
