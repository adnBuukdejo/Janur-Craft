import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { MaterialVisualKind, StudioCraftConfig } from '../../data/studioCrafts';
import { ResilientImage } from '../ResilientImage';

export const MaterialPreviewSVG: React.FC<{ kind: MaterialVisualKind }> = ({ kind }) => (
  <svg viewBox="0 0 80 54" className="w-16 h-11 shrink-0" aria-hidden="true">
    <rect x="0" y="0" width="80" height="54" rx="8" fill="#F2F7EE" stroke="#CFE4CA" strokeWidth="1" />
    {kind === 'coconut-leaf' && (
      <g>
        <path d="M 8 27 C 24 12, 56 12, 72 27 C 56 42, 24 42, 8 27 Z" fill="#82BC5E" stroke="#143D28" strokeWidth="1.2" />
        <line x1="6" y1="27" x2="72" y2="27" stroke="#8C6239" strokeWidth="2.2" />
      </g>
    )}
    {kind === 'water-bowl' && (
      <g>
        <path d="M 18 22 L 62 22 C 60 40, 20 40, 18 22 Z" fill="#B65236" stroke="#143D28" strokeWidth="1.2" />
        <ellipse cx="40" cy="22" rx="22" ry="5" fill="#BEE7EE" stroke="#1E6C7A" strokeWidth="1.2" />
      </g>
    )}
    {kind === 'janur-strips' && (
      <g>
        <rect x="10" y="14" width="58" height="9" rx="3" fill="#3B8E47" stroke="#143D28" strokeWidth="1" />
        <rect x="10" y="30" width="58" height="9" rx="3" fill="#B3D564" stroke="#0F764A" strokeWidth="1" />
      </g>
    )}
    {kind === 'lidi-sticks' && (
      <g>
        <line x1="12" y1="20" x2="68" y2="20" stroke="#8C6239" strokeWidth="3" strokeLinecap="round" />
        <line x1="12" y1="28" x2="68" y2="28" stroke="#7A5A3A" strokeWidth="3" strokeLinecap="round" />
        <line x1="12" y1="36" x2="68" y2="36" stroke="#8C6239" strokeWidth="3" strokeLinecap="round" />
      </g>
    )}
    {kind === 'bamboo-pole' && (
      <g>
        <path d="M 24 46 L 24 24 Q 24 10, 56 16" fill="none" stroke="#82BC5E" strokeWidth="6" strokeLinecap="round" />
        <path d="M 24 46 L 24 24 Q 24 10, 56 16" fill="none" stroke="#143D28" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    )}
    {kind === 'semat-pins' && (
      <g>
        {[22, 34, 46, 58].map((x) => (
          <g key={x}>
            <line x1={x} y1="14" x2={x - 3} y2="40" stroke="#8C6239" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx={x} cy="14" r="2.2" fill="#E2B334" />
          </g>
        ))}
      </g>
    )}
    {kind === 'flower-petals' && (
      <g>
        <circle cx="24" cy="22" r="7" fill="#FAFBF6" stroke="#B5D2AF" strokeWidth="1" />
        <circle cx="40" cy="18" r="7" fill="#E2B334" />
        <circle cx="56" cy="24" r="7" fill="#DD7930" />
        <circle cx="40" cy="34" r="7" fill="#B65236" />
      </g>
    )}
    {kind === 'banana-pot' && (
      <g>
        <rect x="33" y="10" width="14" height="18" rx="2" fill="#82BC5E" stroke="#143D28" strokeWidth="1.1" />
        <polygon points="22,26 58,26 52,44 28,44" fill="#B65236" stroke="#143D28" strokeWidth="1.2" />
      </g>
    )}
    {kind === 'bamboo-rings' && (
      <g>
        <ellipse cx="40" cy="19" rx="22" ry="7" fill="none" stroke="#8C6239" strokeWidth="3.2" />
        <ellipse cx="40" cy="35" rx="22" ry="7" fill="none" stroke="#A4CF7A" strokeWidth="3.2" />
      </g>
    )}
    {kind === 'led-bulb' && (
      <g>
        <line x1="40" y1="6" x2="40" y2="16" stroke="#143D28" strokeWidth="2" />
        <circle cx="40" cy="28" r="11" fill="#FDF5DB" stroke="#E2B334" strokeWidth="2" />
        <circle cx="40" cy="28" r="5" fill="#E2B334" />
      </g>
    )}
    {kind === 'sticky-rice' && (
      <g>
        <ellipse cx="40" cy="34" rx="22" ry="9" fill="#E8F5E9" stroke="#143D28" strokeWidth="1.2" />
        <circle cx="34" cy="26" r="5" fill="#FAFBF6" stroke="#CFE4CA" strokeWidth="1" />
        <circle cx="44" cy="25" r="5" fill="#FAFBF6" stroke="#CFE4CA" strokeWidth="1" />
        <circle cx="39" cy="28" r="3" fill="#8C6239" />
      </g>
    )}
    {kind === 'bamboo-string' && (
      <g>
        <ellipse cx="40" cy="27" rx="18" ry="12" fill="none" stroke="#8C6239" strokeWidth="3" />
        <ellipse cx="40" cy="27" rx="13" ry="8" fill="none" stroke="#E2B334" strokeWidth="1.8" />
      </g>
    )}
    {kind === 'scissors' && (
      <g>
        <circle cx="24" cy="20" r="6" fill="none" stroke="#B65236" strokeWidth="2.2" />
        <circle cx="24" cy="34" r="6" fill="none" stroke="#B65236" strokeWidth="2.2" />
        <line x1="29" y1="22" x2="62" y2="33" stroke="#143D28" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="29" y1="32" x2="62" y2="21" stroke="#143D28" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    )}
    {kind === 'damp-cloth' && (
      <g>
        <rect x="20" y="14" width="40" height="26" rx="5" fill="#DCF0F2" stroke="#1E6C7A" strokeWidth="1.5" />
        <line x1="27" y1="23" x2="53" y2="23" stroke="#1E6C7A" strokeWidth="1.4" strokeDasharray="4 3" />
        <line x1="27" y1="31" x2="48" y2="31" stroke="#1E6C7A" strokeWidth="1.4" strokeDasharray="4 3" />
      </g>
    )}
    {kind === 'spoon' && (
      <g>
        <ellipse cx="52" cy="26" rx="11" ry="7" fill="#8C6239" stroke="#143D28" strokeWidth="1.2" />
        <line x1="16" y1="26" x2="42" y2="26" stroke="#8C6239" strokeWidth="4" strokeLinecap="round" />
      </g>
    )}
  </svg>
);

