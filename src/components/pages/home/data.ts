/*
|-----------------------------------------
| setting up data.ts for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 31 October, 2026
|-----------------------------------------
*/

export type HomeCard = { title: string; description: string };
export type HomeData = {
  forceUpdate: "true" | "false";
  paddingX: number;
  paddingY: number;
  eyebrow: string;
  title: string;
  intro: string;
  imageUrl: string;
  imageAlt: string;
  sectionsJson: string;
};

// Editorial imagery is illustrative and does not represent Landora listings.
export const images = {
  hero: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2200&q=85",
  land: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1600&q=85",
  flats: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=85",
  condo: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=85",
  penthouse: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85",
  exterior: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=85",
  interior: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85",
  detail: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=85",
  residence: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85",
  landscape: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=85",
};
export const categories = [
  { name: "Land", image: images.land, alt: "A home surrounded by a wooded landscape" },
  { name: "Flats", image: images.flats, alt: "A light-filled contemporary living room" },
  { name: "Condominiums", image: images.condo, alt: "A contemporary residential interior" },
  { name: "Penthouses", image: images.penthouse, alt: "An expansive modern residential interior" },
];
export const defaultCards: HomeCard[] = [
  {
    title: "A place for every vision.",
    description:
      "From the freedom of land to the sophistication of a penthouse, discover a property journey shaped around you.",
  },
  {
    title: "Spaces worth imagining.",
    description:
      "Explore a curated look at the kinds of properties that inspire us. These images are illustrative, not available listings.",
  },
  {
    title: "The freedom to begin anew.",
    description: "Explore residential and investment land with room for your ambitions to take shape.",
  },
  {
    title: "Life, beautifully considered.",
    description: "Discover flats and condominiums designed around the way you want to live.",
  },
  {
    title: "A different perspective on living.",
    description:
      "For those drawn to exceptional space, privacy and elevated living, explore the possibilities of a penthouse.",
  },
  {
    title: "Find your sense of place.",
    description:
      "The right location is personal. Tell us what matters to you and explore the possibilities with Landora.",
  },
  {
    title: "Considered guidance, lasting care.",
    description:
      "A property decision deserves clear communication, thoughtful guidance and support beyond the purchase.",
  },
  {
    title: "A more thoughtful journey.",
    description:
      "From your first conversation to the moments after purchase, every step is an opportunity to move forward with clarity.",
  },
  {
    title: "Here for what comes next.",
    description: "Our relationship continues after purchase, with property care and assistance when you need it.",
  },
  {
    title: "A conversation built on clarity.",
    description: "Every property journey is different. Here are a few questions to help you begin.",
  },
  {
    title: "Let’s find what feels like home.",
    description: "Share your aspirations with Landora and begin a more considered property journey.",
  },
];
export const defaultHomeCard: HomeCard = { title: "", description: "" };
export const defaultData: HomeData = {
  forceUpdate: "false",
  paddingX: 0,
  paddingY: 0,
  eyebrow: "Landora / A considered way of living",
  title: "A place to live beautifully.",
  intro: "Thoughtful spaces. Lasting connections. Discover a more personal approach to property with Landora.",
  imageUrl: "",
  imageAlt: "Contemporary residence with landscaped surroundings",
  sectionsJson: JSON.stringify(defaultCards),
};
const legacyTitles = [
  "Electronics for your everyday",
  "Start with what matters",
  "Explore the collection",
  "Made for your routine",
  "Look closer at the details",
  "Find the right fit",
  "Think about compatibility",
  "A more considered choice",
  "Discover at your own pace",
  "Questions along the way?",
  "Find your next essential",
];
const legacyDescriptions = [
  "Explore electronics and find a starting point for what you need.",
  "Think about where and how you will use a product before comparing your options.",
  "Browse the product catalogue to see what is currently available.",
  "Consider the features that fit your day, whether you are working, learning, or unwinding.",
  "Read the product information carefully to understand its specifications and features.",
  "Compare the options that interest you and choose the one that suits your needs.",
  "Check connections, dimensions, and compatibility with the devices you already use.",
  "Focus on the features you will actually use and the details that matter to you.",
  "Take your time exploring the catalogue and return to the products that catch your eye.",
  "Visit our contact page to get in touch with NexaMart.",
  "Explore the available electronics at NexaMart.",
];
export function resolveHomeData(data?: Partial<HomeData>): HomeData {
  const result = { ...defaultData, ...data };
  if (["NexaMart / Electronics", "Landora · NxMart"].includes(result.eyebrow)) result.eyebrow = defaultData.eyebrow;
  if (["Discover electronics for everyday life.", "Online shopping across Bangladesh"].includes(result.title))
    result.title = defaultData.title;
  if (
    ["We provide best electronics products.", "Browse available products and shop online with Landora."].includes(
      result.intro,
    )
  )
    result.intro = defaultData.intro;
  if (result.imageUrl === "/Logo.png" && result.imageAlt === "Landora logo") {
    result.imageUrl = "";
    result.imageAlt = defaultData.imageAlt;
  }
  if (result.imageAlt === "Electronics at NexaMart") result.imageAlt = defaultData.imageAlt;
  return result;
}
export function parseCards(value: unknown): HomeCard[] {
  try {
    const parsed: unknown = JSON.parse(typeof value === "string" ? value : defaultData.sectionsJson);
    if (!Array.isArray(parsed)) return defaultCards;
    return parsed.map((item, index) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return defaultCards[index] ?? defaultHomeCard;
      const card = item as Record<string, unknown>;
      if (card.title === legacyTitles[index] && card.description === legacyDescriptions[index])
        return defaultCards[index] ?? defaultHomeCard;
      return {
        title: typeof card.title === "string" ? card.title : "",
        description: typeof card.description === "string" ? card.description : "",
      };
    });
  } catch {
    return defaultCards;
  }
}
export const faqs = [
  {
    q: "What types of property does Landora offer?",
    a: "Landora offers land, residential flats, luxury condominiums and penthouses. Contact us to discuss current availability.",
  },
  {
    q: "How do I arrange a property visit?",
    a: "Contact Landora with the type of property you are interested in to discuss the next steps and a possible visit.",
  },
  {
    q: "Can Landora help after a purchase?",
    a: "Landora offers post-purchase assistance, documentation support and property care services, including maintenance coordination.",
  },
  {
    q: "How can I learn about locations and pricing?",
    a: "Contact Landora for current property details, locations, pricing and availability.",
  },
];
