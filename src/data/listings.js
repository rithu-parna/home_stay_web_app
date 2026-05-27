// src/data/listings.js

export const listingsData = [
  {
    id: "lst_1",
    title: "The Obsidian A-Frame Cabin",
    location: "Chamonix, France",
    price: 280,
    rating: 4.95,
    reviewsCount: 142,
    category: "Cabin",
    images: [
      "/images/cabin.png",
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
    ],
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
    title: "Aegean Horizon Infinity Villa",
    location: "Santorini, Greece",
    price: 490,
    rating: 4.98,
    reviewsCount: 88,
    category: "Villa",
    images: [
      "/images/villa.png",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
    ],
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
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
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
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80"
    ],
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
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80"
    ],
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
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80"
    ],
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
  }
];
