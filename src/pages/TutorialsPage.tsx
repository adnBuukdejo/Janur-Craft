import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckSquare, Square } from 'lucide-react';
import { CRAFT_TUTORIALS } from '../data/tutorialsAndQuiz';
import { PageId } from '../types/janur';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';
import { TutorialSchematicSVG } from '../components/EducationalDiagrams';

interface TutorialsPageProps {
  initialTutorialId?: string;
  onNavigate: (page: PageId, anchorId?: string) => void;
}

export const TutorialsPage: React.FC<TutorialsPageProps> = ({
  initialTutorialId,
  onNavigate,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialTutorialId || CRAFT_TUTORIALS[0].id
  );
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialTutorialId && CRAFT_TUTORIALS.some((t) => t.id === initialTutorialId)) {
      setSelectedId(initialTutorialId);
    }
  }, [initialTutorialId]);

  const activeTutorial =
    CRAFT_TUTORIALS.find((t) => t.id === selectedId) || CRAFT_TUTORIALS[0];

  const toggleStep = (tutorialId: string, stepNum: number) => {
    const key = `${tutorialId}-${stepNum}`;
    setCompletedSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedCount = activeTutorial.steps.filter(
    (s) => completedSteps[`${activeTutorial.id}-${s.stepNumber}`]
  ).length;

  return (
    <div>
      <PageHeader
        kicker="Craft Tutorials · Hands-On Guides"
        title="Step-by-Step Janur Weaving"
        description="Follow structured instructions from leaf stripping and coil formation to finished traditional and folk creations. Outside tropical regions, you may practice with 2.5 cm satin ribbon or flexible cardstock strips."
        currentPageLabel="Craft Tutorials"
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Tutorial Selector Tabs */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-[#DCD5C5]">
          {CRAFT_TUTORIALS.map((tut) => {
            const active = tut.id === activeTutorial.id;
            return (
              <button
                key={tut.id}
                type="button"
                onClick={() => setSelectedId(tut.id)}
                className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#1E4D38] text-white border-[#1E4D38]'
                    : 'bg-[#F3EFE6] text-[#1E241E] border-[#DCD5C5] hover:bg-[#E3EAE1]'
                }`}
              >
                {tut.title}
              </button>
            );
          })}
        </div>

        {/* Active Tutorial Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Photo, Schematic & Materials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl overflow-hidden border border-[#DCD5C5] bg-[#E3EAE1] aspect-[4/3]">
              <ResilientImage
                src={activeTutorial.imageUrl}
                alt={activeTutorial.title}
                fallbackTitle={activeTutorial.title}
                className="w-full h-full object-cover"
              />
            </div>

            <TutorialSchematicSVG type={activeTutorial.diagramType} />

            <div className="bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-5 space-y-4">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#525B50] mb-2">
                  Materials Needed
                </h3>
                <ul className="space-y-1.5 text-sm text-[#1E241E]">
                  {activeTutorial.materials.map((m) => (
                    <li key={m} className="leading-relaxed">
                      • {m}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#DCD5C5]">
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#525B50] mb-2">
                  Tools Needed
                </h3>
                <ul className="space-y-1.5 text-sm text-[#1E241E]">
                  {activeTutorial.tools.map((tool) => (
                    <li key={tool} className="leading-relaxed">
                      • {tool}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[#DCD5C5]">
                <p className="text-xs text-[#525B50] leading-relaxed">
                  <strong className="text-[#1E241E]">Cultural Context: </strong>
                  {activeTutorial.culturalUse}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Step Checklist */}
          <div className="lg:col-span-7 space-y-6">
            <div className="pb-5 border-b border-[#DCD5C5]">
              <p className="text-xs text-[#525B50] mb-1">
                <span>{activeTutorial.level}</span>
                <span aria-hidden="true"> · </span>
                <span>{activeTutorial.duration}</span>
                <span aria-hidden="true"> · </span>
                <span>{activeTutorial.leafCount}</span>
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#1E241E]">
                {activeTutorial.title}
              </h2>
              <p className="text-sm font-serif italic text-[#525B50] mt-0.5">
                {activeTutorial.indonesianTitle}
              </p>
              <p className="mt-3 text-sm sm:text-base text-[#1E241E] leading-relaxed">
                {activeTutorial.summary}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-xs tabular-nums text-[#1E4D38]">
                  Progress: {completedCount} / {activeTutorial.steps.length} steps checked
                </span>
                {activeTutorial.id === 'ketupat-bawang' && (
                  <button
                    type="button"
                    onClick={() => onNavigate('studio')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1E4D38] rounded-lg hover:bg-[#163B2A] transition-colors cursor-pointer"
                  >
                    <span>Watch in 3D Ketupat Studio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {activeTutorial.steps.map((step) => {
                const isDone = !!completedSteps[`${activeTutorial.id}-${step.stepNumber}`];
                return (
                  <div
                    key={step.stepNumber}
                    className={`rounded-xl border p-5 transition-colors ${
                      isDone
                        ? 'bg-[#E3EAE1]/60 border-[#5E7D63]'
                        : 'bg-[#FBF9F5] border-[#DCD5C5]'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        type="button"
                        onClick={() => toggleStep(activeTutorial.id, step.stepNumber)}
                        aria-label={`Mark step ${step.stepNumber} as ${isDone ? 'incomplete' : 'complete'}`}
                        className="mt-0.5 text-[#1E4D38] cursor-pointer shrink-0"
                      >
                        {isDone ? (
                          <CheckSquare className="w-5 h-5" />
                        ) : (
                          <Square className="w-5 h-5 text-[#525B50]" />
                        )}
                      </button>

                      <div className="flex-1">
                        <h3 className="font-serif text-xl font-semibold text-[#1E241E]">
                          <span className="font-mono text-sm text-[#1E4D38] mr-2 tabular-nums">
                            0{step.stepNumber}.
                          </span>
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-[#1E241E]/90 leading-relaxed">
                          {step.instruction}
                        </p>
                        {step.tip && (
                          <p className="mt-2.5 text-xs text-[#525B50] bg-[#F3EFE6] border border-[#DCD5C5] rounded-lg px-3 py-2">
                            <strong className="text-[#1E241E]">Artisan Tip:</strong> {step.tip}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
