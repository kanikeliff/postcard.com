import { TEMPLATES } from "../../constants/templates";
import { cn } from "../../lib/utils";

export default function TemplatePicker({ selectedTemplate, onChange }) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-stone-700">Template</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {TEMPLATES.map((template) => {
          const active = selectedTemplate === template.id;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onChange(template.id)}
              className={cn(
                "rounded-2xl border p-3 text-left transition",
                active
                  ? "border-amber-400 ring-4 ring-amber-100"
                  : "border-stone-200 hover:border-stone-300"
              )}
              style={{ background: template.overlay, backgroundColor: template.bg, color: template.text }}
            >
              <div className="mb-3 h-12 rounded-xl" style={{ backgroundColor: template.bg, border: `1px solid ${template.accent}50` }} />
              <p className="text-xs font-semibold">{template.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}