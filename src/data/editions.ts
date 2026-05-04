export interface Edition {
  id: string;
  brand: string;
  issue: number;
  edition: "sfw" | "nsfw";
  pairedId: string;
  title: string;
  tagline: string;
  price: number;
  performers: string[];
  coverColor: string;
  description: string;
}

const BRAND_COLORS: Record<string, { sfw: string; nsfw: string }> = {
  Pearls:      { sfw: "#f5ede0", nsfw: "#6b4c35" },
  Onyx:        { sfw: "#3d3b38", nsfw: "#141413" },
  Jade:        { sfw: "#2f5b4f", nsfw: "#1a332e" },
  Amber:       { sfw: "#c96442", nsfw: "#7a2e10" },
  Sapphire:    { sfw: "#2b4a8b", nsfw: "#1a2e5e" },
  Alexandrite: { sfw: "#4a2e7a", nsfw: "#2a1a4a" },
  Ruby:        { sfw: "#7a1e2e", nsfw: "#4a0e1a" },
};

function make(
  brand: string, issue: number, edition: "sfw" | "nsfw",
  title: string, tagline: string, description: string, performers: string[]
): Edition {
  const slug = brand.toLowerCase();
  return {
    id: `${slug}-${issue}-${edition}`,
    pairedId: `${slug}-${issue}-${edition === "sfw" ? "nsfw" : "sfw"}`,
    brand, issue, edition, title, tagline, description,
    price: edition === "nsfw" ? 29.99 : 22.99,
    performers,
    coverColor: BRAND_COLORS[brand][edition],
  };
}

