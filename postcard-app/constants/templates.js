export const TEMPLATES = [
  {
    id: "vintage-letter",
    label: "Vintage Letter",
    bg: "#f5efe2",
    text: "#5a4631",
    accent: "#c48b5f",
    overlay: "linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,248,240,0.72))",
  },
  {
    id: "rose-blush",
    label: "Rose Blush",
    bg: "#f9e7ea",
    text: "#6f3142",
    accent: "#c97c92",
    overlay: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,245,247,0.74))",
  },
  {
    id: "midnight-ink",
    label: "Midnight Ink",
    bg: "#1d2238",
    text: "#eef1ff",
    accent: "#b7c0ff",
    overlay: "linear-gradient(180deg, rgba(10,12,20,0.15), rgba(19,22,35,0.55))",
  },
  {
    id: "botanical-note",
    label: "Botanical Note",
    bg: "#e9f2e8",
    text: "#244229",
    accent: "#6f9c78",
    overlay: "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(245,255,247,0.72))",
  },
  {
    id: "ivory-minimal",
    label: "Ivory Minimal",
    bg: "#fffdf8",
    text: "#2d2a26",
    accent: "#bba483",
    overlay: "linear-gradient(180deg, rgba(255,255,255,0.20), rgba(255,252,247,0.78))",
  },
];

export function getTemplateById(templateId) {
  return TEMPLATES.find((item) => item.id === templateId) ?? TEMPLATES[0];
}