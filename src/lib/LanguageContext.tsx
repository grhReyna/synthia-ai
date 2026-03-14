'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Lang = 'es' | 'en';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'es', toggleLang: () => {} });

export function useLanguage() {
  return useContext(LanguageContext);
}

const LATAM_LOCALES = [
  'es-MX', 'es-AR', 'es-CO', 'es-CL', 'es-PE', 'es-VE', 'es-EC', 'es-GT',
  'es-CU', 'es-BO', 'es-DO', 'es-HN', 'es-PY', 'es-SV', 'es-NI', 'es-CR',
  'es-PA', 'es-UY', 'es-PR', 'es-ES', 'es',
];

function detectDefaultLang(): Lang {
  if (typeof navigator === 'undefined') return 'es';
  const browserLang = navigator.language || (navigator as any).userLanguage || '';
  if (LATAM_LOCALES.some(l => browserLang.toLowerCase().startsWith(l.toLowerCase()))) {
    return 'es';
  }
  if (browserLang.toLowerCase().startsWith('es')) return 'es';
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('synthia-lang') as Lang | null;
    if (saved === 'es' || saved === 'en') {
      setLang(saved);
    } else {
      setLang(detectDefaultLang());
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('synthia-lang', lang);
      document.documentElement.lang = lang;
    }
  }, [lang, mounted]);

  const toggleLang = () => setLang(prev => (prev === 'es' ? 'en' : 'es'));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}
