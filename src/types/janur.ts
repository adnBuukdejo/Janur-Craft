export type PageId =
  | 'home'
  | 'explore'
  | 'tutorials'
  | 'studio'
  | 'gallery'
  | 'about';

export interface TerminologyEntry {
  term: string;
  pronunciation?: string;
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
  medium: string;
  occasion: string;
  imageUrl: string;
  description: string;
  culturalBackground: string;
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

export interface TutorialStep {
  stepNumber: number;
  title: string;
  instruction: string;
  tip?: string;
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
  materials: string[];
  tools: string[];
  steps: TutorialStep[];
  culturalUse: string;
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
