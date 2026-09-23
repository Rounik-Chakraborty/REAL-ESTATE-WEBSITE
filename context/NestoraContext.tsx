"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Property,
  User,
  UserRole,
  Visit,
  Enquiry,
  NotificationItem,
  PropertyFilterState,
} from "@/types";
import { MOCK_PROPERTIES } from "@/data/properties";
import { MOCK_AGENTS } from "@/data/agents";

export const DEMO_USERS: Record<UserRole, User> = {
  buyer: {
    id: "user-buyer-1",
    name: "Alex Reynolds",
    email: "alex.reynolds@luxuryestates.com",
    role: "buyer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    phone: "+91 98302 11928",
  },
  agent: {
    id: "agent-1",
    name: "Priya Sharma",
    email: "priya.sharma@nestoraprime.com",
    role: "agent",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    phone: "+91 98301 84920",
    company: "Nestora Prime Signature",
  },
  admin: {
    id: "user-admin-1",
    name: "CINIX Operations Director",
    email: "admin@nestora.luxury",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    phone: "+91 98300 00001",
    company: "CINIX Enterprise Platform",
  },
};

const INITIAL_VISITS: Visit[] = [
  {
    id: "vis-101",
    propertyId: "prop-1",
    propertyTitle: "The Aurelia Residence",
    propertyImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
    propertyLocation: "New Town, Kolkata",
    propertyPrice: "₹1.25 Cr",
    date: "2026-09-28",
    timeSlot: "11:00 AM - 12:00 PM",
    visitType: "in_person",
    userName: "Alex Reynolds",
    phone: "+91 98302 11928",
    email: "alex.reynolds@luxuryestates.com",
    notes: "Interested in lake-facing balcony units on higher floors.",
    status: "confirmed",
    ticketId: "NST-VIS-8921",
    createdAt: "2026-09-20T14:30:00Z",
  },
  {
    id: "vis-102",
    propertyId: "prop-2",
    propertyTitle: "The Belvedere Manor",
    propertyImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80",
    propertyLocation: "Alipore, Kolkata",
    propertyPrice: "₹4.85 Cr",
    date: "2026-10-02",
    timeSlot: "04:00 PM - 05:00 PM",
    visitType: "video_tour",
    userName: "Alex Reynolds",
    phone: "+91 98302 11928",
    email: "alex.reynolds@luxuryestates.com",
    notes: "Requesting live walkthrough of the private teakwood duplex staircase.",
    status: "confirmed",
    ticketId: "NST-VIS-9430",
    createdAt: "2026-09-21T10:15:00Z",
  },
];

const INITIAL_ENQUIRIES: Enquiry[] = [
  {
    id: "enq-201",
    propertyId: "prop-3",
    propertyTitle: "Skyline Solitaire Penthouse",
    propertyPrice: "₹2.40 Cr",
    propertyLocation: "Salt Lake Sector V",
    userName: "Alex Reynolds",
    email: "alex.reynolds@luxuryestates.com",
    phone: "+91 98302 11928",
    preferredTime: "Morning (10 AM - 1 PM)",
    message: "Kindly share the detailed floor layout and maintenance breakdown per quarter.",
    status: "replied",
    agentReply: "Hello Alex! I have emailed the full architectural brochure and quarterly maintenance schedule. Looking forward to showing you the private rooftop plunge deck.",
    createdAt: "2026-09-19T11:00:00Z",
  },
  {
    id: "enq-202",
    propertyId: "prop-4",
    propertyTitle: "The Oasis Sanctuary Villa",
    propertyPrice: "₹3.60 Cr",
    propertyLocation: "Rajarhat, Kolkata",
    userName: "Alex Reynolds",
    email: "alex.reynolds@luxuryestates.com",
    phone: "+91 98302 11928",
    preferredTime: "Afternoon (2 PM - 5 PM)",
    message: "Does the villa permit solar capacity expansion up to 15 kW?",
    status: "pending",
    createdAt: "2026-09-22T09:40:00Z",
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Visit Confirmed",
    message: "Your private tour of The Aurelia Residence is confirmed for Sept 28 at 11:00 AM.",
    type: "visit",
    time: "2 hours ago",
    read: false,
    link: "/dashboard",
  },
  {
    id: "notif-2",
    title: "Agent Response Received",
    message: "Priya Sharma responded to your inquiry on Skyline Solitaire Penthouse.",
    type: "enquiry",
    time: "1 day ago",
    read: false,
    link: "/dashboard",
  },
  {
    id: "notif-3",
    title: "Exclusive Listing Match",
    message: "A new verified 4 BHK duplex matching your saved search was listed in Alipore.",
    type: "property",
    time: "3 days ago",
    read: true,
    link: "/properties/prop-2",
  },
];

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info";
}

