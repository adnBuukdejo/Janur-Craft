import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Undo2,
} from 'lucide-react';
import { StudioCraftConfig, StudioMode } from '../../data/studioCrafts';
import { JanurLeafIcon, KetupatDiamondIcon } from '../BotanicalDecorations';
import { FinishedCraftShowcase } from './StudioVisuals';

interface Point {
  x: number;
  y: number;
}

export interface WorkshopSnapshot {
  step: number; // 0..3
  // 1. canang-sari-sampian
  canangPins: boolean[];
  canangCutPct: number;
  canangFans: boolean[];
  canangCrownPlaced: boolean;
  canangFlowers: boolean[];
  // 2. janur-lidi-prep
  lidiWipePct: number;
  lidiCut1: number;
  lidiCut2: number;
  lidiSorted: boolean[];
  lidiBundled: boolean[];
  lidiTied: boolean;
  // 3. penjor-galungan
  penjorBend: number; // 0..100
  penjorCutPct: number;
  penjorWraps: boolean[];
  penjorDecor: boolean[];
  // 4. kembar-mayang
  kembarPotPlaced: boolean;
  kembarSticks: boolean[];
  kembarPleats: number; // 0..3
  kembarBraids: number; // 0..4
  kembarAssembled: boolean[];
  // 5. contemporary-janur-installation
  lampRings: boolean[];
  lampRibs: boolean[];
  lampWeave: ('over' | 'under')[][]; // 2x4
  lampPins: boolean[];
  lampTrimPct: number;
  lampBulbPlaced: boolean;
  // 6. ketupat-and-lepet
  lepetRollPct: number;
  lepetScoops: number; // 0..3
  lepetCaps: boolean[];
  lepetTies: boolean[];
  lepetKetupatTight: number;
  lepetPlated: boolean[];
  // 7. exhibition-ensemble
  ensPleats: number; // 0..4
  ensFanPinned: boolean;
  ensWreathParts: boolean[];
  ensCutLeft: number;
  ensCutRight: number;
  ensDisplayPlaced: boolean[];
  // 8. belalang-janur-toys
  bugStripsPlaced: boolean[];
  bugHeadLocked: boolean;
  bugBraids: number; // 0..5
  bugLegs: boolean[];
  bugSplitPct: number;
  bugFeelers: boolean[];
}

const LAMP_TARGET: ('over' | 'under')[][] = [
  ['over', 'under', 'over', 'under'],
  ['under', 'over', 'under', 'over'],
];

export function createInitialWorkshopState(): WorkshopSnapshot {
  return {
    step: 0,
    canangPins: [false, false, false, false],
    canangCutPct: 0,
    canangFans: [false, false, false, false],
    canangCrownPlaced: false,
    canangFlowers: [false, false, false, false],
    lidiWipePct: 0,
    lidiCut1: 0,
    lidiCut2: 0,
    lidiSorted: [false, false, false, false],
    lidiBundled: [false, false],
    lidiTied: false,
    penjorBend: 0,
    penjorCutPct: 0,
    penjorWraps: [false, false, false],
    penjorDecor: [false, false, false],
    kembarPotPlaced: false,
    kembarSticks: [false, false],
    kembarPleats: 0,
    kembarBraids: 0,
    kembarAssembled: [false, false, false, false],
    lampRings: [false, false],
    lampRibs: [false, false, false, false],
    lampWeave: [
      ['over', 'over', 'over', 'over'],
      ['over', 'over', 'over', 'over'],
    ],
    lampPins: [false, false, false, false],
    lampTrimPct: 0,
    lampBulbPlaced: false,
    lepetRollPct: 0,
    lepetScoops: 0,
    lepetCaps: [false, false],
    lepetTies: [false, false, false],
    lepetKetupatTight: 0,
    lepetPlated: [false, false],
    ensPleats: 0,
    ensFanPinned: false,
    ensWreathParts: [false, false, false, false],
    ensCutLeft: 0,
    ensCutRight: 0,
    ensDisplayPlaced: [false, false, false],
    bugStripsPlaced: [false, false],
    bugHeadLocked: false,
    bugBraids: 0,
    bugLegs: [false, false],
    bugSplitPct: 0,
    bugFeelers: [false, false],
  };
}

function isStepDone(craftId: string, s: WorkshopSnapshot, stepIdx: number): boolean {
  switch (craftId) {
    case 'canang-sari-sampian':
      if (stepIdx === 0) return s.canangPins.every(Boolean);
      if (stepIdx === 1) return s.canangCutPct >= 95;
      if (stepIdx === 2) return s.canangFans.every(Boolean);
      return s.canangCrownPlaced && s.canangFlowers.every(Boolean);
    case 'janur-lidi-prep':
      if (stepIdx === 0) return s.lidiWipePct >= 98;
      if (stepIdx === 1) return s.lidiCut1 >= 94 && s.lidiCut2 >= 94;
      if (stepIdx === 2) return s.lidiSorted.every(Boolean);
      return s.lidiBundled.every(Boolean) && s.lidiTied;
    case 'penjor-galungan':
      if (stepIdx === 0) return s.penjorBend >= 92;
      if (stepIdx === 1) return s.penjorCutPct >= 94;
      if (stepIdx === 2) return s.penjorWraps.every(Boolean);
      return s.penjorDecor.every(Boolean);
    case 'kembar-mayang':
      if (stepIdx === 0) return s.kembarPotPlaced && s.kembarSticks.every(Boolean);
      if (stepIdx === 1) return s.kembarPleats >= 3;
      if (stepIdx === 2) return s.kembarBraids >= 4;
      return s.kembarAssembled.every(Boolean);
    case 'contemporary-janur-installation':
      if (stepIdx === 0) return s.lampRings.every(Boolean) && s.lampRibs.every(Boolean);
      if (stepIdx === 1)
        return s.lampWeave.every((row, r) => row.every((v, c) => v === LAMP_TARGET[r][c]));
      if (stepIdx === 2) return s.lampPins.every(Boolean) && s.lampTrimPct >= 94;
      return s.lampBulbPlaced;
    case 'ketupat-and-lepet':
      if (stepIdx === 0) return s.lepetRollPct >= 94;
      if (stepIdx === 1) return s.lepetScoops >= 3;
      if (stepIdx === 2) return s.lepetCaps.every(Boolean) && s.lepetTies.every(Boolean);
      return s.lepetKetupatTight >= 95 && s.lepetPlated.every(Boolean);
    case 'exhibition-ensemble':
      if (stepIdx === 0) return s.ensPleats >= 4 && s.ensFanPinned;
      if (stepIdx === 1) return s.ensWreathParts.every(Boolean);
      if (stepIdx === 2) return s.ensCutLeft >= 92 && s.ensCutRight >= 92;
      return s.ensDisplayPlaced.every(Boolean);
    case 'belalang-janur-toys':
      if (stepIdx === 0) return s.bugStripsPlaced.every(Boolean) && s.bugHeadLocked;
      if (stepIdx === 1) return s.bugBraids >= 5;
      if (stepIdx === 2) return s.bugLegs.every(Boolean);
      return s.bugSplitPct >= 92 && s.bugFeelers.every(Boolean);
    default:
      return false;
  }
}

function autofillPriorSteps(craftId: string, s: WorkshopSnapshot, targetStep: number): WorkshopSnapshot {
  const next: WorkshopSnapshot = {
    ...s,
    step: targetStep,
    canangPins: [...s.canangPins],
    canangFans: [...s.canangFans],
    canangFlowers: [...s.canangFlowers],
    lidiSorted: [...s.lidiSorted],
    lidiBundled: [...s.lidiBundled],
    penjorWraps: [...s.penjorWraps],
    penjorDecor: [...s.penjorDecor],
    kembarSticks: [...s.kembarSticks],
    kembarAssembled: [...s.kembarAssembled],
    lampRings: [...s.lampRings],
    lampRibs: [...s.lampRibs],
    lampWeave: s.lampWeave.map((r) => [...r]),
    lampPins: [...s.lampPins],
    lepetCaps: [...s.lepetCaps],
    lepetTies: [...s.lepetTies],
    lepetPlated: [...s.lepetPlated],
    ensWreathParts: [...s.ensWreathParts],
    ensDisplayPlaced: [...s.ensDisplayPlaced],
    bugStripsPlaced: [...s.bugStripsPlaced],
    bugLegs: [...s.bugLegs],
    bugFeelers: [...s.bugFeelers],
  };

  if (craftId === 'canang-sari-sampian') {
    if (targetStep >= 1) next.canangPins = [true, true, true, true];
    if (targetStep >= 2) next.canangCutPct = 100;
    if (targetStep >= 3) next.canangFans = [true, true, true, true];
  } else if (craftId === 'janur-lidi-prep') {
    if (targetStep >= 1) next.lidiWipePct = 100;
    if (targetStep >= 2) {
      next.lidiCut1 = 100;
      next.lidiCut2 = 100;
    }
    if (targetStep >= 3) next.lidiSorted = [true, true, true, true];
  } else if (craftId === 'penjor-galungan') {
    if (targetStep >= 1) next.penjorBend = 100;
    if (targetStep >= 2) next.penjorCutPct = 100;
    if (targetStep >= 3) next.penjorWraps = [true, true, true];
  } else if (craftId === 'kembar-mayang') {
    if (targetStep >= 1) {
      next.kembarPotPlaced = true;
      next.kembarSticks = [true, true];
    }
    if (targetStep >= 2) next.kembarPleats = 3;
    if (targetStep >= 3) next.kembarBraids = 4;
  } else if (craftId === 'contemporary-janur-installation') {
    if (targetStep >= 1) {
      next.lampRings = [true, true];
      next.lampRibs = [true, true, true, true];
    }
    if (targetStep >= 2) next.lampWeave = LAMP_TARGET.map((r) => [...r]);
    if (targetStep >= 3) {
      next.lampPins = [true, true, true, true];
      next.lampTrimPct = 100;
    }
  } else if (craftId === 'ketupat-and-lepet') {
    if (targetStep >= 1) next.lepetRollPct = 100;
    if (targetStep >= 2) next.lepetScoops = 3;
    if (targetStep >= 3) {
      next.lepetCaps = [true, true];
      next.lepetTies = [true, true, true];
    }
  } else if (craftId === 'exhibition-ensemble') {
    if (targetStep >= 1) {
      next.ensPleats = 4;
      next.ensFanPinned = true;
    }
    if (targetStep >= 2) next.ensWreathParts = [true, true, true, true];
    if (targetStep >= 3) {
      next.ensCutLeft = 100;
      next.ensCutRight = 100;
    }
  } else if (craftId === 'belalang-janur-toys') {
    if (targetStep >= 1) {
      next.bugStripsPlaced = [true, true];
      next.bugHeadLocked = true;
    }
    if (targetStep >= 2) next.bugBraids = 5;
    if (targetStep >= 3) next.bugLegs = [true, true];
  }

  return next;
}

type ActiveDrag =
  | {
      kind: 'drop-target';
      itemKey: string;
      label: string;
      pointer: Point;
      target: Point;
      radius: number;
      onHit: () => void;
      wrongMsg: string;
    }
  | {
      kind: 'slide-x';
      startX: number;
      endX: number;
      onProgress: (pct: number) => void;
    }
  | {
      kind: 'wipe-x';
      lastX: number;
      onDelta: (absDelta: number) => void;
    }
  | {
      kind: 'pull-xy';
      target: Point;
      start: Point;
      onProgress: (pct: number) => void;
    }
  | null;

