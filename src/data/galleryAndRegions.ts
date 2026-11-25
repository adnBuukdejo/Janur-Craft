import { GalleryItem, ReferenceSource, RegionalTradition } from '../types/janur';
import { JANUR_IMAGES } from './images';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'ketupat-bawang',
    accessionNumber: 'JC-01',
    title: 'Ketupat Bawang (Diamond Rice Pouch)',
    indonesianName: 'Ketupat Bawang / Kupat',
    category: 'Culinary',
    region: 'Java, Sumatra, Kalimantan & Sulawesi',
    medium: 'Two stripped young coconut leaf blades',
    occasion: 'Eid al-Fitr (Bakda Kupat), family feasts, traditional street food',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    description:
      'A classic six-cornered woven leaf pouch. Its tight criss-cross weave holds uncooked rice securely while letting hot water cook the rice evenly inside.',
    culturalBackground:
      'In Javanese tradition, ketupat (kupat) is linked to "ngaku lepat" (saying sorry and forgiving others) and is widely shared during Bakda Kupat, one week after Eid al-Fitr. Across Sumatra, Kalimantan, and Sulawesi, local cooks also weave ketupat year-round.',
  },
  {
    id: 'penjor-galungan',
    accessionNumber: 'JC-02',
    title: 'Balinese Penjor Archway & Sampian',
    indonesianName: 'Penjor Galungan',
    category: 'Ceremonial',
    region: 'Bali',
    medium: 'Curved bamboo pole, young coconut leaves (busung), farm produce',
    occasion: 'Galungan & Kuningan festivals, temple celebrations',
    imageUrl: JANUR_IMAGES.penjorBali,
    description:
      'Tall curved bamboo poles placed along Balinese village roads before Galungan, decorated with lacy cut janur runners, pleated crowns, and hanging tassels.',
    culturalBackground:
      'In Balinese Hindu culture, the penjor thanks God for earth’s gifts and harvest abundance, with its tall curved top reminding people of Mount Agung.',
  },
  {
    id: 'kembar-mayang',
    accessionNumber: 'JC-03',
    title: 'Kembar Mayang Wedding Arrangement',
    indonesianName: 'Kembar Mayang (Gagar Mayang)',
    category: 'Ceremonial',
    region: 'Central Java & Yogyakarta',
    medium: 'Young coconut leaves, banana stem base, garden greenery',
    occasion: 'Javanese traditional weddings',
    imageUrl: JANUR_IMAGES.kembarMayang,
    description:
      'A matched pair of sculpted leaf bouquets decorated with woven janur daggers (keris), pleated fans, and tiny birds standing in traditional brass pots.',
    culturalBackground:
      'Carried during traditional Javanese wedding ceremonies, Kembar Mayang ("twin blossoms") brings wishes of wisdom, harmony, and strength to the bride and groom.',
  },
  {
    id: 'canang-sari-sampian',
    accessionNumber: 'JC-04',
    title: 'Canang Sari & Sampian Rosettes',
    indonesianName: 'Canang Sari & Sampian Uras',
    category: 'Offerings',
    region: 'Bali',
    medium: 'Young coconut leaves (busung), bamboo pins (semat), tropical flowers',
    occasion: 'Daily Balinese Hindu prayer offerings',
    imageUrl: JANUR_IMAGES.canangOfferings,
    description:
      'Small square woven coconut-leaf trays topped with flower-shaped pleated leaf rosettes (sampian) and colorful frangipani and marigold petals.',
    culturalBackground:
      'Made by Balinese families every day, Canang Sari reflects gratitude, peace, and balance between people, nature, and the spiritual world.',
  },
  {
    id: 'janur-lidi-prep',
    accessionNumber: 'JC-05',
    title: 'Menyeset — Stripping the Center Stick (Lidi)',
    indonesianName: 'Proses Menyeset Janur',
    category: 'Technique',
    region: 'Across Indonesia',
    medium: 'Fresh pale-yellow coconut leaf & small craft knife',
    occasion: 'First step before weaving',
    imageUrl: JANUR_IMAGES.janurPreparation,
    description:
      'Carefully slicing the woody center stick (lidi) away from the soft green leaf blades so they become smooth, even ribbons ready for weaving.',
    culturalBackground:
      'Nothing goes to waste: the soft green leaf strips become ketupat or decorations, while the saved lidi sticks are tied into brooms (sapu lidi) or cut into tiny pins.',
  },
  {
    id: 'contemporary-janur-installation',
    accessionNumber: 'JC-06',
    title: 'Modern Woven Janur Lamps & Centerpiece',
    indonesianName: 'Instalasi Anyaman Janur Kontemporer',
    category: 'Contemporary',
    region: 'Yogyakarta, Jakarta & Bali',
    medium: 'Young & mature coconut fronds, natural bamboo frame',
    occasion: 'Eco-friendly interiors, art exhibitions, green weddings',
    imageUrl: JANUR_IMAGES.modernDesign,
    description:
      'Modern hanging lampshades and folded table sculptures made using classic Indonesian leaf weaving and fan-pleating without any plastic.',
    culturalBackground:
      'Modern Indonesian designers and event stylists partner with traditional crafters to replace plastic party foam with biodegradable, artistic janur pieces.',
  },
  {
    id: 'ketupat-and-lepet',
    accessionNumber: 'JC-07',
    title: 'Ketupat & Lepet Holiday Platter',
    indonesianName: 'Ketupat & Lepet Kacang',
    category: 'Culinary',
    region: 'Central, East & West Java',
    medium: 'Woven coconut-leaf pouches and wrapped leaf cylinders tied with bamboo string',
    occasion: 'Syawalan / Bakda Kupat & harvest gatherings',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    description:
      'Diamond-shaped ketupat served beside cylindrical lepet—sticky rice mixed with grated coconut and beans wrapped tightly inside rolled janur.',
    culturalBackground:
      'Together on the holiday table, ketupat and lepet show two different leaf skills: criss-cross diamond weaving and tight spiral wrapping.',
  },
  {
    id: 'exhibition-ensemble',
    accessionNumber: 'JC-08',
    title: 'Indonesian Janur Craft Collection',
    indonesianName: 'Ragam Anyaman Janur Nusantara',
    category: 'Contemporary',
    region: 'Cultural Exhibition Display',
    medium: 'Woven coconut leaves, pleated fans, circular floral wreaths',
    occasion: 'Cultural learning and exhibition display',
    imageUrl: JANUR_IMAGES.heroExhibition,
    description:
      'A display showing diamond food pouches, pleated leaf fans, and circular garlands all made from fresh young coconut leaves.',
    culturalBackground:
      'Created to help international visitors see how one renewable plant leaf can become everyday cookware, sacred art, and joyful decorations.',
  },
];

