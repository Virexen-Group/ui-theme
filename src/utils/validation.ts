export type DateRule = 'any' | 'past' | 'future' | 'today-or-past' | 'today-or-future';
export type ValidationResult = { valid: boolean; error: string };
export const valid = (): ValidationResult => ({valid:true,error:''});
export const invalid = (error:string): ValidationResult => ({valid:false,error});
export function dateISO(value:string): Date|null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y,m,d] = value.split('-').map(Number);
  const date = new Date(Date.UTC(y,m-1,d));
  return date.getUTCFullYear()===y && date.getUTCMonth()===m-1 && date.getUTCDate()===d ? date : null;
}
export function todayISO(now = new Date()):string {
  return `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
}
export function ageOn(dob:string, asOf=todayISO()):number|null {
  if (!dateISO(dob) || !dateISO(asOf)) return null;
  const [y,m,d]=dob.split('-').map(Number); const [cy,cm,cd]=asOf.split('-').map(Number);
  return cy-y-(cm<m || (cm===m && cd<d)?1:0);
}
export function validateDate(value:string, opts:{rule?:DateRule;min?:string;max?:string;required?:boolean;minAge?:number;maxAge?:number;asOf?:string}={}):ValidationResult {
  if(!value) return opts.required?invalid('This date is required.'):valid();
  if(!dateISO(value)) return invalid('Enter a valid date.');
  const now=opts.asOf??todayISO();
  if(opts.min && value<opts.min) return invalid(`Date must be on or after ${opts.min}.`);
  if(opts.max && value>opts.max) return invalid(`Date must be on or before ${opts.max}.`);
  const rule=opts.rule??'any';
  if ((rule==='past'&&value>=now)||(rule==='today-or-past'&&value>now)) return invalid('Choose a date in the past.');
  if ((rule==='future'&&value<=now)||(rule==='today-or-future'&&value<now)) return invalid('Choose a date in the future.');
  if(opts.minAge!==undefined||opts.maxAge!==undefined){
    if(value>now)return invalid('Date of birth cannot be in the future.');
    const age=ageOn(value,now)!;
    if(opts.minAge!==undefined && age<opts.minAge) return invalid(`Must be at least ${opts.minAge} years old.`);
    if(opts.maxAge!==undefined && age>opts.maxAge) return invalid(`Must be ${opts.maxAge} years old or younger.`);
  }
  return valid();
}
export function validateText(value:string, opts:{required?:boolean;minLength?:number;maxLength?:number;pattern?:string;profanity?:string[];label?:string}={}):ValidationResult {
  const text=value.trim(); const name=opts.label??'This field';
  if(!text)return opts.required?invalid(`${name} is required.`):valid();
  if(opts.minLength!==undefined && text.length<opts.minLength) return invalid(`${name} must have at least ${opts.minLength} characters.`);
  if(opts.maxLength!==undefined && text.length>opts.maxLength) return invalid(`${name} must have at most ${opts.maxLength} characters.`);
  if(opts.pattern){try{if(!new RegExp(opts.pattern).test(text))return invalid(`${name} is not in the expected format.`);}catch{return invalid('Invalid validation pattern.');}}
  for(const term of opts.profanity??[]){const normalized=term.trim();if(!normalized)continue;const escaped=normalized.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');if(new RegExp(`\\b${escaped}\\b`,'i').test(text))return invalid(`${name} contains disallowed language.`);}
  return valid();
}
export function validateEmail(value:string, opts:{required?:boolean;maxLength?:number}={}):ValidationResult {
  const text=value.trim();if(!text)return opts.required?invalid('Email address is required.'):valid();
  if(text.length>(opts.maxLength??254))return invalid('Email address is too long.');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)||text.includes('..'))return invalid('Enter a valid email address.');
  return valid();
}
