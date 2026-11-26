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
  kind: 'Learn' | 'Gallery' | 'Region' | 'Tutorial' | 'Craft Studio';
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
        title: 'Interactive Craft Studio (Make a Ketupat)',
        subtitle: 'Hands-on table: cut the coconut leaf, fold loops, weave over & under, and pull tight',
        kind: 'Craft Studio',
        page: 'studio',
        searchBlob: 'craft studio ketupat weaving drag drop cut scissors fold rotate over under',
      },
      {
        id: 'cultural-map',
        title: 'Indonesian Cultural Map',
        subtitle: 'Click Bali, Java, Sumatra, Kalimantan & Sulawesi to see local leaf crafts',
        kind: 'Region',
        page: 'explore',
        anchorId: 'cultural-map',
        searchBlob: 'map indonesia regions bali java sumatra sulawesi kalimantan',
      },
      {
        id: 'knowledge-quiz',
        title: 'Craft Knowledge Quiz',
        subtitle: '8 easy questions about janur leaves, holidays, and weaving',
        kind: 'Learn',
        page: 'explore',
        anchorId: 'craft-quiz',
        searchBlob: 'quiz test questions score craft knowledge',
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
        kind: 'Learn',
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
        searchBlob: `${tut.title} ${tut.indonesianTitle} ${tut.summary} ${tut.whatYouNeed.materials.join(' ')} ${tut.whatYouNeed.tools.join(' ')}`.toLowerCase(),
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
      case 'Learn':
        return <BookOpen className="w-4 h-4 text-[#143D28]" />;
      case 'Gallery':
        return <ImageIcon className="w-4 h-4 text-[#143D28]" />;
      case 'Region':
        return <Compass className="w-4 h-4 text-[#143D28]" />;
      case 'Tutorial':
        return <Wrench className="w-4 h-4 text-[#143D28]" />;
      case 'Craft Studio':
        return <Sparkles className="w-4 h-4 text-[#143D28]" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#132219]/55 px-4 pt-16 sm:pt-24 pb-8"
      role="dialog"
      aria-modal="true"
      aria-label="Website search"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FAFBF6] border border-[#B5D2AF] rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#B5D2AF] bg-[#E8F5E9]">
          <Search className="w-4 h-4 text-[#0F764A] shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ketupat, penjor, Bali, tutorials, lidi..."
            className="w-full bg-transparent text-sm text-[#132219] placeholder-[#3F5749] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#3F5749] hover:text-[#132219] hover:bg-[#CFE4CA] transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#CFE4CA]">
          {results.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="font-serif text-xl text-[#132219] mb-1">No matching results found</p>
              <p className="text-sm text-[#3F5749]">
                Try words like &ldquo;ketupat&rdquo;, &ldquo;Bali&rdquo;, &ldquo;lidi&rdquo;, &ldquo;Kembar Mayang&rdquo;, or &ldquo;scissors&rdquo;.
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
                className="w-full text-left px-5 py-3.5 hover:bg-[#E8F5E9] transition-colors flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div className="mt-0.5 p-2 rounded-lg bg-[#CFE4CA] shrink-0">
                    {getKindIcon(rec.kind)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-[#3F5749] mb-0.5">
                      <span className="font-semibold text-[#0F764A]">{rec.kind}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#132219] truncate">{rec.title}</p>
                    <p className="text-xs text-[#3F5749] line-clamp-1">{rec.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#3F5749] shrink-0" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