export const REGIONAL_TRADITIONS: RegionalTradition[] = [
  {
    id: 'bali',
    regionName: 'Bali',
    provinceOrIsland: 'Bali Island',
    coordinates: { x: 438, y: 266 },
    signatureCrafts: ['Penjor', 'Canang Sari', 'Sampian', 'Lamak'],
    localTerminology: 'Busung (young coconut leaf), Mejejaitan (pinning leaves), Metanding (arranging offerings)',
    imageUrl: JANUR_IMAGES.penjorBali,
    imageCaption: 'Balinese Penjor poles decorated with notched busung leaves during Galungan.',
    summary:
      'In Bali, young coconut leaves—called busung—are used every single day for family prayers and big temple festivals.',
    culturalContext:
      'Unlike places where janur appears mostly on holidays or weddings, Balinese communities fold and pin busung daily. Neat cut patterns (ringgitan) pinned with tiny bamboo needles (semat) become Canang Sari flower trays and tall Penjor street poles.',
    verifiedHighlight:
      'Balinese families preserve dozens of named cutting patterns, including long woven Lamak banners hung on temple shrines.',
  },
  {
    id: 'central-java-yogya',
    regionName: 'Central Java & Yogyakarta',
    provinceOrIsland: 'Java Island',
    coordinates: { x: 356, y: 256 },
    signatureCrafts: ['Kembar Mayang', 'Janur Wedding Arch', 'Ketupat Bawang'],
    localTerminology: 'Janur kuning (yellow-green young leaf), Kembar Mayang, Bakda Kupat',
    imageUrl: JANUR_IMAGES.kembarMayang,
    imageCaption: 'Kembar Mayang arrangement made for traditional Javanese weddings.',
    summary:
      'Central Java and Yogyakarta blend detailed wedding sculptures with lively holiday food traditions.',
    culturalContext:
      'A tall janur arch outside a house tells neighbors a wedding is taking place inside. During the ceremony, matched Kembar Mayang bouquets feature woven keris daggers, birds, and fans. A week after Eid, families weave and share ketupat for Bakda Kupat.',
    verifiedHighlight:
      'Javanese tradition connects "kupat" to "ngaku lepat" (admitting mistakes) and "laku papat" (four holiday virtues).',
  },
  {
    id: 'west-java',
    regionName: 'West Java (Sunda)',
    provinceOrIsland: 'Java Island',
    coordinates: { x: 288, y: 247 },
    signatureCrafts: ['Kupat Tanjung', 'Kupat Salamet', 'Lepet'],
    localTerminology: 'Daun kalapa ngora (young coconut leaf), Kupat Tahu, Nganyam (weaving)',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Woven kupat and tied lepet wrapped in young coconut leaves.',
    summary:
      'Sundanese communities in West Java use coconut-leaf weaving in popular street dishes and family thanksgiving meals.',
    culturalContext:
      'West Java is famous for dishes built around woven coconut-leaf rice cakes, such as Kupat Tahu in Tasikmalaya and Garut, plus Kupat Tanjung served with creamy coconut-milk stews at family celebrations.',
    verifiedHighlight:
      'Sundanese lepet rolls sticky rice with peanuts or black-eyed peas inside young coconut leaves tied with split bamboo.',
  },
  {
    id: 'east-java-madura',
    regionName: 'East Java & Madura',
    provinceOrIsland: 'Java & Madura Islands',
    coordinates: { x: 400, y: 258 },
    signatureCrafts: ['Ketupat Luar', 'Kupatan Coastal Festivals', 'Ketupat Pasar'],
    localTerminology: 'Topak (Madurese word for ketupat), Kupatan',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    imageCaption: 'Freshly woven ketupat pouches resting on a woven bamboo tray.',
    summary:
      'Coastal East Java and Madura host festive Kupatan celebrations featuring several multi-cornered ketupat shapes.',
    culturalContext:
      'From Gresik and Lamongan across to Madura Island, families weave both classic square Ketupat Pasar and pointed Ketupat Luar during Kupatan week.',
    verifiedHighlight:
      'Madurese Topak Lodeh and East Javanese Rujak Cingur depend on tightly woven ketupat for firm, sliceable rice cakes.',
  },
  {
    id: 'west-sumatra',
    regionName: 'West Sumatra (Minangkabau)',
    provinceOrIsland: 'Sumatra Island',
    coordinates: { x: 162, y: 170 },
    signatureCrafts: ['Katupek Pitalah', 'Katupek Gulai Kapau', 'Katupek Sayur'],
    localTerminology: 'Katupek (Minangkabau word for ketupat), Pucuak karambia (young coconut shoot)',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Preparing young coconut fronds before weaving Minangkabau katupek.',
    summary:
      'In West Sumatra, katupek woven from young coconut leaves is a beloved everyday breakfast food as well as a festive dish.',
    culturalContext:
      'While some islands weave ketupat mainly for holidays, Minangkabau markets prepare katupek every morning for dishes like Katupek Pitalah and Katupek Gulai Kapau with spiced jackfruit and fern curry.',
    verifiedHighlight:
      'Tight Minangkabau weaving produces tender rice cakes that soak up rich coconut curry without falling apart.',
  },
  {
    id: 'south-kalimantan',
    regionName: 'South Kalimantan (Banjar)',
    provinceOrIsland: 'Kalimantan (Borneo)',
    coordinates: { x: 444, y: 172 },
    signatureCrafts: ['Katupat Kandangan'],
    localTerminology: 'Katupat (Banjar), Daun nyiur anum (young coconut leaf)',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    imageCaption: 'Classic woven diamond pouches used for South Kalimantan’s Katupat Kandangan.',
    summary:
      'The Banjar people of South Kalimantan turned woven coconut-leaf rice cakes into one of Borneo’s most famous dishes.',
    culturalContext:
      'Katupat Kandangan uses traditionally woven coconut-leaf pouches boiled until soft, then served in warm coconut-milk broth with grilled snakehead fish (haruan). Skilled weavers in Kandangan supply local eateries daily.',
    verifiedHighlight:
      'Experienced Banjar weavers work so smoothly by hand that they can braid dozens of uniform katupat shells in an hour.',
  },
  {
    id: 'south-sulawesi',
    regionName: 'South Sulawesi (Bugis–Makassar)',
    provinceOrIsland: 'Sulawesi Island',
    coordinates: { x: 525, y: 196 },
    signatureCrafts: ['Lappa-lappa', 'Ketupat Bugis'],
    localTerminology: 'Lappa-lappa (wrapped sticky rice), Daun kaluku lolo (young coconut leaf)',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Wrapped coconut-leaf rice rolls and woven diamond pouches.',
    summary:
      'Bugis and Makassar communities pair woven diamond ketupat with slender rolled lappa-lappa at feasts and family gatherings.',
    culturalContext:
      'Young coconut leaves are wrapped in spirals around seasoned sticky rice to make lappa-lappa, then steamed and served alongside hearty stews like Coto Makassar and Konro.',
    verifiedHighlight:
      'Steaming lappa-lappa inside young coconut leaves gives the sticky rice a gentle, natural palm fragrance.',
  },
];

