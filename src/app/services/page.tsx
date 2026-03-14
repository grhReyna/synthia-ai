'use client';

import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';
import Link from 'next/link';

export default function ServicesPage() {
  const { lang } = useLanguage();
  const t = messages[lang].services;

  const serviceList = [
    { ...t.services.custom, icon: '🎨', color: 'from-pink-400 to-rose-500' },
    { ...t.services.brand, icon: '✨', color: 'from-purple-400 to-indigo-500' },
    { ...t.services.batch, icon: '⚡', color: 'from-orange-400 to-pink-500' },
    { ...t.services.consult, icon: '🧠', color: 'from-blue-400 to-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="relative w-full py-40 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-right bg-no-repeat" style={{ backgroundImage: 'url(/assets/banner.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 via-pink-800/30 to-purple-900/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PageHeader pageKey="services" />
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Coming Soon Hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-sm font-bold text-pink-600 border border-pink-200 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
              </span>
              {lang === 'es' ? 'Próximamente' : 'Coming Soon'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {t.comingSoonTitle}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">{t.comingSoonDesc}</p>
          </div>

          {/* Service Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {serviceList.map((service, i) => (
              <div
                key={i}
                className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-100 p-6 hover:shadow-xl hover:shadow-pink-100/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-100/50 to-purple-100/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center text-2xl mb-4 shadow-sm`}>
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-500">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-sm hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg shadow-pink-200/50"
            >
              {t.notifyBtn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