const WorkshopStepDemoSVG: React.FC<{ craftId: string; step: number }> = ({ craftId, step }) => (
  <div className="bg-[#FAFBF6] border border-[#B5D2AF] rounded-lg p-2.5">
    <p className="font-mono text-[10px] uppercase tracking-wider text-[#0F764A] font-semibold mb-1.5">
      Action Demo
    </p>
    <svg viewBox="0 0 220 72" className="w-full h-auto" aria-hidden="true">
      <rect x="0" y="0" width="220" height="72" rx="6" fill="#F2F7EE" />
      {step === 0 && craftId !== 'penjor-galungan' && (
        <g>
          <rect x="24" y="18" width="54" height="34" rx="8" fill="#A4CF7A" stroke="#143D28" strokeWidth="1.2" />
          <path d="M 86 35 L 130 35" stroke="#DD7930" strokeWidth="2.2" strokeDasharray="4 3" />
          <polygon points="128,30 138,35 128,40" fill="#DD7930" />
          <rect x="142" y="16" width="54" height="38" rx="8" fill="#FDF5DB" stroke="#0F764A" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="110" y="65" textAnchor="middle" fontSize="9.5" fill="#143D28" fontWeight="600">
            Drag &amp; place parts into target spots
          </text>
        </g>
      )}
      {step === 0 && craftId === 'penjor-galungan' && (
        <g>
          <path d="M 70 60 L 70 26 Q 70 10, 128 18" fill="none" stroke="#4CA156" strokeWidth="7" strokeLinecap="round" />
          <path d="M 96 14 Q 124 10, 146 24" fill="none" stroke="#DD7930" strokeWidth="2" strokeDasharray="3 2" />
          <polygon points="145,19 152,26 142,27" fill="#DD7930" />
          <text x="110" y="66" textAnchor="middle" fontSize="9.5" fill="#143D28" fontWeight="600">
            Pull top bamboo handle to bend arch
          </text>
        </g>
      )}
      {step === 1 && (
        <g>
          <rect x="30" y="24" width="160" height="20" rx="5" fill="#B3D564" stroke="#143D28" strokeWidth="1.2" />
          <path d="M 55 34 L 165 34" stroke="#B65236" strokeWidth="2.2" strokeDasharray="5 3" />
          <circle cx="110" cy="34" r="10" fill="#143D28" />
          <text x="110" y="38" textAnchor="middle" fontSize="9" fill="#FAFBF6" fontWeight="700">
            ↔
          </text>
          <text x="110" y="63" textAnchor="middle" fontSize="9.5" fill="#143D28" fontWeight="600">
            Slide / fold smoothly along guide
          </text>
        </g>
      )}
      {step === 2 && (
        <g>
          <rect x="46" y="16" width="128" height="36" rx="8" fill="#E8F5E9" stroke="#0F764A" strokeWidth="1.3" />
          <path d="M 68 34 L 152 34" stroke="#3B8E47" strokeWidth="8" strokeLinecap="round" />
          <path d="M 110 14 L 110 54" stroke="#E2B334" strokeWidth="8" strokeLinecap="round" opacity="0.88" />
          <text x="110" y="65" textAnchor="middle" fontSize="9.5" fill="#143D28" fontWeight="600">
            Fold, braid, or lock joints tight
          </text>
        </g>
      )}
      {step === 3 && (
        <g>
          <circle cx="110" cy="30" r="21" fill="#FDF5DB" stroke="#E2B334" strokeWidth="1.8" />
          <circle cx="110" cy="30" r="11" fill="#4CA156" stroke="#143D28" strokeWidth="1.2" />
          <text x="110" y="65" textAnchor="middle" fontSize="9.5" fill="#143D28" fontWeight="600">
            Arrange final pieces to finish craft!
          </text>
        </g>
      )}
    </svg>
  </div>
);

interface CraftBenchWorkshopProps {
  craft: StudioCraftConfig;
  mode: StudioMode;
  savedState?: WorkshopSnapshot;
  onStateChange?: (snap: WorkshopSnapshot) => void;
  onProgressChange: (pct: number) => void;
  onChooseAnother: () => void;
}

