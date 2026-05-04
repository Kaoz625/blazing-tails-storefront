export interface Edition {
  id: string;
  title: string;
  category: string;
  volume: number;
  tagline: string;
  price: number;
  performers: string[];
  coverColor: string;
}

export const EDITIONS: Edition[] = [
  {
    id: "pearls-vol1",
    title: "Southern Girls in the City",
    category: "Pearls",
    volume: 1,
    tagline: "From the South, straight to your heart.",
    price: 22.99,
    performers: ["Mara Prescott", "Savannah Cole", "Cassidy Hollis", "Brie Bennett", "Hailey Crawford", "Lexi Harlow"],
    coverColor: "#f5e6d3",
  },
  {
    id: "pearls-vol2",
    title: "All-American Originals",
    category: "Pearls",
    volume: 2,
    tagline: "Made in America. Uncensored.",
    price: 22.99,
    performers: ["Quinn Monroe", "Tatum Sinclair", "Rylee Walsh", "Sloane Prescott", "Piper Ashford", "Avery Calloway"],
    coverColor: "#ede0cf",
  },
  {
    id: "onyx-vol1",
    title: "Queens of Brooklyn",
    category: "Onyx",
    volume: 1,
    tagline: "Royalty lives in Bed-Stuy.",
    price: 22.99,
    performers: ["Naomi Banks", "Zara Phillips", "Amara Carter", "Destiny Davis", "Imani Freeman", "Jade Hayes"],
    coverColor: "#1a1a2e",
  },
  {
    id: "onyx-vol2",
    title: "Harlem Renaissance",
    category: "Onyx",
    volume: 2,
    tagline: "A new renaissance for a new era.",
    price: 22.99,
    performers: ["Keisha Jackson", "Layla King", "Maya Okafor", "Nia Robinson", "Simone Thompson", "Tanisha Washington"],
    coverColor: "#16213e",
  },
  {
    id: "jade-vol1",
    title: "Tokyo Meets NYC",
    category: "Jade",
    volume: 1,
    tagline: "Two worlds. One city.",
    price: 22.99,
    performers: ["Yuki Tanaka", "Hana Mori", "Sakura Ito", "Aiko Nakamura", "Rin Yamamoto", "Mei Sato"],
    coverColor: "#0d3b2e",
  },
  {
    id: "jade-vol2",
    title: "Silk Road Stories",
    category: "Jade",
    volume: 2,
    tagline: "Ancient beauty meets the modern city.",
    price: 22.99,
    performers: ["Lian Chen", "Fang Liu", "Mei Zhang", "Xiu Wang", "Yan Zhao", "Jing Wu"],
    coverColor: "#1b4332",
  },
  {
    id: "amber-vol1",
    title: "Caliente",
    category: "Amber",
    volume: 1,
    tagline: "Turn up the heat.",
    price: 22.99,
    performers: ["Sofia Rivera", "Camila Torres", "Isabella Reyes", "Valentina Cruz", "Lucia Herrera", "Mia Flores"],
    coverColor: "#7c2d12",
  },
  {
    id: "amber-vol2",
    title: "Mami NYC",
    category: "Amber",
    volume: 2,
    tagline: "From the Bronx to the world.",
    price: 22.99,
    performers: ["Natalia Gomez", "Daniela Santos", "Gabriela Ortiz", "Adriana Morales", "Paola Jimenez", "Rosa Castillo"],
    coverColor: "#92400e",
  },
  {
    id: "sapphire-vol1",
    title: "Girls Who Know",
    category: "Sapphire",
    volume: 1,
    tagline: "Knowledge is power. Beauty is currency.",
    price: 22.99,
    performers: ["Priya Sharma", "Kavya Patel", "Ananya Gupta", "Divya Nair", "Pooja Singh", "Riya Kumar"],
    coverColor: "#1e3a5f",
  },
  {
    id: "sapphire-vol2",
    title: "Brooklyn Soft Launch",
    category: "Sapphire",
    volume: 2,
    tagline: "The borough's best-kept secret.",
    price: 22.99,
    performers: ["Aisha Ahmed", "Fatima Hassan", "Zara Ali", "Nadia Ibrahim", "Layla Khalid", "Sara Malik"],
    coverColor: "#1e40af",
  },
  {
    id: "alexandrite-vol1",
    title: "New York Melting Pot",
    category: "Alexandrite",
    volume: 1,
    tagline: "Every face tells a story.",
    price: 22.99,
    performers: ["Elena Vasquez", "Amara Osei", "Yuki Tanaka", "Sofia Rivera", "Priya Sharma", "Mara Prescott"],
    coverColor: "#4c1d95",
  },
  {
    id: "alexandrite-vol2",
    title: "Every Shade of NYC",
    category: "Alexandrite",
    volume: 2,
    tagline: "This city contains multitudes.",
    price: 22.99,
    performers: ["Nova Williams", "Iris Chen", "Luna Reyes", "Jade Thompson", "Sky Patel", "Rose Kim"],
    coverColor: "#5b21b6",
  },
  {
    id: "ruby-vol1",
    title: "Tokyo Dreams",
    category: "Ruby",
    volume: 1,
    tagline: "Where fantasy meets reality.",
    price: 22.99,
    performers: ["Akiko Tanaka", "Yumi Sato", "Hina Mori", "Nana Ito", "Riko Nakamura", "Saki Yamamoto"],
    coverColor: "#7f1d1d",
  },
  {
    id: "ruby-vol2",
    title: "Anime NYC",
    category: "Ruby",
    volume: 2,
    tagline: "Your fantasy, brought to life.",
    price: 22.99,
    performers: ["Miku Suzuki", "Rin Kobayashi", "Ai Watanabe", "Yuki Kato", "Haru Abe", "Sora Inoue"],
    coverColor: "#991b1b",
  },
];

export const CATEGORIES = [...new Set(EDITIONS.map((e) => e.category))];

export function getEditionsByCategory(category: string): Edition[] {
  return EDITIONS.filter((e) => e.category === category);
}

export function getEditionById(id: string): Edition | undefined {
  return EDITIONS.find((e) => e.id === id);
}

export const QUANTITY_DISCOUNTS = [
  { min: 1, max: 1, label: "Single issue", price: 22.99 },
  { min: 2, max: 3, label: "2–3 issues", price: 19.99 },
  { min: 4, max: 6, label: "4–6 issues", price: 17.99 },
  { min: 7, max: 14, label: "Full collection (7–14)", price: 14.99 },
];