export type CraftAngle = 'front' | 'side' | 'top';

export const CraftThumbnailSVG: React.FC<{
  craftId: string;
  angle: CraftAngle;
}> = ({ craftId, angle }) => {
  const scaleX = angle === 'side' ? 0.84 : 1;
  const skew = angle === 'top' ? 'scale(0.95, 0.78)' : `scale(${scaleX}, 1)`;

  return (
    <svg viewBox="0 0 320 220" className="w-full h-auto" role="img" aria-label={`${craftId} ${angle} view`}>
      <defs>
        <radialGradient id="finishBg" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FDF5DB" />
          <stop offset="100%" stopColor="#E8F5E9" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="320" height="220" rx="14" fill="url(#finishBg)" stroke="#B5D2AF" strokeWidth="1.5" />

      <g transform={`translate(160, 110) ${skew}`}>
        {craftId === 'ketupat-bawang' && (
          <g>
            <path d="M -5 -58 L -14 -92 L -4 -94 L 2 -58 Z" fill="#82BC5E" stroke="#143D28" strokeWidth="1.3" />
            <path d="M 5 -58 L 14 -92 L 4 -94 L -2 -58 Z" fill="#469650" stroke="#143D28" strokeWidth="1.3" />
            <path d="M -4 58 L -10 86 L -2 88 L 4 58 Z" fill="#3B8E47" stroke="#143D28" strokeWidth="1.3" />
            <path d="M 4 58 L 12 86 L 3 88 L -3 58 Z" fill="#B3D564" stroke="#143D28" strokeWidth="1.3" />
            <g transform="rotate(45)">
              <rect x="-46" y="-46" width="92" height="92" rx="8" fill="#2E743B" stroke="#143D28" strokeWidth="2" />
              {[0, 1, 2].map((r) =>
                [0, 1, 2].map((c) => (
                  <rect
                    key={`${r}-${c}`}
                    x={-42 + c * 28}
                    y={-42 + r * 28}
                    width="26"
                    height="26"
                    rx="2"
                    fill={(r + c) % 2 === 0 ? '#469650' : '#BCE074'}
                    stroke="#143D28"
                    strokeWidth="1.2"
                  />
                ))
              )}
            </g>
          </g>
        )}

        {craftId === 'canang-sari-sampian' && (
          <g>
            <rect x="-56" y="-56" width="112" height="112" rx="10" fill="#4CA156" stroke="#143D28" strokeWidth="2" />
            <circle cx="-30" cy="-30" r="14" fill="#FAFBF6" stroke="#CFE4CA" strokeWidth="1" />
            <circle cx="30" cy="-30" r="14" fill="#B65236" />
            <circle cx="-30" cy="30" r="14" fill="#E2B334" />
            <circle cx="30" cy="30" r="14" fill="#DD7930" />
            {Array.from({ length: 8 }).map((_, i) => (
              <ellipse
                key={i}
                cx="0"
                cy="-24"
                rx="7"
                ry="22"
                fill={i % 2 === 0 ? '#BCE074' : '#469650'}
                stroke="#143D28"
                strokeWidth="1.2"
                transform={`rotate(${i * 45})`}
              />
            ))}
            <circle cx="0" cy="0" r="9" fill="#8C6239" />
          </g>
        )}

        {craftId === 'janur-lidi-prep' && (
          <g>
            <rect x="-105" y="-44" width="95" height="88" rx="10" fill="#E8F5E9" stroke="#0F764A" strokeWidth="1.6" />
            {[-24, -8, 8, 24].map((dy, i) => (
              <rect
                key={dy}
                x="-95"
                y={dy - 5}
                width="75"
                height="10"
                rx="3"
                fill={i % 2 === 0 ? '#469650' : '#B3D564'}
                stroke="#143D28"
                strokeWidth="1"
              />
            ))}
            <g transform="translate(55, 0)">
              <line x1="-10" y1="-50" x2="-4" y2="52" stroke="#8C6239" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="0" y1="-52" x2="0" y2="54" stroke="#7A5A3A" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="10" y1="-50" x2="4" y2="52" stroke="#8C6239" strokeWidth="3.5" strokeLinecap="round" />
              <rect x="-14" y="10" width="28" height="9" rx="3" fill="#E2B334" stroke="#143D28" strokeWidth="1.2" />
            </g>
          </g>
        )}

        {craftId === 'penjor-galungan' && (
          <g>
            <path d="M -55 78 L -55 -28 Q -55 -78, 36 -58" fill="none" stroke="#4CA156" strokeWidth="11" strokeLinecap="round" />
            <path d="M -55 78 L -55 -28 Q -55 -78, 36 -58" fill="none" stroke="#E2B334" strokeWidth="3" strokeDasharray="8 8" />
            <circle cx="36" cy="-58" r="14" fill="#BCE074" stroke="#143D28" strokeWidth="1.5" />
            <path d="M 36 -44 L 22 40 L 50 40 Z" fill="#E2B334" stroke="#143D28" strokeWidth="1.4" />
            <circle cx="16" cy="-48" r="7" fill="#DD7930" />
          </g>
        )}

        {craftId === 'kembar-mayang' && (
          <g>
            <path d="M 0 -10 L -52 -66 L -30 -74 L 0 -10 L -14 -82 L 14 -82 L 0 -10 L 30 -74 L 52 -66 Z" fill="#469650" stroke="#143D28" strokeWidth="1.4" />
            <path d="M -2 -8 L -8 -30 L 0 -46 L -8 -62 L 0 -76 L 8 -62 L 0 -46 L 8 -30 Z" fill="#BCE074" stroke="#143D28" strokeWidth="1.3" />
            <polygon points="-28,12 28,12 22,56 -22,56" fill="#B65236" stroke="#143D28" strokeWidth="1.8" />
            <rect x="-20" y="-4" width="40" height="16" rx="3" fill="#82BC5E" stroke="#143D28" strokeWidth="1.3" />
          </g>
        )}

        {craftId === 'contemporary-janur-installation' && (
          <g>
            <circle cx="0" cy="0" r="64" fill="#E2B334" fillOpacity="0.22" />
            <rect x="-48" y="-56" width="96" height="112" rx="14" fill="#469650" stroke="#143D28" strokeWidth="2" />
            {[-30, 0, 30].map((y, r) =>
              [-28, 0, 28].map((x, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={x - 12}
                  y={y - 12}
                  width="24"
                  height="24"
                  rx="3"
                  fill={(r + c) % 2 === 0 ? '#E2B334' : '#BCE074'}
                  stroke="#143D28"
                  strokeWidth="1.2"
                />
              ))
            )}
            <circle cx="0" cy="0" r="14" fill="#FDF5DB" opacity="0.8" />
          </g>
        )}

        {craftId === 'ketupat-and-lepet' && (
          <g>
            <ellipse cx="0" cy="40" rx="115" ry="30" fill="#CFE4CA" stroke="#143D28" strokeWidth="1.8" />
            <g transform="translate(-44, 6) rotate(45)">
              <rect x="-26" y="-26" width="52" height="52" rx="5" fill="#469650" stroke="#143D28" strokeWidth="1.8" />
              <rect x="-24" y="-24" width="24" height="24" fill="#BCE074" />
              <rect x="0" y="0" width="24" height="24" fill="#BCE074" />
            </g>
            <g transform="translate(46, 12)">
              <rect x="-46" y="-16" width="92" height="32" rx="14" fill="#82BC5E" stroke="#143D28" strokeWidth="1.8" />
              {[-24, 0, 24].map((x) => (
                <line key={x} x1={x} y1="-16" x2={x} y2="16" stroke="#8C6239" strokeWidth="3.2" />
              ))}
            </g>
          </g>
        )}

        {craftId === 'exhibition-ensemble' && (
          <g>
            <ellipse cx="0" cy="46" rx="112" ry="26" fill="#EFE8D8" stroke="#8C6239" strokeWidth="1.6" />
            <path d="M 48 34 L 22 -34 L 46 -42 L 48 34 L 54 -44 L 78 -36 Z" fill="#469650" stroke="#143D28" strokeWidth="1.4" />
            <circle cx="-16" cy="-12" r="36" fill="none" stroke="#82BC5E" strokeWidth="14" />
            <circle cx="-16" cy="-12" r="36" fill="none" stroke="#143D28" strokeWidth="1.4" />
            <g transform="translate(-62, 26) rotate(45)">
              <rect x="-18" y="-18" width="36" height="36" rx="4" fill="#BCE074" stroke="#143D28" strokeWidth="1.5" />
            </g>
          </g>
        )}

        {craftId === 'belalang-janur-toys' && (
          <g>
            <ellipse cx="0" cy="46" rx="110" ry="24" fill="#EFE8D8" stroke="#8C6239" strokeWidth="1.6" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={-36 + i * 18}
                y={-8 + i * 1.5}
                width="17"
                height={20 - i * 1.5}
                rx="3"
                fill={i % 2 === 0 ? '#469650' : '#BCE074'}
                stroke="#143D28"
                strokeWidth="1.2"
              />
            ))}
            <path d="M -36 0 C -62 -24, -68 -48, -52 -52" fill="none" stroke="#143D28" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M -36 6 C -66 -12, -74 -34, -62 -40" fill="none" stroke="#0F764A" strokeWidth="2.4" strokeLinecap="round" />
            <path d="M 18 0 L 50 -34 L 74 28" fill="none" stroke="#0F764A" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )}
      </g>
    </svg>
  );
};

