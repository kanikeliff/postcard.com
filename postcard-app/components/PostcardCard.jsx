import { Link } from "react-router-dom";
import { getTemplateById } from "../../constants/templates";
import { formatDate } from "../../lib/utils";

const STATUS_STYLES = {
  sent: "bg-amber-100 text-amber-800",
  read: "bg-green-100 text-green-800",
  draft: "bg-stone-100 text-stone-600",
};

export default function PostcardCard({ postcard }) {
  const template = getTemplateById(postcard.template_id);

  return (
    <article className="overflow-hidden rounded-[28px] border border-white/70 bg-white shadow-lg transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative h-48"
        style={
          postcard.custom_image
            ? {
                backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,248,240,0.45)), url(${postcard.custom_image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : { background: template.overlay, backgroundColor: template.bg }
        }
      >
        <div className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${STATUS_STYLES[postcard.status] ?? STATUS_STYLES.draft}`}>
          {postcard.status}
        </div>
      </div>

      <div className="space-y-3 p-5">
        <div>
          <p className="text-sm text-stone-500">To {postcard.recipient_name}</p>
          <h3 className="mt-1 text-xl font-semibold text-stone-900">
            {postcard.title || "Untitled postcard"}
          </h3>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-stone-600">{postcard.content}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-stone-400">{formatDate(postcard.created_at)}</span>
          <Link
            to={`/p/${postcard.share_token}`}
            className="rounded-full bg-stone-900 px-4 py-2 text-xs text-white transition hover:bg-stone-700"
          >
            Open →
          </Link>
        </div>
      </div>
    </article>
  );
}