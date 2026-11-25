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
        description="Created by a student to introduce the beauty, skills, and cultural stories of Indonesian young coconut leaf crafts to teenagers, teachers, and curious visitors around the world."
        currentPageLabel="About JanurCraft"
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-16">
        {/* Purpose & Story */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-[#3A7D44]">
              01. Why Share Janur With the World?
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15221B]">
              A Living Indonesian Craft Worth Knowing
            </h2>
            <p className="text-sm sm:text-base text-[#15221B]/90 leading-relaxed">
              Many people outside Indonesia already know about Indonesian batik cloth or gamelan music, yet <em className="not-italic font-semibold text-[#17422B]">janur</em>—the traditional art of folding and weaving young coconut leaves—is just as important in everyday Indonesian celebrations!
            </p>
            <p className="text-sm sm:text-base text-[#455B4E] leading-relaxed">
              JanurCraft was built as a student cultural project to explain janur in clear, friendly English. Through interactive weaving, regional maps, and easy tutorials, anyone—anywhere in the world—can see how one natural leaf becomes food pouches, festival poles, and plastic-free art.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#C3D6C1] bg-[#DCEAD9]">
              <ResilientImage
                src={JANUR_IMAGES.modernDesign}
                alt="Modern sustainable janur woven lanterns and folded leaf centerpiece"
                fallbackTitle="JanurCraft Exhibition"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Three Goals */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#C3D6C1]">
          <div className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-6 space-y-2">
            <p className="font-mono text-xs text-[#3A7D44]">Goal 01</p>
            <h3 className="font-serif text-2xl font-semibold text-[#15221B]">
              Respect Every Region
            </h3>
            <p className="text-sm text-[#455B4E] leading-relaxed">
              Indonesia has thousands of islands! JanurCraft carefully separates Balinese <em className="not-italic font-medium text-[#15221B]">busung</em> offerings, Javanese <em className="not-italic font-medium text-[#15221B]">Kembar Mayang</em>, Minangkabau <em className="not-italic font-medium text-[#15221B]">katupek</em>, and Banjar <em className="not-italic font-medium text-[#15221B]">katupat</em> so each local tradition shines.
            </p>
          </div>

          <div className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-6 space-y-2">
            <p className="font-mono text-xs text-[#3A7D44]">Goal 02</p>
            <h3 className="font-serif text-2xl font-semibold text-[#15221B]">
              Learn by Doing
            </h3>
            <p className="text-sm text-[#455B4E] leading-relaxed">
              Weaving is much easier to understand when you try it yourself! Our drag-and-drop Craft Studio and illustrated tutorials let visitors practice how strips cross over and under step by step.
            </p>
          </div>

          <div className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-6 space-y-2">
            <p className="font-mono text-xs text-[#3A7D44]">Goal 03</p>
            <h3 className="font-serif text-2xl font-semibold text-[#15221B]">
              Free &amp; Open for Everyone
            </h3>
            <p className="text-sm text-[#455B4E] leading-relaxed">
              Built for students, teachers, and travelers, JanurCraft works immediately with no sign-up, login, or personal tracking.
            </p>
          </div>
        </section>

        {/* Sources and References */}
        <section id="sources-references" className="scroll-mt-24 pt-10 border-t border-[#C3D6C1]">
          <div className="max-w-3xl mb-8">
            <p className="font-mono text-xs uppercase tracking-widest text-[#3A7D44] mb-1">
              Trusted Cultural Information
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15221B]">
              Sources &amp; References
            </h2>
            <p className="mt-2 text-sm text-[#455B4E] leading-relaxed">
              The cultural facts, regional names, and craft methods shared on JanurCraft come from reliable Indonesian government heritage lists, official dictionaries, museums, and university publications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {REFERENCE_SOURCES.map((ref) => (
              <div
                key={ref.id}
                className="bg-[#EDF4EC]/80 border border-[#C3D6C1] rounded-xl p-5 flex flex-col justify-between space-y-3"
              >
                <div>
                  <p className="font-mono text-xs text-[#3A7D44] mb-1">{ref.category}</p>
                  <h3 className="font-serif text-xl font-semibold text-[#15221B]">
                    {ref.title}
                  </h3>
                  <p className="text-xs font-medium text-[#455B4E] mt-1">
                    {ref.institutionOrAuthor}
                  </p>
                  <p className="text-xs sm:text-sm text-[#455B4E] mt-2 leading-relaxed">
                    {ref.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#C3D6C1]">
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#17422B] hover:underline"
                  >
                    <span>Visit Official Source</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Closing CTA */}
        <section className="p-8 rounded-xl bg-[#DCEAD9] border border-[#C3D6C1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#15221B]">
              Ready to Try Weaving a Ketupat?
            </h2>
            <p className="text-sm text-[#455B4E] mt-1">
              Read the 13 learning topics or jump straight into the interactive drag-and-drop Craft Studio.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('explore')}
              className="px-4 py-2.5 text-xs font-semibold bg-[#F7FAF6] border border-[#C3D6C1] text-[#17422B] rounded-lg hover:bg-[#EDF4EC] transition-colors cursor-pointer"
            >
              Explore Janur
            </button>
            <button
              type="button"
              onClick={() => onNavigate('studio')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold bg-[#17422B] text-white rounded-lg hover:bg-[#10311F] transition-colors cursor-pointer"
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
