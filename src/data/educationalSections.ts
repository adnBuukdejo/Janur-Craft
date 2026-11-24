import { EducationalSection } from '../types/janur';
import { JANUR_IMAGES } from './images';

export const EDUCATIONAL_SECTIONS: EducationalSection[] = [
  {
    id: 'introduction-to-janur',
    number: '01',
    title: 'Introduction to Janur',
    subtitle: 'Botanical origins, structural anatomy, and the living material behind Indonesian leaf art',
    readTime: '4 min read',
    category: 'Foundations',
    leadParagraph:
      'In Indonesia, janur refers to the young, newly unfurled leaf of the coconut palm (Cocos nucifera), harvested before sunlight turns its blades deep emerald green. Soft, luminous, and remarkably resilient, this pale yellow-to-sage botanical ribbon serves simultaneously as canvas, thread, and structural frame.',
    imageUrl: JANUR_IMAGES.heroExhibition,
    imageCaption: 'Fig. 1.1 — Exhibition study showing fresh pale-sage janur woven into ketupat pouches, pleated fans, and garlands.',
    diagramType: 'anatomy',
    subsections: [
      {
        subheading: 'Etymology and Botanical Source',
        paragraphs: [
          'The Indonesian term janur derives from Javanese linguistic roots—often traced to "sejatining nur" (true light) in cultural philosophy, though botanically it simply designates unopened or freshly emerging coconut palm leaflets (Cocos nucifera). In Bali, the same young coconut frond is traditionally called busung, while Sundanese speakers refer to it as daun kalapa ngora.',
          'Because young fronds emerge tightly folded inside the crown of the coconut palm, their chlorophyll levels remain low. This sheltered growth produces shades ranging from creamy ivory and chartreuse yellow to gentle sage green, paired with a smooth waxy cuticle that bends sharply without snapping.',
        ],
        practicalExample:
          'When preparing a ceremonial wedding arch, artisans select fronds just opening from the central shoot: mature dark-green leaves (daun tua) are too brittle for tight 90-degree ketupat folds, whereas overly tender white shoots tear easily under tension.',
      },
      {
        subheading: 'Anatomy of a Coconut Frond',
        paragraphs: [
          'Each coconut frond (pelepah) bears dozens of slender, tapering leaflets (helai daun) arranged along a thick woody stalk. Every individual leaflet contains two symmetrical leaf blades joined down the center by a flexible yet rigid midrib called the lidi.',
          'Understanding this dual-part anatomy is the starting point of all janur craftsmanship. Stripping the twin blades free from the central lidi transforms a single leaflet into two long, uniform weaving ribbons.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Janur',
        origin: 'Indonesian / Javanese',
        definition: 'Young, pale yellow-green coconut palm leaf prized for weaving, plaiting, and ceremonial ornamentation.',
      },
      {
        term: 'Busung',
        origin: 'Balinese',
        definition: 'Balinese term for young coconut fronds used daily in religious offerings and temple decor.',
      },
      {
        term: 'Lidi',
        origin: 'Indonesian',
        definition: 'The slender, woody central spine of a coconut leaflet, stripped out before weaving and repurposed into pins or brooms.',
      },
    ],
  },
  {
    id: 'history-cultural-significance',
    number: '02',
    title: 'History & Cultural Significance',
    subtitle: 'From agrarian gratitude and Hindu-Buddhist offerings to Islamic-Javanese festive traditions',
    readTime: '5 min read',
    category: 'Heritage',
    leadParagraph:
      'Long before synthetic fabrics or paper banners arrived in the Indonesian archipelago, coastal and agrarian communities turned to abundant coconut palms to express celebration, spiritual devotion, and social kinship. Janur crafts evolved not as static museum objects, but as ephemeral architecture woven for living moments.',
    imageUrl: JANUR_IMAGES.kembarMayang,
    imageCaption: 'Fig. 2.1 — Javanese Kembar Mayang ensemble uniting symbolic woven motifs for traditional marriage rites.',
    subsections: [
      {
        subheading: 'Interwoven Spiritual & Agrarian Roots',
        paragraphs: [
          'Across Nusantara, palm-leaf weaving predates written records as part of broader Southeast Asian plant-fiber basketry. On islands such as Bali and Java, ancient agrarian gratitude rituals and Hindu-Buddhist traditions codified coconut-leaf offerings (yadnya) as offerings of renewal—honoring fertility, harvest cycles, and harmony between communities and nature.',
          'Because young coconut leaves remain vibrant for only a few days before drying into warm golden tan, janur art embodies impermanence. Crafting intricate forms for a single ceremony honors the moment itself rather than permanent possession.',
        ],
      },
      {
        subheading: 'Javanese Kupatan & Cultural Symbolism',
        paragraphs: [
          'In Java’s coastal Islamic heritage (widely associated in oral and historical tradition with the 15th–16th century Wali Songo figure Sunan Kalijaga), woven coconut-leaf rice pouches known as ketupat or kupat became central to Bakda Kupat—celebrated one week after Eid al-Fitr.',
          'In Javanese linguistic lore, "kupat" carries a dual moral reflection: "ngaku lepat" (acknowledging one’s faults and seeking forgiveness) and "laku papat" (four symbolic virtues of Eid celebration: lebaran, luberan, leburan, and laburan). The tightly interlocked diamond weave represents the complexity of human error, while the white compressed rice inside symbolizes purity after reconciliation.',
        ],
        practicalExample:
          'Hanging freshly woven ketupat pouches above a home doorway in parts of Java and Madura continues as a cultural gesture of welcoming neighbors and wishing household harmony.',
      },
    ],
    keyTerms: [
      {
        term: 'Bakda Kupat / Syawalan',
        origin: 'Javanese Islamic Tradition',
        definition: 'Festive observance held seven days after Eid al-Fitr centered on weaving, cooking, and sharing ketupat with relatives and neighbors.',
      },
      {
        term: 'Yadnya',
        origin: 'Balinese / Sanskrit',
        definition: 'Sacred offerings made in devotion and gratitude, frequently framed in woven busung coconut leaves.',
      },
    ],
    culturalNote: {
      title: 'Distinguishing Living Folklore & Historical Record',
      body: 'Early palm-leaf crafts leave few archaeological traces because plant fibers biodegrade rapidly in tropical climates. Rather than asserting exact century-by-century dates for every folk motif, historians combine temple reliefs, classical Javanese and Balinese manuscripts, and living oral craft lineages.',
    },
  },
  {
    id: 'types-of-janur-crafts',
    number: '03',
    title: 'Types of Janur Crafts',
    subtitle: 'Four primary families: culinary vessels, ceremonial landmarks, devotional offerings, and folk figures',
    readTime: '4 min read',
    category: 'Taxonomy',
    leadParagraph:
      'Although international visitors most often encounter janur through the iconic woven diamond of ketupat, artisans across Indonesia shape young coconut leaves into hundreds of specialized forms spanning architecture, gastronomy, ritual art, and miniature sculpture.',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Fig. 3.1 — Culinary janur forms: diagonal woven ketupat pouches paired with cylindrical wrapped lepet.',
    subsections: [
      {
        subheading: '1. Culinary Casings & Cooking Vessels',
        paragraphs: [
          'Weaving food inside young coconut leaves imparts a delicate herbal aroma while compressing starchy grains evenly in boiling water. Key forms include Ketupat Bawang (six-cornered rounded diamond), Ketupat Pasar (classic square pouch), Ketupat Luar (elongated multi-horn), Clorot (spiraled cone for steamed palm-sugar rice cakes), and Lepet (cylindrical glutinous rice roll bound with bamboo twine).',
        ],
      },
      {
        subheading: '2. Ceremonial Landmarks & Wedding Sculptures',
        paragraphs: [
          'Large-scale janur works signal civic and family milestones from afar. In Bali, towering Penjor bamboo poles arch gracefully over lanes during Galungan. Across Java, standing yellow-leaf archways (janur kuning melengkung) mark wedding venues, complemented indoors by paired Kembar Mayang arrangements.',
        ],
      },
      {
        subheading: '3. Sacred Offerings & Temple Adornments',
        paragraphs: [
          'In Balinese daily practice, small square trays (ceper), petal-notched crowns (sampian), and long hanging runner banners (lamak) organize flowers, rice, and incense into visual offerings.',
        ],
      },
      {
        subheading: '4. Folk Toys & Miniature Figures',
        paragraphs: [
          'From leftover strips, weavers craft lively miniature creatures and emblems: woven grasshoppers (belalang / walang), songbirds (manuk-manukan), miniature keris daggers, tiny baskets, and pleated pinwheels.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Clorot',
        origin: 'Javanese / Nusantara',
        definition: 'A spiral cone wound from a single janur strip used to steam sweet rice-flour and palm-sugar pudding.',
      },
      {
        term: 'Lamak',
        origin: 'Balinese',
        definition: 'Long vertical woven coconut-leaf banner pinned onto shrines during temple festivals, decorated with geometric plant and cosmic motifs.',
      },
    ],
  },
  {
    id: 'tools-and-materials',
    number: '04',
    title: 'Tools & Materials',
    subtitle: 'Minimalist botanical craft instruments engineered for precision and portability',
    readTime: '3 min read',
    category: 'Craft Practice',
    leadParagraph:
      'Traditional janur work requires no powered machinery, synthetic glue, or metal staples. An experienced artisan works comfortably seated on a woven mat with only a small paring blade, natural bamboo pins, and cool water.',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Fig. 4.1 — Artisan separating the rigid central lidi from the fresh leaf blade using a traditional paring knife.',
    subsections: [
      {
        subheading: 'Primary & Complementary Plant Fibers',
        paragraphs: [
          'Young coconut leaf (janur / busung) remains the primary medium due to its tensile strength and clean edges. Where specific regional aesthetics call for contrast, weavers pair pale janur with darker mature coconut leaves (slepan), fragrant pandan strips, nipah palm leaves in coastal wetlands, or lontar (palmyra palm) blades.',
          'For structural anchoring, large architectural displays rely on split bamboo armatures, fresh banana-tree trunk bases (gedebog) that keep stems hydrated, and split bamboo twine (tali bambu).',
        ],
      },
      {
        subheading: 'Essential Hand Tools',
        paragraphs: [
          'Pisau Raut / Mutik: A compact, razor-sharp curved or straight paring knife held lightly between thumb and forefinger to strip the lidi midrib or carve delicate notches.',
          'Semat: Tiny, sharpened slivers cut from bamboo or dried coconut lidi ribs (2–3 cm long) used like natural sewing pins to stitch pleated offerings without synthetic adhesives.',
        ],
        practicalExample:
          'When stitching a Balinese Canang tray, artisans push a slender bamboo semat through overlapping corners in one swift motion—creating a sturdy box that holds weight yet remains 100% compostable.',
      },
    ],
    keyTerms: [
      {
        term: 'Pisau Raut / Mutik',
        origin: 'Indonesian / Balinese',
        definition: 'Small handheld paring knife specialized for stripping coconut midribs and cutting intricate edge notches.',
      },
      {
        term: 'Semat',
        origin: 'Indonesian / Balinese',
        definition: 'Thin natural pin whittled from bamboo or coconut midrib, used to fasten folded leaves together.',
      },
    ],
  },
  {
    id: 'techniques-folding-methods',
    number: '05',
    title: 'Techniques & Folding Methods',
    subtitle: 'Structural grammar of stripping, over-under plaiting, radial pleating, and decorative notching',
    readTime: '5 min read',
    category: 'Techniques',
    leadParagraph:
      'Behind every intricate janur creation lies a disciplined geometric grammar. Rather than cutting pieces apart and gluing them, Indonesian weavers build self-locking three-dimensional volumes through tension, friction, and crisp creases.',
    diagramType: 'techniques',
    subsections: [
      {
        subheading: 'Menyeset (Midrib Stripping) & Anyaman (Plaiting)',
        paragraphs: [
          'Every woven pouch begins with menyeset—separating the supple blade halves from the lidi rib. Once stripped, strands enter anyaman (interlaced plaiting). Orthogonal weaving crosses strips at 90 degrees for flat mats and boxes, whereas diagonal plaiting creates three-dimensional pockets such as the six-cornered ketupat.',
          'The strength of anyaman comes from alternating over-under intersections: each crossing pins its neighbors against slipping, allowing a hollow vessel to expand under internal rice pressure without bursting.',
        ],
      },
      {
        subheading: 'Lipatan (Pleating), Ringgitan (Notching) & Kunci (Locking)',
        paragraphs: [
          'Ornamental crafts rely on lipatan (accordion and radial fan pleats) paired with ringgitan—rhythmic V-cuts, scallops, and serrated edges carved along leaf margins so light filters softly through layered fronds.',
          'Finally, simpul and kunci (tuck-and-lock folds) conceal raw tips inside intersecting ribs, ensuring clean silhouettes without exposed knots.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Anyaman',
        origin: 'Indonesian',
        definition: 'Over-under interlacing weave applied across flat mats, diagonal pouches, and sculptural ornaments.',
      },
      {
        term: 'Ringgitan',
        origin: 'Balinese / Javanese',
        definition: 'Decorative rhythmic notching and lace-like edge carving cut into folded coconut-leaf margins.',
      },
    ],
  },
  {
    id: 'step-by-step-tutorials',
    number: '06',
    title: 'Step-by-Step Tutorials',
    subtitle: 'Guided practical sequence from raw leaf preparation to finished woven artifacts',
    readTime: '4 min read',
    category: 'Practice Guide',
    leadParagraph:
      'Learning janur weaving is most rewarding through tactile repetition. Beginners usually start with straight accordion pleats and the classic Ketupat Bawang before advancing to sculpted folk figures and multi-strand ceremonial ornaments.',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    imageCaption: 'Fig. 6.1 — Completed Ketupat Bawang casings showing uniform diagonal tension and neatly tucked stems.',
    subsections: [
      {
        subheading: 'Progressive Learning Path',
        paragraphs: [
          'Stage 1 — Ribbon Control: Practice stripping a single leaflet evenly without nicking the leaf margin, then test tension by tying a simple square box-braid.',
          'Stage 2 — Interlocking Coils (Ketupat Bawang): Coil three opposing loops on each hand and practice the over-under-over pass until the flat lattice transforms naturally into a 3D diamond when tightened.',
          'Stage 3 — Radial Pleats & Pinning (Sampian Rosette): Combine scalloped edge cutting with bamboo semat pinning to assemble flat offering crowns.',
        ],
        practicalExample:
          'If fresh coconut leaves are unavailable outside tropical regions, learners can practice every weaving and pleating step using 2.5 cm-wide satin ribbon, flexible cardstock strips, or fresh pandan/palm fronds from floral markets.',
      },
    ],
    keyTerms: [
      {
        term: 'Merapatkan',
        origin: 'Indonesian',
        definition: 'The final gradual tightening stage in ketupat weaving where loose coils are drawn snug from center to tips.',
      },
    ],
  },
  {
    id: 'traditional-modern-creations',
    number: '07',
    title: 'Traditional & Modern Creations',
    subtitle: 'How contemporary Indonesian designers reinterpret ancestral weaving for modern spaces',
    readTime: '4 min read',
    category: 'Evolution',
    leadParagraph:
      'Far from disappearing into folklore archives, janur craft is experiencing a creative renaissance. Indonesian floral architects, spatial designers, and culinary chefs now bring traditional coconut-leaf weaving into contemporary galleries, eco-weddings, and hospitality spaces.',
    imageUrl: JANUR_IMAGES.modernDesign,
    imageCaption: 'Fig. 7.1 — Contemporary architectural pendant lamps and sculptural folded centerpieces woven from coconut fronds.',
    subsections: [
      {
        subheading: 'From Village Courtyard to Contemporary Gallery',
        paragraphs: [
          'Whereas classical crafts adhere to ritual prescriptions—such as specific symbolic elements inside Kembar Mayang or sacred motifs on Balinese Lamak—modern janur designers abstract those same geometric folds into minimalist lampshades, sculptural table runners, and large-scale woven wall reliefs.',
          'By substituting traditional bamboo framing and pleated coconut leaves for imported floral foam and single-use plastics, eco-conscious event stylists deliver dramatic botanical architecture rooted in local identity.',
        ],
        practicalExample:
          'Modern hospitality lobbies in Yogyakarta and Bali increasingly commission woven janur-and-rattan pendant lanterns that cast intricate lattice shadows while drying naturally into warm bronze-ivory tones over time.',
      },
    ],
    keyTerms: [
      {
        term: 'Anyaman Kontemporer',
        origin: 'Indonesian',
        definition: 'Contemporary sculptural or architectural weaving applying traditional plaiting techniques to modern interior and installation design.',
      },
    ],
  },
  {
    id: 'regional-diversity',
    number: '08',
    title: 'Regional Diversity',
    subtitle: 'Distinguishing local terminologies, shapes, and cultural meanings across the archipelago',
    readTime: '5 min read',
    category: 'Geography',
    leadParagraph:
      'Indonesia spans more than 17,000 islands and hundreds of distinct ethnic cultures. Treating Indonesian janur crafts as a single uniform tradition overlooks rich regional vocabularies, structural weaves, and ceremonial roles documented from Sumatra to Sulawesi.',
    imageUrl: JANUR_IMAGES.penjorBali,
    imageCaption: 'Fig. 8.1 — Towering Balinese Penjor poles demonstrate Bali’s distinctive architectural busung tradition.',
    subsections: [
      {
        subheading: 'Archipelagic Traditions in Contrast',
        paragraphs: [
          'In Bali, busung crafting (mejejaitan and metanding) is an everyday spiritual art performed across villages, culminating in grand Galungan Penjor arches and multi-tiered Gebogan.',
          'In Central Java and Yogyakarta, janur kuning carries strong lifecycle significance, welcoming wedding guests at home gates and anchoring Kembar Mayang symbolism alongside Bakda Kupat celebrations.',
          'Across West Sumatra (Minangkabau), South Kalimantan (Banjar), and South Sulawesi (Bugis-Makassar), culinary weaving dominates daily and festive tables—yielding Katupek Pitalah, Katupat Kandangan, and cylindrical Lappa-lappa.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Katupek',
        origin: 'Minangkabau (West Sumatra)',
        definition: 'Woven coconut-leaf rice cake prepared daily for curried dishes such as Katupek Pitalah and Katupek Gulai Kapau.',
      },
      {
        term: 'Lappa-lappa',
        origin: 'Bugis–Makassar (South Sulawesi)',
        definition: 'Glutinous rice cooked with coconut milk inside spiraled young coconut leaf wraps secured with natural twine.',
      },
    ],
    culturalNote: {
      title: 'Explore the Interactive Map Below',
      body: 'Use the Indonesian Cultural Map module on this page to inspect seven documented regional janur traditions with curated field notes and verified photography.',
    },
  },
  {
    id: 'preservation-of-craft',
    number: '09',
    title: 'Preservation of the Craft',
    subtitle: 'Community workshops, cultural inventories, and intergenerational skill transmission',
    readTime: '4 min read',
    category: 'Safeguarding',
    leadParagraph:
      'Because janur creations decompose naturally within days, the true heritage lives not in physical artifacts stored under glass, but in the muscle memory of artisans’ hands. Sustaining that tacit knowledge requires active community education and cultural documentation.',
    imageUrl: JANUR_IMAGES.canangOfferings,
    imageCaption: 'Fig. 9.1 — Intergenerational daily practice keeps Balinese metanding and mejejaitan skills vibrant.',
    subsections: [
      {
        subheading: 'Living Transmission & Institutional Safeguarding',
        paragraphs: [
          'In Bali, community neighborhood councils (banjar) organize collective preparation days (ngayah) before temple festivals, allowing younger generations to learn blade handling and pattern notching beside master elders.',
          'Across Java and other provinces, local craft guilds (sanggar), municipal ketupat weaving competitions before Eid, and local-content school curricula (muatan lokal) reintroduce students to traditional plaiting.',
          'At the national level, Indonesia’s Ministry of Education, Culture, Research, and Technology registers regional expressions—including culinary ketupat heritage and ceremonial offerings—under Warisan Budaya Takbenda (Intangible Cultural Heritage) to support archival study and public recognition.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Sanggar',
        origin: 'Indonesian',
        definition: 'Community cultural studio or guild where traditional arts, crafts, and music are taught across generations.',
      },
      {
        term: 'Warisan Budaya Takbenda',
        origin: 'Indonesian Cultural Policy',
        definition: 'National registry of Intangible Cultural Heritage maintained by Kemendikbudristek to safeguard living traditions.',
      },
    ],
  },
  {
    id: 'interactive-craft-visualization',
    number: '10',
    title: 'Interactive Janur Craft Visualization',
    subtitle: 'Understanding over-under weave geometry and three-dimensional structural tension',
    readTime: '3 min read',
    category: 'Spatial Logic',
    leadParagraph:
      'Watching a flat strip of coconut leaf fold into a sealed six-cornered ketupat can seem almost magical at full speed. Slowing the weave down into clear geometric layers reveals a straightforward topological rule: alternating orthogonal crossings lock six flat faces around a hollow core.',
    diagramType: 'weave-interactive',
    subsections: [
      {
        subheading: 'Topology of the Diagonal Lattice',
        paragraphs: [
          'A standard Ketupat Bawang uses only two continuous ribbons. When three spiral loops of Ribbon A intersect three spiral loops of Ribbon B at 90 degrees, they create a 3 × 3 interlocking weave grid. Folding the remaining tail and tip strands around the perimeter closes the open sides into a self-supporting hexahedral pouch.',
          'Use the interactive cross-weave explorer below to inspect how changing a single over/under crossing affects structural locking, or launch the full 3D Craft Studio to watch every stage rotate in 360 degrees.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Over–Under Interlace',
        origin: 'Structural Weaving',
        definition: 'Alternating strand crossings that generate mutual friction and prevent woven coconut strips from sliding apart.',
      },
    ],
  },
  {
    id: 'preparation-and-care',
    number: '11',
    title: 'Preparation & Care of Janur',
    subtitle: 'Ethical harvesting, hydration conditioning, and keeping natural fronds supple',
    readTime: '4 min read',
    category: 'Material Care',
    leadParagraph:
      'Working with fresh plant fiber demands respect for timing and moisture. Harvested too roughly, the palm tree suffers; stored too dry, young leaf blades split cleanly along their longitudinal veins during tight folds.',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Fig. 11.1 — Careful separation along the lidi preserves full blade elasticity without bruising.',
    subsections: [
      {
        subheading: 'Sustainable Harvesting & Conditioning',
        paragraphs: [
          'Skilled harvesters trim only selected emerging fronds while leaving the central apical bud (umbut) intact so the coconut palm continues healthy growth year after year.',
          'Before weaving intricate shapes, artisans often let freshly cut janur rest briefly in shade—a mild conditioning step sometimes called melayukan—so surface turgor softens slightly without drying out.',
        ],
      },
      {
        subheading: 'Storage & Exhibition Longevity',
        paragraphs: [
          'To keep stripped strands workable for 2–4 days, wrap them loosely in damp unbleached cotton or fresh banana leaves inside a cool shaded room or chilled storage.',
          'For multi-day cultural exhibitions, light water misting preserves supple green-ivory vibrancy for up to 48–72 hours before the leaves naturally cure into a warm golden-beige dried finish.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Umbut',
        origin: 'Indonesian',
        definition: 'The tender central growing tip (heart) of a palm tree, carefully protected during ethical frond harvesting.',
      },
    ],
  },
  {
    id: 'uses-and-applications',
    number: '12',
    title: 'Uses & Applications',
    subtitle: 'Sacred ceremonies, seasonal feasts, rites of passage, and zero-plastic hospitality',
    readTime: '4 min read',
    category: 'Applications',
    leadParagraph:
      'Across Indonesia, janur bridges sacred sanctuary and everyday kitchen. Few botanical materials serve such a wide spectrum of social functions—from wrapping daily meals to framing the threshold of marriage.',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Fig. 12.1 — Culinary application: steamed woven ketupat and tied lepet ready for festive sharing.',
    subsections: [
      {
        subheading: 'Four Domains of Application',
        paragraphs: [
          '1. Culinary Packaging & Cooking: Woven leaf casings allow boiling water to penetrate raw rice while retaining shape, naturally imparting subtle sweetness and acting as disposable zero-plastic cookware.',
          '2. Religious & Temple Rituals: Daily Canang Sari, Galungan Penjor, and festive temple garlands channel communal devotion.',
          '3. Lifecycle Rites of Passage: Javanese weddings, seven-month pregnancy blessings (mitoni / tingkeban), and housewarmings use folded janur to announce celebration to neighbors.',
          '4. Eco-Hospitality & Cultural Tourism: Boutique hotels and cultural museums increasingly adopt woven janur welcome garlands, table runners, and guest workshops.',
        ],
      },
    ],
    keyTerms: [
      {
        term: 'Mitoni / Tingkeban',
        origin: 'Javanese Tradition',
        definition: 'Traditional seven-month maternal blessing ritual in which woven janur ornaments often accompany ceremonial bathing.',
      },
    ],
  },
  {
    id: 'janur-crafts-sustainability',
    number: '13',
    title: 'Janur Crafts & Sustainability',
    subtitle: 'Zero-waste circularity, microplastic-free craft, and regenerative palm agroforestry',
    readTime: '4 min read',
    category: 'Ecology',
    leadParagraph:
      'At a moment when global event and food industries confront single-use plastic waste, Indonesia’s janur heritage offers a centuries-old model of circular, zero-waste design. Every part of the harvested frond serves a purpose and returns safely to living soil.',
    diagramType: 'sustainability',
    subsections: [
      {
        subheading: 'A True Zero-Waste Material Cycle',
        paragraphs: [
          'Harvesting fronds does not require felling the tree: a mature coconut palm continuously produces 12–16 new fronds annually while bearing coconuts for decades.',
          'Once stripped from the leaflet, the flexible blade becomes woven food packaging or ceremonial sculpture, while the discarded wooden lidi midribs are gathered into durable household brooms (sapu lidi), satay skewers, or fastening pins (semat).',
        ],
        practicalExample:
          'Following a large Balinese temple festival or Javanese community feast, spent janur ornaments require zero landfill sorting—they decompose naturally into rich garden compost within weeks.',
      },
    ],
    keyTerms: [
      {
        term: 'Sapu Lidi',
        origin: 'Indonesian',
        definition: 'Traditional sweeping broom bound from hundreds of coconut leaflet midribs (lidi) left over after janur stripping.',
      },
    ],
  },
];
