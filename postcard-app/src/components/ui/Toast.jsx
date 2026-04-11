export default function Toast({ toast }) {
  if (!toast) return null;

  const styles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    loading: "bg-amber-500 text-white",
  };

  return (
    <div className={`fixed top-5 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold shadow-xl transition-all ${styles[toast.type] ?? styles.success}`}>
      {toast.type === "loading" && (
        <svg className="animate-spin w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {toast.message}
    </div>
  );
}
