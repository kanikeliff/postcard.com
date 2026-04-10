/**
 * E-posta gönderme — iki mod:
 * 1. .env ayarlanmışsa → EmailJS ile site içinden gönderir
 * 2. .env yoksa        → mailto: ile e-posta uygulamasını açar (fallback)
 */

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function mailtoFallback(postcard) {
  const subject = encodeURIComponent(postcard.title || "Sana bir kartpostal var 💌");
  const body = encodeURIComponent(postcard.content || "");
  window.open(`mailto:${postcard.contact}?subject=${subject}&body=${body}`, "_blank");
  return { success: true, message: "E-posta uygulaması açıldı ✉️" };
}

export async function sendPostcardEmail(postcard) {
  // EmailJS kurulu değilse mailto ile aç
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    return mailtoFallback(postcard);
  }

  try {
    const emailjs = await import("@emailjs/browser");
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: postcard.contact,
      to_name: postcard.recipientName,
      subject: postcard.title || "Sana bir kartpostal var 💌",
      message: postcard.content,
      sent_at: new Date().toLocaleDateString("tr-TR", {
        day: "numeric", month: "long", year: "numeric",
      }),
    }, PUBLIC_KEY);
    return { success: true, message: "Kartpostal başarıyla gönderildi! 💌" };
  } catch (error) {
    console.error("EmailJS error:", error);
    // EmailJS başarısız olursa yine mailto'ya düş
    return mailtoFallback(postcard);
  }
}