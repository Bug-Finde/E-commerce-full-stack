import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

const shopLinks = [
  { label: "All Jewelry", to: "/products" },
  { label: "New Arrivals", to: "/products?sort=newest" },
  { label: "Best Sellers", to: "/products?sort=rating-desc" },
  { label: "Collections", to: "/products" },
];

const careLinks = [
  { label: "Contact Us", to: "/contact" },
  { label: "Shipping Information", to: "/shipping" },
  { label: "Returns & Exchanges", to: "/returns" },
  { label: "Jewelry Care", to: "/jewelry-care" },
  { label: "FAQs", to: "/faq" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms & Conditions", to: "/terms" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer style={{ background: "var(--mj-charcoal)", color: "white" }}>
      {/* Main footer content */}
      <div className="container-mj py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr_1.2fr]">

          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5" aria-label="Meri Jewelry">
              {/* Logo shown with brightness invert so it appears white/gold on dark bg */}
              <img
                src="/meri-jewelry-logo.svg"
                alt="Meri Jewelry"
                className="h-14 w-14 object-contain"
                style={{ filter: "brightness(0) invert(1) sepia(1) saturate(1.5) hue-rotate(350deg)", opacity: 0.85 }}
                onError={(e) => { e.target.style.display = "none"; }}
              />
              <span style={{ fontFamily: "var(--font-display)" }}>
                <span
                  className="block text-2xl font-semibold italic leading-none"
                  style={{ color: "var(--mj-gold-light)" }}
                >
                  Meri
                </span>
                <span
                  className="block text-[0.6rem] font-bold tracking-[0.22em] uppercase"
                  style={{ color: "rgba(228,201,138,0.7)" }}
                >
                  Jewelry
                </span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)", maxWidth: "240px" }}>
              Premium handcrafted jewelry blending timeless elegance with South Asian tradition.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 mb-6">
              <a
                href="https://wa.me/923001234567"
                className="flex items-center gap-2.5 text-sm transition-colors hover:text-[var(--mj-gold-light)]"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <FaWhatsapp className="w-4 h-4 shrink-0 text-green-400" />
                +92 300 123 4567
              </a>
              <a
                href="mailto:hello@merijewelry.com"
                className="flex items-center gap-2.5 text-sm transition-colors hover:text-[var(--mj-gold-light)]"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <Mail className="w-4 h-4 shrink-0" style={{ color: "var(--mj-gold)" }} />
                hello@merijewelry.com
              </a>
              <p
                className="flex items-start gap-2.5 text-sm"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "var(--mj-gold)" }} />
                Lahore, Pakistan
              </p>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/merijewelry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-9 h-9 items-center justify-center rounded-full border transition-all hover:scale-105"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/merijewelry"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-9 h-9 items-center justify-center rounded-full border transition-all hover:scale-105"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-9 h-9 items-center justify-center rounded-full border transition-all hover:scale-105"
                style={{ borderColor: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)" }}
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h4
              className="mb-5 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "var(--mj-gold)", letterSpacing: "0.18em" }}
            >
              Shop
            </h4>
            <ul className="space-y-3">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors hover:text-[var(--mj-gold-light)]"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care column */}
          <div>
            <h4
              className="mb-5 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "var(--mj-gold)", letterSpacing: "0.18em" }}
            >
              Customer Care
            </h4>
            <ul className="space-y-3">
              {careLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors hover:text-[var(--mj-gold-light)]"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4
              className="mb-5 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "var(--mj-gold)", letterSpacing: "0.18em" }}
            >
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm transition-colors hover:text-[var(--mj-gold-light)]"
                    style={{ color: "rgba(255,255,255,0.55)" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h4
              className="mb-5 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "var(--mj-gold)", letterSpacing: "0.18em" }}
            >
              Stay Connected
            </h4>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
              Subscribe for new arrivals, exclusive offers, and styling inspiration.
            </p>

            {subscribed ? (
              <div
                className="rounded-lg px-4 py-3 text-sm font-medium"
                style={{ background: "rgba(201,169,110,0.15)", color: "var(--mj-gold-light)", border: "1px solid rgba(201,169,110,0.3)" }}
              >
                ✦ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-3 text-sm rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "white",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  className="w-full py-3 btn-gold rounded-lg text-[11px] font-bold"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-gold opacity-20" />

      {/* Bottom bar */}
      <div className="container-mj py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          <span>© {new Date().getFullYear()} Meri Jewelry. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <a href="http://www.merijewelry.com" className="hover:text-[var(--mj-gold-light)] transition-colors">
              www.merijewelry.com
            </a>
            <span>·</span>
            <Link to="/privacy" className="hover:text-[var(--mj-gold-light)] transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-[var(--mj-gold-light)] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
