import { GalleryItem, ReferenceSource, RegionalTradition } from '../types/janur';
import { JANUR_IMAGES } from './images';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'ketupat-bawang',
    accessionNumber: 'JC-2026-01',
    title: 'Ketupat Bawang (Diamond Rice Pouch)',
    indonesianName: 'Ketupat Bawang / Kupat',
    category: 'Culinary',
    region: 'Java, Sumatra, Kalimantan & Sulawesi',
    medium: 'Two stripped young coconut leaf blades (Cocos nucifera)',
    occasion: 'Eid al-Fitr (Bakda Kupat), festive gatherings, traditional street cuisine',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    description:
      'A classic six-cornered woven casing whose rounded diamond geometry seals tightly around uncooked rice grains while allowing boiling water to circulate evenly through its natural weave.',
    culturalBackground:
      'In Javanese cultural tradition, ketupat (kupat) is associated with "ngaku lepat" (acknowledging mistakes) and is widely served during Bakda Kupat, one week after Eid al-Fitr. Regional variations in weaving tightness and corner geometry exist across Sumatra, Kalimantan, and Sulawesi.',
  },
  {
    id: 'penjor-galungan',
    accessionNumber: 'JC-2026-02',
    title: 'Balinese Penjor Archway & Sampian',
    indonesianName: 'Penjor Galungan',
    category: 'Ceremonial',
    region: 'Bali',
    medium: 'Curved bamboo pole, young coconut leaves (busung), agricultural produce',
    occasion: 'Galungan & Kuningan religious festivals, temple ceremonies',
    imageUrl: JANUR_IMAGES.penjorBali,
    description:
      'Towering curved bamboo poles erected along village lanes before Galungan, draped with lacy notched janur runners, pleated sampian crowns, and hanging floral palm tassels.',
    culturalBackground:
      'In Balinese Hindu tradition, the penjor expresses gratitude to Sang Hyang Widhi Wasa for earth’s abundance and symbolizes Mount Agung, with its curved peak representing spiritual prosperity and reverence.',
  },
  {
    id: 'kembar-mayang',
    accessionNumber: 'JC-2026-03',
    title: 'Kembar Mayang Wedding Arrangement',
    indonesianName: 'Kembar Mayang (Gagar Mayang)',
    category: 'Ceremonial',
    region: 'Central Java & Yogyakarta',
    medium: 'Young coconut leaves, banana stem base (gedebog), beringin & puring foliage',
    occasion: 'Javanese traditional wedding processions (Panggih & Midodareni)',
    imageUrl: JANUR_IMAGES.kembarMayang,
    description:
      'A matched pair of sculptural botanical bouquets crowned with woven janur motifs—stylized keris daggers, pleated fans, whips, and symbolic birds—standing inside carved vessels.',
    culturalBackground:
      'Carried during Javanese wedding rituals, Kembar Mayang ("twin blossoms") conveys blessings of wisdom, unity, and protection as the couple enters married life. Each folded janur component carries a traditional Javanese moral metaphor.',
  },
  {
    id: 'canang-sari-sampian',
    accessionNumber: 'JC-2026-04',
    title: 'Canang Sari & Sampian Rosettes',
    indonesianName: 'Canang Sari & Sampian Uras',
    category: 'Offerings',
    region: 'Bali',
    medium: 'Young coconut leaves (busung), bamboo pins (semat), tropical flowers',
    occasion: 'Daily Balinese Hindu devotional offerings',
    imageUrl: JANUR_IMAGES.canangOfferings,
    description:
      'Square woven coconut-leaf trays (ceper) topped with radially pleated janur rosettes (sampian) and arranged seasonal petals representing balance and daily gratitude.',
    culturalBackground:
      'Crafted primarily by Balinese households through the traditional metanding and mejejaitan arts, Canang Sari serves as a daily symbol of selflessness, harmony (Tri Hita Karana), and reverence.',
  },
  {
    id: 'janur-lidi-prep',
    accessionNumber: 'JC-2026-05',
    title: 'Menyeset — Stripping the Midrib (Lidi)',
    indonesianName: 'Proses Menyeset Janur',
    category: 'Technique',
    region: 'Archipelago-wide',
    medium: 'Fresh pale-yellow coconut frond & small paring blade (pisau raut)',
    occasion: 'Foundational leaf preparation prior to weaving',
    imageUrl: JANUR_IMAGES.janurPreparation,
    description:
      'Artisanal separation of the woody central rib (lidi) from the supple twin leaf blades, yielding uniform ribbons for precision folding and plaiting.',
    culturalBackground:
      'Zero part of the frond goes unused: the supple blade becomes woven ornaments or food casings, while the separated lidi midribs are bundled into traditional household brooms (sapu lidi) or trimmed into fine fastening skewers (semat).',
  },
  {
    id: 'contemporary-janur-installation',
    accessionNumber: 'JC-2026-06',
    title: 'Contemporary Woven Janur Lanterns & Centerpiece',
    indonesianName: 'Instalasi Anyaman Janur Kontemporer',
    category: 'Contemporary',
    region: 'Yogyakarta, Jakarta & Bali',
    medium: 'Young & mature coconut fronds, natural bamboo armature',
    occasion: 'Sustainable interior design, cultural exhibitions, eco-weddings',
    imageUrl: JANUR_IMAGES.modernDesign,
    description:
      'Architectural pendant lanterns and folded sculptural centerpieces adapting traditional Indonesian diagonal plaiting and accordion pleating for plastic-free modern interiors.',
    culturalBackground:
      'Contemporary Indonesian florists, eco-designers, and craft collectives collaborate with village artisans to replace synthetic foam and plastic event decor with biodegradable, sculptural janur forms.',
  },
  {
    id: 'ketupat-and-lepet',
    accessionNumber: 'JC-2026-07',
    title: 'Ketupat & Lepet Festive Platter',
    indonesianName: 'Ketupat & Lepet Kacang',
    category: 'Culinary',
    region: 'Central & East Java, West Java',
    medium: 'Young coconut leaf woven casings and wrapped cylinders with bamboo twine',
    occasion: 'Syawalan / Bakda Kupat & regional harvest feasts',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    description:
      'Woven diamond ketupat paired with cylindrical lepet—glutinous rice mixed with grated coconut and black-eyed peas wrapped tightly in rolled janur and tied with split bamboo string.',
    culturalBackground:
      'Together on the Syawalan table, ketupat and lepet showcase two distinct janur structural techniques: interlocking diagonal weaving versus spiral cylindrical wrapping under tension.',
  },
  {
    id: 'exhibition-ensemble',
    accessionNumber: 'JC-2026-08',
    title: 'Archipelago Janur Craft Ensemble',
    indonesianName: 'Ragam Anyaman Janur Nusantara',
    category: 'Contemporary',
    region: 'Museum Cultural Exhibition',
    medium: 'Woven coconut fronds, pleated fans, circular floral garlands',
    occasion: 'Cultural heritage education and museum display',
    imageUrl: JANUR_IMAGES.heroExhibition,
    description:
      'A curated comparative display bringing together diamond culinary pouches, pleated ceremonial fans, and circular botanical wreaths crafted from fresh coconut fronds.',
    culturalBackground:
      'Assembled to show international visitors how a single renewable botanical fiber gives rise to culinary vessels, sacred architecture, and expressive folk sculpture across Indonesia.',
  },
];

