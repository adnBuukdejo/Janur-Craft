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
    medium: 'Two soft young coconut leaf strips',
    occasion: 'Eid al-Fitr (Bakda Kupat), family dinners, street food',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    description:
      'A famous diamond-shaped pouch with six corners. Its tight over-and-under weave holds raw rice inside while letting hot water cook it evenly.',
    culturalBackground:
      'In Java, ketupat (kupat) reminds people to say sorry and forgive each other during Bakda Kupat, one week after Eid al-Fitr. Across Sumatra, Kalimantan, and Sulawesi, cooks also weave ketupat every day for lunch and breakfast dishes.',
  },
  {
    id: 'penjor-galungan',
    accessionNumber: 'JC-02',
    title: 'Balinese Penjor Archway & Sampian',
    indonesianName: 'Penjor Galungan',
    category: 'Ceremonial',
    region: 'Bali',
    medium: 'Curved bamboo pole, young coconut leaves (busung), farm crops',
    occasion: 'Galungan & Kuningan festivals, temple days',
    imageUrl: JANUR_IMAGES.penjorBali,
    description:
      'Tall curved bamboo poles placed along Balinese streets before Galungan. They are decorated with pretty cut janur banners, pleated crowns, and hanging tassels.',
    culturalBackground:
      'In Bali, families put up a penjor to thank God for good harvests and nature’s gifts. Its tall curved top reminds people of Mount Agung, Bali’s highest mountain.',
  },
  {
    id: 'kembar-mayang',
    accessionNumber: 'JC-03',
    title: 'Kembar Mayang Wedding Bouquet',
    indonesianName: 'Kembar Mayang (Gagar Mayang)',
    category: 'Ceremonial',
    region: 'Central Java & Yogyakarta',
    medium: 'Young coconut leaves, banana stem base, garden leaves',
    occasion: 'Javanese weddings',
    imageUrl: JANUR_IMAGES.kembarMayang,
    description:
      'A matching pair of woven leaf bouquets decorated with janur daggers (keris), folded fans, and little leaf birds standing in brass pots.',
    culturalBackground:
      'Carried during traditional Javanese weddings, Kembar Mayang ("twin flowers") brings good wishes of love, wisdom, and teamwork for the bride and groom.',
  },
  {
    id: 'canang-sari-sampian',
    accessionNumber: 'JC-04',
    title: 'Canang Sari & Sampian Flower Crowns',
    indonesianName: 'Canang Sari & Sampian Uras',
    category: 'Offerings',
    region: 'Bali',
    medium: 'Young coconut leaves (busung), tiny bamboo pins (semat), fresh flowers',
    occasion: 'Daily Balinese Hindu prayers',
    imageUrl: JANUR_IMAGES.canangOfferings,
    description:
      'Small square woven leaf trays topped with pleated flower crowns (sampian) and bright petals.',
    culturalBackground:
      'Balinese families make Canang Sari every single morning to say thank you and wish for peace between people and nature.',
  },
  {
    id: 'janur-lidi-prep',
    accessionNumber: 'JC-05',
    title: 'Menyeset — Removing the Middle Stick (Lidi)',
    indonesianName: 'Proses Menyeset Janur',
    category: 'Technique',
    region: 'Across Indonesia',
    medium: 'Fresh light-green coconut leaf & small knife',
    occasion: 'First step before weaving',
    imageUrl: JANUR_IMAGES.janurPreparation,
    description:
      'Carefully cutting away the hard wooden stick (lidi) in the middle of the leaf. This gives you two soft green strips ready to fold and weave.',
    culturalBackground:
      'Nothing is thrown away: the soft green leaf strips become ketupat or decorations, while the saved lidi sticks are tied into brooms (sapu lidi) or tiny pins.',
  },
  {
    id: 'contemporary-janur-installation',
    accessionNumber: 'JC-06',
    title: 'Modern Woven Janur Lamps & Centerpiece',
    indonesianName: 'Instalasi Anyaman Janur Kontemporer',
    category: 'Contemporary',
    region: 'Yogyakarta, Jakarta & Bali',
    medium: 'Young & dark-green coconut leaves, bamboo frame',
    occasion: 'Eco-friendly rooms, art shows, green weddings',
    imageUrl: JANUR_IMAGES.modernDesign,
    description:
      'Modern hanging lampshades and folded table art made using Indonesian leaf weaving and fan folding—with zero plastic.',
    culturalBackground:
      'Young Indonesian designers work with village crafters to replace plastic party foam with natural, earth-friendly janur art.',
  },
  {
    id: 'ketupat-and-lepet',
    accessionNumber: 'JC-07',
    title: 'Ketupat & Lepet Holiday Plate',
    indonesianName: 'Ketupat & Lepet Kacang',
    category: 'Culinary',
    region: 'Central, East & West Java',
    medium: 'Woven coconut-leaf pouches and rolled leaf tubes tied with bamboo string',
    occasion: 'Syawalan / Bakda Kupat & harvest feasts',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    description:
      'Diamond-shaped ketupat served next to round tubes of lepet—sticky rice mixed with grated coconut and peanuts wrapped tightly in janur.',
    culturalBackground:
      'On a holiday plate, ketupat and lepet show two fun leaf skills: over-and-under diamond weaving and tight spiral rolling.',
  },
  {
    id: 'exhibition-ensemble',
    accessionNumber: 'JC-08',
    title: 'Indonesian Janur Craft Display',
    indonesianName: 'Ragam Anyaman Janur Nusantara',
    category: 'Contemporary',
    region: 'Cultural Display',
    medium: 'Woven coconut leaves, pleated fans, round leaf wreaths',
    occasion: 'School & museum learning display',
    imageUrl: JANUR_IMAGES.heroExhibition,
    description:
      'A colorful collection showing diamond food pouches, folded leaf fans, and round wreaths all made from fresh young coconut leaves.',
    culturalBackground:
      'Put together to help international visitors see how one simple palm leaf becomes everyday cooking pouches, holy art, and joyful decorations.',
  },
];

