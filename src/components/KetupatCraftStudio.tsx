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
import { JanurLeafIcon, KetupatDiamondIcon } from './BotanicalDecorations';

type CrossingState = 'over' | 'under';

interface Point {
  x: number;
  y: number;
}

interface StudioSnapshot {
  stage: number; // 0..6
  leafOnMat: boolean;
  hydration: number; // 0..100
  leafHydrated: boolean;
  cutProgress: number; // 0..100
  leafCutDone: boolean;
  lidiRemoved: boolean;
  foldsA: number; // 0..3
  stripBPlaced: boolean;
  stripBAngle: number; // 0..90
  crossings: CrossingState[][];
  tuckedCorners: boolean[];
  tightness: number; // 0..100
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
  hydration: 0,
  leafHydrated: false,
  cutProgress: 0,
  leafCutDone: false,
  lidiRemoved: false,
  foldsA: 0,
  stripBPlaced: false,
  stripBAngle: 0,
  crossings: INITIAL_CROSSINGS.map((r) => [...r]),
  tuckedCorners: [false, false, false, false],
  tightness: 0,
};

interface StageGuide {
  title: string;
  shortLabel: string;
  instruction: string;
  beforeText: string;
  afterText: string;
  whyText: string;
  goalText: string;
  hintText: string;
}

const STAGE_GUIDES: StageGuide[] = [
  {
    title: '1. Prepare the Janur',
    shortLabel: '1. Prepare',
    instruction:
      'Drag the Young Coconut Leaf onto the mat. Next, drag the Bowl of Water onto the leaf and wipe left and right to make it soft.',
    beforeText: 'One dry, stiff young coconut leaf.',
    afterText: 'The leaf turns fresh green, soft, and easy to bend.',
    whyText: 'Damp leaves bend smoothly without cracking or breaking.',
    goalText: 'Put the leaf on the mat and wipe it soft (100%).',
    hintText:
      'First drag the Young Coconut Leaf onto the dashed outline. Then drag the Bowl of Water onto the leaf and slide the wet cloth left and right!',
  },
  {
    title: '2. Select and Cut the Strips',
    shortLabel: '2. Cut Strips',
    instruction:
      'Drag the Scissors onto the leaf spine and slide right to cut out the hard middle stick (lidi). Then drag the brown stick into the Save Lidi tray.',
    beforeText: 'One whole leaf with a hard brown stick down the middle.',
    afterText: 'Two soft weaving ribbons: Strip A (dark green) and Strip B (light green).',
    whyText: 'Removing the hard stick lets both halves fold into clean loops.',
    goalText: 'Cut the middle line (100%) and move the stick to Save Lidi.',
    hintText:
      'Drag Scissors from Tools onto the leaf, slide the scissors button all the way right, then drag the brown stick to the Save Lidi tray!',
  },
  {
    title: '3. Make the First Fold',
    shortLabel: '3. First Fold',
    instruction:
      'Strip A lies flat on the mat. Grab the green "Pull Tip" on the right and drag it up and over into the "Fold Loop 1" circle.',
    beforeText: 'One flat green ribbon (Strip A) lying across the mat.',
    afterText: 'Strip A bends upward into Loop 1 with extra ribbon on the right.',
    whyText: 'Loop 1 is the anchor! The next loops will connect right beside it.',
    goalText: 'Bend Strip A into Loop 1.',
    hintText:
      'Hold and drag the dark green "Pull Tip" circle upward and drop it inside the "Fold Loop 1" ring!',
  },
  {
    title: '4. Create the Loops',
    shortLabel: '4. Create Loops',
    instruction:
      'Drag the continuing strip end to make Loop 2 and Loop 3. Then drag Strip B onto the mat and drag "Turn" to lay it sideways across the 3 loops.',
    beforeText: 'Loop 1 stands on the left with long ribbon extending right.',
    afterText: 'All 3 connected loops stand side by side, with Strip B crossing them.',
    whyText: 'Crossing Strip B over the 3 loops builds the 3×3 grid for weaving.',
    goalText: 'Form Loop 2, form Loop 3, and turn Strip B sideways.',
    hintText:
      'Drag the strip tip into "Fold Loop 2", then into "Fold Loop 3". After 3/3 loops are done, drag Strip B onto the mat and turn it sideways!',
  },
  {
    title: '5. Weave the Strips',
    shortLabel: '5. Weave',
    instruction:
      'Click or slide across each square where the leaves cross. Switch between OVER and UNDER so every row alternates and locks tight.',
    beforeText: 'Strip B sits flat on top of Strip A, so the strips can still slip apart.',
    afterText: 'All 9 crossings alternate Over and Under in a firm checkerboard square.',
    whyText: 'Alternating over and under locks the strips so rice stays inside.',
    goalText: 'Lock all 9 Over and Under crossings (9/9).',
    hintText:
      'Row 1: Over · Under · Over | Row 2: Under · Over · Under | Row 3: Over · Under · Over.',
  },
  {
    title: '6. Shape the Ketupat',
    shortLabel: '6. Shape',
    instruction:
      'The woven square turns into a diamond! Drag each loose end (End 1 to End 4) inward into its matching glowing corner pocket.',
    beforeText: 'A flat woven checkerboard with 4 loose leaf ends sticking out.',
    afterText: 'All 4 ends tuck safely into the diamond edges, closing the pouch.',
    whyText: 'Tucking the 4 corners closes the open sides into a hollow rice pouch.',
    goalText: 'Tuck all 4 ends into their corner pockets (4/4).',
    hintText:
      'Hold End 1, End 2, End 3, and End 4 one by one and drop each into its dashed corner circle!',
  },
  {
    title: '7. Finish the Craft',
    shortLabel: '7. Finish',
    instruction:
      'Grab the "Pull Tight" handle at the bottom and pull down—or move the Tightness slider to 100%—to close the gaps and finish your ketupat!',
    beforeText: 'A loose diamond ketupat with small spaces between the woven squares.',
    afterText: 'A crisp, tight, leak-proof Indonesian ketupat ready for cooking!',
    whyText: 'Pulling tight closes every gap so rice grains cannot fall out.',
    goalText: 'Pull tight to 100% to complete your ketupat.',
    hintText:
      'Drag the green "Pull Tight" handle downward or slide the Tightness bar all the way to 100%.',
  },
];

type PaletteItemId = 'whole-leaf' | 'water-bowl' | 'strip-b' | 'scissors';

const PALETTE_LABELS: Record<PaletteItemId, string> = {
  'whole-leaf': 'Young Coconut Leaf',
  'water-bowl': 'Bowl of Water',
  'strip-b': 'Leaf Strip B',
  scissors: 'Scissors',
};

type ActiveCanvasDrag =
  | { type: 'wipe-leaf' }
  | { type: 'scissors-cut' }
  | { type: 'move-lidi'; pointer: Point }
  | { type: 'fold-strip-a'; pointer: Point }
  | { type: 'rotate-strip-b' }
  | { type: 'tuck-tail'; tailIdx: number; pointer: Point }
  | { type: 'pull-tight'; startY: number; startTightness: number }
  | null;

const LOOP_SLOTS_X = [195, 267, 339];
const LOOP_TARGET_Y = 196;

const CORNER_TUCK_POINTS = [
  { idx: 0, start: { x: 112, y: 110 }, target: { x: 202, y: 156 } },
  { idx: 1, start: { x: 448, y: 110 }, target: { x: 358, y: 156 } },
  { idx: 2, start: { x: 112, y: 330 }, target: { x: 202, y: 284 } },
  { idx: 3, start: { x: 448, y: 330 }, target: { x: 358, y: 284 } },
];

