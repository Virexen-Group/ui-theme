export interface EmailBrand {id:string;name:string;primary:string;soft:string;logo:string;privacyUrl:string;dividerColor?:string;secondaryLogo?:string;supportUrl?:string}
export declare const emailBrands:readonly EmailBrand[];
export declare const VIREXEN_GROUP_WORDMARK:string;
export declare const CAMPPULZE_HEADER_LOGO:string;
export declare const CAMPPULZE_HEADER_LOGO_PNG:string;
export declare function resolveEmailBrand(brand?:string,overrides?:Partial<EmailBrand>):EmailBrand;
export interface BrandedEmailOptions {brand?:string;brandConfig?:Partial<EmailBrand>;subject?:string;preheader?:string;bodyHtml?:string;to?:string;reason?:string;year?:number;privacyUrl?:string;secondaryBranding?:boolean;legalLinks?:{text:string;url:string}[];footerBranding?:string}
export declare function renderBrandedEmail(options?:BrandedEmailOptions):string;
export declare function renderBrandedEmailText(options?:BrandedEmailOptions):string;
