import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navLink = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm transition ${isActive ? "bg-white font-semibold text-stone-900 shadow-sm" : "text-stone-600 hover:bg-white/60"}`;

  async function handleSignOut() {
    await signOut();
    navigate("/login");
  }

  return (
    <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Link to="/" className="text-3xl font-semibold tracking-tight text-stone-900">
        Postcard <span className="text-amber-500">💌</span>
      </Link>

      <nav className="flex items-center gap-1 flex-wrap">
        {user ? (
          <>
            <NavLink to="/" end className={navLink}>Home</NavLink>
            <NavLink to="/inbox" className={navLink}>Inbox 📬</NavLink>
            <NavLink to="/sent" className={navLink}>Sent</NavLink>
            <NavLink to="/profile" className={navLink}>Profile</NavLink>
            <button
              onClick={handleSignOut}
              className="rounded-full border border-stone-200 px-4 py-2 text-sm text-stone-600 transition hover:bg-stone-100"
            >
              Sign out
            </button>
            <NavLink
              to="/create"
              className="ml-1 rounded-full bg-amber-500 px-4 py-2 text-sm text-white transition hover:bg-amber-600 shadow-md shadow-amber-200"
            >
              Write a Postcard
            </NavLink>
          </>
        ) : (
          <>
            <Link to="/login" className="rounded-full px-4 py-2 text-sm text-stone-600 transition hover:bg-white/60">
              Sign in
            </Link>
            <Link to="/register" className="rounded-full bg-amber-500 px-4 py-2 text-sm text-white transition hover:bg-amber-600 shadow-md shadow-amber-200">
              Get started
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
