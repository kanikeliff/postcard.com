const METHODS = [
  { id: "email", label: "Email", icon: "✉️", placeholder: "friend@example.com" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬", placeholder: "+90 555 000 0000" },
  { id: "sms", label: "SMS", icon: "📱", placeholder: "+90 555 000 0000" },
];

export default function DeliveryMethodSelect({ method, contact, onChange }) {
  const selected = METHODS.find((m) => m.id === method) || METHODS[0];

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">
        Delivery Method
      </p>
      <div className="flex gap-2 mb-3">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange({ method: m.id, contact: "" })}
            className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all ${
              method === m.id
                ? "bg-amber-600 text-white border-amber-600 shadow-md"
                : "bg-white text-amber-800 border-amber-200 hover:border-amber-400"
            }`}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>
      <input
        type={method === "email" ? "email" : "tel"}
        value={contact}
        onChange={(e) => onChange({ contact: e.target.value })}
        placeholder={selected.placeholder}
        className="w-full border border-amber-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/70"
      />
    </div>
  );
}