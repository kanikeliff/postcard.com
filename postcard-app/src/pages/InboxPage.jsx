import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/ui/PageShell";
import Header from "../components/layout/Header";
import SectionTitle from "../components/layout/SectionTitle";
import PostcardCard from "../components/postcard/PostcardCard";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

export default function InboxPage() {
  const { user } = useAuth();
  const [postcards, setPostcards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    supabase
      .from("postcards")
      .select("*")
      .eq("recipient_email", user.email)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error) setPostcards(data ?? []);
        setLoading(false);
      });
  }, [user]);

  return (
    <PageShell>
      <Header />
      <SectionTitle
        eyebrow="Inbox"
        title="Postcards sent to you 💌"
        subtitle={`Showing postcards sent to ${user?.email}`}
      />

      {loading && <p className="text-stone-500">Loading...</p>}

      {!loading && postcards.length === 0 && (
        <div className="rounded-[32px] bg-white p-10 text-center shadow-lg">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-xl font-semibold text-stone-900">No postcards yet</p>
          <p className="mt-2 text-stone-500 text-sm">
            When someone sends you a postcard to {user?.email}, it will appear here.
          </p>
        </div>
      )}

      {!loading && postcards.length > 0 && (
        <>
          <p className="text-xs text-amber-600/50 uppercase tracking-widest mb-6">
            {postcards.length} postcard{postcards.length !== 1 ? "s" : ""}
          </p>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {postcards.map((p) => (
              <PostcardCard key={p.id} postcard={p} />
            ))}
          </div>
        </>
      )}
    </PageShell>
  );
}
