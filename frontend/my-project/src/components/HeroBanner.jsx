import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Truck, ShieldCheck, Package } from "lucide-react";
import { Link } from "react-router-dom";

const trustItems = [
  { icon: Truck,       label: "Nationwide Delivery" },
  { icon: ShieldCheck, label: "Secure Packaging" },
  { icon: Package,     label: "Cash on Delivery" },
];

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--mj-cream)" }}>
      {/* Soft decorative blobs */}
      <div
        className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "var(--mj-blush)", opacity: 0.3 }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "var(--mj-blush)", opacity: 0.2 }}
      />
      {/* Tiny gold sparkle dots */}
      <span className="absolute top-16 left-[18%] w-1.5 h-1.5 rounded-full opacity-50 hidden lg:block"
        style={{ background: "var(--mj-gold)" }} />
      <span className="absolute top-32 right-[22%] w-1 h-1 rounded-full opacity-40 hidden lg:block"
        style={{ background: "var(--mj-gold-light)" }} />
      <span className="absolute bottom-20 left-[35%] w-1 h-1 rounded-full opacity-30 hidden lg:block"
        style={{ background: "var(--mj-rose)" }} />

      <div className="container-mj relative z-10 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left: Copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <p className="subheading mb-5">New Collection 2025</p>

            <h1
              className="heading-display mb-6"
              style={{ fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)", lineHeight: 1.04 }}
            >
              Jewelry That<br />
              <span className="text-gold-gradient">Tells Your Story</span>
            </h1>

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "var(--mj-text-muted)", maxWidth: 460 }}
            >
              Discover timeless elegance crafted for the modern South Asian woman.
              From delicate everyday pieces to statement bridal jewellery.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Link to="/products">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-3.5 btn-gold rounded-lg shadow-gold"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-8 py-3.5 btn-outline rounded-lg"
                >
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

          {/* ── Right: Logo showcase card ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[360px]">
              {/* Main card */}
              <div
                className="rounded-3xl overflow-hidden shadow-2xl"
                style={{ border: "1px solid var(--mj-border)", background: "white" }}
              >
                {/* Logo image area */}
                <div
                  className="flex items-center justify-center relative py-10 px-8"
                  style={{
                    background: "linear-gradient(145deg, var(--mj-ivory) 0%, var(--mj-blush) 60%, #F0C8BC 100%)",
                  }}
                >
                  {/* Subtle ring backdrop */}
                  <div
                    className="absolute inset-8 rounded-full opacity-15"
                    style={{ border: "1px solid var(--mj-gold)", pointerEvents: "none" }}
                  />
                  <div
                    className="absolute inset-12 rounded-full opacity-10"
                    style={{ border: "1px solid var(--mj-gold)", pointerEvents: "none" }}
                  />

                  <img
                    src="/meri-jewelry-logo.svg"
                    alt="Meri Jewelry"
                    className="relative z-10 w-64 h-64 object-contain"
                    style={{ filter: "drop-shadow(0 4px 16px rgba(168,86,90,0.18))" }}
                    onError={(e) => { e.target.style.display = "none"; }}
                  />

                  {/* New badge */}
                  <span
                    className="absolute top-4 left-4 badge-rose text-[10px] px-2.5 py-1"
                  >
                    New
                  </span>
                </div>

                {/* Card info */}
                <div className="p-5 pb-6">
                  <p className="subheading mb-1.5">Featured Collection</p>
                  <h3
                    className="heading-display text-2xl mb-3"
                    style={{ color: "var(--mj-charcoal)" }}
                  >
                    Bridal Jewelry Sets
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M6 1l1.3 2.6L10 4l-2 2 .5 2.8L6 7.5 3.5 8.8 4 6 2 4l2.7-.4z"
                            fill="var(--mj-gold)"
                          />
                        </svg>
                      ))}
                      <span className="ml-1.5 text-[11px]" style={{ color: "var(--mj-text-muted)" }}>
                        5.0
                      </span>
                    </div>
                    <Link
                      to="/products"
                      className="flex items-center gap-1.5 text-xs font-bold transition-colors hover:text-[var(--mj-rose-dark)]"
                      style={{ color: "var(--mj-gold-dark)" }}
                    >
                      View All <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating premium badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 rounded-2xl px-4 py-3 shadow-xl"
                style={{
                  background: "white",
                  border: "1px solid var(--mj-border)",
                }}
              >
                <p
                  className="text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: "var(--mj-gold)", letterSpacing: "0.18em" }}
                >
                  Premium Quality
                </p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--mj-charcoal)", fontFamily: "var(--font-display)" }}>
                  Handcrafted ✦
                </p>
              </motion.div>

              {/* Floating rose badge top-right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="absolute -top-4 -right-4 rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg, var(--mj-blush) 0%, var(--mj-rose) 100%)",
                }}
              >
                <span className="text-[8px] font-bold text-white uppercase tracking-wide leading-tight text-center">
                  New<br/>2025
                </span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
