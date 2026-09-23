import { AiParsedQuery } from "@/types";

export function parseNaturalLanguageQuery(query: string): AiParsedQuery {
  const normalized = query.toLowerCase().trim();
  const result: AiParsedQuery = {
    originalQuery: query,
    purpose: null,
    location: null,
    propertyType: null,
    bedrooms: null,
    maxPrice: null,
    minPrice: null,
    amenities: [],
    parking: null,
    confidenceScore: 0.85,
  };

  if (!normalized) {
    return result;
  }

  // 1. Purpose (Rent vs Buy)
  if (
    normalized.includes("rent") ||
    normalized.includes("lease") ||
    normalized.includes("for rent") ||
    normalized.includes("/mo") ||
    normalized.includes("per month")
  ) {
    result.purpose = "rent";
  } else if (
    normalized.includes("buy") ||
    normalized.includes("sale") ||
    normalized.includes("for sale") ||
    normalized.includes("purchase") ||
    normalized.includes("cr") ||
    normalized.includes("crore") ||
    normalized.includes("lakh")
  ) {
    result.purpose = "buy";
  }

  // 2. Location
  const locations = [
    { name: "New Town", triggers: ["new town", "newtown", "action area"] },
    { name: "Alipore", triggers: ["alipore", "belvedere"] },
    { name: "Salt Lake", triggers: ["salt lake", "saltlake", "sector v", "sector 5", "bidhannagar"] },
    { name: "Ballygunge", triggers: ["ballygunge", "southern avenue", "lake club"] },
    { name: "Rajarhat", triggers: ["rajarhat", "chinar park", "vedic village"] },
    { name: "Howrah", triggers: ["howrah", "riverfront", "foreshore"] },
    { name: "Park Street", triggers: ["park street", "camac street", "central kolkata"] },
    { name: "EM Bypass", triggers: ["em bypass", "bypass", "science city", "ruby"] },
  ];

  for (const loc of locations) {
    if (loc.triggers.some((t) => normalized.includes(t))) {
      result.location = loc.name;
      break;
    }
  }

  // 3. Property Type
  if (normalized.includes("penthouse")) {
    result.propertyType = "Penthouse";
  } else if (normalized.includes("villa") || normalized.includes("bungalow")) {
    result.propertyType = "Luxury Villa";
  } else if (normalized.includes("duplex")) {
    result.propertyType = "Duplex";
  } else if (normalized.includes("studio")) {
    result.propertyType = "Studio";
  } else if (
    normalized.includes("apartment") ||
    normalized.includes("flat") ||
    normalized.includes("condo")
  ) {
    result.propertyType = "Apartment";
  }

  // 4. Bedrooms (e.g. 3 BHK, 4 bed, 2 bedrooms, 1bhk)
  const bhkMatch = normalized.match(/(\d+)\s*(bhk|bed|bedroom|beds|bedrooms)/i);
  if (bhkMatch && bhkMatch[1]) {
    result.bedrooms = parseInt(bhkMatch[1], 10);
  }

  // 5. Price parsing (Crore / Lakh / Thousands)
  // Check Crore (e.g. under 1.5 crore, under 1 cr, under ₹2 crore)
  const crMatch = normalized.match(
    /(?:under|below|less than|within|max|budget of|upto|up to)?\s*(?:₹|rs\.?)?\s*(\d+(?:\.\d+)?)\s*(?:cr|crore|crores)/i
  );
  if (crMatch && crMatch[1]) {
    result.maxPrice = parseFloat(crMatch[1]) * 10000000;
  }

  // Check Lakh (e.g. under 80 lakh, under 60L, under 50 lakhs)
  const lakhMatch = normalized.match(
    /(?:under|below|less than|within|max|budget of|upto|up to)?\s*(?:₹|rs\.?)?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|l|lac|lacs)/i
  );
  if (lakhMatch && lakhMatch[1] && !result.maxPrice) {
    result.maxPrice = parseFloat(lakhMatch[1]) * 100000;
  }

  // Check Thousand / k rent (e.g. under 40k, under 50k rent, under 30000)
  const rentKMatch = normalized.match(
    /(?:under|below|less than|upto|up to)?\s*(?:₹|rs\.?)?\s*(\d+)\s*(?:k|thousand)/i
  );
  if (rentKMatch && rentKMatch[1] && !result.maxPrice) {
    result.maxPrice = parseFloat(rentKMatch[1]) * 1000;
    if (!result.purpose) result.purpose = "rent";
  }

  // 6. Amenities & Features
  if (normalized.includes("parking") || normalized.includes("garage")) {
    result.parking = true;
    result.amenities.push("Covered Parking");
  }
  if (normalized.includes("pool") || normalized.includes("swimming")) {
    result.amenities.push("Swimming Pool");
  }
  if (normalized.includes("gym") || normalized.includes("fitness")) {
    result.amenities.push("Gym");
  }
  if (normalized.includes("garden") || normalized.includes("lawn")) {
    result.amenities.push("Landscaped Garden");
  }
  if (normalized.includes("security") || normalized.includes("gated")) {
    result.amenities.push("24/7 Security");
  }
  if (normalized.includes("clubhouse") || normalized.includes("club")) {
    result.amenities.push("Clubhouse");
  }
  if (normalized.includes("power backup") || normalized.includes("generator")) {
    result.amenities.push("100% Power Backup");
  }
  if (normalized.includes("ev") || normalized.includes("charging")) {
    result.amenities.push("EV Charging");
  }

  return result;
}

export const SAMPLE_AI_PROMPTS = [
  "3 BHK apartment under ₹1.5 crore in New Town with parking",
  "Luxury duplex in Alipore with garden and 4 bedrooms",
  "Salt Lake Sector V penthouse under ₹3 crore with swimming pool",
  "2 BHK under ₹70 lakh near Biswa Bangla Gate",
  "Pet-friendly luxury villa in Rajarhat with private pool",
  "Furnished 3 BHK apartment for rent under ₹60k in New Town",
];
