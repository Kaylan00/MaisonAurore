import { differenceInCalendarDays, parseISO } from 'date-fns';

// ============================================================
// Maison Aurore — Comprehensive Hotel Data
// ============================================================

// ---------------------------------------------------------------------------
// 1. Hotel Information
// ---------------------------------------------------------------------------

export const hotelInfo = {
  name: 'Maison Aurore',
  tagline: 'Where the Riviera Meets the Sky',
  description:
    'Nestled along the sun-kissed shores of the French Riviera, Maison Aurore is a sanctuary of refined elegance and timeless luxury. Every detail has been curated to celebrate the art of living well — from our Michelin-inspired cuisine to our world-class spa and the breathtaking panoramas of the Mediterranean that greet you at every turn.',
  address: {
    street: '71 Boulevard de la Croisette',
    city: 'Cannes',
    region: "Provence-Alpes-Cote d'Azur",
    postalCode: '06400',
    country: 'France',
  },
  phone: '+33 4 93 06 40 06',
  email: 'reservations@maisonaurore.com',
  website: 'https://www.maisonaurore.com',
  stars: 5,
  checkIn: '15:00',
  checkOut: '12:00',
  social: {
    instagram: 'https://instagram.com/maisonaurore',
    facebook: 'https://facebook.com/maisonaurore',
    twitter: 'https://twitter.com/maisonaurore',
    pinterest: 'https://pinterest.com/maisonaurore',
    tripadvisor: 'https://tripadvisor.com/maisonaurore',
  },
};

// ---------------------------------------------------------------------------
// 2. Hero Slides
// ---------------------------------------------------------------------------

export const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
    alt: 'Maison Aurore exterior at sunset',
    title: 'Welcome to Maison Aurore',
    subtitle: 'A sanctuary of timeless elegance on the French Riviera',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80',
    alt: 'Infinity pool overlooking the Mediterranean',
    title: 'Suites & Villas',
    subtitle: 'Exquisitely appointed retreats with panoramic Mediterranean views',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1920&q=80',
    alt: 'Luxurious suite with ocean view',
    title: 'Exceptional Dining',
    subtitle: 'Two Michelin stars celebrating the finest Provencal terroir',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1920&q=80',
    alt: 'Evening ambiance at the terrace restaurant',
    title: 'Spa Serenite',
    subtitle: '1,200 square metres of holistic well-being above the Mediterranean',
  },
];

// ---------------------------------------------------------------------------
// 3. Rooms & Suites
// ---------------------------------------------------------------------------

