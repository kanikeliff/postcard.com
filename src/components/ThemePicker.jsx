import { THEMES } from "../interfaces/postcard";

export default function ThemePicker({ selectedTheme, customImage, onChange }) {
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ theme: "custom", customImage: reader.result });
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-3">
        Choose a Theme
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onChange({ theme: t.id, customImage: null })}
            title={t.label}
            className={`w-9 h-9 rounded-full border-2 transition-transform hover:scale-110 ${
              selectedTheme === t.id && !customImage
                ? "border-amber-600 scale-110 shadow-md"
                : "border-transparent"
            }`}
            style={{ backgroundColor: t.bg }}
          />
        ))}

        {/* Custom image swatch */}
        <label
          title="Upload Your Own"
          className={`w-9 h-9 rounded-full border-2 cursor-pointer flex items-center justify-center text-lg overflow-hidden transition-transform hover:scale-110 ${
            customImage ? "border-amber-600 scale-110" : "border-dashed border-amber-400"
          }`}
          style={
            customImage
              ? {
                  backgroundImage: `url(${customImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : { backgroundColor: "#fff8f0" }
          }
        >
          {!customImage && <span className="text-amber-500">+</span>}
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
      </div>
      <p className="text-xs text-amber-600/70">
        {customImage ? "Custom image selected" : THEMES.find((t) => t.id === selectedTheme)?.label}
      </p>
    </div>
  );
}