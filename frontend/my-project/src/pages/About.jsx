import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen" style={{ background: "var(--mj-ivory)" }}>
        {/* Hero */}
        <div
          className="py-24 px-6 text-center"
          style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}
        >
          <p className="subheading mb-3">Our Story</p>
          <h1
            className="heading-display text-5xl sm:text-6xl mb-6"
            style={{ maxWidth: 640, margin: "0 auto 1.5rem" }}
          >
            Crafted with love,<br />worn with pride
          </h1>
          <p
            className="text-base leading-relaxed mx-auto"
            style={{ color: "var(--mj-text-muted)", maxWidth: 560 }}
          >
            Meri Jewelry was born from a deep appreciation for the timeless artistry of South Asian
            jewelry traditions. We believe every piece of jewelry tells a story — of craftsmanship,
            culture, and the woman who wears it.
          </p>
        </div>

        {/* Story content */}
        <div className="container-mj py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div>
              <p className="subheading mb-4">Who We Are</p>
              <h2 className="heading-display text-3xl sm:text-4xl mb-6">
                Where elegance meets tradition
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>
                <p>
                  Meri Jewelry is a premium Pakistani jewelry brand dedicated to creating pieces that
                  celebrate the rich heritage of South Asian craftsmanship while embracing contemporary
                  design sensibilities.
                </p>
                <p>
                  Each collection is thoughtfully curated — from delicate everyday earrings to
                  statement bridal sets — ensuring that every woman finds her perfect piece,
                  whatever the occasion.
                </p>
                <p>
                  We work closely with skilled artisans to ensure that every detail, from the
                  smallest filigree to the most intricate setting, reflects our commitment to
                  quality and beauty.
                </p>
              </div>
            </div>

            <div
              className="aspect-square rounded-2xl flex items-center justify-center"
              style={{ background: "var(--mj-blush)", border: "1px solid var(--mj-blush-dark)" }}
            >
              <img
                src="/meri-jewelry-logo.svg"
                alt="Meri Jewelry"
                className="w-56 h-56 object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
          </div>

          {/* Values */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="subheading mb-3">Our Values</p>
              <h2 className="heading-display text-3xl">What we stand for</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                {
                  title: "Craftsmanship",
                  desc: "Every piece is made with meticulous attention to detail by skilled artisans who take pride in their work.",
                },
                {
                  title: "Authenticity",
                  desc: "We celebrate South Asian heritage through designs that honour tradition while embracing modern elegance.",
                },
                {
                  title: "Quality",
                  desc: "We use only premium materials to ensure your jewelry lasts a lifetime and looks beautiful every day.",
                },
              ].map((v) => (
                <div
                  key={v.title}
                  className="text-center p-8 rounded-xl"
                  style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}
                >
                  <div
                    className="w-10 h-1 mx-auto mb-5 rounded-full"
                    style={{ background: "var(--mj-gold)" }}
                  />
                  <h3
                    className="text-xl font-medium mb-3"
                    style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
