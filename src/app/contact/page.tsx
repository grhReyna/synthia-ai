'use client';

import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = messages[lang].contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
    
    const subject = encodeURIComponent(`Contacto Synthia AI - ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:sythntia.ai.inf@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="relative w-full py-40 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-right bg-no-repeat" style={{ backgroundImage: 'url(/assets/banner.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 via-pink-800/30 to-purple-900/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PageHeader pageKey="contact" />
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left - Info Cards */}
            <div className="space-y-6">
              {/* Social Card */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-pink-100 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:shadow-pink-100/50 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                    <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{t.socialLabel}</h3>
                    <p className="text-sm text-gray-500">{t.socialDesc}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href="https://tiktok.com/@synthia.pinknovai" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center gap-2">
                    <span>🎵</span> TikTok
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-pink-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{t.formTitle}</h3>
              <p className="text-sm text-gray-500 mb-6">{t.formDesc}</p>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.nameLabel}</label>
                  <input
                    name="name"
                    type="text"
                    required
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-xl text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.emailFieldLabel}</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-xl text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t.messageLabel}</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder={t.messagePlaceholder}
                    className="w-full px-4 py-3 bg-pink-50/50 border border-pink-200 rounded-xl text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold text-sm hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg shadow-pink-200/50 flex items-center justify-center gap-2"
                >
                  💌 {t.sendBtn}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
