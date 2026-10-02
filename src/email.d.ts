export interface EmailTemplate { subject: string; title?: string; preheader?: string; html: string; text: string; urlVariables?: string[] }
export function escapeHtml(value: string): string;
export function templateVariables(template: EmailTemplate): string[];
export function sanitizeEmailHtml(html: string): string;
export function renderEmail(template: EmailTemplate, variables: Record<string, string>, options?: {to?: string}): {subject: string; text: string; html: string};
