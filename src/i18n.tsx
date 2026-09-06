import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'ar' | 'en';

export interface Strings {
  dir: 'rtl' | 'ltr';
  docTitle: string;

  envelopeKicker: string;
  openInvitation: string;
  sealLeft: string;
  sealRight: string;

  bismillah: string;
  groomFirst: string;
  brideFirst: string;
  heroIntro: string;
  scrollCue: string;

  verse: string;
  verseRef: string;

  detailsTitle: string;
  blessingLine1: string;
  blessingLine2: string;
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

  scheduleTitle: string;
  events: { time: string; title: string }[];

  locationTitle: string;
  dateLine: string;
  timeLine: string;
  venue: string;
  city: string;
  mapButton: string;

  notesTitle: string;
  adultsTitle: string;
  adultsLine1: string;
  adultsLine2: string;

  saveTheDateTitle: string;
  month: string;
  day: string;
  weekday: string;
  googleCalendar: string;
  appleCalendar: string;

  playMusic: string;
  pauseMusic: string;
  switchLabel: string;
}

const ar: Strings = {
  dir: 'rtl',
  docTitle: 'يوسف و مَلَك | دعوة زفاف',

  envelopeKicker: 'دعوة زفاف',
  openInvitation: 'افتح الدعوة',
  sealLeft: 'م',
  sealRight: 'ي',

  bismillah: 'بسم الله الرحمن الرحيم',
  groomFirst: 'يوسف',
  brideFirst: 'مَلَك',
  heroIntro: 'نتشرف بدعوتكم لحضور حفل زفافنا ومشاركتنا فرحتنا',
  scrollCue: 'مرّر للأسفل',

  verse:
    'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  verseRef: 'سورة الروم ٢١',

  detailsTitle: 'دعوة زفاف',
  blessingLine1: 'بكل الحب والود،',
  blessingLine2: 'عائلتا العروسين تتشرفان بدعوتكم لحضور حفل زفاف أبنائهما',
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

  scheduleTitle: 'برنامج الحفل',
  events: [
    { time: '7:00 م', title: 'استقبال الضيوف' },
    { time: '7:30 م', title: 'زفة العروسين' },
    { time: '8:00 م', title: 'الاحتفال' },
  ],

  locationTitle: 'الموقع والزمان',
  dateLine: 'الجمعة، 9 أكتوبر 2026',
  timeLine: 'السابعة مساءً',
  venue: 'Sky Hall',
  city: 'إربد، الأردن',
  mapButton: 'عرض على خرائط جوجل',

  notesTitle: 'ملاحظة مهمة',
  adultsTitle: 'نعتذر عن اصطحاب الأطفال',
  adultsLine1: 'الدعوة مخصّصة للمدعوّين بأسمائهم الكرام.',
  adultsLine2: 'نثق بتفهّمكم الكريم، لتبقى الأمسية هادئة ومريحة للجميع.',

  saveTheDateTitle: 'احفظ الموعد',
  month: 'أكتوبر',
  day: '9',
  weekday: 'الجمعة',
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
  sealLeft: 'Y',
  sealRight: 'M',

  bismillah: 'In the name of God, the Most Gracious, the Most Merciful',
  groomFirst: 'Yousef',
  brideFirst: 'Malak',
  heroIntro: 'We would be honoured by your presence as we celebrate our wedding day',
  scrollCue: 'Scroll down',

  verse:
    'And among His signs is that He created for you mates from among yourselves, that you may find tranquillity in them, and He placed between you affection and mercy.',
  verseRef: 'Surah Ar-Rum 30:21',

  detailsTitle: 'Wedding Invitation',
  blessingLine1: 'With all our love,',
  blessingLine2: 'the families of the bride and groom request the honour of your presence at the wedding of their children',
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

  scheduleTitle: 'Order of the Evening',
  events: [
    { time: '7:00 PM', title: 'Guest Reception' },
    { time: '7:30 PM', title: 'Bridal Procession' },
    { time: '8:00 PM', title: 'The Celebration' },
  ],

  locationTitle: 'Time & Place',
  dateLine: 'Friday, 9 October 2026',
  timeLine: 'Seven in the evening',
  venue: 'Sky Hall',
  city: 'Irbid, Jordan',
  mapButton: 'View on Google Maps',

  notesTitle: 'An Important Note',
  adultsTitle: 'Kindly, no children',
  adultsLine1: 'This invitation is extended only to those named on it.',
  adultsLine2: 'We trust in your kind understanding, so the evening stays calm and comfortable for everyone.',

  saveTheDateTitle: 'Save the Date',
  month: 'October',
  day: '9',
  weekday: 'Friday',
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
