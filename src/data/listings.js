// src/data/listings.js

const rawListingsData = [
  {
    id: "lst_1",
    isTrending: true,
    title: "The Obsidian A-Frame Cabin",
    location: "Chamonix, France",
    price: 280,
    rating: 4.95,
    reviewsCount: 142,
    category: "Cabin",
    images: [
      "/images/cabin.png",
      "/images/cabin/cabin_1.jpg",
      "/images/cabin/cabin_2.jpg"
    ],
    video: "/videos/livingspace.mp4",
    description: "Nestled deep in the pine forests of Chamonix, The Obsidian is an architectural marvel. This A-frame cabin combines dark minimalist exterior lines with an incredibly warm, light-wood interior. Enjoy floor-to-ceiling glass windows offering panoramic views of Mont Blanc, a wood-fired outdoor hot tub, and a private stone fireplace that warms the entire open loft layout. It's the ultimate alpine retreat for design lovers and winter adventurers.",
    amenities: ["Wood-fired Hot Tub", "Indoor Fireplace", "Mont Blanc Views", "High-speed WiFi", "Ski-in / Ski-out", "Espresso Bar", "Outdoor Deck", "Floor Heating"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: {
      name: "Jean-Pierre",
      avatar: "JP",
      role: "Architect & Alpine Guide",
      joined: "Joined June 2021",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_1_1", name: "Elena R.", date: "January 2026", rating: 5, comment: "An absolute dream. Watching the snow fall through the massive glass front while sitting by the fireplace is a memory I will cherish forever. Extremely clean and beautifully designed." },
      { id: "rev_1_2", name: "David M.", date: "March 2026", rating: 5, comment: "Every single detail in this cabin has been curated. From the high-end kitchen appliances to the heated bathroom floors. Jean-Pierre was an outstanding host." }
    ],
    lat: 45.9227,
    lng: 6.8685
  },
  {
    id: "lst_2",
    isTrending: true,
    title: "Aegean Horizon Infinity Villa",
    location: "Santorini, Greece",
    price: 490,
    rating: 4.98,
    reviewsCount: 88,
    category: "Villa",
    images: [
      "/images/villa.png",
      "/images/villa/villa_1.jpg",
      "/images/villa/villa_2.jpg"
    ],
    video: "/videos/glide-over-coastal-beach.mp4",
    description: "Perched majestically on the volcanic cliffs of Oia, Aegean Horizon Villa redefined luxury cave-living. Carved partially into the rockface, the villa offers a seamless indoor-outdoor layout, leading directly to a private heated infinity pool that blends into the endless blue of the Aegean. The interior features curved white concrete walls, raw wood highlights, and minimalist custom Mediterranean furnishings.",
    amenities: ["Infinity Pool", "Sunset Caldera Views", "Heated Jacuzzi", "Private Chef Kitchen", "Complimentary Yacht Tour Access", "Wine Cellar", "Airport Transfer", "Daily Housekeeping"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3.5,
    host: {
      name: "Calliope",
      avatar: "CL",
      role: "Boutique Hotelier",
      joined: "Joined September 2020",
      badge: "Elite Host",
      responseRate: "98% Response Rate"
    },
    reviews: [
      { id: "rev_2_1", name: "Sophia K.", date: "April 2026", rating: 5, comment: "I have no words. The view of the sunset from the pool is better than any postcard. Calliope arranged a private sailing trip that was the highlight of our vacation." },
      { id: "rev_2_2", name: "Marcus L.", date: "May 2026", rating: 5, comment: "Stunning architecture. Very private and away from the crowded tourist paths of Oia, yet close enough to walk in for dinner." }
    ],
    lat: 36.4618,
    lng: 25.3753
  },
  {
    id: "lst_3",
    title: "Brooklyn Heritage Foundry Loft",
    location: "Brooklyn, New York",
    price: 310,
    rating: 4.88,
    reviewsCount: 204,
    category: "Loft",
    images: [
      "/images/loft.png",
      "/images/loft/loft_1.jpg",
      "/images/loft/loft_2.jpg"
    ],
    video: "/videos/kitchen.mp4",
    description: "A breathtaking conversion of a 19th-century metal foundry. This massive 2,200 sq ft loft boasts 18-foot exposed timber ceilings, restored red brick walls, and giant arched windows overlooking the East River and Manhattan skyline. Furnished with rare mid-century modern collector items, a vinyl record player with an extensive collection, and a jungle of hanging tropical plants, this space is an urban sanctuary.",
    amenities: ["Manhattan Skyline View", "Vinyl Record Station", "Custom Chef's Island", "Dedicated Workspace", "Smart Projector Room", "Hanging Garden Lounge", "Washer/Dryer", "Keyless Smart Entry"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1.5,
    host: {
      name: "Julian & Sarah",
      avatar: "JS",
      role: "Art Curator & Furniture Designer",
      joined: "Joined February 2019",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_3_1", name: "Liam T.", date: "December 2025", rating: 5, comment: "Absolutely inspiring space. The light in the afternoon is gorgeous. The record collection has some of the best jazz and ambient albums. Will book again." },
      { id: "rev_3_2", name: "Emily H.", date: "February 2026", rating: 4.8, comment: "Very stylish loft in a perfect location. Julian gave us amazing restaurant recommendations. The bedroom loft is cozy but watch your head!" }
    ],
    lat: 40.7128,
    lng: -73.9632
  },
  {
    id: "lst_4",
    title: "Ubud Bamboo Forest Dome",
    location: "Bali, Indonesia",
    price: 220,
    rating: 4.91,
    reviewsCount: 312,
    category: "Dome",
    images: [
      "/images/dome.png",
      "/images/dome/dome_1.jpg",
      "/images/dome/dome_2.jpg"
    ],
    video: "/videos/livingspace.mp4",
    description: "Suspended above a rushing river valley in the tropical heart of Ubud, the Bamboo Forest Dome is a masterpiece of sustainable organic architecture. Fully constructed out of black and blond local bamboo, this eco-dome has no glass windows, allowing the cool jungle breeze and the soothing sounds of the river to fill the room. It features a private swimming pool, netting hammock overlooking the canopy, and an outdoor rain shower.",
    amenities: ["Private Jungle Pool", "Valley Hanging Hammock", "Outdoor Rain Shower", "Daily Organic Breakfast", "Private Yoga Instructor", "Natural Air Conditioning", "Eco-friendly Toiletries", "Airport Pickup"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      name: "Wayan",
      avatar: "WY",
      role: "Master Bamboo Builder",
      joined: "Joined March 2018",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_4_1", name: "Aria G.", date: "March 2026", rating: 5, comment: "The most unique place I have ever stayed in. Sleeping to the sound of the river and waking up to the morning mist was magical. Wayan's hospitality is unmatched." },
      { id: "rev_4_2", name: "Felix S.", date: "May 2026", rating: 5, comment: "An unbelievable architectural achievement. The dome feels so luxury yet completely integrated with nature. Make sure to order the Balinese feast cooked by Wayan's family!" }
    ],
    lat: -8.5069,
    lng: 115.2625
  },
  {
    id: "lst_5",
    title: "Tuscan Stone Heritage Estate",
    location: "Tuscany, Italy",
    price: 380,
    rating: 4.93,
    reviewsCount: 64,
    category: "Heritage",
    images: [
      "/images/heritage/heritage_1.jpg",
      "/images/heritage.png",
      "/images/heritage/heritage_3.jpg"
    ],
    video: "/videos/house_tour.mp4",
    description: "An authentic 16th-century Tuscan farmhouse painstakingly restored by local artisans. Situated amidst rolling hills, vineyards, and olive groves, the estate features hand-carved stone walls, exposed chestnut ceiling beams, and terracotta floors. The property offers an outdoor pizza oven, a solar-heated stone pool, and a private wine cellar stocked with local Chianti Classico.",
    amenities: ["Solar-heated Stone Pool", "Pizza Oven & BBQ", "Wine Cellar", "Olive Grove Gardens", "Cooking Masterclasses", "Fireplace", "Al Fresco Dining", "Bikes Provided"],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 4,
    host: {
      name: "Giovanni & Francesca",
      avatar: "GF",
      role: "Vintners & Chefs",
      joined: "Joined July 2017",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_5_1", name: "Clara D.", date: "September 2025", rating: 5, comment: "We hosted a family reunion here and it was perfect. Giovanni hosted a pizza-making night on the terrace that was absolutely unforgettable. Magnificent views!" },
      { id: "rev_5_2", name: "Tom B.", date: "October 2025", rating: 4.9, comment: "Beautiful estate. The restoration is stunning. Very comfortable beds and a fully-equipped kitchen perfect for cooking local ingredients." }
    ],
    lat: 43.7711,
    lng: 11.2486
  },
  {
    id: "lst_6",
    title: "Arctic Glass Aurora Cabin",
    location: "Tromsø, Norway",
    price: 450,
    rating: 4.97,
    reviewsCount: 95,
    category: "Cabin",
    images: [
      "/images/cabin/cabin_3.jpg",
      "/images/cabin/cabin_4.jpg",
      "/images/cabin/cabin_5.jpg"
    ],
    video: "/videos/bathroom.mp4",
    description: "Positioned directly under the auroral oval, this cutting-edge cabin features a custom double-glazed glass roof that stretches over the master bedroom. Sleep under the northern lights or watch the midnight sun from the comfort of a luxury king bed. The cabin is heated using state-of-the-art geothermal pumps and boasts an Scandinavian redwood sauna overlooking the Norwegian fjords.",
    amenities: ["Glass Roof Bedroom", "Redwood Fjord Sauna", "Northern Lights Views", "Geothermal Heating", "Outdoor Firepit", "Snowshoe Gear Provided", "High-speed WiFi", "Heated Bathroom Floors"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      name: "Astrid",
      avatar: "AS",
      role: "Aurora Photographer & Explorer",
      joined: "Joined November 2022",
      badge: "Elite Host",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_6_1", name: "Nils W.", date: "December 2025", rating: 5, comment: "We saw the Northern Lights dancing across the sky on our very first night from our bed! Astrid gave us amazing tips for photographing the lights. Simply stunning." },
      { id: "rev_6_2", name: "Chloe F.", date: "January 2026", rating: 5, comment: "The sauna overlooking the freezing fjord was spectacular. A perfect combination of raw Arctic nature and modern, cozy comfort." }
    ],
    lat: 69.6492,
    lng: 18.9553
  },
  {
    id: "lst_7",
    isTrending: true,
    title: "Mirage Glass Palm Villa",
    location: "Seminyak, Bali",
    price: 420,
    rating: 4.96,
    reviewsCount: 154,
    category: "Villa",
    images: [
      "/images/villa/villa_2.jpg",
      "/images/villa/villa_1.jpg"
    ],
    video: "/videos/glide-over-coastal-beach.mp4",
    description: "A gorgeous sanctuary in Bali. Built entirely of concrete, glass, and teak wood, Mirage Villa features an open living plan looking directly onto a private lap pool flanked by tropical palms. The master bedroom is encased in floor-to-ceiling glass.",
    amenities: ["Private Lap Pool", "Tropical Gardens", "Daily Housekeeping", "In-villa Breakfast", "High-speed WiFi"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: {
      name: "Ketut",
      avatar: "KT",
      role: "Villa Specialist",
      joined: "Joined January 2021",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_7_1", name: "Sarah J.", date: "February 2026", rating: 5, comment: "Absolutely breathtaking! The pool is amazing and the location is so peaceful." }
    ],
    lat: -8.7262,
    lng: 115.1776
  },
  {
    id: "lst_8",
    title: "SoHo Industrial Artist Loft",
    location: "New York, USA",
    price: 295,
    rating: 4.89,
    reviewsCount: 112,
    category: "Loft",
    images: [
      "/images/loft/loft_2.jpg",
      "/images/loft/loft_1.jpg"
    ],
    video: "/videos/kitchen.mp4",
    description: "Located in the heart of SoHo, this converted artist loft features classic cast-iron columns, massive factory windows, and a curated gallery of local contemporary art.",
    amenities: ["City Views", "Dedicated Workspace", "Art Gallery", "Espresso Machine", "Smart TV"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      name: "Marcus",
      avatar: "MC",
      role: "Gallerist",
      joined: "Joined September 2019",
      badge: "Superhost",
      responseRate: "99% Response Rate"
    },
    reviews: [
      { id: "rev_8_1", name: "David K.", date: "March 2026", rating: 4.9, comment: "Stylish place in the best neighborhood. So convenient and beautifully decorated." }
    ],
    lat: 40.7233,
    lng: -74.003
  },
  {
    id: "lst_9",
    isTrending: true,
    title: "Patagonia Eco-Glass Dome",
    location: "Torres del Paine, Chile",
    price: 340,
    rating: 4.97,
    reviewsCount: 78,
    category: "Dome",
    images: [
      "/images/dome/dome_2.jpg",
      "/images/dome/dome_1.jpg"
    ],
    video: "/videos/livingspace.mp4",
    description: "An eco-friendly geodesic dome in the wilderness of Patagonia. Wake up to views of the snow-capped mountain peaks through the transparent dome panel.",
    amenities: ["Mountain Peak Views", "Wood Stove", "Outdoor Hot Tub", "Guided Hikes Included", "Eco-friendly Heating"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      name: "Mateo",
      avatar: "MT",
      role: "Patagonian Guide",
      joined: "Joined October 2022",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_9_1", name: "Anna L.", date: "January 2026", rating: 5, comment: "Unbelievable views of the stars. The stove kept us so warm even during cold nights." }
    ],
    lat: -51.258,
    lng: -72.348
  },
  {
    id: "lst_10",
    title: "Kyoto Machiya Traditional Estate",
    location: "Kyoto, Japan",
    price: 360,
    rating: 4.94,
    reviewsCount: 82,
    category: "Heritage",
    images: [
      "/images/heritage/heritage_1.jpg",
      "/images/heritage/heritage_3.jpg"
    ],
    video: "/videos/house_tour.mp4",
    description: "A beautifully restored 120-year-old traditional townhouse (Machiya) located in the historic Gion district of Kyoto. Features tatami mat flooring, paper shoji screens, and a tranquil inner zen garden.",
    amenities: ["Private Zen Garden", "Traditional Tea Room", "Wooden Soak Tub", "Yukata Provided", "Kyoto Station Pickup"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1.5,
    host: {
      name: "Hiroshi",
      avatar: "HR",
      role: "Traditional Artisan",
      joined: "Joined August 2018",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_10_1", name: "Ken T.", date: "April 2026", rating: 5, comment: "It felt like stepping back in time with all the modern comforts. The garden is so beautiful." }
    ],
    lat: 35.0037,
    lng: 135.7782
  },
  {
    id: "lst_11",
    title: "Lakeside Redwood A-Frame",
    location: "Lake Tahoe, California",
    price: 275,
    rating: 4.92,
    reviewsCount: 96,
    category: "Cabin",
    images: [
      "/images/cabin/cabin_2.jpg",
      "/images/cabin/cabin_1.jpg"
    ],
    video: "/videos/livingspace.mp4",
    description: "Tucked away in the redwood forest bordering Lake Tahoe, this A-Frame cabin has been fully updated with designer mid-century modern furnishings, a custom fire pit, and direct private beach access.",
    amenities: ["Lake Tahoe Access", "Outdoor Fire Pit", "Redwood Forest Views", "BBQ Grill", "Kayaks Included"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    host: {
      name: "Brian",
      avatar: "BR",
      role: "Designer & Builder",
      joined: "Joined May 2020",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_11_1", name: "Clara S.", date: "May 2026", rating: 5, comment: "The cabin is so cute and clean. We loved taking the kayaks out on the lake." }
    ],
    lat: 39.0968,
    lng: -120.0324
  },
  {
    id: "lst_12",
    isTrending: true,
    title: "Atacama Desert Stargazing Dome",
    location: "San Pedro, Chile",
    price: 310,
    rating: 4.99,
    reviewsCount: 120,
    category: "Dome",
    images: [
      "/images/dome.png",
      "/images/dome/dome_1.jpg",
      "/images/dome/dome_2.jpg"
    ],
    video: "/videos/livingspace.mp4",
    description: "Located in the driest desert in the world, this dome features a fully transparent ceiling dome for stargazing at the Milky Way. Comes with a high-end telescope.",
    amenities: ["Milky Way Stargazing", "Professional Telescope", "Desert Sunsets", "Outdoor Hammock", "Solar Powered"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      name: "Camila",
      avatar: "CM",
      role: "Astronomer & Host",
      joined: "Joined July 2022",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_12_1", name: "Jean P.", date: "March 2026", rating: 5, comment: "The stargazing here was one of the most incredible things I've ever experienced." }
    ],
    lat: -22.9087,
    lng: -68.1997
  },
  {
    id: "lst_13",
    title: "Cascades Timber A-Frame",
    location: "Oregon, USA",
    price: 240,
    rating: 4.90,
    reviewsCount: 65,
    category: "Cabin",
    images: [
      "/images/cabin.png",
      "/images/cabin/cabin_1.jpg"
    ],
    video: "/videos/livingspace.mp4",
    description: "A cozy modern A-Frame cabin tucked in the towering pines of the Cascade Range. Features a private wood fire hot tub and skylights above the loft.",
    amenities: ["Skylights", "Wood Hot Tub", "Indoor Stove", "WiFi", "Fire Pit"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    host: {
      name: "Daniel",
      avatar: "DN",
      role: "Outdoorsman",
      joined: "Joined June 2021",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_13_1", name: "Tyler B.", date: "April 2026", rating: 5, comment: "Pure magic. The wood stove kept the loft so cozy all night long." }
    ],
    lat: 44.0582,
    lng: -121.3153
  },
  {
    id: "lst_14",
    title: "Amalfi Cliffside Sun Villa",
    location: "Positano, Italy",
    price: 470,
    rating: 4.96,
    reviewsCount: 94,
    category: "Villa",
    images: [
      "/images/villa.png",
      "/images/villa/villa_1.jpg"
    ],
    video: "/videos/glide-over-coastal-beach.mp4",
    description: "An exceptional luxury villa perched high above the cliffs of Positano. Features a private sun deck, heated plunge pool, and sweeping Mediterranean views.",
    amenities: ["Plunge Pool", "Sun Deck", "Sea Views", "Chef Kitchen", "Airport Pickup"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
    host: {
      name: "Francesca",
      avatar: "FC",
      role: "Hotelier",
      joined: "Joined March 2019",
      badge: "Superhost",
      responseRate: "98% Response Rate"
    },
    reviews: [
      { id: "rev_14_1", name: "Clara M.", date: "May 2026", rating: 5, comment: "Absolute luxury. The views from the deck are beyond anything you can imagine." }
    ],
    lat: 40.6281,
    lng: 14.4850
  },
  {
    id: "lst_15",
    title: "Berlin Industrial Art Loft",
    location: "Berlin, Germany",
    price: 210,
    rating: 4.85,
    reviewsCount: 140,
    category: "Loft",
    images: [
      "/images/loft.png",
      "/images/loft/loft_1.jpg"
    ],
    video: "/videos/kitchen.mp4",
    description: "A spacious industrial loft located in Berlin's creative district. Filled with custom neon installations, vintage synthesizers, and modern artwork.",
    amenities: ["Vintage Synthesizers", "Neon Art", "Projector Screen", "High-speed WiFi", "Bikes Included"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1.5,
    host: {
      name: "Lukas",
      avatar: "LK",
      role: "Music Producer",
      joined: "Joined October 2020",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_15_1", name: "Jonas S.", date: "January 2026", rating: 5, comment: "Amazing vibes. Loved playing with the synths and the location is perfect." }
    ],
    lat: 52.5200,
    lng: 13.4050
  },
  {
    id: "lst_16",
    title: "Icelandic Geothermal Eco-Dome",
    location: "Reykjavik, Iceland",
    price: 320,
    rating: 4.93,
    reviewsCount: 52,
    category: "Dome",
    images: [
      "/images/dome.png",
      "/images/dome/dome_1.jpg"
    ],
    video: "/videos/livingspace.mp4",
    description: "An eco-friendly dome utilizing natural geothermal heating. Located in a scenic lava field offering perfect Northern Lights stargazing views.",
    amenities: ["Geothermal Heating", "Northern Lights Views", "Outdoor Hot Tub", "Eco-Design", "Organic Breakfast"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      name: "Birgir",
      avatar: "BG",
      role: "Eco-Architect",
      joined: "Joined September 2022",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_16_1", name: "Sigurd H.", date: "March 2026", rating: 5, comment: "Sitting in the hot tub under the stars was incredible. Highly recommended." }
    ],
    lat: 64.1466,
    lng: -21.9426
  },
  {
    id: "lst_17",
    title: "Andalusia Restored Finca",
    location: "Seville, Spain",
    price: 290,
    rating: 4.91,
    reviewsCount: 76,
    category: "Heritage",
    images: [
      "/images/heritage/heritage_1.jpg",
      "/images/heritage.png"
    ],
    video: "/videos/house_tour.mp4",
    description: "A traditional Andalusian country home lovingly restored with terracotta tiling, whitewashed stone walls, and an arched central courtyard.",
    amenities: ["Central Courtyard", "Private Pool", "Orange Orchard", "Outdoor Kitchen", "Wine Cabinet"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    host: {
      name: "Alvaro",
      avatar: "AV",
      role: "Vintner",
      joined: "Joined July 2018",
      badge: "Superhost",
      responseRate: "99% Response Rate"
    },
    reviews: [
      { id: "rev_17_1", name: "Marta R.", date: "April 2026", rating: 5, comment: "Beautiful finca. Waking up to the smell of orange trees was spectacular." }
    ],
    lat: 37.3891,
    lng: -5.9845
  },
  {
    id: "lst_18",
    title: "Swiss Alps Panoramic Lodge",
    location: "Zermatt, Switzerland",
    price: 410,
    rating: 4.97,
    reviewsCount: 88,
    category: "Cabin",
    images: [
      "/images/cabin.png",
      "/images/cabin/cabin_2.jpg"
    ],
    video: "/videos/livingspace.mp4",
    description: "A premium alpine cabin in Zermatt offering direct views of the iconic Matterhorn peak. Includes a Scandinavian redwood sauna.",
    amenities: ["Matterhorn Views", "Redwood Sauna", "Ski-in / Ski-out", "Geothermal Heating", "Complimentary Glühwein"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    host: {
      name: "Beat",
      avatar: "BT",
      role: "Ski Instructor",
      joined: "Joined November 2021",
      badge: "Elite Host",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_18_1", name: "Lars K.", date: "December 2025", rating: 5, comment: "The Matterhorn views from the living room are unbelievable. The sauna is world-class." }
    ],
    lat: 46.0207,
    lng: 7.7491
  },
  {
    id: "lst_19",
    title: "Santorini White Cave Villa",
    location: "Imerovigli, Greece",
    price: 450,
    rating: 4.95,
    reviewsCount: 67,
    category: "Villa",
    images: [
      "/images/villa.png",
      "/images/villa/villa_2.jpg"
    ],
    video: "/videos/glide-over-coastal-beach.mp4",
    description: "A pristine whitewashed cave villa with a heated outdoor plunge pool overlooking the volcanic caldera of Santorini.",
    amenities: ["Heated Plunge Pool", "Caldera Views", "Traditional Architecture", "Housekeeping", "Champagne Welcome"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      name: "Eleni",
      avatar: "EL",
      role: "Concierge",
      joined: "Joined April 2020",
      badge: "Superhost",
      responseRate: "100% Response Rate"
    },
    reviews: [
      { id: "rev_19_1", name: "Dimitris P.", date: "May 2026", rating: 5, comment: "Breathtaking sunset views and perfect privacy. Eleni is an amazing host!" }
    ],
    lat: 36.4325,
    lng: 25.4229
  },
  {
    id: "lst_20",
    title: "Shoreditch Warehouse Loft",
    location: "London, UK",
    price: 260,
    rating: 4.87,
    reviewsCount: 125,
    category: "Loft",
    images: [
      "/images/loft.png",
      "/images/loft/loft_1.jpg"
    ],
    video: "/videos/kitchen.mp4",
    description: "A beautifully restored Victorian-era warehouse loft in East London, featuring exposed brick walls, steel frame windows, and vintage industrial antiques.",
    amenities: ["Exposed Brick", "Vintage Industrial Antiques", "Record Player", "Workspace", "Nespresso Station"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    host: {
      name: "Harry",
      avatar: "HR",
      role: "Designer",
      joined: "Joined February 2020",
      badge: "Superhost",
      responseRate: "99% Response Rate"
    },
    reviews: [
      { id: "rev_20_1", name: "Sophie G.", date: "March 2026", rating: 5, comment: "Stunning industrial design and super comfortable space. Right in the middle of Shoreditch." }
    ],
    lat: 51.5262,
    lng: -0.0789
  }
];

const extraCategoryImages = {
  Cabin: [
    "/images/cabin/cabin_5.jpg",
    "/images/cabin/cabin_6.jpg",
    "/images/cabin/cabin_7.jpg"
  ],
  Villa: [
    "/images/villa/villa_1.jpg",
    "/images/villa/villa_2.jpg",
    "/images/villa/villa_3.jpg"
  ],
  Loft: [
    "/images/loft/loft_1.jpg",
    "/images/loft/loft_2.jpg",
    "/images/loft/loft_3.jpg"
  ],
  Dome: [
    "/images/dome/dome_1.jpg",
    "/images/dome/dome_2.jpg",
    "/images/dome.png"
  ],
  Heritage: [
    "/images/heritage/heritage_1.jpg",
    "/images/heritage/heritage_3.jpg",
    "/images/heritage/heritage_4.jpg"
  ]
};

// Map through raw listings and enrich them with categories' stock photos
export const listingsData = rawListingsData.map((l, index) => {
  const baseImages = l.images || [];
  const categoryExtras = extraCategoryImages[l.category] || [];
  const uniqueImages = Array.from(new Set([...baseImages, ...categoryExtras]));
  return {
    ...l,
    images: uniqueImages.slice(0, 4)
  };
});
