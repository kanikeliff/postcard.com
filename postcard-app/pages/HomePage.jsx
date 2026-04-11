import { Link } from "react-router-dom";
import PageShell from "../components/ui/PageShell";
import Header from "../components/layout/Header";
import Button from "../components/ui/Button";

export default function HomePage() {
  return (
    <PageShell>
      <Header />
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-700">
            Digital letters, but prettier
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-stone-900">
            Send a postcard that feels like it belongs on someone's keepsake shelf
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-stone-600">
            Write visually rich postcards with elegant typography, soft textures, custom imagery,
            and a share link that opens into a beautiful reading experience.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/create"><Button>Write a Postcard</Button></Link>
            <Link to="/sent"><Button variant="secondary">View Sent Postcards</Button></Link>
          </div>
        </div>

        <div className="rounded-[36px] bg-white/70 p-8 shadow-xl backdrop-blur-sm">
          <div className="space-y-3">
            <div className="h-48 rounded-[28px] bg-[linear-gradient(135deg,#f5efe2,#fdf8f0)] flex items-center justify-center text-5xl">
              💌
            </div>
            <p className="text-xl font-semibold text-stone-900">Aesthetic first</p>
            <p className="text-stone-500 text-sm leading-6">
              The email is only the invitation. The postcard itself lives in a beautiful page
              your recipient opens with a single click.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}