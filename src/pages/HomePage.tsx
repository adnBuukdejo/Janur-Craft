import React from 'react';
import { ArrowRight, Compass, HelpCircle, Images, Sparkles, Wrench } from 'lucide-react';
import { EDUCATIONAL_SECTIONS } from '../data/educationalSections';
import { GALLERY_ITEMS } from '../data/galleryAndRegions';
import { JANUR_IMAGES } from '../data/images';
import { PageId } from '../types/janur';
import { ResilientImage } from '../components/ResilientImage';

interface HomePageProps {
  onNavigate: (page: PageId, anchorId?: string, extraId?: string) => void;
}

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
      <section className="border-b border-[#C3D6C1] bg-[#F7FAF6] botanical-paper-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#3A7D44] mb-4">
                  Indonesian Traditional Craft · Cultural Learning
                </p>
                <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-[#15221B] leading-[1.06] tracking-tight">
                  The Art of Janur
                </h1>
                <p className="mt-3 font-serif italic text-xl sm:text-2xl text-[#17422B]">
                  Where Tradition Meets Creativity.
                </p>
                <p className="mt-6 text-base text-[#455B4E] leading-relaxed max-w-lg">
                  Across Indonesia, young coconut leaves—called <em className="text-[#17422B] not-italic font-semibold">janur</em>—are folded and woven by hand without any glue or plastic to create festival decorations, temple offerings, and famous diamond rice pouches.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#C3D6C1] flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#17422B] rounded-lg hover:bg-[#10311F] transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Explore JanurCraft</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('studio')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#17422B] bg-[#DCEAD9] border border-[#C3D6C1] rounded-lg hover:bg-[#C7DEC9] transition-colors cursor-pointer min-h-[44px]"
                >
                  <Sparkles className="w-4 h-4 text-[#3A7D44]" />
                  <span>Try Craft Studio</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="h-full min-h-[320px] sm:min-h-[420px] rounded-xl overflow-hidden border border-[#C3D6C1] bg-[#DCEAD9]">
                <ResilientImage
                  src={JANUR_IMAGES.heroExhibition}
                  alt="Exhibition display of Indonesian woven janur crafts including ketupat pouches and pleated coconut leaf fans"
                  fallbackTitle="The Art of Janur Exhibition"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Quick Overview Strip */}
          <div className="mt-10 pt-6 border-t border-[#C3D6C1] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <p className="font-mono text-xs text-[#3A7D44] tabular-nums">13 Topics</p>
              <p className="text-sm font-medium text-[#15221B] mt-0.5">
                Easy-to-Read Cultural Guides
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#3A7D44] tabular-nums">7 Regions</p>
              <p className="text-sm font-medium text-[#15221B] mt-0.5">
                Interactive Indonesia Map
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#3A7D44] tabular-nums">Drag &amp; Drop</p>
              <p className="text-sm font-medium text-[#15221B] mt-0.5">
                Hands-On Ketupat Studio
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#3A7D44] tabular-nums">100% Natural</p>
              <p className="text-sm font-medium text-[#15221B] mt-0.5">
                Eco-Friendly Plant Craft
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Traditional & Modern Crafts */}
      <section className="py-14 sm:py-16 border-b border-[#C3D6C1] bg-[#EDF4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#3A7D44] mb-1">
                Featured Crafts
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15221B]">
                Traditional &amp; Modern Janur Creations
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#17422B] hover:underline cursor-pointer shrink-0"
            >
              <span>See All Gallery Photos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCrafts.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate('gallery', undefined, item.id)}
                className="group text-left bg-[#F7FAF6] border border-[#C3D6C1] rounded-xl overflow-hidden hover:border-[#3A7D44] transition-colors flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#DCEAD9]">
                  <ResilientImage
                    src={item.imageUrl}
                    alt={item.title}
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#455B4E] mb-1">
                      <span>{item.category}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{item.region.split(',')[0]}</span>
                    </p>
                    <h3 className="font-serif text-xl font-semibold text-[#15221B] group-hover:text-[#17422B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#455B4E] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Preview of Interactive Craft Studio */}
      <section className="py-14 sm:py-16 border-b border-[#C3D6C1] bg-[#F7FAF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#DCEAD9]/70 border border-[#C3D6C1] rounded-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-[#17422B]">
                Interactive Craft Studio · Hands-On Activity
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15221B]">
                Weave Your Own Ketupat Step by Step
              </h2>
              <p className="text-sm sm:text-base text-[#455B4E] leading-relaxed max-w-2xl">
                Jump into our drag-and-drop weaving mat! Split a fresh coconut leaf, rotate the green strips, click to weave them Over and Under, tuck the corners, and pull everything tight into a real diamond ketupat.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#15221B]">
                <div className="bg-[#F7FAF6] border border-[#C3D6C1] rounded-lg px-3 py-2.5">
                  <span className="font-mono text-[#3A7D44] block">Step 1–2</span>
                  <span className="font-medium">Split Leaf &amp; Arrange Loops</span>
                </div>
                <div className="bg-[#F7FAF6] border border-[#C3D6C1] rounded-lg px-3 py-2.5">
                  <span className="font-mono text-[#3A7D44] block">Step 3–4</span>
                  <span className="font-medium">Rotate &amp; Weave Over/Under</span>
                </div>
                <div className="bg-[#F7FAF6] border border-[#C3D6C1] rounded-lg px-3 py-2.5 col-span-2 sm:col-span-1">
                  <span className="font-mono text-[#3A7D44] block">Step 5–6</span>
                  <span className="font-medium">Tuck Ends &amp; Tighten Shape</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('studio')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#17422B] rounded-lg hover:bg-[#10311F] transition-colors cursor-pointer"
                >
                  <span>Start Weaving in Craft Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#C3D6C1] bg-[#EDF4EC]">
                <ResilientImage
                  src={JANUR_IMAGES.ketupatWoven}
                  alt="Traditional woven diamond ketupat pouches"
                  fallbackTitle="Ketupat Craft Studio Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Educational Sections Preview */}
      <section className="py-14 sm:py-16 border-b border-[#C3D6C1] bg-[#EDF4EC]/75">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#3A7D44] mb-1">
                13 Friendly Learning Guides
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15221B]">
                Explore Janur Step by Step
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#17422B] hover:underline cursor-pointer shrink-0"
            >
              <span>Read All 13 Sections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {educationHighlights.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => onNavigate('explore', sec.id)}
                className="text-left bg-[#F7FAF6] border border-[#C3D6C1] rounded-xl p-5 hover:border-[#3A7D44] transition-colors flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#455B4E] mb-2">
                    <span className="font-mono tabular-nums text-[#3A7D44]">
                      Section {sec.number}
                    </span>
                    <span>{sec.readTime}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#15221B]">
                    {sec.title}
                  </h3>
                  <p className="text-sm text-[#455B4E] mt-2 leading-relaxed line-clamp-3">
                    {sec.leadParagraph}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#17422B]">
                  <span>Read Section</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}

            <button
              type="button"
              onClick={() => onNavigate('tutorials')}
              className="text-left bg-[#17422B] text-white rounded-xl p-5 hover:bg-[#10311F] transition-colors flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#C7DEC9] mb-2">
                  <span className="font-mono uppercase tracking-wider">Easy Guides</span>
                  <Wrench className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-2xl font-semibold">
                  Step-by-Step Craft Tutorials
                </h3>
                <p className="text-sm text-[#DCEAD9] mt-2 leading-relaxed">
                  Follow clear pictures and simple instructions to make a Ketupat, a Balinese flower crown, a leaf grasshopper, or a ceremonial keris.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                <span>Open Craft Tutorials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Cultural Map, Gallery & Quiz Invitation */}
      <section className="py-14 sm:py-16 bg-[#F7FAF6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-[#3A7D44] mb-1">
              Keep Discovering
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15221B]">
              More Ways to Explore Indonesian Heritage
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#455B4E]">
              Click around Indonesia on the Cultural Map, browse photos in the Gallery, or test what you learned in the quiz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              type="button"
              onClick={() => onNavigate('explore', 'cultural-map')}
              className="text-left bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-6 hover:border-[#3A7D44] transition-colors cursor-pointer"
            >
              <Compass className="w-6 h-6 text-[#17422B] mb-3" strokeWidth={1.6} />
              <h3 className="font-serif text-2xl font-semibold text-[#15221B]">
                Indonesian Cultural Map
              </h3>
              <p className="text-sm text-[#455B4E] mt-2 leading-relaxed">
                See how traditions differ across Bali, Java, Sumatra, Kalimantan, and Sulawesi.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className="text-left bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-6 hover:border-[#3A7D44] transition-colors cursor-pointer"
            >
              <Images className="w-6 h-6 text-[#17422B] mb-3" strokeWidth={1.6} />
              <h3 className="font-serif text-2xl font-semibold text-[#15221B]">
                Interactive Craft Gallery
              </h3>
              <p className="text-sm text-[#455B4E] mt-2 leading-relaxed">
                Filter photos by craft type and click any piece to read its story and region.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('explore', 'craft-quiz')}
              className="text-left bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-6 hover:border-[#3A7D44] transition-colors cursor-pointer"
            >
              <HelpCircle className="w-6 h-6 text-[#17422B] mb-3" strokeWidth={1.6} />
              <h3 className="font-serif text-2xl font-semibold text-[#15221B]">
                Craft Knowledge Quiz
              </h3>
              <p className="text-sm text-[#455B4E] mt-2 leading-relaxed">
                Take a quick 8-question quiz to check what you know about janur and Indonesian culture.
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
