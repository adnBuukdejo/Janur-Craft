import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import { REGIONAL_TRADITIONS } from '../data/galleryAndRegions';
import { ResilientImage } from './ResilientImage';

interface IndonesiaCulturalMapProps {
  initialRegionId?: string;
}

export const IndonesiaCulturalMap: React.FC<IndonesiaCulturalMapProps> = ({
  initialRegionId,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialRegionId || REGIONAL_TRADITIONS[0].id
  );

  useEffect(() => {
    if (initialRegionId && REGIONAL_TRADITIONS.some((r) => r.id === initialRegionId)) {
      setSelectedId(initialRegionId);
    }
  }, [initialRegionId]);

  const activeRegion =
    REGIONAL_TRADITIONS.find((r) => r.id === selectedId) || REGIONAL_TRADITIONS[0];

  return (
    <div className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-5 sm:p-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-[#C3D6C1]">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-[#3A7D44] mb-1">
            Explore Across Indonesia
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#15221B]">
            Indonesian Cultural Map of Janur Traditions
          </h3>
          <p className="text-sm text-[#455B4E] mt-1 max-w-2xl">
            Click any region on the map or choose a tab to see local leaf names, special crafts, and traditions across Indonesia.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {REGIONAL_TRADITIONS.map((region) => {
            const active = region.id === activeRegion.id;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => setSelectedId(region.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-[#17422B] text-white border-[#17422B]'
                    : 'bg-[#F7FAF6] text-[#15221B] border-[#C3D6C1] hover:bg-[#DCEAD9]'
                }`}
              >
                {region.regionName}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
        <div className="lg:col-span-7 bg-[#F7FAF6] border border-[#C3D6C1] rounded-xl p-4 flex flex-col justify-between">
          <div className="relative w-full overflow-hidden">
            <svg
              viewBox="0 0 820 340"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Interactive map of Indonesia showing seven regional janur craft traditions"
            >
              <rect x="0" y="0" width="820" height="340" fill="#EBF3ED" rx="8" />
              <line x1="0" y1="120" x2="820" y2="120" stroke="#C3D6C1" strokeWidth="0.7" strokeDasharray="4 4" />
              <line x1="0" y1="220" x2="820" y2="220" stroke="#C3D6C1" strokeWidth="0.7" strokeDasharray="4 4" />
              <line x1="250" y1="0" x2="250" y2="340" stroke="#C3D6C1" strokeWidth="0.7" strokeDasharray="4 4" />
              <line x1="500" y1="0" x2="500" y2="340" stroke="#C3D6C1" strokeWidth="0.7" strokeDasharray="4 4" />

              <path
                d="M 65 56 L 96 76 L 128 112 L 154 146 L 188 184 L 222 214 L 234 228 L 214 236 L 182 212 L 146 176 L 116 142 L 88 106 L 54 72 Z"
                fill="#A9CEA1"
                stroke="#3A7D44"
                strokeWidth="1.2"
              />
              <path
                d="M 248 238 L 298 242 L 352 248 L 402 252 L 424 258 L 414 268 L 366 266 L 310 260 L 254 252 Z"
                fill="#A9CEA1"
                stroke="#3A7D44"
                strokeWidth="1.2"
              />
              <path d="M 392 243 L 418 245 L 416 250 L 392 248 Z" fill="#A9CEA1" stroke="#3A7D44" strokeWidth="1" />
              <path d="M 430 262 L 448 263 L 446 271 L 430 270 Z" fill="#A9CEA1" stroke="#3A7D44" strokeWidth="1.2" />
              <path d="M 454 265 L 478 266 L 476 273 L 454 272 Z" fill="#A9CEA1" stroke="#3A7D44" strokeWidth="1" />
              <path d="M 484 267 L 544 270 L 542 278 L 484 275 Z" fill="#A9CEA1" stroke="#3A7D44" strokeWidth="1" />
              <path d="M 552 276 L 598 266 L 594 278 L 552 284 Z" fill="#A9CEA1" stroke="#3A7D44" strokeWidth="1" />
              <path
                d="M 340 120 L 390 100 L 444 92 L 476 112 L 468 148 L 456 184 L 418 194 L 366 190 L 342 164 Z"
                fill="#A9CEA1"
                stroke="#3A7D44"
                strokeWidth="1.2"
              />
              <path
                d="M 502 124 L 540 104 L 574 102 L 560 116 L 534 128 L 546 154 L 566 174 L 544 198 L 522 206 L 516 176 L 502 152 Z"
                fill="#A9CEA1"
                stroke="#3A7D44"
                strokeWidth="1.2"
              />
              <path d="M 610 122 L 626 114 L 630 144 L 614 148 Z" fill="#A9CEA1" stroke="#3A7D44" strokeWidth="1" />
              <path d="M 604 172 L 636 170 L 638 182 L 604 184 Z" fill="#A9CEA1" stroke="#3A7D44" strokeWidth="1" />
              <path
                d="M 656 150 L 702 146 L 748 164 L 788 184 L 784 226 L 742 232 L 708 206 L 678 190 L 650 174 Z"
                fill="#A9CEA1"
                stroke="#3A7D44"
                strokeWidth="1.2"
              />

              <text x="128" y="138" fill="#17422B" fontSize="10" fontWeight="600" opacity="0.75">
                SUMATRA
              </text>
              <text x="386" y="148" fill="#17422B" fontSize="10" fontWeight="600" opacity="0.75">
                KALIMANTAN
              </text>
              <text x="515" y="158" fill="#17422B" fontSize="10" fontWeight="600" opacity="0.75">
                SULAWESI
              </text>
              <text x="320" y="286" fill="#17422B" fontSize="10" fontWeight="600" opacity="0.75">
                JAVA
              </text>
              <text x="712" y="192" fill="#17422B" fontSize="10" fontWeight="600" opacity="0.75">
                PAPUA
              </text>

              {REGIONAL_TRADITIONS.map((region) => {
                const isSelected = region.id === activeRegion.id;
                return (
                  <g
                    key={region.id}
                    transform={`translate(${region.coordinates.x}, ${region.coordinates.y})`}
                    onClick={() => setSelectedId(region.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select ${region.regionName}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedId(region.id);
                      }
                    }}
                    className="cursor-pointer focus:outline-none"
                  >
                    {isSelected && (
                      <circle cx="0" cy="0" r="15" fill="#17422B" opacity="0.2" />
                    )}
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 8.5 : 6}
                      fill={isSelected ? '#17422B' : '#F7FAF6'}
                      stroke="#17422B"
                      strokeWidth="2.2"
                    />
                    <circle
                      cx="0"
                      cy="0"
                      r={isSelected ? 2.8 : 2.2}
                      fill={isSelected ? '#F7FAF6' : '#17422B'}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-3 pt-3 border-t border-[#DCEAD9] flex flex-wrap items-center justify-between gap-2 text-xs text-[#455B4E]">
            <span>Click any circle pin on the map to explore a regional tradition.</span>
            <span className="font-mono tabular-nums text-[#17422B]">
              {REGIONAL_TRADITIONS.length} Indonesian Regions
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#F7FAF6] border border-[#C3D6C1] rounded-xl overflow-hidden flex flex-col">
          <div className="aspect-[16/10] w-full bg-[#DCEAD9] overflow-hidden">
            <ResilientImage
              src={activeRegion.imageUrl}
              alt={activeRegion.imageCaption}
              fallbackTitle={activeRegion.regionName}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#3A7D44] font-medium mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeRegion.provinceOrIsland}</span>
              </div>
              <h4 className="font-serif text-2xl font-semibold text-[#15221B]">
                {activeRegion.regionName}
              </h4>
              <p className="text-sm text-[#15221B] mt-2 leading-relaxed">
                {activeRegion.summary}
              </p>
              <p className="text-sm text-[#455B4E] mt-2 leading-relaxed">
                {activeRegion.culturalContext}
              </p>
            </div>

            <div className="pt-3 border-t border-[#DCEAD9] space-y-2 text-xs">
              <div>
                <span className="font-semibold text-[#15221B]">Popular Crafts: </span>
                <span className="text-[#455B4E]">
                  {activeRegion.signatureCrafts.join(' · ')}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[#15221B]">Local Words: </span>
                <span className="text-[#455B4E]">{activeRegion.localTerminology}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#DCEAD9]/70 text-[#15221B] leading-relaxed">
                {activeRegion.verifiedHighlight}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
