import React from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { PageId } from '../types/janur';
import { PageHeader } from '../components/PageHeader';
import { KetupatCraftStudio } from '../components/KetupatCraftStudio';

interface StudioPageProps {
  onNavigate: (page: PageId, anchorId?: string) => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onNavigate }) => {
  return (
    <div>
      <PageHeader
        kicker="Interactive Craft Studio · Hands-On Weaving"
        title="Make Your Own Ketupat"
        description="Instead of just watching, try crafting a traditional Indonesian ketupat yourself! Drag green young coconut leaves onto the mat, split the center stick, rotate strips, weave them Over and Under, and tighten the woven diamond."
        currentPageLabel="Interactive Craft Studio"
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <KetupatCraftStudio />

        <div className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#15221B]">
              Want to Try Making One With Real Leaves or Ribbon?
            </h2>
            <p className="text-sm text-[#455B4E] mt-1">
              Check out our Craft Tutorials for printable-friendly step guides, or learn why Over–Under weaving works in Section 10.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('tutorials')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#17422B] bg-[#F7FAF6] border border-[#C3D6C1] rounded-lg hover:bg-[#DCEAD9] transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open Craft Tutorials</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('explore', 'interactive-craft-visualization')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#17422B] rounded-lg hover:bg-[#10311F] transition-colors cursor-pointer"
            >
              <span>Explore Weave Logic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
