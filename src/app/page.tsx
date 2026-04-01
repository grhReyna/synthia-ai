'use client';

import { useState, useEffect } from 'react';
import HeroSection from "@/components/HeroSection";
import Button from "@/components/Button";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { messages } from "@/lib/messages";
import { Prompt } from "@/lib/fetchPrompts";

export default function Home() {
  const { lang } = useLanguage();
  const t = messages[lang].home;
  const f = messages[lang].home.features;
  const [recentPrompts, setRecentPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    fetch('/api/prompts')
      .then(res => res.ok ? res.json() : [])
      .then((prompts: Prompt[]) => {
        // Get last 6 non-pack prompts (reversed = most recent first)
        const recent = prompts.filter(p => !p.pack).reverse().slice(0, 6);
        setRecentPrompts(recent);
      })
      .catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50/50 via-white to-purple-50/30">
      {/* Hero Section */}
      <HeroSection />

      {/* Recent Prompts Section */}
      {recentPrompts.length > 0 && (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-bold mb-4 border border-pink-200">🎨 New</span>
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent">
                {t.recentTitle}
              </span>
            </h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">
              {t.recentDesc}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
            {recentPrompts.map((prompt) => (
              <Link key={prompt.id} href="/prompts" className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:shadow-pink-100/60 transition-all duration-300 hover:-translate-y-1">
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  {prompt.imagen ? (
                    <img
                      src={prompt.imagen}
                      alt={prompt.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
                      <div className="text-4xl">🎨</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                    <span className="px-2 py-0.5 bg-gray-900/60 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-bold rounded-md uppercase tracking-wider">
                      {prompt.universo}
                    </span>
                    <h3 className="text-white font-bold text-xs sm:text-sm mt-1.5 drop-shadow-lg line-clamp-2">{prompt.nombre}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link href="/prompts" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-pink-500 rounded-full font-bold text-sm border border-pink-200 hover:bg-pink-50 hover:border-pink-300 transition-all shadow-sm">
              {t.recentViewAll}
            </Link>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fadeIn">
          <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-bold mb-4 border border-pink-200">{t.methodBadge}</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent">
              {t.methodTitle}
            </span>
          </h2>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            {t.methodDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: f.realism.title,
              description: f.realism.desc,
              icon: (
                <svg className="w-10 h-10 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
              ),
            },
            {
              title: f.universes.title,
              description: f.universes.desc,
              icon: (
                <svg className="w-10 h-10 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.1 3.1.9-1.5-4.5-2.6z" />
                </svg>
              ),
            },
            {
              title: f.bilingual.title,
              description: f.bilingual.desc,
              icon: (
                <svg className="w-10 h-10 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
                </svg>
              ),
            },
            {
              title: f.services.title,
              description: f.services.desc,
              icon: (
                <svg className="w-10 h-10 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                </svg>
              ),
            },
            {
              title: f.custom.title,
              description: f.custom.desc,
              icon: (
                <svg className="w-10 h-10 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              ),
            },
            {
              title: f.automation.title,
              description: f.automation.desc,
              icon: (
                <svg className="w-10 h-10 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                </svg>
              ),
            },
            {
              title: f.community.title,
              description: f.community.desc,
              icon: (
                <svg className="w-10 h-10 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              ),
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-white/80 backdrop-blur-sm border border-pink-100 rounded-2xl hover:border-pink-300 transition-all duration-300 hover:shadow-xl hover:shadow-pink-100/50 hover:-translate-y-1 group animate-fadeIn"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
              <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-pink-100 text-pink-600 rounded-full text-xs font-bold mb-4 border border-pink-200">💬 Reviews</span>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent">
              {t.reviewsTitle}
            </span>
          </h2>
          <p className="text-base text-gray-500 max-w-2xl mx-auto">
            {t.reviewsDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white/80 backdrop-blur-sm border border-pink-100 rounded-2xl p-6 hover:shadow-xl hover:shadow-pink-100/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-xl">
                  {review.avatar}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{review.name}</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-purple-100 border border-pink-200/60 rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-4 left-8 text-2xl opacity-30 animate-float">✨</div>
          <div className="absolute bottom-4 right-8 text-2xl opacity-30 animate-float" style={{ animationDelay: '1s' }}>💖</div>
          <div className="absolute top-8 right-16 text-xl opacity-20 animate-pulse">🌸</div>
          
          <h2 className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {t.ctaTitle}
          </h2>
          <p className="text-base text-gray-500 mb-8 max-w-2xl mx-auto">
            {t.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/prompts">
              <Button variant="primary" size="lg">
                {t.ctaButton1}
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                {t.ctaButton2}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Page CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-pink-900 p-6 sm:p-12 md:p-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 bg-pink-500/20 text-pink-300 rounded-full text-xs font-bold mb-4 border border-pink-500/30">{t.pageBadge}</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                {t.pageTitle1}<br />
                <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">{t.pageTitle2}</span>
              </h2>
              <p className="text-gray-300 text-base max-w-lg">
                {t.pageDesc}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  {t.pageButton1}
                </Button>
              </Link>
              <Link href="/services">
                <button className="px-6 py-3 text-sm font-semibold text-pink-300 hover:text-white border border-pink-500/40 hover:border-pink-400 rounded-full transition-all">
                  {t.pageButton2}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
