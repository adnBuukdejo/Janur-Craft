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
    imageUrl: JANUR_IMAGES.handsWeavingKetupat,
    diagramType: 'ketupat',
    summary:
      'Learn how to weave two strips of janur into a diamond rice pouch. No glue or tape needed!',
    whatYouNeed: {
      materials: [
        '1 fresh young coconut leaf (gives 2 soft green strips, about 70–90 cm long)',
        'Or 2 strips of 2.5 cm wide gift ribbon or soft paper',
      ],
      tools: [
        'Scissors or a small knife (to cut out the hard middle stick)',
        'A damp towel or bowl of cool water',
      ],
    },
    beforeYouStart: [
      'Wipe the leaf with a damp towel so it bends softly without cracking.',
      'Keep your loops loose while weaving. Pull them tight at the end.',
      'Keep Strip A in your left hand and Strip B in your right hand.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Remove the Middle Stick (Lidi)',
        instruction:
          'Cut away the hard stick in the middle of the leaf. You will have two soft green strips.',
        tip: 'Save the middle sticks! In Indonesia, people tie them into brooms.',
        visualType: 'strip-lidi',
      },
      {
        stepNumber: 2,
        title: 'Make 3 Loops with Each Strip',
        instruction:
          'Take two strips of janur. Make three loops with each strip. Point Strip A up and Strip B down.',
        tip: 'Leave a little space between each loop so the strips can slide through.',
        visualType: 'coil-three',
      },
      {
        stepNumber: 3,
        title: 'Weave Over and Under',
        instruction:
          'Put Strip B across Strip A. Go Over–Under–Over on row 1, Under–Over–Under on row 2, and Over–Under–Over on row 3.',
        tip: 'Make sure the Over and Under order changes on every row.',
        visualType: 'weave-cross',
      },
      {
        stepNumber: 4,
        title: 'Fold the Thick Ends Around the Sides',
        instruction:
          'Fold each thick end around the side edge and weave it through until both ends meet at the bottom.',
        visualType: 'wrap-tails',
      },
      {
        stepNumber: 5,
        title: 'Tuck the Thin Tips at the Top',
        instruction:
          'Fold the two thin tips along the top sides and tuck them under the crossing bands.',
        visualType: 'tuck-tips',
      },
      {
        stepNumber: 6,
        title: 'Pull Tight Into a Diamond Shape',
        instruction:
          'Gently pull each strip from the middle toward the ends to close the gaps and make a diamond shape!',
        visualType: 'tighten-ketupat',
      },
    ],
    visualGuideCaption:
      'Visual Guide: Make 3 loops with each strip, weave over and under, tuck the ends, and pull tight.',
    finishedCraftNote:
      'Your ketupat is hollow inside and locked tight! Cooks put raw rice inside before boiling it in water.',
  },
  {
    id: 'sampian-rosette',
    title: 'Pleated Flower Crown (Sampian)',
    indonesianTitle: 'Sampian / Bunga Janur',
    level: 'Beginner',
    duration: '12–15 mins',
    leafCount: '4 to 6 short leaf strips',
    imageUrl: JANUR_IMAGES.canangOfferings,
    diagramType: 'sampian',
    summary:
      'Make the pretty star-shaped leaf flower crown seen on Balinese Canang Sari trays.',
    whatYouNeed: {
      materials: [
        '4 to 6 soft janur strips (about 25 cm long each)',
        '4 to 6 toothpicks or tiny bamboo pins (semat)',
      ],
      tools: [
        'Scissors',
        'A damp towel to keep the leaves fresh',
      ],
    },
    beforeYouStart: [
      'Cut all leaf strips to the same length (25 cm) so your flower looks even.',
      'Be careful with the sharp ends of toothpicks or bamboo pins.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cut Pointed Petal Ends',
        instruction:
          'Use scissors to cut both ends of each strip into neat pointed tips.',
        visualType: 'trim-petal',
      },
      {
        stepNumber: 2,
        title: 'Cut Pretty Zigzags on One Edge',
        instruction:
          'Snip small triangles or smooth waves along one long side of each strip.',
        tip: 'Small V-shaped cuts are easiest for beginners!',
        visualType: 'notch-edge',
      },
      {
        stepNumber: 3,
        title: 'Fold Like a Paper Fan',
        instruction:
          'Fold each strip back and forth from the bottom so it opens wide like a hand fan.',
        visualType: 'pleat-fan',
      },
      {
        stepNumber: 4,
        title: 'Pin Into a Flower Circle',
        instruction:
          'Put 4 folded fans together in a circle and push pins through the middle to hold them.',
        visualType: 'pin-rosette',
      },
    ],
    visualGuideCaption:
      'Visual Guide: Cut pointed petals, snip zigzags, fold like fans, and pin in a circle.',
    finishedCraftNote:
      'Put a fresh flower in the middle of your Sampian! In Bali, people place it on top of leaf trays every morning.',
  },
  {
    id: 'belalang-janur',
    title: 'Woven Janur Grasshopper',
    indonesianTitle: 'Belalang Janur',
    level: 'Intermediate',
    duration: '15 mins',
    leafCount: '2 leaf strips + 1 center stick',
    imageUrl: JANUR_IMAGES.janurToys,
    diagramType: 'grasshopper',
    summary:
      'Fold two green coconut leaf strips into a cute toy grasshopper with jumping legs.',
    whatYouNeed: {
      materials: [
        '2 long soft janur strips (about 75 cm long)',
        '1 thin piece of middle stick (lidi) to keep it straight',
      ],
      tools: [
        'Scissors to cut thin strips for the legs and feelers',
      ],
    },
    beforeYouStart: [
      'Use fresh, soft leaves so they do not snap when you bend the legs.',
      'Work on a clean table so you can see both strips clearly.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cross Two Strips for the Head',
        instruction:
          'Put two strips across each other like a plus sign (+). Fold each strip over the other once.',
        visualType: 'cross-knot',
      },
      {
        stepNumber: 2,
        title: 'Braid the Body',
        instruction:
          'Keep folding the two strips back and forth 6 to 8 times to make a boxy body.',
        tip: 'Pull gently after each fold so all squares look the same size.',
        visualType: 'box-braid',
      },
      {
        stepNumber: 3,
        title: 'Bend the Jumping Legs',
        instruction:
          'Take two side strips near the back and bend them up and down like a letter V for legs.',
        visualType: 'fold-legs',
      },
      {
        stepNumber: 4,
        title: 'Curl the Feelers',
        instruction:
          'Cut two thin strips at the head and gently curl them up with your thumb.',
        visualType: 'curl-antennae',
      },
    ],
    visualGuideCaption:
      'Visual Guide: Fold a boxy body, bend V-shaped legs, and curl two thin feelers.',
    finishedCraftNote:
      'Your leaf grasshopper can sit on flower pots or desks. Kids in Indonesia love making these toys!',
  },
  {
    id: 'keris-janur',
    title: 'Woven Wedding Keris Ornament',
    indonesianTitle: 'Keris-Kerisan Janur',
    level: 'Advanced',
    duration: '25–30 mins',
    leafCount: '4 long leaf strips + 1 strong center stick',
    imageUrl: JANUR_IMAGES.kembarMayang,
    diagramType: 'keris',
    summary:
      'Make the wavy-blade toy dagger used inside Javanese Kembar Mayang wedding bouquets.',
    whatYouNeed: {
      materials: [
        '4 long, smooth janur strips (at least 80 cm long)',
        '1 long straight lidi stick for the middle spine',
      ],
      tools: [
        'Scissors or a small knife',
        '2 tiny bamboo pins (semat)',
      ],
    },
    beforeYouStart: [
      'Pick a straight lidi stick so your ornament stands tall without bending.',
      'Fold slowly so the left and right waves look neat.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Wrap the Handle',
        instruction:
          'Hold 4 strips around the bottom of the lidi stick and wrap them tightly for the handle.',
        visualType: 'wrap-hilt',
      },
      {
        stepNumber: 2,
        title: 'Make the Curved Guard',
        instruction:
          'Bend two strips out to the left and right above the handle, curve them up, and pin them.',
        visualType: 'crossguard',
      },
      {
        stepNumber: 3,
        title: 'Braid the Wavy Blade',
        instruction:
          'Braid the strips up along the stick in left-and-right waves (two folds left, then two folds right).',
        tip: 'Keep the braid snug around the stick so the waves hold their shape.',
        visualType: 'zig-blade',
      },
      {
        stepNumber: 4,
        title: 'Tuck and Trim the Tip',
        instruction:
          'Tuck the final leaf ends under the top fold and cut into a neat point.',
        visualType: 'lock-tip',
      },
    ],
    visualGuideCaption:
      'Visual Guide: Wrap the handle, pin the guard, and braid left-and-right waves up the stick.',
    finishedCraftNote:
      'Javanese crafters put pairs of these woven keris ornaments inside Kembar Mayang wedding bouquets.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topic: 'Janur Basics',
    question: 'What is "janur" made from?',
    options: [
      'Old brown banana leaves',
      'Young, soft coconut palm leaves',
      'Painted plastic strips',
      'Thick bamboo bark',
    ],
    correctIndex: 1,
    explanation:
      'Janur is the young leaf of a coconut tree. Because it is young, it is soft and bends easily without breaking.',
  },
  {
    id: 'q2',
    topic: 'Leaf Parts',
    question: 'What is the hard stick in the middle of a coconut leaf called?',
    options: ['Semat', 'Lidi', 'Sampian', 'Penjor'],
    correctIndex: 1,
    explanation:
      'The hard middle stick is called the lidi. Removing it gives you two soft green strips.',
  },
  {
    id: 'q3',
    topic: 'Bali Crafts',
    question: 'In Bali, what are the tall curved bamboo poles decorated with janur called?',
    options: ['Kembar Mayang', 'Penjor', 'Lepet', 'Lappa-lappa'],
    correctIndex: 1,
    explanation:
      'They are called Penjor! Families put them along streets during the Galungan festival.',
  },
  {
    id: 'q4',
    topic: 'Javanese Weddings',
    question: 'Which pair of woven leaf bouquets is carried at Javanese weddings?',
    options: ['Canang Sari', 'Kembar Mayang', 'Katupek', 'Clorot'],
    correctIndex: 1,
    explanation:
      'Kembar Mayang ("twin blossoms") is a matching pair of wedding bouquets in Java.',
  },
  {
    id: 'q5',
    topic: 'Ketupat Weaving',
    question: 'How many loops do you make with each strip before weaving a Ketupat?',
    options: [
      'One big loop per strip',
      'Three loops per strip',
      'Six flat strips taped down',
      'Two tight knots',
    ],
    correctIndex: 1,
    explanation:
      'Take two strips of janur and make three loops with each strip. Then weave them over and under!',
  },
  {
    id: 'q6',
    topic: 'Holiday Meanings',
    question: 'During Bakda Kupat in Java, what friendly meaning connects to the word "kupat"?',
    options: [
      'Saying sorry and forgiving each other',
      'Building bamboo houses',
      'Fishing in the ocean',
      'Planting rice fields',
    ],
    correctIndex: 0,
    explanation:
      'In Javanese, "kupat" sounds like "ngaku lepat," which means saying sorry and forgiving one another.',
  },
  {
    id: 'q7',
    topic: 'Regional Food',
    question: 'In West Sumatra, woven coconut-leaf rice cakes served with curry are called:',
    options: ['Sampian', 'Katupek', 'Canang', 'Ringgitan'],
    correctIndex: 1,
    explanation:
      'People in West Sumatra call them katupek, eaten for breakfast with warm curry.',
  },
  {
    id: 'q8',
    topic: 'Green Planet',
    question: 'Why are janur crafts good for our planet?',
    options: [
      'They are covered in plastic spray',
      'They use no glue or plastic, and old leaves turn into garden soil',
      'Workers cut down the whole coconut tree',
      'They are baked into hard bricks',
    ],
    correctIndex: 1,
    explanation:
      'Coconut trees grow new leaves every year without being cut down, and old leaves turn safely into garden soil!',
  },
];
