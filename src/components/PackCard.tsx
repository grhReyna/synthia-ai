'use client';

import { useState, useEffect, useCallback } from 'react';
import { Prompt } from '@/lib/fetchPrompts';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

interface PackCardProps {
  pack: Prompt[];
}

export default function PackCard({ pack }: PackCardProps) {
  const { lang } = useLanguage();
  const t = messages[lang].prompts;
  const tCard = messages[lang].promptCard;

  // Use the first prompt of the pack as representative
  const representative = pack[0];
  const packName = representative.pack || representative.universo;
  const allImages = pack.flatMap((p) => p.imagenes);
  const gumroadLink = representative.gumroad;
  const price = representative.precio;
  const discount = representative.descuento;

  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Auto-advance carousel
  useEffect(() => {
    if (allImages.length <= 1 || isHovering) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [allImages.length, isHovering, next]);

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-pink-100/60 transition-all duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Carousel */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        {allImages.length > 0 ? (
          <>
            {allImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${packName} - ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  idx === current ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}

            {/* Nav arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {allImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === current
                          ? 'bg-white w-5'
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
            <div className="text-center">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-xs text-gray-400 font-medium">{tCard.noImage}</p>
            </div>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

        {/* Pack badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow-lg">
            📦 Pack
          </span>
        </div>

        {/* Universe badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 bg-gray-900/70 backdrop-blur-sm text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
            {representative.universo}
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h3 className="text-white font-black text-lg mb-1 drop-shadow-lg">{packName}</h3>
          <p className="text-white/80 text-xs mb-3">{pack.length} {t.packIncludes}</p>
          
          <div className="flex items-center justify-between">
            <div>
              {price ? (
                <div className="flex items-baseline gap-2">
                  {discount ? (
                    <>
                      <span className="text-sm font-semibold text-white/50 line-through">${price}</span>
                      <span className="text-xl font-extrabold text-white drop-shadow-lg">${discount}</span>
                    </>
                  ) : (
                    <span className="text-xl font-extrabold text-white drop-shadow-lg">${price}</span>
                  )}
                  <span className="text-[10px] text-white/70 font-medium">USD</span>
                </div>
              ) : (
                <span className="text-sm font-semibold text-emerald-400">{tCard.free}</span>
              )}
            </div>

            {gumroadLink && (
              <a
                href={gumroadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full font-bold text-xs text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg shadow-pink-500/30 flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {t.packBuy}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
