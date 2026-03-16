'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

type PageKey = 'bunker' | 'contact' | 'services' | 'shop' | 'tools' | 'privacy' | 'terms' | 'cookie';

export default function PageHeader({ pageKey }: { pageKey: PageKey }) {
  const { lang } = useLanguage();
  const t = messages[lang][pageKey];

  return (
    <>
      <h1 className="text-5xl md:text-6xl font-black mb-4 text-white drop-shadow-lg">{t.title}</h1>
      <p className="text-lg text-white/90 drop-shadow-md">{t.subtitle}</p>
    </>
  );
}
