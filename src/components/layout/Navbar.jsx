import { Link } from "react-router-dom";
import { FaBrain } from "react-icons/fa";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center">
            <FaBrain className="text-cyan-400 text-xl" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              MediQuery AI
            </h1>

            <p className="text-xs text-zinc-400">
              Medical Document Assistant
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-zinc-300 hover:text-cyan-400 transition"
          >
            Home
          </Link>

          <Link
            to="/chat"
            className="text-zinc-300 hover:text-cyan-400 transition"
          >
            Chat
          </Link>
        </nav>
      </div>
    </header>
  );
}