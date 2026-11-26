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

interface Point {
  x: number;
  y: number;
}

interface StudioSnapshot {
  stage: number;
  leafOnMat: boolean;
  leafHydrated: boolean;
  cutProgress: number; // 0 to 100
  leafCutDone: boolean;
  stripAOffset: Point;
  stripBOffset: Point;
  foldsA: number; // 0 to 3 loops folded
  stripBPlaced: boolean;
  stripBAngle: number; // 0 (vertical) to 90 (horizontal)
  crossings: CrossingState[][];
  tuckedCorners: boolean[];
  tightness: number; // 0 to 100
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
  cutProgress: 0,
  leafCutDone: false,
  stripAOffset: { x: 0, y: 0 },
  stripBOffset: { x: 0, y: 0 },
  foldsA: 0,
  stripBPlaced: false,
  stripBAngle: 0,
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
    title: 'Step 1: Cut the Coconut Leaf',
    shortLabel: '1. Cut Leaf',
    instruction:
      'Drag the Young Coconut Leaf onto the mat. Next, pick up the Craft Scissors and drag them from left to right along the dotted middle line to cut the leaf into two soft green strips.',
    goalText: 'Put the leaf on the mat and slide the scissors across to cut it.',
    hintText: 'Drag the Leaf onto the mat, drag the Scissors onto the leaf, then slide the scissors handle from left to right!',
  },
  {
    title: 'Step 2: Fold Strip A Into 3 Loops',
    shortLabel: '2. Fold Loops',
    instruction:
      'Grab the glowing end of Leaf Strip A and drag it across to the loop ring to fold it. Make 3 neat loops side by side.',
    goalText: 'Drag the strip end 3 times to fold 3 vertical loops.',
    hintText: 'Pull the bright yellow-green dot on the right side of Strip A over to the dashed circle on the left.',
  },
  {
    title: 'Step 3: Place & Turn Strip B',
    shortLabel: '3. Turn Strip B',
    instruction:
      'Drag Leaf Strip B onto the mat. Then grab the green Rotate Handle (or click Turn 90°) to turn Strip B sideways across Strip A.',
    goalText: 'Place Strip B and turn it 90° sideways.',
    hintText: 'Drag Leaf Strip B onto the mat, then drag the round Rotate Handle clockwise until it locks at 90°.',
  },
  {
    title: 'Step 4: Weave Over and Under',
    shortLabel: '4. Weave Grid',
    instruction:
      'Time to weave! Click or slide across any of the 9 crossing spots to switch between OVER and UNDER. Make a checkerboard pattern so every strip locks tight.',
    goalText: 'Match all 9 spots to the alternating Over–Under pattern.',
    hintText: 'Row 1: Over · Under · Over | Row 2: Under · Over · Under | Row 3: Over · Under · Over.',
  },
  {
    title: 'Step 5: Fold & Tuck the 4 Ends',
    shortLabel: '5. Tuck Ends',
    instruction:
      'Grab each loose leaf end and drag it into its glowing corner pocket on the diamond edge to close the sides.',
    goalText: 'Drag all 4 loose leaf ends into their corner pockets.',
    hintText: 'Drag each numbered circle (End 1 to End 4) inward to the matching pocket on the diamond.',
  },
  {
    title: 'Step 6: Pull Tight Into a Ketupat',
    shortLabel: '6. Pull Tight',
    instruction:
      'Grab the top or bottom leaf tips and pull outward—or move the Tighten slider to 100%—to close the gaps and finish your diamond ketupat!',
    goalText: 'Pull the weave tight to 100% to complete your ketupat.',
    hintText: 'Drag the glowing green pull handle outward or drag the Tighten slider all the way to 100%.',
  },
];

type PaletteItemId = 'whole-leaf' | 'water-bowl' | 'strip-a' | 'strip-b' | 'scissors';

const PALETTE_LABELS: Record<PaletteItemId, string> = {
  'whole-leaf': 'Young Coconut Leaf',
  'water-bowl': 'Bowl of Cool Water',
  'strip-a': 'Leaf Strip A',
  'strip-b': 'Leaf Strip B',
  scissors: 'Craft Scissors',
};

type ActiveCanvasDrag =
  | { type: 'scissors-cut' }
  | { type: 'move-strip-a'; startPointer: Point; startOffset: Point }
  | { type: 'move-strip-b'; startPointer: Point; startOffset: Point }
  | { type: 'fold-strip-a'; pointer: Point }
  | { type: 'rotate-strip-b' }
  | { type: 'tuck-tail'; tailIdx: number; pointer: Point }
  | { type: 'pull-tight'; startY: number; startTightness: number }
  | null;

const CORNER_TUCK_POINTS = [
  { idx: 0, start: { x: 118, y: 112 }, target: { x: 202, y: 156 } },
  { idx: 1, start: { x: 442, y: 112 }, target: { x: 358, y: 156 } },
  { idx: 2, start: { x: 118, y: 328 }, target: { x: 202, y: 284 } },
  { idx: 3, start: { x: 442, y: 328 }, target: { x: 358, y: 284 } },
];

