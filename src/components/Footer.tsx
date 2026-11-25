import React from 'react';
import { PageId } from '../types/janur';

interface FooterProps {
  onNavigate: (page: PageId, anchorId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#C3D6C1] bg-[#17422B] text-[#F7FAF6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#2C6143]">
          <div className="md:col-span-5 space-y-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="font-serif text-2xl font-semibold text-[#F7FAF6] hover:text-[#C7DEC9] transition-colors cursor-pointer"
            >
              JanurCraft
            </button>
            <p className="text-sm font-serif italic text-[#C7DEC9]">
              Where Tradition Meets Creativity.
            </p>
            <p className="text-xs text-[#DCEAD9] max-w-md leading-relaxed">
              A student-built cultural learning website created to share the beauty, craft skills, and traditions of Indonesian young coconut leaf art with visitors around the world.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#C7DEC9]">
              Explore Pages
            </h2>
            <ul className="space-y-2 text-sm text-[#EDF4EC]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Explore Janur (13 Topics)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('tutorials')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Craft Tutorials
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('studio')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Interactive Craft Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Craft Gallery
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5">
            <h2 className="font-mono text-xs uppercase tracking-widest text-[#C7DEC9]">
              Interactive Features
            </h2>
            <ul className="space-y-2 text-sm text-[#EDF4EC]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore', 'cultural-map')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Indonesian Cultural Map
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('explore', 'craft-quiz')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  Craft Knowledge Quiz
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white hover:underline transition-colors cursor-pointer"
                >
                  About JanurCraft &amp; Sources
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#C7DEC9]">
          <p>
            JanurCraft — Sharing Indonesian Coconut-Leaf Craft Heritage with the World.
          </p>
          <p>
            Free to explore · No login needed
          </p>
        </div>
      </div>
    </footer>
  );
};
