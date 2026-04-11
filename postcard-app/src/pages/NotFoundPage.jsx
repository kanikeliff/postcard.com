import { Link } from "react-router-dom";
import PageShell from "../components/ui/PageShell";

export default function NotFoundPage() {
  return (
    <PageShell>
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <div className="text-5xl mb-4">🌫️</div>
        <h1 className="text-4xl font-semibold text-stone-900">Page not found</h1>
        <p className="mt-3 text-stone-500">The letter may have drifted somewhere else.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-amber-500 px-5 py-2.5 text-white hover:bg-amber-600 transition">
          Go Home
        </Link>
      </div>
    </PageShell>
  );
}