import { useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/ui/PageShell";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { signUpWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signUpWithEmail(email, password);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <PageShell>
        <div className="mx-auto max-w-md pt-16">
          <div className="rounded-[32px] bg-white/80 p-8 shadow-xl text-center">
            <div className="text-5xl mb-4">💌</div>
            <h2 className="text-2xl font-semibold text-stone-900 mb-2">You're in!</h2>
            <p className="text-stone-500 text-sm mb-6">Account created successfully.</p>
            <Link to="/login" className="text-amber-600 hover:underline text-sm font-medium">
              Sign in now →
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-md pt-16">
        <div className="rounded-[32px] bg-white/80 p-8 shadow-xl backdrop-blur-sm">
          <h1 className="mb-2 text-3xl font-semibold text-stone-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create account
          </h1>
          <p className="mb-8 text-sm text-stone-500">Start sending beautiful postcards</p>

          {error && (
            <div className="mb-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" required />
            <Input label="Password" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="min. 6 characters" required minLength={6} />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-600 hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
