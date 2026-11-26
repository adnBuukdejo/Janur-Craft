import React, { useEffect } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { EDUCATIONAL_SECTIONS } from '../data/educationalSections';
import { PageId } from '../types/janur';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';
import {
  AnatomyDiagram,
  InteractiveWeaveInspector,
  SustainabilityCycleDiagram,
  TechniquesDiagram,
} from '../components/EducationalDiagrams';
import { IndonesiaCulturalMap } from '../components/IndonesiaCulturalMap';
import { CraftQuiz } from '../components/CraftQuiz';

interface ExploreJanurPageProps {
  scrollTarget?: string;
  selectedRegionId?: string;
  onNavigate: (page: PageId, anchorId?: string) => void;
}

export const ExploreJanurPage: React.FC<ExploreJanurPageProps> = ({
  scrollTarget,
  selectedRegionId,
  onNavigate,
}) => {
  useEffect(() => {
    if (scrollTarget) {
      const el = document.getElementById(scrollTarget);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 60);
      }
    }
  }, [scrollTarget]);

  const jumpTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <PageHeader
        kicker="Learn About Janur · 13 Simple Topics"
        title="Explore the World of Janur"
        description="Everything you need to know about Indonesian young coconut leaf crafts—told in simple, friendly English! Read all 13 topics, click around the Indonesia Map, and test yourself in the quiz."
        currentPageLabel="Explore Janur"
        onNavigateHome={() => onNavigate('home')}
      />

      {/* Mobile & Tablet Quick Jump Strip */}
      <div className="lg:hidden border-b border-[#B5D2AF] bg-[#FAFBF6] px-4 py-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          {EDUCATIONAL_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => jumpTo(sec.id)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#E8F5E9] border border-[#B5D2AF] text-[#132219] hover:bg-[#CFE4CA] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {sec.number}. {sec.title}
            </button>
          ))}
          <button
            type="button"
            onClick={() => jumpTo('cultural-map')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#CFE4CA] border border-[#0F764A] text-[#143D28] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Cultural Map
          </button>
          <button
            type="button"
            onClick={() => jumpTo('craft-quiz')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#CFE4CA] border border-[#0F764A] text-[#143D28] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Knowledge Quiz
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Desktop Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-22 bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#B5D2AF]">
                <BookOpen className="w-4 h-4 text-[#0F764A]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#143D28] font-semibold">
                  13 Learning Topics
                </span>
              </div>
              <nav aria-label="Educational topics" className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                {EDUCATIONAL_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => jumpTo(sec.id)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-[#3F5749] hover:text-[#143D28] hover:bg-[#FAFBF6] transition-colors flex items-start gap-2 cursor-pointer"
                  >
                    <span className="font-mono tabular-nums text-[#0F764A] font-semibold shrink-0">
                      {sec.number}
                    </span>
                    <span className="leading-snug">{sec.title}</span>
                  </button>
                ))}
              </nav>

              <div className="pt-3 border-t border-[#B5D2AF] space-y-1.5">
                <button
                  type="button"
                  onClick={() => jumpTo('cultural-map')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28] hover:bg-[#CFE4CA] transition-colors cursor-pointer"
                >
                  Indonesian Cultural Map
                </button>
                <button
                  type="button"
                  onClick={() => jumpTo('craft-quiz')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28] hover:bg-[#CFE4CA] transition-colors cursor-pointer"
                >
                  Craft Knowledge Quiz
                </button>
              </div>
            </div>
          </aside>

          {/* Main 13 Educational Sections */}
          <div className="lg:col-span-9 space-y-14">
            {EDUCATIONAL_SECTIONS.map((sec) => (
              <article
                key={sec.id}
                id={sec.id}
                className="scroll-mt-24 pb-12 border-b border-[#B5D2AF]"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#3F5749] mb-2">
                  <span className="font-mono tabular-nums text-[#0F764A] font-semibold">
                    Topic {sec.number} of 13
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{sec.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{sec.readTime}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#132219] tracking-tight">
                  {sec.title}
                </h2>
                <p className="mt-1.5 text-base font-serif italic text-[#3F5749]">
                  {sec.subtitle}
                </p>

                <p className="mt-5 text-base text-[#132219] leading-relaxed max-w-prose">
                  {sec.leadParagraph}
                </p>

                {sec.imageUrl && (
                  <figure className="mt-6">
                    <div className="aspect-[16/9] max-h-[400px] w-full rounded-xl overflow-hidden border border-[#B5D2AF] bg-[#CFE4CA]">
                      <ResilientImage
                        src={sec.imageUrl}
                        alt={sec.imageCaption || sec.title}
                        fallbackTitle={sec.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {sec.imageCaption && (
                      <figcaption className="mt-2 text-xs font-serif italic text-[#3F5749]">
                        {sec.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {sec.diagramType === 'anatomy' && (
                  <div className="mt-6">
                    <AnatomyDiagram />
                  </div>
                )}
                {sec.diagramType === 'techniques' && (
                  <div className="mt-6">
                    <TechniquesDiagram />
                  </div>
                )}
                {sec.diagramType === 'weave-interactive' && (
                  <div className="mt-6">
                    <InteractiveWeaveInspector onOpenStudio={() => onNavigate('studio')} />
                  </div>
                )}
                {sec.diagramType === 'sustainability' && (
                  <div className="mt-6">
                    <SustainabilityCycleDiagram />
                  </div>
                )}

                <div className="mt-6 space-y-5 max-w-prose">
                  {sec.subsections.map((sub) => (
                    <div key={sub.subheading}>
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#132219] mb-2">
                        {sub.subheading}
                      </h3>
                      <div className="space-y-3">
                        {sub.paragraphs.map((p, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-sm sm:text-[15px] text-[#132219]/90 leading-[1.75]"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                      {sub.practicalExample && (
                        <div className="mt-3 p-4 rounded-lg bg-[#E8F5E9] border border-[#B5D2AF]">
                          <p className="text-xs font-mono uppercase tracking-wider font-semibold text-[#0F764A] mb-1">
                            Real-Life Example
                          </p>
                          <p className="text-xs sm:text-sm text-[#132219] leading-relaxed">
                            {sub.practicalExample}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {sec.culturalNote && (
                  <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#E5F0E3] border border-[#B5D2AF] max-w-prose">
                    <p className="text-sm font-semibold text-[#143D28]">
                      {sec.culturalNote.title}
                    </p>
                    <p className="text-xs sm:text-sm text-[#3F5749] mt-1 leading-relaxed">
                      {sec.culturalNote.body}
                    </p>
                  </div>
                )}

                {sec.keyTerms.length > 0 && (
                  <div className="mt-6">
                    <p className="font-mono text-xs uppercase tracking-wider font-semibold text-[#0F764A] mb-2.5">
                      Indonesian Words to Know
                    </p>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sec.keyTerms.map((term) => (
                        <div
                          key={term.term}
                          className="p-3.5 rounded-lg bg-[#E8F5E9]/85 border border-[#B5D2AF]"
                        >
                          <dt className="text-sm font-semibold text-[#132219]">
                            {term.term}{' '}
                            <span className="text-xs font-normal text-[#3F5749]">
                              ({term.origin})
                            </span>
                          </dt>
                          <dd className="text-xs text-[#3F5749] mt-1 leading-relaxed">
                            {term.definition}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {sec.id === 'step-by-step-tutorials' && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate('tutorials')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#143D28] rounded-lg hover:bg-[#0D2B1B] transition-colors cursor-pointer"
                    >
                      <span>Open Step-by-Step Tutorials</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('studio')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#143D28] bg-[#CFE4CA] border border-[#0F764A]/30 rounded-lg hover:bg-[#BEDBB8] transition-colors cursor-pointer"
                    >
                      <span>Practice in Interactive Craft Studio</span>
                    </button>
                  </div>
                )}
              </article>
            ))}

            {/* Indonesian Cultural Map */}
            <section id="cultural-map" className="scroll-mt-24 pt-2">
              <IndonesiaCulturalMap initialRegionId={selectedRegionId} />
            </section>

            {/* Craft Knowledge Quiz */}
            <section id="craft-quiz" className="scroll-mt-24 pt-2">
              <CraftQuiz />
            </section>

            <div className="p-6 rounded-xl bg-[#E8F5E9] border border-[#B5D2AF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#132219]">
                  Sources &amp; Cultural References
                </h3>
                <p className="text-xs sm:text-sm text-[#3F5749] mt-0.5">
                  See the Indonesian museums, dictionaries, and schools that helped us gather true facts for this website.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('about', 'sources-references')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#143D28] rounded-lg hover:bg-[#0D2B1B] transition-colors shrink-0 cursor-pointer"
              >
                <span>See Sources</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
