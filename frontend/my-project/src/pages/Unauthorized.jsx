import { Link } from "react-router-dom";
import { ShieldX, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Unauthorized() {
  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}
        className="flex flex-col items-center justify-center gap-5 py-20 text-center px-6">
        <div className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "var(--mj-blush)" }}>
          <ShieldX className="w-9 h-9" style={{ color: "var(--mj-rose)" }} />
        </div>
        <h1 className="heading-display text-4xl sm:text-5xl">Access Denied</h1>
        <p className="text-sm max-w-xs" style={{ color: "var(--mj-text-muted)" }}>
          You don't have permission to view this page.
        </p>
        <Link to="/"
          className="mt-2 flex items-center gap-2 px-8 py-3 btn-gold rounded-lg text-xs">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Home
        </Link>
      </div>
      <Footer />
    </>
  );
}
