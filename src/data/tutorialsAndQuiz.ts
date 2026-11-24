import { CraftTutorial, QuizQuestion } from '../types/janur';
import { JANUR_IMAGES } from './images';

export const CRAFT_TUTORIALS: CraftTutorial[] = [
  {
    id: 'ketupat-bawang',
    title: 'Weaving a Classic Ketupat Bawang',
    indonesianTitle: 'Anyaman Ketupat Bawang',
    level: 'Beginner',
    duration: '15–20 mins',
    leafCount: '2 stripped janur blades (1 frond leaflet pair)',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    diagramType: 'ketupat',
    summary:
      'Learn the foundational interlocking six-corner diamond weave used across Indonesia to cook compressed rice cakes without glue or fasteners.',
    materials: [
      '2 fresh, supple young coconut leaf strips (~70–90 cm long, 2.5–3 cm wide)',
      'Damp cotton cloth to keep strips pliable while practicing',
    ],
    tools: [
      'Small sharp paring knife (pisau raut) for stripping the central lidi',
      'Bowl of cool water for lightly misting dry fronds',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Strip the Central Midrib (Menyeset)',
        instruction:
          'Hold the base of a young coconut leaflet and gently slice along both sides of the central wooden rib (lidi) to separate it into two clean, flexible ribbon strands.',
        tip: 'Keep the blade angled slightly toward the woody rib so the green leaf lamina remains at full width.',
      },
      {
        stepNumber: 2,
        title: 'Coil Three Spiral Loops on Each Hand',
        instruction:
          'Wrap Strand A three times around your left hand with the thick base stem pointing upward. Wrap Strand B three times around your right hand with its base stem pointing downward.',
        tip: 'Leave the coils loose enough to slide strands smoothly between loops—tightening comes at the end.',
      },
      {
        stepNumber: 3,
        title: 'Interlock the Opposing Coils',
        instruction:
          'Pass the three loops of Strand B horizontally through the three loops of Strand A using a strict alternating pattern: Over–Under–Over on the first ring, Under–Over–Under on the second, and Over–Under–Over on the third.',
      },
      {
        stepNumber: 4,
        title: 'Wrap the Base Tails Around the Equator',
        instruction:
          'Fold each protruding thick base stem 90 degrees and weave it through the side gaps around the perimeter until the two base stems meet at the bottom point.',
      },
      {
        stepNumber: 5,
        title: 'Fold the Tapered Tips to Seal the Crown',
        instruction:
          'Trace the thin tapered leaf tips along the remaining diamond faces, tucking them under the crossing ribs until they exit together at the top point.',
      },
      {
        stepNumber: 6,
        title: 'Tighten Progressively (Merapatkan)',
        instruction:
          'Pull each leaf strand gently along its weave path from center to tip, closing every gap so raw rice grains cannot escape during boiling.',
      },
    ],
    culturalUse:
      'Served during Eid al-Fitr (Bakda Kupat), regional harvest feasts, and classic Indonesian dishes such as Ketupat Sayur, Kupat Tahu, and Katupat Kandangan.',
  },
  {
    id: 'sampian-rosette',
    title: 'Pleated Sampian Rosette',
    indonesianTitle: 'Sampian Uras / Bunga Janur',
    level: 'Beginner',
    duration: '12–15 mins',
    leafCount: '4–6 trimmed janur strips (~25 cm each)',
    imageUrl: JANUR_IMAGES.canangOfferings,
    diagramType: 'sampian',
    summary:
      'Create the radiating pleated coconut-leaf rosette crown found atop Balinese Canang Sari offerings and decorative table settings.',
    materials: [
      '4 to 6 fresh pale-ivory young coconut leaf halves',
      '4–6 slender bamboo or coconut-midrib pins (semat, ~2 cm each)',
    ],
    tools: [
      'Small curved craft knife (mutik / pisau kecil)',
      'Scissors for optional decorative scalloped edge notches',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Trim & Taper the Leaf Segments',
        instruction:
          'Cut stripped janur blades into equal 25 cm lengths and bevel each end into a clean pointed petal tip.',
      },
      {
        stepNumber: 2,
        title: 'Notch Decorative Edge Ridges (Ringgitan)',
        instruction:
          'Cut small rhythmic triangular notches or sweeping curves along one long edge of each strip to create lace-like petal texture.',
      },
      {
        stepNumber: 3,
        title: 'Accordion-Pleat Each Strip',
        instruction:
          'Fold each notched strip in crisp alternating pleats, radiating outward from a tight center crease like a folding fan.',
      },
      {
        stepNumber: 4,
        title: 'Pin Into a Circular Rosette',
        instruction:
          'Join four pleated fans edge-to-edge in a circle and stitch their inner bases securely together with slender semat midrib pins.',
      },
    ],
    culturalUse:
      'Used as the ornamental crown on Balinese ceremonial offering trays and adapted today as biodegradable floral table rosettes.',
  },
  {
    id: 'belalang-janur',
    title: 'Woven Janur Grasshopper',
    indonesianTitle: 'Belalang Janur (Walang)',
    level: 'Intermediate',
    duration: '15 mins',
    leafCount: '2 stripped janur blades + 1 thin lidi segment',
    imageUrl: JANUR_IMAGES.heroExhibition,
    diagramType: 'grasshopper',
    summary:
      'Craft an iconic Indonesian folk toy and table ornament featuring a segmented woven body, folded antennae, and springy arched legs.',
    materials: [
      '2 supple young coconut leaf blades stripped from the lidi',
      '1 thin lidi rib saved for internal spine support',
    ],
    tools: ['Small craft knife or scissors', 'Damp cloth for softening tips'],
    steps: [
      {
        stepNumber: 1,
        title: 'Form the Crossed Starter Knot',
        instruction:
          'Cross two equal leaf ribbons at a 90-degree angle near their bases and fold each over the other to lock a small square head.',
      },
      {
        stepNumber: 2,
        title: 'Plait the Segmented Thorax & Abdomen',
        instruction:
          'Alternately fold the two ribbons over each other in a tight rectangular box-braid (anyaman lilit) for 6–8 segments, tapering slightly toward the tail.',
      },
      {
        stepNumber: 3,
        title: 'Fold Back Hind Legs & Wings',
        instruction:
          'Split the remaining thin tip strands diagonally: crease two segments into sharp V-shaped hind legs and tuck two flat blades along the back as wings.',
      },
      {
        stepNumber: 4,
        title: 'Shape the Antennae',
        instruction:
          'Pull two narrow sliver strips from the head knot and curl them gently between thumb and blade edge for delicate curved antennae.',
      },
    ],
    culturalUse:
      'Traditionally woven by elders to delight children at village markets and festivals, and featured in Javanese Kembar Mayang or modern botanical displays.',
  },
  {
    id: 'keris-janur',
    title: 'Ceremonial Woven Keris Ornament',
    indonesianTitle: 'Keris-Kerisan Janur',
    level: 'Advanced',
    duration: '25–30 mins',
    leafCount: '4 stripped janur blades + 1 sturdy lidi core',
    imageUrl: JANUR_IMAGES.kembarMayang,
    diagramType: 'keris',
    summary:
      'Construct the sinuous, wave-edged ceremonial dagger silhouette featured inside Javanese Kembar Mayang wedding arrangements.',
    materials: [
      '4 long, unblemished young coconut leaf blades (min. 80 cm)',
      '1 full-length straight lidi midrib to form the central rigid spine',
    ],
    tools: [
      'Precision craft blade',
      'Small bamboo semat pins to anchor the crossguard (warangka)',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Anchor Four Strands Around the Lidi Spine',
        instruction:
          'Bind four stripped blades around one end of the lidi core using a tight spiral wrap to form the sculpted hilt (ukiran).',
      },
      {
        stepNumber: 2,
        title: 'Fold the Crossguard Wings',
        instruction:
          'Extend two opposing horizontal loops below the hilt and pin them in subtle upward curves to form the classic boat-shaped keris crossguard.',
      },
      {
        stepNumber: 3,
        title: 'Weave the Undulating Blade (Luk)',
        instruction:
          'Plait the blades down the lidi spine in alternating diagonal zigzags—shifting tension left and right every two turns to create traditional sinuous waves (luk).',
      },
      {
        stepNumber: 4,
        title: 'Lock the Tapered Tip',
        instruction:
          'Tuck the final narrow ends tightly around the tip of the lidi core and trim cleanly at a sharp diagonal point.',
      },
    ],
    culturalUse:
      'A quintessential component of Javanese Kembar Mayang wedding bouquets, symbolizing courage, moral discernment, and guardianship.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topic: 'Botany & Terminology',
    question: 'What natural botanical material is "janur" harvested from?',
    options: [
      'Mature dried banana leaves',
      'Young, unfurled pale yellow-green leaves of the coconut palm (Cocos nucifera)',
      'Split young bamboo shoots',
      'Wild riverside pandan reeds',
    ],
    correctIndex: 1,
    explanation:
      'Janur refers specifically to the young, unopened frond of the coconut palm (Cocos nucifera). Because it has not yet darkened in full sunlight, it retains a luminous pale yellow-to-sage hue and high flexibility ideal for folding and weaving.',
  },
  {
    id: 'q2',
    topic: 'Craft Anatomy',
    question: 'When preparing a coconut leaflet for weaving ketupat, what is the central woody spine called that is stripped away with a knife?',
    options: ['Semat', 'Lidi', 'Sampian', 'Gedebog'],
    correctIndex: 1,
    explanation:
      'The rigid central midrib of a coconut leaflet is called the lidi. Artisans strip the twin leaf blades off the lidi (a process called menyeset) and repurpose the lidi into traditional brooms (sapu lidi) or fastening pins.',
  },
  {
    id: 'q3',
    topic: 'Regional Heritage — Bali',
    question: 'In Bali, tall curved bamboo poles adorned with intricate hanging janur (busung) ornaments during Galungan are known as:',
    options: ['Kembar Mayang', 'Penjor', 'Lepet', 'Lappa-lappa'],
    correctIndex: 1,
    explanation:
      'A Penjor is a tall, gracefully curved bamboo pole decorated with woven young coconut leaves (busung), agricultural produce, and hanging sampian pendants erected along Balinese streets for Galungan and temple ceremonies.',
  },
  {
    id: 'q4',
    topic: 'Regional Heritage — Java',
    question: 'Which paired ceremonial janur arrangement, featuring woven keris daggers, fans, and birds, is carried during traditional Javanese weddings?',
    options: ['Canang Sari', 'Kembar Mayang', 'Katupek Pitalah', 'Burasa'],
    correctIndex: 1,
    explanation:
      'Kembar Mayang ("twin blossoms") is a pair of sculptural ceremonial arrangements rooted in Central Javanese and Yogyakarta wedding traditions, symbolizing harmony and blessings for the couple.',
  },
  {
    id: 'q5',
    topic: 'Weaving Technique',
    question: 'How many interlocking spiral loops are typically formed on each hand before weaving a classic diamond-shaped Ketupat Bawang?',
    options: [
      'One large loop per hand',
      'Three spiral coils per hand with opposing stem directions',
      'Six flat strips laid parallel on a table',
      'Two closed knots tied before coiling',
    ],
    correctIndex: 1,
    explanation:
      'The classic Ketupat Bawang begins by coiling two stripped janur blades into three opposing spiral loops on each hand (one base stem up, one down), then interlocking them in an over-under-over weave.',
  },
  {
    id: 'q6',
    topic: 'Culinary & Cultural Meaning',
    question: 'In Javanese cultural lore associated with Bakda Kupat (one week after Eid al-Fitr), what phrase is commonly connected to the word "kupat"?',
    options: [
      'Ngaku lepat (acknowledging mistakes)',
      'Tri Hita Karana (three causes of well-being)',
      'Gotong royong (building houses together)',
      'Subak (traditional terrace irrigation)',
    ],
    correctIndex: 0,
    explanation:
      'In Javanese cultural tradition, "kupat" is linked to "ngaku lepat" (acknowledging one’s mistakes and seeking forgiveness) and "laku papat" (four celebratory virtues), connecting culinary craft with social reconciliation.',
  },
  {
    id: 'q7',
    topic: 'Regional Diversity',
    question: 'In West Sumatra (Minangkabau), woven young coconut-leaf rice pouches served year-round with spiced jackfruit or fern curry are known as:',
    options: ['Sampian', 'Katupek', 'Canang', 'Ringgitan'],
    correctIndex: 1,
    explanation:
      'In Minangkabau culinary culture, woven coconut-leaf rice cakes are called katupek (such as Katupek Pitalah and Katupek Gulai Kapau), demonstrating how janur weaving varies richly across Indonesia.',
  },
  {
    id: 'q8',
    topic: 'Preparation & Sustainability',
    question: 'Why are young coconut fronds carefully wrapped in damp cloth or banana leaves before weaving, and what happens to the finished crafts afterward?',
    options: [
      'To bleach them white with synthetic dye; they are recycled as plastic resin',
      'To retain natural moisture so fibers do not crack; finished crafts are 100% biodegradable and compostable',
      'To harden the ribs like metal wire; they are laminated for permanent storage',
      'To remove all chlorophyll before boiling; they require chemical sealant',
    ],
    correctIndex: 1,
    explanation:
      'Keeping janur cool and slightly hydrated preserves natural flexibility during folding. Because traditional janur crafts rely on mechanical weaving and bamboo or midrib pins with zero synthetic adhesives, used pieces return cleanly to soil as compost.',
  },
];
