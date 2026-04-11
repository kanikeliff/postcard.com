export default function Textarea({ label, error, ...props }) {
  return (
    <label className="block space-y-2">
      {label && <span className="text-sm font-medium text-stone-700">{label}</span>}
      <textarea
        className="min-h-[160px] w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 text-stone-800 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </label>
  );
}