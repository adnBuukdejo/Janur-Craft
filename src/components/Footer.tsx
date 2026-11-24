import React from 'react';
import { PageId } from '../types/janur';

interface FooterProps {
  onNavigate: (page: PageId, anchorId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#DCD5C5] bg-[#F3EFE6] text-[#1E241E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#DCD5C5]">
          <div className="md:col-span-5 space-y-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-serif text-2xl font-semibold text-[#1E241E] hover:text-[#1E4D38] transition-colors cursor-pointer"
            >
              JanurCraft
            </button>
            <p className="text-sm font-serif italic text-[#525B50]">
              Where Tradition Meets Creativity.
            </p>
            <p className="text-xs text-[#525B50] max-w-md leading-relaxed">
              An international digital cultural learning platform dedicated to documenting the botany, regional heritage, weaving geometry, and sustainable future of Indonesian young coconut leaf craft.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#525B50]">
              Exhibition Wings
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="hover:text-[#1E4D38] transition-colors cursor-pointer"
                >
                  Explore Janur (13 Chapters)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tutorials')}
                  className="hover:text-[#1E4D38] transition-colors cursor-pointer"
                >
                  Craft Tutorials
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('studio')}
                  className="hover:text-[#1E4D38] transition-colors cursor-pointer"
                >
                  Interactive Craft Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#1E4D38] transition-colors cursor-pointer"
                >
                  Craft Gallery
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#525B50]">
              Interactive Highlights
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore', 'cultural-map')}
                  className="hover:text-[#1E4D38] transition-colors cursor-pointer"
                >
                  Indonesian Cultural Map
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore', 'craft-quiz')}
                  className="hover:text-[#1E4D38] transition-colors cursor-pointer"
                >
                  Craft Knowledge Quiz
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#1E4D38] transition-colors cursor-pointer"
                >
                  About JanurCraft &amp; References
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#525B50]">
          <p>
            JanurCraft Cultural Archive — Open Educational Resource on Indonesian Coconut-Leaf Heritage.
          </p>
          <p>
            No visitor registration required · Privacy-first educational platform
          </p>
        </div>
      </div>
    </footer>
  );
};
