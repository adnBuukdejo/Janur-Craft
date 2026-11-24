import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { PageId } from '../types/janur';
import { PageHeader } from '../components/PageHeader';
import { KETUPAT_STAGES, KetupatStudio3D } from '../components/KetupatStudio3D';

interface StudioPageProps {
  onNavigate: (page: PageId, anchorId?: string) => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <PageHeader
        kicker="Interactive Craft Studio · Three.js 3D Simulation"
        title="Guided Ketupat Weaving Simulation"
        description="Inspect the geometric transformation of two young coconut leaf strands from raw frond preparation to a self-locking six-cornered Ketupat Bawang pouch. Drag to rotate 360°, scroll or tap buttons to zoom, and step through all six stages."
        currentPageLabel="Interactive Craft Studio"
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        {/* Main 3D Simulation Stage */}
        <KetupatStudio3D />

        {/* Companion Breakdown of the 6 Guided Stages */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#525B50] mb-1">
                Simulation Stage Reference
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E241E]">
                How the Six Stages Build Structural Lock
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onNavigate('tutorials')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#1E241E] bg-[#F3EFE6] border border-[#DCD5C5] rounded-lg hover:bg-[#E3EAE1] transition-colors cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#1E4D38]" />
                <span>Read Step-by-Step Tutorial</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('explore', 'interactive-craft-visualization')}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#1E4D38] rounded-lg hover:bg-[#163B2A] transition-colors cursor-pointer"
              >
                <span>Open 2D Weave Inspector</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {KETUPAT_STAGES.map((stage) => (
              <div
                key={stage.index}
                className="bg-[#F3EFE6]/70 border border-[#DCD5C5] rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-serif italic text-[#1E4D38] mb-1">
                    {stage.indonesianTerm}
                  </p>
                  <h3 className="font-serif text-xl font-semibold text-[#1E241E]">
                    {stage.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#525B50] mt-2 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
                <p className="mt-3 pt-3 border-t border-[#DCD5C5] text-xs text-[#1E241E]">
                  {stage.craftDetail}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-[#525B50] leading-relaxed max-w-3xl">
            Technical note: This real-time 3D visualization models the geometric progression of two continuous coconut-leaf ribbons across six keyframed spatial stages—from flat midrib separation through 3-loop coiling, alternating Over–Under interlacing, and final six-cornered diamond tightening—to make structural weaving logic clearly inspectable from every angle.
          </p>
        </section>
      </div>
    </div>
  );
};
