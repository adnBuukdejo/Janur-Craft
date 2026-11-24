import React from 'react';
import { ArrowRight, BookOpen, Box, Compass, HelpCircle, Images, Wrench } from 'lucide-react';
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
      {/* 1. Hero Exhibition Banner */}
      <section className="border-b border-[#DCD5C5] bg-[#FBF9F5] botanical-paper-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            <div className="lg:col-span-5 flex flex-col justify-between py-2">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-[#525B50] mb-4">
                  Digital Cultural Exhibition · Indonesian Craft Heritage
                </p>
                <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-[#1E241E] leading-[1.06] tracking-tight">
                  The Art of Janur
                </h1>
                <p className="mt-3 font-serif italic text-xl sm:text-2xl text-[#1E4D38]">
                  Where Tradition Meets Creativity.
                </p>
                <p className="mt-6 text-base text-[#525B50] leading-relaxed max-w-lg">
                  Across the Indonesian archipelago, young unfurled coconut palm leaves—known as <em className="text-[#1E241E] not-italic font-medium">janur</em>—are folded, notched, and woven without glue or plastic into sacred temple offerings, wedding landmarks, and iconic culinary vessels.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#DCD5C5] flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#1E4D38] rounded-lg hover:bg-[#163B2A] transition-colors cursor-pointer min-h-[44px]"
                >
                  <span>Explore JanurCraft</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('studio')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-[#1E241E] bg-[#F3EFE6] border border-[#DCD5C5] rounded-lg hover:bg-[#E3EAE1] transition-colors cursor-pointer min-h-[44px]"
                >
                  <Box className="w-4 h-4 text-[#1E4D38]" />
                  <span>Open 3D Craft Studio</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="h-full min-h-[320px] sm:min-h-[420px] rounded-xl overflow-hidden border border-[#DCD5C5] bg-[#E3EAE1]">
                <ResilientImage
                  src={JANUR_IMAGES.heroExhibition}
                  alt="Curated exhibition display of traditional Indonesian woven janur crafts including diamond ketupat and pleated coconut leaf fans"
                  fallbackTitle="The Art of Janur Exhibition"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Curatorial Utility Strip */}
          <div className="mt-10 pt-6 border-t border-[#DCD5C5] grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <p className="font-mono text-xs text-[#525B50] tabular-nums">13 Chapters</p>
              <p className="text-sm font-medium text-[#1E241E] mt-0.5">
                Botany, History &amp; Craft Science
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#525B50] tabular-nums">7 Regional Traditions</p>
              <p className="text-sm font-medium text-[#1E241E] mt-0.5">
                Interactive Archipelagic Atlas
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#525B50] tabular-nums">6-Stage 3D Studio</p>
              <p className="text-sm font-medium text-[#1E241E] mt-0.5">
                Interactive Ketupat Simulation
              </p>
            </div>
            <div>
              <p className="font-mono text-xs text-[#525B50] tabular-nums">100% Plant Fiber</p>
              <p className="text-sm font-medium text-[#1E241E] mt-0.5">
                Zero-Waste Circular Tradition
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Traditional & Modern Crafts */}
      <section className="py-14 sm:py-16 border-b border-[#DCD5C5] bg-[#F3EFE6]/55">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#525B50] mb-1">
                Curated Collection Highlights
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E241E]">
                Traditional &amp; Modern Janur Forms
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E4D38] hover:underline cursor-pointer shrink-0"
            >
              <span>View Full Craft Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCrafts.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate('gallery', undefined, item.id)}
                className="group text-left bg-[#FBF9F5] border border-[#DCD5C5] rounded-xl overflow-hidden hover:border-[#5E7D63] transition-colors flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#E3EAE1]">
                  <ResilientImage
                    src={item.imageUrl}
                    alt={item.title}
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-[#525B50] mb-1">
                      <span>{item.category}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{item.region.split(',')[0]}</span>
                    </p>
                    <h3 className="font-serif text-xl font-semibold text-[#1E241E] group-hover:text-[#1E4D38] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#525B50] mt-1.5 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Preview of Interactive Craft Studio (3D Ketupat Simulation) */}
      <section className="py-14 sm:py-16 border-b border-[#DCD5C5] bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#E3EAE1]/65 border border-[#DCD5C5] rounded-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-[#1E4D38]">
                Interactive Craft Studio · Guided 3D Simulation
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E241E]">
                Watch a Ketupat Weave Take Shape in 3D
              </h2>
              <p className="text-sm sm:text-base text-[#525B50] leading-relaxed max-w-2xl">
                Step inside our interactive WebGL craft bench. Rotate 360 degrees, zoom into leaf strand crossings, and step sequentially through all six stages of traditional Ketupat Bawang weaving—from stripping the woody <em className="not-italic font-medium text-[#1E241E]">lidi</em> midrib to locking the final diamond pouch.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-[#1E241E]">
                <div className="bg-[#FBF9F5] border border-[#DCD5C5] rounded-lg px-3 py-2.5">
                  <span className="font-mono text-[#525B50] block">01–02</span>
                  <span className="font-medium">Material &amp; Midrib Prep</span>
                </div>
                <div className="bg-[#FBF9F5] border border-[#DCD5C5] rounded-lg px-3 py-2.5">
                  <span className="font-mono text-[#525B50] block">03–04</span>
                  <span className="font-medium">3-Loop Coil &amp; Over-Under</span>
                </div>
                <div className="bg-[#FBF9F5] border border-[#DCD5C5] rounded-lg px-3 py-2.5 col-span-2 sm:col-span-1">
                  <span className="font-mono text-[#525B50] block">05–06</span>
                  <span className="font-medium">Diamond Lock &amp; Result</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('studio')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#1E4D38] rounded-lg hover:bg-[#163B2A] transition-colors cursor-pointer"
                >
                  <span>Launch Guided 3D Simulation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#DCD5C5] bg-[#F3EFE6]">
                <ResilientImage
                  src={JANUR_IMAGES.ketupatWoven}
                  alt="Woven Ketupat Bawang diamond rice casings"
                  fallbackTitle="Ketupat 3D Studio Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Educational Curriculum & Interactive Pathways */}
      <section className="py-14 sm:py-16 border-b border-[#DCD5C5] bg-[#F3EFE6]/45">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#525B50] mb-1">
                13-Chapter Exhibition Monograph
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E241E]">
                Explore Educational Chapters
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E4D38] hover:underline cursor-pointer shrink-0"
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
                className="text-left bg-[#FBF9F5] border border-[#DCD5C5] rounded-xl p-5 hover:border-[#5E7D63] transition-colors flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#525B50] mb-2">
                    <span className="font-mono tabular-nums text-[#1E4D38]">
                      Chapter {sec.number}
                    </span>
                    <span>{sec.readTime}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#1E241E]">
                    {sec.title}
                  </h3>
                  <p className="text-sm text-[#525B50] mt-2 leading-relaxed line-clamp-3">
                    {sec.leadParagraph}
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4D38]">
                  <span>Read Chapter</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}

            {/* Contemporary Craft Card */}
            <button
              type="button"
              onClick={() => onNavigate('tutorials')}
              className="text-left bg-[#1E4D38] text-white rounded-xl p-5 hover:bg-[#163B2A] transition-colors flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#DCE5DC] mb-2">
                  <span className="font-mono uppercase tracking-wider">Hands-On Learning</span>
                  <Wrench className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-2xl font-semibold">
                  Step-by-Step Craft Tutorials
                </h3>
                <p className="text-sm text-[#E3EAE1] mt-2 leading-relaxed">
                  Practice weaving Ketupat Bawang, Balinese Sampian rosettes, Janur grasshoppers, and ceremonial Keris ornaments with clear folding diagrams.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white">
                <span>Browse Craft Tutorials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 5. Invitation to Indonesian Heritage: Map, Gallery & Quiz */}
      <section className="py-14 sm:py-16 bg-[#FBF9F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="font-mono text-xs uppercase tracking-widest text-[#525B50] mb-1">
              Discover Indonesian Cultural Heritage
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E241E]">
              Continue Your Cultural Journey
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#525B50]">
              Explore regional traditions across the Indonesian archipelago, browse archival photographs, or test your craft knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              type="button"
              onClick={() => onNavigate('explore', 'cultural-map')}
              className="text-left bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-6 hover:border-[#5E7D63] transition-colors cursor-pointer"
            >
              <Compass className="w-6 h-6 text-[#1E4D38] mb-3" strokeWidth={1.6} />
              <h3 className="font-serif text-2xl font-semibold text-[#1E241E]">
                Indonesian Cultural Map
              </h3>
              <p className="text-sm text-[#525B50] mt-2 leading-relaxed">
                Compare regional traditions across Bali, Java, West Sumatra, South Kalimantan, and South Sulawesi.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className="text-left bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-6 hover:border-[#5E7D63] transition-colors cursor-pointer"
            >
              <Images className="w-6 h-6 text-[#1E4D38] mb-3" strokeWidth={1.6} />
              <h3 className="font-serif text-2xl font-semibold text-[#1E241E]">
                Interactive Craft Gallery
              </h3>
              <p className="text-sm text-[#525B50] mt-2 leading-relaxed">
                Inspect ceremonial installations, daily offerings, culinary vessels, and modern sustainable designs.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('explore', 'craft-quiz')}
              className="text-left bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-6 hover:border-[#5E7D63] transition-colors cursor-pointer"
            >
              <HelpCircle className="w-6 h-6 text-[#1E4D38] mb-3" strokeWidth={1.6} />
              <h3 className="font-serif text-2xl font-semibold text-[#1E241E]">
                Craft Knowledge Quiz
              </h3>
              <p className="text-sm text-[#525B50] mt-2 leading-relaxed">
                Challenge yourself with eight interactive questions on botanical craft anatomy, cultural heritage, and technique.
              </p>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