export const CraftBenchWorkshop: React.FC<CraftBenchWorkshopProps> = ({
  craft,
  mode,
  savedState,
  onStateChange,
  onProgressChange,
  onChooseAnother,
}) => {
  const [state, setState] = useState<WorkshopSnapshot>(
    () => savedState || createInitialWorkshopState()
  );
  const [history, setHistory] = useState<WorkshopSnapshot[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [showFinishedCard, setShowFinishedCard] = useState(false);
  const [drag, setDrag] = useState<ActiveDrag>(null);
  const [feedback, setFeedback] = useState<string>(
    mode === 'learn'
      ? craft.steps[0].learnInstruction
      : craft.steps[0].freeInstruction
  );

  const svgRef = useRef<SVGSVGElement>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const currentStepMeta = craft.steps[state.step];
  const stepCompleted = isStepDone(craft.id, state, state.step);

  const completedStepsCount = useMemo(
    () => [0, 1, 2, 3].filter((i) => isStepDone(craft.id, state, i)).length,
    [craft.id, state]
  );
  const overallProgress = Math.round((completedStepsCount / 4) * 100);

  useEffect(() => {
    onProgressChange(overallProgress);
  }, [overallProgress, onProgressChange]);

  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  useEffect(() => {
    if (overallProgress === 100) {
      setShowFinishedCard(true);
    }
  }, [overallProgress]);

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

  const commit = useCallback(
    (updater: (prev: WorkshopSnapshot) => WorkshopSnapshot, msg?: string) => {
      setState((prev) => {
        setHistory((h) => [...h.slice(-24), prev]);
        return updater(prev);
      });
      setShowHint(false);
      if (msg) setFeedback(msg);
    },
    []
  );

  // Global pointer listeners for active drag
  useEffect(() => {
    if (!drag) return;

    if (drag.kind === 'slide-x' || drag.kind === 'wipe-x' || drag.kind === 'pull-xy') {
      setHistory((h) => [...h.slice(-24), stateRef.current]);
    }

    const handleMove = (e: PointerEvent) => {
      const pt = toSvgPoint(e.clientX, e.clientY);

      if (drag.kind === 'drop-target') {
        setDrag((d) => (d && d.kind === 'drop-target' ? { ...d, pointer: pt } : d));
      } else if (drag.kind === 'slide-x') {
        const span = drag.endX - drag.startX;
        const pct = Math.max(0, Math.min(100, ((pt.x - drag.startX) / span) * 100));
        drag.onProgress(Math.round(pct));
      } else if (drag.kind === 'wipe-x') {
        const clampedX = Math.max(95, Math.min(465, pt.x));
        const delta = Math.abs(clampedX - drag.lastX);
        drag.lastX = clampedX;
        if (delta > 1) drag.onDelta(delta);
      } else if (drag.kind === 'pull-xy') {
        const totalDist = Math.hypot(drag.target.x - drag.start.x, drag.target.y - drag.start.y) || 1;
        const dx = pt.x - drag.start.x;
        const dy = pt.y - drag.start.y;
        const proj =
          ((dx * (drag.target.x - drag.start.x) + dy * (drag.target.y - drag.start.y)) /
            totalDist) /
          totalDist;
        const pct = Math.max(0, Math.min(100, Math.round(proj * 100)));
        drag.onProgress(pct);
      }
    };

    const handleUp = (e: PointerEvent) => {
      const pt = toSvgPoint(e.clientX, e.clientY);
      if (drag.kind === 'drop-target') {
        const dist = Math.hypot(pt.x - drag.target.x, pt.y - drag.target.y);
        if (dist <= drag.radius) {
          drag.onHit();
        } else {
          setFeedback(drag.wrongMsg);
        }
      }
      setDrag(null);
    };

    const handleCancel = () => setDrag(null);

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleCancel);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleCancel);
    };
  }, [drag, toSvgPoint]);

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setState(prev);
    setShowFinishedCard(false);
    setShowHint(false);
    setFeedback('Undid your last move.');
  };

  const performReset = () => {
    const fresh = createInitialWorkshopState();
    setState(fresh);
    setHistory([]);
    setShowHint(false);
    setConfirmResetOpen(false);
    setShowFinishedCard(false);
    setFeedback(`Cleared ${craft.indonesianName}. Ready for Step 1!`);
  };

  const handleResetClick = () => {
    if (overallProgress >= 100) {
      setConfirmResetOpen(true);
    } else {
      performReset();
    }
  };

  const goToStep = (targetStep: number) => {
    if (targetStep === state.step) return;
    setConfirmResetOpen(false);
    setShowFinishedCard(false);
    commit(
      (prev) => autofillPriorSteps(craft.id, prev, targetStep),
      mode === 'learn'
        ? craft.steps[targetStep].learnInstruction
        : craft.steps[targetStep].freeInstruction
    );
  };

  const startDrop = (
    itemKey: string,
    label: string,
    start: Point,
    target: Point,
    radius: number,
    onHit: () => void,
    wrongMsg: string,
    e: React.PointerEvent
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setDrag({
      kind: 'drop-target',
      itemKey,
      label,
      pointer: start,
      target,
      radius,
      onHit,
      wrongMsg,
    });
  };

  const showTargetGuides = mode === 'learn' || showHint;

  const renderDropHandle = (
    itemKey: string,
    label: string,
    start: Point,
    target: Point,
    done: boolean,
    color: string,
    onHit: () => void,
    wrongMsg: string,
    targetLabel = 'Drop'
  ) => {
    if (done) return null;
    const active = drag?.kind === 'drop-target' && drag.itemKey === itemKey;
    const pos = active ? drag.pointer : start;
    const inside = active && Math.hypot(pos.x - target.x, pos.y - target.y) <= 58;

    return (
      <g key={itemKey}>
        {(showTargetGuides || active) && (
          <g>
            <circle
              cx={target.x}
              cy={target.y}
              r={inside ? 28 : 24}
              fill={inside ? '#0F764A' : '#FDF5DB'}
              fillOpacity={inside ? 0.25 : showTargetGuides ? 0.85 : 0.4}
              stroke={inside ? '#0F764A' : showHint ? '#B65236' : '#DD7930'}
              strokeWidth={showHint || inside ? '2.8' : '2'}
              strokeDasharray={inside ? 'none' : '5 4'}
            />
            <text x={target.x} y={target.y + 4} textAnchor="middle" fill="#143D28" fontSize="9.5" fontWeight="700">
              {inside ? 'Drop!' : targetLabel}
            </text>
          </g>
        )}
        <g
          transform={`translate(${pos.x}, ${pos.y})`}
          onPointerDown={(e) => startDrop(itemKey, label, start, target, 62, onHit, wrongMsg, e)}
          className="cursor-grab active:cursor-grabbing"
        >
          <rect
            x="-38"
            y="-17"
            width="76"
            height="34"
            rx="17"
            fill={color}
            stroke="#FAFBF6"
            strokeWidth="2.2"
            filter="url(#wDrop)"
          />
          <text x="0" y="4" textAnchor="middle" fill="#FAFBF6" fontSize="10" fontWeight="700">
            {label}
          </text>
        </g>
      </g>
    );
  };

  // Craft-specific SVG scene renderer
  const renderCraftScene = () => {
    const s = state;
    const step = s.step;

    // 1. CANANG SARI & SAMPIAN
    if (craft.id === 'canang-sari-sampian') {
      const trayCorners: Point[] = [
        { x: 170, y: 120 },
        { x: 390, y: 120 },
        { x: 170, y: 320 },
        { x: 390, y: 320 },
      ];
      const pinStarts: Point[] = [
        { x: 76, y: 110 },
        { x: 484, y: 110 },
        { x: 76, y: 330 },
        { x: 484, y: 330 },
      ];
      const fanStarts: Point[] = [
        { x: 110, y: 110 },
        { x: 450, y: 110 },
        { x: 110, y: 330 },
        { x: 450, y: 330 },
      ];
      const flowerStarts = [
        { name: 'White', color: '#FAFBF6', stroke: '#B5D2AF', start: { x: 85, y: 120 }, target: { x: 232, y: 174 } },
        { name: 'Red', color: '#B65236', stroke: '#7A2E1A', start: { x: 475, y: 120 }, target: { x: 328, y: 174 } },
        { name: 'Yellow', color: '#E2B334', stroke: '#8C6239', start: { x: 85, y: 320 }, target: { x: 232, y: 266 } },
        { name: 'Marigold', color: '#DD7930', stroke: '#8C4312', start: { x: 475, y: 320 }, target: { x: 328, y: 266 } },
      ];

      return (
        <g>
          {step === 0 && (
            <g>
              <rect x="170" y="120" width="220" height="200" rx="12" fill="#E8F5E9" stroke="#3B8E47" strokeWidth="3" />
              <rect x="184" y="134" width="192" height="172" rx="8" fill="#82BC5E" fillOpacity="0.45" stroke="#143D28" strokeWidth="1.5" />
              {trayCorners.map((pt, i) => (
                <g key={i}>
                  {s.canangPins[i] ? (
                    <g>
                      <circle cx={pt.x} cy={pt.y} r="13" fill="#8C6239" stroke="#FAFBF6" strokeWidth="2" />
                      <text x={pt.x} y={pt.y + 4} textAnchor="middle" fill="#FAFBF6" fontSize="10" fontWeight="700">✓</text>
                    </g>
                  ) : (
                    renderDropHandle(
                      `cpin-${i}`,
                      `Semat ${i + 1}`,
                      pinStarts[i],
                      pt,
                      false,
                      '#8C6239',
                      () =>
                        commit((p) => {
                          const pins = [...p.canangPins];
                          pins[i] = true;
                          return { ...p, canangPins: pins };
                        }, `Pinned corner ${i + 1}!`),
                      `Try again! Drag Semat ${i + 1} onto corner ${i + 1}.`,
                      `Corner ${i + 1}`
                    )
                  )}
                </g>
              ))}
            </g>
          )}

          {step === 1 && (
            <g>
              <rect x="86" y="165" width="388" height="106" rx="10" fill="#B3D564" stroke="#143D28" strokeWidth="2" />
              {/* Decorative notches revealed as scissors progress */}
              {Array.from({ length: 12 }).map((_, i) => {
                const x = 104 + i * 31;
                const cutDone = ((x - 95) / 370) * 100 <= s.canangCutPct;
                return cutDone ? (
                  <polygon key={i} points={`${x - 10},165 ${x},190 ${x + 10},165`} fill="#F4F6EE" stroke="#143D28" strokeWidth="1.1" />
                ) : null;
              })}
              <line x1="95" y1="176" x2="465" y2="176" stroke="#E2B334" strokeWidth="3" strokeDasharray="7 5" />
              {s.canangCutPct < 95 ? (
                <g
                  transform={`translate(${95 + (s.canangCutPct / 100) * 370}, 176)`}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setDrag({
                      kind: 'slide-x',
                      startX: 95,
                      endX: 465,
                      onProgress: (pct) =>
                        setState((p) => ({
                          ...p,
                          canangCutPct: Math.max(p.canangCutPct, pct),
                        })),
                    });
                  }}
                  className="cursor-ew-resize"
                >
                  <circle cx="0" cy="0" r="24" fill="#B65236" stroke="#FAFBF6" strokeWidth="2.5" filter="url(#wDrop)" />
                  <text x="0" y="5" textAnchor="middle" fill="#FAFBF6" fontSize="14" fontWeight="700">✂</text>
                  <text x="0" y="-30" textAnchor="middle" fill="#143D28" fontSize="10.5" fontWeight="700">Slide Right →</text>
                </g>
              ) : (
                <text x="280" y="318" textAnchor="middle" fill="#143D28" fontSize="13" fontWeight="700">
                  Zigzag edges cut! Click Next Step →
                </text>
              )}
            </g>
          )}

          {step === 2 && (
            <g>
              <circle cx="280" cy="220" r="34" fill="#FDF5DB" stroke="#8C6239" strokeWidth="2" />
              {s.canangFans.map((done, i) =>
                done ? (
                  <g key={i} transform={`translate(280, 220) rotate(${i * 90})`}>
                    <ellipse cx="0" cy="-54" rx="22" ry="44" fill={i % 2 === 0 ? '#BCE074' : '#469650'} stroke="#143D28" strokeWidth="1.6" />
                    <ellipse cx="38" cy="-38" rx="18" ry="38" fill="#82BC5E" stroke="#143D28" strokeWidth="1.4" transform="rotate(45)" />
                  </g>
                ) : null
              )}
              <circle cx="280" cy="220" r="14" fill="#8C6239" />
              {fanStarts.map((pt, i) =>
                renderDropHandle(
                  `cfan-${i}`,
                  `Fan ${i + 1}`,
                  pt,
                  { x: 280, y: 220 },
                  s.canangFans[i],
                  '#3B8E47',
                  () =>
                    commit((p) => {
                      const fans = [...p.canangFans];
                      fans[i] = true;
                      return { ...p, canangFans: fans };
                    }, `Folded Sampian Fan ${i + 1} into the star crown!`),
                  `Drag Fan ${i + 1} into the center ring!`,
                  'Pin Ring'
                )
              )}
            </g>
          )}

          {step === 3 && (
            <g>
              <rect x="165" y="105" width="230" height="230" rx="14" fill="#4CA156" stroke="#143D28" strokeWidth="2.5" />
              <rect x="180" y="120" width="200" height="200" rx="10" fill="#82BC5E" stroke="#143D28" strokeWidth="1.4" />
              {s.canangCrownPlaced && (
                <g transform="translate(280, 220)">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ellipse key={i} cx="0" cy="-24" rx="8" ry="24" fill={i % 2 === 0 ? '#BCE074' : '#3B8E47'} stroke="#143D28" strokeWidth="1.2" transform={`rotate(${i * 45})`} />
                  ))}
                  <circle cx="0" cy="0" r="10" fill="#8C6239" />
                </g>
              )}
              {flowerStarts.map((f, i) =>
                s.canangFlowers[i] ? (
                  <g key={f.name}>
                    <circle cx={f.target.x} cy={f.target.y} r="20" fill={f.color} stroke={f.stroke} strokeWidth="1.8" />
                    <circle cx={f.target.x - 6} cy={f.target.y - 4} r="6" fill={f.color} stroke={f.stroke} strokeWidth="1" />
                    <circle cx={f.target.x + 7} cy={f.target.y + 4} r="6" fill={f.color} stroke={f.stroke} strokeWidth="1" />
                  </g>
                ) : (
                  renderDropHandle(
                    `cflower-${i}`,
                    f.name,
                    f.start,
                    f.target,
                    false,
                    f.name === 'White' ? '#0F764A' : f.color,
                    () =>
                      commit((p) => {
                        const fl = [...p.canangFlowers];
                        fl[i] = true;
                        return { ...p, canangFlowers: fl };
                      }, `Placed ${f.name} petals on the tray!`),
                    `Drag ${f.name} petals onto its circle on the tray!`,
                    f.name
                  )
                )
              )}
              {renderDropHandle(
                'ccrown',
                'Sampian',
                { x: 280, y: 52 },
                { x: 280, y: 220 },
                s.canangCrownPlaced,
                '#143D28',
                () =>
                  commit((p) => ({ ...p, canangCrownPlaced: true }), 'Placed the Sampian star crown in the center!'),
                'Drag the Sampian crown into the center of the tray!',
                'Center'
              )}
            </g>
          )}
        </g>
      );
    }

    // 2. JANUR LIDI PREP (MENYESET)
    if (craft.id === 'janur-lidi-prep') {
      const stripStarts: Point[] = [
        { x: 355, y: 120 },
        { x: 355, y: 175 },
        { x: 355, y: 265 },
        { x: 355, y: 320 },
      ];
      return (
        <g>
          {step === 0 && (
            <g>
              {[150, 275].map((cy, idx) => (
                <g key={cy} filter="url(#wDrop)">
                  <path
                    d={`M 75 ${cy} C 165 ${cy - 44}, 375 ${cy - 44}, 485 ${cy} C 375 ${cy + 44}, 165 ${cy + 44}, 75 ${cy} Z`}
                    fill={s.lidiWipePct > 65 ? '#469650' : '#AEB86C'}
                    stroke="#143D28"
                    strokeWidth="1.6"
                  />
                  <line x1="65" y1={cy} x2="485" y2={cy} stroke="#8C6239" strokeWidth="4.5" />
                  <text x="280" y={cy - 38} textAnchor="middle" fill="#143D28" fontSize="11" fontWeight="600">
                    Leaf {idx + 1}
                  </text>
                </g>
              ))}
              {s.lidiWipePct < 98 ? (
                <g
                  transform={`translate(${120 + (s.lidiWipePct / 100) * 280}, 212)`}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setDrag({
                      kind: 'wipe-x',
                      lastX: toSvgPoint(e.clientX, e.clientY).x,
                      onDelta: (d) =>
                        setState((p) => ({
                          ...p,
                          lidiWipePct: Math.min(100, p.lidiWipePct + d * 0.28),
                        })),
                    });
                  }}
                  className="cursor-ew-resize"
                >
                  <rect x="-42" y="-22" width="84" height="44" rx="10" fill="#DCF0F2" stroke="#1E6C7A" strokeWidth="2.4" filter="url(#wDrop)" />
                  <text x="0" y="-2" textAnchor="middle" fill="#132219" fontSize="10.5" fontWeight="700">Damp Cloth</text>
                  <text x="0" y="12" textAnchor="middle" fill="#1E6C7A" fontSize="9.5" fontWeight="600">← Wipe →</text>
                </g>
              ) : (
                <text x="280" y="378" textAnchor="middle" fill="#0F764A" fontSize="13" fontWeight="700">
                  Both leaves wiped soft (100%)! Click Next Step →
                </text>
              )}
            </g>
          )}

          {step === 1 && (
            <g>
              {[
                { cy: 145, val: s.lidiCut1, key: 'cut1' as const },
                { cy: 290, val: s.lidiCut2, key: 'cut2' as const },
              ].map((leaf, idx) => {
                const gap = (leaf.val / 100) * 20;
                return (
                  <g key={leaf.key}>
                    <path d={`M 80 ${leaf.cy - gap} C 165 ${leaf.cy - 44 - gap}, 375 ${leaf.cy - 44 - gap}, 475 ${leaf.cy - gap} L 80 ${leaf.cy - gap} Z`} fill="#469650" stroke="#143D28" strokeWidth="1.5" />
                    <path d={`M 80 ${leaf.cy + gap} C 165 ${leaf.cy + 44 + gap}, 375 ${leaf.cy + 44 + gap}, 475 ${leaf.cy + gap} L 80 ${leaf.cy + gap} Z`} fill="#B3D564" stroke="#0F764A" strokeWidth="1.5" />
                    <line x1="72" y1={leaf.cy} x2="475" y2={leaf.cy} stroke="#8C6239" strokeWidth="4.8" />
                    <line x1="96" y1={leaf.cy} x2="462" y2={leaf.cy} stroke="#E2B334" strokeWidth="2.5" strokeDasharray="6 4" />
                    {leaf.val < 94 ? (
                      <g
                        transform={`translate(${96 + (leaf.val / 100) * 366}, ${leaf.cy})`}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                          setDrag({
                            kind: 'slide-x',
                            startX: 96,
                            endX: 462,
                            onProgress: (pct) =>
                              setState((p) =>
                                leaf.key === 'cut1'
                                  ? { ...p, lidiCut1: Math.max(p.lidiCut1, pct) }
                                  : { ...p, lidiCut2: Math.max(p.lidiCut2, pct) }
                              ),
                          });
                        }}
                        className="cursor-ew-resize"
                      >
                        <circle cx="0" cy="0" r="21" fill="#B65236" stroke="#FAFBF6" strokeWidth="2" />
                        <text x="0" y="5" textAnchor="middle" fill="#FAFBF6" fontSize="13">✂</text>
                        <text x="0" y="-26" textAnchor="middle" fill="#143D28" fontSize="10" fontWeight="700">
                          Cut Leaf {idx + 1} →
                        </text>
                      </g>
                    ) : (
                      <text x="280" y={leaf.cy + 5} textAnchor="middle" fill="#143D28" fontSize="11.5" fontWeight="700">
                        Leaf {idx + 1} Cut ✓
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {step === 2 && (
            <g>
              <rect x="40" y="95" width="150" height="250" rx="14" fill="#E8F5E9" stroke="#0F764A" strokeWidth="2.2" />
              <text x="115" y="122" textAnchor="middle" fill="#143D28" fontSize="12" fontWeight="700">Weaving Basket</text>
              {s.lidiSorted.map((ok, i) =>
                ok ? (
                  <rect key={i} x="58" y={145 + i * 44} width="114" height="22" rx="5" fill={i % 2 === 0 ? '#469650' : '#B3D564'} stroke="#143D28" strokeWidth="1.2" />
                ) : null
              )}
              {stripStarts.map((pt, i) =>
                renderDropHandle(
                  `lstrip-${i}`,
                  `Strip ${i + 1}`,
                  pt,
                  { x: 115, y: 155 + i * 44 },
                  s.lidiSorted[i],
                  i % 2 === 0 ? '#3B8E47' : '#0F764A',
                  () =>
                    commit((p) => {
                      const next = [...p.lidiSorted];
                      next[i] = true;
                      return { ...p, lidiSorted: next };
                    }, `Sorted Strip ${i + 1} into the Weaving Basket!`),
                  `Drag Strip ${i + 1} into the Weaving Basket on the left!`,
                  `Slot ${i + 1}`
                )
              )}
            </g>
          )}

          {step === 3 && (
            <g>
              <rect x="330" y="96" width="160" height="248" rx="14" fill="#FDF5DB" stroke="#8C6239" strokeWidth="2.2" />
              <text x="410" y="124" textAnchor="middle" fill="#143D28" fontSize="12" fontWeight="700">Sapu Lidi Bundle</text>
              {s.lidiBundled.map((ok, i) =>
                ok ? <line key={i} x1={392 + i * 32} y1="145" x2={398 + i * 24} y2="320" stroke="#8C6239" strokeWidth="6" strokeLinecap="round" /> : null
              )}
              {s.lidiTied && (
                <rect x="378" y="232" width="64" height="14" rx="4" fill="#E2B334" stroke="#143D28" strokeWidth="1.5" />
              )}
              {[0, 1].map((i) =>
                renderDropHandle(
                  `lidi-${i}`,
                  `Lidi ${i + 1}`,
                  { x: 130, y: 150 + i * 95 },
                  { x: 396 + i * 24, y: 230 },
                  s.lidiBundled[i],
                  '#8C6239',
                  () =>
                    commit((p) => {
                      const b = [...p.lidiBundled];
                      b[i] = true;
                      return { ...p, lidiBundled: b };
                    }, `Added Lidi ${i + 1} to the broom bundle!`),
                  `Drag Lidi ${i + 1} into the Sapu Lidi Bundle on the right!`,
                  `Lidi ${i + 1}`
                )
              )}
              {s.lidiBundled.every(Boolean) &&
                renderDropHandle(
                  'lidi-tie',
                  'Tie String',
                  { x: 130, y: 315 },
                  { x: 410, y: 238 },
                  s.lidiTied,
                  '#B65236',
                  () => commit((p) => ({ ...p, lidiTied: true }), 'Tied the sticks into a Sapu Lidi broom!'),
                  'Drag Tie String across the bundled sticks!',
                  'Tie Here'
                )}
            </g>
          )}
        </g>
      );
    }

    // 3. PENJOR GALUNGAN
    if (craft.id === 'penjor-galungan') {
      const tipX = 180 + (s.penjorBend / 100) * 195;
      const tipY = 72 + (s.penjorBend / 100) * 44;
      const ctrlY = 128 - (s.penjorBend / 100) * 62;
      const polePath = `M 180 385 L 180 185 Q 180 ${ctrlY}, ${tipX} ${tipY}`;

      return (
        <g>
          {step === 0 && (
            <g>
              <path d={polePath} fill="none" stroke="#82BC5E" strokeWidth="18" strokeLinecap="round" filter="url(#wDrop)" />
              <path d={polePath} fill="none" stroke="#143D28" strokeWidth="1.6" strokeLinecap="round" />
              {s.penjorBend < 92 ? (
                <g
                  transform={`translate(${tipX}, ${tipY})`}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setDrag({
                      kind: 'pull-xy',
                      start: { x: 180, y: 72 },
                      target: { x: 375, y: 116 },
                      onProgress: (pct) =>
                        setState((p) => ({ ...p, penjorBend: Math.max(p.penjorBend, pct) })),
                    });
                  }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <circle cx="0" cy="0" r="24" fill="#DD7930" stroke="#FAFBF6" strokeWidth="2.5" />
                  <text x="0" y="4" textAnchor="middle" fill="#FAFBF6" fontSize="10" fontWeight="700">Bend →</text>
                </g>
              ) : (
                <text x="300" y="250" textAnchor="middle" fill="#143D28" fontSize="13" fontWeight="700">
                  Graceful mountain arch curved! Click Next Step →
                </text>
              )}
            </g>
          )}

          {step === 1 && (
            <g>
              <rect x="85" y="160" width="390" height="106" rx="10" fill="#B3D564" stroke="#143D28" strokeWidth="2" />
              {Array.from({ length: 10 }).map((_, i) => {
                const x = 108 + i * 36;
                const cut = ((x - 95) / 365) * 100 <= s.penjorCutPct;
                return cut ? (
                  <polygon key={i} points={`${x - 12},266 ${x},235 ${x + 12},266`} fill="#F4F6EE" stroke="#143D28" strokeWidth="1.1" />
                ) : null;
              })}
              <line x1="95" y1="250" x2="460" y2="250" stroke="#E2B334" strokeWidth="3" strokeDasharray="6 4" />
              {s.penjorCutPct < 94 ? (
                <g
                  transform={`translate(${95 + (s.penjorCutPct / 100) * 365}, 250)`}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setDrag({
                      kind: 'slide-x',
                      startX: 95,
                      endX: 460,
                      onProgress: (pct) =>
                        setState((p) => ({ ...p, penjorCutPct: Math.max(p.penjorCutPct, pct) })),
                    });
                  }}
                  className="cursor-ew-resize"
                >
                  <circle cx="0" cy="0" r="23" fill="#B65236" stroke="#FAFBF6" strokeWidth="2.4" />
                  <text x="0" y="5" textAnchor="middle" fill="#FAFBF6" fontSize="13">✂</text>
                  <text x="0" y="38" textAnchor="middle" fill="#143D28" fontSize="10.5" fontWeight="700">Slide Scissors →</text>
                </g>
              ) : (
                <text x="280" y="330" textAnchor="middle" fill="#143D28" fontSize="13" fontWeight="700">
                  Festival banner cut! Click Next Step →
                </text>
              )}
            </g>
          )}

          {step === 2 && (
            <g>
              <path d="M 180 385 L 180 185 Q 180 66, 375 116" fill="none" stroke="#82BC5E" strokeWidth="18" strokeLinecap="round" />
              {[
                { target: { x: 180, y: 315 }, start: { x: 430, y: 330 } },
                { target: { x: 180, y: 235 }, start: { x: 430, y: 255 } },
                { target: { x: 192, y: 155 }, start: { x: 430, y: 180 } },
              ].map((w, i) => (
                <g key={i}>
                  {s.penjorWraps[i] ? (
                    <rect x={w.target.x - 16} y={w.target.y - 22} width="32" height="44" rx="5" fill="#E2B334" stroke="#143D28" strokeWidth="1.5" />
                  ) : (
                    renderDropHandle(
                      `pwrap-${i}`,
                      `Wrap ${i + 1}`,
                      w.start,
                      w.target,
                      false,
                      '#0F764A',
                      () =>
                        commit((p) => {
                          const ws = [...p.penjorWraps];
                          ws[i] = true;
                          return { ...p, penjorWraps: ws };
                        }, `Wrapped janur band ${i + 1} onto the bamboo pole!`),
                      `Drag Wrap ${i + 1} onto the pole band!`,
                      `Band ${i + 1}`
                    )
                  )}
                </g>
              ))}
            </g>
          )}

          {step === 3 && (
            <g>
              <path d="M 180 385 L 180 185 Q 180 66, 375 116" fill="none" stroke="#4CA156" strokeWidth="18" strokeLinecap="round" />
              <path d="M 180 385 L 180 185 Q 180 66, 375 116" fill="none" stroke="#E2B334" strokeWidth="5" strokeDasharray="10 10" />
              {s.penjorDecor[0] && <circle cx="315" cy="96" r="22" fill="#BCE074" stroke="#143D28" strokeWidth="1.6" />}
              {s.penjorDecor[1] && <circle cx="265" cy="108" r="14" fill="#DD7930" stroke="#143D28" strokeWidth="1.5" />}
              {s.penjorDecor[2] && <path d="M 375 116 L 352 295 L 398 295 Z" fill="#E2B334" stroke="#143D28" strokeWidth="1.6" />}
              {[
                { name: 'Sampian', start: { x: 90, y: 120 }, target: { x: 315, y: 96 } },
                { name: 'Fruit', start: { x: 90, y: 210 }, target: { x: 265, y: 108 } },
                { name: 'Tassel', start: { x: 90, y: 300 }, target: { x: 375, y: 145 } },
              ].map((d, i) =>
                renderDropHandle(
                  `pdec-${i}`,
                  d.name,
                  d.start,
                  d.target,
                  s.penjorDecor[i],
                  i === 1 ? '#DD7930' : '#143D28',
                  () =>
                    commit((p) => {
                      const dec = [...p.penjorDecor];
                      dec[i] = true;
                      return { ...p, penjorDecor: dec };
                    }, `Hung ${d.name} onto the Penjor arch!`),
                  `Drag ${d.name} onto its hook at the top of the Penjor!`,
                  d.name
                )
              )}
            </g>
          )}
        </g>
      );
    }

    // 4. KEMBAR MAYANG
    if (craft.id === 'kembar-mayang') {
      return (
        <g>
          {step === 0 && (
            <g>
              <polygon points="215,270 345,270 326,375 234,375" fill="#B65236" stroke="#143D28" strokeWidth="2.2" />
              {s.kembarPotPlaced && (
                <rect x="232" y="232" width="96" height="38" rx="5" fill="#82BC5E" stroke="#143D28" strokeWidth="1.8" />
              )}
              {s.kembarSticks[0] && <line x1="258" y1="240" x2="248" y2="95" stroke="#8C6239" strokeWidth="5.5" strokeLinecap="round" />}
              {s.kembarSticks[1] && <line x1="302" y1="240" x2="312" y2="95" stroke="#8C6239" strokeWidth="5.5" strokeLinecap="round" />}
              {renderDropHandle(
                'kstem',
                'Stem Block',
                { x: 95, y: 300 },
                { x: 280, y: 250 },
                s.kembarPotPlaced,
                '#3B8E47',
                () => commit((p) => ({ ...p, kembarPotPlaced: true }), 'Placed soft banana-stem core in the clay pot!'),
                'Drag Stem Block into the clay pot!',
                'Pot'
              )}
              {s.kembarPotPlaced &&
                [0, 1].map((i) =>
                  renderDropHandle(
                    `kstick-${i}`,
                    `Stick ${i + 1}`,
                    { x: 460, y: 150 + i * 95 },
                    { x: 258 + i * 44, y: 175 },
                    s.kembarSticks[i],
                    '#8C6239',
                    () =>
                      commit((p) => {
                        const st = [...p.kembarSticks];
                        st[i] = true;
                        return { ...p, kembarSticks: st };
                      }, `Inserted Support Stick ${i + 1}!`),
                    `Drag Stick ${i + 1} upright into the green stem base!`,
                    `Stick ${i + 1}`
                  )
                )}
            </g>
          )}

          {step === 1 && (
            <g>
              {(() => {
                const spread = 135 - s.kembarPleats * 22;
                return (
                  <g transform="translate(280, 320)">
                    {[-3, -2, -1, 0, 1, 2, 3].map((idx) => (
                      <polygon
                        key={idx}
                        points={`0,0 ${(idx - 0.45) * (spread / 3)},-200 ${(idx + 0.45) * (spread / 3)},-200`}
                        fill={idx % 2 === 0 ? '#469650' : '#B3D564'}
                        stroke="#143D28"
                        strokeWidth="1.5"
                      />
                    ))}
                  </g>
                );
              })()}
              {s.kembarPleats < 3 ? (
                renderDropHandle(
                  'kpleat',
                  `Fold Pleat (${s.kembarPleats}/3)`,
                  { x: 455, y: 220 },
                  { x: 280, y: 220 },
                  false,
                  '#143D28',
                  () =>
                    commit(
                      (p) => ({ ...p, kembarPleats: Math.min(3, p.kembarPleats + 1) }),
                      `Folded fan pleat ${s.kembarPleats + 1}/3!`
                    ),
                  'Drag the Fold Pleat handle inward toward the center!',
                  'Fold In'
                )
              ) : (
                <text x="280" y="370" textAnchor="middle" fill="#143D28" fontSize="13" fontWeight="700">
                  Pleated Wedding Fan ready! Click Next Step →
                </text>
              )}
            </g>
          )}

          {step === 2 && (
            <g>
              <line x1="280" y1="75" x2="280" y2="365" stroke="#8C6239" strokeWidth="6" strokeLinecap="round" />
              {Array.from({ length: s.kembarBraids }).map((_, i) => (
                <polygon
                  key={i}
                  points={`280,${315 - i * 48} 252,${292 - i * 48} 280,${270 - i * 48} 308,${292 - i * 48}`}
                  fill={i % 2 === 0 ? '#BCE074' : '#469650'}
                  stroke="#143D28"
                  strokeWidth="1.6"
                />
              ))}
              {s.kembarBraids < 4 ? (
                renderDropHandle(
                  'kbraid',
                  `Braid Wave ${s.kembarBraids + 1}`,
                  { x: s.kembarBraids % 2 === 0 ? 120 : 440, y: 295 - s.kembarBraids * 42 },
                  { x: 280, y: 285 - s.kembarBraids * 44 },
                  false,
                  s.kembarBraids % 2 === 0 ? '#3B8E47' : '#0F764A',
                  () =>
                    commit(
                      (p) => ({ ...p, kembarBraids: Math.min(4, p.kembarBraids + 1) }),
                      `Braided wave ${s.kembarBraids + 1}/4 on the Keris!`
                    ),
                  'Drag the green strip end onto the stick to braid a wave!',
                  'Braid'
                )
              ) : (
                <text x="280" y="400" textAnchor="middle" fill="#143D28" fontSize="13" fontWeight="700">
                  Wavy Janur Keris complete! Click Next Step →
                </text>
              )}
            </g>
          )}

          {step === 3 && (
            <g>
              <polygon points="222,290 338,290 322,382 238,382" fill="#B65236" stroke="#143D28" strokeWidth="2" />
              <rect x="236" y="258" width="88" height="32" rx="4" fill="#82BC5E" stroke="#143D28" strokeWidth="1.5" />
              {s.kembarAssembled[0] && (
                <path d="M 280 258 L 210 115 L 254 96 L 280 258 L 306 96 L 350 115 Z" fill="#469650" stroke="#143D28" strokeWidth="1.5" />
              )}
              {s.kembarAssembled[1] && (
                <path d="M 280 258 L 266 196 L 280 158 L 294 196 Z" fill="#BCE074" stroke="#143D28" strokeWidth="1.6" />
              )}
              {s.kembarAssembled[2] && (
                <g transform="translate(228, 212)">
                  <ellipse cx="0" cy="0" rx="18" ry="11" fill="#E2B334" stroke="#143D28" strokeWidth="1.4" />
                  <polygon points="-16,-2 -28,-8 -18,4" fill="#DD7930" />
                </g>
              )}
              {s.kembarAssembled[3] && (
                <g>
                  <path d="M 244 258 Q 160 190, 150 130" fill="none" stroke="#82BC5E" strokeWidth="9" strokeLinecap="round" />
                  <path d="M 316 258 Q 400 190, 410 130" fill="none" stroke="#82BC5E" strokeWidth="9" strokeLinecap="round" />
                </g>
              )}
              {[
                { name: 'Fan', start: { x: 88, y: 100 }, target: { x: 280, y: 138 } },
                { name: 'Keris', start: { x: 472, y: 100 }, target: { x: 280, y: 205 } },
                { name: 'Bird', start: { x: 88, y: 220 }, target: { x: 228, y: 212 } },
                { name: 'Sprays', start: { x: 472, y: 220 }, target: { x: 350, y: 200 } },
              ].map((pItem, i) =>
                renderDropHandle(
                  `kassem-${i}`,
                  pItem.name,
                  pItem.start,
                  pItem.target,
                  s.kembarAssembled[i],
                  '#143D28',
                  () =>
                    commit((p) => {
                      const arr = [...p.kembarAssembled];
                      arr[i] = true;
                      return { ...p, kembarAssembled: arr };
                    }, `Placed ${pItem.name} into the Kembar Mayang bouquet!`),
                  `Drag ${pItem.name} into its glowing spot on the bouquet!`,
                  pItem.name
                )
              )}
            </g>
          )}
        </g>
      );
    }

    // 5. MODERN WOVEN JANUR LAMP SHADE
    if (craft.id === 'contemporary-janur-installation') {
      const ribXs = [190, 250, 310, 370];
      return (
        <g>
          {step === 0 && (
            <g>
              {s.lampRings[0] && <ellipse cx="280" cy="116" rx="125" ry="24" fill="none" stroke="#8C6239" strokeWidth="6" />}
              {s.lampRings[1] && <ellipse cx="280" cy="316" rx="125" ry="24" fill="none" stroke="#8C6239" strokeWidth="6" />}
              {s.lampRibs.map((ok, i) =>
                ok ? (
                  <rect key={i} x={ribXs[i] - 13} y="116" width="26" height="200" rx="4" fill="#3B8E47" stroke="#143D28" strokeWidth="1.4" />
                ) : null
              )}
              {renderDropHandle(
                'lring0',
                'Top Ring',
                { x: 92, y: 116 },
                { x: 280, y: 116 },
                s.lampRings[0],
                '#8C6239',
                () =>
                  commit((p) => {
                    const r = [...p.lampRings];
                    r[0] = true;
                    return { ...p, lampRings: r };
                  }, 'Placed Top Bamboo Ring!'),
                'Drag Top Ring into the top dashed ring!',
                'Top Ring'
              )}
              {renderDropHandle(
                'lring1',
                'Bottom Ring',
                { x: 92, y: 316 },
                { x: 280, y: 316 },
                s.lampRings[1],
                '#8C6239',
                () =>
                  commit((p) => {
                    const r = [...p.lampRings];
                    r[1] = true;
                    return { ...p, lampRings: r };
                  }, 'Placed Bottom Bamboo Ring!'),
                'Drag Bottom Ring into the bottom dashed ring!',
                'Bottom Ring'
              )}
              {s.lampRings.every(Boolean) &&
                ribXs.map((rx, i) =>
                  renderDropHandle(
                    `lrib-${i}`,
                    `Rib ${i + 1}`,
                    { x: 472, y: 110 + i * 70 },
                    { x: rx, y: 216 },
                    s.lampRibs[i],
                    '#0F764A',
                    () =>
                      commit((p) => {
                        const rb = [...p.lampRibs];
                        rb[i] = true;
                        return { ...p, lampRibs: rb };
                      }, `Attached vertical rib ${i + 1}/4!`),
                    `Drag Rib ${i + 1} onto the bamboo cylinder frame!`,
                    `Rib ${i + 1}`
                  )
                )}
            </g>
          )}

          {step === 1 && (
            <g>
              <ellipse cx="280" cy="108" rx="132" ry="22" fill="none" stroke="#8C6239" strokeWidth="5" />
              <ellipse cx="280" cy="322" rx="132" ry="22" fill="none" stroke="#8C6239" strokeWidth="5" />
              {ribXs.map((x) => (
                <rect key={x} x={x - 16} y="108" width="32" height="214" fill="#3B8E47" stroke="#143D28" strokeWidth="1.4" />
              ))}
              {[178, 252].map((cy, r) => (
                <g key={cy}>
                  <rect x="142" y={cy - 18} width="276" height="36" rx="4" fill="#B3D564" stroke="#0F764A" strokeWidth="1.4" />
                  {ribXs.map((cx, c) => {
                    const m = s.lampWeave[r][c];
                    const matches = m === LAMP_TARGET[r][c];
                    return (
                      <g
                        key={`${r}-${c}`}
                        onClick={() =>
                          commit((p) => {
                            const next = p.lampWeave.map((row, ri) =>
                              row.map((val, ci) =>
                                ri === r && ci === c ? (val === 'over' ? 'under' : 'over') : val
                              )
                            );
                            return { ...p, lampWeave: next };
                          }, 'Switched lamp weave! Keep alternating OVER and UNDER.')
                        }
                        className="cursor-pointer"
                      >
                        <rect
                          x={cx - 19}
                          y={cy - 19}
                          width="38"
                          height="38"
                          rx="3"
                          fill={m === 'over' ? '#BCE074' : '#2A6D37'}
                          stroke={showHint && !matches ? '#DD7930' : '#143D28'}
                          strokeWidth={showHint && !matches ? '3' : '1.6'}
                        />
                        <text x={cx} y={cy + 4} textAnchor="middle" fill={m === 'over' ? '#132219' : '#FAFBF6'} fontSize="8.5" fontWeight="700">
                          {m.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </g>
              ))}
            </g>
          )}

          {step === 2 && (
            <g>
              <rect x="160" y="105" width="240" height="225" rx="14" fill="#469650" stroke="#143D28" strokeWidth="2" />
              {[0, 1, 2].map((r) =>
                [0, 1, 2, 3].map((c) => (
                  <rect key={`${r}-${c}`} x={176 + c * 54} y={122 + r * 62} width="46" height="48" rx="4" fill={(r + c) % 2 === 0 ? '#BCE074' : '#3B8E47'} stroke="#143D28" strokeWidth="1.2" />
                ))
              )}
              {[190, 370].map((px, xi) =>
                [112, 316].map((py, yi) => {
                  const idx = yi * 2 + xi;
                  return s.lampPins[idx] ? (
                    <circle key={idx} cx={px} cy={py} r="11" fill="#8C6239" stroke="#FAFBF6" strokeWidth="2" />
                  ) : (
                    renderDropHandle(
                      `lpin-${idx}`,
                      `Pin ${idx + 1}`,
                      { x: xi === 0 ? 78 : 482, y: py },
                      { x: px, y: py },
                      false,
                      '#8C6239',
                      () =>
                        commit((p) => {
                          const pins = [...p.lampPins];
                          pins[idx] = true;
                          return { ...p, lampPins: pins };
                        }, `Pinned rim joint ${idx + 1}/4!`),
                      `Drag Pin ${idx + 1} onto the rim corner!`,
                      `Pin ${idx + 1}`
                    )
                  );
                })
              )}
              {s.lampPins.every(Boolean) && (
                <g>
                  <line x1="150" y1="342" x2="410" y2="342" stroke="#E2B334" strokeWidth="3" strokeDasharray="6 4" />
                  {s.lampTrimPct < 94 ? (
                    <g
                      transform={`translate(${150 + (s.lampTrimPct / 100) * 260}, 342)`}
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        setDrag({
                          kind: 'slide-x',
                          startX: 150,
                          endX: 410,
                          onProgress: (pct) =>
                            setState((p) => ({ ...p, lampTrimPct: Math.max(p.lampTrimPct, pct) })),
                        });
                      }}
                      className="cursor-ew-resize"
                    >
                      <circle cx="0" cy="0" r="22" fill="#B65236" stroke="#FAFBF6" strokeWidth="2" />
                      <text x="0" y="5" textAnchor="middle" fill="#FAFBF6" fontSize="13">✂</text>
                    </g>
                  ) : (
                    <text x="280" y="378" textAnchor="middle" fill="#143D28" fontSize="12.5" fontWeight="700">
                      Bottom rim trimmed clean! Click Next Step →
                    </text>
                  )}
                </g>
              )}
            </g>
          )}

          {step === 3 && (
            <g>
              {s.lampBulbPlaced && <circle cx="280" cy="220" r="145" fill="#E2B334" fillOpacity="0.24" />}
              <rect x="172" y="102" width="216" height="236" rx="16" fill="#469650" stroke="#143D28" strokeWidth="2.2" />
              {[0, 1, 2].map((r) =>
                [0, 1, 2, 3].map((c) => (
                  <rect
                    key={`${r}-${c}`}
                    x={186 + c * 48}
                    y={122 + r * 66}
                    width="42"
                    height="52"
                    rx="4"
                    fill={
                      s.lampBulbPlaced
                        ? (r + c) % 2 === 0
                          ? '#FDF5DB'
                          : '#E2B334'
                        : (r + c) % 2 === 0
                        ? '#BCE074'
                        : '#3B8E47'
                    }
                    stroke="#143D28"
                    strokeWidth="1.2"
                  />
                ))
              )}
              {s.lampBulbPlaced ? (
                <g>
                  <line x1="280" y1="20" x2="280" y2="188" stroke="#143D28" strokeWidth="3.5" />
                  <circle cx="280" cy="212" r="26" fill="#FDF5DB" stroke="#E2B334" strokeWidth="3" />
                </g>
              ) : (
                renderDropHandle(
                  'lbulb',
                  'LED Bulb',
                  { x: 90, y: 215 },
                  { x: 280, y: 215 },
                  false,
                  '#DD7930',
                  () => commit((p) => ({ ...p, lampBulbPlaced: true }), 'Warm LED light glows through your woven janur shade!'),
                  'Drag the Warm LED Bulb into the center of the lamp shade!',
                  'Center'
                )
              )}
            </g>
          )}
        </g>
      );
    }

    // 6. KETUPAT & LEPET HOLIDAY PLATE
    if (craft.id === 'ketupat-and-lepet') {
      return (
        <g>
          {step === 0 && (
            <g>
              {(() => {
                const widthShrink = (s.lepetRollPct / 100) * 165;
                return (
                  <g>
                    <rect
                      x={115 + widthShrink * 0.45}
                      y="135"
                      width={330 - widthShrink}
                      height="170"
                      rx={12 + (s.lepetRollPct / 100) * 18}
                      fill="#82BC5E"
                      stroke="#143D28"
                      strokeWidth="2"
                      filter="url(#wDrop)"
                    />
                    <line
                      x1={140 + widthShrink * 0.45}
                      y1="220"
                      x2={425 - widthShrink * 0.55}
                      y2="220"
                      stroke="#BCE074"
                      strokeWidth="3"
                      strokeDasharray="8 6"
                    />
                  </g>
                );
              })()}
              {s.lepetRollPct < 94 ? (
                <g
                  transform={`translate(${445 - (s.lepetRollPct / 100) * 145}, 220)`}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setDrag({
                      kind: 'pull-xy',
                      start: { x: 445, y: 220 },
                      target: { x: 300, y: 220 },
                      onProgress: (pct) =>
                        setState((p) => ({ ...p, lepetRollPct: Math.max(p.lepetRollPct, pct) })),
                    });
                  }}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <circle cx="0" cy="0" r="24" fill="#143D28" stroke="#FAFBF6" strokeWidth="2.5" />
                  <text x="0" y="4" textAnchor="middle" fill="#FAFBF6" fontSize="10" fontWeight="700">Roll ↺</text>
                </g>
              ) : (
                <text x="280" y="365" textAnchor="middle" fill="#143D28" fontSize="13" fontWeight="700">
                  Hollow green leaf tube rolled! Click Next Step →
                </text>
              )}
            </g>
          )}

          {step === 1 && (
            <g>
              <rect x="205" y="135" width="150" height="225" rx="22" fill="#82BC5E" stroke="#143D28" strokeWidth="2.2" />
              <ellipse cx="280" cy="142" rx="68" ry="18" fill="#E8F5E9" stroke="#143D28" strokeWidth="1.8" />
              {s.lepetScoops > 0 && (
                <rect x="218" y={340 - s.lepetScoops * 60} width="124" height={s.lepetScoops * 60} rx="12" fill="#FAFBF6" fillOpacity="0.92" stroke="#B5D2AF" strokeWidth="1.4" />
              )}
              {[0, 1, 2].map((i) =>
                renderDropHandle(
                  `lscoop-${i}`,
                  `Scoop ${i + 1}`,
                  { x: 96, y: 120 + i * 90 },
                  { x: 280, y: 142 },
                  i < s.lepetScoops,
                  '#8C6239',
                  () =>
                    commit(
                      (p) => ({ ...p, lepetScoops: Math.min(3, p.lepetScoops + 1) }),
                      `Scooped sticky rice & peanuts (${s.lepetScoops + 1}/3)!`
                    ),
                  'Drag Scoop into the open top of the green leaf tube!',
                  'Fill Top'
                )
              )}
            </g>
          )}

          {step === 2 && (
            <g>
              <rect x="135" y="175" width="290" height="86" rx="18" fill="#82BC5E" stroke="#143D28" strokeWidth="2.2" />
              {s.lepetCaps[0] && <rect x="128" y="175" width="28" height="86" rx="8" fill="#469650" stroke="#143D28" strokeWidth="1.6" />}
              {s.lepetCaps[1] && <rect x="404" y="175" width="28" height="86" rx="8" fill="#469650" stroke="#143D28" strokeWidth="1.6" />}
              {[205, 280, 355].map((tx, i) =>
                s.lepetTies[i] ? (
                  <rect key={tx} x={tx - 5} y="172" width="10" height="92" rx="3" fill="#8C6239" stroke="#143D28" strokeWidth="1.2" />
                ) : null
              )}
              {renderDropHandle(
                'lcap0',
                'Fold Left',
                { x: 74, y: 218 },
                { x: 142, y: 218 },
                s.lepetCaps[0],
                '#143D28',
                () =>
                  commit((p) => {
                    const c = [...p.lepetCaps];
                    c[0] = true;
                    return { ...p, lepetCaps: c };
                  }, 'Folded left end closed!'),
                'Drag Fold Left onto the left tube end!',
                'Left End'
              )}
              {renderDropHandle(
                'lcap1',
                'Fold Right',
                { x: 486, y: 218 },
                { x: 418, y: 218 },
                s.lepetCaps[1],
                '#143D28',
                () =>
                  commit((p) => {
                    const c = [...p.lepetCaps];
                    c[1] = true;
                    return { ...p, lepetCaps: c };
                  }, 'Folded right end closed!'),
                'Drag Fold Right onto the right tube end!',
                'Right End'
              )}
              {s.lepetCaps.every(Boolean) &&
                [205, 280, 355].map((tx, i) =>
                  renderDropHandle(
                    `ltie-${i}`,
                    `Tie ${i + 1}`,
                    { x: tx, y: 345 },
                    { x: tx, y: 218 },
                    s.lepetTies[i],
                    '#8C6239',
                    () =>
                      commit((p) => {
                        const t = [...p.lepetTies];
                        t[i] = true;
                        return { ...p, lepetTies: t };
                      }, `Tied bamboo string ${i + 1}/3 around Lepet!`),
                    `Drag Tie ${i + 1} onto the Lepet tube!`,
                    `Tie ${i + 1}`
                  )
                )}
            </g>
          )}

          {step === 3 && (
            <g>
              <ellipse cx="280" cy="295" rx="185" ry="62" fill="#CFE4CA" stroke="#143D28" strokeWidth="2.2" />
              <text x="280" y="335" textAnchor="middle" fill="#143D28" fontSize="11.5" fontWeight="700">Holiday Serving Platter</text>
              {s.lepetPlated[0] && (
                <g transform="translate(210, 270) rotate(45)">
                  <rect x="-32" y="-32" width="64" height="64" rx="6" fill="#469650" stroke="#143D28" strokeWidth="1.8" />
                  <rect x="-28" y="-28" width="28" height="28" fill="#BCE074" />
                  <rect x="0" y="0" width="28" height="28" fill="#BCE074" />
                </g>
              )}
              {s.lepetPlated[1] && (
                <g transform="translate(348, 276)">
                  <rect x="-65" y="-24" width="130" height="48" rx="14" fill="#82BC5E" stroke="#143D28" strokeWidth="1.8" />
                  {[-32, 0, 32].map((x) => (
                    <line key={x} x1={x} y1="-24" x2={x} y2="24" stroke="#8C6239" strokeWidth="4" />
                  ))}
                </g>
              )}
              {s.lepetKetupatTight < 95 ? (
                <g>
                  <g transform={`translate(145, 118) scale(${1.18 - (s.lepetKetupatTight / 100) * 0.25}) rotate(45)`}>
                    <rect x="-34" y="-34" width="68" height="68" rx="8" fill="#3B8E47" stroke="#143D28" strokeWidth="2" />
                  </g>
                  <g
                    transform={`translate(145, ${188 + (s.lepetKetupatTight / 100) * 42})`}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      setDrag({
                        kind: 'pull-xy',
                        start: { x: 145, y: 188 },
                        target: { x: 145, y: 235 },
                        onProgress: (pct) =>
                          setState((p) => ({
                            ...p,
                            lepetKetupatTight: Math.max(p.lepetKetupatTight, pct),
                          })),
                      });
                    }}
                    className="cursor-ns-resize"
                  >
                    <rect x="-46" y="-14" width="92" height="28" rx="14" fill="#DD7930" stroke="#FAFBF6" strokeWidth="2" />
                    <text x="0" y="4" textAnchor="middle" fill="#FAFBF6" fontSize="10" fontWeight="700">Pull Tight ↓</text>
                  </g>
                </g>
              ) : (
                renderDropHandle(
                  'lplate0',
                  'Ketupat',
                  { x: 145, y: 120 },
                  { x: 210, y: 270 },
                  s.lepetPlated[0],
                  '#0F764A',
                  () =>
                    commit((p) => {
                      const pl = [...p.lepetPlated];
                      pl[0] = true;
                      return { ...p, lepetPlated: pl };
                    }, 'Served diamond Ketupat on the platter!'),
                  'Drag the tight Ketupat onto the left side of the platter!',
                  'Left Plate'
                )
              )}
              {renderDropHandle(
                'lplate1',
                'Lepet Roll',
                { x: 410, y: 120 },
                { x: 348, y: 276 },
                s.lepetPlated[1],
                '#3B8E47',
                () =>
                  commit((p) => {
                    const pl = [...p.lepetPlated];
                    pl[1] = true;
                    return { ...p, lepetPlated: pl };
                  }, 'Served tied Lepet beside Ketupat!'),
                'Drag the Lepet roll onto the right side of the platter!',
                'Right Plate'
              )}
            </g>
          )}
        </g>
      );
    }

    // 7. INDONESIAN JANUR CRAFT DISPLAY (EXHIBITION ENSEMBLE)
    if (craft.id === 'exhibition-ensemble') {
      return (
        <g>
          {step === 0 && (
            <g>
              <g transform="translate(280, 320)">
                {[-3, -2, -1, 0, 1, 2, 3].map((idx) => (
                  <polygon
                    key={idx}
                    points={`0,0 ${(idx - 0.4) * ((148 - s.ensPleats * 18) / 3)},-195 ${(idx + 0.4) * ((148 - s.ensPleats * 18) / 3)},-195`}
                    fill={idx % 2 === 0 ? '#469650' : '#BCE074'}
                    stroke="#143D28"
                    strokeWidth="1.4"
                  />
                ))}
              </g>
              {s.ensPleats < 4 ? (
                renderDropHandle(
                  'epleat',
                  `Add Pleat (${s.ensPleats}/4)`,
                  { x: 465, y: 205 },
                  { x: 280, y: 215 },
                  false,
                  '#143D28',
                  () =>
                    commit(
                      (p) => ({ ...p, ensPleats: Math.min(4, p.ensPleats + 1) }),
                      `Folded pleat ${s.ensPleats + 1}/4!`
                    ),
                  'Drag Add Pleat inward onto the fan!',
                  'Pleat'
                )
              ) : (
                renderDropHandle(
                  'efanpin',
                  'Pin Base',
                  { x: 110, y: 320 },
                  { x: 280, y: 320 },
                  s.ensFanPinned,
                  '#8C6239',
                  () => commit((p) => ({ ...p, ensFanPinned: true }), 'Pinned the fan base tight!'),
                  'Drag Pin Base onto the bottom handle of the fan!',
                  'Base'
                )
              )}
            </g>
          )}

          {step === 1 && (
            <g>
              <circle cx="280" cy="220" r="88" fill="none" stroke="#CFE4CA" strokeWidth="22" strokeDasharray="6 4" />
              {s.ensWreathParts[0] && <path d="M 192 220 A 88 88 0 0 1 280 132" fill="none" stroke="#469650" strokeWidth="24" strokeLinecap="round" />}
              {s.ensWreathParts[1] && <path d="M 280 132 A 88 88 0 0 1 368 220" fill="none" stroke="#BCE074" strokeWidth="24" strokeLinecap="round" />}
              {s.ensWreathParts[2] && <path d="M 368 220 A 88 88 0 0 1 280 308" fill="none" stroke="#469650" strokeWidth="24" strokeLinecap="round" />}
              {s.ensWreathParts[3] && <path d="M 280 308 A 88 88 0 0 1 192 220" fill="none" stroke="#BCE074" strokeWidth="24" strokeLinecap="round" />}
              {[
                { start: { x: 86, y: 110 }, target: { x: 215, y: 155 } },
                { start: { x: 474, y: 110 }, target: { x: 345, y: 155 } },
                { start: { x: 474, y: 330 }, target: { x: 345, y: 285 } },
                { start: { x: 86, y: 330 }, target: { x: 215, y: 285 } },
              ].map((w, i) =>
                renderDropHandle(
                  `ewreath-${i}`,
                  `Part ${i + 1}`,
                  w.start,
                  w.target,
                  s.ensWreathParts[i],
                  i % 2 === 0 ? '#3B8E47' : '#0F764A',
                  () =>
                    commit((p) => {
                      const arr = [...p.ensWreathParts];
                      arr[i] = true;
                      return { ...p, ensWreathParts: arr };
                    }, `Locked wreath arc ${i + 1}/4!`),
                  `Drag Part ${i + 1} onto its glowing arc on the ring!`,
                  `Arc ${i + 1}`
                )
              )}
            </g>
          )}

          {step === 2 && (
            <g>
              {[
                { cx: 190, val: s.ensCutLeft, key: 'left' as const },
                { cx: 370, val: s.ensCutRight, key: 'right' as const },
              ].map((rib, idx) => (
                <g key={rib.key}>
                  <path
                    d={
                      rib.val >= 92
                        ? `M ${rib.cx - 42} 105 L ${rib.cx + 42} 105 L ${rib.cx + 42} 335 L ${rib.cx} 285 L ${rib.cx - 42} 335 Z`
                        : `M ${rib.cx - 42} 105 L ${rib.cx + 42} 105 L ${rib.cx + 42} 335 L ${rib.cx - 42} 335 Z`
                    }
                    fill={idx === 0 ? '#469650' : '#B3D564'}
                    stroke="#143D28"
                    strokeWidth="2"
                  />
                  {rib.val < 92 ? (
                    <g
                      transform={`translate(${rib.cx - 42 + (rib.val / 100) * 84}, 315)`}
                      onPointerDown={(e) => {
                        e.stopPropagation();
                        setDrag({
                          kind: 'slide-x',
                          startX: rib.cx - 42,
                          endX: rib.cx + 42,
                          onProgress: (pct) =>
                            setState((p) =>
                              rib.key === 'left'
                                ? { ...p, ensCutLeft: Math.max(p.ensCutLeft, pct) }
                                : { ...p, ensCutRight: Math.max(p.ensCutRight, pct) }
                            ),
                        });
                      }}
                      className="cursor-ew-resize"
                    >
                      <circle cx="0" cy="0" r="22" fill="#B65236" stroke="#FAFBF6" strokeWidth="2.2" />
                      <text x="0" y="5" textAnchor="middle" fill="#FAFBF6" fontSize="13">✂</text>
                      <text x="0" y="36" textAnchor="middle" fill="#143D28" fontSize="10" fontWeight="700">Snip V →</text>
                    </g>
                  ) : (
                    <text x={rib.cx} y="360" textAnchor="middle" fill="#143D28" fontSize="11.5" fontWeight="700">
                      V-Tip Cut ✓
                    </text>
                  )}
                </g>
              ))}
            </g>
          )}

          {step === 3 && (
            <g>
              <ellipse cx="280" cy="308" rx="195" ry="62" fill="#EFE8D8" stroke="#8C6239" strokeWidth="2.2" />
              {s.ensDisplayPlaced[1] && (
                <path d="M 370 288 L 325 145 L 365 130 L 370 288 L 385 130 L 420 145 Z" fill="#469650" stroke="#143D28" strokeWidth="1.6" />
              )}
              {s.ensDisplayPlaced[0] && <circle cx="245" cy="215" r="56" fill="none" stroke="#82BC5E" strokeWidth="20" />}
              {s.ensDisplayPlaced[2] && (
                <g transform="translate(148, 285) rotate(45)">
                  <rect x="-26" y="-26" width="52" height="52" rx="6" fill="#BCE074" stroke="#143D28" strokeWidth="1.8" />
                </g>
              )}
              {[
                { name: 'Wreath', start: { x: 85, y: 100 }, target: { x: 245, y: 215 } },
                { name: 'Fan', start: { x: 475, y: 100 }, target: { x: 370, y: 195 } },
                { name: 'Ketupat', start: { x: 85, y: 215 }, target: { x: 148, y: 285 } },
              ].map((d, i) =>
                renderDropHandle(
                  `edisp-${i}`,
                  d.name,
                  d.start,
                  d.target,
                  s.ensDisplayPlaced[i],
                  '#143D28',
                  () =>
                    commit((p) => {
                      const arr = [...p.ensDisplayPlaced];
                      arr[i] = true;
                      return { ...p, ensDisplayPlaced: arr };
                    }, `Placed ${d.name} onto the cultural exhibition mat!`),
                  `Drag ${d.name} onto its matching spot on the mat!`,
                  d.name
                )
              )}
            </g>
          )}
        </g>
      );
    }

    // 8. BELALANG JANUR (WOVEN LEAF GRASSHOPPER)
    return (
      <g>
        {step === 0 && (
          <g>
            <line x1="180" y1="220" x2="380" y2="220" stroke="#CFE4CA" strokeWidth="14" strokeDasharray="6 4" />
            <line x1="280" y1="120" x2="280" y2="320" stroke="#CFE4CA" strokeWidth="14" strokeDasharray="6 4" />
            {s.bugStripsPlaced[0] && <rect x="145" y="206" width="270" height="28" rx="6" fill="#469650" stroke="#143D28" strokeWidth="1.8" />}
            {s.bugStripsPlaced[1] && <rect x="266" y="100" width="28" height="240" rx="6" fill="#B3D564" stroke="#0F764A" strokeWidth="1.8" />}
            {s.bugHeadLocked && (
              <g transform="translate(280, 220) rotate(45)">
                <rect x="-24" y="-24" width="48" height="48" rx="6" fill="#3B8E47" stroke="#143D28" strokeWidth="2" />
              </g>
            )}
            {renderDropHandle(
              'bst0',
              'Strip A',
              { x: 90, y: 120 },
              { x: 280, y: 220 },
              s.bugStripsPlaced[0],
              '#3B8E47',
              () =>
                commit((p) => {
                  const arr = [...p.bugStripsPlaced];
                  arr[0] = true;
                  return { ...p, bugStripsPlaced: arr };
                }, 'Laid Strip A horizontally across the center!'),
              'Drag Strip A onto the center (+) cross!',
              'Center'
            )}
            {renderDropHandle(
              'bst1',
              'Strip B',
              { x: 470, y: 120 },
              { x: 280, y: 220 },
              s.bugStripsPlaced[1],
              '#0F764A',
              () =>
                commit((p) => {
                  const arr = [...p.bugStripsPlaced];
                  arr[1] = true;
                  return { ...p, bugStripsPlaced: arr };
                }, 'Crossed Strip B vertically! Now lock the head.'),
              'Drag Strip B onto the center (+) cross!',
              'Center'
            )}
            {s.bugStripsPlaced.every(Boolean) &&
              renderDropHandle(
                'block',
                'Lock Head',
                { x: 280, y: 78 },
                { x: 280, y: 220 },
                s.bugHeadLocked,
                '#DD7930',
                () => commit((p) => ({ ...p, bugHeadLocked: true }), 'Locked the grasshopper diamond head!'),
                'Pull Lock Head down onto the crossed strips!',
                'Lock'
              )}
          </g>
        )}

        {step === 1 && (
          <g>
            <g transform="translate(150, 220) rotate(45)">
              <rect x="-22" y="-22" width="44" height="44" rx="5" fill="#469650" stroke="#143D28" strokeWidth="1.8" />
            </g>
            {Array.from({ length: s.bugBraids }).map((_, i) => (
              <rect
                key={i}
                x={178 + i * 38}
                y={202 + i * 2}
                width="36"
                height={36 - i * 2}
                rx="4"
                fill={i % 2 === 0 ? '#469650' : '#BCE074'}
                stroke="#143D28"
                strokeWidth="1.6"
              />
            ))}
            {s.bugBraids < 5 ? (
              renderDropHandle(
                'bbraid',
                s.bugBraids % 2 === 0 ? 'Fold Top' : 'Fold Bottom',
                { x: 185 + s.bugBraids * 36, y: s.bugBraids % 2 === 0 ? 115 : 325 },
                { x: 196 + s.bugBraids * 38, y: 220 },
                false,
                s.bugBraids % 2 === 0 ? '#3B8E47' : '#0F764A',
                () =>
                  commit(
                    (p) => ({ ...p, bugBraids: Math.min(5, p.bugBraids + 1) }),
                    `Braided body segment ${s.bugBraids + 1}/5!`
                  ),
                'Drag the strip tip inward onto the body line!',
                `Seg ${s.bugBraids + 1}`
              )
            ) : (
              <text x="280" y="340" textAnchor="middle" fill="#143D28" fontSize="13" fontWeight="700">
                5-segment body braided! Click Next Step →
              </text>
            )}
          </g>
        )}

        {step === 2 && (
          <g>
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={178 + i * 36} y={206 + i * 2} width="34" height={34 - i * 2} rx="4" fill={i % 2 === 0 ? '#469650' : '#BCE074'} stroke="#143D28" strokeWidth="1.4" />
            ))}
            {[0, 1].map((i) =>
              s.bugLegs[i] ? (
                <path
                  key={i}
                  d={`M ${290 + i * 22} 225 L ${342 + i * 20} ${128 + i * 10} L ${405 + i * 16} 290`}
                  fill="none"
                  stroke={i === 0 ? '#0F764A' : '#3B8E47'}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                renderDropHandle(
                  `bleg-${i}`,
                  `Back Leg ${i + 1}`,
                  { x: 350 + i * 35, y: 325 },
                  { x: 342 + i * 20, y: 128 + i * 10 },
                  false,
                  '#0F764A',
                  () =>
                    commit((p) => {
                      const legs = [...p.bugLegs];
                      legs[i] = true;
                      return { ...p, bugLegs: legs };
                    }, `Bent V-shaped jumping leg ${i + 1}/2!`),
                  `Drag Back Leg ${i + 1} up to its dashed knee point!`,
                  `Knee ${i + 1}`
                )
              )
            )}
          </g>
        )}

        {step === 3 && (
          <g>
            <ellipse cx="280" cy="306" rx="185" ry="52" fill="#EFE8D8" stroke="#8C6239" strokeWidth="2" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x={200 + i * 34} y={232 + i * 2} width="32" height={32 - i * 2} rx="4" fill={i % 2 === 0 ? '#469650' : '#BCE074'} stroke="#143D28" strokeWidth="1.4" />
            ))}
            <path d="M 300 248 L 350 165 L 408 292" fill="none" stroke="#0F764A" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            {s.bugFeelers[0] && <path d="M 200 240 C 148 188, 128 135, 162 122" fill="none" stroke="#143D28" strokeWidth="4.5" strokeLinecap="round" />}
            {s.bugFeelers[1] && <path d="M 200 250 C 138 205, 114 156, 146 144" fill="none" stroke="#0F764A" strokeWidth="4.5" strokeLinecap="round" />}
            {s.bugSplitPct < 92 ? (
              <g>
                <line x1="120" y1="244" x2="205" y2="244" stroke="#E2B334" strokeWidth="3" strokeDasharray="5 4" />
                <g
                  transform={`translate(${120 + (s.bugSplitPct / 100) * 85}, 244)`}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    setDrag({
                      kind: 'slide-x',
                      startX: 120,
                      endX: 205,
                      onProgress: (pct) =>
                        setState((p) => ({ ...p, bugSplitPct: Math.max(p.bugSplitPct, pct) })),
                    });
                  }}
                  className="cursor-ew-resize"
                >
                  <circle cx="0" cy="0" r="21" fill="#B65236" stroke="#FAFBF6" strokeWidth="2.2" />
                  <text x="0" y="5" textAnchor="middle" fill="#FAFBF6" fontSize="13">✂</text>
                  <text x="0" y="-27" textAnchor="middle" fill="#143D28" fontSize="10" fontWeight="700">Snip Feelers →</text>
                </g>
              </g>
            ) : (
              [0, 1].map((i) =>
                renderDropHandle(
                  `bfeel-${i}`,
                  `Feeler ${i + 1}`,
                  { x: 112 + i * 35, y: 245 + i * 32 },
                  { x: 158 - i * 16, y: 125 + i * 20 },
                  s.bugFeelers[i],
                  '#143D28',
                  () =>
                    commit((p) => {
                      const fl = [...p.bugFeelers];
                      fl[i] = true;
                      return { ...p, bugFeelers: fl };
                    }, `Curled feeler ${i + 1}/2 nicely!`),
                  `Drag Feeler ${i + 1} upward into a graceful curl!`,
                  `Curl ${i + 1}`
                )
              )
            )}
          </g>
        )}
      </g>
    );
  };

  if (showFinishedCard && overallProgress === 100) {
    return (
      <div className="space-y-4">
        <FinishedCraftShowcase
          craft={craft}
          onTryAgain={() => setConfirmResetOpen(true)}
          onChooseAnother={onChooseAnother}
        />

        {confirmResetOpen && (
          <div className="bg-[#FDF5DB] border-2 border-[#DD7930] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-5 h-5 text-[#B65236] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#132219]">
                  Start {craft.indonesianName} over from Step 1?
                </p>
                <p className="text-xs text-[#3F5749]">
                  Your completed craft will be cleared so you can make it again.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setConfirmResetOpen(false)}
                className="px-4 py-2 text-xs font-medium bg-[#FAFBF6] border border-[#B5D2AF] text-[#132219] rounded-lg hover:bg-[#E8F5E9] cursor-pointer"
              >
                Keep Finished Craft
              </button>
              <button
                type="button"
                onClick={performReset}
                className="px-4 py-2 text-xs font-semibold bg-[#B65236] text-white rounded-lg hover:bg-[#933E27] cursor-pointer"
              >
                Yes, Reset Craft
              </button>
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowFinishedCard(false)}
            className="text-xs font-semibold text-[#0F764A] hover:underline cursor-pointer"
          >
            Back to Craft Mat View
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Top 4-Step Progress Bar */}
      <div className="bg-gradient-to-r from-[#E8F5E9] via-[#FAFBF6] to-[#FDF5DB]/75 border border-[#B5D2AF] rounded-xl p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <KetupatDiamondIcon className="w-5 h-5 shrink-0" />
            <span className="font-semibold text-[#143D28]">
              {craft.indonesianName} Progress: Step {state.step + 1} of {craft.steps.length}
            </span>
          </div>
          <span className="font-mono tabular-nums text-[#0F764A] bg-[#FAFBF6] border border-[#B5D2AF] px-2.5 py-0.5 rounded-md font-semibold">
            {overallProgress}% Complete
          </span>
        </div>

        <div className="w-full h-2.5 bg-[#CFE4CA] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#0F764A] via-[#3B8E47] to-[#E2B334] transition-all duration-300"
            style={{ width: `${Math.max(8, overallProgress)}%` }}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {craft.steps.map((st, idx) => {
            const active = state.step === idx;
            const done = isStepDone(craft.id, state, idx);
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => goToStep(idx)}
                className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors flex items-center justify-between gap-1 cursor-pointer ${
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

      {/* Confirmation Banner when resetting a completed craft */}
      {confirmResetOpen && (
        <div className="bg-[#FDF5DB] border-2 border-[#DD7930] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-[#B65236] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#132219]">
                Reset completed craft?
              </p>
              <p className="text-xs text-[#3F5749]">
                You already completed {craft.indonesianName}. Clearing it will take you back to Step 1.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setConfirmResetOpen(false)}
              className="px-4 py-2 text-xs font-medium bg-[#FAFBF6] border border-[#B5D2AF] text-[#132219] rounded-lg hover:bg-[#E8F5E9] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={performReset}
              className="px-4 py-2 text-xs font-semibold bg-[#B65236] text-white rounded-lg hover:bg-[#933E27] cursor-pointer"
            >
              Yes, Reset
            </button>
          </div>
        </div>
      )}

      {/* Main 2-Zone Workspace (Craft Mat + Step Guide) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* CENTER / LEFT CRAFT MAT */}
        <section className="lg:col-span-8 space-y-3">
          <div className="bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#143D28] inline-flex items-center gap-2">
              <JanurLeafIcon className="w-4 h-4" />
              <span>Craft Mat · {currentStepMeta.title}</span>
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#FAFBF6] border border-[#B5D2AF] text-[#0F764A] font-semibold">
              {mode === 'learn' ? 'Learn Mode' : 'Free Practice Mode'}
            </span>
          </div>

          <div className="relative rounded-xl border-2 border-[#B5D2AF] bg-[#E5F0E3] overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col items-center justify-center p-3 sm:p-4 select-none touch-none">
            <svg
              ref={svgRef}
              viewBox="0 0 560 440"
              className="w-full max-w-[580px] h-auto touch-none"
              role="img"
              aria-label={`Interactive 2D craft mat for ${craft.title}`}
            >
              <defs>
                <pattern id="workshopBambooMat" width="24" height="24" patternUnits="userSpaceOnUse">
                  <rect width="24" height="24" fill="#F4F6EE" />
                  <rect x="0" y="0" width="11" height="11" fill="#E8EEDF" rx="1.5" />
                  <rect x="12" y="12" width="11" height="11" fill="#E8EEDF" rx="1.5" />
                </pattern>
                <filter id="wDrop" x="-15%" y="-15%" width="135%" height="135%">
                  <feDropShadow dx="1.5" dy="2.5" stdDeviation="2.5" floodColor="#132219" floodOpacity="0.2" />
                </filter>
              </defs>

              <rect
                x="10"
                y="10"
                width="540"
                height="420"
                rx="18"
                fill="url(#workshopBambooMat)"
                stroke="#9AC193"
                strokeWidth="3"
              />

              {renderCraftScene()}
            </svg>
          </div>

          <div className="bg-[#FDF5DB]/90 border border-[#E8D28C] rounded-xl px-4 py-2.5 flex items-center justify-between gap-2 text-xs text-[#132219]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#DD7930] shrink-0" />
              <span className="font-medium">{feedback}</span>
            </div>
            {overallProgress === 100 && (
              <button
                type="button"
                onClick={() => setShowFinishedCard(true)}
                className="px-3 py-1.5 rounded-lg bg-[#143D28] text-white font-semibold shrink-0 cursor-pointer"
              >
                See Result →
              </button>
            )}
          </div>
        </section>

        {/* RIGHT PANEL: Guide, Demo & Controls */}
        <aside className="lg:col-span-4 bg-[#E8F5E9] border border-[#B5D2AF] rounded-xl p-4 sm:p-5 space-y-3.5">
          <div className="pb-2.5 border-b border-[#B5D2AF]">
            <p className="font-mono text-xs text-[#0F764A] tabular-nums mb-0.5 font-semibold">
              Step {state.step + 1} of {craft.steps.length}
            </p>
            <h2 className="font-serif text-2xl font-semibold text-[#132219]">
              {currentStepMeta.title}
            </h2>
          </div>

          {mode === 'learn' && <WorkshopStepDemoSVG craftId={craft.id} step={state.step} />}

          <p className="text-sm text-[#132219] leading-relaxed font-medium">
            {mode === 'learn' ? currentStepMeta.learnInstruction : currentStepMeta.freeInstruction}
          </p>

          {mode === 'learn' && (
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#FAFBF6] border border-[#B5D2AF]">
                <span className="font-semibold text-[#143D28]">Before: </span>
                <span className="text-[#3F5749]">{currentStepMeta.beforeText}</span>
              </div>
              <div
                className={`p-2.5 rounded-lg border ${
                  stepCompleted
                    ? 'bg-[#CFE4CA] border-[#0F764A] text-[#143D28]'
                    : 'bg-[#FAFBF6] border-[#B5D2AF] text-[#3F5749]'
                }`}
              >
                <span className="font-semibold text-[#143D28]">
                  {stepCompleted ? 'Done — After: ' : 'After: '}
                </span>
                <span>{currentStepMeta.afterText}</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAEDE8] border border-[#E4B7AA] text-[#132219]">
                <span className="font-semibold text-[#B65236]">Why needed: </span>
                <span>{currentStepMeta.whyText}</span>
              </div>
            </div>
          )}

          {showHint && (
            <div className="p-3 rounded-lg bg-[#FDF5DB] border border-[#E2B334] text-xs text-[#5B4112] leading-relaxed">
              <strong className="block mb-0.5">Hint:</strong>
              {currentStepMeta.hintText}
            </div>
          )}

          {/* Controls */}
          <div className="pt-2 border-t border-[#B5D2AF] space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => state.step > 0 && goToStep(state.step - 1)}
                disabled={state.step === 0}
                className="inline-flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-medium rounded-lg border border-[#B5D2AF] bg-[#FAFBF6] text-[#132219] hover:bg-[#CFE4CA] disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer min-h-[40px]"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (state.step < craft.steps.length - 1) {
                    goToStep(state.step + 1);
                  } else if (overallProgress === 100) {
                    setShowFinishedCard(true);
                  }
                }}
                disabled={state.step >= craft.steps.length - 1 && overallProgress < 100}
                className={`inline-flex items-center justify-center gap-1 px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer min-h-[40px] ${
                  stepCompleted
                    ? 'bg-[#0F764A] text-white ring-2 ring-[#E2B334] hover:bg-[#143D28]'
                    : 'bg-[#143D28] text-white hover:bg-[#0D2B1B]'
                }`}
              >
                <span>
                  {state.step === craft.steps.length - 1 ? 'Finish Craft' : 'Next Step'}
                </span>
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
                onClick={handleResetClick}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 text-xs font-medium rounded-lg border border-[#B5D2AF] bg-[#FAFBF6] text-[#132219] hover:bg-[#FAEDE8] cursor-pointer min-h-[40px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
