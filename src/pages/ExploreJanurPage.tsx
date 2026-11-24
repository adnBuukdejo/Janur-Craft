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
        kicker="Exhibition Monograph · 13 Complete Chapters"
        title="Explore the World of Janur"
        description="A structured cultural and botanical guide covering the origins, tools, regional diversity, folding methods, preservation, and ecological sustainability of Indonesian coconut-leaf craft."
        currentPageLabel="Explore Janur"
        onNavigateHome={() => onNavigate('home')}
      />

      {/* Quick Chapter Strip for Mobile & Tablet */}
      <div className="lg:hidden border-b border-[#DCD5C5] bg-[#FBF9F5] px-4 py-3 overflow-x-auto">
        <div className="flex items-center gap-2">
          {EDUCATIONAL_SECTIONS.map((sec) => (
            <button
              key={sec.id}
              type="button"
              onClick={() => jumpTo(sec.id)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#F3EFE6] border border-[#DCD5C5] text-[#1E241E] hover:bg-[#E3EAE1] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {sec.number}. {sec.title}
            </button>
          ))}
          <button
            type="button"
            onClick={() => jumpTo('cultural-map')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#E3EAE1] border border-[#5E7D63] text-[#1E4D38] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Cultural Map
          </button>
          <button
            type="button"
            onClick={() => jumpTo('craft-quiz')}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-[#E3EAE1] border border-[#5E7D63] text-[#1E4D38] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Knowledge Quiz
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Desktop Sticky Chapter Index Rail */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-22 bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#DCD5C5]">
                <BookOpen className="w-4 h-4 text-[#1E4D38]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#1E241E] font-medium">
                  13 Monograph Chapters
                </span>
              </div>
              <nav aria-label="Educational chapters" className="space-y-1 max-h-[60vh] overflow-y-auto pr-1">
                {EDUCATIONAL_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => jumpTo(sec.id)}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs text-[#525B50] hover:text-[#1E4D38] hover:bg-[#FBF9F5] transition-colors flex items-start gap-2 cursor-pointer"
                  >
                    <span className="font-mono tabular-nums text-[#1E4D38] shrink-0">
                      {sec.number}
                    </span>
                    <span className="leading-snug">{sec.title}</span>
                  </button>
                ))}
              </nav>

              <div className="pt-3 border-t border-[#DCD5C5] space-y-1.5">
                <button
                  type="button"
                  onClick={() => jumpTo('cultural-map')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-[#FBF9F5] border border-[#DCD5C5] text-[#1E4D38] hover:bg-[#E3EAE1] transition-colors cursor-pointer"
                >
                  Interactive Cultural Map
                </button>
                <button
                  type="button"
                  onClick={() => jumpTo('craft-quiz')}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold bg-[#FBF9F5] border border-[#DCD5C5] text-[#1E4D38] hover:bg-[#E3EAE1] transition-colors cursor-pointer"
                >
                  Craft Knowledge Quiz
                </button>
              </div>
            </div>
          </aside>

          {/* Main 13-Section Editorial Column */}
          <div className="lg:col-span-9 space-y-14">
            {EDUCATIONAL_SECTIONS.map((sec) => (
              <article
                key={sec.id}
                id={sec.id}
                className="scroll-mt-24 pb-12 border-b border-[#DCD5C5]"
              >
                {/* Section Header */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#525B50] mb-2">
                  <span className="font-mono tabular-nums text-[#1E4D38] font-medium">
                    Section {sec.number} of 13
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{sec.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{sec.readTime}</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E241E] tracking-tight">
                  {sec.title}
                </h2>
                <p className="mt-1.5 text-base font-serif italic text-[#525B50]">
                  {sec.subtitle}
                </p>

                {/* Lead Paragraph */}
                <p className="mt-5 text-base text-[#1E241E] leading-relaxed max-w-prose">
                  {sec.leadParagraph}
                </p>

                {/* Section Photograph (when present) */}
                {sec.imageUrl && (
                  <figure className="mt-6">
                    <div className="aspect-[16/9] max-h-[400px] w-full rounded-xl overflow-hidden border border-[#DCD5C5] bg-[#E3EAE1]">
                      <ResilientImage
                        src={sec.imageUrl}
                        alt={sec.imageCaption || sec.title}
                        fallbackTitle={sec.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {sec.imageCaption && (
                      <figcaption className="mt-2 text-xs font-serif italic text-[#525B50]">
                        {sec.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}

                {/* Diagram / Interactive Module (when present) */}
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

                {/* Subsections */}
                <div className="mt-6 space-y-5 max-w-prose">
                  {sec.subsections.map((sub) => (
                    <div key={sub.subheading}>
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#1E241E] mb-2">
                        {sub.subheading}
                      </h3>
                      <div className="space-y-3">
                        {sub.paragraphs.map((p, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-sm sm:text-[15px] text-[#1E241E]/90 leading-[1.75]"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                      {sub.practicalExample && (
                        <div className="mt-3 p-4 rounded-lg bg-[#E3EAE1]/60 border border-[#DCD5C5]">
                          <p className="text-xs font-mono uppercase tracking-wider text-[#1E4D38] mb-1">
                            Practical Field Note
                          </p>
                          <p className="text-xs sm:text-sm text-[#1E241E] leading-relaxed">
                            {sub.practicalExample}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Cultural Note */}
                {sec.culturalNote && (
                  <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#F3EFE6] border border-[#DCD5C5] max-w-prose">
                    <p className="text-sm font-semibold text-[#1E241E]">
                      {sec.culturalNote.title}
                    </p>
                    <p className="text-xs sm:text-sm text-[#525B50] mt-1 leading-relaxed">
                      {sec.culturalNote.body}
                    </p>
                  </div>
                )}

                {/* Key Indonesian Terminology Table */}
                {sec.keyTerms.length > 0 && (
                  <div className="mt-6">
                    <p className="font-mono text-xs uppercase tracking-wider text-[#525B50] mb-2.5">
                      Indonesian &amp; Regional Terminology
                    </p>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sec.keyTerms.map((term) => (
                        <div
                          key={term.term}
                          className="p-3.5 rounded-lg bg-[#F3EFE6]/75 border border-[#DCD5C5]"
                        >
                          <dt className="text-sm font-semibold text-[#1E241E]">
                            {term.term}{' '}
                            <span className="text-xs font-normal text-[#525B50]">
                              ({term.origin})
                            </span>
                          </dt>
                          <dd className="text-xs text-[#525B50] mt-1 leading-relaxed">
                            {term.definition}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Contextual Action Link for Step-by-Step Tutorials section */}
                {sec.id === 'step-by-step-tutorials' && (
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => onNavigate('tutorials')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1E4D38] rounded-lg hover:bg-[#163B2A] transition-colors cursor-pointer"
                    >
                      <span>Open Interactive Tutorials Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('studio')}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-[#1E241E] bg-[#F3EFE6] border border-[#DCD5C5] rounded-lg hover:bg-[#E3EAE1] transition-colors cursor-pointer"
                    >
                      <span>Practice in 3D Ketupat Studio</span>
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

            {/* Link to Sources & References */}
            <div className="p-6 rounded-xl bg-[#F3EFE6] border border-[#DCD5C5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#1E241E]">
                  Sources &amp; Cultural References
                </h3>
                <p className="text-xs sm:text-sm text-[#525B50] mt-0.5">
                  Review Indonesian institutional registries, dictionaries, and ethnobotanical publications cited across this exhibition.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('about', 'sources-references')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#1E4D38] rounded-lg hover:bg-[#163B2A] transition-colors shrink-0 cursor-pointer"
              >
                <span>View References</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
