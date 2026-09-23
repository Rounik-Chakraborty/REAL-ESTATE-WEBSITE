export interface NeighborhoodInfo {
  id: string;
  name: string;
  tagline: string;
  avgPricePerSqFt: string;
  propertyCount: number;
  image: string;
  coordinates: { lat: number; lng: number };
  description: string;
  highlights: string[];
}

export const NEIGHBORHOODS: NeighborhoodInfo[] = [
  {
    id: "new-town",
    name: "New Town",
    tagline: "Planned Smart Mega-City & Green IT Corridor",
    avgPricePerSqFt: "₹6,800 - ₹12,500 / sq.ft",
    propertyCount: 48,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 22.5868, lng: 88.4754 },
    description:
      "A future-ready smart city with 480-acre Eco Park, wide multi-lane arterial avenues, top global tech campuses, and world-class healthcare centers.",
    highlights: ["Eco Park & Biswa Bangla Gate", "Silicon Valley IT Hub", "Tata Medical Center", "Upcoming Metro Corridor"],
  },
  {
    id: "alipore",
    name: "Alipore",
    tagline: "Kolkata's Heritage Royal & Diplomatic Enclave",
    avgPricePerSqFt: "₹14,000 - ₹24,000 / sq.ft",
    propertyCount: 22,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 22.5322, lng: 88.3312 },
    description:
      "The undisputed gold standard of luxury living in Eastern India. Serene tree-lined avenues, historic botanical gardens, and elite family estates.",
    highlights: ["Horticultural Gardens", "Taj Bengal & Alipore Club", "High-Security VIP Zone", "Proximity to South Kolkata"],
  },
  {
    id: "salt-lake",
    name: "Salt Lake (Bidhannagar)",
    tagline: "Sector V Tech Capital & Cosmopolitan Township",
    avgPricePerSqFt: "₹8,500 - ₹15,000 / sq.ft",
    propertyCount: 36,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 22.5735, lng: 88.4331 },
    description:
      "The financial and IT nerve center of Eastern India with active metro connectivity, Central Park greens, and vibrant commercial hubs.",
    highlights: ["Sector V Tech Parks", "Operational Metro Connectivity", "City Centre 1 Mall", "Central Park Wetlands"],
  },
  {
    id: "ballygunge",
    name: "Ballygunge",
    tagline: "South Kolkata's Aristocratic Cultural Heart",
    avgPricePerSqFt: "₹12,500 - ₹22,000 / sq.ft",
    propertyCount: 29,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 22.5186, lng: 88.3582 },
    description:
      "Prestigious residential haven home to generational families, Southern Avenue lake gardens, premier rowing clubs, and luxury boutiques.",
    highlights: ["Rabindra Sarobar Lake", "Quest Luxury Mall", "Heritage Clubs (CCFC & Lake Club)", "Top Private Schools"],
  },
  {
    id: "rajarhat",
    name: "Rajarhat",
    tagline: "Villas, Eco Resorts & Airport Proximity",
    avgPricePerSqFt: "₹5,500 - ₹9,800 / sq.ft",
    propertyCount: 41,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    coordinates: { lat: 22.6121, lng: 88.4892 },
    description:
      "A sprawling suburban green enclave famous for spacious gated villa estates, luxury spa resorts, and 10-minute access to the international airport.",
    highlights: ["Vedic Village Resorts", "10 Mins to Airport", "Gated Villa Communities", "City Centre II Mall"],
  },
];
