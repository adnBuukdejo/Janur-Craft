import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface DiagramProps {
  onOpenStudio?: () => void;
}

export const AnatomyDiagram: React.FC = () => (
  <figure className="bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-5 sm:p-6">
    <svg
      viewBox="0 0 640 220"
      className="w-full h-auto"
      role="img"
      aria-label="Botanical anatomy diagram of a young coconut leaflet showing the central lidi spine, twin helai daun blades, base stem, and tapered tip"
    >
      <rect x="0" y="0" width="640" height="220" fill="#F3EFE6" rx="8" />
      {/* Upper blade */}
      <path
        d="M 80 110 C 160 64, 420 62, 560 110 L 80 110 Z"
        fill="#DCE6C8"
        stroke="#5E7D63"
        strokeWidth="1.5"
      />
      {/* Lower blade */}
      <path
        d="M 80 110 C 160 156, 420 158, 560 110 L 80 110 Z"
        fill="#C9D8B0"
        stroke="#5E7D63"
        strokeWidth="1.5"
      />
      {/* Subtle longitudinal leaf veins */}
      <path d="M 120 96 C 230 82, 390 82, 515 104" fill="none" stroke="#8CA57E" strokeWidth="0.9" strokeDasharray="4 3" />
      <path d="M 120 124 C 230 138, 390 138, 515 116" fill="none" stroke="#8CA57E" strokeWidth="0.9" strokeDasharray="4 3" />

      {/* Central Lidi midrib */}
      <line x1="60" y1="110" x2="565" y2="110" stroke="#7A5C3E" strokeWidth="4" strokeLinecap="round" />

      {/* Callouts */}
      <line x1="110" y1="110" x2="110" y2="38" stroke="#1E241E" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="110" cy="110" r="3.5" fill="#7A5C3E" />
      <text x="118" y="34" fill="#1E241E" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
        Base Stem (Pangkal)
      </text>

      <line x1="280" y1="80" x2="280" y2="32" stroke="#1E241E" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="280" cy="80" r="3.5" fill="#1E4D38" />
      <text x="288" y="28" fill="#1E241E" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
        Leaf Blade (Helai Daun)
      </text>

      <line x1="330" y1="110" x2="330" y2="188" stroke="#1E241E" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="330" cy="110" r="3.5" fill="#7A5C3E" />
      <text x="338" y="192" fill="#1E241E" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
        Central Midrib (Lidi) — stripped via menyeset
      </text>

      <line x1="535" y1="110" x2="500" y2="48" stroke="#1E241E" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="535" cy="110" r="3.5" fill="#1E4D38" />
      <text x="415" y="44" fill="#1E241E" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif">
        Tapered Tip (Ujung)
      </text>
    </svg>
    <figcaption className="mt-3 text-xs font-serif italic text-[#525B50]">
      Diagram 1.1 — Structural anatomy of a single Cocos nucifera young leaflet yielding two symmetrical weaving ribbons once the woody lidi spine is removed.
    </figcaption>
  </figure>
);

