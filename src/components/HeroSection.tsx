'use client';

import Link from 'next/link';
import Button from './Button';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

export default function HeroSection() {
  const { lang } = useLanguage();
  const t = messages[lang].hero;

  return (
    <section className="relative w-full bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 pt-8 pb-6 overflow-hidden">
      {/* Background Image - Synthia is the star */}
      <div className="absolute inset-0">
        <img
          src="/assets/banner.png"
          alt="Synthia - AI Influencer"
          className="w-full h-full object-cover object-left md:object-center"
        />
        {/* Light, elegant overlays for pastels */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-pink-100/30 to-purple-100/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-pink-50/80"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start lg:items-center">
          {/* Left: Text Content */}
          <div className="flex flex-col justify-start space-y-4 animate-fadeIn pt-4 lg:pt-0">
            {/* Badge */}
            <div className="inline-block w-fit">
              <span className="px-4 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700 rounded-full text-xs font-bold border border-pink-200 backdrop-blur-md shadow-sm">
                {t.badge}
              </span>
            </div>

            {/* Heading - Bold & Modern */}
            <div className="space-y-0.5">
              <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
                <span className="block bg-gradient-to-r from-pink-500 via-rose-400 to-purple-500 bg-clip-text text-transparent">
                  {t.title1}
                </span>
                <span className="block text-gray-800">
                  {t.title2}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-800 font-bold tracking-wide">
                {t.title3}
              </p>
            </div>

            {/* Subtitle */}
            <p className="text-sm text-gray-700 max-w-md leading-relaxed font-medium">
              {t.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 py-3 w-fit text-sm">
              <div className="text-center px-4 py-2 bg-white/60 rounded-2xl border border-pink-100 shadow-sm">
                <p className="text-xl font-black text-pink-500">5000+</p>
                <p className="text-[10px] text-gray-500 mt-0.5 font-semibold uppercase tracking-wider">{t.stats.followers}</p>
              </div>
              <div className="text-center px-4 py-2 bg-white/60 rounded-2xl border border-pink-100 shadow-sm">
                <p className="text-xl font-black text-pink-500">90K+</p>
                <p className="text-[10px] text-gray-500 mt-0.5 font-semibold uppercase tracking-wider">{t.stats.likes}</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Link href="/shop" className="inline-block">
                <Button variant="primary" size="lg" className="w-full sm:w-auto font-bold text-sm">
                  {t.button1}
                </Button>
              </Link>
              <Link href="/prompts" className="inline-block">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold text-sm">
                  {t.button2}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Side - Logo Decoration */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-52 h-52">
              {/* Animated glow circles */}
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-200/50 to-purple-200/50 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute -inset-2 border border-pink-200/40 rounded-full animate-spin" style={{ animationDuration: '25s' }}></div>
              
              {/* Logo - Circular */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/80 flex items-center justify-center bg-white shadow-2xl shadow-pink-200/40">
                <img
                  src="/assets/logo.png"
                  alt="Synthia Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-pink-200/25 rounded-full filter blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-purple-200/25 rounded-full filter blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-rose-200/20 rounded-full filter blur-2xl animate-float pointer-events-none"></div>
    </section>
  );
}