export const rooms = [
  {
    id: 1,
    slug: 'chambre-lumiere',
    name: 'Chambre Lumiere',
    category: 'Room',
    shortDescription:
      'A light-filled sanctuary overlooking the sculpted hotel gardens with floor-to-ceiling windows.',
    description:
      'Bathed in natural light from floor-to-ceiling windows, Chambre Lumiere offers a serene retreat with views of the hotel\'s sculpted gardens. Soft linens, a freestanding marble bathtub, and bespoke furnishings create a haven of understated luxury where every moment feels effortless. The interplay of warm oak, hand-selected artwork, and Provencal ceramics brings the spirit of the Cote d\'Azur indoors.',
    price: 650,
    size: 42,
    maxGuests: 2,
    bedType: 'King Bed',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
    ],
    amenities: [
      'Garden View',
      'Freestanding Marble Bathtub',
      'Nespresso Machine',
      'Egyptian Cotton Linens',
      'Smart TV',
      'Complimentary Minibar',
      'In-Room Safe',
      'Rainfall Shower',
    ],
    featured: false,
  },
  {
    id: 2,
    slug: 'chambre-azur',
    name: 'Chambre Azur',
    category: 'Room',
    shortDescription:
      'Mediterranean-inspired room with panoramic sea views from a private juliet balcony.',
    description:
      'Inspired by the endless blues of the Mediterranean, Chambre Azur offers panoramic sea views from a private juliet balcony. The interplay of cerulean silks, driftwood accents, and Provencal ceramics evokes the timeless spirit of the Cote d\'Azur. A generous marble en-suite with both a freestanding bathtub and a walk-in rain shower completes this refined coastal retreat.',
    price: 850,
    size: 48,
    maxGuests: 2,
    bedType: 'King Bed',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=1200&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&q=80',
    ],
    amenities: [
      'Sea View',
      'Juliet Balcony',
      'Freestanding Bathtub',
      'Nespresso Machine',
      'Egyptian Cotton Linens',
      'Smart TV',
      'Complimentary Minibar',
      'Rainfall Shower',
      'Bluetooth Speaker',
    ],
    featured: true,
  },
  {
    id: 3,
    slug: 'suite-provence',
    name: 'Suite Provence',
    category: 'Suite',
    shortDescription:
      'Spacious suite with hand-painted Provencal tiles and a private lavender-scented terrace.',
    description:
      'A generous living space adorned with hand-painted Provencal tiles and sun-washed fabrics opens onto a private terrace fragrant with lavender and jasmine. Suite Provence blends the warmth of southern France with the refinement expected of a world-class hotel. The en-suite spa bathroom features a deep soaking tub, a separate walk-in rain shower, and dual vanities in Carrara marble.',
    price: 1400,
    size: 72,
    maxGuests: 3,
    bedType: 'King Bed',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
      'https://images.unsplash.com/photo-1587985064135-0571b93b16a7?w=1200&q=80',
    ],
    amenities: [
      'Private Terrace',
      'Separate Living Area',
      'Sea & Garden View',
      'Soaking Tub & Walk-in Shower',
      'Nespresso Machine',
      'Egyptian Cotton Linens',
      'Smart TV',
      'Complimentary Minibar',
      'Bose Sound System',
      'Walk-in Closet',
    ],
    featured: true,
  },
  {
    id: 4,
    slug: 'suite-belle-epoque',
    name: 'Suite Belle Epoque',
    category: 'Suite',
    shortDescription:
      'Gilded elegance with a wraparound balcony and sweeping Riviera coastline views.',
    description:
      'A tribute to the golden age of the Riviera, Suite Belle Epoque envelops guests in gilded mirrors, velvet upholstery, and museum-quality art. The wraparound balcony frames an uninterrupted sweep of coastline from Cap d\'Antibes to the Esterel mountains. A separate living and dining area, personal butler service, and a marble bathroom with double vanity ensure an experience of absolute refinement.',
    price: 2200,
    size: 95,
    maxGuests: 3,
    bedType: 'King Bed',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=1200&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=1200&q=80',
    ],
    amenities: [
      'Wraparound Balcony',
      'Panoramic Sea View',
      'Separate Living & Dining Area',
      'Marble Bathroom with Double Vanity',
      'Soaking Tub & Walk-in Rain Shower',
      'Nespresso Machine',
      'Egyptian Cotton Linens',
      '65-inch Smart TV',
      'Premium Minibar',
      'Bose Sound System',
      'Butler Service',
      'Walk-in Closet',
    ],
    featured: true,
  },
  {
    id: 5,
    slug: 'villa-mediterranee',
    name: 'Villa Mediterranee',
    category: 'Villa',
    shortDescription:
      'A private walled villa with plunge pool, two bedrooms, and an outdoor dining terrace.',
    description:
      'Set within its own walled garden, Villa Mediterranee is a private estate within the estate. Two bedrooms, a sun-drenched living pavilion, a heated plunge pool, and an outdoor dining terrace create a world apart — yet every amenity of Maison Aurore is only steps away. Mature olive trees, fragrant jasmine, and the sound of cascading water complete this Provencal haven.',
    price: 3800,
    size: 160,
    maxGuests: 4,
    bedType: '2 King Beds',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1200&q=80',
    ],
    amenities: [
      'Private Walled Garden',
      'Heated Plunge Pool',
      'Two Bedrooms',
      'Outdoor Dining Terrace',
      'Full Kitchen & Pantry',
      'Separate Living Pavilion',
      'Two Marble Bathrooms',
      'Soaking Tubs & Rain Showers',
      'Nespresso Machine',
      'Egyptian Cotton Linens',
      '75-inch Smart TV',
      'Premium Minibar',
      'Bang & Olufsen Sound System',
      'Dedicated Butler',
      'Private Parking',
    ],
    featured: true,
  },
  {
    id: 6,
    slug: 'villa-aurore-prestige',
    name: 'Villa Aurore Prestige',
    category: 'Villa',
    shortDescription:
      'Rooftop penthouse villa with infinity pool, private cinema, and 360-degree views.',
    description:
      'The crown jewel of Maison Aurore, Villa Aurore Prestige occupies the entire rooftop with an infinity pool that appears to dissolve into the Mediterranean horizon. Three sumptuous bedrooms, a private cinema, a chef\'s kitchen, and 360-degree panoramic views compose an experience without equal on the Riviera. A dedicated butler and concierge attend to every desire, from arranging a private chef to chartering a yacht at sunrise.',
    price: 7500,
    size: 280,
    maxGuests: 6,
    bedType: '3 King Beds',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80',
      'https://images.unsplash.com/photo-1615571022219-eb45cf7faa36?w=1200&q=80',
    ],
    amenities: [
      'Private Rooftop Infinity Pool',
      '360-Degree Panoramic Views',
      'Three Bedrooms',
      'Private Cinema Room',
      "Chef's Kitchen",
      'Grand Living & Dining Salon',
      'Spa Treatment Room',
      'Three Marble En-Suite Bathrooms',
      'Soaking Tubs & Rain Showers',
      'Nespresso & Espresso Bar',
      'Egyptian Cotton Linens',
      '85-inch Smart TV in Each Room',
      'Premium Curated Minibar',
      'Bang & Olufsen Sound System',
      'Dedicated Butler & Concierge',
      'Private Elevator Access',
      'Complimentary Airport Transfer',
    ],
    featured: false,
  },
];

