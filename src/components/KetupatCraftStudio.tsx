import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Droplets,
  HelpCircle,
  RotateCcw,
  RotateCw,
  Scissors,
  Sparkles,
  Undo2,
} from 'lucide-react';

type CrossingState = 'over' | 'under';

interface StudioSnapshot {
  stage: number;
  leafOnMat: boolean;
  leafHydrated: boolean;
  leafStripped: boolean;
  stripAPlaced: boolean;
  stripBPlaced: boolean;
  stripBRotated: boolean;
  crossings: CrossingState[][];
  tuckedCorners: boolean[];
  tightness: number;
}

const TARGET_PATTERN: CrossingState[][] = [
  ['over', 'under', 'over'],
  ['under', 'over', 'under'],
  ['over', 'under', 'over'],
];

const INITIAL_CROSSINGS: CrossingState[][] = [
  ['over', 'over', 'over'],
  ['over', 'over', 'over'],
  ['over', 'over', 'over'],
];

const INITIAL_STATE: StudioSnapshot = {
  stage: 0,
  leafOnMat: false,
  leafHydrated: false,
  leafStripped: false,
  stripAPlaced: false,
  stripBPlaced: false,
  stripBRotated: false,
  crossings: INITIAL_CROSSINGS.map((r) => [...r]),
  tuckedCorners: [false, false, false, false],
  tightness: 0,
};

interface StageInstruction {
  title: string;
  shortLabel: string;
  instruction: string;
  goalText: string;
  hintText: string;
}

const STAGE_INSTRUCTIONS: StageInstruction[] = [
  {
    title: 'Step 1: Prepare & Split the Coconut Leaf',
    shortLabel: '1. Prepare Leaf',
    instruction:
      'Drag the Whole Young Coconut Leaf (Janur) onto the weaving mat. Next, tap or drag the Bowl of Water to soften it, then drag or click the Craft Knife across the middle stick (lidi) to split it into two green strips.',
    goalText: 'Place leaf on mat and split the center lidi stick.',
    hintText: 'Click or drag the Whole Coconut Leaf onto the mat first, then use the Craft Knife.',
  },
  {
    title: 'Step 2: Arrange Leaf Strip A (Vertical Loops)',
    shortLabel: '2. Place Strip A',
    instruction:
      'Select Green Leaf Strip A from the Materials Panel and drag it onto the vertical guide on the mat to form three parallel leaf loops pointing upward.',
    goalText: 'Place Green Leaf Strip A vertically on the weaving mat.',
    hintText: 'Drag "Leaf Strip A" from the left panel onto the dashed vertical strips in the center.',
  },
  {
    title: 'Step 3: Place & Rotate Leaf Strip B',
    shortLabel: '3. Rotate Strip B',
    instruction:
      'Drag Light-Green Leaf Strip B onto the workspace. Since it starts vertical, click "Rotate 90°" so it lies horizontally across Strip A, ready for weaving.',
    goalText: 'Place Strip B on the mat and rotate it 90° horizontally.',
    hintText: 'Drop Strip B onto the mat, then click the "Rotate 90°" button above the workspace.',
  },
  {
    title: 'Step 4: Weave Over & Under',
    shortLabel: '4. Weave Grid',
    instruction:
      'Time to weave! Click any of the 9 leaf crossings where the strips meet to switch between OVER and UNDER. Create an alternating checkerboard pattern so the strips lock together.',
    goalText: 'Match all 9 crossings to the alternating Over–Under pattern.',
    hintText: 'Row 1: Over · Under · Over | Row 2: Under · Over · Under | Row 3: Over · Under · Over.',
  },
  {
    title: 'Step 5: Fold Edges & Tuck the Leaf Ends',
    shortLabel: '5. Tuck Ends',
    instruction:
      'Now fold the four protruding leaf ends around the diamond frame! Drag or tap each loose leaf end into its glowing corner pocket to close the sides.',
    goalText: 'Tuck all 4 loose leaf ends into the corner pockets.',
    hintText: 'Click or drag each of the 4 numbered leaf ends around the weave to tuck them in.',
  },
  {
    title: 'Step 6: Tighten Into a Diamond Ketupat',
    shortLabel: '6. Tighten Shape',
    instruction:
      'Pull the strips snug! Drag the "Tighten Weave" slider all the way to 100% (or click "Pull Tight") to close the gaps and form a traditional woven diamond ketupat.',
    goalText: 'Pull the tightness slider to 100% to complete your ketupat!',
    hintText: 'Slide "Tighten Weave" to 100% or tap the "Pull Strips Tight" button.',
  },
];

type DragItemId =
  | 'whole-leaf'
  | 'water-bowl'
  | 'knife'
  | 'strip-a'
  | 'strip-b'
  | 'tail-0'
  | 'tail-1'
  | 'tail-2'
  | 'tail-3';

const DRAG_LABELS: Record<DragItemId, string> = {
  'whole-leaf': 'Young Coconut Leaf (Janur)',
  'water-bowl': 'Bowl of Cool Water',
  knife: 'Craft Knife (Pisau Raut)',
  'strip-a': 'Leaf Strip A (Sage Green)',
  'strip-b': 'Leaf Strip B (Light Green)',
  'tail-0': 'Top-Left End',
  'tail-1': 'Top-Right End',
  'tail-2': 'Bottom-Left End',
  'tail-3': 'Bottom-Right End',
};