const StageVisualDemo: React.FC<{ stage: number }> = ({ stage }) => (
  <div className="bg-[#FAFBF6] border border-[#B5D2AF] rounded-lg p-2.5">
    <p className="font-mono text-[10px] uppercase tracking-wider text-[#0F764A] font-semibold mb-1.5">
      Action Demo
    </p>
    <svg viewBox="0 0 220 74" className="w-full h-auto" role="img" aria-label={`Visual demonstration for step ${stage + 1}`}>
      <rect x="0" y="0" width="220" height="74" rx="6" fill="#F2F7EE" />
      {stage === 0 && (
        <g>
          <path d="M 22 38 C 65 20, 155 20, 198 38 C 155 56, 65 56, 22 38 Z" fill="#82BC5E" stroke="#143D28" strokeWidth="1.2" />
          <line x1="18" y1="38" x2="196" y2="38" stroke="#7A5A3A" strokeWidth="2.4" />
          <rect x="86" y="18" width="38" height="22" rx="6" fill="#DCF0F2" stroke="#1E6C7A" strokeWidth="1.2" />
          <path d="M 70 14 L 146 14" stroke="#1E6C7A" strokeWidth="1.8" strokeDasharray="3 2" />
          <polygon points="146,10 154,14 146,18" fill="#1E6C7A" />
          <text x="110" y="66" textAnchor="middle" fontSize="9.5" fill="#143D28" fontWeight="600">
            Wipe water across leaf
          </text>
        </g>
      )}
      {stage === 1 && (
        <g>
          <path d="M 22 30 C 65 14, 145 14, 188 30 L 22 30 Z" fill="#3B8E47" stroke="#143D28" strokeWidth="1.1" />
          <path d="M 22 46 C 65 62, 145 62, 188 46 L 22 46 Z" fill="#AED67A" stroke="#0F764A" strokeWidth="1.1" />
          <line x1="18" y1="38" x2="194" y2="38" stroke="#7A5A3A" strokeWidth="2.8" />
          <circle cx="110" cy="38" r="10" fill="#143D28" />
          <text x="110" y="41" textAnchor="middle" fontSize="8" fill="#FAFBF6" fontWeight="700">✂</text>
          <text x="110" y="67" textAnchor="middle" fontSize="9.5" fill="#143D28" fontWeight="600">
            Cut middle stick out → 2 strips
          </text>
        </g>
      )}
      {stage === 2 && (
        <g>
          <line x1="25" y1="54" x2="195" y2="54" stroke="#3B8E47" strokeWidth="6" strokeLinecap="round" />
          <path d="M 88 54 C 72 14, 114 14, 102 54" fill="none" stroke="#143D28" strokeWidth="6" strokeLinecap="round" />
          <path d="M 88 54 C 72 14, 114 14, 102 54" fill="none" stroke="#98D292" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M 162 46 Q 134 12, 106 24" fill="none" stroke="#DD7930" strokeWidth="1.8" strokeDasharray="3 2" />
          <polygon points="109,20 100,26 110,28" fill="#DD7930" />
          <text x="110" y="68" textAnchor="middle" fontSize="9.5" fill="#143D28" fontWeight="600">
            Bend tip up to make Loop 1
          </text>
        </g>
      )}
      {stage === 3 && (
        <g>
          {[56, 86, 116].map((cx, i) => (
            <g key={cx}>
              <rect x={cx - 8} y="14" width="16" height="40" rx="8" fill="#3B8E47" stroke="#143D28" strokeWidth="1.2" />
              {i < 2 && <path d={`M ${cx + 6} 50 Q ${cx + 15} 58, ${cx + 24} 50`} fill="none" stroke="#143D28" strokeWidth="2.5" />}
            </g>
          ))}
          <rect x="40" y="29" width="138" height="10" rx="3" fill="#B3D564" stroke="#0F764A" strokeWidth="1.2" opacity="0.92" />
          <path d="M 155 16 Q 178 16, 178 34" fill="none" stroke="#DD7930" strokeWidth="1.8" />
          <polygon points="174,32 178,40 182,32" fill="#DD7930" />
          <text x="110" y="67" textAnchor="middle" fontSize="9.5" fill="#143D28" fontWeight="600">
            3 connected loops + Strip B across
          </text>
        </g>
      )}
      {stage === 4 && (
        <g transform="translate(65, 8)">
          {[14, 34, 54].map((x) => (
            <rect key={x} x={x} y="4" width="12" height="44" fill="#3B8E47" stroke="#143D28" strokeWidth="1" />
          ))}
          {[10, 24, 38].map((y, r) => (
            <React.Fragment key={y}>
              <rect x="6" y={y} width="72" height="10" fill="#B3D564" stroke="#143D28" strokeWidth="1" />
              {[14, 34, 54].map((x, c) =>
                (r + c) % 2 === 1 ? (
                  <rect key={`${r}-${c}`} x={x} y={y} width="12" height="10" fill="#3B8E47" stroke="#143D28" strokeWidth="1" />
                ) : null
              )}
            </React.Fragment>
          ))}
          <text x="45" y="61" textAnchor="middle" fontSize="9.5" fill="#143D28" fontWeight="600">
            Switch Over &amp; Under
          </text>
        </g>
      )}
      {stage === 5 && (
        <g transform="translate(110, 34)">
          <rect x="-18" y="-18" width="36" height="36" rx="4" transform="rotate(45)" fill="#82BC5E" stroke="#143D28" strokeWidth="1.4" />
          <path d="M -38 -16 Q -26 -16, -16 -8" fill="none" stroke="#DD7930" strokeWidth="2.4" />
          <polygon points="-18,-12 -11,-6 -20,-5" fill="#DD7930" />
          <path d="M 38 -16 Q 26 -16, 16 -8" fill="none" stroke="#DD7930" strokeWidth="2.4" />
          <polygon points="18,-12 11,-6 20,-5" fill="#DD7930" />
          <text x="0" y="34" textAnchor="middle" fontSize="9.5" fill="#143D28" fontWeight="600">
            Tuck 4 loose ends inward
          </text>
        </g>
      )}
      {stage === 6 && (
        <g transform="translate(110, 32)">
          <rect x="-16" y="-16" width="32" height="32" rx="4" transform="rotate(45)" fill="#3B8E47" stroke="#143D28" strokeWidth="1.4" />
          <line x1="-4" y1="22" x2="-10" y2="34" stroke="#B3D564" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="4" y1="22" x2="10" y2="34" stroke="#143D28" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 28 14 L 28 32" stroke="#DD7930" strokeWidth="2" />
          <polygon points="24,28 28,35 32,28" fill="#DD7930" />
          <text x="58" y="25" fontSize="9.5" fill="#143D28" fontWeight="600">
            Pull tight
          </text>
        </g>
      )}
    </svg>
  </div>
);