export const REGIONAL_TRADITIONS: RegionalTradition[] = [
  {
    id: 'bali',
    regionName: 'Bali',
    provinceOrIsland: 'Bali Island',
    coordinates: { x: 438, y: 266 },
    signatureCrafts: ['Penjor', 'Canang Sari', 'Sampian', 'Lamak'],
    localTerminology: 'Busung (young coconut leaf), Mejejaitan (pinning leaves), Metanding (arranging trays)',
    imageUrl: JANUR_IMAGES.penjorBali,
    imageCaption: 'Balinese Penjor poles decorated with cut busung leaves during Galungan.',
    summary:
      'In Bali, young coconut leaves—called busung—are folded every single day for family prayers and big temple festivals.',
    culturalContext:
      'Balinese families fold and pin busung daily. Neat cut edge patterns (ringgitan) pinned with tiny bamboo needles (semat) become Canang Sari flower trays and tall Penjor street poles.',
    verifiedHighlight:
      'Balinese crafters know dozens of special cut patterns, including long woven Lamak banners hung on temple shrines.',
  },
  {
    id: 'central-java-yogya',
    regionName: 'Central Java & Yogyakarta',
    provinceOrIsland: 'Java Island',
    coordinates: { x: 356, y: 256 },
    signatureCrafts: ['Kembar Mayang', 'Janur Wedding Arch', 'Ketupat Bawang'],
    localTerminology: 'Janur kuning (yellow-green young leaf), Kembar Mayang, Bakda Kupat',
    imageUrl: JANUR_IMAGES.kembarMayang,
    imageCaption: 'Kembar Mayang bouquets made for traditional Javanese weddings.',
    summary:
      'Central Java and Yogyakarta are famous for detailed wedding leaf art and holiday ketupat traditions.',
    culturalContext:
      'A tall janur arch outside a home tells neighbors a wedding is happening inside. Matched Kembar Mayang bouquets feature woven toy daggers, fans, and birds. One week after Eid, families share ketupat for Bakda Kupat.',
    verifiedHighlight:
      'In Java, "kupat" connects to "ngaku lepat" (saying sorry) and "laku papat" (four kind actions).',
  },
  {
    id: 'west-java',
    regionName: 'West Java (Sunda)',
    provinceOrIsland: 'Java Island',
    coordinates: { x: 288, y: 247 },
    signatureCrafts: ['Kupat Tanjung', 'Kupat Salamet', 'Lepet'],
    localTerminology: 'Daun kalapa ngora (young coconut leaf), Kupat Tahu, Nganyam (weaving)',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Woven kupat and rolled lepet wrapped in young coconut leaves.',
    summary:
      'Sundanese families in West Java use coconut-leaf weaving in popular street foods and family feasts.',
    culturalContext:
      'West Java is well known for street dishes with woven rice cakes, like Kupat Tahu in Tasikmalaya and Garut, and Kupat Tanjung eaten with warm coconut-milk soup.',
    verifiedHighlight:
      'Sundanese lepet rolls sticky rice with peanuts inside young coconut leaves tied with split bamboo.',
  },
  {
    id: 'east-java-madura',
    regionName: 'East Java & Madura',
    provinceOrIsland: 'Java & Madura Islands',
    coordinates: { x: 400, y: 258 },
    signatureCrafts: ['Ketupat Luar', 'Kupatan Festivals', 'Ketupat Pasar'],
    localTerminology: 'Topak (Madurese word for ketupat), Kupatan',
    imageUrl: JANUR_IMAGES.ketupatWoven,
    imageCaption: 'Freshly woven ketupat pouches sitting on a woven tray.',
    summary:
      'Towns along the coast of East Java and Madura celebrate Kupatan week with many fun ketupat shapes.',
    culturalContext:
      'From Gresik and Lamongan across to Madura Island, families weave square Ketupat Pasar and pointed Ketupat Luar during holiday week.',
    verifiedHighlight:
      'Local dishes like Topak Lodeh and Rujak Cingur need tightly woven ketupat so the rice slices cleanly.',
  },
  {
    id: 'west-sumatra',
    regionName: 'West Sumatra (Minangkabau)',
    provinceOrIsland: 'Sumatra Island',
    coordinates: { x: 162, y: 170 },
    signatureCrafts: ['Katupek Pitalah', 'Katupek Gulai Kapau', 'Katupek Sayur'],
    localTerminology: 'Katupek (Minangkabau word for ketupat), Pucuak karambia (young coconut shoot)',
    imageUrl: JANUR_IMAGES.janurPreparation,
    imageCaption: 'Preparing young coconut leaves before weaving Minangkabau katupek.',
    summary:
      'In West Sumatra, katupek woven from young coconut leaves is a favorite everyday breakfast food.',
    culturalContext:
      'In West Sumatra, markets cook katupek every morning for dishes like Katupek Pitalah and Katupek Gulai Kapau served with warm spiced vegetable curry.',
    verifiedHighlight:
      'Tight Minangkabau weaving makes soft rice cakes that soak up tasty curry without breaking apart.',
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
      'The Banjar people of South Kalimantan turned woven coconut-leaf rice cakes into one of Borneo’s best-loved dishes.',
    culturalContext:
      'Katupat Kandangan uses woven coconut-leaf pouches boiled soft and served in warm coconut-milk soup with grilled fish. Skilled weavers in Kandangan make dozens of pouches every day.',
    verifiedHighlight:
      'Experienced Banjar weavers work so smoothly by hand that they can weave dozens of pouches in a single hour.',
  },
  {
    id: 'south-sulawesi',
    regionName: 'South Sulawesi (Bugis–Makassar)',
    provinceOrIsland: 'Sulawesi Island',
    coordinates: { x: 525, y: 196 },
    signatureCrafts: ['Lappa-lappa', 'Ketupat Bugis'],
    localTerminology: 'Lappa-lappa (wrapped sticky rice), Daun kaluku lolo (young coconut leaf)',
    imageUrl: JANUR_IMAGES.ketupatPlatter,
    imageCaption: 'Rolled coconut-leaf rice tubes and woven diamond pouches.',
    summary:
      'Bugis and Makassar families serve woven diamond ketupat together with long rolled lappa-lappa at feasts.',
    culturalContext:
      'Young coconut leaves are wrapped in spirals around seasoned sticky rice to make lappa-lappa, then steamed and eaten with warm soups like Coto Makassar.',
    verifiedHighlight:
      'Steaming lappa-lappa inside young coconut leaves gives the sticky rice a sweet, fresh palm smell.',
  },
];

