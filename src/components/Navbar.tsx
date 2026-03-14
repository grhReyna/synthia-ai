'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const t = messages[lang].nav;

  const navLinks = [
    { href: '/', label: t.home },
    { href: '/prompts', label: t.prompts },
    { href: '/shop', label: t.shop },
    { href: '/services', label: t.services },
    { href: '/contact', label: t.contact },
    { href: '/bunker', label: t.bunker },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-pink-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Synthia Brand */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-85 transition-all group">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-pink-300 group-hover:border-pink-400 transition-colors shadow-sm ring-2 ring-pink-100">
              <img
                src="/assets/logo.png"
                alt="Synthia"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Synthia
              </div>
              <div className="text-[10px] text-pink-400 font-semibold tracking-wider uppercase">{t.subtitle}</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.filter(l => l.href !== '/bunker').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/bunker"
              className="ml-1 px-4 py-2 text-sm font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-md shadow-pink-200/50 flex items-center gap-1.5"
            >
              <span className="text-xs">🔒</span>
              {t.bunker}
              <span className="text-[10px] bg-white/25 px-1.5 py-0.5 rounded-full font-bold leading-none">+18</span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="hidden sm:block px-4 py-1.5 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-bold hover:from-pink-500 hover:to-pink-600 transition-all text-xs shadow-md shadow-pink-200"
            >
              {lang === 'es' ? 'EN' : 'ES'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-pink-100 animate-fadeIn bg-white/95">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2.5 text-sm font-semibold text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-xl transition-all mx-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { toggleLang(); setMobileMenuOpen(false); }}
              className="block mx-2 px-4 py-2.5 text-sm font-semibold text-pink-600 hover:bg-pink-50 rounded-xl transition-all"
            >
              {lang === 'es' ? '🌐 Switch to English' : '🌐 Cambiar a Español'}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
