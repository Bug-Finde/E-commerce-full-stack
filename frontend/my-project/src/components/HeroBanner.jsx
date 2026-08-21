import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Truck, ShieldCheck, Package, Star } from "lucide-react";
import { Link } from "react-router-dom";

const trustItems = [
  { icon: Truck,        label: "Nationwide Delivery" },
  { icon: ShieldCheck,  label: "Secure Packaging" },
  { icon: Package,      label: "Cash on Delivery" },
];

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--mj-cream)" }}>

      {/* Decorative blush circle */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "var(--mj-blush)", opacity: 0.35 }} />
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "var(--mj-blush)", opacity: 0.25 }} />

      <div className="container-mj relative z-10 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Copy ── */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}>

            <p className="subheading mb-4">New Collection 2025</p>

            <h1 className="heading-display mb-5"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)", lineHeight: 1.05 }}>
              Jewelry That<br />
              <span className="text-gold-gradient">Tells Your Story</span>
            </h1>

            <p className="text-base leading-relaxed mb-8"
              style={{ color: "var(--mj-text-muted)", maxWidth: 440 }}>
              Discover timeless elegance crafted for the modern South Asian woman.
              From delicate everyday pieces to statement bridal jewellery.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link to="/products">
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-3.5 btn-gold rounded-lg">
                  <ShoppingBag className="w-4 h-4" />
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-3.5 btn-outline rounded-lg">
                  Our Story
                </motion.button>
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 shrink-0" style={{ color: "var(--mj-gold)" }} />
                  <span className="text-xs font-semibold" style={{ color: "var(--mj-text-muted)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Hero card ── */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="relative flex justify-center lg:justify-end">

            {/* Main card */}
            <div className="relative w-full max-w-sm">
              <div className="rounded-2xl overflow-hidden shadow-xl"
                style={{ border: "1px solid var(--mj-border)", background: "white" }}>

                {/* Image area */}
                <div className="aspect-[4/5] flex items-center justify-center relative"
                  style={{ background: "var(--mj-blush)" }}>
                  <img src="/meri-jewelry-logo.svg" alt="Meri Jewelry"
                    className="w-48 h-48 object-contain"
                    onError={e => { e.target.style.display = "none"; }} />
                  <span className="absolute top-4 left-4 badge-rose">New</span>
                </div>

                {/* Card info */}
                <div className="p-5">
                  <p className="subheading mb-1.5">Featured Collection</p>
                  <h3 className="heading-display text-xl mb-3">Bridal Jewelry Sets</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="w-3 h-3"
                          style={{ fill: "var(--mj-gold)", color: "var(--mj-gold)" }} />
                      ))}
                    </div>
                    <Link to="/products"
                      className="flex items-center gap-1.5 text-xs font-bold transition-colors"
                      style={{ color: "var(--mj-gold-dark)" }}>
                      View All <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating accent badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 rounded-xl p-3.5 shadow-lg"
                style={{ background: "white", border: "1px solid var(--mj-border)" }}>
                <p className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--mj-gold)" }}>Premium Quality</p>
                <p className="text-xs font-medium mt-0.5" style={{ color: "var(--mj-charcoal)" }}>
                  Handcrafted ✦
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
