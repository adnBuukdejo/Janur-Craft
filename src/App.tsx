/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { PageId } from './types/janur';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { ExploreJanurPage } from './pages/ExploreJanurPage';
import { TutorialsPage } from './pages/TutorialsPage';
import { StudioPage } from './pages/StudioPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';

const VALID_PAGES: PageId[] = [
  'home',
  'explore',
  'tutorials',
  'studio',
  'gallery',
  'about',
];

function parseHashRoute(): { page: PageId; anchor?: string } {
  const raw = window.location.hash.replace(/^#\/?/, '');
  if (!raw) return { page: 'home' };
  const [pagePart, anchorPart] = raw.split('#');
  const page = VALID_PAGES.includes(pagePart as PageId)
    ? (pagePart as PageId)
    : 'home';
  return { page, anchor: anchorPart };
}

export default function App() {
  const initial = parseHashRoute();
  const [activePage, setActivePage] = useState<PageId>(initial.page);
  const [scrollTarget, setScrollTarget] = useState<string | undefined>(initial.anchor);
  const [extraTarget, setExtraTarget] = useState<string | undefined>(undefined);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      const parsed = parseHashRoute();
      setActivePage(parsed.page);
      setScrollTarget(parsed.anchor);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (page: PageId, anchorId?: string, extraId?: string) => {
    setActivePage(page);
    setScrollTarget(anchorId);
    setExtraTarget(extraId);

    const nextHash = page === 'home' ? '#/' : `#/${page}${anchorId ? `#${anchorId}` : ''}`;
    if (window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    }

    if (!anchorId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBF6] text-[#132219]">
      <Navbar
        activePage={activePage}
        onNavigate={(page, anchor) => handleNavigate(page, anchor)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <main className="flex-1">
        {activePage === 'home' && <HomePage onNavigate={handleNavigate} />}
        {activePage === 'explore' && (
          <ExploreJanurPage
            scrollTarget={scrollTarget}
            selectedRegionId={extraTarget}
            onNavigate={(p, a) => handleNavigate(p, a)}
          />
        )}
        {activePage === 'tutorials' && (
          <TutorialsPage
            initialTutorialId={extraTarget}
            onNavigate={(p, a) => handleNavigate(p, a)}
          />
        )}
        {activePage === 'studio' && (
          <StudioPage onNavigate={(p, a) => handleNavigate(p, a)} />
        )}
        {activePage === 'gallery' && (
          <GalleryPage
            initialItemId={extraTarget}
            onNavigate={(p, a) => handleNavigate(p, a)}
          />
        )}
        {activePage === 'about' && (
          <AboutPage onNavigate={(p, a) => handleNavigate(p, a)} />
        )}
      </main>

      <Footer onNavigate={(p, a) => handleNavigate(p, a)} />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
