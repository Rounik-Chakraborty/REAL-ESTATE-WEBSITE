export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
  propertyAcquired: string;
  location: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Somnath Mukherjee",
    role: "Senior Consultant Surgeon",
    company: "Apollo Multispeciality Hospitals",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    content:
      "Nestora redefined the property acquisition experience for our family. The verified documentation, 3D floor analysis, and discreet advisory from Priya made acquiring our Alipore duplex seamless.",
    propertyAcquired: "The Belvedere Manor (4 BHK Duplex)",
    location: "Alipore, Kolkata",
  },
  {
    id: "test-2",
    name: "Aparna & Rajesh Sen",
    role: "Managing Director & Tech Founders",
    company: "Synapse Global Technologies",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    content:
      "Finding a penthouse with genuine lake views and 3-tier privacy in New Town seemed impossible until we used Nestora's AI search. We closed our dream home in under 3 weeks.",
    propertyAcquired: "The Aurelia Residence",
    location: "New Town Action Area II",
  },
  {
    id: "test-3",
    name: "Devendra Khemka",
    role: "Private Equity Investor",
    company: "Khemka Capital Partners",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    content:
      "The precision of data, EMI calculator accuracy, and transparency on Nestora surpasses international portals like Knight Frank and Sotheby's. Truly elite engineering.",
    propertyAcquired: "Skyline Solitaire Penthouse",
    location: "Salt Lake Sector V",
  },
];
