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

const CATEGORIES = [
  { name: "Necklaces",      emoji: "📿" },
  { name: "Earrings",       emoji: "✨" },
  { name: "Jhumkas",        emoji: "🔮" },
  { name: "Rings",          emoji: "💍" },
  { name: "Bracelets",      emoji: "📿" },
  { name: "Bangles",        emoji: "🌀" },
  { name: "Matha Sets",     emoji: "👸" },
  { name: "Jewelry Sets",   emoji: "💎" },
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
                  className="flex flex-col items-center gap-2.5 p-4 rounded-xl text-center transition-all hover:-translate-y-1 hover:shadow-md"
                  style={{ background: "white", border: "1px solid var(--mj-border)" }}>
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="text-[11px] font-semibold" style={{ color: "var(--mj-warm-brown)" }}>
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
      <section className="py-20" style={{ background: "var(--mj-ivory)" }}>
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
              <Link to="/about"
                className="inline-flex items-center gap-2 px-7 py-3 btn-outline rounded-lg text-xs">
                Our Story <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="flex justify-center">
              <div className="aspect-square rounded-2xl overflow-hidden w-full max-w-sm flex items-center justify-center"
                style={{ background: "var(--mj-blush)", border: "1px solid var(--mj-blush-dark)" }}>
                <img src="/meri-jewelry-logo.svg" alt="Meri Jewelry"
                  className="w-48 h-48 object-contain"
                  onError={e => { e.target.style.display = "none"; }} />
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