export const TechniquesDiagram: React.FC = () => (
  <figure className="bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-5 sm:p-6">
    <svg
      viewBox="0 0 640 200"
      className="w-full h-auto"
      role="img"
      aria-label="Three primary janur craft techniques: over-under plaiting, accordion pleating, and notched ringgitan margins"
    >
      <rect x="0" y="0" width="640" height="200" fill="#F3EFE6" rx="8" />

      {/* Panel 1: Over-Under Anyaman */}
      <g transform="translate(24, 24)">
        <rect x="0" y="0" width="180" height="128" fill="#FBF9F5" stroke="#DCD5C5" rx="6" />
        {[0, 1, 2].map((i) => (
          <rect key={`h-${i}`} x="25" y={28 + i * 26} width="130" height="18" fill="#B8CCA0" stroke="#1E4D38" strokeWidth="1" rx="2" />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={`v-${i}`} x={44 + i * 36} y="16" width="18" height="96" fill="#DCE6C8" stroke="#1E4D38" strokeWidth="1" rx="2" opacity="0.92" />
        ))}
        {/* Over crossings */}
        <rect x="44" y="28" width="18" height="18" fill="#B8CCA0" stroke="#1E4D38" strokeWidth="1" />
        <rect x="116" y="28" width="18" height="18" fill="#B8CCA0" stroke="#1E4D38" strokeWidth="1" />
        <rect x="80" y="54" width="18" height="18" fill="#B8CCA0" stroke="#1E4D38" strokeWidth="1" />
        <rect x="44" y="80" width="18" height="18" fill="#B8CCA0" stroke="#1E4D38" strokeWidth="1" />
        <rect x="116" y="80" width="18" height="18" fill="#B8CCA0" stroke="#1E4D38" strokeWidth="1" />
        <text x="90" y="148" textAnchor="middle" fill="#1E241E" fontSize="12" fontWeight="600">
          01. Anyaman (Over–Under)
        </text>
      </g>

      {/* Panel 2: Lipatan Pleating */}
      <g transform="translate(230, 24)">
        <rect x="0" y="0" width="180" height="128" fill="#FBF9F5" stroke="#DCD5C5" rx="6" />
        <path
          d="M 25 104 L 90 104 L 40 32 L 58 26 L 90 104 L 74 20 L 94 20 L 90 104 L 110 20 L 128 28 L 90 104 L 142 38 L 155 52 Z"
          fill="#DCE6C8"
          stroke="#1E4D38"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <text x="90" y="148" textAnchor="middle" fill="#1E241E" fontSize="12" fontWeight="600">
          02. Lipatan (Radial Pleats)
        </text>
      </g>

      {/* Panel 3: Ringgitan Notching */}
      <g transform="translate(436, 24)">
        <rect x="0" y="0" width="180" height="128" fill="#FBF9F5" stroke="#DCD5C5" rx="6" />
        <path
          d="M 28 32 L 152 32 L 152 64 L 138 50 L 124 66 L 110 50 L 96 66 L 82 50 L 68 66 L 54 50 L 40 66 L 28 50 Z"
          fill="#C9D8B0"
          stroke="#1E4D38"
          strokeWidth="1.3"
        />
        <path
          d="M 28 84 L 152 84 C 142 106, 128 106, 118 84 C 108 106, 94 106, 84 84 C 74 106, 60 106, 50 84 C 40 106, 32 100, 28 84 Z"
          fill="#DCE6C8"
          stroke="#1E4D38"
          strokeWidth="1.3"
        />
        <text x="90" y="148" textAnchor="middle" fill="#1E241E" fontSize="12" fontWeight="600">
          03. Ringgitan (Edge Notches)
        </text>
      </g>
    </svg>
    <figcaption className="mt-3 text-xs font-serif italic text-[#525B50]">
      Diagram 5.1 — Core structural techniques in Indonesian leaf craft: alternating over–under plaiting, radial fan pleating, and serrated/scalloped edge carving.
    </figcaption>
  </figure>
);