// ---------------------------------------------------------------------------
// 4. Dining
// ---------------------------------------------------------------------------

export const dining = {
  hero: {
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80',
    title: 'Culinary Excellence',
    breadcrumb: ['Home', 'Dining'],
  },
  intro:
    'At Maison Aurore, dining transcends the ordinary. Our culinary philosophy celebrates the finest seasonal ingredients, artfully composed by world-renowned chefs who weave together tradition and innovation. Each restaurant offers a distinct journey of flavors, ambiance, and impeccable service.',
  restaurants: [
    {
      id: 'le-jardin-dore',
      name: 'Le Jardin Dore',
      slug: 'le-jardin-dore',
      cuisine: 'Modern French',
      shortDescription:
        'Two-Michelin-star modern French cuisine celebrating Provencal terroir.',
      description:
        'Our flagship restaurant draws on the bountiful produce of Provence and the pristine catch of Mediterranean fishermen. Chef Isabelle Marchand weaves classical technique with contemporary artistry, earning Le Jardin Dore two Michelin stars and a reputation as one of the finest tables on the coast.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
      hours: 'Dinner: 7:00 PM \u2013 10:30 PM \u00B7 Tue\u2013Sat',
      dressCode: 'Smart Elegant',
      priceRange: '$$$$',
      featured: true,
    },
    {
      id: 'terrasse-de-la-mer',
      name: 'Terrasse de la Mer',
      slug: 'terrasse-de-la-mer',
      cuisine: 'Mediterranean Seafood',
      shortDescription:
        'Open-air seafood terrace perched above the Mediterranean shoreline.',
      description:
        'Perched above the shoreline with tables that seem to float over the waves, Terrasse de la Mer celebrates the sea in every dish. From raw-bar platters of oysters and sea urchin to whole grilled loup de mer, every ingredient is sourced from local fishermen and paired with crisp Provencal roses.',
      image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=1200&q=80',
      hours: 'Lunch & Dinner: 12:30 PM \u2013 10:00 PM \u00B7 Daily',
      dressCode: 'Resort Casual',
      priceRange: '$$$',
      featured: true,
    },
    {
      id: 'salon-du-the-aurore',
      name: 'Salon du The Aurore',
      slug: 'salon-du-the-aurore',
      cuisine: 'Patisserie & Afternoon Tea',
      shortDescription:
        'Elegant afternoon tea salon with artisanal patisseries and rare teas.',
      description:
        'A sun-dappled salon where time moves to the gentle rhythm of clinking porcelain and the aroma of freshly baked viennoiseries. Head patissier Lucien Beaumont presents an exquisite afternoon tea alongside artisanal pastries, rare single-origin teas, and house-made confections.',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=1200&q=80',
      hours: 'Afternoon Tea: 2:30 PM \u2013 5:30 PM \u00B7 Daily',
      dressCode: 'Smart Casual',
      priceRange: '$$',
      featured: false,
    },
  ],
  privateDining: {
    title: 'Private Dining',
    description:
      'Host an unforgettable occasion in one of our exclusive private dining spaces. From intimate celebrations to grand soirees, our events team will curate every detail \u2014 from a bespoke menu by our chefs to floral arrangements, live music, and personalized service.',
    image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80',
  },
};

// ---------------------------------------------------------------------------
// 5. Spa
// ---------------------------------------------------------------------------

