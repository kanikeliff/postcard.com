import { THEMES } from "../interfaces/postcard";

const METHOD_ICONS = { email: "✉️", whatsapp: "💬", sms: "📱" };

export default function PostcardPreview({ postcard }) {
  const { recipientName, title, content, theme, customImage, method } = postcard || {};

  const themeObj = THEMES.find((t) => t.id === theme) || THEMES[0];

  const bgStyle = customImage
    ? {
        backgroundImage: `url(${customImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : { backgroundColor: themeObj.bg };

  const textColor = customImage ? "#fff" : themeObj.text;
  const shadow = customImage ? "0 2px 8px rgba(0,0,0,0.55)" : "none";

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-100"
      style={{ minHeight: 320, ...bgStyle }}
    >
      {customImage && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      )}

      {/* Stamp decoration */}
      <div className="absolute top-4 right-4 w-12 h-16 border-2 rounded flex items-center justify-center text-2xl opacity-60"
        style={{ borderColor: textColor, color: textColor }}>
        💌
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col justify-between" style={{ minHeight: 320 }}>
        {/* Header */}
        <div>
          <p className="text-xs uppercase tracking-[0.2em] mb-1 opacity-60" style={{ color: textColor, textShadow: shadow }}>
            To
          </p>
          <h2 className="text-2xl font-bold mb-4" style={{ color: textColor, textShadow: shadow, fontFamily: "'Georgia', serif" }}>
            {recipientName || "Dear Friend..."}
          </h2>
          {title && (
            <p className="text-sm font-semibold mb-2 opacity-80" style={{ color: textColor, textShadow: shadow }}>
              {title}
            </p>
          )}
        </div>

        {/* Body */}
        <p className="text-sm leading-relaxed flex-1 whitespace-pre-wrap opacity-90"
          style={{ color: textColor, textShadow: shadow, fontFamily: "'Georgia', serif" }}>
          {content || "Your message will appear here..."}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-2 mt-4 opacity-60" style={{ color: textColor }}>
          <span className="text-lg">{METHOD_ICONS[method] || "✉️"}</span>
          <span className="text-xs uppercase tracking-widest">via {method || "email"}</span>
        </div>
      </div>

      {/* Postcard lines decoration */}
      <div className="absolute bottom-4 left-8 right-24 flex flex-col gap-2 opacity-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-px" style={{ backgroundColor: textColor }} />
        ))}
      </div>
    </div>
  );
}