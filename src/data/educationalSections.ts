import { EducationalSection } from '../types/janur';
import { JANUR_IMAGES } from './images';

export const EDUCATIONAL_SECTIONS: EducationalSection[] = [
  {
    id: 'introduction-to-janur',
    number: '01',
    title: 'Introduction to Janur',
    subtitle: 'What janur is, where it comes from, and why people love using it',
    readTime: '2 min read',
    category: 'Basics',
    leadParagraph:
      'In Indonesia, janur means young coconut leaves. Old coconut leaves are dark green and stiff. Young coconut leaves are light yellow-green and soft. Because they bend easily without breaking, people weave them by hand into food pouches, wedding decorations, and party ornaments—without any glue or plastic.',
    imageUrl: JANUR_IMAGES.heroExhibition,
    imageCaption: 'Fresh light-green janur woven into ketupat pouches, fans, and garlands.',
    diagramType: 'anatomy',
    subsections: [
      {
        subheading: 'Where Does the Name "Janur" Come From?',
        paragraphs: [
          'Janur is an Indonesian and Javanese word for young coconut palm leaves (from the coconut tree, Cocos nucifera). Different islands in Indonesia also have their own words for it. For example, people in Bali call it busung, and Sundanese people in West Java call it daun kalapa ngora.',
          'Young leaves grow tightly folded at the top of the coconut tree, away from strong sunlight. That is why they stay light yellow-green and smooth.',
        ],
        practicalExample:
          'To weave a good ketupat, crafters pick leaves that have just opened. Dark old leaves crack when you fold them, and tiny white baby leaves rip too easily.',
      },
      {
        subheading: 'Parts of One Coconut Leaf',
        paragraphs: [
          'One big coconut branch has many long, narrow leaves on both sides. Each leaf has two soft green strips joined by a hard wooden stick in the middle. In Indonesia, this middle stick is called the lidi.',
          'When you cut away the hard stick in the middle, you get two soft green strips ready to weave.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Janur',
        origin: 'Indonesian / Javanese',
        definition: 'Young, light yellow-green coconut leaves used for weaving and decorations.',
      },
      {
        term: 'Busung',
        origin: 'Balinese',
        definition: 'The Balinese word for young coconut leaves used in temple offerings.',
      },
      {
        term: 'Lidi',
        origin: 'Indonesian',
        definition: 'The thin, hard stick in the middle of each coconut leaf.',
      },
    ],
  },
  {
    id: 'history-cultural-significance',
    number: '02',
    title: 'History & Cultural Significance',
    subtitle: 'Why coconut-leaf crafts matter in Indonesian parties and daily life',
    readTime: '3 min read',
    category: 'History',
    leadParagraph:
      'Long before paper banners or plastic ribbons existed, Indonesian families used coconut trees near their homes to celebrate happy days. Janur crafts are not made to sit inside a glass box forever. They are made fresh for joyful parties, prayers, and family meals.',
    imageUrl: JANUR_IMAGES.kembarMayang,
    imageCaption: 'Javanese Kembar Mayang wedding decoration made from woven coconut leaves.',
    subsections: [
      {
        subheading: 'Made Fresh for Happy Moments',
        paragraphs: [
          'People across Indonesia have woven coconut leaves for hundreds of years. In Bali and Java, communities used young coconut leaves to say thank you for good harvests, weddings, and new beginnings.',
          'Fresh janur stays bright green for only a few days before it turns golden brown. This reminds people to enjoy the special moment today.',
        ],
      },
      {
        subheading: 'Ketupat and Holiday Traditions in Java',
        paragraphs: [
          'In Java, woven diamond rice pouches called ketupat (or kupat) are famous during Bakda Kupat, a happy celebration seven days after Eid al-Fitr. Stories often connect this tradition to Sunan Kalijaga, a well-known teacher in Java during the 1400s and 1500s.',
          'In Javanese, the word "kupat" sounds like "ngaku lepat", which means saying sorry and forgiving each other. The criss-cross weave stands for life’s busy paths, while the white rice inside stands for a clean, kind heart.',
        ],
        practicalExample:
          'In many villages in Java and Madura, families still hang woven ketupat above their front doors during the holiday week to welcome neighbors.',
      },
    ],
    keyTerms: [
      {
        term: 'Bakda Kupat',
        origin: 'Javanese Tradition',
        definition: 'A friendly holiday seven days after Eid al-Fitr when families cook and share ketupat.',
      },
      {
        term: 'Yadnya',
        origin: 'Balinese',
        definition: 'Prayer offerings made with thankfulness, often placed in woven leaf trays.',
      },
    ],
    culturalNote: {
      title: 'Why We Cannot Find 1,000-Year-Old Leaves',
      body: 'Because coconut leaves break down into soil in a few weeks, very old leaf crafts do not stay intact underground like stone statues. Instead, we learn their history from old temple carvings, stories, and parents teaching their children.',
    },
  },
  {
    id: 'types-of-janur-crafts',
    number: '03',
    title: 'Types of Janur Crafts',
    subtitle: 'Four main kinds of janur: food pouches, big decorations, flower trays, and toys',
    readTime: '3 min read',
    category: 'Types',
    leadParagraph:
      'Many visitors first know janur from ketupat, the woven diamond rice pouch. But Indonesian crafters actually make hundreds of shapes from young coconut leaves—from tall street poles to cute toy grasshoppers.',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Woven diamond ketupat served next to rolled lepet rice.',
    subsections: [
      {
        subheading: '1. Food Pouches & Wraps',
        paragraphs: [
          'Boiling rice inside woven coconut leaves gives the food a gentle, fresh leaf smell. Popular shapes include Ketupat Bawang (a plump diamond with six corners), Ketupat Pasar (a square pouch), Clorot (a cone for sweet cake), and Lepet (sticky rice rolled in a leaf tube).',
        ],
      },
      {
        subheading: '2. Wedding & Festival Decorations',
        paragraphs: [
          'Big janur decorations tell the whole street that a party is happening! In Bali, tall curved bamboo poles called Penjor line the roads during the Galungan festival. In Java, tall janur arches stand outside wedding houses with Kembar Mayang leaf bouquets.',
        ],
      },
      {
        subheading: '3. Daily Flower Trays for Prayers',
        paragraphs: [
          'In Bali, families fold small square trays (ceper), flower crowns (sampian), and long patterned banners (lamak) to hold flowers and rice for daily prayers.',
        ],
      },
      {
        subheading: '4. Handmade Leaf Toys',
        paragraphs: [
          'Using extra strips of leaf, crafters weave fun toys for kids like grasshoppers (belalang), little birds (manuk-manukan), toy daggers, pinwheels, and tiny baskets.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Clorot',
        origin: 'Javanese / Indonesian',
        definition: 'A small cone rolled from janur to steam sweet rice cake with palm sugar.',
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
    subtitle: 'Simple natural materials and small hand tools with zero plastic',
    readTime: '2 min read',
    category: 'Tools',
    leadParagraph:
      'You do not need big machines, glue, or metal staples to make janur crafts. Most Indonesian crafters only need a small sharp knife or scissors, tiny bamboo pins, and a bowl of cool water.',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Removing the hard stick from the middle of a fresh coconut leaf with a small knife.',
    subsections: [
      {
        subheading: 'Natural Materials',
        paragraphs: [
          'Young coconut leaves (janur) are the main material because they are soft and strong. Sometimes crafters add dark green old leaves (slepan) for color contrast, or sweet-smelling pandan leaves.',
          'For big arches and wedding displays, builders also use bamboo poles, banana tree stems to hold flowers moist, and thin bamboo ties.',
        ],
      },
      {
        subheading: 'Simple Hand Tools',
        paragraphs: [
          'Small Craft Knife (Pisau Raut / Mutik) or Scissors: Used to remove the hard middle stick (lidi) and cut neat edge patterns.',
          'Bamboo Pins (Semat): Tiny 2–3 cm sticks made from bamboo or coconut midribs. Crafters push them through folded leaves like sewing pins so they do not need tape or glue.',
        ],
        practicalExample:
          'When making a Balinese flower tray, a crafter pushes a tiny bamboo semat pin through two folded corners in one quick move. It holds tightly and has zero plastic!',
      },
    ],
    keyTerms: [
      {
        term: 'Pisau Raut / Mutik',
        origin: 'Indonesian / Balinese',
        definition: 'A small craft knife used to cut coconut leaves cleanly.',
      },
      {
        term: 'Semat',
        origin: 'Indonesian / Balinese',
        definition: 'A tiny sharp pin made from bamboo or coconut stick used to hold leaf folds together.',
      },
    ],
  },
  {
    id: 'techniques-folding-methods',
    number: '05',
    title: 'Techniques & Folding Methods',
    subtitle: 'Four easy skills: stripping, over-under weaving, fan folding, and edge cutting',
    readTime: '3 min read',
    category: 'Techniques',
    leadParagraph:
      'Even fancy janur decorations use a few simple tricks. Instead of gluing pieces together, crafters lock leaf strips together using tight folds and criss-cross weaving.',
    diagramType: 'techniques',
    subsections: [
      {
        subheading: 'Removing the Stick (Menyeset) & Weaving (Anyaman)',
        paragraphs: [
          'First, crafters remove the hard stick in the middle of the leaf (menyeset). You get two soft green strips.',
          'Next is anyaman, which means weaving strips over and under each other like a checkerboard. In a ketupat, over-and-under weaving locks all the sides so raw rice stays inside while boiling.',
        ],
      },
      {
        subheading: 'Fan Folding (Lipatan), Edge Cutting (Ringgitan) & Tucking (Kunci)',
        paragraphs: [
          'For party flowers and crowns, crafters fold strips back and forth like a paper fan (lipatan) and cut neat zigzags or waves along the edges (ringgitan).',
          'At the end, they tuck any loose leaf ends under nearby strips (kunci) so the craft looks neat and stays locked.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Anyaman',
        origin: 'Indonesian',
        definition: 'Weaving strips over and under each other to make pouches, mats, or baskets.',
      },
      {
        term: 'Ringgitan',
        origin: 'Balinese / Javanese',
        definition: 'Pretty zigzag or curved cuts made along the edges of folded leaves.',
      },
    ],
  },
  {
    id: 'step-by-step-tutorials',
    number: '06',
    title: 'Step-by-Step Tutorials',
    subtitle: 'Easy beginner steps to try coconut-leaf weaving yourself',
    readTime: '2 min read',
    category: 'Tutorials',
    leadParagraph:
      'The best way to understand janur is to try folding it with your own hands! Beginners usually start by making a simple Ketupat Bawang before trying a flower crown or leaf grasshopper.',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    imageCaption: 'Finished Ketupat Bawang pouches with neat criss-cross weaving.',
    subsections: [
      {
        subheading: 'How Beginners Start',
        paragraphs: [
          'Step 1 — Remove the Middle Stick: Cut away the hard stick in the middle of the leaf so you have two soft green strips.',
          'Step 2 — Weave Two Strips Together: Take two strips of janur. Make three loops with each strip. Put the strips over and under each other, then gently pull them tight to make a diamond shape.',
          'Step 3 — Practice Fan Folds: Fold short strips back and forth like a small fan and pin them into a flower circle.',
        ],
        practicalExample:
          'Do you live somewhere without coconut trees? You can still practice every tutorial at home using 2.5 cm wide gift ribbon or soft paper strips!',
      },
    ],
    keyTerms: [
      {
        term: 'Merapatkan',
        origin: 'Indonesian',
        definition: 'Gently pulling each woven strip from the middle to the ends to close all gaps.',
      },
    ],
  },
  {
    id: 'traditional-modern-creations',
    number: '07',
    title: 'Traditional & Modern Creations',
    subtitle: 'How young Indonesian artists use old leaf skills to make modern eco-art',
    readTime: '2 min read',
    category: 'Modern Art',
    leadParagraph:
      'Janur craft is not only from the past—it is growing in fun new ways today! Young Indonesian designers and florists now use traditional leaf folding to make modern hanging lamps, plastic-free wedding backdrops, and party centerpieces.',
    imageUrl: JANUR_IMAGES.modernDesign,
    imageCaption: 'Modern woven coconut-leaf hanging lamps and table centerpiece in a bright room.',
    subsections: [
      {
        subheading: 'From Village Celebrations to Modern Rooms',
        paragraphs: [
          'Classic crafts like Javanese Kembar Mayang and Balinese Penjor follow old community traditions. Modern artists take those same folding and weaving skills and turn them into cool lampshades and wall art.',
          'Because many hotels and party planners want to stop using plastic foam and fake flowers, fresh janur art has become a popular, earth-friendly choice.',
        ],
        practicalExample:
          'Some hotels in Bali and Yogyakarta hang giant woven coconut-leaf lamps that glow warmly at night and slowly dry from bright green to soft gold.',
      },
    ],
    keyTerms: [
      {
        term: 'Anyaman Kontemporer',
        origin: 'Indonesian',
        definition: 'Modern creative weaving that uses traditional plant folding in fresh new designs.',
      },
    ],
  },
  {
    id: 'regional-diversity',
    number: '08',
    title: 'Regional Diversity',
    subtitle: 'How janur names, shapes, and customs change across Indonesia’s islands',
    readTime: '3 min read',
    category: 'Regions',
    leadParagraph:
      'Indonesia has more than 17,000 islands and hundreds of local cultures. Every island has its own leaf names, weaving styles, and favorite holidays for janur—so each place feels special.',
    imageUrl: JANUR_IMAGES.penjorBali,
    imageCaption: 'Tall curved Balinese Penjor poles lining a village road during Galungan.',
    subsections: [
      {
        subheading: 'Different Islands, Different Traditions',
        paragraphs: [
          'In Bali, families fold young coconut leaves (busung) every day to make Canang Sari flower trays and tall Penjor festival poles.',
          'In Central Java and Yogyakarta, tall janur arches welcome wedding guests at the front gate, and matched Kembar Mayang bouquets wish the couple a happy life.',
          'In West Sumatra (Minangkabau), South Kalimantan (Banjar), and South Sulawesi (Bugis–Makassar), coconut-leaf weaving is a big part of tasty everyday meals like Katupek curry, Katupat Kandangan, and rolled Lappa-lappa.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Katupek',
        origin: 'Minangkabau (West Sumatra)',
        definition: 'Woven coconut-leaf rice cakes eaten every day with warm spiced curry.',
      },
      {
        term: 'Lappa-lappa',
        origin: 'Bugis–Makassar (South Sulawesi)',
        definition: 'Sticky coconut rice rolled in young coconut leaves and tied with natural string.',
      },
    ],
    culturalNote: {
      title: 'Try the Indonesia Map Below',
      body: 'Scroll down to the Indonesian Cultural Map to click on seven different regions and see their local names and photos.',
    },
  },
  {
    id: 'preservation-of-craft',
    number: '09',
    title: 'Preservation of the Craft',
    subtitle: 'How families, clubs, and schools keep janur weaving alive',
    readTime: '3 min read',
    category: 'Preservation',
    leadParagraph:
      'Because fresh leaf crafts dry out after a few days, the real treasure is the skill in people’s hands. Keeping this tradition alive means older crafters teaching kids and teens how to weave.',
    imageUrl: JANUR_IMAGES.canangOfferings,
    imageCaption: 'Balinese flower offerings made by families and neighbors working side by side.',
    subsections: [
      {
        subheading: 'Learning Together in Neighborhoods & Schools',
        paragraphs: [
          'In Bali, neighbors gather together before big temple festivals. Kids and teens sit next to older family members to practice cutting and pinning leaves.',
          'In Java and other islands, community art studios (sanggar), neighborhood ketupat-weaving contests before Eid, and school art classes help students learn the craft.',
          'Indonesia’s Ministry of Education and Culture also lists regional weaving traditions as Intangible Cultural Heritage (Warisan Budaya Takbenda) to protect and share them.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Sanggar',
        origin: 'Indonesian',
        definition: 'A neighborhood studio or club where people learn traditional crafts, music, and dance.',
      },
      {
        term: 'Warisan Budaya Takbenda',
        origin: 'Indonesian Heritage List',
        definition: 'Indonesia’s official list that records and protects living skills and traditions.',
      },
    ],
  },
  {
    id: 'interactive-craft-visualization',
    number: '10',
    title: 'Interactive Janur Craft Visualization',
    subtitle: 'See why crossing strips Over and Under locks a ketupat together',
    readTime: '2 min read',
    category: 'Weave Logic',
    leadParagraph:
      'Watching someone weave a ketupat fast can look like magic! When you slow down and look closely, the secret is easy: crossing leaf strips Over and Under like a checkerboard locks every side tight.',
    diagramType: 'weave-interactive',
    subsections: [
      {
        subheading: 'Test the Over-and-Under Pattern Below',
        paragraphs: [
          'A classic Ketupat Bawang needs only two strips. Three loops of Strip A cross three loops of Strip B. When each spot switches between Over and Under, the strips grip each other tightly.',
          'Click the squares below to switch Over and Under and watch what happens—or go straight to the Interactive Craft Studio to cut, fold, and weave a ketupat yourself!',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Over–Under Weave',
        origin: 'Weaving Basics',
        definition: 'Switching which strip goes on top at each crossing so the weave cannot slip apart.',
      },
    ],
  },
  {
    id: 'preparation-and-care',
    number: '11',
    title: 'Preparation & Care of Janur',
    subtitle: 'Picking leaves safely without hurting the tree and keeping them soft',
    readTime: '2 min read',
    category: 'Leaf Care',
    leadParagraph:
      'Good crafting starts with caring for both the coconut tree and the fresh leaves. If a leaf gets too dry, it can crack when you try to fold it.',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Cutting away the hard middle stick gently keeps the green strips smooth.',
    subsections: [
      {
        subheading: 'Picking Leaves Safely',
        paragraphs: [
          'Workers cut only a few outer young branches and never cut the center growing tip (umbut) of the tree. That way, the coconut palm stays healthy and keeps growing.',
          'After picking, crafters often let leaves rest in the shade for a little while so they become softer and easier to bend.',
        ],
      },
      {
        subheading: 'Keeping Leaves Fresh Before Crafting',
        paragraphs: [
          'Wrapping stripped leaves in a damp towel or fresh banana leaf keeps them soft for 2 to 4 days in a cool room.',
          'Finished decorations stay bright green for about 2–3 days if lightly misted with water, then gently turn golden tan.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Umbut',
        origin: 'Indonesian',
        definition: 'The soft growing heart at the top of a palm tree that workers keep safe.',
      },
    ],
  },
  {
    id: 'uses-and-applications',
    number: '12',
    title: 'Uses & Applications',
    subtitle: 'How janur is used in kitchens, temples, weddings, and eco-friendly parties',
    readTime: '2 min read',
    category: 'Uses',
    leadParagraph:
      'In Indonesia, people use janur in both holy ceremonies and everyday family meals. Very few plants in the world can wrap lunch, decorate a street, and welcome wedding guests!',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Cooked ketupat and tied lepet ready to enjoy at a family meal.',
    subsections: [
      {
        subheading: 'Four Common Ways People Use Janur',
        paragraphs: [
          '1. Cooking Food: Woven pouches let hot water cook rice evenly and give it a nice, fresh leaf smell—like natural zero-plastic cookware.',
          '2. Temple Prayers: Daily Canang Sari flower trays and tall Penjor poles show gratitude in Bali.',
          '3. Weddings & Family Parties: Janur wedding gates, Kembar Mayang bouquets, and baby-blessing crafts (mitoni) celebrate happy family days.',
          '4. Eco-Friendly Events: Hotels and schools weave janur garlands and table pieces instead of buying plastic decorations.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Mitoni / Tingkeban',
        origin: 'Javanese Tradition',
        definition: 'A happy seven-month family celebration blessing a mother and baby.',
      },
    ],
  },
  {
    id: 'janur-crafts-sustainability',
    number: '13',
    title: 'Janur Crafts & Sustainability',
    subtitle: 'Why janur is a smart, zero-waste, planet-friendly craft',
    readTime: '2 min read',
    category: 'Sustainability',
    leadParagraph:
      'Today, people everywhere want to use less single-use plastic. Indonesian janur craft shows how a traditional plant skill can be 100% natural, zero-waste, and friendly to our planet.',
    diagramType: 'sustainability',
    subsections: [
      {
        subheading: 'Every Part of the Leaf Is Useful',
        paragraphs: [
          'Picking a few branches does not hurt the coconut palm. A healthy tree grows 12 to 16 new branches every single year.',
          'The soft green blades become ketupat pouches or decorations. The leftover hard middle sticks (lidi) are tied together into sweeping brooms (sapu lidi), food skewers, or tiny pins.',
        ],
        practicalExample:
          'After a party or holiday dinner, old janur crafts never go into plastic trash. They break down naturally into rich soil for garden plants in just a few weeks.',
      },
    ],
    keyTerms: [
      {
        term: 'Sapu Lidi',
        origin: 'Indonesian',
        definition: 'A strong outdoor sweeping broom made from hundreds of leftover coconut leaf sticks.',
      },
    ],
  },
];
