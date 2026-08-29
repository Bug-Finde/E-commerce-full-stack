import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Truck, ShieldCheck, Package, MessageCircle } from "lucide-react";
import HeroBanner from "../components/HeroBanner";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import axiosInstance from "./api/axios";
import { FaInstagram } from "react-icons/fa";

// SVG icon components for each jewelry category
const CategoryIcon = ({ name }) => {
  const icons = {
    Necklaces: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M8 14 Q8 6 20 6 Q32 6 32 14" stroke="url(#mjCat)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M8 14 Q6 24 14 30 Q20 34 26 30 Q34 24 32 14" stroke="url(#mjCat)" strokeWidth="1.8" fill="none"/>
        {/* pendant drop */}
        <line x1="20" y1="30" x2="20" y2="34" stroke="url(#mjCat)" strokeWidth="1.5"/>
        <ellipse cx="20" cy="36.5" rx="2.5" ry="3" fill="url(#mjCatFill)" opacity="0.85"/>
        <defs>
          <linearGradient id="mjCat" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E4C98A"/><stop offset="100%" stopColor="#A07840"/>
          </linearGradient>
          <linearGradient id="mjCatFill" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E4C98A"/><stop offset="100%" stopColor="#C9A96E"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    Earrings: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <defs>
          <linearGradient id="mjEar" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E4C98A"/><stop offset="100%" stopColor="#A07840"/>
          </linearGradient>
        </defs>
        {/* left earring */}
        <circle cx="13" cy="9" r="2.5" stroke="url(#mjEar)" strokeWidth="1.8" fill="none"/>
        <line x1="13" y1="11.5" x2="13" y2="17" stroke="url(#mjEar)" strokeWidth="1.5"/>
        <path d="M10 17 Q13 23 16 17" stroke="url(#mjEar)" strokeWidth="1.5" fill="none"/>
        <ellipse cx="13" cy="25" rx="2" ry="3" stroke="url(#mjEar)" strokeWidth="1.5" fill="none"/>
        {/* right earring */}
        <circle cx="27" cy="9" r="2.5" stroke="url(#mjEar)" strokeWidth="1.8" fill="none"/>
        <line x1="27" y1="11.5" x2="27" y2="17" stroke="url(#mjEar)" strokeWidth="1.5"/>
        <path d="M24 17 Q27 23 30 17" stroke="url(#mjEar)" strokeWidth="1.5" fill="none"/>
        <ellipse cx="27" cy="25" rx="2" ry="3" stroke="url(#mjEar)" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    Jhumkas: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <defs>
          <linearGradient id="mjJhum" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E8B4A0"/><stop offset="100%" stopColor="#A8565A"/>
          </linearGradient>
        </defs>
        {/* hook */}
        <path d="M20 4 Q26 4 26 10 L26 13" stroke="url(#mjJhum)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* top disc */}
        <ellipse cx="20" cy="16" rx="7" ry="3.5" stroke="url(#mjJhum)" strokeWidth="1.8" fill="none"/>
        {/* dome bell */}
        <path d="M13 16 Q13 28 20 30 Q27 28 27 16" stroke="url(#mjJhum)" strokeWidth="1.8" fill="none"/>
        {/* hanging beads */}
        <line x1="15" y1="30" x2="14" y2="35" stroke="url(#mjJhum)" strokeWidth="1.2"/>
        <circle cx="14" cy="36" r="1.5" fill="url(#mjJhum)"/>
        <line x1="20" y1="30" x2="20" y2="35" stroke="url(#mjJhum)" strokeWidth="1.2"/>
        <circle cx="20" cy="36" r="1.5" fill="url(#mjJhum)"/>
        <line x1="25" y1="30" x2="26" y2="35" stroke="url(#mjJhum)" strokeWidth="1.2"/>
        <circle cx="26" cy="36" r="1.5" fill="url(#mjJhum)"/>
      </svg>
    ),
    Rings: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <defs>
          <linearGradient id="mjRing" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E4C98A"/><stop offset="100%" stopColor="#A07840"/>
          </linearGradient>
        </defs>
        {/* ring band */}
        <ellipse cx="20" cy="26" rx="10" ry="5" stroke="url(#mjRing)" strokeWidth="2" fill="none"/>
        <line x1="10" y1="26" x2="10" y2="20" stroke="url(#mjRing)" strokeWidth="2"/>
        <line x1="30" y1="26" x2="30" y2="20" stroke="url(#mjRing)" strokeWidth="2"/>
        <ellipse cx="20" cy="20" rx="10" ry="5" stroke="url(#mjRing)" strokeWidth="2" fill="none"/>
        {/* gem setting */}
        <polygon points="20,8 24,14 20,16 16,14" stroke="url(#mjRing)" strokeWidth="1.5" fill="none"/>
        <line x1="20" y1="8" x2="20" y2="16" stroke="url(#mjRing)" strokeWidth="1" opacity="0.5"/>
        <line x1="16" y1="14" x2="24" y2="14" stroke="url(#mjRing)" strokeWidth="1" opacity="0.5"/>
      </svg>
    ),
    Bracelets: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <defs>
          <linearGradient id="mjBrac" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E4C98A"/><stop offset="100%" stopColor="#A07840"/>
          </linearGradient>
        </defs>
        {/* bracelet chain oval */}
        <ellipse cx="20" cy="22" rx="13" ry="8" stroke="url(#mjBrac)" strokeWidth="2" fill="none"/>
        {/* chain links */}
        <ellipse cx="20" cy="14" rx="3" ry="1.8" stroke="url(#mjBrac)" strokeWidth="1.4" fill="none"/>
        {/* charm drop */}
        <line x1="20" y1="30" x2="20" y2="34" stroke="url(#mjBrac)" strokeWidth="1.4"/>
        <polygon points="20,34 23,38 17,38" fill="url(#mjBrac)" opacity="0.8"/>
        {/* link dots */}
        <circle cx="9"  cy="19" r="1.2" fill="url(#mjBrac)"/>
        <circle cx="31" cy="19" r="1.2" fill="url(#mjBrac)"/>
        <circle cx="9"  cy="25" r="1.2" fill="url(#mjBrac)"/>
        <circle cx="31" cy="25" r="1.2" fill="url(#mjBrac)"/>
      </svg>
    ),
    Bangles: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <defs>
          <linearGradient id="mjBang" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E8B4A0"/><stop offset="100%" stopColor="#A8565A"/>
          </linearGradient>
        </defs>
        {/* outer bangle */}
        <circle cx="20" cy="20" r="14" stroke="url(#mjBang)" strokeWidth="2.5" fill="none"/>
        {/* inner bangle */}
        <circle cx="20" cy="20" r="9"  stroke="url(#mjBang)" strokeWidth="1.5" fill="none" opacity="0.6"/>
        {/* decorative notches */}
        <circle cx="20"  cy="6"  r="1.5" fill="url(#mjBang)"/>
        <circle cx="34"  cy="20" r="1.5" fill="url(#mjBang)"/>
        <circle cx="20"  cy="34" r="1.5" fill="url(#mjBang)"/>
        <circle cx="6"   cy="20" r="1.5" fill="url(#mjBang)"/>
      </svg>
    ),
    "Matha Sets": (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <defs>
          <linearGradient id="mjMath" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E4C98A"/><stop offset="100%" stopColor="#A07840"/>
          </linearGradient>
        </defs>
        {/* headband arc */}
        <path d="M6 16 Q20 6 34 16" stroke="url(#mjMath)" strokeWidth="2" fill="none" strokeLinecap="round"/>
        {/* center chain drop */}
        <line x1="20" y1="9"  x2="20" y2="20" stroke="url(#mjMath)" strokeWidth="1.5"/>
        <polygon points="20,20 24,26 20,28 16,26" stroke="url(#mjMath)" strokeWidth="1.5" fill="none"/>
        <circle cx="20" cy="24" r="1.5" fill="url(#mjMath)" opacity="0.7"/>
        {/* side drops */}
        <line x1="10" y1="14" x2="9"  y2="22" stroke="url(#mjMath)" strokeWidth="1.2"/>
        <circle cx="9"  cy="23.5" r="1.5" fill="url(#mjMath)" opacity="0.8"/>
        <line x1="30" y1="14" x2="31" y2="22" stroke="url(#mjMath)" strokeWidth="1.2"/>
        <circle cx="31" cy="23.5" r="1.5" fill="url(#mjMath)" opacity="0.8"/>
        {/* small gems on band */}
        <circle cx="14" cy="12" r="1.2" fill="url(#mjMath)"/>
        <circle cx="26" cy="12" r="1.2" fill="url(#mjMath)"/>
      </svg>
    ),
    "Jewelry Sets": (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <defs>
          <linearGradient id="mjSet" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E4C98A"/><stop offset="100%" stopColor="#A07840"/>
          </linearGradient>
        </defs>
        {/* mini necklace top */}
        <path d="M10 9 Q20 5 30 9" stroke="url(#mjSet)" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
        <line x1="20" y1="6" x2="20" y2="11" stroke="url(#mjSet)" strokeWidth="1.4"/>
        <ellipse cx="20" cy="12.5" rx="2" ry="2.5" stroke="url(#mjSet)" strokeWidth="1.4" fill="none"/>
        {/* mini ring bottom-left */}
        <circle cx="11" cy="28" r="5.5" stroke="url(#mjSet)" strokeWidth="1.8" fill="none"/>
        <circle cx="11" cy="28" r="2.5" stroke="url(#mjSet)" strokeWidth="1.2" fill="none" opacity="0.5"/>
        {/* mini earring bottom-right */}
        <circle cx="29" cy="23" r="2" stroke="url(#mjSet)" strokeWidth="1.5" fill="none"/>
        <line x1="29" y1="25" x2="29" y2="29" stroke="url(#mjSet)" strokeWidth="1.4"/>
        <path d="M26.5 29 Q29 33 31.5 29" stroke="url(#mjSet)" strokeWidth="1.4" fill="none"/>
        <circle cx="29" cy="34" r="1.8" stroke="url(#mjSet)" strokeWidth="1.4" fill="none"/>
      </svg>
    ),
  };
  return icons[name] || null;
};

