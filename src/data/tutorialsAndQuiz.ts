import { CraftTutorial, QuizQuestion } from '../types/janur';
import { JANUR_IMAGES } from './images';

export const CRAFT_TUTORIALS: CraftTutorial[] = [
  {
    id: 'ketupat-bawang',
    title: 'How to Weave a Classic Ketupat',
    indonesianTitle: 'Ketupat Bawang',
    level: 'Beginner',
    duration: '15–20 mins',
    leafCount: '2 young coconut leaf strips',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    diagramType: 'ketupat',
    summary:
      'Learn how to weave two young coconut leaf strips into Indonesia’s famous six-corner diamond rice pouch—no glue or tape needed!',
    whatYouNeed: {
      materials: [
        '1 fresh young coconut leaflet (gives 2 soft green leaf strips, about 70–90 cm long)',
        'Or 2 strips of 2.5 cm wide gift ribbon or flexible paper if coconut leaves are not nearby',
      ],
      tools: [
        '1 small paring knife or kitchen scissors (to remove the woody center stick)',
        'A damp cloth or small bowl of water to keep leaves soft',
      ],
    },
    beforeYouStart: [
      'Gently wipe the leaf with a damp cloth so it bends smoothly without cracking.',
      'Work slowly and keep your loops loose at first—you will pull everything tight at the very end.',
      'Hold Strip A in your left hand and Strip B in your right hand so you do not mix them up.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Remove the Center Stick (Lidi)',
        instruction:
          'Hold the bottom of one coconut leaflet and slide your small knife gently along both sides of the woody middle stick (lidi). This separates the leaf into two smooth green strips.',
        tip: 'Keep the woody lidi sticks—in Indonesia, people tie them together to make brooms!',
        visualType: 'strip-lidi',
      },
      {
        stepNumber: 2,
        title: 'Make 3 Loops on Each Hand',
        instruction:
          'Wrap Strip A three times around your left hand with the thick base pointing UP. Wrap Strip B three times around your right hand with the thick base pointing DOWN.',
        tip: 'Leave finger space between each loop so the other strip can slide through easily.',
        visualType: 'coil-three',
      },
      {
        stepNumber: 3,
        title: 'Weave Over and Under',
        instruction:
          'Slide the three loops of Strip B across the three loops of Strip A in an alternating pattern: Go Over–Under–Over on the first row, Under–Over–Under on the second, and Over–Under–Over on the third.',
        tip: 'Double-check that no two rows go over the exact same way!',
        visualType: 'weave-cross',
      },
      {
        stepNumber: 4,
        title: 'Wrap the Thick Base Ends Around the Sides',
        instruction:
          'Take each thick base end, fold it 90 degrees around the side edge, and weave it through the open loops until both thick ends meet at the bottom corner.',
        visualType: 'wrap-tails',
      },
      {
        stepNumber: 5,
        title: 'Tuck the Thin Tips Into the Top',
        instruction:
          'Guide the two thin, pointed leaf tips along the remaining open sides and tuck them neatly under the crossing bands until they meet at the top corner.',
        visualType: 'tuck-tips',
      },
      {
        stepNumber: 6,
        title: 'Pull Snug to Finish the Diamond',
        instruction:
          'Gently tug each leaf strip from the middle outward toward the ends until all gaps close and the woven pouch forms a firm, puffy diamond shape.',
        visualType: 'tighten-ketupat',
      },
    ],
    visualGuideCaption:
      'Visual Guide: Two opposing 3-loop coils interlace into a 3×3 grid, then fold around into a sealed 6-corner diamond pouch.',
    finishedCraftNote:
      'Your finished Ketupat Bawang is hollow inside and completely sealed by friction! In Indonesian kitchens, cooks fill it two-thirds with raw rice through a tiny corner gap before boiling it into firm rice cakes.',
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
      'Make the bright star-shaped coconut-leaf flower crown seen on top of Balinese Canang Sari offerings and party tables.',
    whatYouNeed: {
      materials: [
        '4 to 6 stripped young coconut leaf pieces (about 25 cm long each)',
        '4 to 6 short toothpicks or thin bamboo pins (semat)',
      ],
      tools: [
        'Craft scissors or a small rounded knife',
        'Damp towel to keep petals fresh',
      ],
    },
    beforeYouStart: [
      'Trim all leaf pieces to the same 25 cm length so your flower circle stays even.',
      'Be careful when pushing bamboo pins or toothpicks through overlapping corners.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Cut Pointed Petal Ends',
        instruction:
          'Trim both ends of each 25 cm leaf strip at an angle so every strip ends in neat pointed tips.',
        visualType: 'trim-petal',
      },
      {
        stepNumber: 2,
        title: 'Snip Decorative Edge Notches',
        instruction:
          'Cut small, even V-shapes or wavy curves along one long edge of each strip to give the petals a lacy border.',
        tip: 'Practice cutting simple triangles first before trying curved waves.',
        visualType: 'notch-edge',
      },
      {
        stepNumber: 3,
        title: 'Fold Like an Accordion Fan',
        instruction:
          'Fold each notched strip back and forth in crisp pleats from a tight base so it opens outward like a small hand fan.',
        visualType: 'pleat-fan',
      },
      {
        stepNumber: 4,
        title: 'Pin Into a Full Flower Circle',
        instruction:
          'Line up four folded fans in a circle with their wide edges facing out, then pin their centers together using your bamboo pins or toothpicks.',
        visualType: 'pin-rosette',
      },
    ],
    visualGuideCaption:
      'Visual Guide: Notched leaf strips fold into four radial fans and pin together at the center to create a blooming rosette.',
    finishedCraftNote:
      'Place a fresh flower in the center of your Sampian rosette! In Bali, this crown sits on top of square leaf trays as a joyful daily offering.',
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
      'Fold two soft green coconut-leaf strips into a cute Indonesian folk toy grasshopper with folded jumping legs and curved antennae.',
    whatYouNeed: {
      materials: [
        '2 long stripped young coconut leaf blades (around 75 cm)',
        '1 thin piece of leftover lidi stick for spine support (optional)',
      ],
      tools: [
        'Small scissors to split the thin tip strands for legs and antennae',
      ],
    },
    beforeYouStart: [
      'Choose fresh, bendy leaves—dry leaves can snap when making tight leg bends.',
      'Work over a clean table so you can see both strips clearly.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Make a Crossed Starter Knot',
        instruction:
          'Cross two leaf strips at a 90-degree angle near their thick ends and fold each strip over the other once to lock a small square head.',
        visualType: 'cross-knot',
      },
      {
        stepNumber: 2,
        title: 'Braid the Segmented Body',
        instruction:
          'Keep folding the two strips back and forth over one another in a tight square box-braid for 6 to 8 steps to build the grasshopper’s body.',
        tip: 'Pull gently after each fold so the body segments look neat and even.',
        visualType: 'box-braid',
      },
      {
        stepNumber: 3,
        title: 'Fold the Hind Jumping Legs',
        instruction:
          'Take two side strands near the back, pinch sharp V-bends pointing upward and back down to create springy grasshopper legs, and lay two strips flat as wings.',
        visualType: 'fold-legs',
      },
      {
        stepNumber: 4,
        title: 'Curl the Long Antennae',
        instruction:
          'Snip two narrow slivers at the head and gently pull them over the dull edge of scissors or your thumb to make graceful curved antennae.',
        visualType: 'curl-antennae',
      },
    ],
    visualGuideCaption:
      'Visual Guide: A tight square box-braid forms the segmented body, while split tips fold into sharp V-shaped legs and curled antennae.',
    finishedCraftNote:
      'Your woven grasshopper can sit on potted plants, party napkins, or gift boxes—it is one of Indonesia’s favorite handmade street-market toys!',
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
      'Build the traditional wavy-bladed dagger ornament featured inside Javanese Kembar Mayang wedding bouquets.',
    whatYouNeed: {
      materials: [
        '4 long, smooth young coconut leaf strips (at least 80 cm long)',
        '1 full-length straight lidi stick to act as the stiff inner spine',
      ],
      tools: [
        'Small craft knife or scissors',
        '2 tiny bamboo pins (semat) to hold the curved handle guard',
      ],
    },
    beforeYouStart: [
      'Pick a straight, unbroken lidi stick so your dagger stands tall without bending.',
      'Take your time on the wavy blade—shifting left and right evenly creates the classic silhouette.',
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Wrap the Handle Around the Stick',
        instruction:
          'Gather four leaf strips around the bottom end of your lidi stick and wrap them tightly in a neat spiral to form the handle.',
        visualType: 'wrap-hilt',
      },
      {
        stepNumber: 2,
        title: 'Shape the Curved Crossguard',
        instruction:
          'Loop two leaf strips out to the left and right just above the handle, curve them gently upward, and pin them in place.',
        visualType: 'crossguard',
      },
      {
        stepNumber: 3,
        title: 'Weave the Wavy Blade',
        instruction:
          'Braid the strips up along the lidi stick in alternating diagonal zigzags—leaning two folds left, then two folds right—to create smooth waves.',
        tip: 'Keep the braid snug around the center stick so the waves hold their shape.',
        visualType: 'zig-blade',
      },
      {
        stepNumber: 4,
        title: 'Lock and Trim the Pointed Tip',
        instruction:
          'Tuck the final narrow leaf ends tightly beneath the top fold and trim cleanly into a sharp point.',
        visualType: 'lock-tip',
      },
    ],
    visualGuideCaption:
      'Visual Guide: Four leaf strips braid in alternating left-right waves around a rigid central lidi stick.',
    finishedCraftNote:
      'Traditional Javanese wedding crafters place pairs of these woven keris ornaments inside Kembar Mayang bouquets to symbolize courage and good judgment.',
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topic: 'Janur Basics',
    question: 'What is "janur" made from?',
    options: [
      'Mature dried banana leaves',
      'Young, newly opened pale yellow-green coconut palm leaves',
      'Split bamboo shoots',
      'Painted paper ribbons',
    ],
    correctIndex: 1,
    explanation:
      'Janur is the young, unopened leaf of the coconut palm. Because it has not turned dark green in the sun yet, it is soft, pale yellow-green, and easy to fold without cracking.',
  },
  {
    id: 'q2',
    topic: 'Leaf Parts',
    question: 'What do Indonesians call the thin woody stick in the middle of a coconut leaflet that is removed before weaving?',
    options: ['Semat', 'Lidi', 'Sampian', 'Gedebog'],
    correctIndex: 1,
    explanation:
      'That stiff center stick is called the lidi! Crafters slice the soft green blades off the lidi before weaving, and save the lidi sticks to make sweeping brooms (sapu lidi) or tiny pins.',
  },
  {
    id: 'q3',
    topic: 'Bali Heritage',
    question: 'In Bali, what are the tall, curved bamboo poles decorated with woven young coconut leaves along streets during Galungan called?',
    options: ['Kembar Mayang', 'Penjor', 'Lepet', 'Lappa-lappa'],
    correctIndex: 1,
    explanation:
      'They are called Penjor! Families put them up along village roads to give thanks for harvest abundance and celebrate Galungan.',
  },
  {
    id: 'q4',
    topic: 'Javanese Weddings',
    question: 'Which matching pair of woven janur bouquets, decorated with toy keris daggers, fans, and birds, is carried at Javanese weddings?',
    options: ['Canang Sari', 'Kembar Mayang', 'Katupek Pitalah', 'Burasa'],
    correctIndex: 1,
    explanation:
      'Kembar Mayang ("twin blossoms") is a traditional pair of ceremonial bouquets in Central Java and Yogyakarta carrying wishes of happiness and unity for the couple.',
  },
  {
    id: 'q5',
    topic: 'Ketupat Weaving',
    question: 'How many loops do you wrap on each hand before weaving a classic diamond-shaped Ketupat Bawang?',
    options: [
      'One giant loop per hand',
      'Three loops per hand (one facing up, one facing down)',
      'Six flat strips taped to a board',
      'Two tight knots before starting',
    ],
    correctIndex: 1,
    explanation:
      'To weave a Ketupat Bawang, you wrap three loops around each hand in opposite directions, then weave them together over and under.',
  },
  {
    id: 'q6',
    topic: 'Holiday Meanings',
    question: 'In Javanese tradition during Bakda Kupat, what friendly message is connected to the word "kupat"?',
    options: [
      'Ngaku lepat (admitting mistakes and forgiving one another)',
      'Building bamboo bridges',
      'Sailing across the ocean',
      'Planting rice terraces',
    ],
    correctIndex: 0,
    explanation:
      'In Javanese wordplay, "kupat" sounds like "ngaku lepat"—reminding neighbors and family to apologize, forgive, and start fresh together.',
  },
  {
    id: 'q7',
    topic: 'Regional Food',
    question: 'In West Sumatra (Minangkabau), woven coconut-leaf rice cakes served every day with spiced curries are called:',
    options: ['Sampian', 'Katupek', 'Canang', 'Ringgitan'],
    correctIndex: 1,
    explanation:
      'Minangkabau cooks call them katupek (as in Katupek Pitalah and Katupek Gulai Kapau), showing how coconut-leaf weaving varies across Indonesia.',
  },
  {
    id: 'q8',
    topic: 'Sustainability',
    question: 'Why are janur crafts considered a great example of zero-waste, eco-friendly design?',
    options: [
      'They are sealed with waterproof plastic spray',
      'They use no glue or plastic, leftover sticks become brooms, and used leaves turn into garden compost',
      'They require cutting down whole coconut trees every year',
      'They are baked into permanent ceramic tiles',
    ],
    correctIndex: 1,
    explanation:
      'Healthy coconut trees grow 12–16 new fronds every year without being cut down. Every bit of the leaf is used, and afterward it breaks down naturally into soil.',
  },
];
