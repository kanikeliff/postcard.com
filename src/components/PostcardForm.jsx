import { useState } from "react";
import { DEFAULT_POSTCARD } from "../interfaces/postcard";
import ThemePicker from "./ThemePicker";
import DeliveryMethodSelect from "./DeliveryMethodSelect";

export default function PostcardForm({ initialData, onSubmit, onChange }) {
  const [form, setForm] = useState({ ...DEFAULT_POSTCARD, ...initialData });
  const [errors, setErrors] = useState({});

  function update(fields) {
    const next = { ...form, ...fields };
    setForm(next);
    if (onChange) onChange(next);
  }

  function validate() {
    const e = {};
    if (!form.recipientName.trim()) e.recipientName = "Recipient name is required";
    if (!form.content.trim()) e.content = "Message is required";
    if (!form.contact.trim()) e.contact = "Contact is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  }

  const field =
    "w-full border border-amber-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/70 placeholder-amber-300";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Recipient */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-1 block">
          To
        </label>
        <input
          className={field}
          placeholder="Recipient's name"
          value={form.recipientName}
          onChange={(e) => update({ recipientName: e.target.value })}
        />
        {errors.recipientName && <p className="text-red-400 text-xs mt-1">{errors.recipientName}</p>}
      </div>

      {/* Title */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-1 block">
          Subject
        </label>
        <input
          className={field}
          placeholder="A short subject line (optional)"
          value={form.title}
          onChange={(e) => update({ title: e.target.value })}
        />
      </div>

      {/* Content */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-1 block">
          Message
        </label>
        <textarea
          className={`${field} resize-none`}
          rows={5}
          placeholder="Write your message here..."
          value={form.content}
          onChange={(e) => update({ content: e.target.value })}
        />
        {errors.content && <p className="text-red-400 text-xs mt-1">{errors.content}</p>}
      </div>

      {/* Theme */}
      <ThemePicker
        selectedTheme={form.theme}
        customImage={form.customImage}
        onChange={(fields) => update(fields)}
      />

      {/* Delivery */}
      <DeliveryMethodSelect
        method={form.method}
        contact={form.contact}
        onChange={(fields) => update(fields)}
      />
      {errors.contact && <p className="text-red-400 text-xs -mt-4">{errors.contact}</p>}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-md tracking-wide"
      >
        Save Postcard 💌
      </button>
    </form>
  );
}