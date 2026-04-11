import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/ui/PageShell";
import Header from "../components/layout/Header";
import SectionTitle from "../components/layout/SectionTitle";
import PostcardCard from "../components/postcard/PostcardCard";
import Button from "../components/ui/Button";
import { getSentPostcards } from "../services/postcardService";

export default function SentPage() {
  const [postcards, setPostcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSentPostcards(null)
      .then(setPostcards)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageShell>
      <Header />
      <SectionTitle eyebrow="Sent" title="Your delivered postcards" />

      {loading && <p className="text-stone-500">Loading postcards...</p>}

      {error && (
        <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 text-red-700">
          <p className="font-medium">Could not load postcards</p>
          <p className="mt-1 text-sm">{error}</p>
          <p className="mt-2 text-sm">Make sure your Supabase environment variables are set correctly.</p>
        </div>
      )}

      {!loading && !error && postcards.length === 0 && (
        <div className="rounded-[32px] bg-white p-10 text-center shadow-lg">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-xl font-semibold text-stone-900">No postcards yet</p>
          <p className="mt-2 text-stone-500 text-sm">Write your first one and make someone's day.</p>
          <Link to="/create" className="mt-6 inline-block">
            <Button>Write a Postcard</Button>
          </Link>
        </div>
      )}

      {!loading && !error && postcards.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {postcards.map((postcard) => (
            <PostcardCard key={postcard.id} postcard={postcard} />
          ))}
        </div>
      )}
    </PageShell>
  );
}