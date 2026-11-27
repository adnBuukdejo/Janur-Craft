import React, { useCallback, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  Package,
  Sparkles,
  Wrench,
} from 'lucide-react';
import {
  CraftDifficulty,
  STUDIO_CRAFTS,
  StudioCraftConfig,
  StudioMode,
} from '../data/studioCrafts';
import { ResilientImage } from './ResilientImage';
import { MaterialPreviewSVG } from './studio/StudioVisuals';
import { KetupatCraftStudio, StudioSnapshot } from './KetupatCraftStudio';
import { CraftBenchWorkshop, WorkshopSnapshot } from './studio/CraftBenchWorkshop';
import { JanurLeafIcon, KetupatDiamondIcon } from './BotanicalDecorations';

type StudioView = 'select' | 'prep' | 'craft';

function getDifficultyStyle(diff: CraftDifficulty): string {
  switch (diff) {
    case 'Easy':
      return 'bg-[#E8F5E9] text-[#0F764A] border-[#B5D2AF]';
    case 'Medium':
      return 'bg-[#FDF5DB] text-[#8C6239] border-[#E8D28C]';
    case 'Hard':
      return 'bg-[#FAEDE8] text-[#B65236] border-[#E4B7AA]';
  }
}

export const InteractiveCraftStudio: React.FC = () => {
  const [view, setView] = useState<StudioView>('select');
  const [selectedCraftId, setSelectedCraftId] = useState<string>(STUDIO_CRAFTS[0].id);
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | CraftDifficulty>('All');
  const [mode, setMode] = useState<StudioMode>('learn');
  const [showMaterialsDrawer, setShowMaterialsDrawer] = useState(false);

  // Isolated per-craft progress & snapshots so switching crafts never mixes state
  const [progressByCraft, setProgressByCraft] = useState<Record<string, number>>({});
  const [ketupatSnapshot, setKetupatSnapshot] = useState<StudioSnapshot | undefined>(undefined);
  const [workshopSnapshots, setWorkshopSnapshots] = useState<Record<string, WorkshopSnapshot>>({});

  const selectedCraft: StudioCraftConfig =
    STUDIO_CRAFTS.find((c) => c.id === selectedCraftId) || STUDIO_CRAFTS[0];

  const handleProgressUpdate = useCallback(
    (craftId: string, pct: number) => {
      setProgressByCraft((prev) => (prev[craftId] === pct ? prev : { ...prev, [craftId]: pct }));
    },
    []
  );

  const visibleCrafts =
    difficultyFilter === 'All'
      ? STUDIO_CRAFTS
      : STUDIO_CRAFTS.filter((c) => c.difficulty === difficultyFilter);

  const openCraftPrep = (craftId: string) => {
    setSelectedCraftId(craftId);
    setShowMaterialsDrawer(false);
    setView('prep');
  };

  // ==================== VIEW 1: CRAFT SELECTION GRID (ALL 9 CRAFTS) ====================
  if (view === 'select') {
    const completedCount = Object.values(progressByCraft).filter((v) => v >= 100).length;

    return (
      <div className="space-y-6">
        {/* Intro & Difficulty Filter */}
        <div className="bg-gradient-to-r from-[#E8F5E9] via-[#FAFBF6] to-[#FDF5DB]/85 border border-[#B5D2AF] rounded-2xl p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#B65236] font-semibold">
              <KetupatDiamondIcon className="w-4 h-4 shrink-0" />
              <span>9 Gallery Creations · Hands-On 2D Craft Table</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#132219]">
              Choose a Janur Craft to Make
            </h2>
            <p className="text-sm text-[#3F5749] max-w-2xl leading-relaxed">
              Every craft from our Craft Gallery is ready to build! Pick one below to see its materials, choose Learn Mode or Free Practice Mode, and craft it step by step with your mouse or finger.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-2.5 shrink-0">
            <span className="font-mono text-xs tabular-nums px-3 py-1.5 rounded-lg bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28] font-semibold">
              {completedCount} / {STUDIO_CRAFTS.length} Crafts Completed
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(['All', 'Easy', 'Medium', 'Hard'] as const).map((level) => {
                const active = difficultyFilter === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficultyFilter(level)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#143D28] text-white border-[#143D28]'
                        : 'bg-[#FAFBF6] text-[#132219] border-[#B5D2AF] hover:bg-[#FDF5DB]'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 9-Craft Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCrafts.map((craft, idx) => {
            const pct = progressByCraft[craft.id] || 0;
            const isDone = pct >= 100;
            const cardTint =
              idx % 3 === 1
                ? 'bg-[#FDF5DB]/60 border-[#E8D28C]'
                : idx % 3 === 2
                ? 'bg-[#EFE8D8]/70 border-[#D8CBB0]'
                : 'bg-[#E8F5E9]/80 border-[#B5D2AF]';

            return (
              <div
                key={craft.id}
                className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-colors hover:border-[#0F764A] ${cardTint}`}
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-[#CFE4CA] overflow-hidden">
                    <ResilientImage
                      src={craft.imageUrl}
                      alt={craft.title}
                      fallbackTitle={craft.title}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold border ${getDifficultyStyle(
                        craft.difficulty
                      )}`}
                    >
                      {craft.difficulty}
                    </span>
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#FAFBF6]/95 text-[#143D28] border border-[#B5D2AF]">
                      {craft.duration}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <p className="font-serif italic text-sm text-[#0F764A]">
                      {craft.indonesianName}
                    </p>
                    <h3 className="font-serif text-2xl font-semibold text-[#132219] leading-snug">
                      {craft.title}
                    </h3>
                    <p className="text-sm text-[#3F5749] leading-relaxed">
                      {craft.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 space-y-3">
                  {pct > 0 && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className={isDone ? 'text-[#0F764A] font-semibold' : 'text-[#8C6239]'}>
                          {isDone ? 'Completed ✓' : 'In Progress'}
                        </span>
                        <span className="tabular-nums font-semibold text-[#143D28]">{pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#CFE4CA] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0F764A]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => openCraftPrep(craft.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#143D28] rounded-xl hover:bg-[#0D2B1B] transition-colors cursor-pointer min-h-[44px]"
                  >
                    <span>
                      {isDone
                        ? 'View or Practice Again'
                        : pct > 0
                        ? 'Continue Making'
                        : 'Start Making'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ==================== VIEW 2: PRE-START MATERIALS, TOOLS & MODE SELECTION ====================
  if (view === 'prep') {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setView('select')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#143D28] bg-[#FAFBF6] border border-[#B5D2AF] rounded-lg hover:bg-[#E8F5E9] transition-colors cursor-pointer min-h-[40px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All 9 Crafts</span>
          </button>
          <span
            className={`px-3 py-1 rounded-md text-xs font-semibold border ${getDifficultyStyle(
              selectedCraft.difficulty
            )}`}
          >
            {selectedCraft.difficulty} · {selectedCraft.duration}
          </span>
        </div>

        <div className="bg-gradient-to-br from-[#F6F1E3] via-[#FAFBF6] to-[#E8F5E9] border-2 border-[#B5D2AF] rounded-2xl p-6 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <div className="aspect-[16/11] rounded-xl overflow-hidden border-2 border-[#B5D2AF] bg-[#CFE4CA]">
                <ResilientImage
                  src={selectedCraft.imageUrl}
                  alt={selectedCraft.title}
                  fallbackTitle={selectedCraft.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-3">
              <p className="font-mono text-xs uppercase tracking-widest text-[#B65236] font-semibold">
                Before You Start · Get Your Materials Ready
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#132219]">
                {selectedCraft.title}
              </h2>
              <p className="font-serif italic text-base text-[#0F764A]">
                Indonesian name: {selectedCraft.indonesianName}
              </p>
              <p className="text-sm sm:text-base text-[#3F5749] leading-relaxed">
                {selectedCraft.shortDescription}
              </p>
            </div>
          </div>

          {/* Materials & Tools Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#E8F5E9]/85 border border-[#B5D2AF] rounded-xl p-5 space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-[#B5D2AF]">
                <Package className="w-4 h-4 text-[#0F764A]" />
                <h3 className="font-serif text-2xl font-semibold text-[#132219]">
                  Materials Needed
                </h3>
              </div>
              <div className="space-y-3">
                {selectedCraft.materials.map((mat) => (
                  <div
                    key={mat.name}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-[#FAFBF6] border border-[#B5D2AF]"
                  >
                    <MaterialPreviewSVG kind={mat.visualKind} />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-[#132219]">{mat.name}</p>
                        <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#FDF5DB] border border-[#E8D28C] text-[#8C6239] font-semibold">
                          {mat.amount}
                        </span>
                      </div>
                      <p className="text-xs text-[#3F5749] mt-0.5 leading-relaxed">{mat.use}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FDF5DB]/75 border border-[#E8D28C] rounded-xl p-5 space-y-3.5">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E8D28C]">
                <Wrench className="w-4 h-4 text-[#B65236]" />
                <h3 className="font-serif text-2xl font-semibold text-[#132219]">
                  Tools Needed
                </h3>
              </div>
              <div className="space-y-3">
                {selectedCraft.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-[#FAFBF6] border border-[#E8D28C]"
                  >
                    <MaterialPreviewSVG kind={tool.visualKind} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[#132219]">{tool.name}</p>
                      <p className="text-xs text-[#3F5749] mt-0.5 leading-relaxed">{tool.use}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Mode Selector */}
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-semibold text-[#132219]">
              Choose How You Want to Craft
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMode('learn')}
                className={`text-left p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                  mode === 'learn'
                    ? 'bg-[#E8F5E9] border-[#0F764A]'
                    : 'bg-[#FAFBF6] border-[#B5D2AF] hover:bg-[#E8F5E9]/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="inline-flex items-center gap-2 font-semibold text-sm text-[#143D28]">
                    <BookOpen className="w-4 h-4 text-[#0F764A]" />
                    <span>Learn Mode (Guided)</span>
                  </span>
                  {mode === 'learn' && <CheckCircle2 className="w-4 h-4 text-[#0F764A]" />}
                </div>
                <p className="text-xs text-[#3F5749] leading-relaxed">
                  Shows clear step-by-step instructions, Action Demo pictures, glowing target circles, and Before / After / Why notes. Best for beginners!
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMode('free')}
                className={`text-left p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                  mode === 'free'
                    ? 'bg-[#FDF5DB] border-[#DD7930]'
                    : 'bg-[#FAFBF6] border-[#B5D2AF] hover:bg-[#FDF5DB]/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="inline-flex items-center gap-2 font-semibold text-sm text-[#143D28]">
                    <Compass className="w-4 h-4 text-[#DD7930]" />
                    <span>Free Practice Mode</span>
                  </span>
                  {mode === 'free' && <CheckCircle2 className="w-4 h-4 text-[#DD7930]" />}
                </div>
                <p className="text-xs text-[#3F5749] leading-relaxed">
                  Hides extra guides and dashed target hints so you can practice crafting from memory. You can still use Undo, Reset, and Hint anytime!
                </p>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-[#B5D2AF]">
            <button
              type="button"
              onClick={() => setView('select')}
              className="px-5 py-3 text-sm font-medium text-[#143D28] bg-[#FAFBF6] border border-[#B5D2AF] rounded-xl hover:bg-[#E8F5E9] cursor-pointer"
            >
              Choose Another Craft
            </button>
            <button
              type="button"
              onClick={() => setView('craft')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#143D28] rounded-xl hover:bg-[#0D2B1B] transition-colors cursor-pointer min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-[#E2B334]" />
              <span>Start Crafting Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==================== VIEW 3: ACTIVE CRAFT WORKBENCH ====================
  const activePct = progressByCraft[selectedCraft.id] || 0;

  return (
    <div className="space-y-5">
      {/* Workbench Header Toolbar */}
      <div className="bg-gradient-to-r from-[#143D28] via-[#1B4D33] to-[#0F764A] text-[#FAFBF6] rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setView('select')}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#FAFBF6] text-[#143D28] rounded-lg hover:bg-[#FDF5DB] transition-colors cursor-pointer min-h-[40px]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Choose Another Craft</span>
            </button>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-[#E2B334] font-semibold">
                {selectedCraft.difficulty} · {selectedCraft.duration} · {activePct}% Done
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold leading-tight">
                {selectedCraft.title}
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Live Mode Switcher */}
            <div className="inline-flex rounded-lg bg-[#0D2B1B] p-1 border border-[#3B8E47]">
              <button
                type="button"
                onClick={() => setMode('learn')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  mode === 'learn'
                    ? 'bg-[#E2B334] text-[#132219]'
                    : 'text-[#E8F5E9] hover:text-white'
                }`}
              >
                Learn Mode
              </button>
              <button
                type="button"
                onClick={() => setMode('free')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  mode === 'free'
                    ? 'bg-[#DD7930] text-white'
                    : 'text-[#E8F5E9] hover:text-white'
                }`}
              >
                Free Practice
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowMaterialsDrawer((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#255D3F] text-[#FAFBF6] border border-[#A4CF7A]/40 hover:bg-[#0F764A] transition-colors cursor-pointer min-h-[40px]"
            >
              <JanurLeafIcon className="w-4 h-4" />
              <span>{showMaterialsDrawer ? 'Hide Materials' : 'Materials & Tools'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Materials & Tools Reference Strip */}
        {showMaterialsDrawer && (
          <div className="pt-3 border-t border-[#2D6E4B] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {selectedCraft.materials.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FAFBF6] text-[#132219]"
              >
                <MaterialPreviewSVG kind={m.visualKind} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{m.name}</p>
                  <p className="text-[11px] text-[#0F764A] font-mono">{m.amount}</p>
                </div>
              </div>
            ))}
            {selectedCraft.tools.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FDF5DB] text-[#132219]"
              >
                <MaterialPreviewSVG kind={t.visualKind} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{t.name}</p>
                  <p className="text-[11px] text-[#8C6239]">Tool</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Craft-Specific Interactive Workbench (Ketupat vs 8 Other Gallery Crafts) */}
      {selectedCraft.id === 'ketupat-bawang' ? (
        <KetupatCraftStudio
          key="ketupat-bawang"
          mode={mode}
          savedState={ketupatSnapshot}
          onStateChange={setKetupatSnapshot}
          onProgressChange={(pct) => handleProgressUpdate('ketupat-bawang', pct)}
          onChooseAnother={() => setView('select')}
        />
      ) : (
        <CraftBenchWorkshop
          key={selectedCraft.id}
          craft={selectedCraft}
          mode={mode}
          savedState={workshopSnapshots[selectedCraft.id]}
          onStateChange={(snap) =>
            setWorkshopSnapshots((prev) => ({ ...prev, [selectedCraft.id]: snap }))
          }
          onProgressChange={(pct) => handleProgressUpdate(selectedCraft.id, pct)}
          onChooseAnother={() => setView('select')}
        />
      )}
    </div>
  );
};
