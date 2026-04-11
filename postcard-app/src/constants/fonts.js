export const POSTCARD_FONTS = [
  { id: "playfair", label: "Playfair Display", family: "'Playfair Display', serif" },
  { id: "lora", label: "Lora", family: "'Lora', serif" },
  { id: "cormorant", label: "Cormorant Garamond", family: "'Cormorant Garamond', serif" },
  { id: "caveat", label: "Caveat", family: "'Caveat', cursive" },
  { id: "dancing-script", label: "Dancing Script", family: "'Dancing Script', cursive" },
  { id: "eb-garamond", label: "EB Garamond", family: "'EB Garamond', serif" },
];

export function getFontById(fontId) {
  return POSTCARD_FONTS.find((item) => item.id === fontId) ?? POSTCARD_FONTS[0];
}