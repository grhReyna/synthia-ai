'use client';

import { useState, useEffect } from 'react';
import PageHeader from '@/components/PageHeader';
import { useLanguage } from '@/lib/LanguageContext';
import { messages } from '@/lib/messages';

interface ShopPack {
  name: string;
  universe: string;
  gumroad: string;
  price: number;
  discount: number;
  images: string[];
  count: number;
}

export default function ShopPage() {
  const { lang } = useLanguage();
  const t = messages[lang].shop;
  const tPrompts = messages[lang].prompts;

  // Static featured pack
  const featuredPack: ShopPack = {
    name: 'Gabumon Evolutions',
    universe: 'Digimon',
    gumroad: 'https://synthesia.gumroad.com/l/gabumon_evos',
    price: 0,
    discount: 0,
    images: [],
    count: 0,
  };

  const [packs, setPacks] = useState<ShopPack[]>([featuredPack]);
  const [currentSlide, setCurrentSlide] = useState<Record<string, number>>({});

  // Fetch packs from the sheet via API
  useEffect(() => {
    fetch('/api/prompts')
      .then(res => res.ok ? res.json() : [])
      .then((prompts: { pack?: string; imagenes: string[]; gumroad?: string; precio?: number; descuento?: number; universo: string }[]) => {
        const packPrompts = prompts.filter((p: { pack?: string }) => !!p.pack);
        const groups: Record<string, typeof packPrompts> = {};
        packPrompts.forEach((p: typeof packPrompts[0]) => {
          const key = p.pack!;
          if (!groups[key]) groups[key] = [];
          groups[key].push(p);
        });

        const sheetPacks: ShopPack[] = Object.entries(groups).map(([name, items]) => ({
          name,
          universe: items[0].universo,
          gumroad: items[0].gumroad || '',
          price: items[0].precio || 0,
          discount: items[0].descuento || 0,
          images: items.flatMap((i: typeof items[0]) => i.imagenes),
          count: items.length,
        }));

        setPacks(sheetPacks.length > 0 ? sheetPacks : [featuredPack]);
      })
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSlide = (name: string) => currentSlide[name] || 0;
  const setSlide = (name: string, idx: number) => setCurrentSlide(prev => ({ ...prev, [name]: idx }));

  const previews = [
    { ...t.preview.packs, icon: '📦', emoji: '🎨' },
    { ...t.preview.bundles, icon: '🎁', emoji: '💎' },
    { ...t.preview.resources, icon: '📚', emoji: '🚀' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="relative w-full py-40 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-right bg-no-repeat" style={{ backgroundImage: 'url(/assets/banner.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/50 via-pink-800/30 to-purple-900/20" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <PageHeader pageKey="shop" />
        </div>
      </div>

      {/* Content */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Available Packs */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full text-sm font-bold text-pink-600 border border-pink-200 mb-4">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                {lang === 'es' ? 'Disponible ahora' : 'Available now'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                {lang === 'es' ? 'Packs de Prompts' : 'Prompt Packs'}
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-base">
                {lang === 'es'
                  ? 'Colecciones curadas de prompts épicos para crear arte legendario'
                  : 'Curated collections of epic prompts to create legendary art'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packs.map((pack) => (
                <div
                  key={pack.name}
                  className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-pink-100/60 transition-all duration-300 hover:-translate-y-1 border border-pink-50"
                >
                  {/* Carousel */}
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
                    {pack.images.length > 0 ? (
                      <>
                        {pack.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`${pack.name} - ${idx + 1}`}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                              idx === getSlide(pack.name) ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                        ))}
                        {pack.images.length > 1 && (
                          <>
                            <button
                              onClick={() => setSlide(pack.name, (getSlide(pack.name) - 1 + pack.images.length) % pack.images.length)}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            </button>
                            <button
                              onClick={() => setSlide(pack.name, (getSlide(pack.name) + 1) % pack.images.length)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60 z-10"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                              {pack.images.map((_, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSlide(pack.name, idx)}
                                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                    idx === getSlide(pack.name) ? 'bg-white w-5' : 'bg-white/50 hover:bg-white/80'
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-3">📦</div>
                          <p className="text-sm text-gray-400 font-medium">{pack.name}</p>
                        </div>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow-lg">
                        📦 Pack
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 z-10">
                      <span className="px-2.5 py-1 bg-gray-900/70 backdrop-blur-sm text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
                        {pack.universe}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-black text-lg text-gray-900 mb-1">{pack.name}</h3>
                    {pack.count > 0 && (
                      <p className="text-xs text-gray-400 mb-4">{pack.count} {tPrompts.packIncludes}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        {pack.price ? (
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            {pack.discount ? (
                              <>
                                <span className="text-sm font-semibold text-gray-400 line-through">${pack.price}</span>
                                <span className="text-2xl font-extrabold text-pink-500">${pack.discount}</span>
                              </>
                            ) : (
                              <span className="text-2xl font-extrabold text-gray-900">${pack.price}</span>
                            )}
                            <span className="text-xs text-gray-400 font-medium">USD</span>
                          </div>
                        ) : (
                          <span className="text-sm font-semibold text-emerald-500">
                            {lang === 'es' ? 'Gratis' : 'Free'}
                          </span>
                        )}
                      </div>
                      <a
                        href={pack.gumroad}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full font-bold text-xs text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg shadow-pink-200/50 flex items-center gap-2 shrink-0"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                        </svg>
                        {tPrompts.packBuy}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
            {previews.map((item, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-pink-100 p-6 text-center hover:shadow-xl hover:shadow-pink-100/50 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center text-3xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