export const spa = {
  hero: {
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80',
    title: 'Spa & Wellness',
    breadcrumb: ['Home', 'Spa'],
  },
  name: 'Spa Serenite',
  tagline: 'A Journey Within',
  description:
    'Spa Serenite is a temple of well-being inspired by centuries of Mediterranean healing traditions. Spanning 1,200 square metres across two floors, the spa features a hammam, vitality pool, ice fountain, sauna, and eight treatment suites — including two couples\' suites with private terraces overlooking the sea.',
  intro:
    'Surrender to a world of tranquility at Spa Serenite. Inspired by ancient healing rituals and modern science, our 1,200 m\u00B2 sanctuary is designed to restore balance between body, mind, and spirit. Every treatment is a bespoke journey, tailored to your individual needs by therapists who blend centuries-old techniques with cutting-edge science.',
  introImage: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&q=80',
  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
  images: [
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=1200&q=80',
    'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1200&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80',
  ],
  facilities: [
    { name: 'Hammam', icon: '\u2668', description: 'Traditional steam bath with black-soap rituals' },
    { name: 'Finnish Sauna', icon: '\u2600', description: 'Dry heat sauna with cold plunge pool' },
    { name: 'Vitality Pool', icon: '\u223C', description: 'Heated hydrotherapy pool with massage jets' },
    { name: 'Ice Fountain', icon: '\u2744', description: 'Invigorating cold therapy for circulation' },
    { name: 'Yoga Pavilion', icon: '\u2727', description: 'Open-air classes at sunrise and sunset' },
    { name: 'Fitness Studio', icon: '\u2606', description: 'Technogym equipment with personal trainers' },
  ],
  treatmentCategories: ['All', 'Massage', 'Facial', 'Body', 'Ritual'],
  treatments: [
    {
      id: 'rituel-cote-azur',
      name: "Rituel Cote d'Azur",
      category: 'Body',
      duration: '90 min',
      price: 280,
      description:
        'A signature full-body journey combining a sea-salt exfoliation with warm Mediterranean oils, a deep-tissue massage, and a hydrating body wrap infused with local lavender and immortelle.',
    },
    {
      id: 'soin-visage-eclat',
      name: 'Soin Visage Eclat',
      category: 'Facial',
      duration: '60 min',
      price: 220,
      description:
        'A revitalising facial using bio-active marine extracts and vitamin C serums to restore luminosity, smooth fine lines, and deeply hydrate sun-kissed skin.',
    },
    {
      id: 'massage-profond',
      name: 'Massage Profond Detente',
      category: 'Massage',
      duration: '60 min',
      price: 190,
      description:
        'A therapeutic deep-tissue massage targeting areas of tension with slow, deliberate strokes and aromatic essential oils chosen to match your mood.',
    },
    {
      id: 'hammam-gommage',
      name: 'Hammam & Gommage Traditionnel',
      category: 'Body',
      duration: '75 min',
      price: 210,
      description:
        'An authentic hammam ritual featuring steam, black soap cleansing, kessa mitt exfoliation, and a nourishing argan oil massage — a time-honoured purification ceremony.',
    },
    {
      id: 'reflexologie',
      name: 'Reflexologie des Pieds',
      category: 'Massage',
      duration: '45 min',
      price: 140,
      description:
        'Precise pressure-point therapy on the feet to release blocked energy, improve circulation, and promote a profound sense of balance throughout the body.',
    },
    {
      id: 'duo-eternel',
      name: 'Duo Eternel — Couples Ritual',
      category: 'Ritual',
      duration: '120 min',
      price: 520,
      description:
        'A shared escape in our seaside couples\' suite — champagne, a synchronised full-body massage, a rose-petal bath, and a private terrace for two overlooking the Mediterranean.',
    },
  ],
  quote: {
    text: 'Wellness is not a destination, but a way of being.',
    author: 'Maison Aurore Spa Philosophy',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1920&q=80',
  },
};

// ---------------------------------------------------------------------------
// 6. Experiences
// ---------------------------------------------------------------------------

