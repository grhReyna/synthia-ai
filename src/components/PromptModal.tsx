'use client';

import { useState, useEffect } from 'react';
import { Prompt } from '@/lib/fetchPrompts';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

interface PromptModalProps {
  prompt: Prompt;
  isOpen: boolean;
  onClose: () => void;
}

export default function PromptModal({ prompt, isOpen, onClose }: PromptModalProps) {
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();
  const t = messages[lang].promptModal;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.descripcion);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-8">
        <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] md:max-h-[92vh] overflow-hidden border border-gray-100 flex flex-col">
          
          {/* Header bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-gray-50/80 shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="px-2.5 sm:px-3 py-1 bg-pink-100 text-pink-600 text-[10px] sm:text-[11px] font-semibold rounded-full shrink-0">
                {prompt.universo}
              </span>
              <h2 className="text-sm sm:text-lg font-bold text-gray-900 truncate">{prompt.nombre}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body - side by side on desktop, stacked on mobile */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 min-h-0 overflow-y-auto lg:overflow-hidden">
            
            {/* Left - Images */}
            <div className="relative bg-gradient-to-br from-gray-50 to-pink-50/50 lg:overflow-y-auto p-3 sm:p-5 lg:border-r border-gray-100">
              {/* Result image - larger */}
              <div className="mb-3">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.result}</p>
                {prompt.imagen ? (
                  <img
                    src={prompt.imagen}
                    alt={prompt.nombre}
                    className="w-full max-h-[55vh] object-contain rounded-2xl shadow-md border border-gray-100"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] rounded-2xl bg-gray-100 flex items-center justify-center">
                    <div className="text-center text-gray-300">
                      <div className="text-4xl mb-2">🎨</div>
                      <p className="text-xs text-gray-400">{t.noImage}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Reference + Subject row - smaller */}
              <div className="grid grid-cols-2 gap-3 shrink-0">
                {/* Reference image */}
                {prompt.referencia && (
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{t.reference}</p>
                    <div className="relative group rounded-xl border border-gray-200 shadow-sm bg-white p-2">
                      <img
                        src={prompt.referencia}
                        alt="Imagen de referencia"
                        className="max-w-full max-h-24 object-contain mx-auto rounded-lg"
                      />
                      <a
                        href={prompt.referencia}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                        title={t.downloadRef}
                      >
                        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </div>
                  </div>
                )}

                {/* Subject reference indicator */}
                {prompt.sujeto && (
                  <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">{t.subject}</p>
                    <div className="w-full h-28 rounded-xl border-2 border-dashed border-pink-200 bg-pink-50/50 flex flex-col items-center justify-center gap-1.5">
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-[9px] font-semibold text-pink-500 text-center leading-tight px-2">{t.usePhoto}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right - Prompt content */}
            <div className="flex flex-col min-h-0 lg:overflow-hidden">
              {/* Prompt text area */}
              <div className="flex-1 lg:overflow-y-auto p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{t.prompt}</h3>
                  <button
                    onClick={handleCopy}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                      copied
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600'
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {t.copied}
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {t.copy}
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5 font-mono text-sm text-gray-700 leading-relaxed whitespace-pre-wrap select-all">
                  {prompt.descripcion}
                </div>
              </div>

              {/* Bottom bar */}
              <div className="shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between gap-2 sm:gap-4">
                <div className="shrink-0">
                  {prompt.precio ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl sm:text-2xl font-extrabold text-gray-900">${prompt.precio}</span>
                      <span className="text-[10px] sm:text-xs text-gray-400 font-medium">USD</span>
                    </div>
                  ) : (
                    <span className="text-sm font-semibold text-emerald-500">{t.free}</span>
                  )}
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={handleCopy}
                    className={`px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
                      copied
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {copied ? t.copiedPrompt : t.copyPrompt}
                  </button>

                  {prompt.gumroad && (
                    <a
                      href={prompt.gumroad}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all shadow-md shadow-pink-200/40 flex items-center gap-1.5 sm:gap-2"
                    >
                      {t.buy}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
