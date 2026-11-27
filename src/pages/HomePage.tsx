import React from 'react';
import { ArrowRight, Compass, HelpCircle, Images, Leaf, MapPin, Sparkles, Wrench } from 'lucide-react';
import { EDUCATIONAL_SECTIONS } from '../data/educationalSections';
import { GALLERY_ITEMS } from '../data/galleryAndRegions';
import { JANUR_IMAGES } from '../data/images';
import { PageId } from '../types/janur';
import { ResilientImage } from '../components/ResilientImage';
import {
  AnyamanCornerAccent,
  CoconutFrondCornerLeft,
  JanurLeafIcon,
  KetupatDiamondIcon,
  KetupatDivider,
} from '../components/BotanicalDecorations';

interface HomePageProps {
  onNavigate: (page: PageId, anchorId?: string, extraId?: string) => void;
}

const FEATURE_TINTS = [
  'bg-[#FAFBF6] border-[#B5D2AF]',
  'bg-[#FDF5DB]/80 border-[#E8D28C]',
  'bg-[#FDF0E4]/85 border-[#EBC3A0]',
  'bg-[#FAEDE8]/85 border-[#E4B7AA]',
  'bg-[#E8F5E9] border-[#B5D2AF]',
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const featuredCrafts = GALLERY_ITEMS.slice(0, 4);
  const educationHighlights = [
    EDUCATIONAL_SECTIONS[0],
    EDUCATIONAL_SECTIONS[1],
    EDUCATIONAL_SECTIONS[4],
    EDUCATIONAL_SECTIONS[7],
    EDUCATIONAL_SECTIONS[12],
  ];

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden border-b border-[#B5D2AF] bg-gradient-to-br from-[#F6F1E3] via-[#E8F5E9]/85 to-[#FDF5DB]/80 botanical-paper-grid">
        <CoconutFrondCornerLeft className="hidden lg:block absolute left-0 bottom-0 w-44 h-36 opacity-75" />
        <AnyamanCornerAccent className="hidden lg:block absolute right-0 top-0 w-72 h-56 opacity-75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div>
                <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B65236] font-semibold mb-4">
                  <JanurLeafIcon className="w-4 h-4" />
                  <span>Indonesian Coconut Leaf Art · Student Project</span>
                </p>
                <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-[#132219] leading-[1.06] tracking-tight">
                  The Art of Janur
                </h1>
                <p className="mt-3 font-serif italic text-xl sm:text-2xl text-[#0F764A]">
                  Where Tradition Meets Creativity.
                </p>
                <p className="mt-6 text-base text-[#3F5749] leading-relaxed max-w-lg">
                  Across Indonesia, young coconut leaves—called <em className="text-[#143D28] not-italic font-semibold">janur</em>—are folded and woven by hand to make party arches, flower trays, and famous diamond rice pouches. No glue or plastic needed!
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#B5D2AF] flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#143D28] rounded-lg hover:bg-[#0D2B1B] transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Explore JanurCraft</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('studio')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#143D28] bg-[#FDF5DB] border border-[#E2B334] rounded-lg hover:bg-[#F7E8B6] transition-colors cursor-pointer min-h-[44px]"
                >
                  <KetupatDiamondIcon className="w-4 h-4" />
                  <span>Try Craft Studio</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="h-full min-h-[320px] sm:min-h-[420px] rounded-xl overflow-hidden border-2 border-[#B5D2AF] bg-[#CFE4CA] shadow-sm">
                <ResilientImage
                  src={JANUR_IMAGES.heroExhibition}
                  alt="Display of Indonesian woven janur crafts including ketupat pouches and folded coconut leaf fans"
                  fallbackTitle="The Art of Janur"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Quick Overview Strip with balanced green/yellow/orange/terracotta accents */}
          <div className="mt-10 pt-6 border-t border-[#B5D2AF] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-[#FAFBF6]/85 border border-[#B5D2AF] rounded-lg p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#E8F5E9] shrink-0">
                <Sparkles className="w-4 h-4 text-[#0F764A]" />
              </div>
              <div>
                <p className="font-mono text-xs font-semibold text-[#0F764A] tabular-nums">13 Topics</p>
                <p className="text-sm font-medium text-[#132219] mt-0.5">
                  Easy Stories &amp; Guides
                </p>
              </div>
            </div>

            <div className="bg-[#FAFBF6]/85 border border-[#E8D28C] rounded-lg p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#FDF5DB] shrink-0">
                <MapPin className="w-4 h-4 text-[#B68310]" />
              </div>
              <div>
                <p className="font-mono text-xs font-semibold text-[#9C6F0A] tabular-nums">7 Regions</p>
                <p className="text-sm font-medium text-[#132219] mt-0.5">
                  Interactive Indonesia Map
                </p>
              </div>
            </div>

            <div className="bg-[#FAFBF6]/90 border border-[#EBC3A0] rounded-lg p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#FDF0E4] shrink-0">
                <Wrench className="w-4 h-4 text-[#DD7930]" />
              </div>
              <div>
                <p className="font-mono text-xs font-semibold text-[#C26019] tabular-nums">9 Crafts</p>
                <p className="text-sm font-medium text-[#132219] mt-0.5">
                  Hands-On 2D Craft Studio
                </p>
              </div>
            </div>

            <div className="bg-[#FAFBF6]/85 border border-[#E4B7AA] rounded-lg p-3.5 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#FAEDE8] shrink-0">
                <Leaf className="w-4 h-4 text-[#B65236]" />
              </div>
              <div>
                <p className="font-mono text-xs font-semibold text-[#B65236] tabular-nums">100% Natural</p>
                <p className="text-sm font-medium text-[#132219] mt-0.5">
                  Zero-Plastic Plant Craft
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Traditional and Modern Janur Crafts */}
      <section className="py-14 sm:py-16 border-b border-[#B5D2AF] bg-[#E8F5E9] anyaman-weave-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#B65236] font-semibold mb-1">
                Featured Crafts
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#132219]">
                Traditional and Modern Janur Crafts
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#143D28] hover:text-[#0F764A] hover:underline cursor-pointer shrink-0"
            >
              <span>See All Photos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCrafts.map((item, idx) => {
              const accentClass =
                idx === 0
                  ? 'text-[#0F764A]'
                  : idx === 1
                  ? 'text-[#B65236]'
                  : idx === 2
                  ? 'text-[#C26019]'
                  : 'text-[#9C6F0A]';
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate('gallery', undefined, item.id)}
                  className="group text-left bg-[#FAFBF6] border border-[#B5D2AF] rounded-xl overflow-hidden hover:border-[#0F764A] transition-colors flex flex-col cursor-pointer"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#CFE4CA]">
                    <ResilientImage
                      src={item.imageUrl}
                      alt={item.title}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <p className={`text-xs font-semibold mb-1 ${accentClass}`}>
                        <span>{item.category}</span>
                        <span aria-hidden="true"> · </span>
                        <span>{item.region.split(',')[0]}</span>
                      </p>
                      <h3 className="font-serif text-xl font-semibold text-[#132219] group-hover:text-[#0F764A] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#3F5749] mt-1.5 line-clamp-2 leading-relaxed">
                        {item.whatItLooksLike}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Preview of Interactive Craft Studio */}
      <section className="py-14 sm:py-16 border-b border-[#B5D2AF] bg-[#EFE8D8] leaf-stripe-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#FAFBF6] via-[#E8F5E9] to-[#FDF5DB]/90 border border-[#B5D2AF] rounded-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#B65236] font-semibold">
                <KetupatDiamondIcon className="w-4 h-4" />
                <span>Interactive Craft Studio · All 9 Gallery Crafts</span>
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#132219]">
                Make All 9 Janur Crafts Step by Step
              </h2>
              <p className="text-sm sm:text-base text-[#132219]/85 leading-relaxed max-w-2xl">
                Try crafting at our interactive table! Choose from 9 Indonesian crafts—including diamond Ketupat, Canang Sari, Penjor, Kembar Mayang, woven lamps, and leaf grasshoppers—in Learn Mode or Free Practice Mode.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#132219]">
                <div className="bg-[#FAFBF6] border border-[#B5D2AF] rounded-lg px-3 py-2.5">
                  <span className="font-mono font-semibold text-[#0F764A] block">Easy Crafts</span>
                  <span className="font-medium">Canang Sari &amp; Menyeset</span>
                </div>
                <div className="bg-[#FDF5DB]/90 border border-[#E8D28C] rounded-lg px-3 py-2.5">
                  <span className="font-mono font-semibold text-[#9C6F0A] block">Medium Crafts</span>
                  <span className="font-medium">Ketupat, Lamp &amp; Toys</span>
                </div>
                <div className="bg-[#FDF0E4]/90 border border-[#EBC3A0] rounded-lg px-3 py-2.5 col-span-2 sm:col-span-1">
                  <span className="font-mono font-semibold text-[#B65236] block">Hard Crafts</span>
                  <span className="font-medium">Penjor &amp; Kembar Mayang</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('studio')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#0F764A] rounded-lg hover:bg-[#143D28] transition-colors cursor-pointer"
                >
                  <span>Open Craft Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#B5D2AF] bg-[#E8F5E9]">
                <ResilientImage
                  src={JANUR_IMAGES.handsWeavingKetupat}
                  alt="Artisan hands weaving fresh young coconut leaf strips into a diamond ketupat"
                  fallbackTitle="Ketupat Craft Studio"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <KetupatDivider className="mt-12" />
        </div>
      </section>

      {/* 4. Educational Sections Preview */}
      <section className="py-14 sm:py-16 border-b border-[#B5D2AF] bg-[#E5F0E3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#0F764A] font-semibold mb-1">
                13 Easy Learning Topics
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#132219]">
                Learn About Janur Step by Step
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#143D28] hover:text-[#0F764A] hover:underline cursor-pointer shrink-0"
            >
              <span>Read All 13 Topics</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {educationHighlights.map((sec, idx) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => onNavigate('explore', sec.id)}
                className={`text-left border rounded-xl p-5 hover:border-[#0F764A] transition-colors flex flex-col justify-between cursor-pointer ${
                  FEATURE_TINTS[idx % FEATURE_TINTS.length]
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#3F5749] mb-2">
                    <span className="font-mono font-semibold tabular-nums text-[#0F764A]">
                      Topic {sec.number}
                    </span>
                    <span>{sec.readTime}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#132219]">
                    {sec.title}
                  </h3>
                  <p className="text-sm text-[#3F5749] mt-2 leading-relaxed line-clamp-3">
                    {sec.leadParagraph}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F764A]">
                  <span>Read Topic</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => onNavigate('tutorials')}
              className="text-left bg-[#143D28] text-white rounded-xl p-5 hover:bg-[#0D2B1B] transition-colors flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#E2B334] mb-2">
                  <span className="font-mono uppercase tracking-wider font-semibold">Easy Guides</span>
                  <Wrench className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-2xl font-semibold">
                  Step-by-Step Craft Tutorials
                </h3>
                <p className="text-sm text-[#E8F5E9] mt-2 leading-relaxed">
                  Follow easy pictures and short steps to weave a Ketupat, a Balinese flower crown, a leaf grasshopper, or a ceremonial keris!
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E2B334]">
                <span>Open Craft Tutorials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Cultural Map, Gallery & Quiz Invitation */}
      <section className="py-14 sm:py-16 bg-[#F6F1E3] anyaman-weave-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-[#B65236] font-semibold mb-1">
              Keep Exploring
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#132219]">
              More Ways to Discover Indonesian Crafts
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#3F5749]">
              Click islands on the map, look at real craft photos in the gallery, or try our fun 8-question quiz!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              type="button"
              onClick={() => onNavigate('explore', 'cultural-map')}
              className="text-left bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-6 hover:border-[#0F764A] transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FAFBF6] border border-[#B5D2AF] flex items-center justify-center mb-3">
                <Compass className="w-5 h-5 text-[#0F764A]" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#132219]">
                Indonesian Cultural Map
              </h3>
              <p className="text-sm text-[#3F5749] mt-2 leading-relaxed">
                See how janur traditions look across Bali, Java, Sumatra, Kalimantan, and Sulawesi.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className="text-left bg-[#FDF5DB]/85 border border-[#E8D28C] rounded-xl p-6 hover:border-[#DD7930] transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FAFBF6] border border-[#E8D28C] flex items-center justify-center mb-3">
                <Images className="w-5 h-5 text-[#DD7930]" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#132219]">
                Interactive Craft Gallery
              </h3>
              <p className="text-sm text-[#3F5749] mt-2 leading-relaxed">
                Sort photos by craft type and click any picture to read its story.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('explore', 'craft-quiz')}
              className="text-left bg-[#FAEDE8]/90 border border-[#E4B7AA] rounded-xl p-6 hover:border-[#B65236] transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-[#FAFBF6] border border-[#E4B7AA] flex items-center justify-center mb-3">
                <HelpCircle className="w-5 h-5 text-[#B65236]" strokeWidth={1.8} />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#132219]">
                Craft Knowledge Quiz
              </h3>
              <p className="text-sm text-[#3F5749] mt-2 leading-relaxed">
                Take a quick 8-question quiz to test what you learned about janur!
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
