import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageShell from "../components/ui/PageShell";
import Header from "../components/layout/Header";
import SectionTitle from "../components/layout/SectionTitle";
import PostcardEditor from "../components/postcard/PostcardEditor";
import PostcardPreview from "../components/postcard/PostcardPreview";
import Toast from "../components/ui/Toast";
import { usePostcardDraft } from "../hooks/usePostcardDraft";
import { useToast } from "../hooks/useToast";
import { createPostcard } from "../services/postcardService";
import { sendPostcardLinkEmail } from "../services/emailService";

export default function CreatePostcardPage() {
  const navigate = useNavigate();
  const { draft, updateField } = usePostcardDraft();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast, showToast } = useToast();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      showToast("Creating your postcard...", "loading");

      const postcard = await createPostcard(draft);
      const emailResult = await sendPostcardLinkEmail(postcard);

      if (!emailResult.success) {
        showToast(emailResult.message, "error");
        return;
      }

      showToast("Postcard sent! 💌", "success");
      setTimeout(() => navigate("/sent"), 1200);
    } catch (error) {
      console.error(error);
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <Toast toast={toast} />
      <Header />
      <SectionTitle eyebrow="Create" title="Write something that feels beautiful to open" />
      <div className="grid gap-8 lg:grid-cols-[1.05fr_1.25fr]">
        <div className="rounded-[32px] bg-white/80 p-6 shadow-lg backdrop-blur-sm">
          <PostcardEditor
            value={draft}
            onChange={updateField}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
        <div className="flex items-start justify-center rounded-[32px] bg-[#f8f1e8] p-4 sm:p-6">
          <PostcardPreview postcard={draft} />
        </div>
      </div>
    </PageShell>
  );
}