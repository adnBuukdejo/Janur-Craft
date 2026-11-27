import { JANUR_IMAGES } from './images';

export type CraftDifficulty = 'Easy' | 'Medium' | 'Hard';
export type StudioMode = 'learn' | 'free';

export type MaterialVisualKind =
  | 'coconut-leaf'
  | 'water-bowl'
  | 'janur-strips'
  | 'lidi-sticks'
  | 'bamboo-pole'
  | 'semat-pins'
  | 'flower-petals'
  | 'banana-pot'
  | 'bamboo-rings'
  | 'led-bulb'
  | 'sticky-rice'
  | 'bamboo-string'
  | 'scissors'
  | 'damp-cloth'
  | 'spoon';

export interface CraftMaterialItem {
  name: string;
  amount: string;
  use: string;
  visualKind: MaterialVisualKind;
}

export interface CraftToolItem {
  name: string;
  use: string;
  visualKind: MaterialVisualKind;
}

export interface StudioStepMeta {
  id: string;
  shortLabel: string;
  title: string;
  learnInstruction: string;
  freeInstruction: string;
  beforeText: string;
  afterText: string;
  whyText: string;
  hintText: string;
}

export interface StudioCraftConfig {
  id: string;
  title: string;
  indonesianName: string;
  difficulty: CraftDifficulty;
  duration: string;
  shortDescription: string;
  imageUrl: string;
  materials: CraftMaterialItem[];
  tools: CraftToolItem[];
  steps: StudioStepMeta[];
  completedDescription: string;
  angleNotes: {
    front: string;
    side: string;
    top: string;
  };
}

