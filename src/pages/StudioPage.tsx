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
        kicker="Interactive Craft Studio · Hands-On Table"
        title="Make Your Own Ketupat"
        description="Try making a traditional Indonesian ketupat right on this craft table! Drag a fresh coconut leaf onto the mat, slide the scissors to cut it into two strips, fold the loops, weave over and under, tuck the ends, and pull tight."
        currentPageLabel="Interactive Craft Studio"
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <KetupatCraftStudio />

        <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-[#132219]">
              Want to Try Weaving With Real Leaves or Ribbon?
            </h2>
            <p className="text-sm text-[#3F5749] mt-1">
              Read our easy Craft Tutorials with pictures, or check how Over–Under weaving works in Topic 10.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('tutorials')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium text-[#143D28] bg-[#FAFBF6] border border-[#B5D2AF] rounded-lg hover:bg-[#CFE4CA] transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open Craft Tutorials</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('explore', 'interactive-craft-visualization')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#143D28] rounded-lg hover:bg-[#0D2B1B] transition-colors cursor-pointer"
            >
              <span>See How Weave Locks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
