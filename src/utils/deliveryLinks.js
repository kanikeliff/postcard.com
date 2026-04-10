import { sendPostcardEmail } from "./emailService";

export function sendWhatsApp(contact, content) {
  const clean = contact.replace(/\D/g, "");
  const text = encodeURIComponent(content || "");
  window.open(`https://wa.me/${clean}?text=${text}`, "_blank");
}

export function sendSMS(contact, content) {
  const text = encodeURIComponent(content || "");
  window.open(`sms:${contact}?body=${text}`, "_blank");
}

/**
 * Gönderim yöntemine göre ilgili işlemi çalıştırır.
 * Email için EmailJS kullanır (site içi gönderim).
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function triggerSend(postcard) {
  const { method, contact, content } = postcard;

  if (method === "email") {
    return await sendPostcardEmail(postcard);
  }
  if (method === "whatsapp") {
    sendWhatsApp(contact, content);
    return { success: true, message: "WhatsApp açıldı 💬" };
  }
  if (method === "sms") {
    sendSMS(contact, content);
    return { success: true, message: "SMS uygulaması açıldı 📱" };
  }
  return { success: false, message: "Bilinmeyen gönderim yöntemi." };
}