const CATEGORIES = [
  { name: "Necklaces"    },
  { name: "Earrings"     },
  { name: "Jhumkas"      },
  { name: "Rings"        },
  { name: "Bracelets"    },
  { name: "Bangles"      },
  { name: "Matha Sets"   },
  { name: "Jewelry Sets" },
];

const TRUST = [
  { icon: Truck,         title: "Nationwide Delivery",     desc: "Fast, reliable shipping across Pakistan" },
  { icon: ShieldCheck,   title: "Secure & Packed Safely",  desc: "Every order wrapped with care" },
  { icon: Package,       title: "Cash on Delivery",        desc: "Pay when your order arrives" },
  { icon: MessageCircle, title: "Easy Customer Support",   desc: "We're always here to help" },
];

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <p className="subheading mb-3">{eyebrow}</p>
      <h2 className="heading-display text-4xl sm:text-5xl mb-4">{title}</h2>
      {subtitle && (
        <p className="text-sm max-w-md mx-auto" style={{ color: "var(--mj-text-muted)" }}>{subtitle}</p>
      )}
    </div>
  );
}

export default function Home() {
  const [featured, setFeatured]     = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading]       = useState(true);

  useEffect(() => {
    Promise.all([
      axiosInstance.get("product/get-products", { params: { limit: 8 } }),
      axiosInstance.get("product/get-products", { params: { limit: 4, sort: "newest" } }),
    ]).then(([f, n]) => {
      if (f.data.success) setFeatured(f.data.data || []);
      if (n.data.success) setNewArrivals(n.data.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <HeroBanner />

      {/* ── Trust strip ── */}
      <div style={{ background: "var(--mj-charcoal)" }} className="py-8">
        <div className="container-mj">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(201,169,110,0.15)" }}>
                  <Icon className="w-4 h-4" style={{ color: "var(--mj-gold)" }} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">{title}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.5)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Shop by Category ── */}
      <section className="py-20" style={{ background: "var(--mj-ivory)" }}>
        <div className="container-mj">
          <SectionHeader eyebrow="Explore" title="Shop by Category" />
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map((cat, i) => (
              <motion.div key={cat.name}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <Link to={`/products?category=${encodeURIComponent(cat.name)}`}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl text-center transition-all hover:-translate-y-1 hover:shadow-md group"
                  style={{ background: "white", border: "1px solid var(--mj-border)" }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                    style={{ background: "var(--mj-cream)" }}>
                    <CategoryIcon name={cat.name} />
                  </div>
                  <span className="text-[11px] font-semibold leading-tight" style={{ color: "var(--mj-warm-brown)" }}>
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-20" style={{ background: "var(--mj-cream)" }}>
        <div className="container-mj">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="subheading mb-3">Handpicked</p>
              <h2 className="heading-display text-4xl sm:text-5xl">Featured Jewelry</h2>
            </div>
            <Link to="/products"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold transition-colors hover:text-[var(--mj-gold-dark)]"
              style={{ color: "var(--mj-text-muted)" }}>
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden"
                  style={{ border: "1px solid var(--mj-border-light)" }}>
                  <div className="skeleton aspect-[3/4]" />
                  <div className="p-4 space-y-2">
                    <div className="skeleton h-3 rounded w-1/2" />
                    <div className="skeleton h-4 rounded" />
                    <div className="skeleton h-3 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>
                No products yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featured.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>
          )}

          <div className="text-center mt-10 sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-2 px-6 py-3 btn-gold rounded-lg text-xs">
              View All Jewelry <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section className="py-24" style={{ background: "var(--mj-ivory)" }}>
        <div className="container-mj">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <p className="subheading mb-4">About Us</p>
              <h2 className="heading-display text-4xl sm:text-5xl mb-6">
                Where Elegance<br />Meets Tradition
              </h2>
              <div className="space-y-4 text-sm leading-relaxed mb-8"
                style={{ color: "var(--mj-text-muted)" }}>
                <p>
                  Meri Jewelry was born from a deep love of South Asian craftsmanship and a vision
                  to make premium, elegant jewelry accessible to every woman.
                </p>
                <p>
                  Each piece in our collection is thoughtfully designed to celebrate timeless beauty
                  — from delicate everyday earrings to stunning bridal sets.
                </p>
              </div>
              {/* Value pills */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Handcrafted", "Premium Quality", "South Asian Heritage", "Cash on Delivery"].map((v) => (
                  <span
                    key={v}
                    className="px-3.5 py-1.5 rounded-full text-[11px] font-semibold"
                    style={{ background: "var(--mj-cream)", color: "var(--mj-warm-brown)", border: "1px solid var(--mj-border)" }}
                  >
                    {v}
                  </span>
                ))}
              </div>
              <Link to="/about"
                className="inline-flex items-center gap-2 px-7 py-3 btn-outline rounded-lg text-xs">
                Our Story <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center">
              <div
                className="relative w-full max-w-sm aspect-square rounded-3xl flex flex-col items-center justify-center overflow-hidden"
                style={{
                  background: "linear-gradient(145deg, var(--mj-ivory) 0%, var(--mj-blush) 60%, #F0C8BC 100%)",
                  border: "1px solid var(--mj-blush-dark)",
                }}
              >
                {/* Subtle decorative rings */}
                <div
                  className="absolute inset-6 rounded-full opacity-20 pointer-events-none"
                  style={{ border: "1px solid var(--mj-gold)" }}
                />
                <div
                  className="absolute inset-12 rounded-full opacity-10 pointer-events-none"
                  style={{ border: "1px solid var(--mj-gold)" }}
                />
                <img
                  src="/meri-jewelry-logo.png"
                  alt="Meri Jewelry"
                  className="relative z-10 w-4/5 h-4/5 object-contain"
                  style={{ borderRadius: "50%", filter: "drop-shadow(0 6px 24px rgba(168,86,90,0.2))" }}
                  onError={e => { e.target.style.display = "none"; }}
                />
                {/* Bottom label */}
                <div
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", border: "1px solid var(--mj-border)" }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.18em] whitespace-nowrap"
                    style={{ color: "var(--mj-gold-dark)" }}
                  >
                    Est. 2024 · Lahore, Pakistan
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      {newArrivals.length > 0 && (
        <section className="py-20" style={{ background: "var(--mj-cream)" }}>
          <div className="container-mj">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="subheading mb-3">Just In</p>
                <h2 className="heading-display text-4xl sm:text-5xl">New Arrivals</h2>
              </div>
              <Link to="/products?sort=newest"
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold hover:text-[var(--mj-gold-dark)] transition-colors"
                style={{ color: "var(--mj-text-muted)" }}>
                See All <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {newArrivals.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Instagram CTA ── */}
      <section className="py-20" style={{ background: "var(--mj-charcoal)" }}>
        <div className="container-mj text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <FaInstagram className="w-8 h-8 mx-auto mb-4" style={{ color: "var(--mj-gold)" }} />
            <h2 className="heading-display text-3xl sm:text-4xl text-white mb-3">
              Follow Our Journey
            </h2>
            <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              Tag us in your photos and be featured on our page.
            </p>
            <a href="https://instagram.com/merijewelry" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 btn-gold rounded-lg text-xs font-bold">
              <FaInstagram className="w-4 h-4" />
              Follow @merijewelry
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
