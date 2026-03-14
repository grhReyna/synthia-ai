'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

export default function PromptsHeader({ count }: { count: number }) {
  const { lang } = useLanguage();
  const t = messages[lang].prompts;

  return (
    <>
      <h1 className="text-5xl md:text-6xl font-black mb-4 text-white drop-shadow-lg">
        {t.title}
      </h1>
      <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow-md">
        {t.description(count)}
      </p>
    </>
  );
}
