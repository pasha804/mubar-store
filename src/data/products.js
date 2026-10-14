export const FOUNDER_CONTACT = {
  name: "Muhammad Mubashar",
  phone: "03084453846",
  whatsapp: "923084453846",
  displayPhone: "+92 308 4453846",
  city: "Lahore",
  deliveryTimeline: "2–3 Business Days",
  shippingCharge: "FREE (Rs. 0)"
};

export const PAYMENT_ACCOUNTS = {
  jazzcash: {
    id: 'jazzcash',
    name: 'JazzCash',
    accountTitle: 'Muhammad Mubashir',
    accountNumber: '03084453846',
    badge: '⚡ Instant Mobile Wallet',
    color: '#FF4757',
    bgColor: 'rgba(255, 71, 87, 0.12)',
    borderColor: 'rgba(255, 71, 87, 0.4)',
    instructions: 'JazzCash App ya *786# dial karke "Send Money to JazzCash" select karein aur neeche diye gaye number par transfer karein.'
  },
  sadapay: {
    id: 'sadapay',
    name: 'SadaPay',
    accountTitle: 'Muhammad Mubashar',
    accountNumber: '03084453846',
    iban: 'PK43SADA0000003084453846',
    badge: '🚀 Zero Fee SadaPay',
    color: '#FF6B81',
    bgColor: 'rgba(255, 107, 129, 0.12)',
    borderColor: 'rgba(255, 107, 129, 0.4)',
    instructions: 'SadaPay App ya kisi bhi Bank App (Raast / IBFT) se SadaPay Account / IBAN par direct transfer karein.'
  },
  nayapay: {
    id: 'nayapay',
    name: 'NayaPay',
    accountTitle: 'Muhammad Mubashar',
    accountNumber: '03084453846',
    nayapayId: 'pashaxora@nayapay',
    iban: 'PK79NAYA1234503084453846',
    badge: '🟢 Instant Transfer',
    color: '#2ED573',
    bgColor: 'rgba(46, 213, 115, 0.12)',
    borderColor: 'rgba(46, 213, 115, 0.4)',
    instructions: 'NayaPay ID (pashaxora@nayapay) ya kisi bhi Bank App se IBAN par direct transfer karein.'
  }
};

