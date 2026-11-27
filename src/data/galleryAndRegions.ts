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
    whatItLooksLike:
      'A plump green diamond pouch woven from two young coconut leaf strips. It has six corners and a checkerboard weave.',
    howItIsUsed:
      'Cooks put raw rice inside and boil it in water. The rice cooks cleanly inside the pouch and stays firm for eating with soup or curry.',
    interestingFact:
      'In Java, people share ketupat one week after Eid al-Fitr (Bakda Kupat) to say sorry and forgive one another.',
    imageUrl: JANUR_IMAGES.ketupatWoven,
  },
  {
    id: 'penjor-galungan',
    accessionNumber: 'JC-02',
    title: 'Balinese Penjor Street Pole',
    indonesianName: 'Penjor Galungan',
    category: 'Ceremonial',
    region: 'Bali',
    whatItLooksLike:
      'A very tall bamboo pole with a gentle curved top. It is covered with cut janur banners, pleated crowns, and hanging leaf tassels.',
    howItIsUsed:
      'Families put penjor outside their front gates along village roads during the Galungan festival in Bali.',
    interestingFact:
      'In Balinese culture, the tall curved top reminds people of Mount Agung, the highest mountain in Bali.',
    imageUrl: JANUR_IMAGES.penjorBali,
  },
  {
    id: 'kembar-mayang',
    accessionNumber: 'JC-03',
    title: 'Kembar Mayang Wedding Bouquet',
    indonesianName: 'Kembar Mayang',
    category: 'Ceremonial',
    region: 'Central Java & Yogyakarta',
    whatItLooksLike:
      'A matching pair of tall green leaf bouquets standing in pots. They have woven leaf daggers (keris), folded fans, and tiny leaf birds.',
    howItIsUsed:
      'People carry these two matching bouquets during traditional Javanese weddings.',
    interestingFact:
      'The name "Kembar Mayang" means "twin blossoms," bringing good wishes for love and teamwork.',
    imageUrl: JANUR_IMAGES.kembarMayang,
  },
  {
    id: 'canang-sari-sampian',
    accessionNumber: 'JC-04',
    title: 'Canang Sari & Sampian Flower Crown',
    indonesianName: 'Canang Sari & Sampian',
    category: 'Offerings',
    region: 'Bali',
    whatItLooksLike:
      'A small square leaf tray topped with a star-shaped leaf flower crown (sampian) and bright petals.',
    howItIsUsed:
      'Balinese families make these every morning to hold fresh flowers for daily prayers.',
    interestingFact:
      'Instead of tape or glue, crafters hold every corner together with tiny bamboo pins called semat.',
    imageUrl: JANUR_IMAGES.canangOfferings,
  },
  {
    id: 'janur-lidi-prep',
    accessionNumber: 'JC-05',
    title: 'Removing the Middle Stick (Menyeset)',
    indonesianName: 'Menyeset Janur',
    category: 'Technique',
    region: 'Across Indonesia',
    whatItLooksLike:
      'A fresh light-green coconut leaf being split into two smooth ribbons by taking out the brown stick (lidi) in the middle.',
    howItIsUsed:
      'This is the first step before weaving a ketupat, toy grasshopper, or party decoration.',
    interestingFact:
      'Nothing goes to waste! People tie the leftover hard lidi sticks together to make outdoor brooms (sapu lidi).',
    imageUrl: JANUR_IMAGES.janurPreparation,
  },
  {
    id: 'contemporary-janur-installation',
    accessionNumber: 'JC-06',
    title: 'Modern Woven Janur Lamps & Centerpiece',
    indonesianName: 'Anyaman Janur Modern',
    category: 'Contemporary',
    region: 'Yogyakarta, Jakarta & Bali',
    whatItLooksLike:
      'Bright woven coconut-leaf hanging lamps and folded table decorations in a modern room.',
    howItIsUsed:
      'Young Indonesian designers hang these lamps and set them on wedding or hotel tables instead of plastic decorations.',
    interestingFact:
      'Over a few weeks, the lamps naturally change color from bright green to warm golden brown.',
    imageUrl: JANUR_IMAGES.modernDesign,
  },
  {
    id: 'ketupat-and-lepet',
    accessionNumber: 'JC-07',
    title: 'Ketupat & Lepet Holiday Plate',
    indonesianName: 'Ketupat & Lepet',
    category: 'Culinary',
    region: 'Central, East & West Java',
    whatItLooksLike:
      'Woven diamond ketupat sitting next to round green rolls of lepet tied with thin bamboo string.',
    howItIsUsed:
      'Families cook and share both dishes together at holiday meals and neighborhood gatherings.',
    interestingFact:
      'Lepet wraps sticky rice with peanuts inside a rolled leaf tube instead of weaving a diamond.',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
  },
  {
    id: 'exhibition-ensemble',
    accessionNumber: 'JC-08',
    title: 'Indonesian Janur Craft Display',
    indonesianName: 'Ragam Janur Nusantara',
    category: 'Contemporary',
    region: 'Indonesia',
    whatItLooksLike:
      'A group of diamond food pouches, folded leaf fans, and round wreaths all woven from young coconut leaves.',
    howItIsUsed:
      'Displayed at cultural events and schools to teach visitors about Indonesian plant crafts.',
    interestingFact:
      'Every single item on the table is made from one renewable plant without a drop of glue.',
    imageUrl: JANUR_IMAGES.heroExhibition,
  },
  {
    id: 'belalang-janur-toys',
    accessionNumber: 'JC-09',
    title: 'Woven Leaf Grasshopper & Flower Rosette',
    indonesianName: 'Belalang Janur & Bunga',
    category: 'Technique',
    region: 'Java, Bali & Sumatra',
    whatItLooksLike:
      'A green woven grasshopper with long feelers and bent jumping legs, beside a star-shaped palm leaf flower.',
    howItIsUsed:
      'Parents and craft teachers weave leaf animals as plastic-free toys for children and decorate family trays with the leaf flower.',
    interestingFact:
      'Making leaf grasshoppers teaches children how to braid and fold leaves without any glue or plastic.',
    imageUrl: JANUR_IMAGES.janurToys,
  },
];

