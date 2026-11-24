import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Compass, Image as ImageIcon, Search, Sparkles, Wrench, X } from 'lucide-react';
import { EDUCATIONAL_SECTIONS } from '../data/educationalSections';
import { GALLERY_ITEMS, REGIONAL_TRADITIONS } from '../data/galleryAndRegions';
import { CRAFT_TUTORIALS } from '../data/tutorialsAndQuiz';
import { PageId } from '../types/janur';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, anchorId?: string, extraId?: string) => void;
}

interface SearchRecord {
  id: string;
  title: string;
  subtitle: string;
  kind: 'Education' | 'Gallery' | 'Region' | 'Tutorial' | '3D Studio';
  page: PageId;
  anchorId?: string;
  extraId?: string;
  searchBlob: string;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  const allRecords = useMemo<SearchRecord[]>(() => {
    const list: SearchRecord[] = [
      {
        id: 'studio-ketupat',
        title: 'Guided 3D Ketupat Weaving Studio',
        subtitle: 'Interactive 6-stage Three.js simulation of material prep, coiling, weaving & shaping',
        kind: '3D Studio',
        page: 'studio',
        searchBlob: '3d studio ketupat weaving simulation interactive stages orbit zoom',
      },
      {
        id: 'cultural-map',
        title: 'Indonesian Cultural Map of Janur Traditions',
        subtitle: 'Explore documented traditions across Bali, Java, Sumatra, Kalimantan & Sulawesi',
        kind: 'Region',
        page: 'explore',
        anchorId: 'cultural-map',
        searchBlob: 'map indonesia regions bali java sumatra sulawesi kalimantan',
      },
      {
        id: 'knowledge-quiz',
        title: 'Craft Knowledge Quiz',
        subtitle: '8-question assessment covering botany, cultural symbolism & weaving craft',
        kind: 'Education',
        page: 'explore',
        anchorId: 'craft-quiz',
        searchBlob: 'quiz test questions score craft knowledge assessment',
      },
    ];

    EDUCATIONAL_SECTIONS.forEach((sec) => {
      const termsText = sec.keyTerms.map((t) => `${t.term} ${t.definition}`).join(' ');
      const subsText = sec.subsections
        .map((s) => `${s.subheading} ${s.paragraphs.join(' ')}`)
        .join(' ');
      list.push({
        id: `edu-${sec.id}`,
        title: `${sec.number}. ${sec.title}`,
        subtitle: sec.subtitle,
        kind: 'Education',
        page: 'explore',
        anchorId: sec.id,
        searchBlob: `${sec.title} ${sec.subtitle} ${sec.leadParagraph} ${termsText} ${subsText}`.toLowerCase(),
      });
    });

    GALLERY_ITEMS.forEach((item) => {
      list.push({
        id: `gal-${item.id}`,
        title: item.title,
        subtitle: `${item.indonesianName} · ${item.region}`,
        kind: 'Gallery',
        page: 'gallery',
        extraId: item.id,
        searchBlob: `${item.title} ${item.indonesianName} ${item.category} ${item.region} ${item.description} ${item.culturalBackground}`.toLowerCase(),
      });
    });

    REGIONAL_TRADITIONS.forEach((reg) => {
      list.push({
        id: `reg-${reg.id}`,
        title: `${reg.regionName} (${reg.provinceOrIsland})`,
        subtitle: reg.signatureCrafts.join(', '),
        kind: 'Region',
        page: 'explore',
        anchorId: 'cultural-map',
        extraId: reg.id,
        searchBlob: `${reg.regionName} ${reg.provinceOrIsland} ${reg.signatureCrafts.join(' ')} ${reg.localTerminology} ${reg.summary} ${reg.culturalContext}`.toLowerCase(),
      });
    });

    CRAFT_TUTORIALS.forEach((tut) => {
      list.push({
        id: `tut-${tut.id}`,
        title: tut.title,
        subtitle: `${tut.indonesianTitle} · ${tut.level} · ${tut.duration}`,
        kind: 'Tutorial',
        page: 'tutorials',
        extraId: tut.id,
        searchBlob: `${tut.title} ${tut.indonesianTitle} ${tut.summary} ${tut.materials.join(' ')} ${tut.tools.join(' ')}`.toLowerCase(),
      });
    });

    return list;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allRecords.slice(0, 8);
    return allRecords.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.subtitle.toLowerCase().includes(q) ||
        r.searchBlob.includes(q)
    );
  }, [allRecords, query]);

  if (!isOpen) return null;

  const getKindIcon = (kind: SearchRecord['kind']) => {
    switch (kind) {
      case 'Education':
        return <BookOpen className="w-4 h-4 text-[#1E4D38]" />;
      case 'Gallery':
        return <ImageIcon className="w-4 h-4 text-[#1E4D38]" />;
      case 'Region':
        return <Compass className="w-4 h-4 text-[#1E4D38]" />;
      case 'Tutorial':
        return <Wrench className="w-4 h-4 text-[#1E4D38]" />;
      case '3D Studio':
        return <Sparkles className="w-4 h-4 text-[#1E4D38]" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#1E241E]/55 px-4 pt-16 sm:pt-24 pb-8"
      role="dialog"
      aria-modal="true"
      aria-label="Global archive search"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FBF9F5] border border-[#DCD5C5] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#DCD5C5] bg-[#F3EFE6]">
          <Search className="w-4 h-4 text-[#525B50] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 13 chapters, ketupat, penjor, Bali, tutorials, lidi..."
            className="w-full bg-transparent text-sm text-[#1E241E] placeholder-[#525B50] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#525B50] hover:text-[#1E241E] hover:bg-[#E8E2D5] transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#E8E2D5]">
          {results.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="font-serif text-xl text-[#1E241E] mb-1">No matching archive entries</p>
              <p className="text-sm text-[#525B50]">
                Try searching for terms such as &ldquo;ketupat&rdquo;, &ldquo;Bali&rdquo;, &ldquo;lidi&rdquo;, &ldquo;Kembar Mayang&rdquo;, or &ldquo;sustainability&rdquo;.
              </p>
            </div>
          ) : (
            results.map((rec) => (
              <button
                key={rec.id}
                type="button"
                onClick={() => {
                  onNavigate(rec.page, rec.anchorId, rec.extraId);
                  onClose();
                }}
                className="w-full text-left px-5 py-3.5 hover:bg-[#F3EFE6] transition-colors flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 p-2 rounded-lg bg-[#E3EAE1] shrink-0">
                    {getKindIcon(rec.kind)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[#525B50] mb-0.5">
                      <span className="font-medium text-[#1E4D38]">{rec.kind}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#1E241E] truncate">{rec.title}</p>
                    <p className="text-xs text-[#525B50] line-clamp-1">{rec.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#525B50] shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