export const KetupatCraftStudio: React.FC = () => {
  const [state, setState] = useState<StudioSnapshot>(INITIAL_STATE);
  const [history, setHistory] = useState<StudioSnapshot[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<DragItemId | null>(null);
  const [draggingItem, setDraggingItem] = useState<DragItemId | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isOverMat, setIsOverMat] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>(
    'Drag materials from the Materials Panel onto the weaving mat—or tap an item and tap the mat!'
  );

  const workspaceRef = useRef<HTMLDivElement>(null);

  const pushState = useCallback(
    (updater: (prev: StudioSnapshot) => StudioSnapshot, msg?: string) => {
      setState((prev) => {
        setHistory((h) => [...h.slice(-15), prev]);
        return updater(prev);
      });
      setShowHint(false);
      if (msg) setFeedbackMsg(msg);
    },
    []
  );

  const stageInfo = STAGE_INSTRUCTIONS[state.stage];

  const lockedCrossingsCount = state.crossings.reduce((acc, row, r) => {
    return (
      acc +
      row.reduce((rowAcc, val, c) => rowAcc + (val === TARGET_PATTERN[r][c] ? 1 : 0), 0)
    );
  }, 0);

  const isStageComplete = (s: StudioSnapshot, idx: number): boolean => {
    switch (idx) {
      case 0:
        return s.leafOnMat && s.leafStripped;
      case 1:
        return s.stripAPlaced;
      case 2:
        return s.stripBPlaced && s.stripBRotated;
      case 3:
        return s.crossings.every((row, r) =>
          row.every((val, c) => val === TARGET_PATTERN[r][c])
        );
      case 4:
        return s.tuckedCorners.every(Boolean);
      case 5:
        return s.tightness >= 100;
      default:
        return false;
    }
  };

  const currentComplete = isStageComplete(state, state.stage);

  // Handle dropping or clicking a material onto the workspace
  const applyMaterialAction = useCallback(
    (itemId: DragItemId) => {
      if (itemId === 'whole-leaf') {
        if (!state.leafOnMat) {
          pushState(
            (p) => ({ ...p, leafOnMat: true }),
            'Great! The fresh coconut leaf is on the mat. Now soften it with water or use the Craft Knife to split the center stick (lidi).'
          );
        }
        return;
      }

      if (itemId === 'water-bowl') {
        if (!state.leafOnMat) {
          setFeedbackMsg('Place the Whole Coconut Leaf on the mat first before moistening it.');
          return;
        }
        pushState(
          (p) => ({ ...p, leafHydrated: true }),
          'Nice! The coconut leaf is moist and flexible, ready for splitting.'
        );
        return;
      }

      if (itemId === 'knife') {
        if (!state.leafOnMat) {
          setFeedbackMsg('First place the Whole Coconut Leaf on the mat.');
          return;
        }
        if (!state.leafStripped) {
          pushState(
            (p) => ({ ...p, leafStripped: true }),
            'Well done! You separated the woody lidi stick and now have Leaf Strip A and Leaf Strip B!'
          );
        }
        return;
      }

      if (itemId === 'strip-a') {
        if (!state.leafStripped) {
          setFeedbackMsg('Finish Step 1 by splitting the whole coconut leaf with the Craft Knife first.');
          return;
        }
        if (state.stage < 1) {
          pushState(
            (p) => ({ ...p, stage: 1, stripAPlaced: true }),
            'Awesome! Leaf Strip A is arranged into 3 vertical loops. Move to Step 3 to add Strip B.'
          );
        } else {
          pushState(
            (p) => ({ ...p, stripAPlaced: true }),
            'Leaf Strip A placed into 3 vertical loops! Ready for Step 3.'
          );
        }
        return;
      }

      if (itemId === 'strip-b') {
        if (!state.stripAPlaced) {
          setFeedbackMsg('Place Leaf Strip A on the mat first (Step 2).');
          return;
        }
        pushState(
          (p) => ({ ...p, stage: Math.max(p.stage, 2), stripBPlaced: true }),
          'Strip B is on the mat! Now click "Rotate 90°" so it lies horizontally across Strip A.'
        );
        return;
      }

      if (itemId.startsWith('tail-')) {
        const idx = Number(itemId.replace('tail-', ''));
        if (state.tuckedCorners[idx]) return;
        const nextCount = state.tuckedCorners.filter(Boolean).length + 1;
        pushState(
          (p) => {
            const nextTucked = [...p.tuckedCorners];
            nextTucked[idx] = true;
            return { ...p, tuckedCorners: nextTucked };
          },
          nextCount === 4
            ? 'All 4 leaf ends are tucked! Click Next Step to tighten your diamond ketupat.'
            : `Tucked leaf end ${idx + 1} (${nextCount}/4). Keep tucking the remaining ends!`
        );
      }
    },
    [pushState, state.leafOnMat, state.leafStripped, state.stage, state.stripAPlaced, state.tuckedCorners]
  );

  // Global Pointer Move / Up listeners for smooth Drag-and-Drop on Desktop & Mobile Touch
  useEffect(() => {
    if (!draggingItem) return;

    const handleMove = (e: PointerEvent) => {
      setDragPos({ x: e.clientX, y: e.clientY });
      if (workspaceRef.current) {
        const rect = workspaceRef.current.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        setIsOverMat(inside);
      }
    };

    const handleUp = (e: PointerEvent) => {
      if (workspaceRef.current) {
        const rect = workspaceRef.current.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        if (inside) {
          applyMaterialAction(draggingItem);
        }
      }
      setDraggingItem(null);
      setIsOverMat(false);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [draggingItem, applyMaterialAction]);

  const startDrag = (itemId: DragItemId, e: React.PointerEvent) => {
    e.preventDefault();
    setSelectedMaterial(itemId);
    setDraggingItem(itemId);
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  const handleToggleCrossing = (r: number, c: number) => {
    if (state.stage < 3) return;
    pushState((prev) => {
      const nextGrid = prev.crossings.map((row, rIdx) =>
        row.map((val, cIdx) =>
          rIdx === r && cIdx === c ? (val === 'over' ? 'under' : 'over') : val
        )
      );
      return { ...prev, crossings: nextGrid };
    }, `Switched crossing (${r + 1}, ${c + 1})! Keep alternating Over and Under.`);
  };

  const handleRotateStripB = () => {
    if (!state.stripBPlaced) {
      setFeedbackMsg('Place Leaf Strip B on the mat first before rotating it.');
      return;
    }
    pushState(
      (p) => ({ ...p, stripBRotated: !p.stripBRotated }),
      !state.stripBRotated
        ? 'Rotated Strip B 90° horizontally! Click Next Step to start weaving Over & Under.'
        : 'Rotated Strip B back to vertical.'
    );
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setState(prev);
    setShowHint(false);
    setFeedbackMsg('Undid your last move.');
  };

  const handleReset = () => {
    setState(INITIAL_STATE);
    setHistory([]);
    setShowHint(false);
    setSelectedMaterial(null);
    setFeedbackMsg('Workspace reset. Start again by dragging the Young Coconut Leaf onto the mat!');
  };

  const handlePrevStep = () => {
    if (state.stage === 0) return;
    const prevIdx = state.stage - 1;
    pushState(
      (p) => ({ ...p, stage: prevIdx }),
      `Moved back to ${STAGE_INSTRUCTIONS[prevIdx].title}.`
    );
  };

  const handleNextStep = () => {
    if (state.stage >= STAGE_INSTRUCTIONS.length - 1) return;
    const nextIdx = state.stage + 1;
    pushState((p) => {
      const next = { ...p, stage: nextIdx };
      if (nextIdx >= 1) {
        next.leafOnMat = true;
        next.leafStripped = true;
      }
      if (nextIdx >= 2) {
        next.stripAPlaced = true;
      }
      if (nextIdx >= 3) {
        next.stripBPlaced = true;
        next.stripBRotated = true;
      }
      if (nextIdx >= 4) {
        next.crossings = TARGET_PATTERN.map((r) => [...r]);
      }
      if (nextIdx >= 5) {
        next.tuckedCorners = [true, true, true, true];
      }
      return next;
    }, STAGE_INSTRUCTIONS[nextIdx].goalText);
  };

  const goToStage = (targetIdx: number) => {
    if (targetIdx === state.stage) return;
    pushState((p) => {
      const next = { ...p, stage: targetIdx };
      if (targetIdx >= 1) {
        next.leafOnMat = true;
        next.leafStripped = true;
      }
      if (targetIdx >= 2) next.stripAPlaced = true;
      if (targetIdx >= 3) {
        next.stripBPlaced = true;
        next.stripBRotated = true;
      }
      if (targetIdx >= 4) next.crossings = TARGET_PATTERN.map((r) => [...r]);
      if (targetIdx >= 5) next.tuckedCorners = [true, true, true, true];
      return next;
    }, STAGE_INSTRUCTIONS[targetIdx].goalText);
  };

  return (
    <div className="space-y-6">
      {/* Stage Stepper Bar */}
      <div className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {STAGE_INSTRUCTIONS.map((st, idx) => {
            const active = state.stage === idx;
            const done = isStageComplete(state, idx);
            return (
              <button
                key={st.shortLabel}
                type="button"
                onClick={() => goToStage(idx)}
                className={`px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-colors flex items-center justify-between gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-[#17422B] text-white'
                    : done
                    ? 'bg-[#DCEAD9] text-[#17422B] border border-[#3A7D44]/40'
                    : 'bg-[#F7FAF6] text-[#455B4E] border border-[#C3D6C1] hover:bg-[#DCEAD9]/50'
                }`}
              >
                <span className="truncate">{st.shortLabel}</span>
                {done && !active && <CheckCircle2 className="w-3.5 h-3.5 text-[#3A7D44] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3-Zone Craft Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT ZONE: Materials Panel */}
        <aside className="lg:col-span-3 bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-4 space-y-3">
          <div className="pb-2.5 border-b border-[#C3D6C1]">
            <h2 className="font-serif text-2xl font-semibold text-[#15221B]">
              Materials Panel
            </h2>
            <p className="text-xs text-[#455B4E] mt-0.5">
              Drag any item onto the mat—or click an item to place/use it.
            </p>
          </div>

          <div className="space-y-2.5">
            {/* Material 1: Whole Coconut Leaf */}
            <div
              onPointerDown={(e) => startDrag('whole-leaf', e)}
              onClick={() => applyMaterialAction('whole-leaf')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyMaterialAction('whole-leaf');
              }}
              className={`p-3 rounded-xl border bg-[#F7FAF6] transition-all cursor-grab active:cursor-grabbing select-none ${
                showHint && !state.leafOnMat
                  ? 'border-[#3A7D44] ring-2 ring-[#3A7D44]/40'
                  : selectedMaterial === 'whole-leaf'
                  ? 'border-[#17422B]'
                  : 'border-[#C3D6C1] hover:border-[#3A7D44]'
              }`}
            >
              <div className="h-12 flex items-center justify-center">
                <svg viewBox="0 0 180 42" className="w-full h-10">
                  <path d="M 10 21 C 45 5, 130 6, 172 21 C 130 36, 45 37, 10 21 Z" fill="#89BA68" stroke="#2D6135" strokeWidth="1.2" />
                  <line x1="6" y1="21" x2="170" y2="21" stroke="#7A5A3A" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-[#15221B] mt-1">
                Young Coconut Leaf (Janur)
              </p>
              <p className="text-[11px] text-[#455B4E]">
                Fresh leaflet with center lidi stick
              </p>
            </div>

            {/* Material 2: Craft Knife */}
            <div
              onPointerDown={(e) => startDrag('knife', e)}
              onClick={() => applyMaterialAction('knife')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyMaterialAction('knife');
              }}
              className={`p-3 rounded-xl border bg-[#F7FAF6] transition-all cursor-grab active:cursor-grabbing select-none ${
                showHint && state.leafOnMat && !state.leafStripped
                  ? 'border-[#3A7D44] ring-2 ring-[#3A7D44]/40'
                  : 'border-[#C3D6C1] hover:border-[#3A7D44]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-10 rounded-lg bg-[#EDF4EC] flex items-center justify-center shrink-0">
                  <Scissors className="w-5 h-5 text-[#17422B]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#15221B]">
                    Craft Knife (Pisau Raut)
                  </p>
                  <p className="text-[11px] text-[#455B4E]">
                    Splits the center lidi stick cleanly
                  </p>
                </div>
              </div>
            </div>

            {/* Material 3: Leaf Strip A */}
            <div
              onPointerDown={(e) => startDrag('strip-a', e)}
              onClick={() => applyMaterialAction('strip-a')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyMaterialAction('strip-a');
              }}
              className={`p-3 rounded-xl border bg-[#F7FAF6] transition-all cursor-grab active:cursor-grabbing select-none ${
                !state.leafStripped ? 'opacity-60' : ''
              } ${
                showHint && state.stage === 1 && !state.stripAPlaced
                  ? 'border-[#3A7D44] ring-2 ring-[#3A7D44]/40'
                  : 'border-[#C3D6C1] hover:border-[#3A7D44]'
              }`}
            >
              <div className="h-9 flex items-center justify-center">
                <svg viewBox="0 0 180 28" className="w-full h-7">
                  <path d="M 8 10 L 145 9 L 172 14 L 145 19 L 8 20 Z" fill="#4E8D52" stroke="#17422B" strokeWidth="1.2" />
                  <line x1="12" y1="14" x2="162" y2="14" stroke="#8CC48B" strokeWidth="1" strokeDasharray="5 3" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-[#15221B] mt-1">
                Leaf Strip A (Sage Green)
              </p>
              <p className="text-[11px] text-[#455B4E]">
                {state.leafStripped ? 'Ready for vertical loops' : 'Split leaf first to unlock'}
              </p>
            </div>

            {/* Material 4: Leaf Strip B */}
            <div
              onPointerDown={(e) => startDrag('strip-b', e)}
              onClick={() => applyMaterialAction('strip-b')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyMaterialAction('strip-b');
              }}
              className={`p-3 rounded-xl border bg-[#F7FAF6] transition-all cursor-grab active:cursor-grabbing select-none ${
                !state.leafStripped ? 'opacity-60' : ''
              } ${
                showHint && state.stage === 2 && !state.stripBPlaced
                  ? 'border-[#3A7D44] ring-2 ring-[#3A7D44]/40'
                  : 'border-[#C3D6C1] hover:border-[#3A7D44]'
              }`}
            >
              <div className="h-9 flex items-center justify-center">
                <svg viewBox="0 0 180 28" className="w-full h-7">
                  <path d="M 8 10 L 145 9 L 172 14 L 145 19 L 8 20 Z" fill="#9BC46B" stroke="#3A7D44" strokeWidth="1.2" />
                  <line x1="12" y1="14" x2="162" y2="14" stroke="#D5EAAC" strokeWidth="1" strokeDasharray="5 3" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-[#15221B] mt-1">
                Leaf Strip B (Light Green)
              </p>
              <p className="text-[11px] text-[#455B4E]">
                {state.leafStripped ? 'Ready to weave horizontally' : 'Split leaf first to unlock'}
              </p>
            </div>

            {/* Material 5: Water Bowl */}
            <div
              onPointerDown={(e) => startDrag('water-bowl', e)}
              onClick={() => applyMaterialAction('water-bowl')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyMaterialAction('water-bowl');
              }}
              className="p-3 rounded-xl border border-[#C3D6C1] bg-[#F7FAF6] hover:border-[#3A7D44] transition-all cursor-grab active:cursor-grabbing select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-10 rounded-lg bg-[#E1EFEF] flex items-center justify-center shrink-0">
                  <Droplets className="w-5 h-5 text-[#2C6B74]" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#15221B]">
                    Bowl of Cool Water
                  </p>
                  <p className="text-[11px] text-[#455B4E]">
                    {state.leafHydrated ? 'Leaf moistened & soft' : 'Keeps leaves bendable'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER ZONE: Large Interactive Craft Workspace */}
        <section className="lg:col-span-6 space-y-3">
          {/* Workspace Toolbar */}
          <div className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-medium text-[#17422B]">
              Weaving Mat Workspace
            </span>
            <div className="flex items-center gap-2">
              {state.stage === 2 && (
                <button
                  type="button"
                  onClick={handleRotateStripB}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    showHint && state.stripBPlaced && !state.stripBRotated
                      ? 'bg-[#3A7D44] text-white ring-2 ring-[#3A7D44]/40'
                      : 'bg-[#17422B] text-white hover:bg-[#10311F]'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Rotate Strip B 90°</span>
                </button>
              )}
              {state.stage === 3 && (
                <span className="font-mono text-xs tabular-nums px-2.5 py-1 rounded-md bg-[#F7FAF6] border border-[#C3D6C1] text-[#17422B]">
                  Locked: {lockedCrossingsCount} / 9
                </span>
              )}
              {state.stage === 4 && (
                <span className="font-mono text-xs tabular-nums px-2.5 py-1 rounded-md bg-[#F7FAF6] border border-[#C3D6C1] text-[#17422B]">
                  Tucked: {state.tuckedCorners.filter(Boolean).length} / 4
                </span>
              )}
            </div>
          </div>

          {/* Interactive Woven Bamboo Mat Canvas */}
          <div
            ref={workspaceRef}
            onClick={() => {
              if (selectedMaterial && !draggingItem) {
                applyMaterialAction(selectedMaterial);
                setSelectedMaterial(null);
              }
            }}
            className={`relative rounded-xl border-2 transition-colors overflow-hidden min-h-[430px] sm:min-h-[480px] flex flex-col items-center justify-center p-4 select-none ${
              isOverMat
                ? 'border-[#3A7D44] bg-[#DCEAD9]/75'
                : 'border-[#C3D6C1] bg-[#F1F6EF]'
            }`}
          >
            {/* Subtle woven mat background pattern */}
            <svg
              viewBox="0 0 520 420"
              className="w-full max-w-[520px] h-auto"
              role="img"
              aria-label="Interactive ketupat weaving workspace"
            >
              <defs>
                <pattern id="matWeave" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="20" height="20" fill="#EDF3EA" />
                  <rect x="0" y="0" width="9" height="9" fill="#E3ECE0" rx="1" />
                  <rect x="10" y="10" width="9" height="9" fill="#E3ECE0" rx="1" />
                </pattern>
                <linearGradient id="leafSage" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B7943" />
                  <stop offset="50%" stopColor="#589A5B" />
                  <stop offset="100%" stopColor="#3B7943" />
                </linearGradient>
                <linearGradient id="leafLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#89BA5C" />
                  <stop offset="50%" stopColor="#B4D680" />
                  <stop offset="100%" stopColor="#89BA5C" />
                </linearGradient>
                <filter id="leafShadow" x="-15%" y="-15%" width="130%" height="130%">
                  <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#15221B" floodOpacity="0.22" />
                </filter>
              </defs>

              {/* Mat Surface */}
              <rect
                x="12"
                y="12"
                width="496"
                height="396"
                rx="16"
                fill="url(#matWeave)"
                stroke="#B8CEB6"
                strokeWidth="2"
              />

              {/* STAGE 0: Leaf Preparation */}
              {state.stage === 0 && (
                <g>
                  {!state.leafOnMat ? (
                    <g>
                      <rect
                        x="70"
                        y="150"
                        width="380"
                        height="120"
                        rx="14"
                        fill="none"
                        stroke="#3A7D44"
                        strokeWidth="2"
                        strokeDasharray="8 6"
                      />
                      <text
                        x="260"
                        y="205"
                        textAnchor="middle"
                        fill="#17422B"
                        fontSize="15"
                        fontWeight="600"
                      >
                        Drop Young Coconut Leaf Here
                      </text>
                      <text
                        x="260"
                        y="228"
                        textAnchor="middle"
                        fill="#455B4E"
                        fontSize="12"
                      >
                        Drag from the Materials Panel on the left
                      </text>
                    </g>
                  ) : !state.leafStripped ? (
                    <g>
                      {/* Whole coconut leaflet on mat */}
                      <path
                        d="M 55 210 C 145 140, 355 145, 465 210 C 355 275, 145 280, 55 210 Z"
                        fill={state.leafHydrated ? '#7AB562' : '#94C276'}
                        stroke="#17422B"
                        strokeWidth="2"
                        filter="url(#leafShadow)"
                      />
                      {/* Veins */}
                      <path d="M 100 190 C 200 165, 320 168, 430 202" fill="none" stroke="#D8EAC4" strokeWidth="1.2" strokeDasharray="6 4" />
                      <path d="M 100 230 C 200 255, 320 252, 430 218" fill="none" stroke="#D8EAC4" strokeWidth="1.2" strokeDasharray="6 4" />
                      {/* Center Lidi Stick */}
                      <line
                        x1="44"
                        y1="210"
                        x2="462"
                        y2="210"
                        stroke="#7A5A3A"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      {/* Interactive Knife Click Target along the lidi */}
                      <g
                        onClick={(e) => {
                          e.stopPropagation();
                          applyMaterialAction('knife');
                        }}
                        className="cursor-pointer"
                      >
                        <rect
                          x="150"
                          y="186"
                          width="220"
                          height="48"
                          rx="24"
                          fill="#F7FAF6"
                          fillOpacity="0.88"
                          stroke="#3A7D44"
                          strokeWidth="1.5"
                          strokeDasharray={showHint ? 'none' : '4 3'}
                        />
                        <text x="260" y="214" textAnchor="middle" fill="#17422B" fontSize="13" fontWeight="600">
                          Split Center Lidi Stick (Click or Drop Knife)
                        </text>
                      </g>
                    </g>
                  ) : (
                    <g>
                      {/* Separated Strip A */}
                      <g transform="translate(0, -52)">
                        <path
                          d="M 65 180 L 405 178 L 455 196 L 405 214 L 65 216 Z"
                          fill="url(#leafSage)"
                          stroke="#17422B"
                          strokeWidth="1.6"
                          filter="url(#leafShadow)"
                        />
                        <text x="245" y="201" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="600">
                          Leaf Strip A (Sage Green)
                        </text>
                      </g>
                      {/* Separated Lidi Stick */}
                      <line x1="65" y1="210" x2="455" y2="210" stroke="#7A5A3A" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
                      <text x="260" y="228" textAnchor="middle" fill="#7A5A3A" fontSize="11" fontWeight="600">
                        Lidi center stick set aside (saved for brooms or pins!)
                      </text>
                      {/* Separated Strip B */}
                      <g transform="translate(0, 62)">
                        <path
                          d="M 65 180 L 405 178 L 455 196 L 405 214 L 65 216 Z"
                          fill="url(#leafLight)"
                          stroke="#3A7D44"
                          strokeWidth="1.6"
                          filter="url(#leafShadow)"
                        />
                        <text x="245" y="201" textAnchor="middle" fill="#15221B" fontSize="12" fontWeight="600">
                          Leaf Strip B (Light Green)
                        </text>
                      </g>
                    </g>
                  )}
                </g>
              )}

              {/* STAGE 1: Place Strip A (3 Vertical Loops) */}
              {state.stage === 1 && (
                <g>
                  {/* Ghost Vertical Guide Slots */}
                  {[190, 260, 330].map((cx, i) => (
                    <g key={cx}>
                      {!state.stripAPlaced ? (
                        <rect
                          x={cx - 20}
                          y="70"
                          width="40"
                          height="280"
                          rx="8"
                          fill="#DCEAD9"
                          fillOpacity="0.45"
                          stroke="#3A7D44"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                        />
                      ) : (
                        <g filter="url(#leafShadow)">
                          {/* Tapered Leaf Loop Strip */}
                          <path
                            d={`M ${cx - 19} 68 L ${cx} 48 L ${cx + 19} 68 L ${cx + 19} 348 L ${cx - 19} 348 Z`}
                            fill="url(#leafSage)"
                            stroke="#17422B"
                            strokeWidth="1.6"
                          />
                          <line
                            x1={cx}
                            y1="66"
                            x2={cx}
                            y2="342"
                            stroke="#A3D39C"
                            strokeWidth="1"
                            strokeDasharray="6 4"
                          />
                          <text x={cx} y="370" textAnchor="middle" fill="#17422B" fontSize="11" fontWeight="600">
                            Loop A{i + 1}
                          </text>
                        </g>
                      )}
                    </g>
                  ))}
                  {!state.stripAPlaced && (
                    <text x="260" y="214" textAnchor="middle" fill="#17422B" fontSize="14" fontWeight="600">
                      Drop Leaf Strip A Here (3 Vertical Loops)
                    </text>
                  )}
                </g>
              )}

              {/* STAGE 2: Place & Rotate Strip B */}
              {state.stage === 2 && (
                <g>
                  {/* Vertical Strip A already placed */}
                  {[190, 260, 330].map((cx) => (
                    <path
                      key={cx}
                      d={`M ${cx - 19} 68 L ${cx} 48 L ${cx + 19} 68 L ${cx + 19} 348 L ${cx - 19} 348 Z`}
                      fill="url(#leafSage)"
                      stroke="#17422B"
                      strokeWidth="1.5"
                      opacity="0.9"
                    />
                  ))}

                  {!state.stripBPlaced ? (
                    <g>
                      <rect
                        x="100"
                        y="110"
                        width="320"
                        height="200"
                        rx="12"
                        fill="#F7FAF6"
                        fillOpacity="0.65"
                        stroke="#3A7D44"
                        strokeWidth="2"
                        strokeDasharray="7 5"
                      />
                      <text x="260" y="214" textAnchor="middle" fill="#17422B" fontSize="14" fontWeight="600">
                        Drop Leaf Strip B Here
                      </text>
                    </g>
                  ) : !state.stripBRotated ? (
                    /* Placed vertically before rotation */
                    <g transform="translate(95, 0)" filter="url(#leafShadow)">
                      {[200, 250, 300].map((cx) => (
                        <path
                          key={cx}
                          d={`M ${cx - 16} 76 L ${cx + 16} 76 L ${cx + 16} 336 L ${cx} 356 L ${cx - 16} 336 Z`}
                          fill="url(#leafLight)"
                          stroke="#3A7D44"
                          strokeWidth="1.5"
                        />
                      ))}
                      <text x="250" y="380" textAnchor="middle" fill="#17422B" fontSize="12" fontWeight="600">
                        Click &ldquo;Rotate Strip B 90°&rdquo; above!
                      </text>
                    </g>
                  ) : (
                    /* Rotated horizontally across Strip A */
                    <g filter="url(#leafShadow)">
                      {[140, 210, 280].map((cy, i) => (
                        <g key={cy}>
                          <path
                            d={`M 95 ${cy - 18} L 420 ${cy - 18} L 444 ${cy} L 420 ${cy + 18} L 95 ${cy + 18} Z`}
                            fill="url(#leafLight)"
                            stroke="#3A7D44"
                            strokeWidth="1.5"
                            opacity="0.92"
                          />
                          <text x="72" y={cy + 4} textAnchor="middle" fill="#17422B" fontSize="11" fontWeight="600">
                            B{i + 1}
                          </text>
                        </g>
                      ))}
                    </g>
                  )}
                </g>
              )}

              {/* STAGE 3: Interactive 3x3 Over/Under Weaving */}
              {state.stage === 3 && (
                <g>
                  {/* Base Vertical Strips A */}
                  {[190, 260, 330].map((cx) => (
                    <path
                      key={`va-${cx}`}
                      d={`M ${cx - 21} 64 L ${cx} 44 L ${cx + 21} 64 L ${cx + 21} 352 L ${cx - 21} 352 Z`}
                      fill="url(#leafSage)"
                      stroke="#17422B"
                      strokeWidth="1.5"
                    />
                  ))}

                  {/* Base Horizontal Strips B */}
                  {[140, 210, 280].map((cy) => (
                    <path
                      key={`hb-${cy}`}
                      d={`M 95 ${cy - 21} L 422 ${cy - 21} L 446 ${cy} L 422 ${cy + 21} L 95 ${cy + 21} Z`}
                      fill="url(#leafLight)"
                      stroke="#3A7D44"
                      strokeWidth="1.5"
                    />
                  ))}

                  {/* Interactive Crossing Tiles rendering true Over / Under layering */}
                  {[140, 210, 280].map((cy, r) =>
                    [190, 260, 330].map((cx, c) => {
                      const mode = state.crossings[r][c];
                      const matches = mode === TARGET_PATTERN[r][c];
                      return (
                        <g
                          key={`${r}-${c}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleCrossing(r, c);
                          }}
                          className="cursor-pointer"
                        >
                          {mode === 'over' ? (
                            <rect
                              x={cx - 24}
                              y={cy - 21}
                              width="48"
                              height="42"
                              fill="url(#leafLight)"
                              stroke="#17422B"
                              strokeWidth="1.6"
                              filter="url(#leafShadow)"
                            />
                          ) : (
                            <rect
                              x={cx - 21}
                              y={cy - 24}
                              width="42"
                              height="48"
                              fill="url(#leafSage)"
                              stroke="#17422B"
                              strokeWidth="1.6"
                              filter="url(#leafShadow)"
                            />
                          )}

                          {/* Hint highlight ring for mismatched crossings */}
                          {showHint && !matches && (
                            <rect
                              x={cx - 27}
                              y={cy - 27}
                              width="54"
                              height="54"
                              rx="6"
                              fill="none"
                              stroke="#D97706"
                              strokeWidth="2.8"
                            />
                          )}

                          <text
                            x={cx}
                            y={cy + 4}
                            textAnchor="middle"
                            fill={mode === 'over' ? '#15221B' : '#FFFFFF'}
                            fontSize="10"
                            fontWeight="700"
                          >
                            {mode === 'over' ? 'OVER' : 'UNDER'}
                          </text>
                        </g>
                      );
                    })
                  )}
                </g>
              )}

              {/* STAGE 4: Fold Edges & Tuck 4 Loose Ends */}
              {state.stage === 4 && (
                <g>
                  {/* Woven diamond center rotated 45 deg */}
                  <g transform="translate(260, 210) rotate(45)">
                    <rect
                      x="-74"
                      y="-74"
                      width="148"
                      height="148"
                      rx="8"
                      fill="#DCEAD9"
                      stroke="#17422B"
                      strokeWidth="2"
                    />
                    {[-44, 0, 44].map((offset, idx) => (
                      <React.Fragment key={idx}>
                        <rect x={offset - 18} y="-72" width="36" height="144" fill="#4E8D52" stroke="#17422B" strokeWidth="1.2" opacity="0.9" />
                        <rect x="-72" y={offset - 18} width="144" height="36" fill="#A6CE72" stroke="#17422B" strokeWidth="1.2" opacity="0.88" />
                      </React.Fragment>
                    ))}
                  </g>

                  {/* 4 Loose Ends / Corner Tuck Buttons */}
                  {[
                    { idx: 0, x: 115, y: 110, tx: 185, ty: 145, label: 'End 1' },
                    { idx: 1, x: 405, y: 110, tx: 335, ty: 145, label: 'End 2' },
                    { idx: 2, x: 115, y: 310, tx: 185, ty: 275, label: 'End 3' },
                    { idx: 3, x: 405, y: 310, tx: 335, ty: 275, label: 'End 4' },
                  ].map((corner) => {
                    const tucked = state.tuckedCorners[corner.idx];
                    return (
                      <g
                        key={corner.idx}
                        onPointerDown={(e) => {
                          if (!tucked) {
                            e.stopPropagation();
                            startDrag(`tail-${corner.idx}` as DragItemId, e);
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          applyMaterialAction(`tail-${corner.idx}` as DragItemId);
                        }}
                        className="cursor-pointer"
                      >
                        {!tucked ? (
                          <g>
                            <line
                              x1={corner.x}
                              y1={corner.y}
                              x2={corner.tx}
                              y2={corner.ty}
                              stroke="#3A7D44"
                              strokeWidth="12"
                              strokeLinecap="round"
                            />
                            <circle
                              cx={corner.x}
                              cy={corner.y}
                              r="24"
                              fill="#F7FAF6"
                              stroke={showHint ? '#D97706' : '#17422B'}
                              strokeWidth={showHint ? '3' : '2'}
                            />
                            <text
                              x={corner.x}
                              y={corner.y + 4}
                              textAnchor="middle"
                              fill="#17422B"
                              fontSize="11"
                              fontWeight="700"
                            >
                              Tuck {corner.idx + 1}
                            </text>
                          </g>
                        ) : (
                          <g>
                            <circle
                              cx={corner.tx}
                              cy={corner.ty}
                              r="14"
                              fill="#17422B"
                            />
                            <text
                              x={corner.tx}
                              y={corner.ty + 4}
                              textAnchor="middle"
                              fill="#FFFFFF"
                              fontSize="11"
                              fontWeight="700"
                            >
                              ✓
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              )}

              {/* STAGE 5: Tighten into Recognizable Traditional Diamond Ketupat */}
              {state.stage === 5 && (
                <g>
                  {(() => {
                    const t = state.tightness / 100;
                    // Morph scale from loose (1.28) to tight crisp diamond (1.0)
                    const scale = 1.26 - t * 0.26;
                    const gap = 14 * (1 - t);
                    return (
                      <g transform={`translate(260, 206) scale(${scale})`}>
                        {/* Top tapered stem tips */}
                        <path
                          d="M -6 -108 C -14 -148, -32 -166, -42 -176 L -34 -180 C -18 -164, -2 -144, 2 -108 Z"
                          fill="#94C268"
                          stroke="#17422B"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M 6 -108 C 16 -146, 34 -164, 44 -174 L 36 -178 C 18 -160, 4 -142, -2 -108 Z"
                          fill="#589A5B"
                          stroke="#17422B"
                          strokeWidth="1.4"
                        />

                        {/* Bottom thick base stems */}
                        <path
                          d="M -6 108 L -14 156 L -4 160 L 4 108 Z"
                          fill="#4E8D52"
                          stroke="#17422B"
                          strokeWidth="1.4"
                        />
                        <path
                          d="M 6 108 L 16 154 L 6 158 L -4 108 Z"
                          fill="#89BA5C"
                          stroke="#17422B"
                          strokeWidth="1.4"
                        />

                        {/* Main Diamond Ketupat Body */}
                        <g transform="rotate(45)" filter="url(#leafShadow)">
                          <rect
                            x={-84 - gap * 0.4}
                            y={-84 - gap * 0.4}
                            width={168 + gap * 0.8}
                            height={168 + gap * 0.8}
                            rx="14"
                            fill="#3B7943"
                            stroke="#17422B"
                            strokeWidth="2.5"
                          />
                          {/* 3x3 Woven Checkerboard Diamond Tiles */}
                          {[0, 1, 2].map((r) =>
                            [0, 1, 2].map((c) => {
                              const tileSize = 52;
                              const x = -80 + c * (tileSize + gap * 0.25);
                              const y = -80 + r * (tileSize + gap * 0.25);
                              const isSage = (r + c) % 2 === 0;
                              return (
                                <g key={`kt-${r}-${c}`}>
                                  <rect
                                    x={x}
                                    y={y}
                                    width={tileSize}
                                    height={tileSize}
                                    rx="4"
                                    fill={isSage ? '#599C5C' : '#B7D883'}
                                    stroke="#17422B"
                                    strokeWidth="1.5"
                                  />
                                  {/* Subtle botanical leaf vein lines inside each woven tile */}
                                  <line
                                    x1={isSage ? x + 6 : x + 16}
                                    y1={isSage ? y + 16 : y + 6}
                                    x2={isSage ? x + 46 : x + 16}
                                    y2={isSage ? y + 16 : y + 46}
                                    stroke={isSage ? '#89C486' : '#DCECAE'}
                                    strokeWidth="1"
                                  />
                                  <line
                                    x1={isSage ? x + 6 : x + 34}
                                    y1={isSage ? y + 34 : y + 6}
                                    x2={isSage ? x + 46 : x + 34}
                                    y2={isSage ? y + 34 : y + 46}
                                    stroke={isSage ? '#89C486' : '#DCECAE'}
                                    strokeWidth="1"
                                  />
                                </g>
                              );
                            })
                          )}
                        </g>
                      </g>
                    );
                  })()}
                </g>
              )}
            </svg>

            {/* Tightening Slider on Stage 5 */}
            {state.stage === 5 && (
              <div className="w-full max-w-md mt-2 bg-[#F7FAF6] border border-[#C3D6C1] rounded-xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-medium text-[#15221B]">
                  <label htmlFor="tighten-slider">Tighten Woven Ketupat</label>
                  <span className="font-mono tabular-nums text-[#17422B]">
                    {state.tightness}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    id="tighten-slider"
                    type="range"
                    min={0}
                    max={100}
                    value={state.tightness}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setState((p) => ({ ...p, tightness: val }));
                      if (val >= 100) {
                        setFeedbackMsg('Congratulations! Your traditional woven diamond Ketupat is finished!');
                      }
                    }}
                    className="w-full accent-[#17422B] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      pushState(
                        (p) => ({ ...p, tightness: 100 }),
                        'Congratulations! You wove a traditional Indonesian Ketupat!'
                      )
                    }
                    className="px-3 py-1.5 text-xs font-semibold bg-[#17422B] text-white rounded-lg hover:bg-[#10311F] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Pull Tight
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Status Feedback Strip */}
          <div className="bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-[#15221B]">
            <Sparkles className="w-4 h-4 text-[#3A7D44] shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        </section>

        {/* RIGHT ZONE: Instructions & Controls Panel */}
        <aside className="lg:col-span-3 bg-[#EDF4EC] border border-[#C3D6C1] rounded-xl p-4 sm:p-5 space-y-4">
          <div className="pb-3 border-b border-[#C3D6C1]">
            <p className="font-mono text-xs text-[#3A7D44] tabular-nums mb-1">
              Stage {state.stage + 1} of {STAGE_INSTRUCTIONS.length}
            </p>
            <h2 className="font-serif text-2xl font-semibold text-[#15221B]">
              {stageInfo.title}
            </h2>
          </div>

          <p className="text-sm text-[#15221B] leading-relaxed">
            {stageInfo.instruction}
          </p>

          <div
            className={`p-3 rounded-lg border text-xs leading-relaxed ${
              currentComplete
                ? 'bg-[#DCEAD9] border-[#3A7D44] text-[#17422B]'
                : 'bg-[#F7FAF6] border-[#C3D6C1] text-[#455B4E]'
            }`}
          >
            <span className="font-semibold block mb-0.5 text-[#15221B]">
              {currentComplete ? 'Step Complete!' : 'Current Goal:'}
            </span>
            {currentComplete && state.stage === STAGE_INSTRUCTIONS.length - 1
              ? 'You finished weaving a traditional diamond Ketupat Bawang! Reset to try again or explore other tutorials.'
              : stageInfo.goalText}
          </div>

          {showHint && (
            <div className="p-3 rounded-lg bg-[#FFF8E7] border border-[#E5B85C] text-xs text-[#5B4112] leading-relaxed">
              <strong className="block mb-0.5">Helpful Hint:</strong>
              {stageInfo.hintText}
            </div>
          )}

          {/* Action Controls */}
          <div className="pt-2 border-t border-[#C3D6C1] space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={state.stage === 0}
                className="inline-flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-medium rounded-lg border border-[#C3D6C1] bg-[#F7FAF6] text-[#15221B] hover:bg-[#DCEAD9] disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer min-h-[40px]"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                disabled={state.stage === STAGE_INSTRUCTIONS.length - 1}
                className="inline-flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-semibold rounded-lg bg-[#17422B] text-white hover:bg-[#10311F] disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer min-h-[40px]"
              >
                <span>Next Step</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setShowHint((h) => !h)}
                className={`inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer min-h-[40px] ${
                  showHint
                    ? 'bg-[#3A7D44] text-white border-[#3A7D44]'
                    : 'bg-[#F7FAF6] text-[#15221B] border-[#C3D6C1] hover:bg-[#DCEAD9]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Hint</span>
              </button>

              <button
                type="button"
                onClick={handleUndo}
                disabled={history.length === 0}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg border border-[#C3D6C1] bg-[#F7FAF6] text-[#15221B] hover:bg-[#DCEAD9] disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer min-h-[40px]"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Undo</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg border border-[#C3D6C1] bg-[#F7FAF6] text-[#15221B] hover:bg-[#DCEAD9] cursor-pointer min-h-[40px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Floating Drag Ghost Preview */}
      {draggingItem && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-[#17422B] text-white text-xs font-medium shadow-lg -translate-x-1/2 -translate-y-1/2"
          style={{ left: dragPos.x, top: dragPos.y }}
        >
          {DRAG_LABELS[draggingItem]}
        </div>
      )}
    </div>
  );
};