export const REFERENCE_SOURCES: ReferenceSource[] = [
  {
    id: 'ref-kemendikbud-wbtb',
    title: 'Warisan Budaya Takbenda Indonesia (Intangible Cultural Heritage Registry)',
    institutionOrAuthor: 'Ministry of Education, Culture, Research, and Technology of Indonesia',
    category: 'Government & Heritage',
    description:
      'Official national cultural database documenting Indonesian traditions including Balinese offerings, Javanese wedding crafts, and regional dishes like Katupat Kandangan.',
    url: 'https://warisanbudaya.kemdikbud.go.id/',
  },
  {
    id: 'ref-kbbi',
    title: 'Kamus Besar Bahasa Indonesia (KBBI) — Entries: Janur, Ketupat, Lidi, Penjor',
    institutionOrAuthor: 'Indonesian Language Development Agency (Badan Bahasa)',
    category: 'Government & Heritage',
    description:
      'Official Indonesian dictionary defining craft words including janur, lidi, ketupat, kembar mayang, and penjor.',
    url: 'https://kbbi.kemdikbud.go.id/',
  },
  {
    id: 'ref-isi-denpasar',
    title: 'Balinese Janur Weaving Art & Aesthetics (Jejaitan Busung)',
    institutionOrAuthor: 'Indonesian Institute of the Arts (ISI) Denpasar',
    category: 'Academic & Botanical',
    description:
      'Art school research explaining Balinese leaf-cutting motifs (ringgitan), pinning techniques (mejejaitan), and ceremonial symbols.',
    url: 'https://repo.isi-dps.ac.id/',
  },
  {
    id: 'ref-ugm-java',
    title: 'Symbolism of Kembar Mayang and Kupatan Traditions in Java',
    institutionOrAuthor: 'Universitas Gadjah Mada (UGM) Cultural Studies Repository',
    category: 'Academic & Botanical',
    description:
      'Cultural studies documenting Javanese wedding decorations, Kembar Mayang meanings, and Bakda Kupat celebrations.',
    url: 'https://etd.repository.ugm.ac.id/',
  },
  {
    id: 'ref-museum-nasional',
    title: 'Museum Nasional Indonesia — Traditional Plant-Fiber & Basketry Collections',
    institutionOrAuthor: 'National Museum of Indonesia (Jakarta)',
    category: 'Cultural Archive',
    description:
      'National museum preserving Indonesian woven plant-fiber traditions and ethnographic craft records.',
    url: 'https://www.museumnasional.or.id/',
  },
  {
    id: 'ref-brin-ethnobotany',
    title: 'Traditional Uses of Coconut Palm (Cocos nucifera) in Indonesian Crafts',
    institutionOrAuthor: 'National Research and Innovation Agency (BRIN)',
    category: 'Academic & Botanical',
    description:
      'Plant and sustainability research documenting eco-friendly coconut-frond harvesting and zero-waste craft practices.',
    url: 'https://www.brin.go.id/',
  },
];
