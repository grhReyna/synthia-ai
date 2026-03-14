'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

export default function Footer() {
  const currentYear = 2026;
  const { lang } = useLanguage();
  const t = messages[lang].footer;

  return (
    <footer className="border-t border-pink-100 bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-400 rounded-xl flex items-center justify-center font-bold text-white shadow-md shadow-pink-200">
                S
              </div>
              <span className="font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">Synthia AI</span>
            </div>
            <p className="text-sm text-gray-500">{t.tagline}</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-pink-500 mb-4 text-sm uppercase tracking-wider">{t.product}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/prompts" className="text-gray-500 hover:text-pink-500 transition font-medium">{messages[lang].nav.prompts}</Link></li>
              <li><Link href="/shop" className="text-gray-500 hover:text-pink-500 transition font-medium">{messages[lang].nav.shop}</Link></li>
              <li><Link href="/services" className="text-gray-500 hover:text-pink-500 transition font-medium">{messages[lang].nav.services}</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-pink-500 mb-4 text-sm uppercase tracking-wider">{t.community}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://tiktok.com/@synthia.pinknovai" target="_blank" className="text-gray-500 hover:text-pink-500 transition font-medium">TikTok</a></li>
              <li><a href="#" className="text-gray-500 hover:text-pink-500 transition font-medium">{messages[lang].nav.contact}</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-pink-500 mb-4 text-sm uppercase tracking-wider">{t.newsletter}</h3>
            <p className="text-sm text-gray-500 mb-3">{t.newsletterDesc}</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder={t.emailPlaceholder}
                className="flex-1 px-3 py-2 bg-pink-50/50 border border-pink-200 rounded-full text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-semibold hover:from-pink-500 hover:to-pink-600 transition text-sm shadow-md shadow-pink-200">
                💖
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-pink-100 pt-8" suppressHydrationWarning>
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400" suppressHydrationWarning>
            <p>💖 {currentYear} Synthia AI. {t.rights}</p>
            <div className="flex gap-6 mt-4 sm:mt-0" suppressHydrationWarning>
              <Link href="/privacy" className="hover:text-pink-500 transition font-medium">{t.privacy}</Link>
              <Link href="/terms" className="hover:text-pink-500 transition font-medium">{t.terms}</Link>
              <Link href="/cookie" className="hover:text-pink-500 transition font-medium">{t.cookie}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
