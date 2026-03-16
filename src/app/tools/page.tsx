'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

interface Tool {
  name: string;
  description: { es: string; en: string };
  icon: string;
  color: string;
  url: string;
  code?: string;
  tag?: string;
}

const tools: Tool[] = [
  {
    name: 'Kling AI',
    description: {
      es: 'Generación de vídeo e imagen con IA. Una de las herramientas más potentes para crear contenido visual épico.',
      en: 'AI video and image generation. One of the most powerful tools for creating epic visual content.',
    },
    icon: '🎬',
    color: 'from-purple-500 to-indigo-600',
    url: 'https://app.klingai.com/global/membership/membership-plan?r=26',
    code: '7BW9YRAGZYCL',
    tag: '⭐ Favorita',
  },
];

export default function ToolsPage() {
  const { lang } = useLanguage();
  const t = messages[lang].tools;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="relative w-full py-40 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-right bg-no-repeat" style={{ backgroundImage: 'url(/assets/banner.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 via-pink-800/30 to-purple-900/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PageHeader pageKey="tools" />
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              {t.heroTitle}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">{t.heroDesc}</p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            {tools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} lang={lang} t={t} />
            ))}
          </div>

          {/* Affiliate Note */}
          <div className="text-center">
            <p className="text-xs text-gray-400 max-w-lg mx-auto">{t.affiliateNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolCard({ tool, lang, t }: { tool: Tool; lang: 'es' | 'en'; t: { visitBtn: string; codeLabel: string; codeCopied: string } }) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (!tool.code) return;
    navigator.clipboard.writeText(tool.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-100 p-6 hover:shadow-xl hover:shadow-pink-100/50 hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-100/50 to-purple-100/50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
      <div className="relative">
        {/* Tag */}
        {tool.tag && (
          <span className="inline-block px-3 py-1 text-xs font-bold bg-gradient-to-r from-pink-100 to-purple-100 text-pink-600 rounded-full mb-4 border border-pink-200">
            {tool.tag}
          </span>
        )}

        {/* Icon + Name */}
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-2xl shadow-sm`}>
            {tool.icon}
          </div>
          <h3 className="font-bold text-gray-800 text-xl">{tool.name}</h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 mb-5">{tool.description[lang]}</p>

        {/* Discount Code */}
        {tool.code && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-400 mb-1.5">{t.codeLabel}:</p>
            <button
              onClick={copyCode}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-xl hover:border-pink-300 transition-all group/code w-full"
            >
              <span className="font-mono font-bold text-pink-600 tracking-wider text-sm">{tool.code}</span>
              <span className="ml-auto text-xs text-gray-400 group-hover/code:text-pink-500 transition-colors">
                {copied ? `✅ ${t.codeCopied}` : '📋'}
              </span>
            </button>
          </div>
        )}

        {/* Visit Button */}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold text-sm hover:from-pink-600 hover:to-purple-600 transition-all shadow-md shadow-pink-200/50 w-full justify-center"
        >
          {t.visitBtn} →
        </a>
      </div>
    </div>
  );
}
