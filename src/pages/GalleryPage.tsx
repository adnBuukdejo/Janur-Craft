import React, { useEffect, useMemo, useState } from 'react';
import { Expand, MapPin, Search, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/galleryAndRegions';
import { GalleryCategory, GalleryItem, PageId } from '../types/janur';
import { PageHeader } from '../components/PageHeader';
import { ResilientImage } from '../components/ResilientImage';

interface GalleryPageProps {
  initialItemId?: string;
  onNavigate: (page: PageId, anchorId?: string) => void;
}

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Ceremonial',
  'Culinary',
  'Offerings',
  'Contemporary',
  'Technique',
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
        item.description.toLowerCase().includes(q);
      return catMatch && textMatch;
    });
  }, [activeCategory, filterText]);

  return (
    <div>
      <PageHeader
        kicker="Visual Archive · Curated Specimen Grid"
        title="Interactive Craft Gallery"
        description="Explore curated photography of authentic Indonesian janur crafts across ceremonial architecture, daily devotional offerings, culinary vessels, and contemporary eco-design. Select any specimen to inspect its accession dossier."
        currentPageLabel="Craft Gallery"
        onNavigateHome={() => onNavigate('home')}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DCD5C5]">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#1E4D38] text-white border-[#1E4D38]'
                      : 'bg-[#F3EFE6] text-[#1E241E] border-[#DCD5C5] hover:bg-[#E3EAE1]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#525B50] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="search"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Filter by craft or region..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-[#F3EFE6] border border-[#DCD5C5] rounded-lg text-[#1E241E] placeholder-[#525B50] focus:outline-none focus:border-[#1E4D38]"
              aria-label="Filter gallery items"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl mt-8">
            <p className="font-serif text-2xl text-[#1E241E]">No gallery specimens found</p>
            <p className="text-sm text-[#525B50] mt-1">
              Try clearing your search filter or switching to &ldquo;All&rdquo; categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setFilterText('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium bg-[#1E4D38] text-white rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItem(item)}
                className="group text-left bg-[#F3EFE6]/60 border border-[#DCD5C5] rounded-xl overflow-hidden hover:border-[#5E7D63] transition-colors flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E3EAE1]">
                  <ResilientImage
                    src={item.imageUrl}
                    alt={item.title}
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  <span className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#1E241E]/75 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Expand className="w-4 h-4" />
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#525B50] mb-1">
                      <span>{item.category}</span>
                      <span className="font-mono tabular-nums">{item.accessionNumber}</span>
                    </div>
                    <h2 className="font-serif text-2xl font-semibold text-[#1E241E] group-hover:text-[#1E4D38] transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-xs font-serif italic text-[#525B50] mt-0.5">
                      {item.indonesianName}
                    </p>
                    <p className="text-sm text-[#525B50] mt-2 line-clamp-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DCD5C5] flex items-center gap-1.5 text-xs text-[#1E4D38] font-medium">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{item.region}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Expanded Accession Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E241E]/70 p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={selectedItem.title}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="w-full max-w-4xl bg-[#FBF9F5] border border-[#DCD5C5] rounded-xl overflow-hidden shadow-2xl my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#DCD5C5] bg-[#F3EFE6]">
              <span className="font-mono text-xs tabular-nums text-[#525B50]">
                {selectedItem.accessionNumber} · {selectedItem.category}
              </span>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-lg text-[#525B50] hover:text-[#1E241E] hover:bg-[#E8E2D5] transition-colors cursor-pointer"
                aria-label="Close specimen view"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-7 bg-[#E3EAE1] aspect-[4/3] md:aspect-auto">
                <ResilientImage
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  fallbackTitle={selectedItem.title}
                  className="w-full h-full object-cover max-h-[520px]"
                />
              </div>

              <div className="md:col-span-5 p-6 space-y-4 overflow-y-auto max-h-[520px]">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1E241E]">
                    {selectedItem.title}
                  </h3>
                  <p className="text-sm font-serif italic text-[#1E4D38] mt-0.5">
                    {selectedItem.indonesianName}
                  </p>
                </div>

                <p className="text-sm text-[#1E241E] leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="p-3.5 rounded-lg bg-[#F3EFE6] border border-[#DCD5C5]">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#525B50] mb-1">
                    Cultural Background
                  </p>
                  <p className="text-xs sm:text-sm text-[#1E241E] leading-relaxed">
                    {selectedItem.culturalBackground}
                  </p>
                </div>

                <dl className="pt-2 border-t border-[#DCD5C5] space-y-2 text-xs">
                  <div>
                    <dt className="font-semibold text-[#1E241E] inline">Region: </dt>
                    <dd className="text-[#525B50] inline">{selectedItem.region}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#1E241E] inline">Medium: </dt>
                    <dd className="text-[#525B50] inline">{selectedItem.medium}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#1E241E] inline">Occasion: </dt>
                    <dd className="text-[#525B50] inline">{selectedItem.occasion}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