export const PRODUCTS = [
  {
    id: "apex-wheel-rim",
    title: "Apex 3D Wheel Rim Kinetic Watch",
    subtitle: "Spinning Rotor & Brembo Caliper Edition",
    category: "Supercar Rim",
    priceTier: "viral",
    originalPrice: 3499,
    salePrice: 2499,
    wholesaleCost: 950,
    profitMargin: 1549,
    stockCount: 45,
    soldPercent: 91,
    rating: 4.9,
    reviewCount: 168,
    badge: "🔥 TIKTOK VIRAL #1",
    isFlashSale: true,
    images: [
      "/images/products/mubar-apex-wheel-rim/angle-01.jpeg",
      "/images/products/mubar-apex-wheel-rim/angle-02.jpeg",
      "/images/products/mubar-apex-wheel-rim/angle-03.jpeg",
      "/images/products/mubar-apex-wheel-rim/angle-04.jpeg",
      "/images/products/mubar-apex-wheel-rim/angle-07.jpeg",
      "/images/products/mubar-apex-wheel-rim/angle-08.jpeg"
    ],
    variants: [
      "Red Performance Caliper (Matte Black Rim)",
      "Yellow Sport Caliper (Matte Black Rim)",
      "Lime Green Caliper (Gloss Black Rim)",
      "Blue Turbo Caliper (Deep Black Rim)"
    ],
    description: "The viral automotive timepiece sensation in Pakistan. Engineered with a realistic 3D multi-spoke alloy wheel rim that spins freely on the wrist, drilled ventilated racing brake disc, and a high-visibility performance brake caliper. Solid stainless steel link bracelet with butterfly deployant clasp.",
    specs: {
      movement: "High-Torque Japanese Quartz Kinetic Movement",
      caseDiameter: "43mm Supercar Wheel Profile",
      caseThickness: "12mm Ergonomic Depth",
      band: "PVD Matte Black Solid Stainless Steel Bracelet with Double Butterfly Clasp",
      glass: "Scratch-Resistant Hardlex Crystal Glass",
      waterResistance: "3 ATM Daily Life Splash Resistant",
      features: "3D Hollow Alloy Wheel Rim, Drilled Brake Rotor, Racing Caliper Detail"
    }
  },
  {
    id: "executive-chrono",
    title: "Executive Multi-Dial Chronograph",
    subtitle: "Panoramic Arc Calendar & Solid Steel Oyster Edition",
    category: "Chronographs",
    priceTier: "budget",
    originalPrice: 3499,
    salePrice: 2199,
    wholesaleCost: 850,
    profitMargin: 1349,
    stockCount: 38,
    soldPercent: 86,
    rating: 4.8,
    reviewCount: 142,
    badge: "BEST FOR OFFICE",
    isFlashSale: true,
    images: [
      "/images/products/mubar-executive-chrono/angle-01.jpeg",
      "/images/products/mubar-executive-chrono/angle-02.jpeg",
      "/images/products/mubar-executive-chrono/angle-03.jpeg",
      "/images/products/mubar-executive-chrono/angle-04.jpeg",
      "/images/products/mubar-executive-chrono/angle-05.jpeg",
      "/images/products/mubar-executive-chrono/angle-06.jpeg"
    ],
    variants: [
      "Silver Steel / Jet Black Dial",
      "Royal Gold / Jet Black Dial",
      "Royal Gold / Midnight Royal Blue Dial",
      "Silver Steel / Midnight Royal Blue Dial"
    ],
    description: "The quintessential executive chronometer designed for business meetings, formal wear, and elevated daily style. Features triple auxiliary sub-dials, an open arc date calendar window with red directional indicator, dual ergonomic pushers, and a polished stainless steel oyster bracelet.",
    specs: {
      movement: "Precision Japanese Quartz Chronograph Date Calibre",
      caseDiameter: "42mm Executive Profile",
      caseThickness: "11mm Slim Profile",
      band: "Solid 3-Link Stainless Steel Oyster Bracelet with Folding Clasp",
      glass: "Anti-Scratch Mineral Hardlex Crystal",
      waterResistance: "3 ATM Rain & Splash Proof",
      features: "Triple Multi-Dials (1/10 Sec, Min, Sec), Panoramic Date Calendar"
    }
  },
  {
    id: "heritage-diver",
    title: "Heritage Ceramic Diver Watch",
    subtitle: "Submariner Homage & Rotating Bezel Edition",
    category: "Divers",
    priceTier: "budget",
    originalPrice: 3499,
    salePrice: 2499,
    wholesaleCost: 750,
    profitMargin: 1749,
    stockCount: 42,
    soldPercent: 89,
    rating: 4.9,
    reviewCount: 154,
    badge: "MOST POPULAR",
    isFlashSale: true,
    images: [
      "/images/products/mubar-heritage-diver/angle-01.jpeg",
      "/images/products/mubar-heritage-diver/angle-02.jpeg",
      "/images/products/mubar-heritage-diver/angle-03.jpeg",
      "/images/products/mubar-heritage-diver/angle-04.jpeg",
      "/images/products/mubar-heritage-diver/angle-05.jpeg"
    ],
    variants: [
      "Emerald Green (Hulk Bezel & Dial)",
      "Crimson Red (Burgundy Diver Edition)",
      "Deep Ocean Blue (Sunburst Blue Bezel & Dial)",
      "Onyx Black (Classic Submariner Black)"
    ],
    description: "An iconic homage to legendary maritime diving horology. Showcases a unidirectional rotating fluted countdown bezel, luminescent geometric hour indices with classic Mercedes hands, date magnifying window, and a solid brushed stainless steel oyster bracelet.",
    specs: {
      movement: "High-Accuracy Japanese Quartz Timekeeping",
      caseDiameter: "40mm Classic Diver Profile",
      caseThickness: "12mm",
      band: "Solid Stainless Steel Oyster Bracelet with Folding Safety Clasp",
      glass: "Hardlex Crystal with Beveled Protective Edge",
      waterResistance: "3 ATM / Splash & Rain Resistant",
      features: "Rotating Diver Bezel, Luminous Mercedes Hands & Pip, Sunburst Dial"
    }
  },
  {
    id: "motorsport-racing",
    title: "Grand Prix Motorsport Racing Chronograph",
    subtitle: "Asphalt Cockpit Speedometer Edition",
    category: "Motorsport",
    priceTier: "budget",
    originalPrice: 3499,
    salePrice: 2299,
    wholesaleCost: 900,
    profitMargin: 1399,
    stockCount: 30,
    soldPercent: 83,
    rating: 4.8,
    reviewCount: 119,
    badge: "RACING CHRONO",
    isFlashSale: true,
    images: [
      "/images/products/mubar-motorsport-racing/angle-01.jpeg",
      "/images/products/mubar-motorsport-racing/angle-02.jpeg",
      "/images/products/mubar-motorsport-racing/angle-03.jpeg",
      "/images/products/mubar-motorsport-racing/angle-04.jpeg",
      "/images/products/mubar-motorsport-racing/angle-05.jpeg"
    ],
    variants: [
      "Stealth Silver & Black (Rally Red Gauges)",
      "All-Black PVD Racing Edition",
      "Two-Tone Gold Racing Edition",
      "Silver / Royal Blue Speedometer Edition"
    ],
    description: "Inspired by Formula 1 dashboard instrumentation. Features a textured asphalt multi-layered dial, bold oversized '12' racing numeral, rally speedometer color tracks, dual chronograph pushers, and a rugged stainless steel chassis.",
    specs: {
      movement: "Multi-Gauge Japanese Quartz Racing Movement",
      caseDiameter: "44mm Bold Sports Profile",
      caseThickness: "13mm",
      band: "Solid Link Stainless Steel with Polished & Matte Center Accents",
      glass: "Scratch-Resistant Mineral Hardlex",
      waterResistance: "3 ATM Water Resistant",
      features: "Asphalt Texture Dial, Dual Rally Speedometer Tracks, Bold 12 Marker"
    }
  },
  {
    id: "octa-tachymeter",
    title: "Octa Geometric Tachymeter Chronograph",
    subtitle: "Royal Geometric Bezel & Tapisserie Dial Edition",
    category: "Geometric Sports",
    priceTier: "high-value",
    originalPrice: 3499,
    salePrice: 2399,
    wholesaleCost: 950,
    profitMargin: 1449,
    stockCount: 26,
    soldPercent: 94,
    rating: 4.9,
    reviewCount: 137,
    badge: "ROYAL OAK HOMAGE",
    isFlashSale: true,
    images: [
      "/images/products/mubar-octa-tachymeter/angle-01.jpeg",
      "/images/products/mubar-octa-tachymeter/angle-02.jpeg",
      "/images/products/mubar-octa-tachymeter/angle-03.jpeg",
      "/images/products/mubar-octa-tachymeter/angle-04.jpeg",
      "/images/products/mubar-octa-tachymeter/angle-05.jpeg",
      "/images/products/mubar-octa-tachymeter/angle-06.jpeg"
    ],
    variants: [
      "Silver Steel / Arctic White Guilloche Dial",
      "Silver Steel / Deep Ocean Blue Dial",
      "Stealth Black PVD Edition",
      "Two-Tone Gold & Steel Edition"
    ],
    description: "Bold octagonal architectural geometry inspired by world-famous luxury sports horology. Fitted with a fixed black ceramic-styled tachymeter scale bezel, intricate textured tapisserie dial, curved date indicator, and integrated solid link steel bracelet.",
    specs: {
      movement: "High-Precision Japanese Quartz Date Movement",
      caseDiameter: "43mm Geometric Octagonal Profile",
      caseThickness: "12mm",
      band: "Integrated Solid Stainless Steel Bracelet with Hidden Clasp",
      glass: "Sapphire-Coated Scratch Resistant Crystal",
      waterResistance: "3 ATM Splash Proof",
      features: "Faceted Octagonal Bezel, External Tachymeter Scale, Crown Protectors"
    }
  }
];

