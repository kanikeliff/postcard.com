import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/ui/PageShell";
import Header from "../components/layout/Header";
import PostcardCard from "../components/postcard/PostcardCard";
import { useAuth } from "../context/AuthContext";
import { getSentPostcards, getProfileStats } from "../services/postcardService";

export default function ProfilePage() {
  const { user } = useAuth();
  const [postcards, setPostcards] = useState([]);
  const [stats, setStats] = useState({ total: 0, read: 0, sent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    Promise.all([getSentPostcards(), getProfileStats(user.email)])
      .then(([cards, s]) => {
        setPostcards(cards);
        setStats(s);
      })
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <PageShell>
      <Header />

      {/* Profile Hero */}
      <div className="mb-10 rounded-[32px] bg-white/80 p-8 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-2xl font-bold text-amber-700 shrink-0">
            {user?.email?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              {user?.email}
            </h1>
            <p className="text-sm text-stone-500 mt-1">Member of Postcard 💌</p>
          </div>
          <Link to="/create">
            <button className="rounded-full bg-amber-500 px-5 py-2.5 text-sm text-white font-medium hover:bg-amber-600 transition shadow-md shadow-amber-200">
              Write a Postcard
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { label: "Total Sent", value: stats.total },
            { label: "Delivered", value: stats.sent },
            { label: "Read", value: stats.read },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-amber-50 p-4 text-center border border-amber-100">
              <p className="text-3xl font-bold text-amber-700">{s.value}</p>
              <p className="text-xs text-stone-500 mt-1 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Postcards */}
      <section>
        <p className="text-xs uppercase tracking-widest text-amber-600/60 mb-6">Your Postcards</p>
        {loading ? (
          <p className="text-stone-500">Loading...</p>
        ) : postcards.length === 0 ? (
          <div className="rounded-[32px] bg-white p-10 text-center shadow-lg">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-stone-500">No postcards yet.</p>
            <Link to="/create">
              <button className="mt-4 rounded-full bg-amber-500 px-5 py-2.5 text-sm text-white hover:bg-amber-600 transition">
                Write your first one
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {postcards.map((p) => (
              <PostcardCard key={p.id} postcard={p} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
