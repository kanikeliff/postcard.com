import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostcardCard from "../components/PostcardCard";
import { getPostcards, deletePostcard, updatePostcard } from "../utils/localStorage";
import { triggerSend } from "../utils/deliveryLinks";

export default function HomePage() {
  const [postcards, setPostcards] = useState([]);
  const [toast, setToast] = useState(null);
  const [sending, setSending] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setPostcards(getPostcards());
  }, []);

  function showToast(message, type = "success") {
    setToast({ message, type });
    if (type !== "loading") setTimeout(() => setToast(null), 3500);
  }

  function handleDelete(id) {
    if (!confirm("Bu kartpostali silmek istiyor musun?")) return;
    deletePostcard(id);
    setPostcards(getPostcards());
    showToast("Kartpostal silindi.");
  }

  async function handleSend(postcard) {
    if (sending) return;
    setSending(postcard.id);
    showToast("Gönderiliyor...", "loading");
    const result = await triggerSend(postcard);
    setSending(null);
    if (result.success) {
      updatePostcard(postcard.id, { status: "sent", updatedAt: new Date().toISOString() });
      setPostcards(getPostcards());
      showToast(result.message, "success");
    } else {
      showToast(result.message, "error");
    }
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  return (
    <div className="min-h-screen bg-[#fdf8f0]">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl shadow-xl text-sm font-semibold flex items-center gap-2 transition-all ${
          toast.type === "success" ? "bg-green-500 text-white"
          : toast.type === "error" ? "bg-red-500 text-white"
          : "bg-amber-500 text-white"
        }`}>
          {toast.type === "loading" && (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
          )}
          {toast.message}
        </div>
      )}

      <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-b border-amber-200 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-amber-900" style={{ fontFamily: "'Georgia', serif" }}>
              Postcard 💌
            </h1>
            <p className="text-amber-700/70 mt-1 text-sm">Sevdiklerine içten mektuplar gönder.</p>
          </div>
          <button onClick={() => navigate("/create")}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 text-sm">
            + Yeni Kartpostal
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {postcards.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📬</div>
            <p className="text-amber-700/50 text-lg" style={{ fontFamily: "'Georgia', serif" }}>
              Henüz kartpostal yok. İlkini oluştur!
            </p>
            <button onClick={() => navigate("/create")}
              className="mt-6 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-2xl shadow transition-all text-sm">
              Kartpostal Oluştur
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-amber-600/50 uppercase tracking-widest mb-6">
              {postcards.length} kartpostal
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {postcards.map((p) => (
                <PostcardCard key={p.id} postcard={p}
                  onEdit={handleEdit} onDelete={handleDelete}
                  onSend={handleSend} isSending={sending === p.id}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}