export const InteractiveWeaveInspector: React.FC<DiagramProps> = ({ onOpenStudio }) => {
  // 3x3 alternating ketupat weave matrix; true = Horizontal over Vertical, false = Vertical over Horizontal
  const defaultPattern: boolean[][] = [
    [true, false, true],
    [false, true, false],
    [true, false, true],
  ];
  const [grid, setGrid] = useState<boolean[][]>(defaultPattern);

  const toggleNode = (r: number, c: number) => {
    setGrid((prev) =>
      prev.map((row, rIdx) =>
        row.map((val, cIdx) => (rIdx === r && cIdx === c ? !val : val))
      )
    );
  };

  const isLockedCorrectly = grid.every((row, r) =>
    row.every((val, c) => val === defaultPattern[r][c])
  );

  return (
    <div className="bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-5 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DCD5C5]">
        <div>
          <h4 className="font-serif text-xl font-semibold text-[#1E241E]">
            Interactive Ketupat Cross-Weave Inspector
          </h4>
          <p className="text-xs text-[#525B50] mt-0.5">
            Click any intersection square below to flip Over / Under strand layering and observe structural lock integrity.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setGrid(defaultPattern)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1E241E] bg-[#FBF9F5] border border-[#DCD5C5] rounded-lg hover:bg-[#E3EAE1] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restore Classic Lock</span>
          </button>
          {onOpenStudio && (
            <button
              type="button"
              onClick={onOpenStudio}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#1E4D38] rounded-lg hover:bg-[#163B2A] transition-colors cursor-pointer"
            >
              <span>Launch 3D Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
        <div className="md:col-span-7 flex justify-center">
          <div className="relative bg-[#FBF9F5] border border-[#DCD5C5] rounded-xl p-6 w-full max-w-sm">
            <div className="grid grid-cols-3 gap-2.5">
              {grid.map((row, r) =>
                row.map((horizontalOver, c) => (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    onClick={() => toggleNode(r, c)}
                    aria-label={`Row ${r + 1} Column ${c + 1}: ${horizontalOver ? 'Strand A over Strand B' : 'Strand B over Strand A'}`}
                    className={`h-16 rounded-lg border transition-all flex flex-col items-center justify-center cursor-pointer ${
                      horizontalOver
                        ? 'bg-[#C9D8B0] border-[#1E4D38] text-[#1E241E]'
                        : 'bg-[#DCE6C8] border-[#5E7D63] text-[#1E241E]'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-medium tabular-nums">
                      {horizontalOver ? 'A OVER B' : 'B OVER A'}
                    </span>
                    <span className="text-[10px] text-[#525B50] mt-0.5">
                      Node {r + 1},{c + 1}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 space-y-3">
          <div className="p-4 rounded-lg bg-[#FBF9F5] border border-[#DCD5C5]">
            <p className="text-xs font-mono text-[#525B50] uppercase tracking-wider mb-1">
              Structural Status
            </p>
            <p className="font-serif text-lg font-semibold text-[#1E241E]">
              {isLockedCorrectly
                ? 'Balanced Alternating Lock (Self-Supporting)'
                : 'Unbalanced Crossing (Slippage Risk)'}
            </p>
            <p className="text-xs text-[#525B50] mt-1.5 leading-relaxed">
              {isLockedCorrectly
                ? 'Every row and column alternates Over–Under–Over. Tension distributes evenly across all six faces so rice cannot escape when boiled.'
                : 'Adjacent identical crossings allow leaf ribbons to slide along one axis under internal steam pressure. Click mismatched nodes to restore alternation.'}
            </p>
          </div>
          <div className="text-xs text-[#525B50] space-y-1">
            <p>
              <strong className="text-[#1E241E]">Strand A (Sage):</strong> Three horizontal loops coiled tip-up.
            </p>
            <p>
              <strong className="text-[#1E241E]">Strand B (Chartreuse):</strong> Three vertical loops coiled tip-down.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SustainabilityCycleDiagram: React.FC = () => (
  <figure className="bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-5 sm:p-6">
    <svg
      viewBox="0 0 640 175"
      className="w-full h-auto"
      role="img"
      aria-label="Zero-waste circular lifecycle of coconut fronds from ethical harvesting to sapu lidi brooms and natural composting"
    >
      <rect x="0" y="0" width="640" height="175" fill="#F3EFE6" rx="8" />
      {[
        { x: 20, title: '1. Ethical Harvest', sub: '12–16 new fronds/yr', sub2: 'Apical bud preserved' },
        { x: 175, title: '2. Dual Separation', sub: 'Blade → Weaving', sub2: 'Lidi → Brooms & pins' },
        { x: 330, title: '3. Craft & Feast', sub: 'Zero synthetic glue', sub2: 'Natural cookware & art' },
        { x: 485, title: '4. Soil Return', sub: '100% biodegradable', sub2: 'Composts in weeks' },
      ].map((step, idx) => (
        <g key={step.title}>
          <rect x={step.x} y="34" width="135" height="98" rx="8" fill="#FBF9F5" stroke="#5E7D63" strokeWidth="1.2" />
          <text x={step.x + 67.5} y="62" textAnchor="middle" fill="#1E4D38" fontSize="12" fontWeight="700">
            {step.title}
          </text>
          <text x={step.x + 67.5} y="86" textAnchor="middle" fill="#1E241E" fontSize="11">
            {step.sub}
          </text>
          <text x={step.x + 67.5} y="106" textAnchor="middle" fill="#525B50" fontSize="10.5">
            {step.sub2}
          </text>
          {idx < 3 && (
            <path
              d={`M ${step.x + 139} 83 L ${step.x + 151} 83`}
              stroke="#1E4D38"
              strokeWidth="1.8"
              markerEnd="url(#arrow)"
            />
          )}
        </g>
      ))}
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 Z" fill="#1E4D38" />
        </marker>
      </defs>
    </svg>
    <figcaption className="mt-3 text-xs font-serif italic text-[#525B50]">
      Diagram 13.1 — Circular zero-waste ecology of Indonesian janur crafts: every fiber of Cocos nucifera is utilized and returns cleanly to soil.
    </figcaption>
  </figure>
);

export const TutorialSchematicSVG: React.FC<{ type: 'ketupat' | 'sampian' | 'grasshopper' | 'keris' }> = ({
  type,
}) => {
  return (
    <div className="bg-[#F3EFE6] border border-[#DCD5C5] rounded-xl p-4">
      <svg viewBox="0 0 360 140" className="w-full h-auto" role="img" aria-label={`Structural schematic for ${type}`}>
        <rect x="0" y="0" width="360" height="140" fill="#FBF9F5" rx="6" />
        {type === 'ketupat' && (
          <g transform="translate(80, 14)">
            <polygon points="100,10 154,56 100,102 46,56" fill="#DCE6C8" stroke="#1E4D38" strokeWidth="1.8" />
            <line x1="73" y1="33" x2="127" y2="79" stroke="#1E4D38" strokeWidth="1.2" />
            <line x1="127" y1="33" x2="73" y2="79" stroke="#1E4D38" strokeWidth="1.2" />
            <line x1="100" y1="10" x2="100" y2="2" stroke="#5E7D63" strokeWidth="2.5" />
            <line x1="100" y1="102" x2="100" y2="114" stroke="#7A5C3E" strokeWidth="3" />
            <text x="100" y="122" textAnchor="middle" fontSize="10.5" fill="#525B50">
              Six-Cornered Diagonal Lattice (3×3 Coils)
            </text>
          </g>
        )}
        {type === 'sampian' && (
          <g transform="translate(180, 64)">
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-26"
                rx="7"
                ry="24"
                fill={i % 2 === 0 ? '#DCE6C8' : '#C9D8B0'}
                stroke="#1E4D38"
                strokeWidth="1"
                transform={`rotate(${i * 30})`}
              />
            ))}
            <circle cx="0" cy="0" r="9" fill="#7A5C3E" />
            <text x="0" y="64" textAnchor="middle" fontSize="10.5" fill="#525B50">
              Radial Pleated Petals Anchored by Semat Pins
            </text>
          </g>
        )}
        {type === 'grasshopper' && (
          <g transform="translate(45, 22)">
            {[0, 1, 2, 3, 4].map((seg) => (
              <rect
                key={seg}
                x={85 + seg * 22}
                y={42 - seg * 1.5}
                width="20"
                height={20 - seg * 1.5}
                fill={seg % 2 === 0 ? '#C9D8B0' : '#DCE6C8'}
                stroke="#1E4D38"
                strokeWidth="1.2"
                rx="3"
              />
            ))}
            <path d="M 85 45 L 55 24 M 85 52 L 52 44" stroke="#1E4D38" strokeWidth="1.5" fill="none" />
            <path d="M 155 46 L 195 16 L 230 68" stroke="#5E7D63" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
            <text x="135" y="102" textAnchor="middle" fontSize="10.5" fill="#525B50">
              Alternating Box-Braid Thorax & Folded V-Legs
            </text>
          </g>
        )}
        {type === 'keris' && (
          <g transform="translate(50, 20)">
            <line x1="30" y1="52" x2="235" y2="52" stroke="#7A5C3E" strokeWidth="2.5" />
            <path
              d="M 55 52 L 75 34 L 95 52 L 115 38 L 135 52 L 155 40 L 175 52 L 195 43 L 225 52 L 195 61 L 175 52 L 155 64 L 135 52 L 115 66 L 95 52 L 75 70 Z"
              fill="#C9D8B0"
              stroke="#1E4D38"
              strokeWidth="1.3"
            />
            <text x="130" y="104" textAnchor="middle" fontSize="10.5" fill="#525B50">
              Sinuous Luk Blade Plaited Around Lidi Spine
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