export const STUDIO_CRAFTS: StudioCraftConfig[] = [
  {
    id: 'ketupat-bawang',
    title: 'Ketupat Bawang (Diamond Rice Pouch)',
    indonesianName: 'Ketupat Bawang',
    difficulty: 'Medium',
    duration: '7 Steps',
    shortDescription:
      'Weave two soft janur strips over and under into a traditional diamond rice pouch.',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    materials: [
      {
        name: 'Young Coconut Leaf (Janur)',
        amount: '1 fresh leaf',
        use: 'Splits into 2 soft green weaving strips.',
        visualKind: 'coconut-leaf',
      },
      {
        name: 'Bowl of Clean Water',
        amount: '1 small bowl',
        use: 'Keeps the leaf damp and flexible so it bends smoothly.',
        visualKind: 'water-bowl',
      },
    ],
    tools: [
      {
        name: 'Scissors',
        use: 'Cuts away the hard middle stick (lidi) cleanly.',
        visualKind: 'scissors',
      },
      {
        name: 'Damp Cloth',
        use: 'Wipes the leaf from stem to tip before folding.',
        visualKind: 'damp-cloth',
      },
    ],
    steps: [
      {
        id: 'prepare',
        shortLabel: '1. Prepare',
        title: '1. Prepare the Janur',
        learnInstruction:
          'Drag the Young Coconut Leaf onto the mat. Then drag the Bowl of Water onto the leaf and wipe left and right to make it soft.',
        freeInstruction: 'Put the leaf on the mat and wipe it soft with water.',
        beforeText: 'One dry, stiff young coconut leaf.',
        afterText: 'The leaf turns fresh green, soft, and easy to bend.',
        whyText: 'Damp leaves bend smoothly without cracking or breaking.',
        hintText:
          'Drag the Young Coconut Leaf onto the dashed area, then drag Bowl of Water onto it and wipe left and right!',
      },
      {
        id: 'cut',
        shortLabel: '2. Cut Strips',
        title: '2. Select and Cut the Strips',
        learnInstruction:
          'Drag the Scissors onto the leaf spine and slide right to cut out the hard middle stick (lidi). Then drag the brown stick into Save Lidi.',
        freeInstruction: 'Cut the middle stick out and move it to the Save Lidi tray.',
        beforeText: 'One whole leaf with a hard brown stick in the middle.',
        afterText: 'Two soft weaving strips: Strip A (dark green) and Strip B (light green).',
        whyText: 'Removing the hard stick lets both halves fold into clean loops.',
        hintText:
          'Drag Scissors onto the leaf, slide the scissors button right, then drag the brown stick to Save Lidi!',
      },
      {
        id: 'first-fold',
        shortLabel: '3. First Fold',
        title: '3. Make the First Fold',
        learnInstruction:
          'Strip A lies flat on the mat. Grab the green "Pull Tip" on the right and drag it up into the "Fold Loop 1" circle.',
        freeInstruction: 'Bend the flat Strip A tip upward into Loop 1.',
        beforeText: 'One flat green ribbon (Strip A) lying across the mat.',
        afterText: 'Strip A bends upward into Loop 1 with extra ribbon on the right.',
        whyText: 'Loop 1 is the anchor! The next loops connect right beside it.',
        hintText:
          'Hold and drag the dark green "Pull Tip" circle upward and drop it inside "Fold Loop 1"!',
      },
      {
        id: 'create-loops',
        shortLabel: '4. Create Loops',
        title: '4. Create the Loops',
        learnInstruction:
          'Drag the strip tip to make Loop 2 and Loop 3. Then drag Strip B onto the mat and turn it sideways across the 3 loops.',
        freeInstruction: 'Form Loop 2 and Loop 3, then place and turn Strip B sideways.',
        beforeText: 'Loop 1 stands on the left with extra ribbon extending right.',
        afterText: 'All 3 connected loops stand side by side, with Strip B crossing them.',
        whyText: 'Crossing Strip B over the 3 loops builds the 3×3 grid for weaving.',
        hintText:
          'Drag the tip into "Fold Loop 2", then "Fold Loop 3". Next, drag Strip B onto the mat and drag "Turn →"!',
      },
      {
        id: 'weave',
        shortLabel: '5. Weave',
        title: '5. Weave the Strips',
        learnInstruction:
          'Click or slide across each crossing square to switch between OVER and UNDER so every row alternates and locks tight.',
        freeInstruction: 'Alternate OVER and UNDER on all 9 squares.',
        beforeText: 'Strip B sits flat on top of Strip A, so the strips can still slip.',
        afterText: 'All 9 crossings alternate Over and Under in a sturdy checkerboard.',
        whyText: 'Alternating over and under locks the strips so rice stays inside.',
        hintText:
          'Row 1: Over · Under · Over | Row 2: Under · Over · Under | Row 3: Over · Under · Over.',
      },
      {
        id: 'shape',
        shortLabel: '6. Shape',
        title: '6. Shape the Ketupat',
        learnInstruction:
          'The woven square turns into a diamond! Drag each loose end (End 1 to End 4) inward into its matching corner pocket.',
        freeInstruction: 'Tuck all 4 loose ends into the diamond corner pockets.',
        beforeText: 'A flat woven checkerboard with 4 loose leaf ends sticking out.',
        afterText: 'All 4 ends tuck safely into the diamond edges, closing the pouch.',
        whyText: 'Tucking the 4 corners closes the open sides into a hollow rice pouch.',
        hintText: 'Hold End 1, End 2, End 3, and End 4 one by one and drop each into its dashed corner circle!',
      },
      {
        id: 'finish',
        shortLabel: '7. Finish',
        title: '7. Finish the Craft',
        learnInstruction:
          'Grab "Pull Tight ↓" and pull downward—or move the Tightness slider to 100%—to close the gaps and finish your ketupat!',
        freeInstruction: 'Pull the loose strips tight to 100%.',
        beforeText: 'A loose diamond ketupat with small spaces between the squares.',
        afterText: 'A crisp, tight, leak-proof Indonesian ketupat ready for cooking!',
        whyText: 'Pulling tight closes every gap so rice grains cannot fall out.',
        hintText: 'Drag the orange "Pull Tight ↓" handle downward or slide Tightness to 100%.',
      },
    ],
    completedDescription:
      'Your Ketupat Bawang is tightly woven with six neat corners and zero glue! In Indonesia, cooks fill it halfway with raw rice and boil it for holiday meals.',
    angleNotes: {
      front: 'Front view shows the 3×3 Over–Under checkerboard diamond face.',
      side: 'Side view shows the plump hollow rice pouch and tucked side edges.',
      top: 'Top view shows the crossed ribbon tips locking the top corner.',
    },
  },
  {
    id: 'canang-sari-sampian',
    title: 'Canang Sari & Sampian Flower Crown',
    indonesianName: 'Canang Sari & Sampian',
    difficulty: 'Easy',
    duration: '4 Steps',
    shortDescription:
      'Pin a square green leaf tray with bamboo pins, fold a star flower crown, and add colorful petals.',
    imageUrl: JANUR_IMAGES.canangOfferings,
    materials: [
      {
        name: 'Soft Janur Strips',
        amount: '4 tray strips + 4 crown strips',
        use: 'Forms the square tray sides and folded star petals.',
        visualKind: 'janur-strips',
      },
      {
        name: 'Tiny Bamboo Pins (Semat)',
        amount: '8 small pins',
        use: 'Pins tray corners and flower petals together without glue.',
        visualKind: 'semat-pins',
      },
      {
        name: 'Fresh Flower Petals',
        amount: '4 flower colors',
        use: 'Marigold, frangipani, red, and pandan petals placed on top.',
        visualKind: 'flower-petals',
      },
    ],
    tools: [
      {
        name: 'Scissors',
        use: 'Cuts pointed ends and pretty zigzag edges on the crown.',
        visualKind: 'scissors',
      },
    ],
    steps: [
      {
        id: 'tray',
        shortLabel: '1. Tray Base',
        title: '1. Build the Square Tray (Ceper)',
        learnInstruction:
          'Drag the 4 corner bamboo pins (semat) onto the tray corners to hold the green square tray walls together.',
        freeInstruction: 'Pin all 4 tray corners with semat.',
        beforeText: 'Four flat folded leaf walls waiting to become a square tray.',
        afterText: 'A sturdy square green leaf tray (ceper) locked at all 4 corners.',
        whyText: 'Balinese crafters use tiny bamboo pins instead of plastic tape or glue.',
        hintText: 'Drag each brown Semat pin into the glowing circles at the 4 corners of the tray!',
      },
      {
        id: 'cut-petals',
        shortLabel: '2. Cut Petals',
        title: '2. Cut Zigzag Crown Edges (Ringgitan)',
        learnInstruction:
          'Drag Scissors along the dashed edge of the janur strip to snip pretty triangle patterns for your Sampian flower crown.',
        freeInstruction: 'Cut the decorative edge pattern along the crown strip.',
        beforeText: 'A plain straight yellow-green janur strip.',
        afterText: 'A notched leaf strip with pretty zigzag petal points.',
        whyText: 'Cutting neat notches makes the folded crown look like blooming flower petals.',
        hintText: 'Hold the Scissors handle on the strip and slide it all the way from left to right!',
      },
      {
        id: 'fold-sampian',
        shortLabel: '3. Fold Crown',
        title: '3. Fold & Pin the Sampian Crown',
        learnInstruction:
          'Drag each of the 4 notched petal fans inward onto the center pin ring to form a star-shaped Sampian crown.',
        freeInstruction: 'Fold all 4 petal fans inward into a circle.',
        beforeText: 'Four notched leaf strips lying flat around the center.',
        afterText: 'A round 8-point star flower crown pinned neatly in the center.',
        whyText: 'Arranging pleated fans in a circle creates the Sampian crown that sits atop the tray.',
        hintText: 'Drag Fan 1, Fan 2, Fan 3, and Fan 4 into the center pin circle one by one!',
      },
      {
        id: 'flowers',
        shortLabel: '4. Add Flowers',
        title: '4. Place the Sampian & Colored Petals',
        learnInstruction:
          'Drag the Sampian crown onto the tray, then place the 4 flower colors (White, Red, Yellow, and Green/Orange) into the tray sections!',
        freeInstruction: 'Put the Sampian and all 4 flower colors onto the tray.',
        beforeText: 'An empty green square tray waiting for its crown and flowers.',
        afterText: 'A bright Balinese Canang Sari tray topped with petals and a Sampian!',
        whyText: 'In Bali, families arrange the colors carefully for morning prayers.',
        hintText: 'Drag the Sampian crown first, then drag each flower petal group into its matching circle on the tray!',
      },
    ],
    completedDescription:
      'Your Balinese Canang Sari & Sampian is complete! Held together only by tiny bamboo pins, it carries bright natural flowers with zero plastic waste.',
    angleNotes: {
      front: 'Front view shows the square ceper tray walls pinned cleanly with semat.',
      side: 'Side view shows how the folded Sampian crown rises gently above the tray.',
      top: 'Top view shows the 4 flower colors arranged neatly around the star crown.',
    },
  },
  {
    id: 'janur-lidi-prep',
    title: 'Removing the Middle Stick (Menyeset)',
    indonesianName: 'Menyeset Janur',
    difficulty: 'Easy',
    duration: '4 Steps',
    shortDescription:
      'Prepare two fresh coconut leaves, slice out the hard middle stick (lidi), and sort every part with zero waste.',
    imageUrl: JANUR_IMAGES.janurPreparation,
    materials: [
      {
        name: 'Fresh Coconut Leaves',
        amount: '2 whole leaves',
        use: 'Each leaf splits into 2 soft weaving strips and 1 hard stick.',
        visualKind: 'coconut-leaf',
      },
      {
        name: 'Tie String',
        amount: '1 natural cord',
        use: 'Ties leftover lidi sticks together into a sweeping broom.',
        visualKind: 'bamboo-string',
      },
    ],
    tools: [
      {
        name: 'Damp Cloth',
        use: 'Cleans and softens both coconut leaves before slicing.',
        visualKind: 'damp-cloth',
      },
      {
        name: 'Slicing Cutter / Scissors',
        use: 'Separates the soft green strips cleanly from the middle stick.',
        visualKind: 'scissors',
      },
    ],
    steps: [
      {
        id: 'wipe',
        shortLabel: '1. Clean Leaves',
        title: '1. Wipe & Soften Both Leaves',
        learnInstruction:
          'Slide the Damp Cloth left and right over both fresh coconut leaves to clean off dust and make the fibers soft.',
        freeInstruction: 'Wipe both leaves until they are soft and clean (100%).',
        beforeText: 'Two fresh coconut leaves straight from the palm tree.',
        afterText: 'Two clean, supple, shiny leaves ready to slice.',
        whyText: 'Clean, soft leaves slice evenly without tearing.',
        hintText: 'Grab the Wet Cloth on the mat and rub left and right across the leaves until 100%!',
      },
      {
        id: 'slice',
        shortLabel: '2. Slice Lidi',
        title: '2. Slice Out Both Middle Sticks (Lidi)',
        learnInstruction:
          'Slide the Cutter along Leaf 1 and Leaf 2 from left to right along the brown spine to separate the soft strips.',
        freeInstruction: 'Slice along Leaf 1 and Leaf 2 to remove the hard sticks.',
        beforeText: 'Two whole leaves joined along their hard brown middle sticks.',
        afterText: 'Four soft green janur strips and two separate brown lidi sticks.',
        whyText: 'Every leaf craft starts with menyeset—removing the stiff center stick.',
        hintText: 'Slide Cutter 1 across Leaf 1 all the way right, then slide Cutter 2 across Leaf 2!',
      },
      {
        id: 'sort-strips',
        shortLabel: '3. Sort Strips',
        title: '3. Gather the 4 Soft Weaving Strips',
        learnInstruction:
          'Drag all 4 soft green janur strips into the Weaving Basket on the left so they stay flat and ready for crafting.',
        freeInstruction: 'Place all 4 soft green strips into the Weaving Basket.',
        beforeText: 'Four loose green strips lying across the bamboo mat.',
        afterText: 'Four neatly stacked weaving ribbons inside the basket.',
        whyText: 'Sorting strips keeps them smooth and unbent until you start weaving.',
        hintText: 'Drag Strip 1, Strip 2, Strip 3, and Strip 4 into the green Weaving Basket on the left!',
      },
      {
        id: 'sapu-lidi',
        shortLabel: '4. Make Broom',
        title: '4. Bundle Sticks Into Sapu Lidi',
        learnInstruction:
          'Drag both leftover lidi sticks into the right bundle, then drag the Tie String around them to make a mini sweeping broom (sapu lidi)!',
        freeInstruction: 'Bundle the lidi sticks and tie them with string.',
        beforeText: 'Two leftover brown sticks sitting on the mat.',
        afterText: 'A neatly tied bundle—zero waste from the whole coconut leaf!',
        whyText: 'Indonesian families never waste lidi sticks; they tie them into sturdy outdoor brooms.',
        hintText: 'Drag Lidi 1 and Lidi 2 into the bundle spot, then drag the Tie String across them!',
      },
    ],
    completedDescription:
      'You mastered menyeset! You now have 4 smooth green weaving ribbons in the basket and a tied sapu lidi bundle—nothing from the palm leaf was wasted.',
    angleNotes: {
      front: 'Front view shows the 4 sorted strips beside the tied lidi bundle.',
      side: 'Side view shows how thin and flexible the cut strips are without the stick.',
      top: 'Top view shows all parts cleanly separated on the bamboo craft mat.',
    },
  },
  {
    id: 'penjor-galungan',
    title: 'Balinese Penjor Street Pole',
    indonesianName: 'Penjor Galungan',
    difficulty: 'Hard',
    duration: '4 Steps',
    shortDescription:
      'Curve a tall bamboo pole like Mount Agung, cut decorative leaf banners, wrap the pole, and hang tassels.',
    imageUrl: JANUR_IMAGES.penjorBali,
    materials: [
      {
        name: 'Tall Flexible Bamboo Pole',
        amount: '1 pole',
        use: 'Forms the tall curved backbone of the street penjor.',
        visualKind: 'bamboo-pole',
      },
      {
        name: 'Janur Leaf Ribbons & Crown',
        amount: '3 ribbons + 1 sampian + tassel',
        use: 'Wraps the bamboo and hangs gracefully from the curved tip.',
        visualKind: 'janur-strips',
      },
      {
        name: 'Tiny Bamboo Pins (Semat)',
        amount: '4 pins',
        use: 'Holds banners and hanging decorations onto the pole.',
        visualKind: 'semat-pins',
      },
    ],
    tools: [
      {
        name: 'Scissors',
        use: 'Cuts traditional jagged festival patterns into the leaf banners.',
        visualKind: 'scissors',
      },
    ],
    steps: [
      {
        id: 'bend-pole',
        shortLabel: '1. Curve Pole',
        title: '1. Bend the Tall Bamboo Pole',
        learnInstruction:
          'Grab the top handle of the tall bamboo pole and pull it down and right to bend the top into a graceful curve.',
        freeInstruction: 'Curve the top of the bamboo pole.',
        beforeText: 'A tall straight bamboo pole standing upright.',
        afterText: 'A tall pole with a graceful curved top, like a mountain arch.',
        whyText: 'In Bali, the curved top of a penjor reminds people of Mount Agung.',
        hintText: 'Hold the "Bend Tip" handle at the top of the bamboo and pull it smoothly down to the right!',
      },
      {
        id: 'cut-banner',
        shortLabel: '2. Cut Banner',
        title: '2. Cut the Decorative Leaf Banner',
        learnInstruction:
          'Slide the Scissors along the long janur banner strip to snip festival triangle cuts (ringgitan) along its edge.',
        freeInstruction: 'Snip decorative cuts along the hanging banner.',
        beforeText: 'A plain un-cut janur ribbon banner.',
        afterText: 'A crisp festival banner with repeating green-and-gold notches.',
        whyText: 'Decorative cuts catch the breeze and show bright leaf edges along village roads.',
        hintText: 'Slide the Scissors handle across the yellow dotted line from left to right!',
      },
      {
        id: 'wrap-pole',
        shortLabel: '3. Wrap Pole',
        title: '3. Wrap Leaf Bands Around the Pole',
        learnInstruction:
          'Drag the 3 green-and-gold janur wraps onto the pole rings (Wrap 1, Wrap 2, Wrap 3) to dress the bamboo stalk.',
        freeInstruction: 'Place all 3 leaf wraps onto the bamboo pole.',
        beforeText: 'A bare curved bamboo pole.',
        afterText: 'The bamboo pole is wrapped neatly in fresh green and yellow janur.',
        whyText: 'Wrapping the pole covers the plain bamboo with bright festive leaf bands.',
        hintText: 'Drag Wrap 1, Wrap 2, and Wrap 3 onto the three glowing bands along the pole!',
      },
      {
        id: 'hang-tassels',
        shortLabel: '4. Hang Decor',
        title: '4. Hang the Sampian Crown & Long Tassels',
        learnInstruction:
          'Drag the Sampian crown, fruit bundle, and long hanging leaf tassel onto the curved top hooks of your Penjor!',
        freeInstruction: 'Attach the crown, fruit bundle, and tassel onto the curve.',
        beforeText: 'A wrapped curved pole with empty top hooks.',
        afterText: 'A complete Balinese Penjor with crown, offering, and flowing leaf tassel!',
        whyText: 'The hanging tassel sways gently in the wind outside family gates during Galungan.',
        hintText: 'Drag each of the 3 decorations on the side into its matching dashed circle on the arch!',
      },
    ],
    completedDescription:
      'Your Balinese Penjor stands tall and curved! Families place penjor outside their gates to celebrate Galungan with natural bamboo and coconut leaves.',
    angleNotes: {
      front: 'Front view shows the tall curve, wrapped stalk, and flowing hanging tassel.',
      side: 'Side view highlights the Mount Agung arch bend and balanced hanging weight.',
      top: 'Top view shows the pleated Sampian rosette pinned near the arch.',
    },
  },
  {
    id: 'kembar-mayang',
    title: 'Kembar Mayang Wedding Bouquet',
    indonesianName: 'Kembar Mayang',
    difficulty: 'Hard',
    duration: '4 Steps',
    shortDescription:
      'Prepare the potted stem base, pleat a wide leaf fan, braid a wavy keris, and assemble the Javanese wedding bouquet.',
    imageUrl: JANUR_IMAGES.kembarMayang,
    materials: [
      {
        name: 'Clay Pot & Banana Stem',
        amount: '1 pot stand',
        use: 'Holds all the tall woven janur ornaments upright.',
        visualKind: 'banana-pot',
      },
      {
        name: 'Long Janur Strips',
        amount: '6 soft strips',
        use: 'Woven into a keris dagger, pleated fan, leaf bird, and arches.',
        visualKind: 'janur-strips',
      },
      {
        name: 'Lidi Support Sticks',
        amount: '2 long sticks',
        use: 'Keeps the pleated fan and braided keris standing tall.',
        visualKind: 'lidi-sticks',
      },
    ],
    tools: [
      {
        name: 'Scissors',
        use: 'Trims neat pointed ends on the leaf ribbons.',
        visualKind: 'scissors',
      },
    ],
    steps: [
      {
        id: 'pot-base',
        shortLabel: '1. Stem Base',
        title: '1. Prepare the Potted Base & Support Sticks',
        learnInstruction:
          'Drag the soft green Banana Stem block into the clay pot, then push the 2 tall Lidi sticks upright into the stem.',
        freeInstruction: 'Place the stem base in the pot and insert 2 support sticks.',
        beforeText: 'An empty clay pot, a soft stem core, and 2 straight lidi sticks.',
        afterText: 'A sturdy standing pot ready to hold woven leaf ornaments.',
        whyText: 'A soft banana-stem core holds tall leaf sticks upright without any foam or plastic!',
        hintText: 'Drag the green Stem Block into the clay pot first, then drag Stick 1 and Stick 2 into the top!',
      },
      {
        id: 'pleat-fan',
        shortLabel: '2. Fold Fan',
        title: '2. Pleat the Wide Leaf Fan',
        learnInstruction:
          'Drag the folding fan handle back and forth 3 times to pleat the wide green leaf into an accordion wedding fan.',
        freeInstruction: 'Fold the wide leaf into 3 neat fan pleats.',
        beforeText: 'A flat wide sheet of joined janur strips.',
        afterText: 'A wide pleated green fan that frames the back of the bouquet.',
        whyText: 'The wide fan creates a tall green backdrop behind the smaller woven shapes.',
        hintText: 'Click or drag the "Fold Pleat" handles 3 times to fold the fan ribs together!',
      },
      {
        id: 'braid-keris',
        shortLabel: '3. Braid Keris',
        title: '3. Braid the Wavy Janur Keris',
        learnInstruction:
          'Drag the left and right strips across each other 4 times up the stick to braid the wavy Javanese keris ornament.',
        freeInstruction: 'Braid 4 left-and-right waves up the center stick.',
        beforeText: 'Two long strips tied at the bottom of a straight lidi stick.',
        afterText: 'A wavy braided leaf keris blade symbolizing courage and balance.',
        whyText: 'Kembar Mayang bouquets always include symbolic woven shapes like the keris dagger.',
        hintText: 'Drag each highlighted strip end across to the opposite side 4 times to build the wavy blade!',
      },
      {
        id: 'assemble',
        shortLabel: '4. Assemble',
        title: '4. Arrange the Bouquet Ornaments',
        learnInstruction:
          'Drag the pleated Fan, braided Keris, woven Bird, and arching Leaf Sprays into their matching spots on the pot!',
        freeInstruction: 'Place all 4 woven pieces into the bouquet pot.',
        beforeText: 'Four finished janur pieces waiting beside the prepared pot.',
        afterText: 'A tall, balanced Kembar Mayang bouquet ready for a Javanese wedding!',
        whyText: 'Balanced twin bouquets bring good wishes for love and teamwork to the bride and groom.',
        hintText: 'Drag Fan, Keris, Bird, and Leaf Sprays into the 4 glowing dashed slots above the pot!',
      },
    ],
    completedDescription:
      'Your Javanese Kembar Mayang bouquet stands tall! Crafters carry two matching bouquets like this during traditional Javanese wedding ceremonies.',
    angleNotes: {
      front: 'Front view shows the pleated fan backdrop with the keris and bird in front.',
      side: 'Side view shows how the lidi sticks anchor inside the banana-stem pot.',
      top: 'Top view shows how the arching leaf sprays frame the bouquet evenly.',
    },
  },
  {
    id: 'contemporary-janur-installation',
    title: 'Modern Woven Janur Lamp Shade',
    indonesianName: 'Anyaman Janur Modern',
    difficulty: 'Medium',
    duration: '4 Steps',
    shortDescription:
      'Build a circular bamboo ring frame, weave golden-green strips over and under, pin the edges, and add a warm light.',
    imageUrl: JANUR_IMAGES.modernDesign,
    materials: [
      {
        name: 'Bamboo Ring Frame',
        amount: '2 round rings',
        use: 'Holds the top and bottom circles of the woven lamp shade.',
        visualKind: 'bamboo-rings',
      },
      {
        name: 'Long Janur Ribbons',
        amount: '4 vertical + 2 horizontal',
        use: 'Woven around the bamboo rings into a glowing shade.',
        visualKind: 'janur-strips',
      },
      {
        name: 'Bamboo Pins (Semat) & Warm Bulb',
        amount: '4 pins + 1 LED bulb',
        use: 'Locks the edge joints and illuminates the natural weave.',
        visualKind: 'led-bulb',
      },
    ],
    tools: [
      {
        name: 'Scissors',
        use: 'Trims uneven leaf ends neatly around the bottom rim.',
        visualKind: 'scissors',
      },
    ],
    steps: [
      {
        id: 'frame',
        shortLabel: '1. Ring Frame',
        title: '1. Set the Bamboo Rings & Vertical Ribs',
        learnInstruction:
          'Drag the Top Ring and Bottom Ring into place, then attach the 4 vertical green leaf ribs to connect them.',
        freeInstruction: 'Place both bamboo rings and attach 4 vertical leaf ribs.',
        beforeText: 'Two loose bamboo rings and four vertical green strips.',
        afterText: 'A round cylinder frame ready for horizontal weaving.',
        whyText: 'Vertical ribs give the horizontal janur bands a sturdy skeleton to weave through.',
        hintText: 'Drag the Top Ring and Bottom Ring onto the dashed circles, then drag the 4 vertical strips onto them!',
      },
      {
        id: 'weave-lamp',
        shortLabel: '2. Weave Shade',
        title: '2. Weave the Shade Over & Under',
        learnInstruction:
          'Click or slide across all 8 crossing squares so the golden-green bands weave Over and Under around the cylinder.',
        freeInstruction: 'Alternate OVER and UNDER on all 8 weave spots.',
        beforeText: 'Two golden-green bands sitting loosely over the vertical ribs.',
        afterText: 'A tight checkerboard cylinder weave that glows cleanly.',
        whyText: 'The Over–Under weave creates diamond light patterns when the lamp turns on.',
        hintText: 'Make Row 1 alternate Over–Under–Over–Under and Row 2 alternate Under–Over–Under–Over!',
      },
      {
        id: 'pin-trim',
        shortLabel: '3. Pin & Trim',
        title: '3. Pin the Joints & Trim the Bottom Rim',
        learnInstruction:
          'Drag the 4 Semat pins into the top and bottom rim joints, then slide Scissors across the bottom to trim excess leaf tips.',
        freeInstruction: 'Pin the 4 rim joints and trim the bottom leaf tips.',
        beforeText: 'A woven lamp cylinder with loose bottom ribbon tips.',
        afterText: 'A crisp, clean-edged woven shade held tight with bamboo pins.',
        whyText: 'Pinning and trimming keeps the shade neat as the leaves dry golden over time.',
        hintText: 'Click/drag the 4 Semat pins onto the rim circles, then slide the Scissors across the bottom dashed line!',
      },
      {
        id: 'light',
        shortLabel: '4. Add Light',
        title: '4. Place the Warm Low-Heat Bulb',
        learnInstruction:
          'Drag the warm LED bulb cord inside the center of your woven shade and watch warm golden light shine through!',
        freeInstruction: 'Place the warm light bulb inside the woven lamp.',
        beforeText: 'An unlit woven coconut-leaf lamp shade.',
        afterText: 'A warm glowing eco-friendly janur lamp casting woven patterns!',
        whyText: 'Young Indonesian designers use cool LED bulbs so natural leaf shades glow safely indoors.',
        hintText: 'Drag the Warm Bulb from the side right into the center circle of your lamp shade!',
      },
    ],
    completedDescription:
      'Your modern woven janur lamp glows warmly! Over a few weeks, fresh green leaves slowly dry into a rich golden-brown lampshade with zero plastic.',
    angleNotes: {
      front: 'Front view shows the glowing Over–Under checkerboard pattern.',
      side: 'Side view shows how the bamboo rings hold the round cylinder steady.',
      top: 'Top view looks down inside the lamp around the warm center bulb.',
    },
  },
  {
    id: 'ketupat-and-lepet',
    title: 'Ketupat & Lepet Holiday Plate',
    indonesianName: 'Ketupat & Lepet',
    difficulty: 'Medium',
    duration: '4 Steps',
    shortDescription:
      'Roll a coconut leaf tube, fill it with sticky rice and peanuts for Lepet, tie with bamboo string, and plate with Ketupat.',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    materials: [
      {
        name: 'Soft Janur Leaves',
        amount: '1 roll strip + 1 ketupat',
        use: 'Rolls into a tube for Lepet and pairs with woven Ketupat.',
        visualKind: 'janur-strips',
      },
      {
        name: 'Sticky Rice & Peanuts',
        amount: '3 scoops',
        use: 'Traditional sweet-savory filling inside rolled Lepet.',
        visualKind: 'sticky-rice',
      },
      {
        name: 'Thin Bamboo Strings (Tali)',
        amount: '3 ties',
        use: 'Wraps tightly around the rolled leaf tube before steaming.',
        visualKind: 'bamboo-string',
      },
    ],
    tools: [
      {
        name: 'Wooden Spoon',
        use: 'Scoops sticky rice and peanuts cleanly into the leaf roll.',
        visualKind: 'spoon',
      },
    ],
    steps: [
      {
        id: 'roll-tube',
        shortLabel: '1. Roll Tube',
        title: '1. Roll the Janur Leaf Into a Tube',
        learnInstruction:
          'Drag the bottom-right corner of the leaf strip spirally upward to roll it into a hollow green tube for Lepet.',
        freeInstruction: 'Roll the leaf strip spirally into a hollow green tube.',
        beforeText: 'One flat long yellow-green coconut leaf strip.',
        afterText: 'A neat spiral leaf cylinder open at the top for filling.',
        whyText: 'Unlike diamond ketupat, lepet uses a rolled spiral tube to hold sticky rice.',
        hintText: 'Hold the "Roll Up ↺" handle on the corner and drag it smoothly to 100%!',
      },
      {
        id: 'fill-rice',
        shortLabel: '2. Fill Rice',
        title: '2. Scoop Sticky Rice & Peanuts Inside',
        learnInstruction:
          'Drag all 3 scoops of Sticky Rice & Peanuts into the open top of your rolled leaf tube.',
        freeInstruction: 'Put 3 scoops of sticky rice and peanuts into the roll.',
        beforeText: 'An empty hollow rolled leaf tube.',
        afterText: 'A plump leaf roll packed with sticky rice and crunchy peanuts.',
        whyText: 'Peanuts and coconut milk give lepet its delicious rich taste when steamed.',
        hintText: 'Drag Scoop 1, Scoop 2, and Scoop 3 into the open top of the green leaf tube!',
      },
      {
        id: 'tie-lepet',
        shortLabel: '3. Fold & Tie',
        title: '3. Fold Both Ends & Tie With Bamboo String',
        learnInstruction:
          'Fold both open leaf tips shut, then drag the 3 thin bamboo strings across the roll to tie it snug!',
        freeInstruction: 'Close both tube ends and wrap 3 bamboo string ties.',
        beforeText: 'A filled leaf tube with open ends and no string.',
        afterText: 'A tightly tied green Lepet roll ready for steaming.',
        whyText: 'Tying bamboo strings tightly keeps water out and holds the sticky rice round.',
        hintText: 'Click/drag End Cap 1 & 2 shut, then drag Tie 1, Tie 2, and Tie 3 onto the three dotted bands!',
      },
      {
        id: 'plate-pair',
        shortLabel: '4. Serve Pair',
        title: '4. Tighten Ketupat & Arrange the Holiday Plate',
        learnInstruction:
          'Pull the companion Ketupat tight (100%), then drag both the Ketupat and Lepet onto the woven serving platter!',
        freeInstruction: 'Tighten the Ketupat and place both dishes on the platter.',
        beforeText: 'A finished Lepet roll and a loose Ketupat beside an empty plate.',
        afterText: 'A welcoming Javanese holiday platter with Ketupat and Lepet together!',
        whyText: 'Families in Java serve ketupat and lepet side by side at Eid and Kupatan gatherings.',
        hintText: 'Pull the Ketupat tight first, then drag both the Ketupat and Lepet onto the woven platter!',
      },
    ],
    completedDescription:
      'Your Ketupat & Lepet Holiday Plate is ready! Together, woven ketupat and tied sticky-rice lepet are a favorite holiday meal across Java.',
    angleNotes: {
      front: 'Front view shows the tied Lepet roll beside the diamond Ketupat.',
      side: 'Side view shows the spiral leaf wrap and snug bamboo string ties on the Lepet.',
      top: 'Top view shows both coconut-leaf dishes arranged on the woven tray.',
    },
  },
  {
    id: 'exhibition-ensemble',
    title: 'Indonesian Janur Craft Display',
    indonesianName: 'Ragam Janur Nusantara',
    difficulty: 'Medium',
    duration: '4 Steps',
    shortDescription:
      'Fold a pleated palm fan, interlock a round leaf wreath, snip swallowtail tips, and set a cultural display table.',
    imageUrl: JANUR_IMAGES.heroExhibition,
    materials: [
      {
        name: 'Joined Leaf Strips',
        amount: '4 strips',
        use: 'Folded into a wide pleated fan and braided into a circular wreath.',
        visualKind: 'janur-strips',
      },
      {
        name: 'Tiny Bamboo Pins (Semat)',
        amount: '4 pins',
        use: 'Locks the pleated fan base and woven wreath ends.',
        visualKind: 'semat-pins',
      },
    ],
    tools: [
      {
        name: 'Scissors',
        use: 'Cuts swallowtail V-notches on the hanging ribbon tips.',
        visualKind: 'scissors',
      },
    ],
    steps: [
      {
        id: 'fold-fan',
        shortLabel: '1. Pleat Fan',
        title: '1. Fold the Pleated Palm Fan',
        learnInstruction:
          'Drag the fan fold handle inward 4 times to pleat the wide leaf strips into an open table fan, then pin its handle.',
        freeInstruction: 'Pleat the fan 4 times and lock its base.',
        beforeText: 'A flat wide panel of fresh green janur strips.',
        afterText: 'A crisp, wide accordion leaf fan that stands upright.',
        whyText: 'Pleating gives thin coconut leaves strong ridges so they stand tall on display.',
        hintText: 'Drag or press the "Add Pleat" folds until 4/4 pleats are formed!',
      },
      {
        id: 'weave-wreath',
        shortLabel: '2. Braided Wreath',
        title: '2. Interlock the Circular Leaf Wreath',
        learnInstruction:
          'Drag the 4 curved green leaf segments around the ring frame to braid a complete round janur wreath.',
        freeInstruction: 'Interlock all 4 curved leaf segments into a round wreath.',
        beforeText: 'An empty circle frame with 4 loose leaf loops beside it.',
        afterText: 'A braided two-tone green and yellow palm wreath.',
        whyText: 'Alternating light and dark leaf bands creates a rich woven ring with zero glue.',
        hintText: 'Drag Part 1, Part 2, Part 3, and Part 4 onto the four glowing arcs around the circle!',
      },
      {
        id: 'trim-tails',
        shortLabel: '3. Snip Tips',
        title: '3. Snip Swallowtail Ribbon Ends',
        learnInstruction:
          'Slide the Scissors across both hanging ribbon ends to cut neat V-shaped swallowtail notches.',
        freeInstruction: 'Cut neat V-tips on both hanging ribbons.',
        beforeText: 'Square flat ribbon ends hanging below the wreath.',
        afterText: 'Neat V-shaped swallowtail tips like traditional festival banners.',
        whyText: 'Swallowtail tips finish the ends cleanly and keep the leaf edges from splitting.',
        hintText: 'Slide Scissors across Ribbon Left and Ribbon Right to snip the V-notches!',
      },
      {
        id: 'arrange-table',
        shortLabel: '4. Set Display',
        title: '4. Arrange the Cultural Display Table',
        learnInstruction:
          'Drag the Woven Wreath, Pleated Fan, and Diamond Ketupat onto their balanced spots on the exhibition mat!',
        freeInstruction: 'Place the Wreath, Fan, and Ketupat on the display mat.',
        beforeText: 'Three finished natural leaf crafts waiting beside a woven mat.',
        afterText: 'A balanced cultural display table showcasing three Indonesian janur skills!',
        whyText: 'Schools and museums group woven, pleated, and braided crafts together to teach visitors.',
        hintText: 'Drag the Wreath (center), Fan (back), and Ketupat (front) onto their matching outlines!',
      },
    ],
    completedDescription:
      'Your Janur Craft Display Table is complete! It brings together three classic skills—pleating, braiding, and diamond weaving—from one coconut palm.',
    angleNotes: {
      front: 'Front view shows the balanced display with the wreath, fan, and ketupat.',
      side: 'Side view shows the upright height of the pleated fan behind the ketupat.',
      top: 'Top view shows how neatly the three pieces sit on the woven rattan mat.',
    },
  },
  {
    id: 'belalang-janur-toys',
    title: 'Woven Leaf Grasshopper & Flower Rosette',
    indonesianName: 'Belalang Janur',
    difficulty: 'Medium',
    duration: '4 Steps',
    shortDescription:
      'Cross two leaf strips for the head, braid the segmented body, bend jumping legs, and curl feelers into a toy grasshopper.',
    imageUrl: JANUR_IMAGES.janurToys,
    materials: [
      {
        name: 'Long Janur Strips',
        amount: '2 long strips (dark + light)',
        use: 'Braided into the grasshopper head, body, legs, and feelers.',
        visualKind: 'janur-strips',
      },
      {
        name: 'Thin Lidi Stick',
        amount: '1 short stick',
        use: 'Supports the grasshopper on a pot or rattan display tray.',
        visualKind: 'lidi-sticks',
      },
    ],
    tools: [
      {
        name: 'Scissors',
        use: 'Splits thin strips at the head for long curved feelers.',
        visualKind: 'scissors',
      },
    ],
    steps: [
      {
        id: 'head-cross',
        shortLabel: '1. Lock Head',
        title: '1. Cross Two Strips for the Head',
        learnInstruction:
          'Drag Strip A and Strip B onto the center (+) cross, then fold the top flap down once to lock the grasshopper head.',
        freeInstruction: 'Cross both strips and fold once to lock the head.',
        beforeText: 'Two long flat strips lying apart on the mat.',
        afterText: 'A neat green diamond head lock with two long tails to braid.',
        whyText: 'Locking the cross first keeps the grasshopper head firm while you braid the body.',
        hintText: 'Drag Strip A and Strip B onto the (+) cross, then pull "Lock Head" down!',
      },
      {
        id: 'braid-body',
        shortLabel: '2. Braid Body',
        title: '2. Braid the Segmented Body',
        learnInstruction:
          'Drag the Left Strip and Right Strip alternately inward 5 times to stack 5 boxy green segments for the grasshopper body!',
        freeInstruction: 'Alternate left and right folds 5 times to braid the body.',
        beforeText: 'A locked head with two long loose ribbon tails.',
        afterText: 'A crisp 5-segment braided green grasshopper abdomen.',
        whyText: 'Box-braiding left and right mimics the real segmented body of a grasshopper.',
        hintText: 'Drag the glowing "Fold Left" and "Fold Right" tips alternately to the center 5 times!',
      },
      {
        id: 'bend-legs',
        shortLabel: '3. Bend Legs',
        title: '3. Bend the V-Shaped Jumping Legs',
        learnInstruction:
          'Drag the two rear side strips upward and back down into sharp V-shaped jumping legs.',
        freeInstruction: 'Bend both rear strips into V-shaped jumping legs.',
        beforeText: 'Two straight side ribbons sticking out behind the braided body.',
        afterText: 'Two bent green V-shaped grasshopper back legs ready to perch.',
        whyText: 'Sharp creases turn flat strips into strong bent insect legs.',
        hintText: 'Drag "Back Leg 1" and "Back Leg 2" up to their dashed knee points!',
      },
      {
        id: 'curl-feelers',
        shortLabel: '4. Feelers & Tray',
        title: '4. Snip & Curl the Feelers',
        learnInstruction:
          'Slide Scissors at the head to split the thin feelers, then drag both feelers upward to curl them nicely beside the leaf flower!',
        freeInstruction: 'Snip the front strips and curl both feelers upward.',
        beforeText: 'Two thick wide front tips at the grasshopper head.',
        afterText: 'A finished Belalang Janur grasshopper with curved feelers on the rattan tray!',
        whyText: 'Curling thin strips gently with your fingers brings the leaf toy to life.',
        hintText: 'Slide the Scissors at the head first, then drag Feeler 1 and Feeler 2 upward into curves!',
      },
    ],
    completedDescription:
      'Your Belalang Janur grasshopper is complete! Parents and teachers in Indonesia weave playful grasshoppers like this as zero-plastic toys for kids.',
    angleNotes: {
      front: 'Front view shows the crossed diamond head and two curved feelers.',
      side: 'Side view shows the 5 braided body segments and tall V-shaped jumping legs.',
      top: 'Top view shows the grasshopper sitting neatly on the woven rattan tray.',
    },
  },
];