export const REFERENCE_SOURCES: ReferenceSource[] = [
  {
    id: 'ref-kemendikbud-wbtb',
    title: 'Warisan Budaya Takbenda Indonesia (Indonesian Cultural Heritage List)',
    institutionOrAuthor: 'Ministry of Education, Culture, Research, and Technology of Indonesia',
    category: 'Government & Heritage',
    description:
      'Official Indonesian database listing living traditions such as Balinese offerings, Javanese wedding crafts, and Katupat Kandangan.',
    url: 'https://warisanbudaya.kemdikbud.go.id/',
  },
  {
    id: 'ref-kbbi',
    title: 'Kamus Besar Bahasa Indonesia (KBBI) — Words: Janur, Ketupat, Lidi, Penjor',
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
      'Art college notes explaining Balinese leaf-cutting shapes (ringgitan), pinning methods (mejejaitan), and meanings.',
    url: 'https://repo.isi-dps.ac.id/',
  },
  {
    id: 'ref-ugm-java',
    title: 'Meanings of Kembar Mayang and Kupatan in Java',
    institutionOrAuthor: 'Universitas Gadjah Mada (UGM) Library',
    category: 'Academic & Botanical',
    description:
      'Cultural studies explaining Javanese wedding bouquets, Kembar Mayang symbols, and Bakda Kupat celebrations.',
    url: 'https://etd.repository.ugm.ac.id/',
  },
  {
    id: 'ref-museum-nasional',
    title: 'Museum Nasional Indonesia — Plant-Fiber & Basket Collections',
    institutionOrAuthor: 'National Museum of Indonesia (Jakarta)',
    category: 'Cultural Archive',
    description:
      'National museum caring for Indonesian woven plant crafts and cultural records.',
    url: 'https://www.museumnasional.or.id/',
  },
  {
    id: 'ref-brin-ethnobotany',
    title: 'Uses of Coconut Trees (Cocos nucifera) in Indonesian Crafts',
    institutionOrAuthor: 'National Research and Innovation Agency (BRIN)',
    category: 'Academic & Botanical',
    description:
      'Plant research showing safe ways to harvest coconut leaves and zero-waste craft habits.',
    url: 'https://www.brin.go.id/',
  },
];