export const KetupatCraftStudio: React.FC = () => {
  const [state, setState] = useState<StudioSnapshot>(INITIAL_STATE);
  const [history, setHistory] = useState<StudioSnapshot[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [selectedTool, setSelectedTool] = useState<'none' | 'scissors' | 'water'>('none');
  const [paletteDrag, setPaletteDrag] = useState<PaletteItemId | null>(null);
  const [paletteDragPos, setPaletteDragPos] = useState<Point>({ x: 0, y: 0 });
  const [isOverMat, setIsOverMat] = useState(false);
  const [nudgeMatHighlight, setNudgeMatHighlight] = useState(false);
  const [canvasDrag, setCanvasDrag] = useState<ActiveCanvasDrag>(null);
  const [wipeClothActive, setWipeClothActive] = useState(false);
  const [wipeClothX, setWipeClothX] = useState(140);
  const [scissorsActiveOnLeaf, setScissorsActiveOnLeaf] = useState(false);
  const [weaveSweeping, setWeaveSweeping] = useState(false);
  const [lastSweptKey, setLastSweptKey] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string>(
    'Hold and drag the Young Coconut Leaf from Materials onto the Craft Mat!'
  );

  const workspaceRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const stateRef = useRef<StudioSnapshot>(state);
  stateRef.current = state;
  const paletteDragStartRef = useRef<Point>({ x: 0, y: 0 });
  const wipeLastXRef = useRef<number>(140);

  const pushState = useCallback(
    (updater: (prev: StudioSnapshot) => StudioSnapshot, msg?: string) => {
      setState((prev) => {
        setHistory((h) => [...h.slice(-24), prev]);
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

  const stageInfo = STAGE_GUIDES[state.stage];

  const lockedCrossingsCount = state.crossings.reduce((acc, row, r) => {
    return (
      acc +
      row.reduce((rowAcc, val, c) => rowAcc + (val === TARGET_PATTERN[r][c] ? 1 : 0), 0)
    );
  }, 0);

  const isStageComplete = (s: StudioSnapshot, idx: number): boolean => {
    switch (idx) {
      case 0:
        return s.leafOnMat && s.leafHydrated;
      case 1:
        return s.leafCutDone && s.lidiRemoved;
      case 2:
        return s.foldsA >= 1;
      case 3:
        return s.foldsA >= 3 && s.stripBPlaced && s.stripBAngle >= 85;
      case 4:
        return s.crossings.every((row, r) =>
          row.every((val, c) => val === TARGET_PATTERN[r][c])
        );
      case 5:
        return s.tuckedCorners.every(Boolean);
      case 6:
        return s.tightness >= 100;
      default:
        return false;
    }
  };

  const currentComplete = isStageComplete(state, state.stage);

  const overallProgress = Math.round(
    ([0, 1, 2, 3, 4, 5, 6].filter((i) => isStageComplete(state, i)).length / 7) * 100
  );

  const applyPaletteDrop = useCallback(
    (itemId: PaletteItemId) => {
      const s = stateRef.current;

      if (itemId === 'whole-leaf') {
        if (!s.leafOnMat) {
          pushState(
            (p) => ({ ...p, stage: 0, leafOnMat: true }),
            'Nice! Now drag the Bowl of Water onto the leaf and wipe it left and right!'
          );
        } else {
          setFeedbackMsg('The leaf is already on the mat! Wipe it with water.');
        }
        return;
      }

      if (itemId === 'water-bowl') {
        if (!s.leafOnMat) {
          setFeedbackMsg('Drag the Young Coconut Leaf onto the mat first!');
          return;
        }
        setSelectedTool('water');
        if (!s.leafHydrated) {
          setWipeClothActive(true);
          setFeedbackMsg('Slide the wet cloth left and right over the leaf until it reaches 100%!');
        } else {
          setFeedbackMsg('The leaf is already soft! Click Next Step to cut the strips.');
        }
        return;
      }

      if (itemId === 'scissors') {
        if (!s.leafOnMat || !s.leafHydrated) {
          setFeedbackMsg('Prepare and soften the leaf in Step 1 first!');
          return;
        }
        setSelectedTool('scissors');
        if (s.stage < 1) {
          pushState((p) => ({ ...p, stage: 1 }));
        }
        if (!s.leafCutDone) {
          setScissorsActiveOnLeaf(true);
          setFeedbackMsg('Hold and slide the Scissors right along the middle stick!');
        }
        return;
      }

      if (itemId === 'strip-b') {
        if (s.foldsA < 3) {
          setFeedbackMsg('Fold Loop 1, Loop 2, and Loop 3 first before adding Strip B!');
          return;
        }
        if (!s.stripBPlaced) {
          pushState(
            (p) => ({ ...p, stage: 3, stripBPlaced: true }),
            'Great! Now drag the "Turn" handle right so Strip B crosses sideways over Strip A!'
          );
        } else {
          setFeedbackMsg('Strip B is already on the mat! Drag the "Turn" handle sideways.');
        }
      }
    },
    [pushState]
  );

  // Palette drag-and-drop listeners (mouse + touch)
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
      const movedDist = Math.hypot(
        e.clientX - paletteDragStartRef.current.x,
        e.clientY - paletteDragStartRef.current.y
      );

      if (movedDist < 12) {
        // User tapped/clicked without dragging: guide them to drag onto the mat!
        setNudgeMatHighlight(true);
        setTimeout(() => setNudgeMatHighlight(false), 750);
        setFeedbackMsg(
          `Hold and drag "${PALETTE_LABELS[paletteDrag]}" across onto the Craft Mat!`
        );
      } else if (workspaceRef.current) {
        const rect = workspaceRef.current.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        if (inside) {
          applyPaletteDrop(paletteDrag);
        } else {
          setFeedbackMsg('Try again! Drop the item inside the Craft Mat.');
        }
      }

      setPaletteDrag(null);
      setIsOverMat(false);
    };

    const handleCancel = () => {
      setPaletteDrag(null);
      setIsOverMat(false);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleCancel);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleCancel);
    };
  }, [paletteDrag, applyPaletteDrop]);

  // In-canvas physical crafting drags
  useEffect(() => {
    if (!canvasDrag) return;

    const handleMove = (e: PointerEvent) => {
      const pt = toSvgPoint(e.clientX, e.clientY);

      if (canvasDrag.type === 'wipe-leaf') {
        const clampedX = Math.max(96, Math.min(464, pt.x));
        const delta = Math.abs(clampedX - wipeLastXRef.current);
        wipeLastXRef.current = clampedX;
        setWipeClothX(clampedX);

        if (delta > 1) {
          setState((prev) => {
            const nextHydration = Math.min(100, prev.hydration + delta * 0.24);
            if (nextHydration >= 100 && !prev.leafHydrated) {
              setHistory((h) => [...h.slice(-24), prev]);
              setFeedbackMsg(
                'Well done! The leaf is soft and flexible (100%). Click Next Step to cut the strips!'
              );
              return { ...prev, hydration: 100, leafHydrated: true };
            }
            return { ...prev, hydration: nextHydration };
          });
        }
      } else if (canvasDrag.type === 'scissors-cut') {
        const pct = Math.max(0, Math.min(100, ((pt.x - 86) / (474 - 86)) * 100));
        setState((prev) => {
          if (pct >= 94 && !prev.leafCutDone) {
            setHistory((h) => [...h.slice(-24), prev]);
            setFeedbackMsg(
              'Great cut! Now drag the brown middle stick (lidi) into the "Save Lidi" tray on the right!'
            );
            return { ...prev, cutProgress: 100, leafCutDone: true };
          }
          return { ...prev, cutProgress: Math.max(prev.cutProgress, pct) };
        });
      } else if (canvasDrag.type === 'move-lidi') {
        setCanvasDrag({ type: 'move-lidi', pointer: pt });
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
        const delta = Math.max(0, (pt.y - canvasDrag.startY) * 1.15);
        const nextTight = Math.min(100, Math.max(0, Math.round(canvasDrag.startTightness + delta)));
        setState((prev) => ({ ...prev, tightness: nextTight }));
        if (nextTight >= 100) {
          setFeedbackMsg('Well done! You made a traditional Indonesian Ketupat!');
        }
      }
    };

    const handleUp = (e: PointerEvent) => {
      const pt = toSvgPoint(e.clientX, e.clientY);

      if (canvasDrag.type === 'move-lidi') {
        // Save Lidi tray is at x: 430..535, y: 150..290
        if (pt.x >= 410 && pt.y >= 120 && pt.y <= 320) {
          pushState(
            (p) => ({ ...p, lidiRemoved: true }),
            'Well done! You saved the lidi stick and now have Strip A and Strip B ready. Click Next Step!'
          );
        } else {
          setFeedbackMsg('Try again! Drag the brown lidi stick into the "Save Lidi" tray on the right.');
        }
      } else if (canvasDrag.type === 'fold-strip-a') {
        const currentFoldIndex = stateRef.current.foldsA;
        const maxFoldForStage = stateRef.current.stage === 2 ? 1 : 3;
        if (currentFoldIndex < maxFoldForStage) {
          const targetX = LOOP_SLOTS_X[currentFoldIndex];
          const distToCircle = Math.hypot(pt.x - targetX, pt.y - LOOP_TARGET_Y);
          const insideLoopSlot =
            Math.abs(pt.x - targetX) <= 46 && pt.y >= 55 && pt.y <= 375;

          if (distToCircle <= 68 || insideLoopSlot) {
            const nextCount = currentFoldIndex + 1;
            let msg = `Well done! Loop ${nextCount} is formed.`;
            if (nextCount === 1) {
              msg = 'Well done! You formed Loop 1! Click Next Step to create Loop 2 and Loop 3.';
            } else if (nextCount === 2) {
              msg = 'Well done! Loop 2 connects to Loop 1 (2/3). Now fold Loop 3!';
            } else if (nextCount === 3) {
              msg = 'Well done! All 3 connected loops (3/3) are ready! Now drag Strip B onto the mat!';
            }
            pushState((p) => ({ ...p, foldsA: Math.min(3, nextCount) }), msg);
          } else {
            setFeedbackMsg(
              `Try again! Drop the leaf tip inside the dashed "Fold Loop ${currentFoldIndex + 1}" circle.`
            );
          }
        }
      } else if (canvasDrag.type === 'rotate-strip-b') {
        if (stateRef.current.stripBAngle >= 65) {
          pushState(
            (p) => ({ ...p, stripBAngle: 90 }),
            'Well done! Strip B crosses sideways over Strip A. Click Next Step to start weaving!'
          );
        } else {
          setFeedbackMsg('Try again! Drag the "Turn" handle further right until it locks at 90°.');
        }
      } else if (canvasDrag.type === 'tuck-tail') {
        const idx = canvasDrag.tailIdx;
        const corner = CORNER_TUCK_POINTS[idx];
        const dist = Math.hypot(pt.x - corner.target.x, pt.y - corner.target.y);
        if (dist < 76) {
          const nextCount = stateRef.current.tuckedCorners.filter(Boolean).length + 1;
          pushState(
            (p) => {
              const nextTucked = [...p.tuckedCorners];
              nextTucked[idx] = true;
              return { ...p, tuckedCorners: nextTucked };
            },
            nextCount === 4
              ? 'Well done! All 4 ends are tucked! Click Next Step to pull your ketupat tight.'
              : `Well done! End ${idx + 1} tucked (${nextCount}/4).`
          );
        } else {
          setFeedbackMsg(`Try again! Drag End ${idx + 1} into its dashed corner pocket.`);
        }
      }

      setCanvasDrag(null);
    };

    const handleCancel = () => {
      setCanvasDrag(null);
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleCancel);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleCancel);
    };
  }, [canvasDrag, pushState, toSvgPoint]);

  useEffect(() => {
    if (!weaveSweeping) return;
    const stopSweep = () => {
      setWeaveSweeping(false);
      setLastSweptKey(null);
    };
    window.addEventListener('pointerup', stopSweep);
    window.addEventListener('pointercancel', stopSweep);
    return () => {
      window.removeEventListener('pointerup', stopSweep);
      window.removeEventListener('pointercancel', stopSweep);
    };
  }, [weaveSweeping]);

  const startPaletteDrag = (itemId: PaletteItemId, e: React.PointerEvent) => {
    e.preventDefault();
    paletteDragStartRef.current = { x: e.clientX, y: e.clientY };
    setPaletteDrag(itemId);
    setPaletteDragPos({ x: e.clientX, y: e.clientY });
  };

  const handleToggleCrossing = (r: number, c: number) => {
    if (state.stage !== 4) return;
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
          ? 'Well done! All 9 crossings alternate Over and Under. Click Next Step to shape your ketupat!'
          : 'Switched! Keep alternating OVER and UNDER on each row.'
      );
      return { ...prev, crossings: nextGrid };
    });
  };

  const handleRotateButton = () => {
    if (state.stage !== 3 || !state.stripBPlaced) {
      setFeedbackMsg('Fold 3 loops and drag Strip B onto the mat in Step 4 first!');
      return;
    }
    pushState(
      (p) => ({ ...p, stripBAngle: p.stripBAngle >= 85 ? 0 : 90 }),
      state.stripBAngle >= 85
        ? 'Turned Strip B upright.'
        : 'Well done! Strip B crosses sideways over Strip A. Click Next Step!'
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
    setWipeClothActive(false);
    setWipeClothX(140);
    setScissorsActiveOnLeaf(false);
    setFeedbackMsg('Table cleared! Drag the Young Coconut Leaf onto the Craft Mat to begin.');
  };

  const goToStage = (targetIdx: number) => {
    if (targetIdx === state.stage) return;
    pushState((p) => {
      const next = { ...p, stage: targetIdx };
      if (targetIdx >= 1) {
        next.leafOnMat = true;
        next.hydration = 100;
        next.leafHydrated = true;
      }
      if (targetIdx >= 2) {
        next.cutProgress = 100;
        next.leafCutDone = true;
        next.lidiRemoved = true;
      }
      if (targetIdx >= 3) {
        next.foldsA = Math.max(next.foldsA, 1);
      }
      if (targetIdx >= 4) {
        next.foldsA = 3;
        next.stripBPlaced = true;
        next.stripBAngle = 90;
      }
      if (targetIdx >= 5) {
        next.crossings = TARGET_PATTERN.map((r) => [...r]);
      }
      if (targetIdx >= 6) {
        next.tuckedCorners = [true, true, true, true];
      }
      return next;
    }, STAGE_GUIDES[targetIdx].goalText);
  };

  const scissorsX = 86 + (state.cutProgress / 100) * (474 - 86);
  const splitGap = state.lidiRemoved ? 42 : state.leafCutDone ? 28 : (state.cutProgress / 100) * 14;

  // Color transition for Stage 0 leaf preparation (dry tan-green -> hydrated fresh green)
  const hydrationRatio = state.hydration / 100;
  const leafTopColor =
    hydrationRatio < 0.35 ? '#AEB86C' : hydrationRatio < 0.75 ? '#7BB65E' : '#469650';
  const leafBottomColor =
    hydrationRatio < 0.35 ? '#C8CA82' : hydrationRatio < 0.75 ? '#B3CE6F' : '#A9D37B';

  // Active fold loop target check (used for Stage 2 Loop 1 & Stage 3 Loops 2–3)
  const activeFoldTargetX = state.foldsA < 3 ? LOOP_SLOTS_X[state.foldsA] : 339;
  const foldDragInsideZone =
    canvasDrag?.type === 'fold-strip-a' &&
    (Math.hypot(canvasDrag.pointer.x - activeFoldTargetX, canvasDrag.pointer.y - LOOP_TARGET_Y) <= 68 ||
      (Math.abs(canvasDrag.pointer.x - activeFoldTargetX) <= 46 &&
        canvasDrag.pointer.y >= 55 &&
        canvasDrag.pointer.y <= 375));

  // Row completion check for Stage 4 (Weave the Strips)
  const rowChecks = [0, 1, 2].map((r) =>
    state.crossings[r].every((val, c) => val === TARGET_PATTERN[r][c])
  );

  return (
    <div className="space-y-5">
      {/* Top 7-Stage Progress Indicator */}
      <div className="bg-gradient-to-r from-[#E8F5E9] via-[#FAFBF6] to-[#FDF5DB]/65 border border-[#B5D2AF] rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <KetupatDiamondIcon className="w-5 h-5 shrink-0" />
            <span className="font-semibold text-[#143D28]">
              Ketupat Progress: Step {state.stage + 1} of {STAGE_GUIDES.length}
            </span>
          </div>
          <span className="font-mono tabular-nums text-[#0F764A] bg-[#FAFBF6] border border-[#B5D2AF] px-2.5 py-0.5 rounded-md font-semibold">
            {overallProgress}% Complete
          </span>
        </div>

        <div className="w-full h-2.5 bg-[#CFE4CA] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0F764A] via-[#3B8E47] to-[#E2B334] transition-all duration-300"
            style={{ width: `${Math.max(6, overallProgress)}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
          {STAGE_GUIDES.map((st, idx) => {
            const active = state.stage === idx;
            const done = isStageComplete(state, idx);
            return (
              <button
                key={st.shortLabel}
                type="button"
                onClick={() => goToStage(idx)}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium text-left transition-colors flex items-center justify-between gap-1 cursor-pointer ${
                  active
                    ? 'bg-[#143D28] text-white'
                    : done
                    ? 'bg-[#CFE4CA] text-[#143D28] border border-[#0F764A]/45'
                    : 'bg-[#FAFBF6] text-[#3F5749] border border-[#B5D2AF] hover:bg-[#E8F5E9]'
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
            <div className="pb-2 border-b border-[#B5D2AF] flex items-center gap-2">
              <JanurLeafIcon className="w-4 h-4 shrink-0" />
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#132219] leading-none">
                  Materials
                </h2>
                <p className="text-[11px] text-[#3F5749] mt-1">
                  Hold and drag onto the Craft Mat.
                </p>
              </div>
            </div>

            {/* Whole Coconut Leaf */}
            <div
              onPointerDown={(e) => startPaletteDrag('whole-leaf', e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyPaletteDrop('whole-leaf');
              }}
              className={`p-2.5 rounded-xl border bg-[#FAFBF6] transition-all cursor-grab active:cursor-grabbing select-none touch-none ${
                showHint && state.stage === 0 && !state.leafOnMat
                  ? 'border-[#DD7930] ring-2 ring-[#E2B334]/70'
                  : 'border-[#B5D2AF] hover:border-[#0F764A]'
              }`}
            >
              <svg viewBox="0 0 180 38" className="w-full h-9">
                <path d="M 10 19 C 45 4, 130 5, 170 19 C 130 33, 45 34, 10 19 Z" fill="#AEB86C" stroke="#143D28" strokeWidth="1.2" />
                <line x1="6" y1="19" x2="168" y2="19" stroke="#7A5A3A" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <p className="text-xs font-semibold text-[#132219] mt-1">
                Young Coconut Leaf
              </p>
              <p className="text-[11px] text-[#3F5749]">
                {state.leafOnMat ? 'Already on mat ✓' : 'Drag to mat in Step 1'}
              </p>
            </div>

            {/* Bowl of Water */}
            <div
              onPointerDown={(e) => startPaletteDrag('water-bowl', e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyPaletteDrop('water-bowl');
              }}
              className={`p-2.5 rounded-xl border bg-[#FAFBF6] transition-all cursor-grab active:cursor-grabbing select-none touch-none flex items-center gap-2.5 ${
                showHint && state.stage === 0 && state.leafOnMat && !state.leafHydrated
                  ? 'border-[#DD7930] ring-2 ring-[#E2B334]/70'
                  : 'border-[#B5D2AF] hover:border-[#0F764A]'
              }`}
            >
              <div className="w-10 h-9 rounded-lg bg-[#DCF0F2] border border-[#9CD0D6] flex items-center justify-center shrink-0">
                <Droplets className="w-5 h-5 text-[#1E6C7A]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#132219]">Bowl of Water</p>
                <p className="text-[11px] text-[#3F5749]">
                  {state.leafHydrated ? 'Leaf is soft ✓' : 'Drag to leaf to soften'}
                </p>
              </div>
            </div>

            {/* Leaf Strip B (Light Green) */}
            <div
              onPointerDown={(e) => startPaletteDrag('strip-b', e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyPaletteDrop('strip-b');
              }}
              className={`p-2.5 rounded-xl border bg-[#FAFBF6] transition-all cursor-grab active:cursor-grabbing select-none touch-none ${
                state.foldsA < 3 ? 'opacity-55' : ''
              } ${
                showHint && state.stage === 3 && state.foldsA === 3 && !state.stripBPlaced
                  ? 'border-[#DD7930] ring-2 ring-[#E2B334]/70'
                  : 'border-[#B5D2AF] hover:border-[#0F764A]'
              }`}
            >
              <svg viewBox="0 0 180 24" className="w-full h-6">
                <path d="M 8 7 L 146 6 L 172 12 L 146 18 L 8 17 Z" fill="#B3D564" stroke="#0F764A" strokeWidth="1.2" />
                <line x1="12" y1="12" x2="162" y2="12" stroke="#E8F6CC" strokeWidth="1" strokeDasharray="5 3" />
              </svg>
              <p className="text-xs font-semibold text-[#132219] mt-1">
                Leaf Strip B (Yellow-Green)
              </p>
              <p className="text-[11px] text-[#3F5749]">
                {state.stripBPlaced
                  ? 'Placed on mat ✓'
                  : state.foldsA >= 3
                  ? 'Drag onto mat now!'
                  : 'Fold 3 loops first'}
              </p>
            </div>
          </div>

          {/* Tools Panel */}
          <div className="bg-[#FDF5DB]/80 border border-[#E8D28C] rounded-xl p-4 space-y-2.5">
            <div className="pb-2 border-b border-[#E8D28C]">
              <h2 className="font-serif text-xl font-semibold text-[#132219]">
                Tools
              </h2>
              <p className="text-[11px] text-[#3F5749] mt-0.5">
                Drag a tool onto the leaf on the mat.
              </p>
            </div>

            {/* Scissors */}
            <div
              onPointerDown={(e) => startPaletteDrag('scissors', e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') applyPaletteDrop('scissors');
              }}
              className={`p-2.5 rounded-xl border bg-[#FAFBF6] transition-all cursor-grab active:cursor-grabbing select-none touch-none flex items-center gap-2.5 ${
                showHint && state.stage === 1 && !state.leafCutDone
                  ? 'border-[#DD7930] ring-2 ring-[#E2B334]/70'
                  : selectedTool === 'scissors'
                  ? 'border-[#143D28] bg-[#E8F5E9]'
                  : 'border-[#B5D2AF] hover:border-[#0F764A]'
              }`}
            >
              <div className="w-10 h-9 rounded-lg bg-[#FAEDE8] border border-[#E4B7AA] flex items-center justify-center shrink-0">
                <Scissors className="w-5 h-5 text-[#B65236]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#132219]">Scissors</p>
                <p className="text-[11px] text-[#3F5749]">
                  {state.leafCutDone ? 'Leaf cut ✓' : 'Drag to cut middle stick'}
                </p>
              </div>
            </div>

            {/* Turn Sideways Tool */}
            <button
              type="button"
              onClick={handleRotateButton}
              disabled={state.stage !== 3 || !state.stripBPlaced}
              className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                state.stage === 3 && state.stripBPlaced
                  ? 'bg-[#FAFBF6] border-[#0F764A] hover:bg-[#CFE4CA]'
                  : 'bg-[#FAFBF6] border-[#B5D2AF]'
              }`}
            >
              <div className="w-10 h-9 rounded-lg bg-[#FDF0E4] border border-[#EBC3A0] flex items-center justify-center shrink-0">
                <RotateCw className="w-5 h-5 text-[#DD7930]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#132219]">Turn Sideways</p>
                <p className="text-[11px] text-[#3F5749]">Turns Strip B across Strip A</p>
              </div>
            </button>
          </div>
        </aside>

        {/* CENTER PANEL: Real 2D Craft Mat */}
        <section className="lg:col-span-6 space-y-3">
          <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#143D28]">
              Craft Mat · {stageInfo.title}
            </span>
            <div className="flex items-center gap-2 text-xs font-mono tabular-nums">
              {state.stage === 0 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Soft: {Math.round(state.hydration)}%
                </span>
              )}
              {state.stage === 1 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Cut: {Math.round(state.cutProgress)}% · Stick: {state.lidiRemoved ? 'Saved ✓' : 'On leaf'}
                </span>
              )}
              {state.stage === 2 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  First Fold: {state.foldsA >= 1 ? '1 / 1 ✓' : '0 / 1'}
                </span>
              )}
              {state.stage === 3 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Loops: {state.foldsA} / 3 · Strip B: {state.stripBAngle}°
                </span>
              )}
              {state.stage === 4 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Weave Locked: {lockedCrossingsCount} / 9
                </span>
              )}
              {state.stage === 5 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Ends Tucked: {state.tuckedCorners.filter(Boolean).length} / 4
                </span>
              )}
              {state.stage === 6 && (
                <span className="px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#143D28]">
                  Tightness: {state.tightness}%
                </span>
              )}
            </div>
          </div>

          <div
            ref={workspaceRef}
            className={`relative rounded-xl border-2 transition-colors overflow-hidden min-h-[420px] sm:min-h-[470px] flex flex-col items-center justify-center p-3 sm:p-4 select-none touch-none ${
              isOverMat || nudgeMatHighlight
                ? 'border-[#0F764A] bg-[#CFE4CA]'
                : 'border-[#B5D2AF] bg-[#E5F0E3]'
            }`}
          >
            <svg
              ref={svgRef}
              viewBox="0 0 560 440"
              className="w-full max-w-[560px] h-auto touch-none"
              role="img"
              aria-label="Interactive janur ketupat craft mat"
            >
              <defs>
                <pattern id="bambooMat" width="24" height="24" patternUnits="userSpaceOnUse">
                  <rect width="24" height="24" fill="#F4F6EE" />
                  <rect x="0" y="0" width="11" height="11" fill="#E8EEDF" rx="1.5" />
                  <rect x="12" y="12" width="11" height="11" fill="#E8EEDF" rx="1.5" />
                </pattern>
                <linearGradient id="leafDark" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2A6D37" />
                  <stop offset="50%" stopColor="#469650" />
                  <stop offset="100%" stopColor="#2A6D37" />
                </linearGradient>
                <linearGradient id="leafFresh" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#89C059" />
                  <stop offset="50%" stopColor="#BCE074" />
                  <stop offset="100%" stopColor="#89C059" />
                </linearGradient>
                <filter id="dropLeaf" x="-15%" y="-15%" width="130%" height="130%">
                  <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" floodColor="#132219" floodOpacity="0.22" />
                </filter>
              </defs>

              {/* Woven bamboo craft mat */}
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

              {/* ================= STAGE 0: PREPARE THE JANUR ================= */}
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
                        fillOpacity="0.75"
                        stroke="#0F764A"
                        strokeWidth="2.2"
                        strokeDasharray="8 6"
                      />
                      <text x="280" y="212" textAnchor="middle" fill="#143D28" fontSize="16" fontWeight="700">
                        Drop Young Coconut Leaf Here
                      </text>
                      <text x="280" y="236" textAnchor="middle" fill="#3F5749" fontSize="12">
                        Drag from the Materials panel on the left
                      </text>
                    </g>
                  ) : (
                    <g>
                      {/* Whole coconut leaf visibly shifting from dry pale tan to fresh soft green */}
                      <g filter="url(#dropLeaf)">
                        <path
                          d="M 65 220 C 165 142, 375 145, 495 220 L 65 220 Z"
                          fill={leafTopColor}
                          stroke="#143D28"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M 65 220 C 165 298, 375 295, 495 220 L 65 220 Z"
                          fill={leafBottomColor}
                          stroke="#0F764A"
                          strokeWidth="1.8"
                        />
                        <path d="M 110 198 C 215 168, 355 170, 460 208" fill="none" stroke="#DFF1BC" strokeWidth="1.2" strokeDasharray="6 4" />
                        <path d="M 110 242 C 215 272, 355 270, 460 232" fill="none" stroke="#DFF1BC" strokeWidth="1.2" strokeDasharray="6 4" />
                        <line x1="54" y1="220" x2="494" y2="220" stroke="#7A5A3A" strokeWidth="5.5" strokeLinecap="round" />
                      </g>

                      {!wipeClothActive && !state.leafHydrated && (
                        <g
                          onClick={() => {
                            setSelectedTool('water');
                            setWipeClothActive(true);
                            setFeedbackMsg('Slide the wet cloth left and right over the leaf!');
                          }}
                          className="cursor-pointer"
                        >
                          <rect
                            x="145"
                            y="92"
                            width="270"
                            height="40"
                            rx="20"
                            fill="#DCF0F2"
                            stroke="#1E6C7A"
                            strokeWidth="2"
                          />
                          <text x="280" y="116" textAnchor="middle" fill="#132219" fontSize="12" fontWeight="700">
                            Drag Bowl of Water Here to Wipe Leaf
                          </text>
                        </g>
                      )}

                      {wipeClothActive && !state.leafHydrated && (
                        <g>
                          <line x1="100" y1="150" x2="460" y2="150" stroke="#1E6C7A" strokeWidth="2" strokeDasharray="5 4" />
                          <g
                            transform={`translate(${wipeClothX}, 178)`}
                            onPointerDown={(e) => {
                              e.stopPropagation();
                              wipeLastXRef.current = wipeClothX;
                              setCanvasDrag({ type: 'wipe-leaf' });
                            }}
                            className="cursor-ew-resize"
                          >
                            <rect
                              x="-34"
                              y="-24"
                              width="68"
                              height="48"
                              rx="12"
                              fill="#DCF0F2"
                              stroke="#1E6C7A"
                              strokeWidth="2.4"
                              filter="url(#dropLeaf)"
                            />
                            <text x="0" y="-2" textAnchor="middle" fill="#132219" fontSize="10.5" fontWeight="700">
                              Wet Cloth
                            </text>
                            <text x="0" y="13" textAnchor="middle" fill="#1E6C7A" fontSize="9.5" fontWeight="600">
                              ← Wipe →
                            </text>
                          </g>
                        </g>
                      )}

                      {state.leafHydrated && (
                        <g>
                          <rect x="148" y="318" width="264" height="36" rx="10" fill="#CFE4CA" stroke="#0F764A" strokeWidth="1.5" />
                          <text x="280" y="340" textAnchor="middle" fill="#143D28" fontSize="12" fontWeight="700">
                            Leaf is soft and ready! Click Next Step →
                          </text>
                        </g>
                      )}
                    </g>
                  )}
                </g>
              )}

              {/* ================= STAGE 1: SELECT AND CUT THE STRIPS ================= */}
              {state.stage === 1 && (
                <g>
                  {/* Save Lidi tray on the right */}
                  <rect
                    x="432"
                    y="128"
                    width="102"
                    height="184"
                    rx="12"
                    fill={state.lidiRemoved ? '#FAEDE8' : '#FDF5DB'}
                    stroke={state.lidiRemoved ? '#B65236' : '#E2B334'}
                    strokeWidth="2"
                    strokeDasharray={state.lidiRemoved ? 'none' : '6 4'}
                  />
                  <text x="483" y="152" textAnchor="middle" fill="#132219" fontSize="11.5" fontWeight="700">
                    Save Lidi
                  </text>
                  <text x="483" y="167" textAnchor="middle" fill="#3F5749" fontSize="9.5">
                    {state.lidiRemoved ? 'Stick saved ✓' : 'Drop stick here'}
                  </text>

                  {/* Top Strip A */}
                  <g
                    transform={`translate(${state.lidiRemoved ? -18 : 0}, ${-splitGap})`}
                    filter="url(#dropLeaf)"
                  >
                    <path
                      d="M 65 220 C 155 144, 345 146, 420 220 L 65 220 Z"
                      fill="#469650"
                      stroke="#143D28"
                      strokeWidth="1.8"
                    />
                    <path d="M 105 198 C 195 170, 320 172, 396 208" fill="none" stroke="#BCE4B1" strokeWidth="1.2" strokeDasharray="6 4" />
                    {state.leafCutDone && (
                      <text x="242" y="196" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="700">
                        Strip A (Dark Green)
                      </text>
                    )}
                  </g>

                  {/* Bottom Strip B */}
                  <g
                    transform={`translate(${state.lidiRemoved ? -18 : 0}, ${splitGap})`}
                    filter="url(#dropLeaf)"
                  >
                    <path
                      d="M 65 220 C 155 296, 345 294, 420 220 L 65 220 Z"
                      fill="#B3D564"
                      stroke="#0F764A"
                      strokeWidth="1.8"
                    />
                    <path d="M 105 242 C 195 270, 320 268, 396 232" fill="none" stroke="#EFF9D8" strokeWidth="1.2" strokeDasharray="6 4" />
                    {state.leafCutDone && (
                      <text x="242" y="256" textAnchor="middle" fill="#132219" fontSize="12" fontWeight="700">
                        Strip B (Yellow-Green)
                      </text>
                    )}
                  </g>

                  {/* Center Lidi stick (draggable into Save Lidi tray once cut!) */}
                  {!state.lidiRemoved ? (
                    (() => {
                      const isDraggingLidi = canvasDrag?.type === 'move-lidi';
                      const dx = isDraggingLidi ? canvasDrag.pointer.x - 245 : 0;
                      const dy = isDraggingLidi ? canvasDrag.pointer.y - 220 : 0;
                      return (
                        <g
                          transform={`translate(${dx}, ${dy})`}
                          onPointerDown={(e) => {
                            if (!state.leafCutDone) return;
                            e.stopPropagation();
                            setCanvasDrag({ type: 'move-lidi', pointer: toSvgPoint(e.clientX, e.clientY) });
                          }}
                          className={state.leafCutDone ? 'cursor-grab active:cursor-grabbing' : ''}
                        >
                          <line x1="54" y1="220" x2="420" y2="220" stroke="#7A5A3A" strokeWidth="6" strokeLinecap="round" />
                          {state.leafCutDone && (
                            <g>
                              <rect x="165" y="206" width="160" height="28" rx="14" fill="#7A5A3A" stroke="#FAFBF6" strokeWidth="2" />
                              <text x="245" y="224" textAnchor="middle" fill="#FAFBF6" fontSize="11" fontWeight="700">
                                Drag Lidi to Tray →
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })()
                  ) : (
                    /* Saved Lidi vertical inside right tray */
                    <g>
                      <line x1="483" y1="184" x2="483" y2="296" stroke="#7A5A3A" strokeWidth="5.5" strokeLinecap="round" />
                      <rect x="115" y="344" width="290" height="36" rx="10" fill="#CFE4CA" stroke="#0F764A" strokeWidth="1.5" />
                      <text x="260" y="366" textAnchor="middle" fill="#143D28" fontSize="12" fontWeight="700">
                        Both strips ready! Click Next Step →
                      </text>
                    </g>
                  )}

                  {/* Scissors cut track */}
                  {!state.leafCutDone && (
                    <g>
                      <line x1="86" y1="220" x2="410" y2="220" stroke="#E2B334" strokeWidth="3" strokeDasharray="7 5" />
                      <line x1="86" y1="220" x2={Math.min(410, scissorsX)} y2="220" stroke="#143D28" strokeWidth="3" />

                      {!scissorsActiveOnLeaf ? (
                        <g
                          onClick={() => {
                            setSelectedTool('scissors');
                            setScissorsActiveOnLeaf(true);
                            setFeedbackMsg('Slide the Scissors from left to right along the dotted line!');
                          }}
                          className="cursor-pointer"
                        >
                          <rect x="135" y="198" width="224" height="44" rx="22" fill="#FAFBF6" stroke="#B65236" strokeWidth="2" />
                          <text x="247" y="224" textAnchor="middle" fill="#B65236" fontSize="12" fontWeight="700">
                            Drag Scissors Here to Cut
                          </text>
                        </g>
                      ) : (
                        <g
                          transform={`translate(${Math.min(410, scissorsX)}, 220)`}
                          onPointerDown={(e) => {
                            e.stopPropagation();
                            setCanvasDrag({ type: 'scissors-cut' });
                          }}
                          className="cursor-ew-resize"
                        >
                          <circle cx="0" cy="0" r="24" fill="#B65236" stroke="#FAFBF6" strokeWidth="2.5" filter="url(#dropLeaf)" />
                          <text x="0" y="5" textAnchor="middle" fill="#FAFBF6" fontSize="15" fontWeight="700">
                            ✂
                          </text>
                          <text x="0" y="-31" textAnchor="middle" fill="#143D28" fontSize="11" fontWeight="700">
                            Slide Right →
                          </text>
                        </g>
                      )}
                    </g>
                  )}
                </g>
              )}

              {/* ================= STAGE 2: MAKE THE FIRST FOLD (LOOP 1) ================= */}
              {state.stage === 2 && (
                <g>
                  {/* Ghost outline for Loop 1 */}
                  {state.foldsA < 1 ? (
                    <g>
                      <rect
                        x={LOOP_SLOTS_X[0] - 22}
                        y="68"
                        width="44"
                        height="286"
                        rx="22"
                        fill="#E8F5E9"
                        fillOpacity="0.8"
                        stroke="#0F764A"
                        strokeWidth="2.2"
                        strokeDasharray="6 4"
                      />
                      <text x={LOOP_SLOTS_X[0]} y="376" textAnchor="middle" fill="#143D28" fontSize="11.5" fontWeight="700">
                        Loop 1 Target
                      </text>

                      {/* Flat Strip A anchored on the left, bending live as user drags Pull Tip! */}
                      {(() => {
                        const restPoint = { x: 472, y: 274 };
                        const dragPt =
                          canvasDrag?.type === 'fold-strip-a' ? canvasDrag.pointer : restPoint;
                        const anchorX = 105;
                        const anchorY = 274;
                        const ctrlX = (anchorX + dragPt.x) / 2;
                        const ctrlY = Math.min(anchorY, dragPt.y) - 95;

                        return (
                          <g>
                            {/* Flat left base of Strip A */}
                            <path
                              d="M 60 274 L 185 274"
                              fill="none"
                              stroke="#2A6D37"
                              strokeWidth="26"
                              strokeLinecap="round"
                            />
                            {/* Bending ribbon of Strip A */}
                            <path
                              d={`M ${anchorX} ${anchorY} Q ${ctrlX} ${ctrlY}, ${dragPt.x} ${dragPt.y}`}
                              fill="none"
                              stroke={foldDragInsideZone ? '#0F764A' : '#3B8E47'}
                              strokeWidth="26"
                              strokeLinecap="round"
                              filter="url(#dropLeaf)"
                            />
                            <path
                              d={`M ${anchorX} ${anchorY} Q ${ctrlX} ${ctrlY}, ${dragPt.x} ${dragPt.y}`}
                              fill="none"
                              stroke="#98D292"
                              strokeWidth="2"
                              strokeDasharray="6 4"
                            />
                            <text x="115" y="314" textAnchor="middle" fill="#3F5749" fontSize="10.5" fontWeight="600">
                              Strip A Start
                            </text>

                            {/* Target Circle inside Loop 1 */}
                            <circle
                              cx={LOOP_SLOTS_X[0]}
                              cy={LOOP_TARGET_Y}
                              r={foldDragInsideZone ? 31 : 27}
                              fill={foldDragInsideZone ? '#0F764A' : '#FDF5DB'}
                              fillOpacity={foldDragInsideZone ? 0.25 : 0.85}
                              stroke={foldDragInsideZone ? '#0F764A' : '#DD7930'}
                              strokeWidth="2.5"
                              strokeDasharray={foldDragInsideZone ? 'none' : '5 4'}
                            />
                            <text x={LOOP_SLOTS_X[0]} y={LOOP_TARGET_Y + 4} textAnchor="middle" fill="#143D28" fontSize="10" fontWeight="700">
                              {foldDragInsideZone ? 'Drop!' : 'Fold Loop 1'}
                            </text>

                            {/* Draggable Pull Tip */}
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
                                r="24"
                                fill={foldDragInsideZone ? '#0F764A' : '#143D28'}
                                stroke="#FAFBF6"
                                strokeWidth="2.5"
                              />
                              <text x="0" y="4" textAnchor="middle" fill="#FAFBF6" fontSize="10" fontWeight="700">
                                Pull Tip
                              </text>
                            </g>
                          </g>
                        );
                      })()}
                    </g>
                  ) : (
                    /* Loop 1 Formed + Continuing Ribbon Extending Right! */
                    <g>
                      <path
                        d="M 85 274 L 175 274"
                        fill="none"
                        stroke="#2A6D37"
                        strokeWidth="22"
                        strokeLinecap="round"
                      />
                      <g filter="url(#dropLeaf)">
                        <path
                          d={`M ${LOOP_SLOTS_X[0] - 21} 92 C ${LOOP_SLOTS_X[0] - 21} 56, ${LOOP_SLOTS_X[0] + 21} 56, ${LOOP_SLOTS_X[0] + 21} 92 L ${LOOP_SLOTS_X[0] + 21} 332 C ${LOOP_SLOTS_X[0] + 21} 356, ${LOOP_SLOTS_X[0] - 21} 356, ${LOOP_SLOTS_X[0] - 21} 332 Z`}
                          fill="url(#leafDark)"
                          stroke="#143D28"
                          strokeWidth="1.8"
                        />
                        <ellipse cx={LOOP_SLOTS_X[0]} cy="86" rx="10" ry="12" fill="#E8F5E9" stroke="#143D28" strokeWidth="1.3" />
                        <line x1={LOOP_SLOTS_X[0]} y1="104" x2={LOOP_SLOTS_X[0]} y2="342" stroke="#98D292" strokeWidth="1.2" strokeDasharray="6 4" />
                      </g>
                      {/* Continuing strip tail extending right for Stage 3 */}
                      <path
                        d={`M ${LOOP_SLOTS_X[0] + 10} 338 Q 270 356, 465 320`}
                        fill="none"
                        stroke="#3B8E47"
                        strokeWidth="22"
                        strokeLinecap="round"
                      />
                      <text x={LOOP_SLOTS_X[0]} y="382" textAnchor="middle" fill="#143D28" fontSize="12" fontWeight="700">
                        Loop 1 ✓ (Ready for Loop 2 &amp; 3!)
                      </text>
                    </g>
                  )}
                </g>
              )}

              {/* ================= STAGE 3: CREATE THE LOOPS (LOOP 2, LOOP 3 + STRIP B) ================= */}
              {state.stage === 3 && (
                <g>
                  {/* Bottom connecting bends between Loop 1 -> Loop 2 -> Loop 3 so user sees they are one continuous strip */}
                  {state.foldsA >= 2 && (
                    <path
                      d={`M ${LOOP_SLOTS_X[0] + 8} 342 Q ${(LOOP_SLOTS_X[0] + LOOP_SLOTS_X[1]) / 2} 374, ${LOOP_SLOTS_X[1] - 8} 342`}
                      fill="none"
                      stroke="#2A6D37"
                      strokeWidth="18"
                      strokeLinecap="round"
                    />
                  )}
                  {state.foldsA >= 3 && (
                    <path
                      d={`M ${LOOP_SLOTS_X[1] + 8} 342 Q ${(LOOP_SLOTS_X[1] + LOOP_SLOTS_X[2]) / 2} 374, ${LOOP_SLOTS_X[2] - 8} 342`}
                      fill="none"
                      stroke="#2A6D37"
                      strokeWidth="18"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Render Loop 1, Loop 2, Loop 3 slots */}
                  {LOOP_SLOTS_X.map((cx, i) => {
                    const isFolded = i < state.foldsA;
                    const isCurrent = i === state.foldsA;
                    return (
                      <g key={cx}>
                        {!isFolded ? (
                          <g>
                            <rect
                              x={cx - 22}
                              y="68"
                              width="44"
                              height="286"
                              rx="22"
                              fill={isCurrent ? '#E8F5E9' : '#FAFBF6'}
                              fillOpacity={isCurrent ? 0.8 : 0.45}
                              stroke={isCurrent ? '#0F764A' : '#9AC193'}
                              strokeWidth={isCurrent ? '2.3' : '1.5'}
                              strokeDasharray="6 4"
                            />
                            <text x={cx} y="382" textAnchor="middle" fill="#3F5749" fontSize="11" fontWeight="600">
                              Loop {i + 1}
                            </text>
                          </g>
                        ) : (
                          <g filter="url(#dropLeaf)">
                            <path
                              d={`M ${cx - 21} 92 C ${cx - 21} 56, ${cx + 21} 56, ${cx + 21} 92 L ${cx + 21} 332 C ${cx + 21} 356, ${cx - 21} 356, ${cx - 21} 332 Z`}
                              fill="url(#leafDark)"
                              stroke="#143D28"
                              strokeWidth="1.8"
                            />
                            <ellipse cx={cx} cy="86" rx="10" ry="12" fill="#E8F5E9" stroke="#143D28" strokeWidth="1.3" />
                            <line x1={cx} y1="104" x2={cx} y2="342" stroke="#98D292" strokeWidth="1.2" strokeDasharray="6 4" />
                            <text x={cx} y="382" textAnchor="middle" fill="#143D28" fontSize="11.5" fontWeight="700">
                              Loop {i + 1} ✓
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}

                  {/* Active Draggable Ribbon Tail for Loop 2 or Loop 3 */}
                  {state.foldsA < 3 && (
                    <g>
                      <circle
                        cx={activeFoldTargetX}
                        cy={LOOP_TARGET_Y}
                        r={foldDragInsideZone ? 31 : 27}
                        fill={foldDragInsideZone ? '#0F764A' : '#FDF5DB'}
                        fillOpacity={foldDragInsideZone ? 0.25 : 0.85}
                        stroke={foldDragInsideZone ? '#0F764A' : showHint ? '#B65236' : '#DD7930'}
                        strokeWidth={foldDragInsideZone || showHint ? '3' : '2.4'}
                        strokeDasharray={foldDragInsideZone ? 'none' : '5 4'}
                      />
                      <text
                        x={activeFoldTargetX}
                        y={LOOP_TARGET_Y + 4}
                        textAnchor="middle"
                        fill="#143D28"
                        fontSize="10"
                        fontWeight="700"
                      >
                        {foldDragInsideZone ? 'Drop!' : `Fold Loop ${state.foldsA + 1}`}
                      </text>

                      {(() => {
                        const prevLoopX = LOOP_SLOTS_X[Math.max(0, state.foldsA - 1)];
                        const anchorX = prevLoopX + 10;
                        const anchorY = 338;
                        const restPoint = { x: 472, y: 280 };
                        const dragPt =
                          canvasDrag?.type === 'fold-strip-a' ? canvasDrag.pointer : restPoint;
                        const bendCtrlX = (anchorX + dragPt.x) / 2 + 25;
                        const bendCtrlY = Math.min(anchorY, dragPt.y) - 95;

                        return (
                          <g>
                            <path
                              d={`M ${anchorX} ${anchorY} Q ${bendCtrlX} ${bendCtrlY}, ${dragPt.x} ${dragPt.y}`}
                              fill="none"
                              stroke={foldDragInsideZone ? '#0F764A' : '#3B8E47'}
                              strokeWidth="24"
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

                  {/* Once all 3 loops are folded, place & turn Strip B */}
                  {state.foldsA >= 3 && !state.stripBPlaced && (
                    <g>
                      <rect
                        x="92"
                        y="124"
                        width="376"
                        height="196"
                        rx="14"
                        fill="#FDF5DB"
                        fillOpacity="0.72"
                        stroke="#DD7930"
                        strokeWidth="2.2"
                        strokeDasharray="7 5"
                      />
                      <text x="280" y="218" textAnchor="middle" fill="#143D28" fontSize="14.5" fontWeight="700">
                        Now Drag Leaf Strip B Here!
                      </text>
                      <text x="280" y="240" textAnchor="middle" fill="#3F5749" fontSize="11.5">
                        Drag Strip B from Materials on the left
                      </text>
                    </g>
                  )}

                  {state.foldsA >= 3 && state.stripBPlaced && (
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
                          <circle cx="0" cy="0" r="22" fill="#DD7930" stroke="#FAFBF6" strokeWidth="2.5" />
                          <text x="0" y="4" textAnchor="middle" fill="#FAFBF6" fontSize="10" fontWeight="700">
                            Turn →
                          </text>
                        </g>
                      )}
                    </g>
                  )}
                </g>
              )}

              {/* ================= STAGE 4: WEAVE THE STRIPS (3x3 OVER & UNDER) ================= */}
              {state.stage === 4 && (
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
                              <rect x={cx - 25} y={cy - 21} width="50" height="42" fill="url(#leafFresh)" stroke="#143D28" strokeWidth="1.7" />
                              <line x1={cx - 22} y1={cy} x2={cx + 22} y2={cy} stroke="#EFF9D8" strokeWidth="1" strokeDasharray="4 3" />
                            </g>
                          ) : (
                            <g filter="url(#dropLeaf)">
                              <rect x={cx - 21} y={cy - 25} width="42" height="50" fill="url(#leafDark)" stroke="#143D28" strokeWidth="1.7" />
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
                              stroke="#DD7930"
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

              {/* ================= STAGE 5: SHAPE THE KETUPAT (TUCK 4 CORNERS) ================= */}
              {state.stage === 5 && (
                <g>
                  <g transform="translate(280, 220) rotate(45)" filter="url(#dropLeaf)">
                    <rect x="-76" y="-76" width="152" height="152" rx="10" fill="#CFE4CA" stroke="#143D28" strokeWidth="2.2" />
                    {[-46, 0, 46].map((offset, idx) => (
                      <React.Fragment key={idx}>
                        <rect x={offset - 18} y="-74" width="36" height="148" fill="#3B8E47" stroke="#143D28" strokeWidth="1.2" opacity="0.92" />
                        <rect x="-74" y={offset - 18} width="148" height="36" fill="#B3D564" stroke="#143D28" strokeWidth="1.2" opacity="0.9" />
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
                            r="19"
                            fill="#FDF5DB"
                            fillOpacity="0.92"
                            stroke={isDraggingThis || showHint ? '#DD7930' : '#0F764A'}
                            strokeWidth="2.4"
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
                              stroke={showHint ? '#DD7930' : '#143D28'}
                              strokeWidth={showHint ? '3' : '2.2'}
                            />
                            <text x={tipPos.x} y={tipPos.y + 4} textAnchor="middle" fill="#143D28" fontSize="11" fontWeight="700">
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

              {/* ================= STAGE 6: FINISH THE CRAFT (PULL TIGHT) ================= */}
              {state.stage === 6 && (
                <g>
                  {(() => {
                    const t = state.tightness / 100;
                    const scale = 1.24 - t * 0.24;
                    const gap = 15 * (1 - t);
                    return (
                      <g transform={`translate(280, 212) scale(${scale})`}>
                        <path d="M -6 -108 C -16 -148, -34 -168, -44 -178 L -34 -182 C -18 -164, -2 -144, 2 -108 Z" fill="#89C059" stroke="#143D28" strokeWidth="1.5" />
                        <path d="M 6 -108 C 16 -146, 34 -164, 46 -176 L 36 -180 C 18 -162, 4 -142, -2 -108 Z" fill="#469650" stroke="#143D28" strokeWidth="1.5" />
                        <path d="M -6 108 L -14 156 L -4 160 L 4 108 Z" fill="#3B8E47" stroke="#143D28" strokeWidth="1.5" />
                        <path d="M 6 108 L 16 154 L 6 158 L -4 108 Z" fill="#B3D564" stroke="#143D28" strokeWidth="1.5" />

                        <g transform="rotate(45)" filter="url(#dropLeaf)">
                          <rect
                            x={-84 - gap * 0.4}
                            y={-84 - gap * 0.4}
                            width={168 + gap * 0.8}
                            height={168 + gap * 0.8}
                            rx="14"
                            fill="#2A6D37"
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
                                    fill={isDark ? '#469650' : '#BCE074'}
                                    stroke="#143D28"
                                    strokeWidth="1.5"
                                  />
                                  <line
                                    x1={isDark ? x + 6 : x + 16}
                                    y1={isDark ? y + 16 : y + 6}
                                    x2={isDark ? x + 46 : x + 16}
                                    y2={isDark ? y + 16 : y + 46}
                                    stroke={isDark ? '#88C884' : '#EFF9D8'}
                                    strokeWidth="1.1"
                                  />
                                  <line
                                    x1={isDark ? x + 6 : x + 34}
                                    y1={isDark ? y + 34 : y + 6}
                                    x2={isDark ? x + 46 : x + 34}
                                    y2={isDark ? y + 34 : y + 46}
                                    stroke={isDark ? '#88C884' : '#EFF9D8'}
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
                            <rect x="-54" y="-14" width="108" height="28" rx="14" fill="#DD7930" stroke="#FAFBF6" strokeWidth="2" />
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

            {/* Stage 4 Row-by-Row Weaving Progress Guide */}
            {state.stage === 4 && (
              <div className="w-full max-w-md mt-2 bg-[#FAFBF6] border border-[#B5D2AF] rounded-xl p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                {rowChecks.map((ok, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded-md font-medium ${
                      ok
                        ? 'bg-[#CFE4CA] text-[#143D28]'
                        : 'bg-[#FDF5DB] text-[#5B4112]'
                    }`}
                  >
                    Row {idx + 1}: {ok ? 'Locked ✓' : 'Keep weaving'}
                  </span>
                ))}
              </div>
            )}

            {/* Stage 6 Pull Tight Slider & Completion Card */}
            {state.stage === 6 && (
              <div className="w-full max-w-md mt-2 bg-[#FAFBF6] border border-[#B5D2AF] rounded-xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#132219]">
                  <label htmlFor="tighten-slider">Tightness</label>
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
                {state.tightness >= 100 && (
                  <div className="p-3 rounded-lg bg-[#FDF5DB] border border-[#E8D28C] text-xs text-[#143D28] flex items-center justify-between gap-2">
                    <span className="font-semibold">
                      Well done! Your Indonesian Ketupat is tightly locked and ready!
                    </span>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-3 py-1.5 rounded-md bg-[#143D28] text-white font-semibold shrink-0 cursor-pointer"
                    >
                      Make Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-[#FDF5DB]/85 border border-[#E8D28C] rounded-xl px-4 py-2.5 flex items-center gap-2 text-xs text-[#132219]">
            <Sparkles className="w-4 h-4 text-[#DD7930] shrink-0" />
            <span className="font-medium">{feedbackMsg}</span>
          </div>
        </section>

        {/* RIGHT PANEL: Step-by-Step Guide, Demo, Before/After/Why & Controls */}
        <aside className="lg:col-span-3 bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-4 sm:p-5 space-y-3.5">
          <div className="pb-2.5 border-b border-[#B5D2AF]">
            <p className="font-mono text-xs text-[#0F764A] tabular-nums mb-0.5 font-semibold">
              Step {state.stage + 1} of {STAGE_GUIDES.length}
            </p>
            <h2 className="font-serif text-2xl font-semibold text-[#132219]">
              {stageInfo.title}
            </h2>
          </div>

          {/* Clear Visual Demonstration */}
          <StageVisualDemo stage={state.stage} />

          {/* Short & Simple Instruction */}
          <p className="text-sm text-[#132219] leading-relaxed font-medium">
            {stageInfo.instruction}
          </p>

          {/* Before / After / Why Breakdown */}
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-[#FAFBF6] border border-[#B5D2AF]">
              <span className="font-semibold text-[#143D28]">Before: </span>
              <span className="text-[#3F5749]">{stageInfo.beforeText}</span>
            </div>
            <div
              className={`p-2.5 rounded-lg border ${
                currentComplete
                  ? 'bg-[#CFE4CA] border-[#0F764A] text-[#143D28]'
                  : 'bg-[#FAFBF6] border-[#B5D2AF] text-[#3F5749]'
              }`}
            >
              <span className="font-semibold text-[#143D28]">
                {currentComplete ? 'Done — After: ' : 'After: '}
              </span>
              <span>{stageInfo.afterText}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FAEDE8] border border-[#E4B7AA] text-[#132219]">
              <span className="font-semibold text-[#B65236]">Why needed: </span>
              <span>{stageInfo.whyText}</span>
            </div>
          </div>

          {showHint && (
            <div className="p-3 rounded-lg bg-[#FDF5DB] border border-[#E2B334] text-xs text-[#5B4112] leading-relaxed">
              <strong className="block mb-0.5">Hint:</strong>
              {stageInfo.hintText}
            </div>
          )}

          {/* Controls */}
          <div className="pt-2 border-t border-[#B5D2AF] space-y-2">
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
                  if (state.stage >= STAGE_GUIDES.length - 1) return;
                  goToStage(state.stage + 1);
                }}
                disabled={state.stage >= STAGE_GUIDES.length - 1}
                className={`inline-flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer min-h-[40px] ${
                  currentComplete && state.stage < STAGE_GUIDES.length - 1
                    ? 'bg-[#0F764A] text-white ring-2 ring-[#E2B334] hover:bg-[#143D28]'
                    : 'bg-[#143D28] text-white hover:bg-[#0D2B1B]'
                }`}
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
                    ? 'bg-[#DD7930] text-white border-[#DD7930]'
                    : 'bg-[#FAFBF6] text-[#132219] border-[#B5D2AF] hover:bg-[#FDF5DB]'
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
                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg border border-[#B5D2AF] bg-[#FAFBF6] text-[#132219] hover:bg-[#FAEDE8] cursor-pointer min-h-[40px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Floating Drag Ghost for Palette Materials & Tools */}
      {paletteDrag && (
        <div
          className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-[#143D28] text-white text-xs font-semibold shadow-lg border border-[#E2B334] -translate-x-1/2 -translate-y-1/2"
          style={{ left: paletteDragPos.x, top: paletteDragPos.y }}
        >
          {PALETTE_LABELS[paletteDrag]}
        </div>
      )}
    </div>
  );
};
