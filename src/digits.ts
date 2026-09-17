import type { Lang } from './i18n';

const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩';

/** Arabic-Indic digits in Arabic, as on the printed card; Western digits in English. */
export const localDigits = (value: number | string, lang: Lang) =>
  lang === 'ar' ? String(value).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)]) : String(value);
