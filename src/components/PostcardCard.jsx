import { THEMES } from "../interfaces/postcard";

const METHOD_ICONS = { email: "✉️", whatsapp: "💬", sms: "📱" };

export default function PostcardCard({ postcard, onEdit, onDelete, onSend, isSending }) {
  const { id, recipientName, title, content, theme, customImage, status, createdAt, method } =
    postcard;

  const themeObj = THEMES.find((t) => t.id === theme) || THEMES[0];

  const bgStyle = customImage
    ? { backgroundImage: `url(${customImage})`, backgroundSize: "cover", backgroundPosition: "center" }
    : { backgroundColor: themeObj.bg };

  const textColor = customImage ? "#fff" : themeObj.text;

  const date = new Date(createdAt).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-100/50 group transition-transform hover:-translate-y-1 hover:shadow-2xl"
      style={{ minHeight: 200, ...bgStyle }}
    >
      {customImage && <div className="absolute inset-0 bg-black/35" />}

      {/* Status badge */}
      <div className="absolute top-3 left-3 z-20">
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-widest ${
            status === "sent"
              ? "bg-green-500/90 text-white"
              : "bg-amber-200/90 text-amber-800"
          }`}
        >
          {status === "sent" ? "✓ Sent" : "Draft"}
        </span>
      </div>

      {/* Stamp */}
      <div
        className="absolute top-3 right-3 z-20 w-10 h-12 border rounded flex items-center justify-center text-lg opacity-50"
        style={{ borderColor: textColor }}
      >
        💌
      </div>

      {/* Content */}
      <div className="relative z-10 p-5 pt-10">
        <p className="text-xs uppercase tracking-widest opacity-60 mb-0.5" style={{ color: textColor }}>
          To
        </p>
        <h3
          className="text-lg font-bold mb-1 truncate"
          style={{ color: textColor, fontFamily: "'Georgia', serif" }}
        >
          {recipientName}
        </h3>
        {title && (
          <p className="text-xs font-semibold opacity-70 mb-1 truncate" style={{ color: textColor }}>
            {title}
          </p>
        )}
        <p
          className="text-sm opacity-80 line-clamp-2"
          style={{ color: textColor, fontFamily: "'Georgia', serif" }}
        >
          {content}
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-5 pb-4 flex items-center justify-between mt-2">
        <span className="text-xs opacity-50" style={{ color: textColor }}>
          {METHOD_ICONS[method]} {date}
        </span>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(id)}
            className="text-xs px-3 py-1 rounded-lg bg-white/80 text-amber-800 hover:bg-white font-medium shadow"
          >
            Edit
          </button>
          <button
            onClick={() => onSend(postcard)}
            disabled={isSending}
            className={`text-xs px-3 py-1 rounded-lg font-medium shadow transition-all ${
              isSending
                ? "bg-amber-300 text-white cursor-not-allowed"
                : "bg-amber-500/90 text-white hover:bg-amber-600"
            }`}
          >
            {isSending ? "⏳" : "Send"}
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-xs px-3 py-1 rounded-lg bg-red-400/80 text-white hover:bg-red-500 font-medium shadow"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}