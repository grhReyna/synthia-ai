'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

export default function FloatingBunker() {
  const { lang } = useLanguage();
  const t = messages[lang].floating;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group">
      <div className="absolute bottom-full right-0 mb-3 w-56 bg-gray-900 text-white text-sm rounded-2xl p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-2xl">
        <div className="text-xs font-bold text-pink-400 mb-1">{t.title}</div>
        <p className="text-[11px] text-gray-300 leading-relaxed">{t.desc}</p>
        <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-gray-900 rotate-45" />
      </div>
      <a
        href="/bunker"
        className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-105 font-bold text-xs sm:text-sm animate-pulse hover:animate-none"
      >
        <span className="text-base sm:text-lg">🔐</span>
        <span>{t.label}</span>
        <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded-full font-bold leading-none">+18</span>
        <span className="hidden sm:inline text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">{t.soon}</span>
      </a>
    </div>
  );
}
