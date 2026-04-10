import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostcardForm from "../components/PostcardForm";
import PostcardPreview from "../components/PostcardPreview";
import { savePostcard } from "../utils/localStorage";
import { DEFAULT_POSTCARD } from "../interfaces/postcard";

export default function CreatePostcardPage() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState({ ...DEFAULT_POSTCARD });

  function handleSubmit(formData) {
    const postcard = {
      ...formData,
      id: crypto.randomUUID(),
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    savePostcard(postcard);
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-[#fdf8f0]">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-b border-amber-200 px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-amber-600 hover:text-amber-800 text-sm font-medium"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold text-amber-900" style={{ fontFamily: "'Georgia', serif" }}>
            New Postcard
          </h1>
        </div>
      </div>

      {/* Form + Preview */}
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white/70 backdrop-blur rounded-2xl shadow-lg border border-amber-100 p-6">
          <PostcardForm onSubmit={handleSubmit} onChange={setPreview} />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-amber-600/60">Live Preview</p>
          <PostcardPreview postcard={preview} />
        </div>
      </div>
    </div>
  );
}