export const experiences = {
  hero: {
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80',
    title: 'Experiences',
    breadcrumb: ['Home', 'Experiences'],
  },
  intro:
    'Beyond the walls of Maison Aurore lies a world of extraordinary moments. Our curated experiences invite you to discover the culture, nature, and artistry of this remarkable region — each one designed to create memories that endure long after your stay.',
  categories: ['All', 'Adventure', 'Culture', 'Wellness'],
  items: [
    {
      id: 'sunrise-yacht',
      slug: 'sunrise-yacht-cruise',
      title: 'Sunrise Yacht Cruise',
      category: 'Adventure',
      description:
        'Board a classic wooden sailing yacht at dawn and glide past the Lerins Islands as the first light paints the Mediterranean in shades of rose and gold. A sommelier guides you through a tasting of Provencal wines while the captain shares tales of the coast\'s storied past.',
      shortDescription:
        'Sail the Lerins Islands at dawn with a Provencal wine tasting aboard a classic yacht.',
      image: 'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200&q=80',
      duration: '3 hours',
      price: 480,
      featured: true,
    },
    {
      id: 'cooking-class',
      slug: 'provencal-market-cooking-class',
      title: 'Provencal Market & Cooking Class',
      category: 'Culture',
      description:
        'Join our chef for a morning stroll through the Marche Forville in Cannes, selecting the freshest seasonal produce, artisanal cheeses, and fragrant herbs. Return to Maison Aurore\'s private kitchen to transform your market finds into an authentic three-course Provencal lunch.',
      shortDescription:
        'Shop the local market with our chef and cook a three-course Provencal meal.',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&q=80',
      duration: '4 hours',
      price: 320,
      featured: false,
    },
    {
      id: 'perfumery-grasse',
      slug: 'perfumery-workshop-grasse',
      title: 'Private Perfumery Workshop in Grasse',
      category: 'Culture',
      description:
        'Travel to Grasse, the perfume capital of the world, for an exclusive session with a master perfumer. Learn the art of blending top, heart, and base notes before composing your own bespoke fragrance to take home — a truly personal souvenir of the Riviera.',
      shortDescription:
        'Create your own bespoke fragrance with a master perfumer in Grasse.',
      image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1200&q=80',
      duration: '5 hours',
      price: 550,
      featured: false,
    },
    {
      id: 'wellness-retreat',
      slug: 'mediterranean-wellness-retreat',
      title: 'Mediterranean Wellness Retreat',
      category: 'Wellness',
      description:
        'A full day devoted to renewal — begin with sunrise yoga on the clifftop terrace, followed by a guided meditation, a bespoke spa treatment at Spa Serenite, a nutrient-rich lunch prepared by our wellness chef, and an afternoon of sound healing by the pool.',
      shortDescription:
        'A full-day programme of yoga, meditation, spa treatments, and sound healing.',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80',
      duration: 'Full day',
      price: 680,
      featured: false,
    },
    {
      id: 'esterel-hike',
      slug: 'esterel-coastal-hike-picnic',
      title: 'Esterel Coastal Hike & Picnic',
      category: 'Adventure',
      description:
        'Explore the dramatic red-rock landscape of the Esterel massif with a private guide. Wind along cliff-edge trails above turquoise coves before arriving at a secluded beach where a gourmet picnic — complete with chilled champagne — awaits beneath a canopy of parasol pines.',
      shortDescription:
        'Guided red-rock cliff hike ending with a gourmet champagne picnic on a secluded beach.',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
      duration: '5 hours',
      price: 390,
      featured: false,
    },
  ],
};

// ---------------------------------------------------------------------------
// 7. Testimonials
// ---------------------------------------------------------------------------

export const testimonials = [
  {
    id: 1,
    quote:
      'From the moment we arrived, Maison Aurore felt like stepping into a dream. The Villa Mediterranee was beyond anything we imagined — our own private paradise with the most attentive staff we have ever encountered. We are already planning our return.',
    name: 'Caroline Whitfield',
    location: 'London, United Kingdom',
    rating: 5,
    date: '2025-09-14',
  },
  {
    id: 2,
    quote:
      "Le Jardin Dore alone is worth the journey. Chef Marchand's tasting menu was a revelation — each course more exquisite than the last. Paired with the impeccable wine selection and the terrace view of the moonlit sea, it was the finest dining experience of my life.",
    name: 'Andreas Keller',
    location: 'Zurich, Switzerland',
    rating: 5,
    date: '2025-11-02',
  },
  {
    id: 3,
    quote:
      "Spa Serenite redefined relaxation for me. The Rituel Cote d'Azur treatment left me feeling completely renewed. The hammam, the vitality pool, the herbal tea lounge — every space was designed for absolute serenity. A true jewel on the Riviera.",
    name: 'Isabelle Moreau',
    location: 'Paris, France',
    rating: 5,
    date: '2026-01-20',
  },
  {
    id: 4,
    quote:
      'We celebrated our anniversary at Maison Aurore and it surpassed every expectation. The sunrise yacht cruise, the cooking class, the couples\' spa ritual — each experience was curated with such care. The staff remembered every preference without us ever having to ask twice.',
    name: 'David & Sofia Lindgren',
    location: 'Stockholm, Sweden',
    rating: 5,
    date: '2026-03-08',
  },
];

