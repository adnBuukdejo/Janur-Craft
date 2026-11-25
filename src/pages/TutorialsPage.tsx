import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckSquare, Square } from 'lucide-react';
import { CRAFT_TUTORIALS } from '../data/tutorialsAndQuiz';
import { PageId } from '../types/janur';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';
import { TutorialSchematicSVG } from '../components/EducationalDiagrams';
import { StepIllustration } from '../components/StepIllustration';

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
        kicker="Craft Tutorials · Easy Step-by-Step Guides"
        title="Learn to Make Janur Crafts"
        description="Follow simple, clear steps with visual guides for every move. No coconut trees nearby? You can practice any of these crafts with 2.5 cm wide gift ribbon or flexible paper strips!"
        currentPageLabel="Craft Tutorials"
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Tutorial Selector Tabs */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-[#C3D6C1]">
          {CRAFT_TUTORIALS.map((tut) => {
            const active = tut.id === activeTutorial.id;
            return (
              <button
                key={tut.id}
                type="button"
                onClick={() => setSelectedId(tut.id)}
                className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#17422B] text-white border-[#17422B]'
                    : 'bg-[#EDF4EC] text-[#15221B] border-[#C3D6C1] hover:bg-[#DCEAD9]'
                }`}
              >
                {tut.title}
              </button>
            );
          })}
        </div>

        {/* Tutorial Title & Overview */}
        <div className="mt-8 pb-6 border-b border-[#C3D6C1] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-xs text-[#3A7D44] font-medium mb-1">
              <span>{activeTutorial.level}</span>
              <span aria-hidden="true"> · </span>
              <span>{activeTutorial.duration}</span>
              <span aria-hidden="true"> · </span>
              <span>{activeTutorial.leafCount}</span>
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#15221B]">
              {activeTutorial.title}
            </h2>
            <p className="text-sm font-serif italic text-[#455B4E] mt-0.5">
              Indonesian name: {activeTutorial.indonesianTitle}
            </p>
            <p className="mt-2.5 text-sm sm:text-base text-[#15221B] max-w-2xl leading-relaxed">
              {activeTutorial.summary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <span className="font-mono text-xs tabular-nums text-[#17422B] bg-[#EDF4EC] border border-[#C3D6C1] px-3 py-2 rounded-lg">
              {completedCount} / {activeTutorial.steps.length} steps done
            </span>
            {activeTutorial.id === 'ketupat-bawang' && (
              <button
                type="button"
                onClick={() => onNavigate('studio')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#17422B] rounded-lg hover:bg-[#10311F] transition-colors cursor-pointer"
              >
                <span>Practice in Craft Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Organized 5-Part Tutorial Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 1. What You Need, 2. Before You Start, 4. Visual Guide, 5. Finished Craft */}
          <div className="lg:col-span-5 space-y-6">
            {/* 1. What You Need */}
            <section className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-5 space-y-4">
              <h3 className="font-serif text-2xl font-semibold text-[#15221B]">
                1. What You Need
              </h3>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-[#3A7D44] mb-1.5">
                  Materials
                </p>
                <ul className="space-y-1.5 text-sm text-[#15221B]">
                  {activeTutorial.whatYouNeed.materials.map((m) => (
                    <li key={m} className="leading-relaxed">
                      • {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-[#C3D6C1]">
                <p className="font-mono text-xs uppercase tracking-wider text-[#3A7D44] mb-1.5">
                  Tools
                </p>
                <ul className="space-y-1.5 text-sm text-[#15221B]">
                  {activeTutorial.whatYouNeed.tools.map((tool) => (
                    <li key={tool} className="leading-relaxed">
                      • {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 2. Before You Start */}
            <section className="bg-[#F7FAF6] border border-[#C3D6C1] rounded-xl p-5 space-y-2.5">
              <h3 className="font-serif text-2xl font-semibold text-[#15221B]">
                2. Before You Start
              </h3>
              <ul className="space-y-2 text-sm text-[#455B4E]">
                {activeTutorial.beforeYouStart.map((note) => (
                  <li key={note} className="leading-relaxed">
                    • {note}
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Visual Guide */}
            <section className="space-y-2.5">
              <h3 className="font-serif text-2xl font-semibold text-[#15221B]">
                4. Visual Guide
              </h3>
              <TutorialSchematicSVG type={activeTutorial.diagramType} />
              <p className="text-xs text-[#455B4E] leading-relaxed">
                {activeTutorial.visualGuideCaption}
              </p>
            </section>

            {/* 5. Finished Craft */}
            <section className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl overflow-hidden">
              <div className="aspect-[4/3] w-full bg-[#DCEAD9]">
                <ResilientImage
                  src={activeTutorial.imageUrl}
                  alt={`Finished ${activeTutorial.title}`}
                  fallbackTitle={activeTutorial.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-serif text-2xl font-semibold text-[#15221B]">
                  5. Finished Craft
                </h3>
                <p className="text-sm text-[#455B4E] leading-relaxed">
                  {activeTutorial.finishedCraftNote}
                </p>
              </div>
            </section>
          </div>

          {/* Right Column: 3. Step-by-Step Instructions with per-step illustrations */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#15221B]">
              3. Step-by-Step Instructions
            </h3>

            {activeTutorial.steps.map((step) => {
              const isDone = !!completedSteps[`${activeTutorial.id}-${step.stepNumber}`];
              return (
                <div
                  key={step.stepNumber}
                  className={`rounded-xl border p-4 sm:p-5 transition-colors flex flex-col sm:flex-row gap-4 items-start ${
                    isDone
                      ? 'bg-[#DCEAD9]/70 border-[#3A7D44]'
                      : 'bg-[#F7FAF6] border-[#C3D6C1]'
                  }`}
                >
                  <StepIllustration
                    visualType={step.visualType}
                    alt={`Illustration for Step ${step.stepNumber}: ${step.title}`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-xl font-semibold text-[#15221B]">
                        <span className="font-mono text-sm text-[#3A7D44] mr-2 tabular-nums">
                          0{step.stepNumber}.
                        </span>
                        {step.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => toggleStep(activeTutorial.id, step.stepNumber)}
                        aria-label={`Mark step ${step.stepNumber} as ${isDone ? 'not done' : 'done'}`}
                        className="text-[#17422B] cursor-pointer shrink-0 p-1"
                      >
                        {isDone ? (
                          <CheckSquare className="w-5 h-5" />
                        ) : (
                          <Square className="w-5 h-5 text-[#455B4E]" />
                        )}
                      </button>
                    </div>

                    <p className="mt-1.5 text-sm text-[#15221B]/90 leading-relaxed">
                      {step.instruction}
                    </p>

                    {step.tip && (
                      <p className="mt-2.5 text-xs text-[#15221B] bg-[#EDF4EC] border border-[#C3D6C1] rounded-lg px-3 py-2">
                        <strong className="text-[#17422B]">Helpful Tip:</strong> {step.tip}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
