import { Link, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePostcardPage from "./pages/CreatePostcardPage";
import EditPostcardPage from "./pages/EditPostcardPage";

function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-rose-100 bg-white/80 backdrop-blur">
        <div className="container-page flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-rose-600">📬 Postcard</h1>
            <p className="text-sm text-slate-500">
              Friends Letter Sender App
            </p>
          </div>

          <nav className="flex gap-3">
            <Link
              to="/"
              className="rounded-xl border border-slate-200 px-4 py-2 font-medium hover:bg-slate-50"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="rounded-xl bg-rose-500 px-4 py-2 font-medium text-white hover:bg-rose-600"
            >
              New Postcard
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePostcardPage />} />
          <Route path="/edit/:id" element={<EditPostcardPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;