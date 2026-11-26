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
  stripBAngle: number; // 0 to 90
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
    title: 'Step 1: Cut the Leaf',
    shortLabel: '1. Cut Leaf',
    instruction:
      'Pick up the Young Coconut Leaf and move it onto the mat. Next, pick up the Scissors, put them on the leaf, and slide from left to right to cut it into two soft green strips.',
    goalText: 'Put the leaf on the mat and cut down the middle line.',
    hintText: 'Move the Leaf onto the mat, put the Scissors on the leaf, then drag the scissors to the right!',
  },
  {
    title: 'Step 2: Fold 3 Leaf Loops',
    shortLabel: '2. Fold 3 Loops',
    instruction:
      'Pick up the green leaf end on the right and move it onto the "Fold Here" circle. Fold the leaf 3 times to make 3 neat loops side by side.',
    goalText: 'Fold Loop 1, Loop 2, and Loop 3 onto the "Fold Here" circles.',
    hintText: 'Drag the green dot on the right directly into the dashed "Fold Here" circle for each loop (1, 2, and 3).',
  },
  {
    title: 'Step 3: Add & Turn Strip B',
    shortLabel: '3. Turn Strip B',
    instruction:
      'Pick up Leaf Strip B and move it onto the mat. Then drag the round "Turn" button (or click Turn Sideways) so Strip B lies across Strip A.',
    goalText: 'Put Strip B on the mat and turn it sideways.',
    hintText: 'Drag Leaf Strip B onto the mat, then drag the "Turn" handle right until it locks sideways.',
  },
  {
    title: 'Step 4: Put Strips Over & Under',
    shortLabel: '4. Over & Under',
    instruction:
      'Now weave! Click or slide across each square where the leaves cross. Switch between OVER and UNDER so every row alternates and locks together.',
    goalText: 'Make every crossing switch Over and Under (9 out of 9).',
    hintText: 'Row 1: Over · Under · Over | Row 2: Under · Over · Under | Row 3: Over · Under · Over.',
  },
  {
    title: 'Step 5: Tuck the 4 Ends',
    shortLabel: '5. Tuck Ends',
    instruction:
      'Pick up each loose leaf end (End 1 to End 4) and move it into the glowing corner pocket on the diamond.',
    goalText: 'Move all 4 loose ends into their corner pockets.',
    hintText: 'Drag End 1, End 2, End 3, and End 4 inward to the dashed circles on the diamond.',
  },
  {
    title: 'Step 6: Pull Tight Into a Ketupat',
    shortLabel: '6. Pull Tight',
    instruction:
      'Grab the green pull handle and drag downward—or slide the bar to 100%—to close the gaps and finish your diamond ketupat!',
    goalText: 'Pull the strips tight to 100% to finish your ketupat.',
    hintText: 'Drag the green "Pull Tight" handle down or move the slider all the way to 100%.',
  },
];

type PaletteItemId = 'whole-leaf' | 'water-bowl' | 'strip-a' | 'strip-b' | 'scissors';

