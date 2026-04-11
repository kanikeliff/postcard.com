import { getTemplateById } from "../../constants/templates";
import { getFontById } from "../../constants/fonts";

export default function PostcardPreview({ postcard }) {
  const template = getTemplateById(postcard.templateId);
  const titleFont = getFontById(postcard.titleFont);
  const bodyFont = getFontById(postcard.bodyFont);

  const backgroundStyle = postcard.customImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(255,248,240,0.18), rgba(255,248,240,0.75)), url(${postcard.customImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundImage: template.overlay, backgroundColor: template.bg };

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-[32px] border border-white/60 shadow-[0_25px_80px_rgba(60,40,20,0.18)]">
      <div className="absolute inset-0" style={{ ...backgroundStyle, color: template.text }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_35%)]" />

      <div className="relative flex h-full flex-col justify-between p-8 sm:p-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] opacity-70">Postcard</p>
            <p className="mt-3 text-sm opacity-80">
              To {postcard.recipientName || "someone special"}
            </p>
          </div>
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-current/20 bg-white/20 text-lg backdrop-blur-sm">
            ✦
          </div>
        </div>

        <div className="space-y-4" style={{ textAlign: postcard.textAlign }}>
          <h2
            className="text-3xl leading-tight sm:text-4xl"
            style={{ fontFamily: titleFont.family }}
          >
            {postcard.title || "A quiet note for you"}
          </h2>
          <p
            className="whitespace-pre-wrap text-base leading-8 sm:text-lg"
            style={{ fontFamily: bodyFont.family }}
          >
            {postcard.content || "Your words will appear here like a beautiful little memory."}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] opacity-60">With love</p>
            <p style={{ fontFamily: bodyFont.family }}>{postcard.signature || "Your signature"}</p>
          </div>
          <div className="rounded-full border border-current/20 bg-white/20 px-4 py-2 text-xs backdrop-blur-sm">
            sealed with care
          </div>
        </div>
      </div>
    </div>
  );
}