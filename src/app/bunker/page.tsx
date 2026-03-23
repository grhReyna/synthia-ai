'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';
import Link from 'next/link';

export default function BunkerPage() {
  const { lang } = useLanguage();
  const t = messages[lang].bunker;
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const verified = sessionStorage.getItem('synthia-age-verified');
    if (verified === 'true') setAgeVerified(true);
  }, []);

  const handleYes = () => {
    sessionStorage.setItem('synthia-age-verified', 'true');
    setAgeVerified(true);
  };

  const handleNo = () => {
    setBlocked(true);
  };

  // Age Gate - Blocked
  if (blocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-pink-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🚫</div>
          <p className="text-white/80 text-lg mb-8">{t.ageBlocked}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all border border-white/20"
          >
            ← {t.ageBack}
          </Link>
        </div>
      </div>
    );
  }

  // Age Gate - Question
  if (ageVerified !== true) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-pink-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gray-800/80 backdrop-blur-xl rounded-3xl border border-pink-500/20 p-8 sm:p-10 text-center shadow-2xl shadow-pink-500/10">
            <div className="text-5xl mb-6">🔒</div>
            <h2 className="text-2xl font-black text-white mb-3">{t.ageTitle}</h2>
            <p className="text-gray-400 mb-2 text-sm">{t.ageDesc}</p>
            <p className="text-white font-bold text-lg mb-8">{t.ageQuestion}</p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleYes}
                className="flex-1 py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-bold text-sm hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-pink-500/30"
              >
                ✅ {t.ageYes}
              </button>
              <button
                onClick={handleNo}
                className="flex-1 py-3.5 bg-white/5 hover:bg-white/10 text-white/70 rounded-xl font-bold text-sm transition-all border border-white/10"
              >
                {t.ageNo}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Bunker Content
  const featureList = [
    { ...t.features.exclusive, icon: '💋' },
    { ...t.features.bts, icon: '👘' },
    { ...t.features.early, icon: '📅' },
    { ...t.features.community, icon: '✨' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-pink-900">
      {/* Header */}
      <div className="relative w-full py-40 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-30" style={{ backgroundImage: 'url(/assets/banner.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PageHeader pageKey="bunker" />
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Exclusive Content Card */}
          <div className="relative bg-gradient-to-br from-gray-800/80 to-pink-900/30 backdrop-blur-sm rounded-3xl border border-pink-500/20 p-8 sm:p-12 text-center mb-12 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-4xl mx-auto mb-6 shadow-2xl shadow-pink-500/30 ring-4 ring-pink-500/20">
                🔐
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">{t.exclusiveTitle}</h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8 text-base">{t.exclusiveDesc}</p>
              
              {/* Fanvue Button (Coming Soon) */}
              <div className="space-y-4">
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold text-base opacity-60 cursor-not-allowed shadow-lg"
                >
                  {t.fanvueBtn}
                </button>
                <p className="text-sm text-pink-300/60">{t.fanvueSoon}</p>
              </div>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featureList.map((feature, i) => (
              <div
                key={i}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6 hover:border-pink-500/30 hover:bg-gray-800/70 transition-all duration-300 group"
              >
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
