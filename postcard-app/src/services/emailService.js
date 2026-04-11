import emailjs from "@emailjs/browser";

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendPostcardLinkEmail(postcard) {
  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  const postcardUrl = `${appUrl}/p/${postcard.share_token}`;

  if (!serviceId || !templateId || !publicKey) {
    window.location.href = `mailto:${postcard.recipient_email}?subject=${encodeURIComponent(
      "A postcard is waiting for you"
    )}&body=${encodeURIComponent(
      `Open your postcard:\n${postcardUrl}`
    )}`;
    return { success: true, message: "Mail app opened." };
  }

  const templateParams = {
    to_email: postcard.recipient_email,
    to_name: postcard.recipient_name,
    postcard_title: postcard.title || "A special postcard for you",
    postcard_preview: postcard.content?.slice(0, 120) || "",
    postcard_url: postcardUrl,
  };

  try {
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return { success: true, message: "Postcard link sent! 💌" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to send postcard link." };
  }
}
