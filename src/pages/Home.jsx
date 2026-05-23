import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import UploadBox from "../components/upload/UploadBox";

export default function Home() {
  return (
    <section className="relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/20 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 text-sm mb-8">
            AI Powered Medical Assistant
          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">
            Chat With Your
            <span className="block text-cyan-400">
              Medical Documents
            </span>
          </h1>

          <p className="mt-8 text-xl text-zinc-400 max-w-2xl leading-relaxed">
            Upload PDFs, ask questions, and get intelligent AI-powered
            medical insights instantly using Retrieval-Augmented Generation.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-10">

            <Link
              to="/chat"
              className="px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition text-black font-semibold"
            >
              Start Chatting
            </Link>

            <button
              className="px-8 py-4 rounded-2xl border border-zinc-700 hover:border-cyan-500 transition text-white"
            >
              View Demo
            </button>

          </div>

          <UploadBox />
          
        </motion.div>
      </div>
    </section>
  );
}