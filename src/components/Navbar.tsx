import React, { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';
import { PageId } from '../types/janur';

interface NavbarProps {
  activePage: PageId;
  onNavigate: (page: PageId, anchorId?: string) => void;
  onOpenSearch: () => void;
}

const NAV_ITEMS: { id: PageId; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'explore', label: 'Explore Janur' },
  { id: 'tutorials', label: 'Craft Tutorials' },
  { id: 'studio', label: 'Interactive Craft Studio' },
  { id: 'gallery', label: 'Craft Gallery' },
  { id: 'about', label: 'About JanurCraft' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenSearch,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (page: PageId) => {
    setMobileOpen(false);
    onNavigate(page);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 border-b border-[#DCD5C5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="font-serif text-2xl font-semibold tracking-tight text-[#1E241E] hover:text-[#1E4D38] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          JanurCraft
        </button>

        {/* Zone 2: Single-line Text Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#525B50]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                className={`relative py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'text-[#1E4D38] font-semibold'
                    : 'hover:text-[#1E241E]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E4D38]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action (Global Search) + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#1E241E] bg-[#F3EFE6] border border-[#DCD5C5] rounded-lg hover:bg-[#E3EAE1] hover:border-[#5E7D63] transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            aria-label="Open global search"
          >
            <Search className="w-3.5 h-3.5 text-[#1E4D38]" strokeWidth={2} />
            <span>Search</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#DCD5C5] bg-[#F3EFE6] text-[#1E241E] hover:bg-[#E3EAE1] transition-colors cursor-pointer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-[#DCD5C5] bg-[#FBF9F5] px-4 py-3 space-y-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLinkClick(item.id)}
                className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-[#E3EAE1] text-[#1E4D38] font-semibold'
                    : 'text-[#1E241E] hover:bg-[#F3EFE6]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};
