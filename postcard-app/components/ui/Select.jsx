export default function Select({ label, options = [], error, ...props }) {
  return (
    <label className="block space-y-2">
      {label && <span className="text-sm font-medium text-stone-700">{label}</span>}
      <select
        className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-800 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt.id} value={opt.value ?? opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </label>
  );
}