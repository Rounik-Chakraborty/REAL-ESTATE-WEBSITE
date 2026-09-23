export type Purpose = "buy" | "rent";

export type PropertyType =
  | "Apartment"
  | "Penthouse"
  | "Luxury Villa"
  | "Duplex"
  | "Studio"
  | "Gated Estate";

export type FurnishingStatus = "Fully Furnished" | "Semi Furnished" | "Unfurnished";

export type FacingDirection =
  | "North"
  | "North-East"
  | "East"
  | "South-East"
  | "South"
  | "West"
  | "North-West";

export type PropertyAge =
  | "Under Construction"
  | "New (0-1 yr)"
  | "1-3 Years"
  | "3-5 Years"
  | "5+ Years";

export interface NearbyPlace {
  name: string;
  type: "Metro" | "Hospital" | "School" | "Restaurant" | "Shopping" | "Airport" | "Tech Park";
  distance: string;
}

export interface Agent {
  id: string;
  name: string;
  title: string;
  company: string;
  photo: string;
  phone: string;
  email: string;
  whatsapp: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  activeListings: number;
  responseTime: string;
  verified: boolean;
  specialization: string[];
  bio: string;
}

export interface PropertyDescription {
  overview: string;
  features: string[];
  neighborhood: string;
  society: string;
}

export interface PropertyLocation {
  city: string;
  neighborhood: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  pincode: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  price: number; // in INR
  priceFormatted: string;
  pricePerSqFt: number;
  purpose: Purpose;
  propertyType: PropertyType;
  location: PropertyLocation;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  carpetArea: number; // sq ft
  superArea: number; // sq ft
  floor: number;
  totalFloors: number;
  parking: number;
  furnishing: FurnishingStatus;
  facing: FacingDirection;
  propertyAge: PropertyAge;
  possessionDate: string;
  verified: boolean;
  featured: boolean;
  reraId: string;
  images: string[];
  description: PropertyDescription;
  amenities: string[];
  nearbyPlaces: NearbyPlace[];
  agent: Agent;
  status: "active" | "pending" | "under_offer" | "sold";
  viewsCount: number;
  savesCount: number;
  createdAt: string;
}

export type UserRole = "buyer" | "agent" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone: string;
  company?: string;
}

export interface Visit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyLocation: string;
  propertyPrice: string;
  date: string;
  timeSlot: string;
  visitType: "in_person" | "video_tour";
  userName: string;
  phone: string;
  email: string;
  notes?: string;
  status: "confirmed" | "completed" | "cancelled";
  ticketId: string;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyPrice: string;
  propertyLocation: string;
  userName: string;
  email: string;
  phone: string;
  preferredTime: string;
  message: string;
  status: "pending" | "replied" | "closed";
  agentReply?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "visit" | "enquiry" | "property" | "system";
  time: string;
  read: boolean;
  link?: string;
}

export interface PropertyFilterState {
  searchQuery: string;
  purpose: "all" | "buy" | "rent";
  location: string;
  propertyTypes: string[];
  priceRange: [number, number];
  bedrooms: number[];
  bathrooms: number[];
  furnishing: string[];
  propertyAge: string[];
  amenities: string[];
  verifiedOnly: boolean;
  sortBy: "recommended" | "price_asc" | "price_desc" | "newest" | "most_viewed" | "area_desc";
}

export interface AiParsedQuery {
  originalQuery: string;
  purpose: "buy" | "rent" | null;
  location: string | null;
  propertyType: string | null;
  bedrooms: number | null;
  maxPrice: number | null;
  minPrice: number | null;
  amenities: string[];
  parking: boolean | null;
  confidenceScore: number;
}
