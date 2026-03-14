'use client';

import { useState, useMemo } from 'react';
import { Prompt } from '@/lib/fetchPrompts';
import PromptCard from './PromptCard';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';
import { useLikes } from '@/lib/useLikes';

interface PromptGalleryProps {
  prompts: Prompt[];
}

export default function PromptGallery({ prompts }: PromptGalleryProps) {
  const [selectedUniverso, setSelectedUniverso] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'recent'>('popular');
  const { lang } = useLanguage();
  const t = messages[lang].prompts;
  const { toggleLike, getLikeCount, isLiked, likes } = useLikes();

  // Obtener universos únicos
  const universos = useMemo(() => {
    const unique = Array.from(new Set(prompts.map(p => p.universo))).filter(Boolean);
    return unique.sort();
  }, [prompts]);

  // Filtrar y ordenar prompts
  const filteredPrompts = useMemo(() => {
    let filtered = selectedUniverso
      ? prompts.filter(p => p.universo === selectedUniverso)
      : [...prompts];

    if (sortBy === 'recent') {
      // Reverse: last added in the sheet shows first
      filtered.reverse();
    } else {
      // Popular: sort by likes desc, items with same likes keep reverse (newest first)
      filtered.reverse();
      filtered.sort((a, b) => (likes[b.id] || 0) - (likes[a.id] || 0));
    }

    return filtered;
  }, [prompts, selectedUniverso, sortBy, likes]);

  return (
    <div className="w-full">
      {/* Filters & Sort */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedUniverso(null)}
            className={`px-5 py-2 rounded-full font-bold transition-all text-sm ${
              selectedUniverso === null
                ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg shadow-pink-200/50'
                : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-500 border border-pink-100'
            }`}
          >
            {t.all} ({prompts.length})
          </button>

          {universos.map((universo) => {
            const count = prompts.filter(p => p.universo === universo).length;
            return (
              <button
                key={universo}
                onClick={() => setSelectedUniverso(universo)}
                className={`px-5 py-2 rounded-full font-bold transition-all text-sm ${
                  selectedUniverso === universo
                    ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg shadow-pink-200/50'
                    : 'bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-500 border border-pink-100'
                }`}
              >
                {universo} ({count})
              </button>
            );
          })}
        </div>

        {/* Sort Toggle */}
        <div className="flex items-center gap-1 bg-white border border-pink-100 rounded-full p-1 self-start sm:self-auto">
          <button
            onClick={() => setSortBy('popular')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              sortBy === 'popular'
                ? 'bg-pink-500 text-white shadow-sm'
                : 'text-gray-500 hover:text-pink-500'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            {t.sortPopular}
          </button>
          <button
            onClick={() => setSortBy('recent')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              sortBy === 'recent'
                ? 'bg-pink-500 text-white shadow-sm'
                : 'text-gray-500 hover:text-pink-500'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {t.sortRecent}
          </button>
        </div>
      </div>

      {/* Gallery */}
      {filteredPrompts.length > 0 ? (
        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-3 xl:columns-4 gap-3 sm:gap-4">
          {filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              likeCount={getLikeCount(prompt.id)}
              isLiked={isLiked(prompt.id)}
              onToggleLike={toggleLike}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">{t.empty}</p>
        </div>
      )}
    </div>
  );
}
