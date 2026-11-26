export type PageId =
  | 'home'
  | 'explore'
  | 'tutorials'
  | 'studio'
  | 'gallery'
  | 'about';

export interface TerminologyEntry {
  term: string;
  origin: string;
  definition: string;
}

export interface EducationalSubSection {
  subheading: string;
  paragraphs: string[];
  practicalExample?: string;
}

export interface EducationalSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  readTime: string;
  category: string;
  leadParagraph: string;
  imageUrl?: string;
  imageCaption?: string;
  diagramType?: 'anatomy' | 'techniques' | 'weave-interactive' | 'sustainability';
  subsections: EducationalSubSection[];
  keyTerms: TerminologyEntry[];
  culturalNote?: {
    title: string;
    body: string;
  };
}

export type GalleryCategory =
  | 'All'
  | 'Ceremonial'
  | 'Culinary'
  | 'Offerings'
  | 'Contemporary'
  | 'Technique';

export interface GalleryItem {
  id: string;
  accessionNumber: string;
  title: string;
  indonesianName: string;
  category: Exclude<GalleryCategory, 'All'>;
  region: string;
  whatItLooksLike: string;
  howItIsUsed: string;
  interestingFact?: string;
  imageUrl: string;
}

export interface RegionalTradition {
  id: string;
  regionName: string;
  provinceOrIsland: string;
  coordinates: { x: number; y: number };
  signatureCrafts: string[];
  localTerminology: string;
  imageUrl: string;
  imageCaption: string;
  summary: string;
  culturalContext: string;
  verifiedHighlight: string;
}

export type StepVisualType =
  | 'strip-lidi'
  | 'coil-three'
  | 'weave-cross'
  | 'wrap-tails'
  | 'tuck-tips'
  | 'tighten-ketupat'
  | 'trim-petal'
  | 'notch-edge'
  | 'pleat-fan'
  | 'pin-rosette'
  | 'cross-knot'
  | 'box-braid'
  | 'fold-legs'
  | 'curl-antennae'
  | 'wrap-hilt'
  | 'crossguard'
  | 'zig-blade'
  | 'lock-tip';

export interface TutorialStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tip?: string;
  visualType: StepVisualType;
}

export interface CraftTutorial {
  id: string;
  title: string;
  indonesianTitle: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  leafCount: string;
  imageUrl: string;
  diagramType: 'ketupat' | 'sampian' | 'grasshopper' | 'keris';
  summary: string;
  whatYouNeed: {
    materials: string[];
    tools: string[];
  };
  beforeYouStart: string[];
  steps: TutorialStep[];
  visualGuideCaption: string;
  finishedCraftNote: string;
}

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReferenceSource {
  id: string;
  title: string;
  institutionOrAuthor: string;
  category: 'Government & Heritage' | 'Academic & Botanical' | 'Cultural Archive';
  description: string;
  url: string;
}