export const EDITIONS: Edition[] = [
  // ── PEARLS ──────────────────────────────────────────────────────────
  make("Pearls", 1, "sfw", "Southern Girls in the City", "From the South, straight to your heart.",
    "Six women who brought their whole world to New York and made it richer for it.",
    ["Mara Prescott","Savannah Cole","Cassidy Hollis","Brie Bennett","Hailey Crawford","Lexi Harlow"]),
  make("Pearls", 1, "nsfw", "Southern Girls in the City", "From the South, straight to your heart.",
    "Unfiltered. All of them. Every curve, every confession, every look that says they know exactly what they're doing.",
    ["Mara Prescott","Savannah Cole","Cassidy Hollis","Brie Bennett","Hailey Crawford","Lexi Harlow"]),
  make("Pearls", 2, "sfw", "All-American Originals", "Made in America. Uncensored.",
    "The second wave — six more women who define their own American story.",
    ["Quinn Monroe","Tatum Sinclair","Rylee Walsh","Sloane Prescott","Piper Ashford","Avery Calloway"]),
  make("Pearls", 2, "nsfw", "All-American Originals", "Made in America. Uncensored.",
    "No filter on who they are or what they want.",
    ["Quinn Monroe","Tatum Sinclair","Rylee Walsh","Sloane Prescott","Piper Ashford","Avery Calloway"]),

  // ── ONYX ────────────────────────────────────────────────────────────
  make("Onyx", 1, "sfw", "Queens of Brooklyn", "Royalty lives in Bed-Stuy.",
    "Six queens from the borough that invented cool. Portraits of power.",
    ["Naomi Banks","Zara Phillips","Amara Carter","Destiny Davis","Imani Freeman","Jade Hayes"]),
  make("Onyx", 1, "nsfw", "Queens of Brooklyn", "Royalty lives in Bed-Stuy.",
    "The queens on their own terms. Raw, regal, and completely in charge.",
    ["Naomi Banks","Zara Phillips","Amara Carter","Destiny Davis","Imani Freeman","Jade Hayes"]),
  make("Onyx", 2, "sfw", "Harlem Renaissance", "A new renaissance for a new era.",
    "A love letter to Harlem, written by the women who carry it forward.",
    ["Keisha Jackson","Layla King","Maya Okafor","Nia Robinson","Simone Thompson","Tanisha Washington"]),
  make("Onyx", 2, "nsfw", "Harlem Renaissance", "A new renaissance for a new era.",
    "Six women rewriting the rules of desire.",
    ["Keisha Jackson","Layla King","Maya Okafor","Nia Robinson","Simone Thompson","Tanisha Washington"]),

  // ── JADE ────────────────────────────────────────────────────────────
  make("Jade", 1, "sfw", "Tokyo Meets NYC", "Two worlds. One city.",
    "Where East meets West in fashion, art, and beauty. A cultural dialogue in portraits.",
    ["Yuki Tanaka","Hana Mori","Sakura Ito","Aiko Nakamura","Rin Yamamoto","Mei Sato"]),
  make("Jade", 1, "nsfw", "Tokyo Meets NYC", "Two worlds. One city.",
    "Two worlds collide — and the sparks are everything. Intimate and electric.",
    ["Yuki Tanaka","Hana Mori","Sakura Ito","Aiko Nakamura","Rin Yamamoto","Mei Sato"]),
  make("Jade", 2, "sfw", "Silk Road Stories", "Ancient beauty meets the modern city.",
    "Heritage and modernity. Six women who carry history in their bones.",
    ["Lian Chen","Fang Liu","Mei Zhang","Xiu Wang","Yan Zhao","Jing Wu"]),
  make("Jade", 2, "nsfw", "Silk Road Stories", "Ancient beauty meets the modern city.",
    "The ancient and the explicit. Stories as old as desire, told without shame.",
    ["Lian Chen","Fang Liu","Mei Zhang","Xiu Wang","Yan Zhao","Jing Wu"]),

  // ── AMBER ───────────────────────────────────────────────────────────
  make("Amber", 1, "sfw", "Caliente", "Turn up the heat.",
    "Six women whose presence raises the temperature of every room they enter.",
    ["Sofia Rivera","Camila Torres","Isabella Reyes","Valentina Cruz","Lucia Herrera","Mia Flores"]),
  make("Amber", 1, "nsfw", "Caliente", "Turn up the heat.",
    "The heat, all the way up. Explicit, passionate, and completely unapologetic.",
    ["Sofia Rivera","Camila Torres","Isabella Reyes","Valentina Cruz","Lucia Herrera","Mia Flores"]),
  make("Amber", 2, "sfw", "Mami NYC", "From the Bronx to the world.",
    "Born in the Bronx, built for the world. Six mamis who own every space they inhabit.",
    ["Natalia Gomez","Daniela Santos","Gabriela Ortiz","Adriana Morales","Paola Jimenez","Rosa Castillo"]),
  make("Amber", 2, "nsfw", "Mami NYC", "From the Bronx to the world.",
    "Six women who know exactly what they have and exactly how to use it.",
    ["Natalia Gomez","Daniela Santos","Gabriela Ortiz","Adriana Morales","Paola Jimenez","Rosa Castillo"]),

  // ── SAPPHIRE ────────────────────────────────────────────────────────
  make("Sapphire", 1, "sfw", "Girls Who Know", "Knowledge is power. Beauty is currency.",
    "Intelligence and elegance in perfect harmony. Six women who outthink and outlast.",
    ["Priya Sharma","Kavya Patel","Ananya Gupta","Divya Nair","Pooja Singh","Riya Kumar"]),
  make("Sapphire", 1, "nsfw", "Girls Who Know", "Knowledge is power. Beauty is currency.",
    "They know exactly what you want. And they know exactly how to give it to you.",
    ["Priya Sharma","Kavya Patel","Ananya Gupta","Divya Nair","Pooja Singh","Riya Kumar"]),
  make("Sapphire", 2, "sfw", "Brooklyn Soft Launch", "The borough's best-kept secret.",
    "Six women Brooklyn has been keeping to itself. The secret is out.",
    ["Aisha Ahmed","Fatima Hassan","Zara Ali","Nadia Ibrahim","Layla Khalid","Sara Malik"]),
  make("Sapphire", 2, "nsfw", "Brooklyn Soft Launch", "The borough's best-kept secret.",
    "The borough's secret revealed, in full. Six women who held nothing back.",
    ["Aisha Ahmed","Fatima Hassan","Zara Ali","Nadia Ibrahim","Layla Khalid","Sara Malik"]),

  // ── ALEXANDRITE ─────────────────────────────────────────────────────
  make("Alexandrite", 1, "sfw", "New York Melting Pot", "Every face tells a story.",
    "The city in six faces. Every shade of New York, every story worth telling.",
    ["Elena Vasquez","Amara Osei","Yuki Tanaka","Sofia Rivera","Priya Sharma","Mara Prescott"]),
  make("Alexandrite", 1, "nsfw", "New York Melting Pot", "Every face tells a story.",
    "Every face, every body, every story — and none of them held back.",
    ["Elena Vasquez","Amara Osei","Yuki Tanaka","Sofia Rivera","Priya Sharma","Mara Prescott"]),
  make("Alexandrite", 2, "sfw", "Every Shade of NYC", "This city contains multitudes.",
    "A celebration of everything New York contains. Six women, six worlds, one city.",
    ["Nova Williams","Iris Chen","Luna Reyes","Jade Thompson","Sky Patel","Rose Kim"]),
  make("Alexandrite", 2, "nsfw", "Every Shade of NYC", "This city contains multitudes.",
    "Every shade, every desire, every fantasy New York contains — explicit and proud.",
    ["Nova Williams","Iris Chen","Luna Reyes","Jade Thompson","Sky Patel","Rose Kim"]),

  // ── RUBY ────────────────────────────────────────────────────────────
  make("Ruby", 1, "sfw", "Tokyo Dreams", "Where fantasy meets reality.",
    "Six women who blur the line between art and desire, fiction and the real.",
    ["Akiko Tanaka","Yumi Sato","Hina Mori","Nana Ito","Riko Nakamura","Saki Yamamoto"]),
  make("Ruby", 1, "nsfw", "Tokyo Dreams", "Where fantasy meets reality.",
    "The fantasy, made real and explicit. Every dream you had, brought to life.",
    ["Akiko Tanaka","Yumi Sato","Hina Mori","Nana Ito","Riko Nakamura","Saki Yamamoto"]),
  make("Ruby", 2, "sfw", "Anime NYC", "Your fantasy, brought to life.",
    "Where anime aesthetics meet New York reality. Six characters who stepped off the page.",
    ["Miku Suzuki","Rin Kobayashi","Ai Watanabe","Yuki Kato","Haru Abe","Sora Inoue"]),
  make("Ruby", 2, "nsfw", "Anime NYC", "Your fantasy, brought to life.",
    "Every fantasy you had watching anime, finally real. Explicit, vivid, exactly as imagined.",
    ["Miku Suzuki","Rin Kobayashi","Ai Watanabe","Yuki Kato","Haru Abe","Sora Inoue"]),
];

export const BRANDS = [...new Set(EDITIONS.map((e) => e.brand))];
export const CATEGORIES = BRANDS; // legacy compat

export const getSfwEditions = () => EDITIONS.filter((e) => e.edition === "sfw");
export const getNsfwEditions = () => EDITIONS.filter((e) => e.edition === "nsfw");
export const getEditionsByBrand = (brand: string) => EDITIONS.filter((e) => e.brand === brand);
export const getEditionById = (id: string) => EDITIONS.find((e) => e.id === id);
export const getPairedEdition = (id: string) => {
  const e = getEditionById(id);
  return e ? getEditionById(e.pairedId) : undefined;
};

export const QUANTITY_DISCOUNTS = [
  { min: 1,  max: 1,  label: "Single issue",           price: 22.99 },
  { min: 2,  max: 3,  label: "2–3 issues",              price: 19.99 },
  { min: 4,  max: 6,  label: "4–6 issues",              price: 17.99 },
  { min: 7,  max: 28, label: "Full collection (7–28)",  price: 14.99 },
];
