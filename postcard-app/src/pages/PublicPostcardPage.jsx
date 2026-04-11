import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageShell from "../components/ui/PageShell";
import PostcardPreview from "../components/postcard/PostcardPreview";
import Button from "../components/ui/Button";
import { getPublicPostcardByToken, markPostcardAsRead } from "../services/postcardService";

function mapDbToViewModel(row) {
  return {
    recipientName: row.recipient_name,
    recipientEmail: row.recipient_email,
    title: row.title,
    content: row.content,
    templateId: row.template_id,
    customImage: row.custom_image,
    titleFont: row.title_font,
    bodyFont: row.body_font,
    textAlign: row.text_align,
    signature: row.signature,
    status: row.status,
  };
}

export default function PublicPostcardPage() {
  const { shareToken } = useParams();
  const [postcard, setPostcard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPublicPostcardByToken(shareToken);
        setPostcard(data);
        await markPostcardAsRead(shareToken);
      } catch {
        setPostcard(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [shareToken]);

  if (loading) {
    return (
      <PageShell>
        <div className="flex min-h-[70vh] items-center justify-center text-stone-500">
          Opening your postcard...
        </div>
      </PageShell>
    );
  }

  if (!postcard) {
    return (
      <PageShell>
        <div className="mx-auto max-w-xl rounded-[32px] bg-white p-8 text-center shadow-lg">
          <div className="text-4xl mb-4">📪</div>
          <h1 className="text-2xl font-semibold text-stone-900">Postcard not found</h1>
          <p className="mt-3 text-stone-500">This link may be invalid or no longer public.</p>
          <Link to="/" className="mt-6 inline-block">
            <Button>Go Home</Button>
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto flex min-h-[80vh] max-w-5xl flex-col items-center justify-center gap-10">
        <div className="text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-amber-700">A postcard for you</p>
          <h1 className="text-4xl font-semibold tracking-tight text-stone-900">
            Someone sent you a beautiful note
          </h1>
        </div>

        <PostcardPreview postcard={mapDbToViewModel(postcard)} />

        <div className="text-center">
          <p className="mb-4 max-w-md text-sm leading-7 text-stone-500">
            Want to reply with your own postcard? Join Postcard and send aesthetic letters back.
          </p>
          <Link to="/create"><Button>Create your reply ✦</Button></Link>
        </div>
      </div>
    </PageShell>
  );
}