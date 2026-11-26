import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';

interface DiagramProps {
  onOpenStudio?: () => void;
}

export const AnatomyDiagram: React.FC = () => (
  <figure className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-5 sm:p-6">
    <svg
      viewBox="0 0 640 220"
      className="w-full h-auto"
      role="img"
      aria-label="Parts of a young coconut leaf showing the center lidi stick, soft green leaf strips, thick base, and pointed tip"
    >
      <rect x="0" y="0" width="640" height="220" fill="#E8F5E9" rx="8" />
      <path
        d="M 80 110 C 160 64, 420 62, 560 110 L 80 110 Z"
        fill="#A4CF7A"
        stroke="#143D28"
        strokeWidth="1.5"
      />
      <path
        d="M 80 110 C 160 156, 420 158, 560 110 L 80 110 Z"
        fill="#539E59"
        stroke="#143D28"
        strokeWidth="1.5"
      />
      <path d="M 120 96 C 230 82, 390 82, 515 104" fill="none" stroke="#DFF1BC" strokeWidth="1" strokeDasharray="4 3" />
      <path d="M 120 124 C 230 138, 390 138, 515 116" fill="none" stroke="#CFE4CA" strokeWidth="1" strokeDasharray="4 3" />

      <line x1="60" y1="110" x2="565" y2="110" stroke="#7A5A3A" strokeWidth="4.2" strokeLinecap="round" />

      <line x1="110" y1="110" x2="110" y2="38" stroke="#132219" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="110" cy="110" r="3.5" fill="#7A5A3A" />
      <text x="118" y="34" fill="#132219" fontSize="12" fontWeight="600">
        Thick Bottom End (Pangkal)
      </text>

      <line x1="280" y1="80" x2="280" y2="32" stroke="#132219" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="280" cy="80" r="3.5" fill="#143D28" />
      <text x="288" y="28" fill="#132219" fontSize="12" fontWeight="600">
        Soft Green Strip
      </text>

      <line x1="330" y1="110" x2="330" y2="188" stroke="#132219" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="330" cy="110" r="3.5" fill="#7A5A3A" />
      <text x="338" y="192" fill="#132219" fontSize="12" fontWeight="600">
        Hard Middle Stick (Lidi) — cut out before weaving
      </text>

      <line x1="535" y1="110" x2="500" y2="48" stroke="#132219" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="535" cy="110" r="3.5" fill="#143D28" />
      <text x="415" y="44" fill="#132219" fontSize="12" fontWeight="600">
        Pointed Tip (Ujung)
      </text>
    </svg>
    <figcaption className="mt-3 text-xs font-serif italic text-[#3F5749]">
      Picture 1 — One young coconut leaf gives you two soft green strips when you remove the hard stick in the middle.
    </figcaption>
  </figure>
);

export const TechniquesDiagram: React.FC = () => (
  <figure className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-5 sm:p-6">
    <svg
      viewBox="0 0 640 200"
      className="w-full h-auto"
      role="img"
      aria-label="Three basic janur folding skills: over-under weaving, fan folding, and edge cuts"
    >
      <rect x="0" y="0" width="640" height="200" fill="#E8F5E9" rx="8" />

      <g transform="translate(24, 24)">
        <rect x="0" y="0" width="180" height="128" fill="#FAFBF6" stroke="#B5D2AF" rx="6" />
        {[0, 1, 2].map((i) => (
          <rect key={`h-${i}`} x="25" y={28 + i * 26} width="130" height="18" fill="#4CA156" stroke="#143D28" strokeWidth="1" rx="2" />
        ))}
        {[0, 1, 2].map((i) => (
          <rect key={`v-${i}`} x={44 + i * 36} y="16" width="18" height="96" fill="#A4CF7A" stroke="#143D28" strokeWidth="1" rx="2" opacity="0.94" />
        ))}
        <rect x="44" y="28" width="18" height="18" fill="#4CA156" stroke="#143D28" strokeWidth="1" />
        <rect x="116" y="28" width="18" height="18" fill="#4CA156" stroke="#143D28" strokeWidth="1" />
        <rect x="80" y="54" width="18" height="18" fill="#4CA156" stroke="#143D28" strokeWidth="1" />
        <rect x="44" y="80" width="18" height="18" fill="#4CA156" stroke="#143D28" strokeWidth="1" />
        <rect x="116" y="80" width="18" height="18" fill="#4CA156" stroke="#143D28" strokeWidth="1" />
        <text x="90" y="148" textAnchor="middle" fill="#132219" fontSize="12" fontWeight="600">
          1. Over–Under Weaving
        </text>
      </g>

      <g transform="translate(230, 24)">
        <rect x="0" y="0" width="180" height="128" fill="#FAFBF6" stroke="#B5D2AF" rx="6" />
        <path
          d="M 25 104 L 90 104 L 40 32 L 58 26 L 90 104 L 74 20 L 94 20 L 90 104 L 110 20 L 128 28 L 90 104 L 142 38 L 155 52 Z"
          fill="#A4CF7A"
          stroke="#143D28"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <text x="90" y="148" textAnchor="middle" fill="#132219" fontSize="12" fontWeight="600">
          2. Fan Folding (Lipatan)
        </text>
      </g>

      <g transform="translate(436, 24)">
        <rect x="0" y="0" width="180" height="128" fill="#FAFBF6" stroke="#B5D2AF" rx="6" />
        <path
          d="M 28 32 L 152 32 L 152 64 L 138 50 L 124 66 L 110 50 L 96 66 L 82 50 L 68 66 L 54 50 L 40 66 L 28 50 Z"
          fill="#4CA156"
          stroke="#143D28"
          strokeWidth="1.3"
        />
        <path
          d="M 28 84 L 152 84 C 142 106, 128 106, 118 84 C 108 106, 94 106, 84 84 C 74 106, 60 106, 50 84 C 40 106, 32 100, 28 84 Z"
          fill="#A4CF7A"
          stroke="#143D28"
          strokeWidth="1.3"
        />
        <text x="90" y="148" textAnchor="middle" fill="#132219" fontSize="12" fontWeight="600">
          3. Edge Cuts (Ringgitan)
        </text>
      </g>
    </svg>
    <figcaption className="mt-3 text-xs font-serif italic text-[#3F5749]">
      Picture 2 — Basic janur skills: weaving strips over and under, folding like a fan, and cutting neat edges.
    </figcaption>
  </figure>
);

