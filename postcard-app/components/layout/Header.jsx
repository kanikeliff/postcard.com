import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const navLink = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm transition ${isActive ? "bg-white font-semibold text-stone-900 shadow-sm" : "text-stone-600 hover:bg-white/60"}`;

  return (
    <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <Link to="/" className="text-3xl font-semibold tracking-tight text-stone-900">
        Postcard <span className="text-amber-500">💌</span>
      </Link>

      <nav className="flex items-center gap-1">
        <NavLink to="/" end className={navLink}>Home</NavLink>
        <NavLink to="/sent" className={navLink}>Sent</NavLink>
        <NavLink
          to="/create"
          className="ml-2 rounded-full bg-amber-500 px-4 py-2 text-sm text-white transition hover:bg-amber-600 shadow-md shadow-amber-200"
        >
          Write a Postcard
        </NavLink>
      </nav>
    </header>
  );
}
