export default function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <section className="mb-8 max-w-2xl">
      {eyebrow && (
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-700">{eyebrow}</p>
      )}
      <h1 className="text-4xl font-semibold tracking-tight text-stone-900">{title}</h1>
      {subtitle && <p className="mt-3 text-lg leading-8 text-stone-600">{subtitle}</p>}
    </section>
  );
}