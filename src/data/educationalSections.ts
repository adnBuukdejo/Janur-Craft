import { EducationalSection } from '../types/janur';
import { JANUR_IMAGES } from './images';

export const EDUCATIONAL_SECTIONS: EducationalSection[] = [
  {
    id: 'introduction-to-janur',
    number: '01',
    title: 'Introduction to Janur',
    subtitle: 'What janur is, where it comes from, and why young coconut leaves are so special',
    readTime: '3 min read',
    category: 'Basics',
    leadParagraph:
      'In Indonesia, janur is the name for young, freshly opened coconut palm leaves. Instead of being dark green like older leaves, janur is pale yellow-green and soft. Because it bends easily without breaking, Indonesian people use it to weave food pouches, wedding decorations, and traditional ornaments—all without glue or plastic.',
    imageUrl: JANUR_IMAGES.heroExhibition,
    imageCaption: 'Fresh pale-green janur woven into ketupat pouches, fans, and garlands.',
    diagramType: 'anatomy',
    subsections: [
      {
        subheading: 'Where Does the Word "Janur" Come From?',
        paragraphs: [
          'The word janur comes from Javanese and Indonesian culture and simply means young coconut leaves (from the coconut tree, Cocos nucifera). Around Indonesia, people also use local names—for example, people in Bali call it busung, while Sundanese speakers in West Java call it daun kalapa ngora.',
          'Because young leaves grow tightly folded inside the top of the coconut palm, they have not yet turned dark green from sunlight. This gives janur its bright cream-to-soft-green color and smooth, bendable texture.',
        ],
        practicalExample:
          'When making a wedding decoration or ketupat, crafters look for leaves that are just opening: dark mature leaves crack when folded, while tiny white baby leaves tear too easily.',
      },
      {
        subheading: 'Parts of a Coconut Leaf',
        paragraphs: [
          'A large coconut branch (pelepah) has dozens of narrow leaflets growing along both sides. Each single leaflet has two soft green leaf strips connected down the middle by a thin woody stick called the lidi.',
          'Once you gently slice away that middle lidi stick, one leaflet turns into two long, flexible green ribbons ready for weaving.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Janur',
        origin: 'Indonesian / Javanese',
        definition: 'Young, pale yellow-green coconut palm leaves used for weaving and decorations.',
      },
      {
        term: 'Busung',
        origin: 'Balinese',
        definition: 'The Balinese word for young coconut leaves used every day in temple offerings.',
      },
      {
        term: 'Lidi',
        origin: 'Indonesian',
        definition: 'The thin, stiff wooden stick in the center of each coconut leaflet.',
      },
    ],
  },
  {
    id: 'history-cultural-significance',
    number: '02',
    title: 'History & Cultural Significance',
    subtitle: 'How coconut-leaf crafts became a meaningful part of Indonesian celebrations and daily life',
    readTime: '4 min read',
    category: 'History',
    leadParagraph:
      'Long before paper banners or plastic ribbons existed, Indonesian families used coconut trees growing near their homes to celebrate special life moments. Janur crafts are not meant to last forever in glass cases—they are made fresh for joyful gatherings, prayers, and shared meals.',
    imageUrl: JANUR_IMAGES.kembarMayang,
    imageCaption: 'Javanese Kembar Mayang wedding decoration crafted from woven young coconut leaves.',
    subsections: [
      {
        subheading: 'A Tradition Built for Living Moments',
        paragraphs: [
          'Palm-leaf weaving has been part of island life across Indonesia for centuries. In Bali and Java, Hindu-Buddhist traditions and farming communities used young coconut leaves to show gratitude for nature, harvests, and new beginnings.',
          'Because fresh janur stays bright green for just a few days before slowly turning golden tan, crafting with it reminds people to appreciate the present moment.',
        ],
      },
      {
        subheading: 'Ketupat and Eid Traditions in Java',
        paragraphs: [
          'In Java, woven diamond rice pouches called ketupat (or kupat) became closely connected to Bakda Kupat, a joyful celebration held one week after Eid al-Fitr. Cultural stories often link this tradition to Sunan Kalijaga, a well-known 15th–16th century teacher in Java.',
          'In Javanese wordplay, "kupat" reminds people of "ngaku lepat" (admitting mistakes and asking for forgiveness) and "laku papat" (four good deeds of the holiday). The criss-cross weave represents life’s twists and turns, while the pure white rice inside stands for a fresh, clean heart.',
        ],
        practicalExample:
          'In many Javanese and Madurese neighborhoods, families still hang woven ketupat over their front doors during holiday week as a warm greeting to neighbors.',
      },
    ],
    keyTerms: [
      {
        term: 'Bakda Kupat',
        origin: 'Javanese Tradition',
        definition: 'A community celebration seven days after Eid al-Fitr when families cook and share ketupat.',
      },
      {
        term: 'Yadnya',
        origin: 'Balinese',
        definition: 'Sacred offerings made with gratitude and devotion, often held in woven coconut-leaf trays.',
      },
    ],
    culturalNote: {
      title: 'Why Exact Dates Are Hard to Pin Down',
      body: 'Because coconut leaves break down naturally into soil within weeks, very old leaf crafts do not survive underground like stone or pottery. Instead, historians learn about them through temple carvings, old stories, and skills passed down from parents to children.',
    },
  },
  {
    id: 'types-of-janur-crafts',
    number: '03',
    title: 'Types of Janur Crafts',
    subtitle: 'Four main kinds of janur creations: food pouches, big decorations, offerings, and folk toys',
    readTime: '3 min read',
    category: 'Types',
    leadParagraph:
      'Most people outside Indonesia recognize janur first through ketupat, the woven diamond rice pouch. Yet Indonesian crafters actually shape young coconut leaves into hundreds of designs—from towering festival poles to tiny woven birds.',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Woven diamond ketupat served alongside rolled cylindrical lepet.',
    subsections: [
      {
        subheading: '1. Food Wraps & Cooking Pouches',
        paragraphs: [
          'Cooking rice inside woven coconut leaves gives the rice a mild, pleasant aroma and holds it together cleanly. Popular shapes include Ketupat Bawang (a plump six-corner diamond), Ketupat Pasar (square pouch), Clorot (a spiraled cone for sweet pudding), and Lepet (sticky rice rolled in a leaf tube and tied with bamboo string).',
        ],
      },
      {
        subheading: '2. Wedding & Festival Landmarks',
        paragraphs: [
          'Tall janur displays let the whole neighborhood know a celebration is happening! In Bali, long curved bamboo poles called Penjor line the streets during the Galungan festival. In Java, tall yellow-green janur arches stand outside wedding homes alongside matched Kembar Mayang bouquets.',
        ],
      },
      {
        subheading: '3. Daily Offerings & Temple Decorations',
        paragraphs: [
          'In Bali, families fold small square trays (ceper), flower-like crowns (sampian), and long patterned banners (lamak) to hold fresh petals and rice for daily prayers.',
        ],
      },
      {
        subheading: '4. Handmade Folk Toys',
        paragraphs: [
          'Using leftover strips, crafters weave charming little grasshoppers (belalang), birds (manuk-manukan), toy keris daggers, pinwheels, and miniature baskets for kids.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Clorot',
        origin: 'Javanese / Indonesian',
        definition: 'A cone rolled from a janur strip used to steam sweet rice-flour cake with palm sugar.',
      },
      {
        term: 'Lamak',
        origin: 'Balinese',
        definition: 'A long woven coconut-leaf banner hung on shrines during Balinese festivals.',
      },
    ],
  },
  {
    id: 'tools-and-materials',
    number: '04',
    title: 'Tools & Materials',
    subtitle: 'Simple, plastic-free tools and natural plant fibers you can hold in one hand',
    readTime: '3 min read',
    category: 'Tools',
    leadParagraph:
      'You do not need expensive machines, hot glue, or metal staples to make janur crafts. Most Indonesian crafters sit comfortably on a floor mat with just a small sharp knife, tiny bamboo pins, and a bowl of cool water.',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Separating the stiff center lidi stick from a fresh young coconut leaf using a small knife.',
    subsections: [
      {
        subheading: 'Main Natural Materials',
        paragraphs: [
          'Young coconut leaves (janur) are the star material because they are smooth, strong, and bend cleanly. Sometimes crafters mix in darker green mature leaves (slepan) for color contrast, fragrant pandan leaves, or palm leaves like nipah and lontar.',
          'For big displays, builders use bamboo poles, fresh banana-tree trunks (gedebog) to keep stems moist, and thin split bamboo strings.',
        ],
      },
      {
        subheading: 'Simple Hand Tools',
        paragraphs: [
          'Small Paring Knife (Pisau Raut / Mutik): A small, sharp knife used to slice away the lidi center stick and trim decorative edges.',
          'Bamboo Pins (Semat): Tiny 2–3 cm slivers of bamboo or coconut midrib used like natural sewing pins to hold folded leaves together without tape or glue.',
        ],
        practicalExample:
          'When making a Balinese flower tray, crafters push a tiny bamboo semat pin through two folded corners in one quick movement—it holds firm and stays 100% plastic-free!',
      },
    ],
    keyTerms: [
      {
        term: 'Pisau Raut / Mutik',
        origin: 'Indonesian / Balinese',
        definition: 'A small handheld craft knife used to strip coconut midribs and cut patterns.',
      },
      {
        term: 'Semat',
        origin: 'Indonesian / Balinese',
        definition: 'A tiny sharpened pin made from bamboo or coconut lidi used to pin folded leaves.',
      },
    ],
  },
  {
    id: 'techniques-folding-methods',
    number: '05',
    title: 'Techniques & Folding Methods',
    subtitle: 'How stripping, criss-cross weaving, fan pleating, and edge cutting work together',
    readTime: '4 min read',
    category: 'Techniques',
    leadParagraph:
      'Even the most detailed janur creations rely on a few clever folding tricks. Instead of cutting leaves into pieces and gluing them, crafters lock leaf strips together using friction, crisp creases, and overlapping weaves.',
    diagramType: 'techniques',
    subsections: [
      {
        subheading: 'Stripping (Menyeset) & Weaving (Anyaman)',
        paragraphs: [
          'First comes menyeset—removing the stiff wooden lidi stick down the middle so you get two soft green strips. Next comes anyaman, which simply means weaving strips over and under each other like a checkerboard.',
          'In a ketupat pouch, weaving strips diagonally over and under locks all the sides together tightly so raw rice stays inside even while boiling in water.',
        ],
      },
      {
        subheading: 'Pleating (Lipatan), Notching (Ringgitan) & Tucking (Kunci)',
        paragraphs: [
          'Decorative ornaments use lipatan (folding strips back and forth like a paper fan) and ringgitan (cutting neat zigzags or curved scallops along the leaf edges).',
          'Finally, crafters tuck loose ends neatly underneath crossing strips (kunci) so the finished piece looks clean with no messy knots.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Anyaman',
        origin: 'Indonesian',
        definition: 'Over-and-under weaving used for baskets, mats, and ketupat pouches.',
      },
      {
        term: 'Ringgitan',
        origin: 'Balinese / Javanese',
        definition: 'Decorative zigzag or curved cutouts snipped along the edges of folded leaves.',
      },
    ],
  },
  {
    id: 'step-by-step-tutorials',
    number: '06',
    title: 'Step-by-Step Tutorials',
    subtitle: 'Easy beginner steps to learn how coconut-leaf weaving fits together',
    readTime: '3 min read',
    category: 'Tutorials',
    leadParagraph:
      'The best way to understand janur is to try folding it yourself! Beginners usually start by practicing straight folds and the classic Ketupat Bawang before trying playful grasshoppers or festive rosettes.',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    imageCaption: 'Finished Ketupat Bawang pouches showing neat criss-cross weaving and tucked ends.',
    subsections: [
      {
        subheading: 'How Beginners Start',
        paragraphs: [
          'Step 1 — Strip Smoothly: Practice slicing the woody lidi stick cleanly off one leaflet.',
          'Step 2 — Try the 3-Loop Weave: Coil two strips into three loops each, weave them over and under, then pull the strips gently tight to see a 3D diamond appear.',
          'Step 3 — Practice Fan Folds: Fold short strips like an accordion fan and pin them into a flower circle.',
        ],
        practicalExample:
          'Do you live somewhere without coconut trees? No problem! You can practice every single ketupat and grasshopper tutorial at home using 2.5 cm wide gift ribbon or flexible paper strips.',
      },
    ],
    keyTerms: [
      {
        term: 'Merapatkan',
        origin: 'Indonesian',
        definition: 'Gently pulling each woven strip snug from the center to the tips to close all gaps.',
      },
    ],
  },
  {
    id: 'traditional-modern-creations',
    number: '07',
    title: 'Traditional & Modern Creations',
    subtitle: 'How young Indonesian designers turn traditional leaf weaving into modern eco-art',
    readTime: '3 min read',
    category: 'Modern Art',
    leadParagraph:
      'Janur craft is not stuck in the past—it is growing in exciting new directions! Today, young Indonesian designers, florists, and artists use traditional leaf-folding skills to build modern lamps, plastic-free wedding backdrops, and gallery sculptures.',
    imageUrl: JANUR_IMAGES.modernDesign,
    imageCaption: 'Modern woven coconut-leaf hanging lamps and folded table centerpiece in a sunlit room.',
    subsections: [
      {
        subheading: 'From Traditional Ceremonies to Modern Rooms',
        paragraphs: [
          'While classic crafts follow traditional community customs—like Javanese Kembar Mayang or Balinese Penjor—modern creators adapt those same folding patterns into minimalist hanging lampshades, geometric table centerpieces, and wall art.',
          'Because hotels and event planners want to cut down on plastic floral foam and fake decorations, natural janur installations have become a stylish, planet-friendly choice.',
        ],
        practicalExample:
          'Some eco-resorts in Bali and Yogyakarta weave large coconut-leaf pendant lamps that glow warmly at night and naturally shift from pale green to golden tan over several weeks.',
      },
    ],
    keyTerms: [
      {
        term: 'Anyaman Kontemporer',
        origin: 'Indonesian',
        definition: 'Modern creative weaving that uses traditional plant-folding patterns in new designs.',
      },
    ],
  },
  {
    id: 'regional-diversity',
    number: '08',
    title: 'Regional Diversity',
    subtitle: 'Why janur traditions look and mean different things across Indonesia’s islands',
    readTime: '4 min read',
    category: 'Regions',
    leadParagraph:
      'Indonesia has more than 17,000 islands and hundreds of unique local cultures. Every region has its own names, weaving styles, and favorite occasions for using young coconut leaves—so no two islands do it the exact same way.',
    imageUrl: JANUR_IMAGES.penjorBali,
    imageCaption: 'Curved Balinese Penjor poles lining a village street for the Galungan festival.',
    subsections: [
      {
        subheading: 'Different Islands, Different Traditions',
        paragraphs: [
          'In Bali, crafting with young coconut leaves (busung) is an everyday family activity for prayer trays (Canang Sari) and dramatic street-side Penjor poles.',
          'In Central Java and Yogyakarta, yellow-green janur arches welcome wedding guests at the front gate, while paired Kembar Mayang arrangements symbolize good wishes for the couple.',
          'In West Sumatra (Minangkabau), South Kalimantan (Banjar), and South Sulawesi (Bugis–Makassar), coconut-leaf weaving shines in delicious everyday meals—like Katupek Pitalah curry, Katupat Kandangan, and slender wrapped Lappa-lappa.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Katupek',
        origin: 'Minangkabau (West Sumatra)',
        definition: 'Woven coconut-leaf rice cakes served every day with rich spiced curries.',
      },
      {
        term: 'Lappa-lappa',
        origin: 'Bugis–Makassar (South Sulawesi)',
        definition: 'Sticky coconut rice wrapped in spiraled young coconut leaves and tied with natural fiber.',
      },
    ],
    culturalNote: {
      title: 'Click Around the Cultural Map Below',
      body: 'Scroll down to the Interactive Indonesian Cultural Map to click on seven different regions and see their signature crafts and photos.',
    },
  },
  {
    id: 'preservation-of-craft',
    number: '09',
    title: 'Preservation of the Craft',
    subtitle: 'How families, community groups, and schools keep janur weaving alive',
    readTime: '3 min read',
    category: 'Preservation',
    leadParagraph:
      'Since fresh coconut-leaf crafts dry out within days, the real treasure is not the finished leaf—it is the skill in people’s hands. Keeping this tradition alive means passing weaving know-how from older generations to young learners.',
    imageUrl: JANUR_IMAGES.canangOfferings,
    imageCaption: 'Balinese woven flower offerings made by families and neighbors working together.',
    subsections: [
      {
        subheading: 'Learning Together in Communities & Schools',
        paragraphs: [
          'In Balinese neighborhoods (banjar), neighbors gather together before big temple days so children and teens can practice cutting and pinning busung right beside experienced elders.',
          'In Java and other provinces, community craft studios (sanggar), neighborhood ketupat-weaving contests before Eid, and local school art classes help young people try weaving for themselves.',
          'Indonesia’s Ministry of Education and Culture also officially lists regional weaving and culinary traditions under Warisan Budaya Takbenda (Intangible Cultural Heritage) to protect and document them.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Sanggar',
        origin: 'Indonesian',
        definition: 'A community studio or club where traditional crafts, dance, and music are taught.',
      },
      {
        term: 'Warisan Budaya Takbenda',
        origin: 'Indonesian Heritage List',
        definition: 'Indonesia’s official list protecting living cultural skills, crafts, and traditions.',
      },
    ],
  },
  {
    id: 'interactive-craft-visualization',
    number: '10',
    title: 'Interactive Janur Craft Visualization',
    subtitle: 'See why alternating Over and Under crossings lock a ketupat together',
    readTime: '3 min read',
    category: 'Weave Logic',
    leadParagraph:
      'Watching someone weave a ketupat at full speed can look like a magic trick! When you slow it down and look at the pattern, it becomes super clear: crossing strips in an alternating Over–Under pattern locks all sides together.',
    diagramType: 'weave-interactive',
    subsections: [
      {
        subheading: 'Try Flipping the Crossings Yourself',
        paragraphs: [
          'A standard Ketupat Bawang uses just two strips. Three loops of Strip A cross three loops of Strip B at right angles. When every crossing alternates Over–Under–Over, the strips grip one another firmly.',
          'Click the squares in the weave grid below to see what happens when crossings match vs. alternate—or jump straight into the Interactive Craft Studio to weave a full ketupat step by step!',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Over–Under Weave',
        origin: 'Weaving Basics',
        definition: 'Alternating which strip sits on top at every intersection so the weave cannot slip apart.',
      },
    ],
  },
  {
    id: 'preparation-and-care',
    number: '11',
    title: 'Preparation & Care of Janur',
    subtitle: 'Picking leaves gently without hurting the palm tree and keeping them soft to weave',
    readTime: '3 min read',
    category: 'Leaf Care',
    leadParagraph:
      'Good janur crafting starts with taking care of both the coconut tree and the harvested leaves. If leaves dry out too fast, they split along their grain when you try to fold them.',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Stripping fresh coconut leaves carefully keeps the green blades smooth and bendable.',
    subsections: [
      {
        subheading: 'Gentle Harvesting & Resting',
        paragraphs: [
          'Harvesters carefully cut only a few outer young fronds and never damage the tree’s central growing bud (umbut), so the coconut palm stays healthy and keeps growing.',
          'After cutting, crafters often let fresh leaves rest briefly in the shade so they become slightly softer and less likely to snap during sharp folds.',
        ],
      },
      {
        subheading: 'Keeping Leaves Fresh Until Crafting',
        paragraphs: [
          'Wrapping stripped leaves in a damp cotton cloth or fresh banana leaf keeps them flexible for 2 to 4 days in a cool spot.',
          'Finished decorations stay bright green for about 2–3 days with light water misting before gradually drying into a warm golden-beige color.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Umbut',
        origin: 'Indonesian',
        definition: 'The tender center growing heart at the top of a palm tree that harvesters protect.',
      },
    ],
  },
  {
    id: 'uses-and-applications',
    number: '12',
    title: 'Uses & Applications',
    subtitle: 'From holiday rice dishes and weddings to eco-friendly hotel decorations',
    readTime: '3 min read',
    category: 'Uses',
    leadParagraph:
      'In Indonesia, janur connects sacred rituals with everyday family kitchens. Few natural materials are used in so many creative ways—from wrapping lunch to welcoming wedding guests.',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Steamed ketupat and tied lepet ready to share at a family meal.',
    subsections: [
      {
        subheading: 'Four Everyday & Special Uses',
        paragraphs: [
          '1. Cooking & Food Wraps: Woven pouches let boiling water cook raw rice evenly while giving it a subtle leaf aroma—acting like zero-plastic natural cookware.',
          '2. Temple Ceremonies: Daily Canang Sari trays and festive Penjor poles express gratitude and community spirit in Bali.',
          '3. Weddings & Family Milestones: Janur wedding arches, Kembar Mayang bouquets, and baby-blessing decorations (mitoni) celebrate big life chapters.',
          '4. Eco-Friendly Events & Hospitality: Hotels and cultural centers weave janur welcome garlands and centerpieces instead of using plastic banners.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Mitoni / Tingkeban',
        origin: 'Javanese Tradition',
        definition: 'A traditional seventh-month celebration blessing an expectant mother and baby.',
      },
    ],
  },
  {
    id: 'janur-crafts-sustainability',
    number: '13',
    title: 'Janur Crafts & Sustainability',
    subtitle: 'Why janur is a great example of zero-waste, plastic-free green design',
    readTime: '3 min read',
    category: 'Sustainability',
    leadParagraph:
      'Today, people around the world are looking for ways to cut down on single-use plastic packaging and party waste. Indonesian janur crafting shows how a local plant tradition can be 100% renewable, zero-waste, and friendly to the earth.',
    diagramType: 'sustainability',
    subsections: [
      {
        subheading: 'Every Part of the Leaf Has a Job',
        paragraphs: [
          'Cutting a few fronds does not harm the coconut tree—a healthy coconut palm grows 12 to 16 new fronds every single year for decades.',
          'Once stripped, the soft green blades become ketupat pouches or decorations, while the leftover wooden lidi sticks are tied together into sturdy outdoor brooms (sapu lidi), food skewers, or pinning needles (semat).',
        ],
        practicalExample:
          'After a festival or family feast, used janur crafts do not go to a plastic landfill—they break down naturally into rich garden compost in just a few weeks.',
      },
    ],
    keyTerms: [
      {
        term: 'Sapu Lidi',
        origin: 'Indonesian',
        definition: 'A classic Indonesian sweeping broom made from hundreds of leftover coconut leaf lidi sticks.',
      },
    ],
  },
];
