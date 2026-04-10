/**
 * EmailJS ile site içinden e-posta gönderme
 *
 * Kurulum:
 * 1. npm install @emailjs/browser
 * 2. emailjs.com → üye ol → Email Service ekle → Email Template oluştur
 * 3. .env dosyasına aşağıdaki değerleri gir (aşağıya bak)
 */

import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/**
 * Kartpostali alıcının e-posta adresine gönderir.
 * @param {import("../interfaces/postcard").Postcard} postcard
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function sendPostcardEmail(postcard) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return {
      success: false,
      message: "EmailJS yapılandırması eksik. .env dosyasını kontrol et.",
    };
  }

  const templateParams = {
    to_email: postcard.contact,
    to_name: postcard.recipientName,
    subject: postcard.title || "Sana bir kartpostal var 💌",
    message: postcard.content,
    theme: postcard.theme,
    sent_at: new Date().toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    return { success: true, message: "Kartpostal başarıyla gönderildi! 💌" };
  } catch (error) {
    console.error("EmailJS error:", error);
    return {
      success: false,
      message: "Gönderim başarısız. Lütfen tekrar deneyin.",
    };
  }
}