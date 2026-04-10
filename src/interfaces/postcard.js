/**
 * @typedef {Object} Postcard
 * @property {string} id
 * @property {string} recipientName
 * @property {string} title
 * @property {string} content
 * @property {'email'|'whatsapp'|'sms'} method
 * @property {string} contact
 * @property {string} theme
 * @property {string|null} customImage
 * @property {'draft'|'sent'} status
 * @property {string} createdAt
 * @property {string} updatedAt
 */

export const THEMES = [
  { id: "vintage", label: "Vintage Paper", bg: "#f5f0e8", text: "#5c4a2a" },
  { id: "softpink", label: "Soft Pink", bg: "#fce4ec", text: "#880e4f" },
  { id: "midnight", label: "Midnight Ink", bg: "#1a1a2e", text: "#e0e0ff" },
  { id: "floral", label: "Floral Note", bg: "#e8f5e9", text: "#1b5e20" },
  { id: "minimal", label: "Minimal White", bg: "#ffffff", text: "#212121" },
];

export const DEFAULT_POSTCARD = {
  recipientName: "",
  title: "",
  content: "",
  method: "email",
  contact: "",
  theme: "vintage",
  customImage: null,
  status: "draft",
};