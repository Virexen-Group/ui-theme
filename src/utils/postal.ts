export const addressRules: Record<string,{postalLabel:string; postalPlaceholder:string; regionLabel?:string; regionRequired:boolean; regex?:RegExp}> = {
 GB:{postalLabel:'Postcode',postalPlaceholder:'SW1A 1AA',regionRequired:false,regex:/^(GIR\s?0AA|(?:[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}))$/i},
 US:{postalLabel:'ZIP code',postalPlaceholder:'10001',regionLabel:'State',regionRequired:true,regex:/^\d{5}(?:-\d{4})?$/},
 CA:{postalLabel:'Postal code',postalPlaceholder:'K1A 0B1',regionLabel:'Province',regionRequired:true,regex:/^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i},
 AU:{postalLabel:'Postcode',postalPlaceholder:'2000',regionLabel:'State / territory',regionRequired:true,regex:/^\d{4}$/},
 IE:{postalLabel:'Eircode',postalPlaceholder:'D02 X285',regionRequired:false,regex:/^[A-Z0-9]{3}\s?[A-Z0-9]{4}$/i},
 DE:{postalLabel:'Postleitzahl',postalPlaceholder:'10115',regionRequired:false,regex:/^\d{5}$/},
};
export function getAddressRules(country:string){return addressRules[country] || {postalLabel:'Postal code',postalPlaceholder:'Postal code',regionLabel:'State / region',regionRequired:false};}
export function validatePostalCode(country:string,value:string){const rule=getAddressRules(country);return !value.trim() ? false : !('regex' in rule) || !rule.regex || rule.regex.test(value.trim());}
