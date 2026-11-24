import React from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { REFERENCE_SOURCES } from '../data/galleryAndRegions';
import { JANUR_IMAGES } from '../data/images';
import { PageId } from '../types/janur';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';

interface AboutPageProps {
  onNavigate: (page: PageId, anchorId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <PageHeader
        kicker="About the Platform · Cultural & Educational Mission"
        title="About JanurCraft"
        description="Introducing the living craft, botanical intelligence, and regional richness of Indonesian young coconut leaf art to international learners, educators, and cultural enthusiasts."
        currentPageLabel="About JanurCraft"
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
        {/* Purpose & Educational Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#1E4D38]">
              01. Purpose &amp; Cultural Appreciation
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E241E]">
              Why Janur Deserves International Recognition
            </h2>
            <p className="text-sm sm:text-base text-[#1E241E]/90 leading-relaxed">
              While Indonesian batik and shadow puppetry have achieved global visibility, <em className="not-italic font-medium">janur</em>—the daily and ceremonial art of folding young coconut palm leaves—is equally fundamental to Indonesian visual culture yet rarely documented systematically in English.
            </p>
            <p className="text-sm sm:text-base text-[#525B50] leading-relaxed">
              JanurCraft bridges that gap. Designed as a digital museum and interactive classroom, the platform explains how a single renewable botanical material sustains diverse regional expressions across Bali, Java, Sumatra, Kalimantan, and Sulawesi without synthetic adhesives or single-use plastics.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#DCD5C5] bg-[#E3EAE1]">
              <ResilientImage
                src={JANUR_IMAGES.modernDesign}
                alt="Contemporary sustainable janur woven lanterns and folded botanical centerpiece"
                fallbackTitle="JanurCraft Exhibition"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Three Pillars */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#DCD5C5]">
          <div className="bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-6 space-y-2">
            <p className="font-mono text-xs text-[#1E4D38]">Pillar 01</p>
            <h3 className="font-serif text-2xl font-semibold text-[#1E241E]">
              Cultural Accuracy Over Generalization
            </h3>
            <p className="text-sm text-[#525B50] leading-relaxed">
              Indonesia is archipelagic and culturally plural. JanurCraft distinguishes Balinese <em className="not-italic font-medium text-[#1E241E]">busung</em> offerings, Javanese <em className="not-italic font-medium text-[#1E241E]">Kembar Mayang</em>, Minangkabau <em className="not-italic font-medium text-[#1E241E]">katupek</em>, and Banjar <em className="not-italic font-medium text-[#1E241E]">katupat</em> rather than flattening them into one generic tradition.
            </p>
          </div>

          <div className="bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-6 space-y-2">
            <p className="font-mono text-xs text-[#1E4D38]">Pillar 02</p>
            <h3 className="font-serif text-2xl font-semibold text-[#1E241E]">
              Interactive Tactile Comprehension
            </h3>
            <p className="text-sm text-[#525B50] leading-relaxed">
              Weaving cannot be understood solely through prose. By pairing 2D anatomical schematics, step-by-step tutorials, and our 6-stage Three.js 3D Ketupat Studio, visitors grasp how flat strands lock into three-dimensional vessels.
            </p>
          </div>

          <div className="bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-6 space-y-2">
            <p className="font-mono text-xs text-[#1E4D38]">Pillar 03</p>
            <h3 className="font-serif text-2xl font-semibold text-[#1E241E]">
              Open, Privacy-First Access
            </h3>
            <p className="text-sm text-[#525B50] leading-relaxed">
              Built for students, educators, and curious visitors worldwide, JanurCraft requires no visitor registration, account sign-in, or personal data collection.
            </p>
          </div>
        </section>

        {/* Sources and References */}
        <section id="sources-references" className="scroll-mt-24 pt-10 border-t border-[#DCD5C5]">
          <div className="max-w-3xl mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-[#525B50] mb-1">
              Curatorial Bibliography
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E241E]">
              Sources &amp; Institutional References
            </h2>
            <p className="mt-2 text-sm text-[#525B50] leading-relaxed">
              Cultural terminology, regional classifications, and botanical craft practices presented on JanurCraft draw on documented Indonesian government cultural registries, national language dictionaries, museums, and university publications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REFERENCE_SOURCES.map((ref) => (
              <div
                key={ref.id}
                className="bg-[#F3EFE6]/70 border border-[#DCD5C5] rounded-xl p-5 flex flex-col justify-between space-y-3"
              >
                <div>
                  <p className="font-mono text-xs text-[#1E4D38] mb-1">{ref.category}</p>
                  <h3 className="font-serif text-xl font-semibold text-[#1E241E]">
                    {ref.title}
                  </h3>
                  <p className="text-xs font-medium text-[#525B50] mt-1">
                    {ref.institutionOrAuthor}
                  </p>
                  <p className="text-xs sm:text-sm text-[#525B50] mt-2 leading-relaxed">
                    {ref.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#DCD5C5]">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E4D38] hover:underline"
                  >
                    <span>Visit Institutional Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="p-8 rounded-xl bg-[#E3EAE1]/70 border border-[#DCD5C5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E241E]">
              Ready to Begin Weaving?
            </h2>
            <p className="text-sm text-[#525B50] mt-1">
              Explore all 13 chapters or enter the Interactive 3D Ketupat Studio.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="px-4 py-2.5 text-xs font-semibold bg-[#FBF9F5] border border-[#DCD5C5] text-[#1E241E] rounded-lg hover:bg-[#F3EFE6] transition-colors cursor-pointer"
            >
              Explore Janur
            </button>
            <button
              type="button"
              onClick={() => onNavigate('studio')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-[#1E4D38] text-white rounded-lg hover:bg-[#163B2A] transition-colors cursor-pointer"
            >
              <span>Open 3D Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
