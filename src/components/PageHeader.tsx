import React from 'react';
import { ChevronRight } from 'lucide-react';
import { PageId } from '../types/janur';

interface PageHeaderProps {
  kicker: string;
  title: string;
  description: string;
  currentPageLabel: string;
  onNavigateHome: () => void;
  action?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  kicker,
  title,
  description,
  currentPageLabel,
  onNavigateHome,
}) => {
  return (
    <section className="border-b border-[#DCD5C5] bg-[#F3EFE6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#525B50] mb-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-[#1E4D38] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          <span className="text-[#1E241E] font-medium">{currentPageLabel}</span>
        </nav>

        <p className="font-mono text-xs uppercase tracking-widest text-[#525B50] mb-2">
          {kicker}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-[#1E241E] tracking-tight max-w-3xl">
          {title}
        </h1>
        <p className="mt-3 text-base text-[#525B50] max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
};
