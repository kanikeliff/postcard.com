/**
 * @typedef {Object} Postcard
 * @property {string} id
 * @property {string|null} senderUserId
 * @property {string} recipientName
 * @property {string} recipientEmail
 * @property {string} title
 * @property {string} content
 * @property {string} templateId
 * @property {string|null} customImage
 * @property {string} titleFont
 * @property {string} bodyFont
 * @property {'left'|'center'|'right'} textAlign
 * @property {string|null} signature
 * @property {'draft'|'sent'|'read'} status
 * @property {string} shareToken
 * @property {boolean} isPublic
 * @property {string} createdAt
 * @property {string} updatedAt
 */

export const EMPTY_POSTCARD = {
  recipientName: "",
  recipientEmail: "",
  title: "",
  content: "",
  templateId: "vintage-letter",
  customImage: null,
  titleFont: "playfair",
  bodyFont: "lora",
  textAlign: "left",
  signature: "",
  status: "draft",
  isPublic: false,
};

export const TEXT_ALIGN_OPTIONS = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];