export const CATEGORIES = [
  "All Timepieces",
  "Supercar Rim",
  "Chronographs",
  "Divers",
  "Motorsport",
  "Geometric Sports",
  "Under Rs. 2,199 Deals"
];

export const REVIEWS = [
  {
    id: 1,
    name: "Zain Ul Abideen",
    city: "Lahore (DHA Phase 5)",
    rating: 5,
    date: "1 hour ago",
    comment: "Bhai car rim watch mangwayi thi, wheel sach me bilkul smooth ghoomta hai aur red caliper ki finishing level hai! Sab se achi baat rider ne pehle parcel khol ke check karwaya, phir payment li. 100% satisfied!",
    watchBought: "Apex 3D Wheel Rim Kinetic Watch"
  },
  {
    id: 2,
    name: "Bilal Farooq",
    city: "Karachi (Clifton Block 2)",
    rating: 5,
    date: "3 hours ago",
    comment: "Hulk green diver watch receive hui hai. Bezel ka clicking sound aur dial ka sunburst emerald color zabardast hai. Is price me aisi heavy stainless steel ghari milna impossible hai market me.",
    watchBought: "Heritage Ceramic Diver Watch"
  },
  {
    id: 3,
    name: "Hamza Shafiq",
    city: "Islamabad (Sector F-10)",
    rating: 5,
    date: "5 hours ago",
    comment: "Octa tachymeter watch hath me pehn kar pura Royal Oak ka look deti hai! Weight bohat solid hai, cheap feel bilkul nahi ati. Delivery sirf 2 din me ho gayi.",
    watchBought: "Octa Geometric Tachymeter Chronograph"
  },
  {
    id: 4,
    name: "Usman Ghani",
    city: "Faisalabad (D Ground)",
    rating: 5,
    date: "Yesterday",
    comment: "Executive chrono gold-black liya office wear ke liye. Dial ke multi sub-dials aur date calendar real lagtay hain. Dost sab poch rahe hain kahan se li. Bhai Muhammad Mubashar ka service bohat quick hai!",
    watchBought: "Executive Multi-Dial Chronograph"
  },
  {
    id: 5,
    name: "Taimoor Ali Khan",
    city: "Multan Cantt",
    rating: 5,
    date: "Yesterday",
    comment: "Motorsport racing chronograph mangwaya tha. Dial ka texture aur red speedometer needles bohot eye-catching hain. WhatsApp par confirmation bohot jaldi hui thi.",
    watchBought: "Grand Prix Motorsport Racing Chronograph"
  },
  {
    id: 6,
    name: "Daniyal Ahmed",
    city: "Rawalpindi (Bahria Town Phase 7)",
    rating: 5,
    date: "Yesterday",
    comment: "Pehle dar lag raha tha online fraud na ho, lekin jab rider ne bola 'sir pehle box khol k check karein' to dil khush ho gaya! Ghari 100% same nikli jesi video me thi.",
    watchBought: "Apex 3D Wheel Rim Kinetic Watch"
  },
  {
    id: 7,
    name: "Shahzaib Raza",
    city: "Peshawar (Hayatabad)",
    rating: 5,
    date: "2 days ago",
    comment: "Submariner black edition li hai. Mercedes hands aur date cyclops bilkul clear hain. 1999 me aisi luxury ghari Pakistan me koi aur nahi de sakta.",
    watchBought: "Heritage Ceramic Diver Watch"
  },
  {
    id: 8,
    name: "Muhammad Huzaifa",
    city: "Sialkot (Cantt)",
    rating: 5,
    date: "2 days ago",
    comment: "Apex rim watch ka yellow caliper wala variant liya tha. Bike chalaate waqt jab dhoop parti hai to rim shine karta hai. Solid build quality hai, strap bi easily adjust ho gaya.",
    watchBought: "Apex 3D Wheel Rim Kinetic Watch"
  },
  {
    id: 9,
    name: "Farhan Siddiqui",
    city: "Gujranwala (Model Town)",
    rating: 5,
    date: "3 days ago",
    comment: "Executive chronograph silver blue dial me order ki thi. Formal suits ke sath kamaal lagti hai. Packaging bohat safe thi bubble wrap k sath. Full paisa wasool!",
    watchBought: "Executive Multi-Dial Chronograph"
  },
  {
    id: 10,
    name: "Malik Waqas",
    city: "Quetta (Jinnah Road)",
    rating: 5,
    date: "3 days ago",
    comment: "Quetta tak 3 din me parcel pohanch gaya Trax courier se. Ghari bilkul mint condition me thi. Seller bohot cooperative hai WhatsApp par.",
    watchBought: "Octa Geometric Tachymeter Chronograph"
  },
  {
    id: 11,
    name: "Kashif Mehmood",
    city: "Abbottabad",
    rating: 5,
    date: "4 days ago",
    comment: "Bhai ne gift ki thi mujhe Grand Prix chronograph. Looking wise 8 se 10 hazar ki lagti hai. Open parcel policy ki waja se zero tension rahi.",
    watchBought: "Grand Prix Motorsport Racing Chronograph"
  },
  {
    id: 12,
    name: "Naveed Akhtar",
    city: "Hyderabad (Latifabad)",
    rating: 5,
    date: "4 days ago",
    comment: "Diver green edition is outstanding! Strap ka clasp bohat tight aur secure hai. Rs. 1,999 me aisi ghari market me 3500 ki milti hai. Mashallah zabardast kaam hai Mubashar bhai ka.",
    watchBought: "Heritage Ceramic Diver Watch"
  }
];

export const LIVE_SALES_NOTIFICATIONS = [
  { name: "Muhammad Huzaifa", city: "Lahore (Gulberg)", item: "Apex 3D Wheel Rim Watch", time: "2 minutes ago" },
  { name: "Shahzaib Khan", city: "Karachi (DHA)", item: "Heritage Ceramic Diver Watch", time: "6 minutes ago" },
  { name: "Ahmed Raza", city: "Islamabad (G-11)", item: "Octa Geometric Tachymeter", time: "12 minutes ago" },
  { name: "Farhan Malik", city: "Rawalpindi (Bahria Town)", item: "Executive Multi-Dial Chronograph", time: "17 minutes ago" },
  { name: "Taimoor Ali", city: "Multan Cantt", item: "Grand Prix Motorsport Racing", time: "25 minutes ago" }
];