// ---------------------------------------------------------------------------
// 8. Gallery
// ---------------------------------------------------------------------------

export const gallery = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&q=80',
    alt: 'Maison Aurore hotel facade at golden hour',
    category: 'Hotel',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80',
    alt: 'Grand lobby with marble floors and chandelier',
    category: 'Hotel',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
    alt: 'Chambre Lumiere with garden views',
    category: 'Rooms',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
    alt: 'Suite Provence living area with Provencal tiles',
    category: 'Rooms',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    alt: 'Villa Aurore Prestige rooftop infinity pool',
    category: 'Rooms',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    alt: 'Le Jardin Dore plated dish with edible flowers',
    category: 'Dining',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=600&q=80',
    alt: 'Terrasse de la Mer open-air dining at sunset',
    category: 'Dining',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    alt: 'Spa Serenite treatment room with ocean view',
    category: 'Spa',
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=600&q=80',
    alt: 'Relaxation lounge at Spa Serenite',
    category: 'Spa',
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?w=600&q=80',
    alt: 'Infinity pool overlooking the Mediterranean',
    category: 'Pool',
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80',
    alt: 'Hotel pool terrace with sun loungers at dusk',
    category: 'Pool',
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
    alt: 'Aerial view of Maison Aurore and the coastline',
    category: 'Hotel',
  },
];

// ---------------------------------------------------------------------------
// 9. Availability Helpers
// ---------------------------------------------------------------------------

// Deterministic pseudo-random based on a string seed so results are
// consistent for the same inputs within a session.
function seededAvailable(roomId, dateStr) {
  let hash = 0;
  const seed = `${roomId}-${dateStr}`;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  // ~85 % of dates are available
  return Math.abs(hash) % 100 < 85;
}

/**
 * Check availability and compute total price for a given room and date range.
 *
 * @param {number|string} roomId   - Room id (e.g. 3 or "room-03")
 * @param {string}        checkIn  - ISO date string "YYYY-MM-DD"
 * @param {string}        checkOut - ISO date string "YYYY-MM-DD"
 * @returns {{ available: boolean, totalPrice: number, nights: number, roomId: *, checkIn: string, checkOut: string }}
 */
export function getAvailability(roomId, checkIn, checkOut) {
  if (!checkIn || !checkOut) {
    return { available: true, totalPrice: 0, nights: 0, roomId, checkIn, checkOut };
  }

  const start = parseISO(checkIn);
  const end = parseISO(checkOut);
  const nights = differenceInCalendarDays(end, start);

  if (nights <= 0) {
    return { available: false, totalPrice: 0, nights: 0, roomId, checkIn, checkOut };
  }

  const room = rooms.find((r) => r.id === roomId);
  if (!room) {
    return { available: false, totalPrice: 0, nights, roomId, checkIn, checkOut };
  }

  // Check every night in the range
  let available = true;
  for (let d = 0; d < nights; d++) {
    const date = new Date(start);
    date.setDate(date.getDate() + d);
    const dateStr = date.toISOString().slice(0, 10);
    if (!seededAvailable(roomId, dateStr)) {
      available = false;
      break;
    }
  }

  // Apply a seasonal multiplier (Jun-Sep high season +30 %, Dec-Jan +15 %)
  const month = start.getMonth(); // 0-indexed
  let seasonMultiplier = 1;
  if (month >= 5 && month <= 8) {
    seasonMultiplier = 1.3;
  } else if (month === 11 || month === 0) {
    seasonMultiplier = 1.15;
  }

  const totalPrice = Math.round(room.price * nights * seasonMultiplier);

  return { available, totalPrice, nights, roomId, checkIn, checkOut };
}

/**
 * Return all rooms that are available for the given date range and guest count.
 *
 * @param {string} checkIn  - ISO date string "YYYY-MM-DD"
 * @param {string} checkOut - ISO date string "YYYY-MM-DD"
 * @param {number} [guests=1] - Number of guests
 * @returns {Array<Object>} Rooms matching the criteria
 */
export function getAvailableRooms(checkIn, checkOut, guests = 1) {
  if (!checkIn || !checkOut) return rooms;

  return rooms.filter((room) => {
    const maxGuests = room.maxGuests || Math.max(2, Math.floor(room.size / 20));
    if (guests > maxGuests) return false;

    const result = getAvailability(room.id, checkIn, checkOut);
    return result.available;
  });
}
