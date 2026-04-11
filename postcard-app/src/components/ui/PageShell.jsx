export default function PageShell({ children }) {
  return (
    <div className="min-h-screen bg-[#fdf8f0] text-stone-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
