import React, { useEffect, useMemo, useState } from 'react';
import { Expand, MapPin, Search, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/galleryAndRegions';
import { GalleryCategory, GalleryItem, PageId } from '../types/janur';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';
import { KetupatDivider } from '../components/BotanicalDecorations';

interface GalleryPageProps {
  initialItemId?: string;
  onNavigate: (page: PageId, anchorId?: string) => void;
}

const CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'Ceremonial', label: 'Special Events' },
  { id: 'Culinary', label: 'Food' },
  { id: 'Offerings', label: 'Offerings' },
  { id: 'Contemporary', label: 'Modern' },
  { id: 'Technique', label: 'How-To' },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({
  initialItemId,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [filterText, setFilterText] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (initialItemId) {
      const match = GALLERY_ITEMS.find((i) => i.id === initialItemId);
      if (match) setSelectedItem(match);
    }
  }, [initialItemId]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedItem) setSelectedItem(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedItem]);

  const filteredItems = useMemo(() => {
    const q = filterText.trim().toLowerCase();
    return GALLERY_ITEMS.filter((item) => {
      const catMatch = activeCategory === 'All' || item.category === activeCategory;
      const textMatch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.indonesianName.toLowerCase().includes(q) ||
        item.region.toLowerCase().includes(q) ||
        item.whatItLooksLike.toLowerCase().includes(q) ||
        item.howItIsUsed.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [activeCategory, filterText]);

  const getCategoryLabel = (cat: GalleryItem['category']) =>
    CATEGORIES.find((c) => c.id === cat)?.label || cat;

  const getCategoryColor = (cat: GalleryItem['category']) => {
    switch (cat) {
      case 'Ceremonial':
        return 'text-[#B65236]';
      case 'Offerings':
        return 'text-[#C26019]';
      case 'Technique':
        return 'text-[#9C6F0A]';
      default:
        return 'text-[#0F764A]';
    }
  };

  return (
    <div className="bg-[#FAFBF6]">
      <PageHeader
        kicker="Craft Gallery · Photo Collection"
        title="Interactive Craft Gallery"
        description="Look at Indonesian janur crafts—from tall Balinese festival poles and wedding bouquets to diamond rice pouches, leaf toys, and eco-friendly lamps. Click any photo to learn more!"
        currentPageLabel="Craft Gallery"
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#B5D2AF]">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#143D28] text-white border-[#143D28]'
                      : 'bg-[#E8F5E9] text-[#132219] border-[#B5D2AF] hover:bg-[#FDF5DB] hover:border-[#E2B334]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#0F764A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search craft or island..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-[#E8F5E9] border border-[#B5D2AF] rounded-lg text-[#132219] placeholder-[#3F5749] focus:outline-none focus:border-[#0F764A]"
              aria-label="Filter gallery items"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl mt-8">
            <p className="font-serif text-2xl text-[#132219]">No matching photos found</p>
            <p className="text-sm text-[#3F5749] mt-1">
              Clear your search box or click &ldquo;All&rdquo; to see every photo.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setFilterText('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium bg-[#143D28] text-white rounded-lg cursor-pointer"
            >
              Show All Photos
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItem(item)}
                className={`group text-left border rounded-xl overflow-hidden hover:border-[#0F764A] transition-colors flex flex-col cursor-pointer ${
                  idx % 3 === 1
                    ? 'bg-[#FDF5DB]/65 border-[#E8D28C]'
                    : idx % 3 === 2
                    ? 'bg-[#FAEDE8]/65 border-[#E4B7AA]'
                    : 'bg-[#E8F5E9]/85 border-[#B5D2AF]'
                }`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#CFE4CA]">
                  <ResilientImage
                    src={item.imageUrl}
                    alt={item.title}
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <span className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#143D28]/85 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Expand className="w-4 h-4" />
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#3F5749] mb-1">
                      <span className={`font-semibold ${getCategoryColor(item.category)}`}>
                        {getCategoryLabel(item.category)}
                      </span>
                      <span className="font-mono tabular-nums">{item.accessionNumber}</span>
                    </div>
                    <h2 className="font-serif text-2xl font-semibold text-[#132219] group-hover:text-[#0F764A] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs font-serif italic text-[#0F764A] mt-0.5">
                      {item.indonesianName}
                    </p>
                    <p className="text-sm text-[#3F5749] mt-2 line-clamp-2 leading-relaxed">
                      {item.whatItLooksLike}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#B5D2AF] flex items-center gap-1.5 text-xs text-[#143D28] font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#DD7930]" />
                    <span className="truncate">{item.region}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        <KetupatDivider className="mt-12" />
      </div>

      {/* Expanded Lightbox Modal with exact 5-part beginner format */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#132219]/75 p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-4xl bg-[#FAFBF6] border border-[#B5D2AF] rounded-xl overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#B5D2AF] bg-gradient-to-r from-[#E8F5E9] to-[#FDF5DB]/80">
              <span className="font-mono text-xs tabular-nums text-[#0F764A] font-semibold">
                {selectedItem.accessionNumber} · {getCategoryLabel(selectedItem.category)}
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-lg text-[#3F5749] hover:text-[#132219] hover:bg-[#CFE4CA] transition-colors cursor-pointer"
                aria-label="Close photo view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-7 bg-[#CFE4CA] aspect-[4/3] md:aspect-auto">
                <ResilientImage
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fallbackTitle={selectedItem.title}
                  className="w-full h-full object-cover max-h-[520px]"
                />
              </div>

              <div className="md:col-span-5 p-6 space-y-3.5 overflow-y-auto max-h-[520px]">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#0F764A] font-semibold">
                    Craft Name
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#132219]">
                    {selectedItem.title}
                  </h3>
                  <p className="text-sm font-serif italic text-[#0F764A] mt-0.5">
                    {selectedItem.indonesianName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#132219]">Where It Comes From</p>
                  <p className="text-sm text-[#3F5749] mt-0.5">{selectedItem.region}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#132219]">What It Looks Like</p>
                  <p className="text-sm text-[#3F5749] mt-0.5 leading-relaxed">
                    {selectedItem.whatItLooksLike}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#132219]">How It Is Used</p>
                  <p className="text-sm text-[#3F5749] mt-0.5 leading-relaxed">
                    {selectedItem.howItIsUsed}
                  </p>
                </div>

                {selectedItem.interestingFact && (
                  <div className="p-3.5 rounded-lg bg-[#FDF5DB] border border-[#E8D28C]">
                    <p className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#B65236] mb-1">
                      One Interesting Fact
                    </p>
                    <p className="text-xs sm:text-sm text-[#132219] leading-relaxed">
                      {selectedItem.interestingFact}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