export const REGIONAL_TRADITIONS: RegionalTradition[] = [
  {
    id: 'bali',
    regionName: 'Bali',
    provinceOrIsland: 'Bali Island',
    coordinates: { x: 438, y: 266 },
    signatureCrafts: ['Penjor', 'Canang Sari', 'Sampian', 'Lamak'],
    localTerminology: 'Busung (young coconut leaf), Semat (tiny bamboo pin)',
    imageUrl: JANUR_IMAGES.penjorBali,
    imageCaption: 'Tall Balinese Penjor poles decorated with busung leaves.',
    summary:
      'In Bali, families fold young coconut leaves (busung) every single day for prayers and street festivals.',
    culturalContext:
      'Crafters cut neat patterns along leaf edges and pin them with tiny bamboo sticks (semat) to build Canang Sari trays and tall Penjor poles.',
    verifiedHighlight:
      'During Galungan, Balinese roads are lined with hundreds of curved Penjor poles.',
  },
  {
    id: 'central-java-yogya',
    regionName: 'Central Java & Yogyakarta',
    provinceOrIsland: 'Java Island',
    coordinates: { x: 356, y: 256 },
    signatureCrafts: ['Kembar Mayang', 'Janur Wedding Arch', 'Ketupat Bawang'],
    localTerminology: 'Janur kuning (young yellow-green leaf), Bakda Kupat',
    imageUrl: JANUR_IMAGES.kembarMayang,
    imageCaption: 'Kembar Mayang bouquets made for Javanese weddings.',
    summary:
      'Central Java and Yogyakarta are known for wedding leaf bouquets and holiday ketupat meals.',
    culturalContext:
      'A tall janur arch outside a house shows a wedding is happening. One week after Eid, families cook and share ketupat for Bakda Kupat.',
    verifiedHighlight:
      'In Java, "kupat" reminds people to say sorry and forgive others.',
  },
  {
    id: 'west-java',
    regionName: 'West Java (Sunda)',
    provinceOrIsland: 'Java Island',
    coordinates: { x: 288, y: 247 },
    signatureCrafts: ['Kupat Tanjung', 'Lepet'],
    localTerminology: 'Daun kalapa ngora (young coconut leaf), Nganyam (weaving)',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Woven kupat and rolled lepet wrapped in coconut leaves.',
    summary:
      'Sundanese cooks in West Java use woven leaf rice cakes in popular street dishes and family feasts.',
    culturalContext:
      'Local dishes like Kupat Tahu and Kupat Tanjung use woven rice cakes topped with peanut sauce or warm coconut soup.',
    verifiedHighlight:
      'Sundanese lepet mixes sticky rice and peanuts inside a rolled coconut leaf.',
  },
  {
    id: 'east-java-madura',
    regionName: 'East Java & Madura',
    provinceOrIsland: 'Java & Madura Islands',
    coordinates: { x: 400, y: 258 },
    signatureCrafts: ['Ketupat Luar', 'Ketupat Pasar'],
    localTerminology: 'Topak (Madurese word for ketupat), Kupatan',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    imageCaption: 'Freshly woven ketupat pouches on a woven tray.',
    summary:
      'Towns in East Java and Madura celebrate Kupatan week with several fun ketupat shapes.',
    culturalContext:
      'Families weave both square Ketupat Pasar and pointed Ketupat Luar to eat with traditional vegetable dishes.',
    verifiedHighlight:
      'Tight weaving keeps the rice firm so cooks can slice it cleanly for Topak Lodeh.',
  },
  {
    id: 'west-sumatra',
    regionName: 'West Sumatra (Minangkabau)',
    provinceOrIsland: 'Sumatra Island',
    coordinates: { x: 162, y: 170 },
    signatureCrafts: ['Katupek Pitalah', 'Katupek Gulai Kapau'],
    localTerminology: 'Katupek (Minangkabau word for ketupat)',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Preparing young coconut leaves for Minangkabau katupek.',
    summary:
      'In West Sumatra, woven leaf rice cakes (katupek) are a favorite everyday breakfast food.',
    culturalContext:
      'Markets prepare katupek every morning to serve with warm, tasty vegetable curry.',
    verifiedHighlight:
      'Katupek soaks up rich curry sauce without falling apart.',
  },
  {
    id: 'south-kalimantan',
    regionName: 'South Kalimantan (Banjar)',
    provinceOrIsland: 'Kalimantan (Borneo)',
    coordinates: { x: 444, y: 172 },
    signatureCrafts: ['Katupat Kandangan'],
    localTerminology: 'Katupat (Banjar word for ketupat)',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    imageCaption: 'Woven diamond pouches used for Katupat Kandangan.',
    summary:
      'The Banjar people made Katupat Kandangan one of Borneo’s most famous traditional meals.',
    culturalContext:
      'Soft boiled katupat is served in warm coconut-milk broth with grilled fish.',
    verifiedHighlight:
      'Skilled weavers in Kandangan can weave dozens of pouches in just one hour.',
  },
  {
    id: 'south-sulawesi',
    regionName: 'South Sulawesi (Bugis–Makassar)',
    provinceOrIsland: 'Sulawesi Island',
    coordinates: { x: 525, y: 196 },
    signatureCrafts: ['Lappa-lappa', 'Ketupat Bugis'],
    localTerminology: 'Lappa-lappa (rolled sticky rice in young coconut leaf)',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Rolled coconut-leaf rice tubes and woven diamond pouches.',
    summary:
      'Bugis and Makassar families serve woven ketupat alongside rolled lappa-lappa at feasts.',
    culturalContext:
      'Coconut leaves are wrapped in spirals around sticky rice to make lappa-lappa, then steamed and eaten with warm soups.',
    verifiedHighlight:
      'Steaming lappa-lappa in young coconut leaves gives the rice a sweet natural smell.',
  },
];