export const REGIONAL_TRADITIONS: RegionalTradition[] = [
  {
    id: 'bali',
    regionName: 'Bali',
    provinceOrIsland: 'Bali Island',
    coordinates: { x: 438, y: 266 },
    signatureCrafts: ['Penjor', 'Canang Sari', 'Sampian', 'Lamak'],
    localTerminology: 'Busung (young coconut leaf), Mejejaitan (stitching/pinning leaf), Metanding (arranging offerings)',
    imageUrl: JANUR_IMAGES.penjorBali,
    imageCaption: 'Balinese Penjor poles lined with notched busung ornaments during Galungan.',
    summary:
      'In Bali, young coconut leaf—locally known as busung—forms the living grammar of daily spiritual practice and major temple festivals.',
    culturalContext:
      'Unlike regions where janur appears mainly during annual holidays or weddings, Balinese communities craft busung ornaments daily. Intricate geometric cutouts (ringgitan), pinned with tiny bamboo needles (semat), form Canang Sari trays, multi-tiered Gebogan crowns, and towering Penjor poles for Galungan.',
    verifiedHighlight:
      'Balinese mejejaitan patterns preserve dozens of named traditional motifs, including lamak (long woven hanging banners) displayed at shrines.',
  },
  {
    id: 'central-java-yogya',
    regionName: 'Central Java & Yogyakarta',
    provinceOrIsland: 'Java Island',
    coordinates: { x: 356, y: 256 },
    signatureCrafts: ['Kembar Mayang', 'Janur Kuning Archway', 'Ketupat Bawang'],
    localTerminology: 'Janur kuning (yellow-green young frond), Kembar Mayang, Bakda Kupat',
    imageUrl: JANUR_IMAGES.kembarMayang,
    imageCaption: 'Kembar Mayang arrangement crafted for Javanese traditional marriage rites.',
    summary:
      'Central Java and Yogyakarta unite refined court ceremonial sculpture with deeply rooted culinary and lifecycle customs.',
    culturalContext:
      'A tall janur arch placed at a home entrance signals a wedding celebration to the community. Inside the ceremony, matched Kembar Mayang arrangements feature woven keris, umbrellas, birds, and fans. During Bakda Kupat (seven days after Eid al-Fitr), households weave and exchange ketupat.',
    verifiedHighlight:
      'Javanese oral philosophy links "kupat" to "ngaku lepat" (acknowledging one’s faults) and "laku papat" (four celebratory virtues).',
  },
  {
    id: 'west-java',
    regionName: 'West Java (Sunda)',
    provinceOrIsland: 'Java Island',
    coordinates: { x: 288, y: 247 },
    signatureCrafts: ['Kupat Tanjung', 'Kupat Salamet', 'Lepet'],
    localTerminology: 'Daun kalapa ngora (young coconut leaf), Kupat Tahu, Nganyam',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Woven kupat and tied lepet prepared with young coconut fronds.',
    summary:
      'Sundanese communities integrate janur weaving closely into culinary heritage and communal thanksgiving rituals (syukuran).',
    culturalContext:
      'West Java is renowned for regional culinary dishes built around woven coconut-leaf rice cakes, such as Kupat Tahu in Tasikmalaya and Garut, as well as Kupat Tanjung served alongside savory coconut-milk stews during family celebrations.',
    verifiedHighlight:
      'Sundanese lepet often incorporates black-eyed peas or peanuts inside rolled janur cylinders tied tightly with split bamboo.',
  },
  {
    id: 'east-java-madura',
    regionName: 'East Java & Madura',
    provinceOrIsland: 'Java & Madura Islands',
    coordinates: { x: 400, y: 258 },
    signatureCrafts: ['Ketupat Luar', 'Kupatan Coastal Festivals', 'Ketupat Pasar'],
    localTerminology: 'Topak (Madurese for ketupat), Kupatan',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    imageCaption: 'Freshly woven ketupat casings arranged on a bamboo tampah.',
    summary:
      'Coastal East Java and Madura sustain vibrant communal Kupatan celebrations featuring distinctive multi-cornered ketupat weaves.',
    culturalContext:
      'Across coastal towns from Gresik and Lamongan to Madura, Eid al-Fitr culminates in Kupatan week, where families gather and weave both standard square Ketupat Pasar and elongated or six-point Ketupat Luar casings.',
    verifiedHighlight:
      'Madurese Topak Lodeh and Javanese Rujak Cingur or Soto traditions rely on tightly woven ketupat pouches to achieve a dense, sliceable rice texture.',
  },
  {
    id: 'west-sumatra',
    regionName: 'West Sumatra (Minangkabau)',
    provinceOrIsland: 'Sumatra Island',
    coordinates: { x: 162, y: 170 },
    signatureCrafts: ['Katupek Pitalah', 'Katupek Gulai Kapau', 'Katupek Sayur'],
    localTerminology: 'Katupek (Minangkabau for ketupat), Pucuak karambia (young coconut shoot)',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Artisanal stripping of young coconut fronds prior to weaving katupek.',
    summary:
      'In Minangkabau culinary tradition, katupek woven from young coconut fronds is an everyday breakfast staple and ceremonial dish.',
    culturalContext:
      'Unlike regions where ketupat is primarily seasonal, Minangkabau markets prepare woven katupek daily for dishes such as Katupek Pitalah and Katupek Gulai Kapau, pairing tender compressed rice with spiced jackfruit, fern shoots (pakis), and turmeric curry.',
    verifiedHighlight:
      'Minangkabau woven katupek casings are prized for tight diagonal plaiting that yields soft yet firm rice blocks capable of soaking rich gulai broths.',
  },
  {
    id: 'south-kalimantan',
    regionName: 'South Kalimantan (Banjar)',
    provinceOrIsland: 'Kalimantan (Borneo)',
    coordinates: { x: 444, y: 172 },
    signatureCrafts: ['Katupat Kandangan'],
    localTerminology: 'Katupat (Banjar), Daun nyiur anum (young coconut leaf)',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    imageCaption: 'Classic woven diamond casing central to South Kalimantan’s Katupat Kandangan.',
    summary:
      'The Banjar tradition of Hulu Sungai Selatan elevates woven coconut-leaf rice cakes into one of Borneo’s signature cultural dishes.',
    culturalContext:
      'Katupat Kandangan uses traditionally woven young coconut-leaf pouches boiled until firm, then broken apart by hand in rich coconut-milk broth with smoked snakehead fish (haruan). Artisan weavers in Kandangan supply markets year-round.',
    verifiedHighlight:
      'The Banjar weaving community maintains rapid hand-plaiting rhythms capable of producing dozens of uniform katupat shells per hour.',
  },
  {
    id: 'south-sulawesi',
    regionName: 'South Sulawesi (Bugis–Makassar)',
    provinceOrIsland: 'Sulawesi Island',
    coordinates: { x: 525, y: 196 },
    signatureCrafts: ['Lappa-lappa', 'Ketupat Bugis'],
    localTerminology: 'Lappa-lappa (glutinous rice coconut-leaf wrap), Daun kaluku lolo',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Cylindrical wrapped leaf parcels and woven diamond rice pouches.',
    summary:
      'Bugis and Makassar communities combine woven diamond ketupat with slender wrapped lappa-lappa parcels for festive feasts.',
    culturalContext:
      'Alongside flat banana-leaf burasa, young coconut fronds are braided into slender cylindrical lappa-lappa and diamond ketupat pouches served with savory meat dishes such as Coto Makassar and Konro during Eid celebrations and family gatherings.',
    verifiedHighlight:
      'Lappa-lappa parcels use spiraled young coconut leaf strips secured with natural fiber ties to impart a subtle botanical aroma during steaming.',
  },
];