interface FinishedCraftModalCardProps {
  craft: StudioCraftConfig;
  onTryAgain: () => void;
  onChooseAnother: () => void;
}

export const FinishedCraftShowcase: React.FC<FinishedCraftModalCardProps> = ({
  craft,
  onTryAgain,
  onChooseAnother,
}) => {
  const [angle, setAngle] = useState<CraftAngle>('front');
  const [showPhoto, setShowPhoto] = useState(false);

  return (
    <div className="bg-gradient-to-br from-[#FDF5DB] via-[#FAFBF6] to-[#E8F5E9] border-2 border-[#0F764A] rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="text-center max-w-xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-[#B65236] font-semibold">
          Craft Complete!
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#132219] mt-1">
          Well Done! You Made {craft.title}
        </h2>
        <p className="text-sm text-[#3F5749] mt-2 leading-relaxed">
          {craft.completedDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-7 space-y-3">
          <div className="rounded-xl overflow-hidden border border-[#B5D2AF] bg-[#FAFBF6]">
            {showPhoto ? (
              <div className="aspect-[16/11] w-full">
                <ResilientImage
                  src={craft.imageUrl}
                  alt={craft.title}
                  fallbackTitle={craft.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <CraftThumbnailSVG craftId={craft.id} angle={angle} />
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {(['front', 'side', 'top'] as CraftAngle[]).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setShowPhoto(false);
                  setAngle(a);
                }}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  !showPhoto && angle === a
                    ? 'bg-[#143D28] text-white border-[#143D28]'
                    : 'bg-[#FAFBF6] text-[#143D28] border-[#B5D2AF] hover:bg-[#E8F5E9]'
                }`}
              >
                {a === 'front' ? 'Front View' : a === 'side' ? 'Side View' : 'Top View'}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowPhoto(true)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                showPhoto
                  ? 'bg-[#B65236] text-white border-[#B65236]'
                  : 'bg-[#FAFBF6] text-[#143D28] border-[#B5D2AF] hover:bg-[#FAEDE8]'
              }`}
            >
              Real Photo
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-[#FAFBF6] border border-[#B5D2AF] space-y-2">
            <p className="font-mono text-xs uppercase tracking-wider text-[#0F764A] font-semibold">
              What You Are Looking At
            </p>
            <p className="text-sm text-[#132219] leading-relaxed">
              {showPhoto
                ? `Real photo of traditional Indonesian ${craft.indonesianName}.`
                : craft.angleNotes[angle]}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5">
            <button
              type="button"
              onClick={onTryAgain}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#143D28] bg-[#FAFBF6] border border-[#B5D2AF] rounded-lg hover:bg-[#E8F5E9] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <button
              type="button"
              onClick={onChooseAnother}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#143D28] rounded-lg hover:bg-[#0D2B1B] transition-colors cursor-pointer"
            >
              <span>Choose Another Craft</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
