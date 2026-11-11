export { en } from './en';
export type { TranslationDict, TranslationKeys } from './en';
export { am } from './am';
export { om } from './om';

import { en } from './en';
import { am } from './am';
import { om } from './om';
import type { Language } from '../types';
import type { TranslationDict } from './en';

export const translations: Record<Language, TranslationDict> = {
  en,
  am,
  om,
};