export const REFERENCE_SOURCES: ReferenceSource[] = [
  {
    id: 'ref-kemendikbud-wbtb',
    title: 'Warisan Budaya Takbenda Indonesia (Intangible Cultural Heritage Registry)',
    institutionOrAuthor: 'Ministry of Education, Culture, Research, and Technology of the Republic of Indonesia (Kemendikbudristek)',
    category: 'Government & Heritage',
    description:
      'Official national cultural inventory documenting regional Indonesian craft practices, including Balinese mejejaitan/penjor traditions, Javanese wedding rituals, and traditional culinary heritage such as Katupat Kandangan.',
    url: 'https://warisanbudaya.kemdikbud.go.id/',
  },
  {
    id: 'ref-kbbi',
    title: 'Kamus Besar Bahasa Indonesia (KBBI) — Entries: Janur, Ketupat, Lidi, Penjor',
    institutionOrAuthor: 'Badan Pengembangan dan Pembinaan Bahasa, Kemendikbudristek',
    category: 'Government & Heritage',
    description:
      'Authoritative Indonesian language dictionary defining botanical and cultural craft terminology including janur (daun kelapa muda), lidi, ketupat, kembar mayang, and penjor.',
    url: 'https://kbbi.kemdikbud.go.id/',
  },
  {
    id: 'ref-isi-denpasar',
    title: 'Estetika Seni Rupa dan Kerajinan Jejaitan Janur di Bali',
    institutionOrAuthor: 'Institut Seni Indonesia (ISI) Denpasar — Academic Art & Design Publications',
    category: 'Academic & Botanical',
    description:
      'Scholarly documentation on Balinese busung/janur cutting techniques (ringgitan), structural assembly (mejejaitan), and symbolic motifs in Hindu ceremonial art.',
    url: 'https://repo.isi-dps.ac.id/',
  },
  {
    id: 'ref-ugm-java',
    title: 'Makna Simbolik Kembar Mayang dan Tradisi Kupatan dalam Budaya Jawa',
    institutionOrAuthor: 'Universitas Gadjah Mada (UGM) Cultural Studies & Ethnography Repository',
    category: 'Academic & Botanical',
    description:
      'Ethnographic research analyzing Javanese wedding iconography, Kembar Mayang construction, and the historical evolution of Bakda Kupat across Central and East Java.',
    url: 'https://etd.repository.ugm.ac.id/',
  },
  {
    id: 'ref-museum-nasional',
    title: 'Museum Nasional Indonesia — Ethnographic Fiber & Basketry Collections',
    institutionOrAuthor: 'Museum Nasional Indonesia (Jakarta)',
    category: 'Cultural Archive',
    description:
      'National curatorial archive preserving Nusantara woven plant-fiber traditions, regional ceremonial vessels, and ethnographic documentation.',
    url: 'https://www.museumnasional.or.id/',
  },
  {
    id: 'ref-brin-ethnobotany',
    title: 'Ethnobotanical Utilization of Cocos nucifera in Indonesian Traditional Crafts',
    institutionOrAuthor: 'National Research and Innovation Agency (BRIN) — Research Center for Biology & Ethnobotany',
    category: 'Academic & Botanical',
    description:
      'Botanical and sustainability research documenting non-timber palm frond harvesting, biodegradable plant-fiber mechanics, and zero-waste agroforestry across Indonesia.',
    url: 'https://www.brin.go.id/',
  },
];
