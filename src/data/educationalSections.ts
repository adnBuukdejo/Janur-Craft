import { EducationalSection } from '../types/janur';
import { JANUR_IMAGES } from './images';

export const EDUCATIONAL_SECTIONS: EducationalSection[] = [
  {
    id: 'introduction-to-janur',
    number: '01',
    title: 'Introduction to Janur',
    subtitle: 'What janur is and where it comes from',
    readTime: '1 min read',
    category: 'Basics',
    leadParagraph:
      'Janur is the Indonesian word for young coconut leaves. Old coconut leaves are dark green and hard. Young coconut leaves are light green or yellow and very soft. Because they bend easily without snapping, people weave them by hand into food pouches and pretty decorations.',
    imageUrl: JANUR_IMAGES.heroExhibition,
    imageCaption: 'Fresh young coconut leaves woven into diamond pouches and fans.',
    diagramType: 'anatomy',
    subsections: [
      {
        subheading: 'Parts of One Coconut Leaf',
        paragraphs: [
          'Each coconut leaf has two soft green strips joined by a hard wooden stick in the middle. In Indonesia, this middle stick is called the lidi.',
          'First, you cut away the hard stick. Then you have two soft green strips ready for weaving!',
        ],
        practicalExample:
          'On different islands, people have local names for janur. In Bali, people call it busung.',
      },
    ],
    keyTerms: [
      {
        term: 'Janur',
        origin: 'Indonesian',
        definition: 'Young, soft coconut leaves used for weaving crafts.',
      },
      {
        term: 'Lidi',
        origin: 'Indonesian',
        definition: 'The hard stick in the middle of a coconut leaf.',
      },
    ],
  },
  {
    id: 'history-cultural-significance',
    number: '02',
    title: 'History & Cultural Significance',
    subtitle: 'Why janur crafts matter in Indonesian life',
    readTime: '2 min read',
    category: 'History',
    leadParagraph:
      'Long before paper banners or plastic existed, Indonesian families used coconut trees near their homes for special events. People across Java and Bali have woven coconut leaves for hundreds of years to celebrate weddings, holidays, and harvests.',
    imageUrl: JANUR_IMAGES.kembarMayang,
    imageCaption: 'Kembar Mayang leaf decoration made for a Javanese wedding.',
    subsections: [
      {
        subheading: 'Ketupat and Holiday Meanings',
        paragraphs: [
          'In Java, people make diamond rice pouches called ketupat (or kupat) for a holiday called Bakda Kupat, one week after Eid al-Fitr.',
          'In the Javanese language, "kupat" sounds like "ngaku lepat." That means saying sorry and forgiving each other. The white rice inside stands for a clean, kind heart.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Bakda Kupat',
        origin: 'Javanese',
        definition: 'A friendly holiday seven days after Eid when families cook and share ketupat.',
      },
    ],
    culturalNote: {
      title: 'Why Old Leaves Do Not Last',
      body: 'Because coconut leaves turn back into soil in a few weeks, very old leaf crafts are gone today. Instead, parents teach the weaving skills directly to their children.',
    },
  },
  {
    id: 'types-of-janur-crafts',
    number: '03',
    title: 'Types of Janur Crafts',
    subtitle: 'Four main things people make with janur',
    readTime: '2 min read',
    category: 'Types',
    leadParagraph:
      'Most visitors know ketupat first, but Indonesian crafters make many different things from young coconut leaves.',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Diamond ketupat pouches served next to rolled lepet rice.',
    subsections: [
      {
        subheading: 'Four Popular Kinds',
        paragraphs: [
          '1. Food Pouches: Diamond ketupat and rolled lepet hold rice while it boils.',
          '2. Party & Wedding Signs: Tall curved Penjor poles in Bali and wedding arches in Java tell everyone a celebration is happening.',
          '3. Flower Trays: In Bali, families fold small leaf trays (Canang Sari) and flower crowns (Sampian) for daily prayers.',
          '4. Toys for Kids: Using extra leaf strips, crafters fold cute grasshoppers (belalang), little birds, and pinwheels.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Penjor',
        origin: 'Balinese',
        definition: 'A tall curved bamboo pole decorated with janur for festivals.',
      },
      {
        term: 'Belalang Janur',
        origin: 'Indonesian',
        definition: 'A toy grasshopper folded from two green coconut leaf strips.',
      },
    ],
  },
  {
    id: 'tools-and-materials',
    number: '04',
    title: 'Tools & Materials',
    subtitle: 'Simple natural tools with no glue or plastic',
    readTime: '1 min read',
    category: 'Tools',
    leadParagraph:
      'You do not need big machines or glue to make janur crafts. Indonesian crafters only use a few simple hand tools and natural plant parts.',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Cutting the hard middle stick out of a fresh coconut leaf.',
    subsections: [
      {
        subheading: 'What Crafters Use',
        paragraphs: [
          'Soft Leaves (Janur): Main weaving strips. Sometimes dark old leaves (slepan) are added for color contrast.',
          'Small Knife or Scissors: Used to remove the middle stick and snip pretty shapes.',
          'Tiny Bamboo Pins (Semat): Short bamboo sticks pushed through folded leaves like pins so no tape is needed.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Semat',
        origin: 'Indonesian / Balinese',
        definition: 'A tiny sharp bamboo pin used to hold folded leaves together.',
      },
    ],
  },
  {
    id: 'techniques-folding-methods',
    number: '05',
    title: 'Techniques & Folding Methods',
    subtitle: 'Four easy ways crafters shape the leaves',
    readTime: '2 min read',
    category: 'Techniques',
    leadParagraph:
      'Even fancy janur art uses just a few simple folding skills. Crafters lock the leaves together using tight folds and weaving.',
    diagramType: 'techniques',
    subsections: [
      {
        subheading: 'Four Easy Skills',
        paragraphs: [
          '1. Cut the Stick Out (Menyeset): Slice away the hard stick in the middle so you get two soft strips.',
          '2. Weave Over and Under (Anyaman): Cross leaf strips over and under each other so they lock tight.',
          '3. Fold Like a Fan (Lipatan): Fold a strip back and forth to make flower petals.',
          '4. Cut Pretty Edges (Ringgitan): Snip small zigzags or curves along the side of a leaf.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Anyaman',
        origin: 'Indonesian',
        definition: 'Weaving leaf strips over and under each other.',
      },
      {
        term: 'Ringgitan',
        origin: 'Balinese / Javanese',
        definition: 'Zigzag or wavy cuts along the edge of a folded leaf.',
      },
    ],
  },
  {
    id: 'step-by-step-tutorials',
    number: '06',
    title: 'Step-by-Step Tutorials',
    subtitle: 'Easy ways for beginners to start weaving',
    readTime: '1 min read',
    category: 'Tutorials',
    leadParagraph:
      'The best way to learn janur is to try folding it yourself! Beginners usually start with a simple Ketupat Bawang diamond pouch.',
    imageUrl: JANUR_IMAGES.handsWeavingKetupat,
    imageCaption: 'Hands weaving fresh yellow-green janur strips into a neat Ketupat Bawang pouch.',
    subsections: [
      {
        subheading: 'Three Quick Beginner Tips',
        paragraphs: [
          'First, take two strips of janur and make three loops with each strip. Put them over and under each other, then gently pull them tight into a diamond.',
          'No coconut trees near you? You can practice every tutorial at home using gift ribbon or soft paper strips!',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Merapatkan',
        origin: 'Indonesian',
        definition: 'Gently pulling the woven strips tight at the end to close gaps.',
      },
    ],
  },
  {
    id: 'traditional-modern-creations',
    number: '07',
    title: 'Traditional & Modern Creations',
    subtitle: 'How young designers use janur today',
    readTime: '1 min read',
    category: 'Modern Art',
    leadParagraph:
      'Janur is not just an old tradition. Today, young Indonesian designers turn coconut leaf weaving into modern lamps, wedding backdrops, and party centerpieces.',
    imageUrl: JANUR_IMAGES.modernDesign,
    imageCaption: 'Modern woven coconut-leaf hanging lamps in a bright room.',
    subsections: [
      {
        subheading: 'New Ideas From Old Skills',
        paragraphs: [
          'Traditional shapes like Balinese Penjor and Javanese Kembar Mayang follow old rules. Modern artists take those same folding steps and use them to replace plastic party foam with natural green art.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Anyaman Kontemporer',
        origin: 'Indonesian',
        definition: 'Modern art made using traditional leaf weaving patterns.',
      },
    ],
  },
  {
    id: 'regional-diversity',
    number: '08',
    title: 'Regional Diversity',
    subtitle: 'How janur looks different across Indonesia’s islands',
    readTime: '2 min read',
    category: 'Regions',
    leadParagraph:
      'Indonesia has more than 17,000 islands. Each island has its own leaf names, shapes, and favorite ways to use janur.',
    imageUrl: JANUR_IMAGES.penjorBali,
    imageCaption: 'Tall curved Penjor poles along a road in Bali.',
    subsections: [
      {
        subheading: 'Around the Islands',
        paragraphs: [
          'In Bali, families fold busung leaves every day for prayer trays and tall Penjor poles.',
          'In Java, janur arches welcome wedding guests, and families weave ketupat for holidays.',
          'In Sumatra, Kalimantan, and Sulawesi, woven leaf rice cakes like Katupek and Lappa-lappa are eaten every day with warm soup and curry.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Katupek',
        origin: 'Minangkabau (Sumatra)',
        definition: 'Woven coconut-leaf rice cakes served with spiced curry.',
      },
      {
        term: 'Lappa-lappa',
        origin: 'Bugis–Makassar (Sulawesi)',
        definition: 'Sticky coconut rice wrapped inside young coconut leaves.',
      },
    ],
    culturalNote: {
      title: 'Click the Indonesia Map Below',
      body: 'Scroll down to click on seven Indonesian islands and see their local crafts.',
    },
  },
  {
    id: 'preservation-of-craft',
    number: '09',
    title: 'Preservation of the Craft',
    subtitle: 'Keeping janur weaving alive for future kids',
    readTime: '1 min read',
    category: 'Preservation',
    leadParagraph:
      'Fresh leaf crafts dry out in a few days, so the real treasure is the skill in people’s hands. Older crafters keep the art alive by teaching young people.',
    imageUrl: JANUR_IMAGES.canangOfferings,
    imageCaption: 'Balinese flower trays made together by families.',
    subsections: [
      {
        subheading: 'Learning Together',
        paragraphs: [
          'In Bali and Java, kids and teens practice cutting and weaving beside parents, neighbors, and teachers at local craft clubs (sanggar).',
          'Indonesia’s government also lists many janur crafts as national heritage so people remember and protect them.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Sanggar',
        origin: 'Indonesian',
        definition: 'A community studio or club where kids and teens learn traditional arts.',
      },
    ],
  },
  {
    id: 'interactive-craft-visualization',
    number: '10',
    title: 'Interactive Janur Craft Visualization',
    subtitle: 'See how Over and Under weaving locks a ketupat',
    readTime: '1 min read',
    category: 'Weave Logic',
    leadParagraph:
      'When two leaf strips cross each other Over and Under, they grip each other tightly. That is why a ketupat stays closed when boiled in water—with zero glue!',
    diagramType: 'weave-interactive',
    subsections: [
      {
        subheading: 'Test It Yourself',
        paragraphs: [
          'Click the squares below to switch Over and Under. Watch how alternating every square locks the weave tight!',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Over–Under Weave',
        origin: 'Weaving Rule',
        definition: 'Taking turns putting one strip on top and then underneath so nothing slips.',
      },
    ],
  },
  {
    id: 'preparation-and-care',
    number: '11',
    title: 'Preparation & Care of Janur',
    subtitle: 'Picking leaves safely and keeping them soft',
    readTime: '1 min read',
    category: 'Leaf Care',
    leadParagraph:
      'Dry coconut leaves crack easily when you fold them. Taking good care of the tree and keeping the leaves damp makes weaving much easier.',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Preparing soft green coconut strips on a clean surface.',
    subsections: [
      {
        subheading: 'Simple Leaf Care',
        paragraphs: [
          'Workers cut only a few outer branches and leave the middle growing bud (umbut) safe so the coconut tree stays healthy.',
          'Wrapping fresh strips in a damp cloth keeps them soft for 2 to 4 days before crafting.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Umbut',
        origin: 'Indonesian',
        definition: 'The growing heart at the top of a coconut palm that workers protect.',
      },
    ],
  },
  {
    id: 'uses-and-applications',
    number: '12',
    title: 'Uses & Applications',
    subtitle: 'How people use janur in meals, temples, and parties',
    readTime: '1 min read',
    category: 'Uses',
    leadParagraph:
      'In Indonesia, one simple coconut leaf can be used in the kitchen, at temple prayers, and at big wedding parties.',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Steamed ketupat and rolled lepet ready for a family meal.',
    subsections: [
      {
        subheading: 'Where You See Janur',
        paragraphs: [
          '1. Cooking: Woven pouches cook rice evenly and give food a light, fresh smell.',
          '2. Prayers: Small flower trays (Canang Sari) and tall street poles (Penjor) in Bali.',
          '3. Weddings & Parties: Leaf arches at the front gate and pretty eco-friendly room decorations.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Canang Sari',
        origin: 'Balinese',
        definition: 'A small woven leaf tray filled with flowers for daily prayers.',
      },
    ],
  },
  {
    id: 'janur-crafts-sustainability',
    number: '13',
    title: 'Janur Crafts & Sustainability',
    subtitle: 'Why janur is good for our planet',
    readTime: '1 min read',
    category: 'Sustainability',
    leadParagraph:
      'Janur is a smart example of zero-waste design. It uses no plastic, hurts no trees, and turns safely back into garden soil when you are done.',
    diagramType: 'sustainability',
    subsections: [
      {
        subheading: 'Zero Waste From Start to Finish',
        paragraphs: [
          'A healthy coconut tree grows 12 to 16 new branches every year without being cut down.',
          'The soft green strips become pouches or party art, and the hard middle sticks (lidi) are tied into sweeping brooms (sapu lidi). After a party, old leaves break down naturally into compost!',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Sapu Lidi',
        origin: 'Indonesian',
        definition: 'A strong sweeping broom made from leftover coconut leaf sticks.',
      },
    ],
  },
];
