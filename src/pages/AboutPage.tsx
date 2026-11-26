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
        kicker="About This Project · Why JanurCraft Exists"
        title="About JanurCraft"
        description="Created by a Grade 8 student to share the beauty, craft skills, and stories of Indonesian young coconut leaf art with students, teachers, and visitors around the world."
        currentPageLabel="About JanurCraft"
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
        {/* Purpose & Story */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest font-semibold text-[#0F764A]">
              01. Why Share Janur With the World?
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#132219]">
              A Living Indonesian Craft Worth Knowing
            </h2>
            <p className="text-sm sm:text-base text-[#132219]/90 leading-relaxed">
              Many people around the world already know Indonesian batik cloth or gamelan music. Yet <em className="not-italic font-semibold text-[#143D28]">janur</em>—the art of folding and weaving young coconut leaves—is just as loved in Indonesian celebrations!
            </p>
            <p className="text-sm sm:text-base text-[#3F5749] leading-relaxed">
              JanurCraft was built as a friendly student project to explain janur in clear, simple English. With our interactive craft table, regional map, and easy tutorials, anyone can see how one green palm leaf becomes food pouches, festival poles, and plastic-free art.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#B5D2AF] bg-[#CFE4CA]">
              <ResilientImage
                src={JANUR_IMAGES.modernDesign}
                alt="Modern eco-friendly janur woven lamps and folded leaf table piece"
                fallbackTitle="JanurCraft Project"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Three Goals */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#B5D2AF]">
          <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-6 space-y-2">
            <p className="font-mono text-xs font-semibold text-[#0F764A]">Goal 01</p>
            <h3 className="font-serif text-2xl font-semibold text-[#132219]">
              Celebrate Every Island
            </h3>
            <p className="text-sm text-[#3F5749] leading-relaxed">
              Indonesia has thousands of islands! JanurCraft shows Balinese <em className="not-italic font-medium text-[#132219]">busung</em> flower trays, Javanese <em className="not-italic font-medium text-[#132219]">Kembar Mayang</em>, Minangkabau <em className="not-italic font-medium text-[#132219]">katupek</em>, and Banjar <em className="not-italic font-medium text-[#132219]">katupat</em> clearly.
            </p>
          </div>

          <div className="bg-[#E5F0E3] border border-[#B5D2AF] rounded-xl p-6 space-y-2">
            <p className="font-mono text-xs font-semibold text-[#0F764A]">Goal 02</p>
            <h3 className="font-serif text-2xl font-semibold text-[#132219]">
              Learn by Trying
            </h3>
            <p className="text-sm text-[#3F5749] leading-relaxed">
              Weaving is much easier when you do it yourself! Our interactive Craft Studio and picture tutorials let you cut, fold, and weave step by step.
            </p>
          </div>

          <div className="bg-[#CFE4CA]/70 border border-[#B5D2AF] rounded-xl p-6 space-y-2">
            <p className="font-mono text-xs font-semibold text-[#0F764A]">Goal 03</p>
            <h3 className="font-serif text-2xl font-semibold text-[#132219]">
              Free for Everyone
            </h3>
            <p className="text-sm text-[#3F5749] leading-relaxed">
              Made for students, teachers, and travelers, JanurCraft opens right away with no sign-up or account needed.
            </p>
          </div>
        </section>

        {/* Sources and References */}
        <section id="sources-references" className="scroll-mt-24 pt-10 border-t border-[#B5D2AF]">
          <div className="max-w-3xl mb-8">
            <p className="font-mono text-xs uppercase tracking-widest font-semibold text-[#0F764A] mb-1">
              Trusted Cultural Facts
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#132219]">
              Sources &amp; References
            </h2>
            <p className="mt-2 text-sm text-[#3F5749] leading-relaxed">
              The cultural facts, local names, and craft methods on JanurCraft come from Indonesian heritage lists, official dictionaries, museums, and universities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REFERENCE_SOURCES.map((ref) => (
              <div
                key={ref.id}
                className="bg-[#E8F5E9]/85 border border-[#B5D2AF] rounded-xl p-5 flex flex-col justify-between space-y-3"
              >
                <div>
                  <p className="font-mono text-xs font-semibold text-[#0F764A] mb-1">{ref.category}</p>
                  <h3 className="font-serif text-xl font-semibold text-[#132219]">
                    {ref.title}
                  </h3>
                  <p className="text-xs font-medium text-[#3F5749] mt-1">
                    {ref.institutionOrAuthor}
                  </p>
                  <p className="text-xs sm:text-sm text-[#3F5749] mt-2 leading-relaxed">
                    {ref.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#B5D2AF]">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#143D28] hover:text-[#0F764A] hover:underline"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="p-8 rounded-xl bg-[#CFE4CA] border border-[#B5D2AF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#132219]">
              Ready to Make Your Own Ketupat?
            </h2>
            <p className="text-sm text-[#3F5749] mt-1">
              Read the 13 learning topics or jump straight into the Interactive Craft Studio!
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="px-4 py-2.5 text-xs font-semibold bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28] rounded-lg hover:bg-[#E8F5E9] transition-colors cursor-pointer"
            >
              Explore Janur
            </button>
            <button
              type="button"
              onClick={() => onNavigate('studio')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-[#143D28] text-white rounded-lg hover:bg-[#0D2B1B] transition-colors cursor-pointer"
            >
              <span>Open Craft Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
