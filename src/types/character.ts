export interface Character {
  id: string;
  cycle: number;
  generated_at: string;
  model: string;
  user_group: string;
  name: string;
  age: number;
  location: string;
  archetype: string;
  personality_traits: string[];
  communication_style: string;
  signature_phrase: string;
  user_profile: string;
  core_values: string[];
  primary_pain_point: string;
  group_language: string[];
  backstory: string;
  visual_description: string;
}

export interface CycleIndex {
  cycle: number;
  total: number;
  characters: string[];
}

export type MerchType = "tee" | "print" | "sticker";

export interface MerchItem {
  type: MerchType;
  label: string;
  price: number;
  description: string;
}

export const MERCH_CATALOG: MerchItem[] = [
  {
    type: "tee",
    label: "Character Tee",
    price: 34,
    description: "Premium unisex heavyweight cotton — signature phrase on the back.",
  },
  {
    type: "print",
    label: "Art Print",
    price: 24,
    description: "11×14 archival matte — character portrait + archetype badge.",
  },
  {
    type: "sticker",
    label: "Sticker Pack",
    price: 8,
    description: "6-piece vinyl pack — character portraits, phrases, and icons.",
  },
];

export const MODEL_COLORS: Record<string, string> = {
  "Claude Opus": "#7c6fef",
  "Claude Sonnet": "#5b8dee",
  "Claude Haiku": "#4bb8a9",
  "GPT-4o": "#19c37d",
  "GPT-4o Mini": "#2ecc71",
  "Gemini Pro": "#4285f4",
  "Gemini Flash": "#fbbc04",
  "Llama 3": "#e07b54",
  "Mistral": "#ff7000",
  "Grok": "#1da1f2",
  "Perplexity": "#20b2aa",
  "Command R+": "#c84b31",
};

export const GROUP_ICONS: Record<string, string> = {
  Creators: "🎨",
  Hustlers: "💼",
  Students: "📚",
  Professionals: "🏢",
  Gamers: "🎮",
  Explorers: "🌍",
  Nurturers: "💛",
};