interface NestoraContextType {
  currentUser: User;
  switchRole: (role: UserRole) => void;
  properties: Property[];
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  clearFavorites: () => void;
  comparedIds: string[];
  toggleCompare: (propertyId: string) => void;
  isCompared: (propertyId: string) => boolean;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
  visits: Visit[];
  scheduleVisit: (visit: Omit<Visit, "id" | "ticketId" | "createdAt" | "status">) => Promise<Visit>;
  cancelVisit: (visitId: string) => void;
  rescheduleVisit: (visitId: string, newDate: string, newTime: string) => void;
  enquiries: Enquiry[];
  submitEnquiry: (enquiry: Omit<Enquiry, "id" | "createdAt" | "status">) => Promise<Enquiry>;
  replyToEnquiry: (enquiryId: string, replyMessage: string) => void;
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  recentlyViewed: string[];
  recordView: (propertyId: string) => void;
  searchHistory: string[];
  recordSearch: (term: string) => void;
  toasts: ToastMessage[];
  showToast: (title: string, message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
  // Property management actions for Agent / Admin
  addProperty: (property: Property) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (propertyId: string) => void;
  togglePropertyStatus: (propertyId: string, status: Property["status"]) => void;
  filterState: PropertyFilterState;
  setFilterState: React.Dispatch<React.SetStateAction<PropertyFilterState>>;
  resetFilters: () => void;
}

const DEFAULT_FILTERS: PropertyFilterState = {
  searchQuery: "",
  purpose: "all",
  location: "all",
  propertyTypes: [],
  priceRange: [0, 100000000],
  bedrooms: [],
  bathrooms: [],
  furnishing: [],
  propertyAge: [],
  amenities: [],
  verifiedOnly: false,
  sortBy: "recommended",
};

const NestoraContext = createContext<NestoraContextType | undefined>(undefined);

export const NestoraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS.buyer);
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [favorites, setFavorites] = useState<string[]>(["prop-1", "prop-3"]);
  const [comparedIds, setComparedIds] = useState<string[]>(["prop-1", "prop-7"]);
  const [visits, setVisits] = useState<Visit[]>(INITIAL_VISITS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(INITIAL_ENQUIRIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(["prop-1", "prop-2", "prop-3"]);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "3 BHK in New Town under ₹1.5 Cr",
    "Luxury duplex in Alipore",
    "Salt Lake Sector V penthouses",
  ]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [filterState, setFilterState] = useState<PropertyFilterState>(DEFAULT_FILTERS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const savedUserRole = localStorage.getItem("nestora_user_role") as UserRole;
      if (savedUserRole && DEMO_USERS[savedUserRole]) {
        setCurrentUser(DEMO_USERS[savedUserRole]);
      }
      const savedFavorites = localStorage.getItem("nestora_favorites");
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

      const savedCompared = localStorage.getItem("nestora_compared");
      if (savedCompared) setComparedIds(JSON.parse(savedCompared));

      const savedVisits = localStorage.getItem("nestora_visits");
      if (savedVisits) setVisits(JSON.parse(savedVisits));

      const savedEnquiries = localStorage.getItem("nestora_enquiries");
      if (savedEnquiries) setEnquiries(JSON.parse(savedEnquiries));

      const savedRecents = localStorage.getItem("nestora_recents");
      if (savedRecents) setRecentlyViewed(JSON.parse(savedRecents));

      const savedProps = localStorage.getItem("nestora_custom_props");
      if (savedProps) {
        const parsed = JSON.parse(savedProps);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProperties(parsed);
        }
      }
    } catch (e) {
      console.warn("Could not load local storage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage when changed
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("nestora_user_role", currentUser.role);
      localStorage.setItem("nestora_favorites", JSON.stringify(favorites));
      localStorage.setItem("nestora_compared", JSON.stringify(comparedIds));
      localStorage.setItem("nestora_visits", JSON.stringify(visits));
      localStorage.setItem("nestora_enquiries", JSON.stringify(enquiries));
      localStorage.setItem("nestora_recents", JSON.stringify(recentlyViewed));
      localStorage.setItem("nestora_custom_props", JSON.stringify(properties));
    } catch (e) {
      console.warn("Could not save to local storage", e);
    }
  }, [currentUser, favorites, comparedIds, visits, enquiries, recentlyViewed, properties, isLoaded]);

  const showToast = (title: string, message: string, type: "success" | "error" | "info" = "success") => {
    const id = "toast-" + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const switchRole = (role: UserRole) => {
    const selected = DEMO_USERS[role];
    setCurrentUser(selected);
    showToast("Role Switched", `Now operating as ${selected.name} (${role.toUpperCase()})`, "info");
  };

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(propertyId);
      const updated = exists ? prev.filter((id) => id !== propertyId) : [...prev, propertyId];
      showToast(
        exists ? "Removed from Saved" : "Saved to Wishlist",
        exists ? "Property removed from your collection." : "Property saved to your personal portfolio.",
        exists ? "info" : "success"
      );
      return updated;
    });
  };

  const isFavorite = (propertyId: string) => favorites.includes(propertyId);

  const clearFavorites = () => {
    setFavorites([]);
    showToast("Cleared Wishlist", "All saved properties removed.", "info");
  };

  const toggleCompare = (propertyId: string) => {
    setComparedIds((prev) => {
      if (prev.includes(propertyId)) {
        showToast("Removed from Compare", "Property removed from comparison tray.", "info");
        return prev.filter((id) => id !== propertyId);
      }
      if (prev.length >= 4) {
        showToast("Comparison Limit", "You can compare up to 4 properties at once.", "error");
        return prev;
      }
      showToast("Added to Compare", "Property added to comparison table.", "success");
      return [...prev, propertyId];
    });
  };

  const isCompared = (propertyId: string) => comparedIds.includes(propertyId);

  const removeFromCompare = (propertyId: string) => {
    setComparedIds((prev) => prev.filter((id) => id !== propertyId));
    showToast("Removed", "Property removed from comparison.", "info");
  };

  const clearCompare = () => {
    setComparedIds([]);
  };

  const scheduleVisit = async (
    data: Omit<Visit, "id" | "ticketId" | "createdAt" | "status">
  ): Promise<Visit> => {
    const newVisit: Visit = {
      ...data,
      id: "vis-" + Date.now(),
      ticketId: "NST-VIS-" + Math.floor(1000 + Math.random() * 9000),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    setVisits((prev) => [newVisit, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: "notif-" + Date.now(),
      title: "Visit Scheduled",
      message: `Your ${newVisit.visitType === "in_person" ? "private viewing" : "video walkthrough"} for ${newVisit.propertyTitle} is set for ${newVisit.date} (${newVisit.timeSlot}).`,
      type: "visit",
      time: "Just now",
      read: false,
      link: "/dashboard",
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast("Visit Scheduled", `Confirmation ticket ${newVisit.ticketId} issued!`, "success");

    return newVisit;
  };

  const cancelVisit = (visitId: string) => {
    setVisits((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, status: "cancelled" } : v))
    );
    showToast("Visit Cancelled", "The scheduled visit has been marked as cancelled.", "info");
  };

  const rescheduleVisit = (visitId: string, newDate: string, newTime: string) => {
    setVisits((prev) =>
      prev.map((v) =>
        v.id === visitId ? { ...v, date: newDate, timeSlot: newTime, status: "confirmed" } : v
      )
    );
    showToast("Visit Rescheduled", `Updated to ${newDate} at ${newTime}`, "success");
  };

  const submitEnquiry = async (
    data: Omit<Enquiry, "id" | "createdAt" | "status">
  ): Promise<Enquiry> => {
    const newEnquiry: Enquiry = {
      ...data,
      id: "enq-" + Date.now(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setEnquiries((prev) => [newEnquiry, ...prev]);

    const newNotif: NotificationItem = {
      id: "notif-" + Date.now(),
      title: "Enquiry Dispatched",
      message: `Your message regarding ${newEnquiry.propertyTitle} has been routed to the listing agent.`,
      type: "enquiry",
      time: "Just now",
      read: false,
      link: "/dashboard",
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast("Enquiry Sent", "Listing agent will respond within 15 minutes.", "success");

    return newEnquiry;
  };

  const replyToEnquiry = (enquiryId: string, replyMessage: string) => {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === enquiryId ? { ...e, status: "replied", agentReply: replyMessage } : e
      )
    );
    showToast("Reply Sent", "Agent response sent to client.", "success");
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("Notifications", "All marked as read.", "info");
  };

  const recordView = (propertyId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== propertyId);
      return [propertyId, ...filtered].slice(0, 10);
    });
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, viewsCount: p.viewsCount + 1 } : p))
    );
  };

  const recordSearch = (term: string) => {
    if (!term || !term.trim()) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((t) => t.toLowerCase() !== term.toLowerCase());
      return [term.trim(), ...filtered].slice(0, 8);
    });
  };

  const addProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
    showToast("Property Listed", `${newProp.title} has been successfully published!`, "success");
  };

  const updateProperty = (updated: Property) => {
    setProperties((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast("Property Updated", `Changes to ${updated.title} have been saved.`, "success");
  };

  const deleteProperty = (propertyId: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    setFavorites((prev) => prev.filter((id) => id !== propertyId));
    setComparedIds((prev) => prev.filter((id) => id !== propertyId));
    showToast("Listing Deleted", "Property listing permanently removed.", "info");
  };

  const togglePropertyStatus = (propertyId: string, status: Property["status"]) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, status } : p))
    );
    showToast("Status Updated", `Property status changed to ${status.toUpperCase()}`, "info");
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTERS);
  };

  return (
    <NestoraContext.Provider
      value={{
        currentUser,
        switchRole,
        properties,
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        comparedIds,
        toggleCompare,
        isCompared,
        removeFromCompare,
        clearCompare,
        visits,
        scheduleVisit,
        cancelVisit,
        rescheduleVisit,
        enquiries,
        submitEnquiry,
        replyToEnquiry,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        recentlyViewed,
        recordView,
        searchHistory,
        recordSearch,
        toasts,
        showToast,
        removeToast,
        addProperty,
        updateProperty,
        deleteProperty,
        togglePropertyStatus,
        filterState,
        setFilterState,
        resetFilters,
      }}
    >
      {children}
    </NestoraContext.Provider>
  );
};

export const useNestora = () => {
  const context = useContext(NestoraContext);
  if (!context) {
    throw new Error("useNestora must be used within a NestoraProvider");
  }
  return context;
};
