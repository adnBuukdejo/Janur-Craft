import { CraftTutorial, QuizQuestion } from '../types/janur';
import { JANUR_IMAGES } from './images';

export const CRAFT_TUTORIALS: CraftTutorial[] = [
  {
    id: 'ketupat-bawang',
    title: 'How to Make a Classic Ketupat',
    indonesianTitle: 'Ketupat Bawang',
    level: 'Beginner',
    duration: '15–20 mins',
    leafCount: '2 soft green janur strips',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    diagramType: 'ketupat',
    summary:
      'Learn how to weave two strips of janur into Indonesia’s famous diamond-shaped rice pouch. No glue or tape needed!',
    whatYouNeed: {
      materials: [
        '1 fresh young coconut leaf (gives 2 soft green strips, about 70–90 cm long)',
        'Or 2 strips of 2.5 cm wide gift ribbon or soft paper if you do not have coconut leaves',
      ],
      tools: [
        'Scissors or a small knife (to remove the hard middle stick)',
        'A damp towel or bowl of cool water to keep the leaf soft',
      ],
    },
    beforeYouStart: [
      'Wipe the leaf with a damp cloth so it bends easily and does not crack.',
      'Keep your loops loose while weaving. You will pull everything tight at the very end.',
      'Keep Strip A in your left hand and Strip B in your right hand so they stay neat.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Remove the Middle Stick (Lidi)',
        instruction:
          'Remove the hard stick in the middle of the leaf using scissors or a small knife. You will have two soft green strips.',
        tip: 'Save the middle sticks! People in Indonesia tie them together to make brooms.',
        visualType: 'strip-lidi',
      },
      {
        stepNumber: 2,
        title: 'Make 3 Loops with Each Strip',
        instruction:
          'Take Strip A and wrap it into 3 loops on your left hand with the thick end pointing UP. Wrap Strip B into 3 loops on your right hand with the thick end pointing DOWN.',
        tip: 'Leave a little space between each loop so the strips can slide through.',
        visualType: 'coil-three',
      },
      {
        stepNumber: 3,
        title: 'Weave Over and Under',
        instruction:
          'Put the 3 loops of Strip B across Strip A. Row 1 goes Over–Under–Over. Row 2 goes Under–Over–Under. Row 3 goes Over–Under–Over.',
        tip: 'Make sure the Over and Under pattern changes on every row!',
        visualType: 'weave-cross',
      },
      {
        stepNumber: 4,
        title: 'Fold the Thick Ends Around the Sides',
        instruction:
          'Take each thick end, fold it around the side edge, and weave it through until both thick ends meet at the bottom.',
        visualType: 'wrap-tails',
      },
      {
        stepNumber: 5,
        title: 'Tuck the Thin Tips at the Top',
        instruction:
          'Fold the two thin pointed tips along the top sides and tuck them under the crossing bands so they meet at the top corner.',
        visualType: 'tuck-tips',
      },
      {
        stepNumber: 6,
        title: 'Pull Tight Into a Diamond Shape',
        instruction:
          'Gently pull each strip from the middle toward the ends. All gaps will close, and your pouch will become a firm diamond shape!',
        visualType: 'tighten-ketupat',
      },
    ],
    visualGuideCaption:
      'Visual Guide: Make 3 loops with each strip, weave them over and under, tuck the ends, and pull tight into a diamond.',
    finishedCraftNote:
      'Your finished Ketupat Bawang is hollow inside and locked tight! Cooks fill it two-thirds full with raw rice through a tiny corner gap before boiling it.',
  },
  {
    id: 'sampian-rosette',
    title: 'Pleated Flower Crown (Sampian)',
    indonesianTitle: 'Sampian Uras / Bunga Janur',
    level: 'Beginner',
    duration: '12–15 mins',
    leafCount: '4 to 6 short leaf strips',
    imageUrl: JANUR_IMAGES.canangOfferings,
    diagramType: 'sampian',
    summary:
      'Make the pretty star-shaped flower crown seen on Balinese Canang Sari prayer trays and party tables.',
    whatYouNeed: {
      materials: [
        '4 to 6 soft green janur strips (about 25 cm long each)',
        '4 to 6 toothpicks or tiny bamboo pins (semat)',
      ],
      tools: [
        'Craft scissors',
        'A damp cloth to keep the leaves fresh',
      ],
    },
    beforeYouStart: [
      'Cut all leaf strips to the same 25 cm length so your flower looks round and neat.',
      'Be careful with the sharp ends of toothpicks or bamboo pins.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cut Pointed Petal Ends',
        instruction:
          'Use scissors to cut both ends of each strip into neat pointed tips like flower petals.',
        visualType: 'trim-petal',
      },
      {
        stepNumber: 2,
        title: 'Cut Pretty Zigzags on One Edge',
        instruction:
          'Snip small triangles or smooth waves along one long side of each strip.',
        tip: 'Small V-shaped triangles are the easiest pattern for beginners!',
        visualType: 'notch-edge',
      },
      {
        stepNumber: 3,
        title: 'Fold Like a Paper Fan',
        instruction:
          'Fold each strip back and forth from a tight bottom point so it opens wide like a hand fan.',
        visualType: 'pleat-fan',
      },
      {
        stepNumber: 4,
        title: 'Pin Into a Flower Circle',
        instruction:
          'Put 4 folded fans together in a circle with the wide sides facing out, then push pins through the middle to hold them.',
        visualType: 'pin-rosette',
      },
    ],
    visualGuideCaption:
      'Visual Guide: Cut pointed petals, snip edge zigzags, fold like fans, and pin them in a flower circle.',
    finishedCraftNote:
      'Put a fresh flower in the middle of your Sampian! In Bali, people place this leaf crown on top of square trays every morning.',
  },
  {
    id: 'belalang-janur',
    title: 'Woven Janur Grasshopper',
    indonesianTitle: 'Belalang Janur (Walang)',
    level: 'Intermediate',
    duration: '15 mins',
    leafCount: '2 leaf strips + 1 center stick',
    imageUrl: JANUR_IMAGES.heroExhibition,
    diagramType: 'grasshopper',
    summary:
      'Fold two green coconut-leaf strips into a cute toy grasshopper with bent jumping legs and curly feelers.',
    whatYouNeed: {
      materials: [
        '2 long soft janur strips (about 75 cm long)',
        '1 thin piece of middle lidi stick (optional, to keep it straight)',
      ],
      tools: [
        'Scissors to split thin strips for the legs and feelers',
      ],
    },
    beforeYouStart: [
      'Use fresh, soft leaves. Dry leaves can snap when you bend the grasshopper’s legs.',
      'Sit at a clean table so you can see both strips easily.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cross Two Strips for the Head',
        instruction:
          'Place two strips across each other like a plus sign (+). Fold each strip over the other once to make a small square head.',
        visualType: 'cross-knot',
      },
      {
        stepNumber: 2,
        title: 'Braid the Body Segments',
        instruction:
          'Keep folding the two strips over each other back and forth 6 to 8 times to make a boxy, segmented body.',
        tip: 'Pull gently after each fold so every body square looks the same size.',
        visualType: 'box-braid',
      },
      {
        stepNumber: 3,
        title: 'Bend the Jumping Legs',
        instruction:
          'Take two side strips near the back and bend them sharply up and down like a letter V to look like jumping legs. Leave two flat strips for wings.',
        visualType: 'fold-legs',
      },
      {
        stepNumber: 4,
        title: 'Curl the Feelers on the Head',
        instruction:
          'Cut two thin strips at the head and gently slide them along your thumb so they curl upward like real grasshopper feelers.',
        visualType: 'curl-antennae',
      },
    ],
    visualGuideCaption:
      'Visual Guide: Fold a square box-braid body, bend V-shaped jumping legs, and curl two thin feelers.',
    finishedCraftNote:
      'Your leaf grasshopper can sit on flower pots, school desks, or gift boxes. Kids in Indonesia love making these handmade toys!',
  },
  {
    id: 'keris-janur',
    title: 'Woven Ceremonial Keris Ornament',
    indonesianTitle: 'Keris-Kerisan Janur',
    level: 'Advanced',
    duration: '25–30 mins',
    leafCount: '4 long leaf strips + 1 strong center stick',
    imageUrl: JANUR_IMAGES.kembarMayang,
    diagramType: 'keris',
    summary:
      'Make the traditional wavy-blade dagger decoration placed inside Javanese Kembar Mayang wedding bouquets.',
    whatYouNeed: {
      materials: [
        '4 long, smooth janur strips (at least 80 cm long)',
        '1 long straight lidi stick for the strong inside spine',
      ],
      tools: [
        'Scissors or a small knife',
        '2 tiny bamboo pins (semat) to hold the curved handle guard',
      ],
    },
    beforeYouStart: [
      'Pick a straight, unbroken lidi stick so your dagger stands tall without bending.',
      'Fold slowly so the left and right waves look neat and balanced.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Wrap the Handle Around the Stick',
        instruction:
          'Hold 4 leaf strips around the bottom of your lidi stick and wrap them tightly in a neat spiral for the handle.',
        visualType: 'wrap-hilt',
      },
      {
        stepNumber: 2,
        title: 'Make the Curved Handle Guard',
        instruction:
          'Bend two strips out to the left and right just above the handle, curve them upward, and pin them neatly.',
        visualType: 'crossguard',
      },
      {
        stepNumber: 3,
        title: 'Braid the Wavy Blade',
        instruction:
          'Braid the strips up along the stick in left-and-right zigzags—lean two folds to the left, then two folds to the right—to make smooth waves.',
        tip: 'Keep the braid snug around the stick so the waves stay firm.',
        visualType: 'zig-blade',
      },
      {
        stepNumber: 4,
        title: 'Lock and Trim the Pointed Tip',
        instruction:
          'Tuck the final narrow leaf ends underneath the top fold and trim cleanly into a sharp point.',
        visualType: 'lock-tip',
      },
    ],
    visualGuideCaption:
      'Visual Guide: Wrap the handle, pin the curved guard, and braid left-and-right waves along the lidi stick.',
    finishedCraftNote:
      'Traditional Javanese crafters put pairs of these woven keris decorations inside Kembar Mayang wedding bouquets to wish the couple courage and wisdom.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topic: 'Janur Basics',
    question: 'What is "janur" made from?',
    options: [
      'Old brown banana leaves',
      'Young, light yellow-green coconut palm leaves',
      'Painted plastic strips',
      'Thick bamboo bark',
    ],
    correctIndex: 1,
    explanation:
      'Janur is the young, newly opened leaf of a coconut tree. Because it has not turned dark green in the sun yet, it is soft and easy to fold without breaking.',
  },
  {
    id: 'q2',
    topic: 'Leaf Parts',
    question: 'What is the hard wooden stick in the middle of a coconut leaf called?',
    options: ['Semat', 'Lidi', 'Sampian', 'Penjor'],
    correctIndex: 1,
    explanation:
      'The hard stick in the middle is called the lidi. When you remove it, you get two soft green strips. People save lidi sticks to make brooms or tiny pins.',
  },
  {
    id: 'q3',
    topic: 'Bali Traditions',
    question: 'In Bali, what are the tall curved bamboo poles decorated with janur along streets during Galungan called?',
    options: ['Kembar Mayang', 'Penjor', 'Lepet', 'Lappa-lappa'],
    correctIndex: 1,
    explanation:
      'They are called Penjor! Families put them outside their homes along village roads during Galungan to give thanks for good harvests.',
  },
  {
    id: 'q4',
    topic: 'Javanese Weddings',
    question: 'Which matching pair of woven leaf bouquets is carried at traditional Javanese weddings?',
    options: ['Canang Sari', 'Kembar Mayang', 'Katupek Pitalah', 'Clorot'],
    correctIndex: 1,
    explanation:
      'Kembar Mayang ("twin flowers") is a matching pair of wedding bouquets in Java decorated with woven keris daggers, fans, and little birds.',
  },
  {
    id: 'q5',
    topic: 'Ketupat Weaving',
    question: 'How many loops do you make with each strip before weaving a classic diamond Ketupat Bawang?',
    options: [
      'One big loop per strip',
      'Three loops per strip',
      'Six flat strips taped to a board',
      'Two tight knots',
    ],
    correctIndex: 1,
    explanation:
      'Take two strips of janur and make three loops with each strip. Then put the strips over and under each other and pull them tight into a diamond!',
  },
  {
    id: 'q6',
    topic: 'Holiday Meanings',
    question: 'During Bakda Kupat in Java, what friendly message is linked to the word "kupat"?',
    options: [
      'Ngaku lepat (saying sorry and forgiving each other)',
      'Building bamboo houses',
      'Fishing in the ocean',
      'Planting rice fields',
    ],
    correctIndex: 0,
    explanation:
      'In Javanese, "kupat" sounds like "ngaku lepat"—reminding families and neighbors to say sorry, forgive one another, and start fresh.',
  },
  {
    id: 'q7',
    topic: 'Regional Food',
    question: 'In West Sumatra (Minangkabau), woven coconut-leaf rice cakes served every morning with warm curry are called:',
    options: ['Sampian', 'Katupek', 'Canang', 'Ringgitan'],
    correctIndex: 1,
    explanation:
      'People in West Sumatra call them katupek, like in famous dishes Katupek Pitalah and Katupek Gulai Kapau.',
  },
  {
    id: 'q8',
    topic: 'Eco-Friendly Craft',
    question: 'Why are janur crafts good for the environment?',
    options: [
      'They are covered in waterproof plastic spray',
      'They use zero glue or plastic, leftover sticks become brooms, and old leaves turn into garden soil',
      'Workers cut down the whole coconut tree every year',
      'They are baked into hard ceramic bricks',
    ],
    correctIndex: 1,
    explanation:
      'A healthy coconut tree grows 12 to 16 new branches every year without being cut down. Nothing goes to waste, and old leaves turn naturally into garden soil!',
  },
];