export const KetupatCraftStudio: React.FC = () => {
  const [state, setState] = useState<StudioSnapshot>(INITIAL_STATE);
  const [history, setHistory] = useState<StudioSnapshot[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [selectedTool, setSelectedTool] = useState<'none' | 'scissors'>('none');
  const [paletteDrag, setPaletteDrag] = useState<PaletteItemId | null>(null);
  const [paletteDragPos, setPaletteDragPos] = useState<Point>({ x: 0, y: 0 });
  const [isOverMat, setIsOverMat] = useState(false);
  const [canvasDrag, setCanvasDrag] = useState<ActiveCanvasDrag>(null);
  const [scissorsActiveOnLeaf, setScissorsActiveOnLeaf] = useState(false);
  const [weaveSweeping, setWeaveSweeping] = useState(false);
  const [lastSweptKey, setLastSweptKey] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string>(
    'Drag the Young Coconut Leaf from the Materials Panel onto the craft mat to begin!'
  );

  const workspaceRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const stateRef = useRef<StudioSnapshot>(state);
  stateRef.current = state;

  const pushState = useCallback(
    (updater: (prev: StudioSnapshot) => StudioSnapshot, msg?: string) => {
      setState((prev) => {
        setHistory((h) => [...h.slice(-20), prev]);
        return updater(prev);
      });
      setShowHint(false);
      if (msg) setFeedbackMsg(msg);
    },
    []
  );

  // Convert screen pointer coordinates into SVG 560x440 coordinates cleanly
  const toSvgPoint = useCallback((clientX: number, clientY: number): Point => {
    const svg = svgRef.current;
    if (!svg) return { x: 280, y: 220 };
    const ctm = svg.getScreenCTM();
    if (ctm) {
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const transformed = pt.matrixTransform(ctm.inverse());
      return { x: transformed.x, y: transformed.y };
    }
    const rect = svg.getBoundingClientRect();
    return {
      x: ((clientX - rect.left) / rect.width) * 560,
      y: ((clientY - rect.top) / rect.height) * 440,
    };
  }, []);

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
        return s.leafOnMat && s.leafCutDone;
      case 1:
        return s.foldsA >= 3;
      case 2:
        return s.stripBPlaced && s.stripBAngle >= 85;
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

  const overallProgress = Math.round(
    ([0, 1, 2, 3, 4, 5].filter((i) => isStageComplete(state, i)).length / 6) * 100
  );

  // Drop or tap action for palette items
  const applyPaletteDrop = useCallback(
    (itemId: PaletteItemId) => {
      const s = stateRef.current;
      if (itemId === 'whole-leaf') {
        if (!s.leafOnMat) {
          pushState(
            (p) => ({ ...p, stage: 0, leafOnMat: true }),
            'Great! Now pick up the Craft Scissors from the Tools Panel and drag them onto the leaf.'
          );
        }
        return;
      }

      if (itemId === 'water-bowl') {
        if (!s.leafOnMat) {
          setFeedbackMsg('Put the Young Coconut Leaf on the mat first before adding water.');
          return;
        }
        pushState(
          (p) => ({ ...p, leafHydrated: true }),
          'Nice! The leaf is cool and soft, so it will not crack when folded.'
        );
        return;
      }

      if (itemId === 'scissors') {
        if (!s.leafOnMat) {
          setFeedbackMsg('Put the Young Coconut Leaf on the mat first.');
          return;
        }
        setSelectedTool('scissors');
        if (!s.leafCutDone) {
          setScissorsActiveOnLeaf(true);
          setFeedbackMsg(
            'Cutting line ready! Grab the Scissors on the left of the leaf and slide them right to cut it.'
          );
        }
        return;
      }

      if (itemId === 'strip-a') {
        if (!s.leafCutDone) {
          setFeedbackMsg('Cut the whole coconut leaf first in Step 1 to get Strip A.');
          return;
        }
        if (s.stage === 0) {
          pushState(
            (p) => ({ ...p, stage: 1 }),
            'Strip A is ready on the folding table! Drag the bright tip to fold 3 loops.'
          );
        } else {
          setFeedbackMsg('Strip A is already on the mat—drag its end to fold the 3 loops!');
        }
        return;
      }

      if (itemId === 'strip-b') {
        if (!s.leafCutDone) {
          setFeedbackMsg('Cut the whole coconut leaf first in Step 1 to get Strip B.');
          return;
        }
        if (s.foldsA < 3) {
          setFeedbackMsg('Finish folding Strip A into 3 loops first (Step 2).');
          return;
        }
        pushState(
          (p) => ({ ...p, stage: Math.max(p.stage, 2), stripBPlaced: true }),
          'Strip B is on the mat! Now drag the Rotate Handle (or click Turn 90°) to turn it sideways.'
        );
      }
    },
    [pushState]
  );

  // Pointer handling for Palette drags
  useEffect(() => {
    if (!paletteDrag) return;

    const handleMove = (e: PointerEvent) => {
      setPaletteDragPos({ x: e.clientX, y: e.clientY });
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
          applyPaletteDrop(paletteDrag);
        }
      }
      setPaletteDrag(null);
      setIsOverMat(false);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [paletteDrag, applyPaletteDrop]);

  // Pointer handling for in-canvas physical crafting drags (cutting, folding, rotating, tucking, pulling)
  useEffect(() => {
    if (!canvasDrag) return;

    const handleMove = (e: PointerEvent) => {
      const pt = toSvgPoint(e.clientX, e.clientY);

      if (canvasDrag.type === 'scissors-cut') {
        // Cut track runs from x=86 to x=474
        const pct = Math.max(0, Math.min(100, ((pt.x - 86) / (474 - 86)) * 100));
        setState((prev) => {
          if (pct >= 92 && !prev.leafCutDone) {
            setHistory((h) => [...h.slice(-20), prev]);
            setFeedbackMsg(
              'Clean cut! The middle stick is removed and you now have two soft green strips. Drag them around or click Next Step!'
            );
            return { ...prev, cutProgress: 100, leafCutDone: true };
          }
          return { ...prev, cutProgress: Math.max(prev.cutProgress, pct) };
        });
      } else if (canvasDrag.type === 'move-strip-a') {
        const dx = Math.max(-45, Math.min(45, pt.x - canvasDrag.startPointer.x));
        const dy = Math.max(-45, Math.min(55, pt.y - canvasDrag.startPointer.y));
        setState((prev) => ({
          ...prev,
          stripAOffset: {
            x: Math.max(-45, Math.min(45, canvasDrag.startOffset.x + dx)),
            y: Math.max(-45, Math.min(55, canvasDrag.startOffset.y + dy)),
          },
        }));
      } else if (canvasDrag.type === 'move-strip-b') {
        const dx = Math.max(-45, Math.min(45, pt.x - canvasDrag.startPointer.x));
        const dy = Math.max(-55, Math.min(45, pt.y - canvasDrag.startPointer.y));
        setState((prev) => ({
          ...prev,
          stripBOffset: {
            x: Math.max(-45, Math.min(45, canvasDrag.startOffset.x + dx)),
            y: Math.max(-55, Math.min(45, canvasDrag.startOffset.y + dy)),
          },
        }));
      } else if (canvasDrag.type === 'fold-strip-a') {
        setCanvasDrag({ type: 'fold-strip-a', pointer: pt });
      } else if (canvasDrag.type === 'rotate-strip-b') {
        // Center of Strip B is (280, 220)
        const angleRad = Math.atan2(pt.y - 220, pt.x - 280);
        let deg = (angleRad * 180) / Math.PI + 90;
        if (deg < 0) deg += 360;
        const clamped = Math.max(0, Math.min(90, deg > 180 ? 0 : deg));
        setState((prev) => ({ ...prev, stripBAngle: Math.round(clamped) }));
      } else if (canvasDrag.type === 'tuck-tail') {
        setCanvasDrag({ type: 'tuck-tail', tailIdx: canvasDrag.tailIdx, pointer: pt });
      } else if (canvasDrag.type === 'pull-tight') {
        const delta = Math.abs(pt.y - canvasDrag.startY) * 1.15;
        const nextTight = Math.min(100, Math.max(0, Math.round(canvasDrag.startTightness + delta)));
        setState((prev) => ({ ...prev, tightness: nextTight }));
        if (nextTight >= 100) {
          setFeedbackMsg('Awesome! You wove a real Indonesian diamond Ketupat!');
        }
      }
    };

    const handleUp = (e: PointerEvent) => {
      const pt = toSvgPoint(e.clientX, e.clientY);

      if (canvasDrag.type === 'fold-strip-a') {
        // If dragged leftward into the fold target zone (x < 290)
        if (pt.x < 305) {
          pushState((p) => {
            const nextFolds = Math.min(3, p.foldsA + 1);
            return { ...p, foldsA: nextFolds };
          }, stateRef.current.foldsA + 1 >= 3 ? 'All 3 loops folded! Click Next Step to add Strip B.' : `Nice fold! Loop ${stateRef.current.foldsA + 1} of 3 complete.`);
        }
      } else if (canvasDrag.type === 'rotate-strip-b') {
        if (stateRef.current.stripBAngle >= 70) {
          pushState(
            (p) => ({ ...p, stripBAngle: 90 }),
            'Strip B turned 90° sideways across Strip A! Click Next Step to weave Over & Under.'
          );
        }
      } else if (canvasDrag.type === 'tuck-tail') {
        const idx = canvasDrag.tailIdx;
        const corner = CORNER_TUCK_POINTS[idx];
        const dist = Math.hypot(pt.x - corner.target.x, pt.y - corner.target.y);
        // Generous drop tolerance around the diamond pocket (also works if pulled inward past halfway)
        const distToCenter = Math.hypot(pt.x - 280, pt.y - 220);
        if (dist < 85 || distToCenter < 130) {
          const nextCount = stateRef.current.tuckedCorners.filter(Boolean).length + 1;
          pushState((p) => {
            const nextTucked = [...p.tuckedCorners];
            nextTucked[idx] = true;
            return { ...p, tuckedCorners: nextTucked };
          }, nextCount === 4 ? 'All 4 leaf ends are tucked! Click Next Step to pull your ketupat tight.' : `Tucked End ${idx + 1} (${nextCount}/4). Keep tucking!`);
        }
      }

      setCanvasDrag(null);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
    };
  }, [canvasDrag, pushState, toSvgPoint]);

  useEffect(() => {
    if (!weaveSweeping) return;
    const stopSweep = () => {
      setWeaveSweeping(false);
      setLastSweptKey(null);
    };
    window.addEventListener('pointerup', stopSweep);
    return () => window.removeEventListener('pointerup', stopSweep);
  }, [weaveSweeping]);

  const startPaletteDrag = (itemId: PaletteItemId, e: React.PointerEvent) => {
    e.preventDefault();
    setPaletteDrag(itemId);
    setPaletteDragPos({ x: e.clientX, y: e.clientY });
  };

  const handleToggleCrossing = (r: number, c: number) => {
    if (state.stage !== 3) return;
    pushState((prev) => {
      const nextGrid = prev.crossings.map((row, rIdx) =>
        row.map((val, cIdx) =>
          rIdx === r && cIdx === c ? (val === 'over' ? 'under' : 'over') : val
        )
      );
      const nowLocked = nextGrid.every((row, ri) =>
        row.every((v, ci) => v === TARGET_PATTERN[ri][ci])
      );
      setFeedbackMsg(
        nowLocked
          ? 'Checkerboard pattern locked! Click Next Step to fold and tuck the 4 ends.'
          : 'Switched crossing! Keep alternating Over and Under across each row.'
      );
      return { ...prev, crossings: nextGrid };
    });
  };

  const handleRotateButton = () => {
    if (!state.stripBPlaced) {
      setFeedbackMsg('Drag Leaf Strip B onto the mat first.');
      return;
    }
    pushState(
      (p) => ({ ...p, stripBAngle: p.stripBAngle >= 85 ? 0 : 90 }),
      state.stripBAngle >= 85
        ? 'Turned Strip B back up and down.'
        : 'Turned Strip B 90° sideways across Strip A! Click Next Step to weave.'
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
    setSelectedTool('none');
    setScissorsActiveOnLeaf(false);
    setFeedbackMsg('Table cleared! Drag the Young Coconut Leaf onto the mat to start.');
  };

  const goToStage = (targetIdx: number) => {
    if (targetIdx === state.stage) return;
    pushState((p) => {
      const next = { ...p, stage: targetIdx };
      if (targetIdx >= 1) {
        next.leafOnMat = true;
        next.cutProgress = 100;
        next.leafCutDone = true;
      }
      if (targetIdx >= 2) {
        next.foldsA = 3;
      }
      if (targetIdx >= 3) {
        next.stripBPlaced = true;
        next.stripBAngle = 90;
      }
      if (targetIdx >= 4) {
        next.crossings = TARGET_PATTERN.map((r) => [...r]);
      }
      if (targetIdx >= 5) {
        next.tuckedCorners = [true, true, true, true];
      }
      return next;
    }, STAGE_INSTRUCTIONS[targetIdx].goalText);
  };

  // Compute live coordinates for scissors cut animation
  const scissorsX = 86 + (state.cutProgress / 100) * (474 - 86);
  const splitGap = state.leafCutDone ? 36 : (state.cutProgress / 100) * 16;

  return (
    <div className="space-y-5">
      {/* Progress & Step Bar */}
      <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-[#143D28]">
            Ketupat Progress: Step {state.stage + 1} of {STAGE_INSTRUCTIONS.length}
          </span>
          <span className="font-mono tabular-nums text-[#0F764A] font-semibold">
            {overallProgress}% Complete
          </span>
        </div>
        <div className="w-full h-2 bg-[#CFE4CA] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0F764A] transition-all duration-300"
            style={{ width: `${Math.max(8, overallProgress)}%` }}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {STAGE_INSTRUCTIONS.map((st, idx) => {
            const active = state.stage === idx;
            const done = isStageComplete(state, idx);
            return (
              <button
                key={st.shortLabel}
                type="button"
                onClick={() => goToStage(idx)}
                className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors flex items-center justify-between gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-[#143D28] text-white'
                    : done
                    ? 'bg-[#CFE4CA] text-[#143D28] border border-[#0F764A]/40'
                    : 'bg-[#FAFBF6] text-[#3F5749] border border-[#B5D2AF] hover:bg-[#CFE4CA]/50'
                }`}
              >
                <span className="truncate">{st.shortLabel}</span>
                {done && !active && <CheckCircle2 className="w-3.5 h-3.5 text-[#0F764A] shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3-Zone Craft Table Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT PANEL: Materials Panel + Tools Panel */}
        <aside className="lg:col-span-3 space-y-4">
          {/* Materials Panel */}
          <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-4 space-y-2.5">
            <div className="pb-2 border-b border-[#B5D2AF]">
              <h2 className="font-serif text-xl font-semibold text-[#132219]">
                Materials Panel
              </h2>
              <p className="text-xs text-[#3F5749] mt-0.5">
                Drag any leaf or item onto the craft mat.
              </p>
            </div>

            {/* Whole Coconut Leaf */}
            <div
              onPointerDown={(e) => startPaletteDrag('whole-leaf', e)}
              onClick={() => applyPaletteDrop('whole-leaf')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyPaletteDrop('whole-leaf');
              }}
              className={`p-2.5 rounded-xl border bg-[#FAFBF6] transition-all cursor-grab active:cursor-grabbing select-none touch-none ${
                showHint && state.stage === 0 && !state.leafOnMat
                  ? 'border-[#0F764A] ring-2 ring-[#0F764A]/45'
                  : 'border-[#B5D2AF] hover:border-[#0F764A]'
              }`}
            >
              <svg viewBox="0 0 180 38" className="w-full h-9">
                <path d="M 10 19 C 45 4, 130 5, 170 19 C 130 33, 45 34, 10 19 Z" fill="#82BC5E" stroke="#143D28" strokeWidth="1.2" />
                <line x1="6" y1="19" x2="168" y2="19" stroke="#7A5A3A" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <p className="text-xs font-semibold text-[#132219] mt-1">
                Young Coconut Leaf
              </p>
              <p className="text-[11px] text-[#3F5749]">Fresh leaf with center stick</p>
            </div>

            {/* Leaf Strip A */}
            <div
              onPointerDown={(e) => startPaletteDrag('strip-a', e)}
              onClick={() => applyPaletteDrop('strip-a')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyPaletteDrop('strip-a');
              }}
              className={`p-2.5 rounded-xl border bg-[#FAFBF6] transition-all cursor-grab active:cursor-grabbing select-none touch-none ${
                !state.leafCutDone ? 'opacity-55' : ''
              } ${
                showHint && state.stage === 1 && state.foldsA < 3
                  ? 'border-[#0F764A] ring-2 ring-[#0F764A]/45'
                  : 'border-[#B5D2AF] hover:border-[#0F764A]'
              }`}
            >
              <svg viewBox="0 0 180 24" className="w-full h-6">
                <path d="M 8 7 L 146 6 L 172 12 L 146 18 L 8 17 Z" fill="#3B8E47" stroke="#143D28" strokeWidth="1.2" />
                <line x1="12" y1="12" x2="162" y2="12" stroke="#98D292" strokeWidth="1" strokeDasharray="5 3" />
              </svg>
              <p className="text-xs font-semibold text-[#132219] mt-1">
                Leaf Strip A (Dark Green)
              </p>
              <p className="text-[11px] text-[#3F5749]">
                {state.leafCutDone ? 'Ready for 3 loops' : 'Cut the leaf first'}
              </p>
            </div>

            {/* Leaf Strip B */}
            <div
              onPointerDown={(e) => startPaletteDrag('strip-b', e)}
              onClick={() => applyPaletteDrop('strip-b')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyPaletteDrop('strip-b');
              }}
              className={`p-2.5 rounded-xl border bg-[#FAFBF6] transition-all cursor-grab active:cursor-grabbing select-none touch-none ${
                !state.leafCutDone ? 'opacity-55' : ''
              } ${
                showHint && state.stage === 2 && !state.stripBPlaced
                  ? 'border-[#0F764A] ring-2 ring-[#0F764A]/45'
                  : 'border-[#B5D2AF] hover:border-[#0F764A]'
              }`}
            >
              <svg viewBox="0 0 180 24" className="w-full h-6">
                <path d="M 8 7 L 146 6 L 172 12 L 146 18 L 8 17 Z" fill="#9BCB68" stroke="#0F764A" strokeWidth="1.2" />
                <line x1="12" y1="12" x2="162" y2="12" stroke="#DFF1BC" strokeWidth="1" strokeDasharray="5 3" />
              </svg>
              <p className="text-xs font-semibold text-[#132219] mt-1">
                Leaf Strip B (Light Green)
              </p>
              <p className="text-[11px] text-[#3F5749]">
                {state.leafCutDone ? 'Weaves across Strip A' : 'Cut the leaf first'}
              </p>
            </div>

            {/* Bowl of Water */}
            <div
              onPointerDown={(e) => startPaletteDrag('water-bowl', e)}
              onClick={() => applyPaletteDrop('water-bowl')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyPaletteDrop('water-bowl');
              }}
              className="p-2.5 rounded-xl border border-[#B5D2AF] bg-[#FAFBF6] hover:border-[#0F764A] transition-all cursor-grab active:cursor-grabbing select-none touch-none flex items-center gap-2.5"
            >
              <div className="w-10 h-9 rounded-lg bg-[#DCF0F2] flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5 text-[#1E6C7A]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#132219]">Bowl of Cool Water</p>
                <p className="text-[11px] text-[#3F5749]">
                  {state.leafHydrated ? 'Leaf moist & soft' : 'Keeps leaves bendable'}
                </p>
              </div>
            </div>
          </div>

          {/* Tools Panel */}
          <div className="bg-[#E5F0E3] border border-[#B5D2AF] rounded-xl p-4 space-y-2.5">
            <div className="pb-2 border-b border-[#B5D2AF]">
              <h2 className="font-serif text-xl font-semibold text-[#132219]">
                Tools Panel
              </h2>
              <p className="text-xs text-[#3F5749] mt-0.5">
                Pick a tool and drag it onto the leaf.
              </p>
            </div>

            {/* Craft Scissors */}
            <div
              onPointerDown={(e) => startPaletteDrag('scissors', e)}
              onClick={() => applyPaletteDrop('scissors')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyPaletteDrop('scissors');
              }}
              className={`p-2.5 rounded-xl border bg-[#FAFBF6] transition-all cursor-grab active:cursor-grabbing select-none touch-none flex items-center gap-2.5 ${
                showHint && state.stage === 0 && state.leafOnMat && !state.leafCutDone
                  ? 'border-[#0F764A] ring-2 ring-[#0F764A]/45'
                  : selectedTool === 'scissors'
                  ? 'border-[#143D28] bg-[#E8F5E9]'
                  : 'border-[#B5D2AF] hover:border-[#0F764A]'
              }`}
            >
              <div className="w-10 h-9 rounded-lg bg-[#CFE4CA] flex items-center justify-center shrink-0">
                <Scissors className="w-5 h-5 text-[#143D28]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#132219]">Craft Scissors</p>
                <p className="text-[11px] text-[#3F5749]">
                  Drag onto leaf, then slide right to cut
                </p>
              </div>
            </div>

            {/* Turn / Rotate Tool */}
            <button
              type="button"
              onClick={handleRotateButton}
              disabled={state.stage !== 2 || !state.stripBPlaced}
              className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                state.stage === 2 && state.stripBPlaced
                  ? 'bg-[#FAFBF6] border-[#0F764A] hover:bg-[#CFE4CA]'
                  : 'bg-[#FAFBF6] border-[#B5D2AF]'
              }`}
            >
              <div className="w-10 h-9 rounded-lg bg-[#CFE4CA] flex items-center justify-center shrink-0">
                <RotateCw className="w-5 h-5 text-[#143D28]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#132219]">Turn Strip 90°</p>
                <p className="text-[11px] text-[#3F5749]">Turns Strip B sideways</p>
              </div>
            </button>
          </div>
        </aside>

        {/* CENTER PANEL: Real Craft Table Workspace */}
        <section className="lg:col-span-6 space-y-3">
          {/* Workspace Header Bar */}
          <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#143D28]">
              Craft Table Workspace
            </span>
            <div className="flex items-center gap-2 text-xs font-mono tabular-nums">
              {state.stage === 0 && state.leafOnMat && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Cut: {Math.round(state.cutProgress)}%
                </span>
              )}
              {state.stage === 1 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Loops: {state.foldsA} / 3
                </span>
              )}
              {state.stage === 2 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Angle: {state.stripBAngle}°
                </span>
              )}
              {state.stage === 3 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Locked: {lockedCrossingsCount} / 9
                </span>
              )}
              {state.stage === 4 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Tucked: {state.tuckedCorners.filter(Boolean).length} / 4
                </span>
              )}
              {state.stage === 5 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Tightness: {state.tightness}%
                </span>
              )}
            </div>
          </div>

          {/* Interactive Craft Mat Canvas */}
          <div
            ref={workspaceRef}
            className={`relative rounded-xl border-2 transition-colors overflow-hidden min-h-[420px] sm:min-h-[470px] flex flex-col items-center justify-center p-3 sm:p-4 select-none touch-none ${
              isOverMat
                ? 'border-[#0F764A] bg-[#CFE4CA]'
                : 'border-[#B5D2AF] bg-[#E5F0E3]'
            }`}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 560 440"
              className="w-full max-w-[560px] h-auto touch-none"
              role="img"
              aria-label="Interactive janur craft table"
            >
              <defs>
                <pattern id="bambooMat" width="24" height="24" patternUnits="userSpaceOnUse">
                  <rect width="24" height="24" fill="#F2F7EE" />
                  <rect x="0" y="0" width="11" height="11" fill="#E6F0DF" rx="1.5" />
                  <rect x="12" y="12" width="11" height="11" fill="#E6F0DF" rx="1.5" />
                </pattern>
                <linearGradient id="leafDark" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2E743B" />
                  <stop offset="50%" stopColor="#469650" />
                  <stop offset="100%" stopColor="#2E743B" />
                </linearGradient>
                <linearGradient id="leafFresh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7FBA56" />
                  <stop offset="50%" stopColor="#AED67A" />
                  <stop offset="100%" stopColor="#7FBA56" />
                </linearGradient>
                <filter id="dropLeaf" x="-15%" y="-15%" width="130%" height="130%">
                  <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" floodColor="#132219" floodOpacity="0.22" />
                </filter>
              </defs>

              {/* Craft Table Mat Border & Surface */}
              <rect
                x="10"
                y="10"
                width="540"
                height="420"
                rx="18"
                fill="url(#bambooMat)"
                stroke="#9AC193"
                strokeWidth="3"
              />

              {/* ================= STAGE 0: PLACE LEAF & INTERACTIVE SCISSORS CUT ================= */}
              {state.stage === 0 && (
                <g>
                  {!state.leafOnMat ? (
                    <g>
                      <rect
                        x="75"
                        y="150"
                        width="410"
                        height="140"
                        rx="16"
                        fill="#E8F5E9"
                        fillOpacity="0.7"
                        stroke="#0F764A"
                        strokeWidth="2.2"
                        strokeDasharray="8 6"
                      />
                      <text x="280" y="212" textAnchor="middle" fill="#143D28" fontSize="16" fontWeight="700">
                        Drag Young Coconut Leaf Here
                      </text>
                      <text x="280" y="236" textAnchor="middle" fill="#3F5749" fontSize="12">
                        Pick up the leaf from the Materials Panel on the left
                      </text>
                    </g>
                  ) : (
                    <g>
                      {/* Top Strip A — visibly splits upward as scissors slide! */}
                      <g
                        transform={`translate(${state.leafCutDone ? state.stripAOffset.x : 0}, ${
                          (state.leafCutDone ? state.stripAOffset.y : 0) - splitGap
                        })`}
                        onPointerDown={(e) => {
                          if (!state.leafCutDone) return;
                          e.stopPropagation();
                          setCanvasDrag({
                            type: 'move-strip-a',
                            startPointer: toSvgPoint(e.clientX, e.clientY),
                            startOffset: state.stripAOffset,
                          });
                        }}
                        className={state.leafCutDone ? 'cursor-grab active:cursor-grabbing' : ''}
                        filter="url(#dropLeaf)"
                      >
                        <path
                          d="M 65 220 C 165 142, 375 145, 495 220 L 65 220 Z"
                          fill={state.leafHydrated ? '#469650' : '#5EA85D'}
                          stroke="#143D28"
                          strokeWidth="1.8"
                        />
                        <path d="M 110 198 C 215 168, 355 170, 460 208" fill="none" stroke="#BCE4B1" strokeWidth="1.3" strokeDasharray="6 4" />
                        {state.leafCutDone && (
                          <text x="280" y="196" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
                            Strip A (Drag me!)
                          </text>
                        )}
                      </g>

                      {/* Bottom Strip B — visibly splits downward as scissors slide! */}
                      <g
                        transform={`translate(${state.leafCutDone ? state.stripBOffset.x : 0}, ${
                          (state.leafCutDone ? state.stripBOffset.y : 0) + splitGap
                        })`}
                        onPointerDown={(e) => {
                          if (!state.leafCutDone) return;
                          e.stopPropagation();
                          setCanvasDrag({
                            type: 'move-strip-b',
                            startPointer: toSvgPoint(e.clientX, e.clientY),
                            startOffset: state.stripBOffset,
                          });
                        }}
                        className={state.leafCutDone ? 'cursor-grab active:cursor-grabbing' : ''}
                        filter="url(#dropLeaf)"
                      >
                        <path
                          d="M 65 220 C 165 298, 375 295, 495 220 L 65 220 Z"
                          fill={state.leafHydrated ? '#95C865' : '#A9D37B'}
                          stroke="#0F764A"
                          strokeWidth="1.8"
                        />
                        <path d="M 110 242 C 215 272, 355 270, 460 232" fill="none" stroke="#E4F5CB" strokeWidth="1.3" strokeDasharray="6 4" />
                        {state.leafCutDone && (
                          <text x="280" y="256" textAnchor="middle" fill="#132219" fontSize="12" fontWeight="700">
                            Strip B (Drag me!)
                          </text>
                        )}
                      </g>

                      {/* Center Woody Lidi Stick */}
                      <line
                        x1="54"
                        y1="220"
                        x2="494"
                        y2="220"
                        stroke="#7A5A3A"
                        strokeWidth={state.leafCutDone ? 3.5 : 6}
                        strokeLinecap="round"
                        opacity={state.leafCutDone ? 0.55 : 1}
                      />

                      {state.leafCutDone && (
                        <text x="280" y="216" textAnchor="middle" fill="#7A5A3A" fontSize="11" fontWeight="600">
                          Hard middle stick removed — drag Strip A or B, or click Next Step!
                        </text>
                      )}

                      {/* Interactive Cutting Guide & Draggable Scissors Track */}
                      {!state.leafCutDone && (
                        <g>
                          {/* Guide Line */}
                          <line
                            x1="86"
                            y1="220"
                            x2="474"
                            y2="220"
                            stroke="#F59E0B"
                            strokeWidth="3"
                            strokeDasharray="7 5"
                          />
                          {/* Already-cut dark slice behind scissors */}
                          <line
                            x1="86"
                            y1="220"
                            x2={scissorsX}
                            y2="220"
                            stroke="#143D28"
                            strokeWidth="3"
                          />

                          {!scissorsActiveOnLeaf ? (
                            <g
                              onClick={() => {
                                setSelectedTool('scissors');
                                setScissorsActiveOnLeaf(true);
                                setFeedbackMsg('Now drag the Scissors handle from left to right along the yellow dotted line!');
                              }}
                              className="cursor-pointer"
                            >
                              <rect
                                x="155"
                                y="198"
                                width="250"
                                height="44"
                                rx="22"
                                fill="#FAFBF6"
                                fillOpacity="0.92"
                                stroke="#0F764A"
                                strokeWidth="2"
                              />
                              <text x="280" y="224" textAnchor="middle" fill="#143D28" fontSize="12.5" fontWeight="700">
                                Drag Craft Scissors Here to Start Cutting
                              </text>
                            </g>
                          ) : (
                            /* Draggable Scissors Handle along the cut line */
                            <g
                              transform={`translate(${scissorsX}, 220)`}
                              onPointerDown={(e) => {
                                e.stopPropagation();
                                setCanvasDrag({ type: 'scissors-cut' });
                              }}
                              className="cursor-ew-resize"
                            >
                              <circle
                                cx="0"
                                cy="0"
                                r="26"
                                fill="#143D28"
                                stroke="#FAFBF6"
                                strokeWidth="2.5"
                                filter="url(#dropLeaf)"
                              />
                              {/* Animated SVG Scissors blades */}
                              <g transform="scale(1.15)">
                                <line
                                  x1="-8"
                                  y1={-4 - Math.abs(Math.sin(state.cutProgress * 0.35)) * 5}
                                  x2="10"
                                  y2="3"
                                  stroke="#FAFBF6"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                />
                                <line
                                  x1="-8"
                                  y1={4 + Math.abs(Math.sin(state.cutProgress * 0.35)) * 5}
                                  x2="10"
                                  y2="-3"
                                  stroke="#FAFBF6"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                />
                                <circle cx="-10" cy="-6" r="3" fill="none" stroke="#A9D37B" strokeWidth="1.8" />
                                <circle cx="-10" cy="6" r="3" fill="none" stroke="#A9D37B" strokeWidth="1.8" />
                              </g>
                              <text x="0" y="-34" textAnchor="middle" fill="#143D28" fontSize="11.5" fontWeight="700">
                                Drag Right →
                              </text>
                            </g>
                          )}
                        </g>
                      )}
                    </g>
                  )}
                </g>
              )}

              {/* ================= STAGE 1: INTERACTIVE FOLDING OF STRIP A (3 LOOPS) ================= */}
              {state.stage === 1 && (
                <g>
                  {/* Already folded vertical loops */}
                  {[0, 1, 2].map((i) => {
                    const cx = 195 + i * 72;
                    const folded = i < state.foldsA;
                    return (
                      <g key={cx}>
                        {!folded ? (
                          <rect
                            x={cx - 21}
                            y="76"
                            width="42"
                            height="280"
                            rx="10"
                            fill="#E8F5E9"
                            fillOpacity="0.6"
                            stroke="#0F764A"
                            strokeWidth="2"
                            strokeDasharray="6 4"
                          />
                        ) : (
                          <g filter="url(#dropLeaf)">
                            <path
                              d={`M ${cx - 20} 76 L ${cx} 54 L ${cx + 20} 76 L ${cx + 20} 354 L ${cx - 20} 354 Z`}
                              fill="url(#leafDark)"
                              stroke="#143D28"
                              strokeWidth="1.7"
                            />
                            <line x1={cx} y1="74" x2={cx} y2="346" stroke="#98D292" strokeWidth="1" strokeDasharray="6 4" />
                            <text x={cx} y="378" textAnchor="middle" fill="#143D28" fontSize="11" fontWeight="700">
                              Loop {i + 1} ✓
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* Active Unfolded Tail & Draggable Bend End */}
                  {state.foldsA < 3 && (
                    <g>
                      {/* Target Fold Zone Ring */}
                      <circle
                        cx={195 + state.foldsA * 72}
                        cy="216"
                        r="26"
                        fill="#CFE4CA"
                        fillOpacity="0.6"
                        stroke={showHint ? '#D97706' : '#0F764A'}
                        strokeWidth="2.5"
                        strokeDasharray="5 4"
                      />
                      <text x={195 + state.foldsA * 72} y="220" textAnchor="middle" fill="#143D28" fontSize="11" fontWeight="700">
                        Fold Here
                      </text>

                      {/* Strip bending dynamically when dragged! */}
                      {(() => {
                        const dragPt =
                          canvasDrag?.type === 'fold-strip-a'
                            ? canvasDrag.pointer
                            : { x: 472, y: 216 };
                        const startX = 195 + state.foldsA * 72;
                        const ctrlX = (startX + dragPt.x) / 2;
                        const ctrlY = Math.min(296, dragPt.y) - 45;
                        return (
                          <g>
                            <path
                              d={`M ${startX} 296 Q ${ctrlX} ${ctrlY}, ${dragPt.x} ${dragPt.y}`}
                              fill="none"
                              stroke="#3B8E47"
                              strokeWidth="26"
                              strokeLinecap="round"
                              filter="url(#dropLeaf)"
                            />
                            <path
                              d={`M ${startX} 296 Q ${ctrlX} ${ctrlY}, ${dragPt.x} ${dragPt.y}`}
                              fill="none"
                              stroke="#A9D37B"
                              strokeWidth="2"
                              strokeDasharray="6 4"
                            />
                            {/* Draggable End Knob */}
                            <g
                              transform={`translate(${dragPt.x}, ${dragPt.y})`}
                              onPointerDown={(e) => {
                                e.stopPropagation();
                                setCanvasDrag({ type: 'fold-strip-a', pointer: dragPt });
                              }}
                              className="cursor-grab active:cursor-grabbing"
                            >
                              <circle
                                cx="0"
                                cy="0"
                                r="22"
                                fill="#143D28"
                                stroke="#FAFBF6"
                                strokeWidth="2.5"
                              />
                              <text x="0" y="4" textAnchor="middle" fill="#FAFBF6" fontSize="10.5" fontWeight="700">
                                Drag
                              </text>
                            </g>
                          </g>
                        );
                      })()}
                    </g>
                  )}
                </g>
              )}

              {/* ================= STAGE 2: PLACE & DRAG-ROTATE STRIP B ================= */}
              {state.stage === 2 && (
                <g>
                  {/* Vertical Loops of Strip A */}
                  {[195, 267, 339].map((cx) => (
                    <path
                      key={cx}
                      d={`M ${cx - 20} 76 L ${cx} 54 L ${cx + 20} 76 L ${cx + 20} 354 L ${cx - 20} 354 Z`}
                      fill="url(#leafDark)"
                      stroke="#143D28"
                      strokeWidth="1.6"
                      opacity="0.92"
                    />
                  ))}

                  {!state.stripBPlaced ? (
                    <g>
                      <rect
                        x="105"
                        y="116"
                        width="350"
                        height="208"
                        rx="14"
                        fill="#FAFBF6"
                        fillOpacity="0.72"
                        stroke="#0F764A"
                        strokeWidth="2.2"
                        strokeDasharray="7 5"
                      />
                      <text x="280" y="220" textAnchor="middle" fill="#143D28" fontSize="14.5" fontWeight="700">
                        Drag Leaf Strip B Here
                      </text>
                    </g>
                  ) : (
                    /* Live Rotatable Strip B (0 deg -> 90 deg) */
                    <g transform={`translate(280, 220) rotate(${state.stripBAngle})`}>
                      {[-72, 0, 72].map((dx) => (
                        <path
                          key={dx}
                          d={`M ${dx - 19} -150 L ${dx + 19} -150 L ${dx + 19} 140 L ${dx} 164 L ${dx - 19} 140 Z`}
                          fill="url(#leafFresh)"
                          stroke="#0F764A"
                          strokeWidth="1.6"
                          opacity="0.93"
                          filter="url(#dropLeaf)"
                        />
                      ))}

                      {/* Interactive Rotate Handle attached to Strip B */}
                      {state.stripBAngle < 85 && (
                        <g
                          transform="translate(0, -168)"
                          onPointerDown={(e) => {
                            e.stopPropagation();
                            setCanvasDrag({ type: 'rotate-strip-b' });
                          }}
                          className="cursor-grab active:cursor-grabbing"
                        >
                          <line x1="0" y1="0" x2="0" y2="20" stroke="#143D28" strokeWidth="2.5" />
                          <circle
                            cx="0"
                            cy="0"
                            r="20"
                            fill="#143D28"
                            stroke="#FAFBF6"
                            strokeWidth="2.5"
                          />
                          <text x="0" y="4" textAnchor="middle" fill="#FAFBF6" fontSize="10" fontWeight="700">
                            Turn
                          </text>
                        </g>
                      )}
                    </g>
                  )}
                </g>
              )}

              {/* ================= STAGE 3: INTERACTIVE 3x3 OVER/UNDER WEAVE ================= */}
              {state.stage === 3 && (
                <g>
                  {/* Vertical Strip A */}
                  {[208, 280, 352].map((cx) => (
                    <path
                      key={`va-${cx}`}
                      d={`M ${cx - 21} 68 L ${cx} 46 L ${cx + 21} 68 L ${cx + 21} 368 L ${cx - 21} 368 Z`}
                      fill="url(#leafDark)"
                      stroke="#143D28"
                      strokeWidth="1.6"
                    />
                  ))}

                  {/* Horizontal Strip B */}
                  {[148, 220, 292].map((cy) => (
                    <path
                      key={`hb-${cy}`}
                      d={`M 105 ${cy - 21} L 444 ${cy - 21} L 468 ${cy} L 444 ${cy + 21} L 105 ${cy + 21} Z`}
                      fill="url(#leafFresh)"
                      stroke="#0F764A"
                      strokeWidth="1.6"
                    />
                  ))}

                  {/* Interactive 9 Crossing Spots */}
                  {[148, 220, 292].map((cy, r) =>
                    [208, 280, 352].map((cx, c) => {
                      const mode = state.crossings[r][c];
                      const matches = mode === TARGET_PATTERN[r][c];
                      return (
                        <g
                          key={`${r}-${c}`}
                          onPointerDown={(e) => {
                            e.stopPropagation();
                            setWeaveSweeping(true);
                            setLastSweptKey(`${r}-${c}`);
                            handleToggleCrossing(r, c);
                          }}
                          onPointerEnter={() => {
                            if (weaveSweeping && lastSweptKey !== `${r}-${c}`) {
                              setLastSweptKey(`${r}-${c}`);
                              handleToggleCrossing(r, c);
                            }
                          }}
                          className="cursor-pointer"
                        >
                          {mode === 'over' ? (
                            <g filter="url(#dropLeaf)">
                              <rect
                                x={cx - 25}
                                y={cy - 21}
                                width="50"
                                height="42"
                                fill="url(#leafFresh)"
                                stroke="#143D28"
                                strokeWidth="1.7"
                              />
                              <line x1={cx - 22} y1={cy} x2={cx + 22} y2={cy} stroke="#DFF1BC" strokeWidth="1" strokeDasharray="4 3" />
                            </g>
                          ) : (
                            <g filter="url(#dropLeaf)">
                              <rect
                                x={cx - 21}
                                y={cy - 25}
                                width="42"
                                height="50"
                                fill="url(#leafDark)"
                                stroke="#143D28"
                                strokeWidth="1.7"
                              />
                              <line x1={cx} y1={cy - 22} x2={cx} y2={cy + 22} stroke="#98D292" strokeWidth="1" strokeDasharray="4 3" />
                            </g>
                          )}

                          {showHint && !matches && (
                            <rect
                              x={cx - 28}
                              y={cy - 28}
                              width="56"
                              height="56"
                              rx="6"
                              fill="none"
                              stroke="#D97706"
                              strokeWidth="3"
                            />
                          )}

                          <text
                            x={cx}
                            y={cy + 4}
                            textAnchor="middle"
                            fill={mode === 'over' ? '#132219' : '#FFFFFF'}
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

              {/* ================= STAGE 4: DRAG & TUCK ALL 4 LOOSE ENDS ================= */}
              {state.stage === 4 && (
                <g>
                  {/* Diamond Weave Body */}
                  <g transform="translate(280, 220) rotate(45)" filter="url(#dropLeaf)">
                    <rect
                      x="-76"
                      y="-76"
                      width="152"
                      height="152"
                      rx="10"
                      fill="#CFE4CA"
                      stroke="#143D28"
                      strokeWidth="2.2"
                    />
                    {[-46, 0, 46].map((offset, idx) => (
                      <React.Fragment key={idx}>
                        <rect x={offset - 18} y="-74" width="36" height="148" fill="#3B8E47" stroke="#143D28" strokeWidth="1.2" opacity="0.92" />
                        <rect x="-74" y={offset - 18} width="148" height="36" fill="#A9D37B" stroke="#143D28" strokeWidth="1.2" opacity="0.9" />
                      </React.Fragment>
                    ))}
                  </g>

                  {/* 4 Draggable Leaf Ends & Corner Pockets */}
                  {CORNER_TUCK_POINTS.map((corner) => {
                    const tucked = state.tuckedCorners[corner.idx];
                    const isDraggingThis =
                      canvasDrag?.type === 'tuck-tail' && canvasDrag.tailIdx === corner.idx;
                    const tipPos = isDraggingThis ? canvasDrag.pointer : corner.start;

                    return (
                      <g key={corner.idx}>
                        {/* Glowing target pocket */}
                        {!tucked && (
                          <circle
                            cx={corner.target.x}
                            cy={corner.target.y}
                            r="18"
                            fill="#E8F5E9"
                            fillOpacity="0.85"
                            stroke={isDraggingThis || showHint ? '#0F764A' : '#3F5749'}
                            strokeWidth="2"
                            strokeDasharray="4 3"
                          />
                        )}

                        {!tucked ? (
                          <g
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              setCanvasDrag({
                                type: 'tuck-tail',
                                tailIdx: corner.idx,
                                pointer: corner.start,
                              });
                            }}
                            className="cursor-grab active:cursor-grabbing"
                          >
                            <path
                              d={`M ${corner.target.x} ${corner.target.y} Q ${(corner.target.x + tipPos.x) / 2} ${(corner.target.y + tipPos.y) / 2 - 14}, ${tipPos.x} ${tipPos.y}`}
                              fill="none"
                              stroke="#3B8E47"
                              strokeWidth="15"
                              strokeLinecap="round"
                            />
                            <circle
                              cx={tipPos.x}
                              cy={tipPos.y}
                              r="23"
                              fill="#FAFBF6"
                              stroke={showHint ? '#D97706' : '#143D28'}
                              strokeWidth={showHint ? '3' : '2.2'}
                            />
                            <text
                              x={tipPos.x}
                              y={tipPos.y + 4}
                              textAnchor="middle"
                              fill="#143D28"
                              fontSize="11"
                              fontWeight="700"
                            >
                              End {corner.idx + 1}
                            </text>
                          </g>
                        ) : (
                          <g>
                            <circle cx={corner.target.x} cy={corner.target.y} r="14" fill="#143D28" />
                            <text x={corner.target.x} y={corner.target.y + 4} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
                              ✓
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ================= STAGE 5: PULL TIGHT INTO DIAMOND KETUPAT ================= */}
              {state.stage === 5 && (
                <g>
                  {(() => {
                    const t = state.tightness / 100;
                    const scale = 1.24 - t * 0.24;
                    const gap = 14 * (1 - t);
                    return (
                      <g transform={`translate(280, 214) scale(${scale})`}>
                        {/* Top tapered tips */}
                        <path
                          d="M -6 -108 C -16 -148, -34 -168, -44 -178 L -34 -182 C -18 -164, -2 -144, 2 -108 Z"
                          fill="#8CC065"
                          stroke="#143D28"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M 6 -108 C 16 -146, 34 -164, 46 -176 L 36 -180 C 18 -162, 4 -142, -2 -108 Z"
                          fill="#469650"
                          stroke="#143D28"
                          strokeWidth="1.5"
                        />

                        {/* Bottom thick stems */}
                        <path
                          d="M -6 108 L -14 156 L -4 160 L 4 108 Z"
                          fill="#3B8E47"
                          stroke="#143D28"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M 6 108 L 16 154 L 6 158 L -4 108 Z"
                          fill="#82BC5E"
                          stroke="#143D28"
                          strokeWidth="1.5"
                        />

                        {/* Traditional Diamond Ketupat Body */}
                        <g transform="rotate(45)" filter="url(#dropLeaf)">
                          <rect
                            x={-84 - gap * 0.4}
                            y={-84 - gap * 0.4}
                            width={168 + gap * 0.8}
                            height={168 + gap * 0.8}
                            rx="14"
                            fill="#2E743B"
                            stroke="#143D28"
                            strokeWidth="2.5"
                          />
                          {[0, 1, 2].map((r) =>
                            [0, 1, 2].map((c) => {
                              const tileSize = 52;
                              const x = -80 + c * (tileSize + gap * 0.25);
                              const y = -80 + r * (tileSize + gap * 0.25);
                              const isDark = (r + c) % 2 === 0;
                              return (
                                <g key={`kt-${r}-${c}`}>
                                  <rect
                                    x={x}
                                    y={y}
                                    width={tileSize}
                                    height={tileSize}
                                    rx="4"
                                    fill={isDark ? '#469650' : '#AED67A'}
                                    stroke="#143D28"
                                    strokeWidth="1.5"
                                  />
                                  <line
                                    x1={isDark ? x + 6 : x + 16}
                                    y1={isDark ? y + 16 : y + 6}
                                    x2={isDark ? x + 46 : x + 16}
                                    y2={isDark ? y + 16 : y + 46}
                                    stroke={isDark ? '#88C884' : '#DFF1BC'}
                                    strokeWidth="1.1"
                                  />
                                  <line
                                    x1={isDark ? x + 6 : x + 34}
                                    y1={isDark ? y + 34 : y + 6}
                                    x2={isDark ? x + 46 : x + 34}
                                    y2={isDark ? y + 34 : y + 46}
                                    stroke={isDark ? '#88C884' : '#DFF1BC'}
                                    strokeWidth="1.1"
                                  />
                                </g>
                              );
                            })
                          )}
                        </g>

                        {/* Draggable Bottom Pull Handle */}
                        {state.tightness < 100 && (
                          <g
                            transform="translate(0, 162)"
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              const pt = toSvgPoint(e.clientX, e.clientY);
                              setCanvasDrag({
                                type: 'pull-tight',
                                startY: pt.y,
                                startTightness: state.tightness,
                              });
                            }}
                            className="cursor-ns-resize"
                          >
                            <rect
                              x="-52"
                              y="-14"
                              width="104"
                              height="28"
                              rx="14"
                              fill="#143D28"
                              stroke="#FAFBF6"
                              strokeWidth="2"
                            />
                            <text x="0" y="4" textAnchor="middle" fill="#FAFBF6" fontSize="11" fontWeight="700">
                              Drag to Pull Tight ↓
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })()}
                </g>
              )}
            </svg>

            {/* Tightening Slider on Stage 5 */}
            {state.stage === 5 && (
              <div className="w-full max-w-md mt-2 bg-[#FAFBF6] border border-[#B5D2AF] rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#132219]">
                  <label htmlFor="tighten-slider">Tighten Ketupat</label>
                  <span className="font-mono tabular-nums text-[#0F764A]">{state.tightness}%</span>
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
                        setFeedbackMsg('Awesome! Your traditional woven diamond Ketupat is complete!');
                      }
                    }}
                    className="w-full accent-[#0F764A] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      pushState(
                        (p) => ({ ...p, tightness: 100 }),
                        'Awesome! You finished weaving a traditional Indonesian Ketupat!'
                      )
                    }
                    className="px-3.5 py-2 text-xs font-semibold bg-[#143D28] text-white rounded-lg hover:bg-[#0D2B1B] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Pull Tight
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Live Feedback Strip */}
          <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-[#132219]">
            <Sparkles className="w-4 h-4 text-[#0F764A] shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        </section>

        {/* RIGHT PANEL: Simple Instructions & Controls */}
        <aside className="lg:col-span-3 bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-4 sm:p-5 space-y-4">
          <div className="pb-3 border-b border-[#B5D2AF]">
            <p className="font-mono text-xs text-[#0F764A] tabular-nums mb-1 font-semibold">
              Step {state.stage + 1} of {STAGE_INSTRUCTIONS.length}
            </p>
            <h2 className="font-serif text-2xl font-semibold text-[#132219]">
              {stageInfo.title}
            </h2>
          </div>

          <p className="text-sm text-[#132219] leading-relaxed">
            {stageInfo.instruction}
          </p>

          <div
            className={`p-3 rounded-lg border text-xs leading-relaxed ${
              currentComplete
                ? 'bg-[#CFE4CA] border-[#0F764A] text-[#143D28]'
                : 'bg-[#FAFBF6] border-[#B5D2AF] text-[#3F5749]'
            }`}
          >
            <span className="font-semibold block mb-0.5 text-[#132219]">
              {currentComplete ? 'Step Done!' : 'Goal:'}
            </span>
            {currentComplete && state.stage === STAGE_INSTRUCTIONS.length - 1
              ? 'You made a real diamond Ketupat Bawang! Click Reset to play again or try our step-by-step tutorials.'
              : stageInfo.goalText}
          </div>

          {showHint && (
            <div className="p-3 rounded-lg bg-[#FFF8E7] border border-[#E5B85C] text-xs text-[#5B4112] leading-relaxed">
              <strong className="block mb-0.5">Hint:</strong>
              {stageInfo.hintText}
            </div>
          )}

          {/* Action Controls */}
          <div className="pt-2 border-t border-[#B5D2AF] space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  if (state.stage === 0) return;
                  goToStage(state.stage - 1);
                }}
                disabled={state.stage === 0}
                className="inline-flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-medium rounded-lg border border-[#B5D2AF] bg-[#FAFBF6] text-[#132219] hover:bg-[#CFE4CA] disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer min-h-[40px]"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (state.stage >= STAGE_INSTRUCTIONS.length - 1) return;
                  goToStage(state.stage + 1);
                }}
                disabled={state.stage === STAGE_INSTRUCTIONS.length - 1}
                className="inline-flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-semibold rounded-lg bg-[#143D28] text-white hover:bg-[#0D2B1B] disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer min-h-[40px]"
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
                    ? 'bg-[#0F764A] text-white border-[#0F764A]'
                    : 'bg-[#FAFBF6] text-[#132219] border-[#B5D2AF] hover:bg-[#CFE4CA]'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Hint</span>
              </button>

              <button
                type="button"
                onClick={handleUndo}
                disabled={history.length === 0}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg border border-[#B5D2AF] bg-[#FAFBF6] text-[#132219] hover:bg-[#CFE4CA] disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer min-h-[40px]"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Undo</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg border border-[#B5D2AF] bg-[#FAFBF6] text-[#132219] hover:bg-[#CFE4CA] cursor-pointer min-h-[40px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Floating Ghost Preview While Dragging from Side Panel */}
      {paletteDrag && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-[#143D28] text-white text-xs font-semibold shadow-lg -translate-x-1/2 -translate-y-1/2"
          style={{ left: paletteDragPos.x, top: paletteDragPos.y }}
        >
          {PALETTE_LABELS[paletteDrag]}
        </div>
      )}
    </div>
  );
};
