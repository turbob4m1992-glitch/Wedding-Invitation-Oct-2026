import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'ar' | 'en';

export interface Strings {
  dir: 'rtl' | 'ltr';
  docTitle: string;

  envelopeKicker: string;
  openInvitation: string;

  bismillah: string;
  groomFirst: string;
  brideFirst: string;
  namesLabel: string;
  heroIntro: string;
  scrollCue: string;

  verse: string;
  verseRef: string;

  brideFamilyLabel: string;
  groomFamilyLabel: string;
  brideFamilyLine1: string;
  brideFamilyLine2: string;
  groomFamilyLine1: string;
  groomFamilyLine2: string;

  countdownTitle: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;

  /** The date, whole and in the parts the date blocks set separately. */
  dateLine: string;
  weekday: string;
  day: string;
  month: string;
  monthYear: string;
  timeLine: string;

  locationTitle: string;
  venue: string;
  city: string;
  mapButton: string;

  notesTitle: string;
  adultsTitle: string;
  adultsLine: string;
  honourLine: string;

  saveTheDateTitle: string;
  googleCalendar: string;
  appleCalendar: string;

  playMusic: string;
  pauseMusic: string;
  switchLabel: string;
}

const ar: Strings = {
  dir: 'rtl',
  docTitle: 'دعوة زفاف | يوسف و مَلَك',

  envelopeKicker: 'دعوة زفاف',
  openInvitation: 'افتح الدعوة',

  bismillah: 'بسم الله الرحمن الرحيم',
  groomFirst: 'يوسف',
  brideFirst: 'مَلَك',
  namesLabel: 'يوسف و مَلَك',
  heroIntro: 'يتشرفون بدعوتكم لحضور حفل زفاف أبنائهم ومشاركتهم فرحتهم',
  scrollCue: 'مرّر للأسفل',

  verse:
    'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  verseRef: 'سورة الروم ٢١',

  brideFamilyLabel: 'عائلة العروس',
  groomFamilyLabel: 'عائلة العريس',
  brideFamilyLine1: 'السيد علّام نجار',
  brideFamilyLine2: 'وحرمه',
  groomFamilyLine1: 'السيد زيدون بلعاوي',
  groomFamilyLine2: 'وحرمه',

  countdownTitle: 'يبدأ الاحتفال بعد',
  days: 'أيام',
  hours: 'ساعات',
  minutes: 'دقائق',
  seconds: 'ثواني',

  dateLine: 'الجمعة ٩ أكتوبر ٢٠٢٦',
  weekday: 'الجمعة',
  day: '٩',
  month: 'أكتوبر',
  monthYear: 'أكتوبر ٢٠٢٦',
  timeLine: 'السابعة مساءً',

  locationTitle: 'الموقع والزمان',
  venue: 'SKY HALL',
  city: 'إربد، الأردن',
  mapButton: 'عرض على خرائط جوجل',

  notesTitle: 'ملاحظة مهمة',
  adultsTitle: 'نعتذر عن اصطحاب الأطفال',
  adultsLine: 'نثق بتفهّمكم الكريم، لتبقى الأمسية هادئة ومريحة للجميع.',
  honourLine: 'حضوركم شرفٌ لنا، وبه تكتمل فرحتنا.',

  saveTheDateTitle: 'احفظ الموعد',
  googleCalendar: 'تقويم جوجل',
  appleCalendar: 'تقويم آبل',

  playMusic: 'تشغيل الموسيقى',
  pauseMusic: 'إيقاف الموسيقى',
  switchLabel: 'تغيير اللغة',
};

const en: Strings = {
  dir: 'ltr',
  docTitle: 'Yousef & Malak | Wedding Invitation',

  envelopeKicker: 'Wedding Invitation',
  openInvitation: 'Open Invitation',

  bismillah: 'In the name of God, the Most Gracious, the Most Merciful',
  groomFirst: 'Yousef',
  brideFirst: 'Malak',
  namesLabel: 'Yousef & Malak',
  heroIntro: 'request the honour of your presence at the wedding of their children',
  scrollCue: 'Scroll down',

  verse:
    'And among His signs is that He created for you mates from among yourselves, that you may find tranquillity in them, and He placed between you affection and mercy.',
  verseRef: 'Surah Ar-Rum 30:21',

  brideFamilyLabel: "Bride's Family",
  groomFamilyLabel: "Groom's Family",
  brideFamilyLine1: 'Mr. & Mrs.',
  brideFamilyLine2: 'Allam Najjar',
  groomFamilyLine1: 'Mr. & Mrs.',
  groomFamilyLine2: 'Zaidoun Balawi',

  countdownTitle: 'The celebration begins in',
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',

  dateLine: 'Friday, 9 October 2026',
  weekday: 'Friday',
  day: '9',
  month: 'October',
  monthYear: 'Oct 2026',
  timeLine: "Seven o'clock in the evening",

  locationTitle: 'Time & Place',
  venue: 'SKY HALL',
  city: 'Irbid, Jordan',
  mapButton: 'View on Google Maps',

  notesTitle: 'An Important Note',
  adultsTitle: 'Kindly, no children',
  adultsLine: 'We trust in your kind understanding, so the evening stays calm and comfortable for everyone.',
  honourLine: 'Your presence honours us and completes our joy.',

  saveTheDateTitle: 'Save the Date',
  googleCalendar: 'Google Calendar',
  appleCalendar: 'Apple Calendar',

  playMusic: 'Play music',
  pauseMusic: 'Pause music',
  switchLabel: 'Change language',
};

const dictionaries: Record<Lang, Strings> = { ar, en };

interface I18nValue {
  lang: Lang;
  t: Strings;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nValue>({ lang: 'ar', t: ar, setLang: () => {} });

export const useI18n = () => useContext(I18nContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('ar');
  const t = dictionaries[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = t.dir;
    document.title = t.docTitle;
  }, [lang, t]);

  const value = useMemo(() => ({ lang, t, setLang }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
