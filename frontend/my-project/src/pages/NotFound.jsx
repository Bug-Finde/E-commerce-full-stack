import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <>
      <Navbar />
      <div
        style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}
        className="flex flex-col items-center justify-center px-6 py-24 text-center"
      >
        {/* Decorative number */}
        <p
          className="font-bold select-none mb-6 leading-none"
          style={{
            fontSize: "clamp(6rem, 20vw, 12rem)",
            fontFamily: "var(--font-display)",
            color: "var(--mj-blush)",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </p>

        {/* Gold divider */}
        <div
          className="mx-auto mb-8 rounded-full"
          style={{ width: 64, height: 2, background: "var(--mj-gold)" }}
        />

        <p className="subheading mb-3">Page Not Found</p>
        <h1
          className="heading-display text-3xl sm:text-4xl mb-4"
          style={{ color: "var(--mj-charcoal)" }}
        >
          This page doesn't exist
        </h1>
        <p
          className="text-sm leading-relaxed mb-10 max-w-sm"
          style={{ color: "var(--mj-text-muted)" }}
        >
          The page{" "}
          <code
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ background: "var(--mj-cream)", color: "var(--mj-warm-brown)" }}
          >
            {pathname}
          </code>{" "}
          could not be found. It may have been moved, deleted, or never existed.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 px-7 py-3 btn-gold rounded-lg text-xs font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <Link
            to="/products"
            className="flex items-center gap-2 px-7 py-3 btn-outline rounded-lg text-xs font-bold"
          >
            <Search className="w-3.5 h-3.5" />
            Browse Jewelry
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
