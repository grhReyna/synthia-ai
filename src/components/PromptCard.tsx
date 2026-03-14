'use client';

import { useState } from 'react';
import { Prompt } from '@/lib/fetchPrompts';
import PromptModal from './PromptModal';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

interface PromptCardProps {
  prompt: Prompt;
  likeCount: number;
  isLiked: boolean;
  onToggleLike: (id: string) => void;
}

export default function PromptCard({ prompt, likeCount, isLiked, onToggleLike }: PromptCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { lang } = useLanguage();
  const t = messages[lang].promptCard;

  return (
    <>
      <div className="group relative bg-white rounded-2xl overflow-hidden break-inside-avoid mb-4 shadow-sm hover:shadow-xl hover:shadow-pink-100/60 transition-all duration-300">
        {/* Image */}
        <div className="relative w-full overflow-hidden cursor-pointer" onClick={() => setIsModalOpen(true)}>
          {prompt.imagen ? (
            <img
              src={prompt.imagen}
              alt={prompt.nombre}
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full aspect-square flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <p className="text-xs text-gray-400 font-medium">{t.noImage}</p>
              </div>
            </div>
          )}

          {/* Hover Overlay (desktop) + Always visible bottom bar (mobile) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3 pointer-events-none md:pointer-events-auto [&>*]:pointer-events-auto">
            {/* Top Row: Zoom + Like */}
            <div className="flex items-start justify-between">
              <button
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors opacity-0 md:opacity-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onToggleLike(prompt.id); }}
                className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
                  isLiked
                    ? 'bg-pink-500 text-white scale-110'
                    : 'bg-black/50 text-white hover:bg-pink-500/80'
                }`}
              >
                <svg className="w-4 h-4" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Bottom Row: Stats + Universe Badge */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 text-white/90 text-xs font-medium">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    {likeCount}
                  </span>
                </div>
                <span className="px-2.5 py-1 bg-gray-900/70 backdrop-blur-sm text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                  {prompt.universo}
                </span>
              </div>
              {/* View Prompt Button */}
              <button
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
                className="w-full py-2.5 bg-white/95 hover:bg-white text-gray-900 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {t.viewPrompt}
              </button>
            </div>
          </div>
        </div>
      </div>

      <PromptModal prompt={prompt} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