export const REFERENCE_SOURCES: ReferenceSource[] = [
  {
    id: 'ref-kemendikbud-wbtb',
    title: 'Warisan Budaya Takbenda Indonesia (Indonesian Heritage List)',
    institutionOrAuthor: 'Ministry of Education and Culture of Indonesia',
    category: 'Government & Heritage',
    description:
      'Official Indonesian website listing living crafts like Balinese offerings, Javanese wedding bouquets, and Katupat Kandangan.',
    url: 'https://warisanbudaya.kemdikbud.go.id/',
  },
  {
    id: 'ref-kbbi',
    title: 'Kamus Besar Bahasa Indonesia (KBBI) — Official Dictionary',
    institutionOrAuthor: 'Indonesian Language Agency (Badan Bahasa)',
    category: 'Government & Heritage',
    description:
      'Official Indonesian dictionary explaining craft words like janur, lidi, ketupat, kembar mayang, and penjor.',
    url: 'https://kbbi.kemdikbud.go.id/',
  },
  {
    id: 'ref-isi-denpasar',
    title: 'Balinese Janur Weaving Art (Jejaitan Busung)',
    institutionOrAuthor: 'Indonesian Institute of the Arts (ISI) Denpasar',
    category: 'Academic & Botanical',
    description:
      'Art school guides explaining Balinese leaf-cutting shapes (ringgitan) and pinning methods (semat).',
    url: 'https://repo.isi-dps.ac.id/',
  },
  {
    id: 'ref-ugm-java',
    title: 'Stories of Kembar Mayang and Kupatan in Java',
    institutionOrAuthor: 'Universitas Gadjah Mada (UGM) Library',
    category: 'Academic & Botanical',
    description:
      'Cultural notes explaining Javanese wedding bouquets and Bakda Kupat celebrations.',
    url: 'https://etd.repository.ugm.ac.id/',
  },
  {
    id: 'ref-museum-nasional',
    title: 'Museum Nasional Indonesia — Plant-Fiber & Basket Collections',
    institutionOrAuthor: 'National Museum of Indonesia (Jakarta)',
    category: 'Cultural Archive',
    description:
      'National museum caring for Indonesian woven plant crafts and cultural history.',
    url: 'https://www.museumnasional.or.id/',
  },
  {
    id: 'ref-brin-ethnobotany',
    title: 'Uses of Coconut Trees in Indonesian Crafts',
    institutionOrAuthor: 'National Research and Innovation Agency (BRIN)',
    category: 'Academic & Botanical',
    description:
      'Plant studies showing safe ways to pick coconut leaves without hurting the tree.',
    url: 'https://www.brin.go.id/',
  },
];
