'use client';

import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

export default function TermsPage() {
  const { lang } = useLanguage();
  const t = messages[lang].terms;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="relative w-full py-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{ backgroundImage: 'url(/assets/banner.png)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 via-pink-800/30 to-purple-900/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PageHeader pageKey="terms" />
        </div>
      </div>

      <div className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-pink-100 p-6 sm:p-10 shadow-sm">
            {t.content.split('\n\n').map((block, i) => {
              if (block.startsWith('**') && block.includes('**')) {
                const title = block.match(/\*\*(.+?)\*\*/)?.[1];
                const rest = block.replace(/\*\*.+?\*\*\n?/, '');
                return (
                  <div key={i} className="mb-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600 leading-relaxed">{rest}</p>
                  </div>
                );
              }
              return <p key={i} className="text-gray-600 leading-relaxed mb-6">{block}</p>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