const PALETTE_LABELS: Record<PaletteItemId, string> = {
  'whole-leaf': 'Young Coconut Leaf',
  'water-bowl': 'Bowl of Water',
  'strip-a': 'Leaf Strip A',
  'strip-b': 'Leaf Strip B',
  scissors: 'Scissors',
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

const LOOP_SLOTS_X = [195, 267, 339];
const LOOP_TARGET_Y = 196;

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
    'Pick up the Young Coconut Leaf and move it onto the mat!'
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

  const applyPaletteDrop = useCallback(
    (itemId: PaletteItemId) => {
      const s = stateRef.current;
      if (itemId === 'whole-leaf') {
        if (!s.leafOnMat) {
          pushState(
            (p) => ({ ...p, stage: 0, leafOnMat: true }),
            'Well done! Now pick up the Scissors and move them onto the leaf.'
          );
        }
        return;
      }

      if (itemId === 'water-bowl') {
        if (!s.leafOnMat) {
          setFeedbackMsg('Put the Young Coconut Leaf on the mat first!');
          return;
        }
        pushState(
          (p) => ({ ...p, leafHydrated: true }),
          'Nice! The leaf is soft and ready to fold.'
        );
        return;
      }

      if (itemId === 'scissors') {
        if (!s.leafOnMat) {
          setFeedbackMsg('Put the Young Coconut Leaf on the mat first!');
          return;
        }
        setSelectedTool('scissors');
        if (!s.leafCutDone) {
          setScissorsActiveOnLeaf(true);
          setFeedbackMsg(
            'Slide the Scissors from left to right along the dotted line!'
          );
        }
        return;
      }

      if (itemId === 'strip-a') {
        if (!s.leafCutDone) {
          setFeedbackMsg('Cut the whole leaf first in Step 1.');
          return;
        }
        if (s.stage === 0) {
          pushState(
            (p) => ({ ...p, stage: 1 }),
            'Fold the leaf! Drag the green dot on the right to the "Fold Here" circle.'
          );
        } else {
          setFeedbackMsg('Drag the green dot on the right onto the "Fold Here" circle!');
        }
        return;
      }

      if (itemId === 'strip-b') {
        if (!s.leafCutDone) {
          setFeedbackMsg('Cut the whole leaf first in Step 1.');
          return;
        }
        if (s.foldsA < 3) {
          setFeedbackMsg('Fold all 3 loops in Step 2 first!');
          return;
        }
        pushState(
          (p) => ({ ...p, stage: Math.max(p.stage, 2), stripBPlaced: true }),
          'Well done! Now drag the "Turn" handle right (or click Turn Sideways).'
        );
      }
    },
    [pushState]
  );

  // Palette pointer drag listeners
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
        } else {
          setFeedbackMsg('Try again! Drop the item inside the craft mat.');
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

  // In-canvas physical crafting drags
  useEffect(() => {
    if (!canvasDrag) return;

    const handleMove = (e: PointerEvent) => {
      const pt = toSvgPoint(e.clientX, e.clientY);

      if (canvasDrag.type === 'scissors-cut') {
        const pct = Math.max(0, Math.min(100, ((pt.x - 86) / (474 - 86)) * 100));
        setState((prev) => {
          if (pct >= 92 && !prev.leafCutDone) {
            setHistory((h) => [...h.slice(-20), prev]);
            setFeedbackMsg(
              'Well done! You cut the leaf into two green strips. Move them around or click Next Step!'
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
          setFeedbackMsg('Well done! You made a traditional diamond Ketupat!');
        }
      }
    };

    const handleUp = (e: PointerEvent) => {
      const pt = toSvgPoint(e.clientX, e.clientY);

      if (canvasDrag.type === 'fold-strip-a') {
        const currentFoldIndex = stateRef.current.foldsA;
        if (currentFoldIndex < 3) {
          const targetX = LOOP_SLOTS_X[currentFoldIndex];
          const distToCircle = Math.hypot(pt.x - targetX, pt.y - LOOP_TARGET_Y);
          const insideLoopSlot =
            Math.abs(pt.x - targetX) <= 44 && pt.y >= 62 && pt.y <= 360;

          if (distToCircle <= 64 || insideLoopSlot) {
            const nextCount = currentFoldIndex + 1;
            pushState(
              (p) => ({ ...p, foldsA: Math.min(3, nextCount) }),
              nextCount >= 3
                ? 'Well done! All 3 loops (3/3) are folded! Click Next Step to add Strip B.'
                : `Well done! Loop ${nextCount} of 3 is folded. Now fold Loop ${nextCount + 1}!`
            );
          } else {
            setFeedbackMsg(
              `Try again! Move the leaf onto the "Fold Here" circle for Loop ${currentFoldIndex + 1}.`
            );
          }
        }
      } else if (canvasDrag.type === 'rotate-strip-b') {
        if (stateRef.current.stripBAngle >= 70) {
          pushState(
            (p) => ({ ...p, stripBAngle: 90 }),
            'Well done! Strip B is sideways across Strip A. Click Next Step!'
          );
        } else {
          setFeedbackMsg('Try again! Drag the Turn button further right until it locks sideways.');
        }
      } else if (canvasDrag.type === 'tuck-tail') {
        const idx = canvasDrag.tailIdx;
        const corner = CORNER_TUCK_POINTS[idx];
        const dist = Math.hypot(pt.x - corner.target.x, pt.y - corner.target.y);
        if (dist < 72) {
          const nextCount = stateRef.current.tuckedCorners.filter(Boolean).length + 1;
          pushState(
            (p) => {
              const nextTucked = [...p.tuckedCorners];
              nextTucked[idx] = true;
              return { ...p, tuckedCorners: nextTucked };
            },
            nextCount === 4
              ? 'Well done! All 4 ends are tucked! Click Next Step to pull tight.'
              : `Well done! End ${idx + 1} tucked (${nextCount}/4).`
          );
        } else {
          setFeedbackMsg(`Try again! Move End ${idx + 1} directly into its corner pocket.`);
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
          ? 'Well done! Every crossing is Over and Under. Click Next Step!'
          : 'Switched! Keep making Over and Under switch on every row.'
      );
      return { ...prev, crossings: nextGrid };
    });
  };

  const handleRotateButton = () => {
    if (!state.stripBPlaced) {
      setFeedbackMsg('Put Leaf Strip B on the mat first!');
      return;
    }
    pushState(
      (p) => ({ ...p, stripBAngle: p.stripBAngle >= 85 ? 0 : 90 }),
      state.stripBAngle >= 85
        ? 'Turned Strip B back.'
        : 'Well done! Strip B is sideways. Click Next Step!'
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
    setFeedbackMsg('Table cleared! Pick up the Young Coconut Leaf and move it onto the mat.');
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

  const scissorsX = 86 + (state.cutProgress / 100) * (474 - 86);
  const splitGap = state.leafCutDone ? 36 : (state.cutProgress / 100) * 16;

  // Check if active Loop drag is right inside the active "Fold Here" circle
  const activeFoldTargetX = state.foldsA < 3 ? LOOP_SLOTS_X[state.foldsA] : 339;
  const foldDragInsideZone =
    canvasDrag?.type === 'fold-strip-a' &&
    (Math.hypot(canvasDrag.pointer.x - activeFoldTargetX, canvasDrag.pointer.y - LOOP_TARGET_Y) <= 64 ||
      (Math.abs(canvasDrag.pointer.x - activeFoldTargetX) <= 44 &&
        canvasDrag.pointer.y >= 62 &&
        canvasDrag.pointer.y <= 360));

  return (
    <div className="space-y-5">
      {/* Progress & Step Bar */}
      <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-3.5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-[#143D28]">
            Ketupat Progress: Step {state.stage + 1} of {STAGE_INSTRUCTIONS.length}
          </span>
          <span className="font-mono tabular-nums text-[#0F764A] font-semibold">
            {overallProgress}% Done
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
        {/* LEFT PANEL: Materials & Tools */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-4 space-y-2.5">
            <div className="pb-2 border-b border-[#B5D2AF]">
              <h2 className="font-serif text-xl font-semibold text-[#132219]">
                Materials
              </h2>
              <p className="text-xs text-[#3F5749] mt-0.5">
                Pick up a leaf and move it onto the mat.
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
              <p className="text-[11px] text-[#3F5749]">Fresh leaf with middle stick</p>
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
                {state.leafCutDone ? 'Used for 3 loops' : 'Cut the leaf first'}
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
                {state.leafCutDone ? 'Goes across Strip A' : 'Cut the leaf first'}
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
                <p className="text-xs font-semibold text-[#132219]">Bowl of Water</p>
                <p className="text-[11px] text-[#3F5749]">
                  {state.leafHydrated ? 'Leaf is soft!' : 'Makes leaves soft'}
                </p>
              </div>
            </div>
          </div>

          {/* Tools Panel */}
          <div className="bg-[#E5F0E3] border border-[#B5D2AF] rounded-xl p-4 space-y-2.5">
            <div className="pb-2 border-b border-[#B5D2AF]">
              <h2 className="font-serif text-xl font-semibold text-[#132219]">
                Tools
              </h2>
              <p className="text-xs text-[#3F5749] mt-0.5">
                Pick a tool and move it onto the leaf.
              </p>
            </div>

            {/* Scissors */}
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
                <p className="text-xs font-semibold text-[#132219]">Scissors</p>
                <p className="text-[11px] text-[#3F5749]">
                  Cuts the middle stick out
                </p>
              </div>
            </div>

            {/* Turn Sideways Tool */}
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
                <p className="text-xs font-semibold text-[#132219]">Turn Sideways</p>
                <p className="text-[11px] text-[#3F5749]">Turns Strip B across Strip A</p>
              </div>
            </button>
          </div>
        </aside>

        {/* CENTER PANEL: Real Craft Mat */}
        <section className="lg:col-span-6 space-y-3">
          <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#143D28]">
              Craft Mat
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
                  Turned: {state.stripBAngle}°
                </span>
              )}
              {state.stage === 3 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Done: {lockedCrossingsCount} / 9
                </span>
              )}
              {state.stage === 4 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Tucked: {state.tuckedCorners.filter(Boolean).length} / 4
                </span>
              )}
              {state.stage === 5 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Tight: {state.tightness}%
                </span>
              )}
            </div>
          </div>

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
              aria-label="Interactive janur craft mat"
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

              {/* ================= STAGE 0: CUT THE LEAF ================= */}
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
                        Move Leaf Here
                      </text>
                      <text x="280" y="236" textAnchor="middle" fill="#3F5749" fontSize="12">
                        Pick up the Young Coconut Leaf on the left
                      </text>
                    </g>
                  ) : (
                    <g>
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
                            Strip A (Move me!)
                          </text>
                        )}
                      </g>

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
                            Strip B (Move me!)
                          </text>
                        )}
                      </g>

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
                          Middle stick cut out! Click Next Step when ready.
                        </text>
                      )}

                      {!state.leafCutDone && (
                        <g>
                          <line
                            x1="86"
                            y1="220"
                            x2="474"
                            y2="220"
                            stroke="#F59E0B"
                            strokeWidth="3"
                            strokeDasharray="7 5"
                          />
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
                                setFeedbackMsg('Slide the Scissors from left to right along the yellow dotted line!');
                              }}
                              className="cursor-pointer"
                            >
                              <rect
                                x="165"
                                y="198"
                                width="230"
                                height="44"
                                rx="22"
                                fill="#FAFBF6"
                                fillOpacity="0.94"
                                stroke="#0F764A"
                                strokeWidth="2"
                              />
                              <text x="280" y="224" textAnchor="middle" fill="#143D28" fontSize="12.5" fontWeight="700">
                                Move Scissors Here to Cut
                              </text>
                            </g>
                          ) : (
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
                                Slide Right →
                              </text>
                            </g>
                          )}
                        </g>
                      )}
                    </g>
                  )}
                </g>
              )}

              {/* ================= STAGE 1: FOLD 3 LEAF LOOPS (FIXED FOR LOOP 1, 2, AND 3!) ================= */}
              {state.stage === 1 && (
                <g>
                  {/* Render Loop 1, Loop 2, Loop 3 slots */}
                  {LOOP_SLOTS_X.map((cx, i) => {
                    const isFolded = i < state.foldsA;
                    const isCurrent = i === state.foldsA;
                    return (
                      <g key={cx}>
                        {!isFolded ? (
                          <g>
                            {/* Dashed leaf loop outline */}
                            <rect
                              x={cx - 22}
                              y="68"
                              width="44"
                              height="286"
                              rx="22"
                              fill={isCurrent ? '#E8F5E9' : '#FAFBF6'}
                              fillOpacity={isCurrent ? 0.75 : 0.45}
                              stroke={isCurrent ? '#0F764A' : '#9AC193'}
                              strokeWidth={isCurrent ? '2.2' : '1.5'}
                              strokeDasharray="6 4"
                            />
                            <text x={cx} y="376" textAnchor="middle" fill="#3F5749" fontSize="11" fontWeight="600">
                              Loop {i + 1}
                            </text>
                          </g>
                        ) : (
                          /* Completed Folded Loop with visible leaf bend & inner hole */
                          <g filter="url(#dropLeaf)">
                            {/* Back strip half */}
                            <path
                              d={`M ${cx - 21} 92 C ${cx - 21} 56, ${cx + 21} 56, ${cx + 21} 92 L ${cx + 21} 332 C ${cx + 21} 356, ${cx - 21} 356, ${cx - 21} 332 Z`}
                              fill="url(#leafDark)"
                              stroke="#143D28"
                              strokeWidth="1.8"
                            />
                            {/* Loop opening at top so it visibly reads as a folded loop */}
                            <ellipse cx={cx} cy="86" rx="10" ry="12" fill="#E8F5E9" stroke="#143D28" strokeWidth="1.3" />
                            <line x1={cx} y1="104" x2={cx} y2="342" stroke="#98D292" strokeWidth="1.2" strokeDasharray="6 4" />
                            <text x={cx} y="378" textAnchor="middle" fill="#143D28" fontSize="11.5" fontWeight="700">
                              Loop {i + 1} ✓
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* Active Draggable Leaf Strip & Target Circle */}
                  {state.foldsA < 3 && (
                    <g>
                      {/* Target "Fold Here" Ring */}
                      <circle
                        cx={activeFoldTargetX}
                        cy={LOOP_TARGET_Y}
                        r={foldDragInsideZone ? 31 : 27}
                        fill={foldDragInsideZone ? '#0F764A' : '#CFE4CA'}
                        fillOpacity={foldDragInsideZone ? 0.25 : 0.7}
                        stroke={foldDragInsideZone ? '#0F764A' : showHint ? '#D97706' : '#0F764A'}
                        strokeWidth={foldDragInsideZone || showHint ? '3' : '2.2'}
                        strokeDasharray={foldDragInsideZone ? 'none' : '5 4'}
                      />
                      <text
                        x={activeFoldTargetX}
                        y={LOOP_TARGET_Y + 4}
                        textAnchor="middle"
                        fill="#143D28"
                        fontSize="10.5"
                        fontWeight="700"
                      >
                        {foldDragInsideZone ? 'Drop!' : 'Fold Here'}
                      </text>

                      {/* Bending Leaf Strip that visibly curves from right side to user pointer */}
                      {(() => {
                        const restPoint = { x: 472, y: 270 };
                        const dragPt =
                          canvasDrag?.type === 'fold-strip-a' ? canvasDrag.pointer : restPoint;
                        const anchorX = 435;
                        const anchorY = 330;
                        const bendCtrlX = Math.min(anchorX, dragPt.x) + 40;
                        const bendCtrlY = Math.min(anchorY, dragPt.y) - 90;

                        return (
                          <g>
                            {/* Base leaf tail on the right waiting to be folded */}
                            <path
                              d={`M ${anchorX} ${anchorY} Q ${bendCtrlX} ${bendCtrlY}, ${dragPt.x} ${dragPt.y}`}
                              fill="none"
                              stroke={foldDragInsideZone ? '#0F764A' : '#3B8E47'}
                              strokeWidth="26"
                              strokeLinecap="round"
                              filter="url(#dropLeaf)"
                            />
                            <path
                              d={`M ${anchorX} ${anchorY} Q ${bendCtrlX} ${bendCtrlY}, ${dragPt.x} ${dragPt.y}`}
                              fill="none"
                              stroke="#A9D37B"
                              strokeWidth="2"
                              strokeDasharray="6 4"
                            />
                            {/* Draggable Leaf Tip */}
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
                                r="23"
                                fill={foldDragInsideZone ? '#0F764A' : '#143D28'}
                                stroke="#FAFBF6"
                                strokeWidth="2.5"
                              />
                              <text x="0" y="4" textAnchor="middle" fill="#FAFBF6" fontSize="10.5" fontWeight="700">
                                Fold {state.foldsA + 1}
                              </text>
                            </g>
                          </g>
                        );
                      })()}
                    </g>
                  )}
                </g>
              )}

              {/* ================= STAGE 2: ADD & TURN STRIP B ================= */}
              {state.stage === 2 && (
                <g>
                  {LOOP_SLOTS_X.map((cx) => (
                    <g key={cx}>
                      <path
                        d={`M ${cx - 20} 88 C ${cx - 20} 54, ${cx + 20} 54, ${cx + 20} 88 L ${cx + 20} 332 C ${cx + 20} 356, ${cx - 20} 356, ${cx - 20} 332 Z`}
                        fill="url(#leafDark)"
                        stroke="#143D28"
                        strokeWidth="1.6"
                        opacity="0.92"
                      />
                      <ellipse cx={cx} cy="84" rx="8" ry="10" fill="#E8F5E9" stroke="#143D28" strokeWidth="1.2" />
                    </g>
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
                        fillOpacity="0.76"
                        stroke="#0F764A"
                        strokeWidth="2.2"
                        strokeDasharray="7 5"
                      />
                      <text x="280" y="220" textAnchor="middle" fill="#143D28" fontSize="14.5" fontWeight="700">
                        Move Leaf Strip B Here
                      </text>
                    </g>
                  ) : (
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
                          <circle cx="0" cy="0" r="21" fill="#143D28" stroke="#FAFBF6" strokeWidth="2.5" />
                          <text x="0" y="4" textAnchor="middle" fill="#FAFBF6" fontSize="10" fontWeight="700">
                            Turn
                          </text>
                        </g>
                      )}
                    </g>
                  )}
                </g>
              )}

              {/* ================= STAGE 3: WEAVE OVER & UNDER ================= */}
              {state.stage === 3 && (
                <g>
                  {[208, 280, 352].map((cx) => (
                    <path
                      key={`va-${cx}`}
                      d={`M ${cx - 21} 68 L ${cx} 46 L ${cx + 21} 68 L ${cx + 21} 368 L ${cx - 21} 368 Z`}
                      fill="url(#leafDark)"
                      stroke="#143D28"
                      strokeWidth="1.6"
                    />
                  ))}

                  {[148, 220, 292].map((cy) => (
                    <path
                      key={`hb-${cy}`}
                      d={`M 105 ${cy - 21} L 444 ${cy - 21} L 468 ${cy} L 444 ${cy + 21} L 105 ${cy + 21} Z`}
                      fill="url(#leafFresh)"
                      stroke="#0F764A"
                      strokeWidth="1.6"
                    />
                  ))}

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

              {/* ================= STAGE 4: TUCK THE 4 ENDS ================= */}
              {state.stage === 4 && (
                <g>
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

                  {CORNER_TUCK_POINTS.map((corner) => {
                    const tucked = state.tuckedCorners[corner.idx];
                    const isDraggingThis =
                      canvasDrag?.type === 'tuck-tail' && canvasDrag.tailIdx === corner.idx;
                    const tipPos = isDraggingThis ? canvasDrag.pointer : corner.start;

                    return (
                      <g key={corner.idx}>
                        {!tucked && (
                          <circle
                            cx={corner.target.x}
                            cy={corner.target.y}
                            r="18"
                            fill="#E8F5E9"
                            fillOpacity="0.88"
                            stroke={isDraggingThis || showHint ? '#0F764A' : '#3F5749'}
                            strokeWidth="2.2"
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
                              Pull Tight ↓
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })()}
                </g>
              )}
            </svg>

            {state.stage === 5 && (
              <div className="w-full max-w-md mt-2 bg-[#FAFBF6] border border-[#B5D2AF] rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-[#132219]">
                  <label htmlFor="tighten-slider">Pull Tight</label>
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
                        setFeedbackMsg('Well done! Your diamond Ketupat is finished!');
                      }
                    }}
                    className="w-full accent-[#0F764A] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      pushState(
                        (p) => ({ ...p, tightness: 100 }),
                        'Well done! Your diamond Ketupat is finished!'
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

          <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-[#132219]">
            <Sparkles className="w-4 h-4 text-[#0F764A] shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        </section>

        {/* RIGHT PANEL: Instructions & Controls */}
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
              {currentComplete ? 'Well Done!' : 'Goal:'}
            </span>
            {currentComplete && state.stage === STAGE_INSTRUCTIONS.length - 1
              ? 'You made a traditional diamond Ketupat! Click Reset to try again.'
              : stageInfo.goalText}
          </div>

          {showHint && (
            <div className="p-3 rounded-lg bg-[#FFF8E7] border border-[#E5B85C] text-xs text-[#5B4112] leading-relaxed">
              <strong className="block mb-0.5">Hint:</strong>
              {stageInfo.hintText}
            </div>
          )}

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