export const InteractiveWeaveInspector: React.FC<DiagramProps> = ({ onOpenStudio }) => {
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
    <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-5 sm:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#B5D2AF]">
        <div>
          <h4 className="font-serif text-xl font-semibold text-[#132219]">
            Try Clicking the Over–Under Weave Pattern
          </h4>
          <p className="text-xs text-[#3F5749] mt-0.5">
            Click any square below to flip which strip goes on top and see if the weave stays locked!
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setGrid(defaultPattern)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#132219] bg-[#FAFBF6] border border-[#B5D2AF] rounded-lg hover:bg-[#CFE4CA] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          {onOpenStudio && (
            <button
              type="button"
              onClick={onOpenStudio}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#143D28] rounded-lg hover:bg-[#0D2B1B] transition-colors cursor-pointer"
            >
              <span>Open Craft Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-5 items-center">
        <div className="md:col-span-7 flex justify-center">
          <div className="relative bg-[#FAFBF6] border border-[#B5D2AF] rounded-xl p-6 w-full max-w-sm">
            <div className="grid grid-cols-3 gap-2.5">
              {grid.map((row, r) =>
                row.map((horizontalOver, c) => (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    onClick={() => toggleNode(r, c)}
                    aria-label={`Row ${r + 1} Column ${c + 1}: ${horizontalOver ? 'Strip A over Strip B' : 'Strip B over Strip A'}`}
                    className={`h-16 rounded-lg border transition-all flex flex-col items-center justify-center cursor-pointer ${
                      horizontalOver
                        ? 'bg-[#3B8E47] border-[#143D28] text-white'
                        : 'bg-[#AED67A] border-[#0F764A] text-[#132219]'
                    }`}
                  >
                    <span className="font-mono text-[11px] font-semibold tabular-nums">
                      {horizontalOver ? 'A OVER B' : 'B OVER A'}
                    </span>
                    <span className={`text-[10px] mt-0.5 ${horizontalOver ? 'text-[#E8F5E9]' : 'text-[#3F5749]'}`}>
                      Spot {r + 1},{c + 1}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 space-y-3">
          <div className="p-4 rounded-lg bg-[#FAFBF6] border border-[#B5D2AF]">
            <p className="text-xs font-mono text-[#0F764A] uppercase tracking-wider mb-1 font-semibold">
              Weave Check
            </p>
            <p className="font-serif text-lg font-semibold text-[#132219]">
              {isLockedCorrectly
                ? 'Locked Checkerboard!'
                : 'Loose Weave (May Slip)'}
            </p>
            <p className="text-xs text-[#3F5749] mt-1.5 leading-relaxed">
              {isLockedCorrectly
                ? 'Each row switches Over–Under–Over. Because the strips grip each other, rice stays safely inside!'
                : 'When two spots in a row go the exact same way, the strips can slide apart. Click spots to alternate them!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SustainabilityCycleDiagram: React.FC = () => (
  <figure className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-5 sm:p-6">
    <svg
      viewBox="0 0 640 175"
      className="w-full h-auto"
      role="img"
      aria-label="Zero-waste circle showing safe leaf picking, splitting strips, natural crafting, and turning back into soil"
    >
      <rect x="0" y="0" width="640" height="175" fill="#E8F5E9" rx="8" />
      {[
        { x: 20, title: '1. Safe Picking', sub: 'Tree keeps growing', sub2: '12–16 new leaves/yr' },
        { x: 175, title: '2. Zero Waste', sub: 'Leaf → Weaving strips', sub2: 'Stick → Brooms & pins' },
        { x: 330, title: '3. Natural Craft', sub: 'No glue or plastic', sub2: 'Safe food pouches' },
        { x: 485, title: '4. Back to Soil', sub: 'Breaks down fast', sub2: 'Feeds garden plants' },
      ].map((step, idx) => (
        <g key={step.title}>
          <rect x={step.x} y="34" width="135" height="98" rx="8" fill="#FAFBF6" stroke="#0F764A" strokeWidth="1.2" />
          <text x={step.x + 67.5} y="62" textAnchor="middle" fill="#143D28" fontSize="12" fontWeight="700">
            {step.title}
          </text>
          <text x={step.x + 67.5} y="86" textAnchor="middle" fill="#132219" fontSize="11">
            {step.sub}
          </text>
          <text x={step.x + 67.5} y="106" textAnchor="middle" fill="#3F5749" fontSize="10.5">
            {step.sub2}
          </text>
          {idx < 3 && (
            <path
              d={`M ${step.x + 139} 83 L ${step.x + 151} 83`}
              stroke="#143D28"
              strokeWidth="1.8"
              markerEnd="url(#arrowGreen)"
            />
          )}
        </g>
      ))}
      <defs>
        <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
          <path d="M 0 0 L 6 3 L 0 6 Z" fill="#143D28" />
        </marker>
      </defs>
    </svg>
    <figcaption className="mt-3 text-xs font-serif italic text-[#3F5749]">
      Picture 3 — Nothing is wasted: young coconut leaves come from healthy trees and turn safely back into garden soil.
    </figcaption>
  </figure>
);

export const TutorialSchematicSVG: React.FC<{ type: 'ketupat' | 'sampian' | 'grasshopper' | 'keris' }> = ({
  type,
}) => {
  return (
    <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-4">
      <svg viewBox="0 0 360 140" className="w-full h-auto" role="img" aria-label={`Visual guide for ${type}`}>
        <rect x="0" y="0" width="360" height="140" fill="#FAFBF6" rx="6" />
        {type === 'ketupat' && (
          <g transform="translate(80, 14)">
            <polygon points="100,10 154,56 100,102 46,56" fill="#A4CF7A" stroke="#143D28" strokeWidth="1.8" />
            <line x1="73" y1="33" x2="127" y2="79" stroke="#143D28" strokeWidth="1.2" />
            <line x1="127" y1="33" x2="73" y2="79" stroke="#143D28" strokeWidth="1.2" />
            <line x1="100" y1="10" x2="100" y2="2" stroke="#0F764A" strokeWidth="2.5" />
            <line x1="100" y1="102" x2="100" y2="114" stroke="#7A5A3A" strokeWidth="3" />
            <text x="100" y="122" textAnchor="middle" fontSize="10.5" fill="#3F5749">
              Woven Diamond Rice Pouch
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
                fill={i % 2 === 0 ? '#A4CF7A' : '#4CA156'}
                stroke="#143D28"
                strokeWidth="1"
                transform={`rotate(${i * 30})`}
              />
            ))}
            <circle cx="0" cy="0" r="9" fill="#7A5A3A" />
            <text x="0" y="64" textAnchor="middle" fontSize="10.5" fill="#3F5749">
              Folded Petals Pinned in a Circle
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
                fill={seg % 2 === 0 ? '#4CA156' : '#A4CF7A'}
                stroke="#143D28"
                strokeWidth="1.2"
                rx="3"
              />
            ))}
            <path d="M 85 45 L 55 24 M 85 52 L 52 44" stroke="#143D28" strokeWidth="1.5" fill="none" />
            <path d="M 155 46 L 195 16 L 230 68" stroke="#0F764A" strokeWidth="2.2" fill="none" strokeLinejoin="round" />
            <text x="135" y="102" textAnchor="middle" fontSize="10.5" fill="#3F5749">
              Braided Body &amp; Bent Jumping Legs
            </text>
          </g>
        )}
        {type === 'keris' && (
          <g transform="translate(50, 20)">
            <line x1="30" y1="52" x2="235" y2="52" stroke="#7A5A3A" strokeWidth="2.5" />
            <path
              d="M 55 52 L 75 34 L 95 52 L 115 38 L 135 52 L 155 40 L 175 52 L 195 43 L 225 52 L 195 61 L 175 52 L 155 64 L 135 52 L 115 66 L 95 52 L 75 70 Z"
              fill="#4CA156"
              stroke="#143D28"
              strokeWidth="1.3"
            />
            <text x="130" y="104" textAnchor="middle" fontSize="10.5" fill="#3F5749">
              Wavy Blade Woven Around Lidi Stick
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
