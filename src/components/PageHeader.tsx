import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  kicker: string;
  title: string;
  description: string;
  currentPageLabel: string;
  onNavigateHome: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  kicker,
  title,
  description,
  currentPageLabel,
  onNavigateHome,
}) => {
  return (
    <section className="border-b border-[#B5D2AF] bg-gradient-to-b from-[#E8F5E9] to-[#E5F0E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-9 sm:py-11">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#3F5749] mb-3.5">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-[#0F764A] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-[#143D28] font-medium">{currentPageLabel}</span>
        </nav>

        <p className="font-mono text-xs uppercase tracking-widest text-[#0F764A] font-semibold mb-1.5">
          {kicker}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#132219] tracking-tight max-w-3xl">
          {title}
        </h1>
        <p className="mt-3 text-base text-[#3F5749] max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};
