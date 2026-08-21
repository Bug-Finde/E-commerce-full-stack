import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Sparkles, Droplets, Sun, Wind, ShieldCheck, AlertTriangle } from "lucide-react";

const careCategories = [
  {
    icon: Droplets,
    color: "#3B82F6",
    title: "Cleaning",
    tips: [
      "Use a soft, lint-free cloth to gently wipe your jewelry after each wear.",
      "For a deeper clean, use a mild soap solution and a soft-bristled brush.",
      "Rinse thoroughly with lukewarm water and pat dry immediately.",
      "Never soak jewelry in water for extended periods.",
      "Avoid using toothpaste, baking soda, or abrasive cleaners.",
    ],
  },
  {
    icon: Wind,
    color: "var(--mj-gold)",
    title: "Storage",
    tips: [
      "Store each piece separately in a soft pouch or individual compartment to prevent scratching.",
      "Keep jewelry in a cool, dry place away from direct sunlight and humidity.",
      "Use anti-tarnish strips inside your jewelry box to slow oxidation.",
      "Hang necklaces and chains to prevent tangling.",
      "Close clasps and fastenings before storing to maintain shape.",
    ],
  },
  {
    icon: Sun,
    color: "var(--mj-rose)",
    title: "Daily Wear",
    tips: [
      "Put on jewelry last — after applying perfume, lotion, hairspray, and makeup.",
      "Remove jewelry before swimming, bathing, exercising, or doing household chores.",
      "Take off rings before washing hands or using hand sanitiser.",
      "Avoid wearing delicate pieces during strenuous activities.",
      "Remove jewelry before sleeping to prevent accidental damage.",
    ],
  },
  {
    icon: AlertTriangle,
    color: "#F59E0B",
    title: "What to Avoid",
    tips: [
      "Harsh chemicals — bleach, chlorine, acids, and cleaning products.",
      "Extreme temperatures — hot springs, saunas, and direct oven heat.",
      "Ultrasonic or steam cleaners unless specifically approved for your piece.",
      "Stacking hard pieces that may scratch softer stones or metals.",
      "Dropping on hard surfaces — even minor falls can loosen settings.",
    ],
  },
];

const metalGuides = [
  {
    metal: "Gold-Plated",
    desc: "Our gold-plated pieces feature a layer of gold over a base metal. Avoid prolonged contact with water and chemicals to preserve the plating. Re-plating is available for heavily worn pieces.",
    color: "var(--mj-gold)",
    bg: "var(--mj-cream)",
  },
  {
    metal: "Rose Gold",
    desc: "Rose gold gets its warm hue from a copper alloy. It is durable but should be kept away from harsh chemicals. Clean with a soft cloth and mild soapy water.",
    color: "var(--mj-rose)",
    bg: "var(--mj-blush)",
  },
  {
    metal: "Silver / Oxidised",
    desc: "Sterling silver and oxidised pieces may tarnish over time — this is natural. Polish with a silver cloth to restore shine. Store in airtight bags to slow tarnishing.",
    color: "#6B7280",
    bg: "#F3F4F6",
  },
  {
    metal: "Kundan & Meenakari",
    desc: "These traditional pieces require special care. Avoid water and chemicals completely. Store individually in soft pouches. Have them professionally cleaned when needed.",
    color: "var(--mj-warm-brown)",
    bg: "#FEF3C7",
  },
];

export default function JewelryCare() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>

        {/* Header */}
        <div className="py-20 px-6 text-center"
          style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-3">Preserve Your Pieces</p>
          <h1 className="heading-display text-5xl sm:text-6xl mb-4">Jewelry Care Guide</h1>
          <p className="text-sm mx-auto" style={{ color: "var(--mj-text-muted)", maxWidth: 500 }}>
            With the right care, your Meri Jewelry pieces will remain beautiful for years. Follow these guidelines to keep them sparkling.
          </p>
        </div>

        <div className="container-mj py-16 max-w-4xl">

          {/* Quick tips banner */}
          <div className="flex items-center gap-4 p-5 rounded-xl mb-14"
            style={{ background: "var(--mj-cream)", border: "2px solid var(--mj-gold)" }}>
            <Sparkles className="w-6 h-6 shrink-0" style={{ color: "var(--mj-gold)" }} />
            <p className="text-sm font-semibold" style={{ color: "var(--mj-charcoal)" }}>
              Golden Rule: Always put jewelry on <strong>last</strong> when getting dressed, and take it off <strong>first</strong> when you get home.
            </p>
          </div>

          {/* Care category tabs */}
          <div className="mb-10">
            <p className="subheading mb-5">Care Instructions</p>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
              {careCategories.map(({ title, icon: Icon, color }, i) => (
                <button key={title} onClick={() => setActiveTab(i)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all"
                  style={activeTab === i
                    ? { background: "var(--mj-charcoal)", color: "white", border: "1px solid var(--mj-charcoal)" }
                    : { background: "white", color: "var(--mj-warm-brown)", border: "1px solid var(--mj-border)" }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: activeTab === i ? "white" : color }} />
                  {title}
                </button>
              ))}
            </div>

            {/* Active tab content */}
            <div className="p-6 rounded-xl bg-white" style={{ border: "1px solid var(--mj-border)" }}>
              <div className="flex items-center gap-3 mb-5">
                {React.createElement(careCategories[activeTab].icon, {
                  className: "w-6 h-6",
                  style: { color: careCategories[activeTab].color },
                })}
                <h3 className="heading-display text-xl">{careCategories[activeTab].title}</h3>
              </div>
              <ul className="space-y-3">
                {careCategories[activeTab].tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm"
                    style={{ color: "var(--mj-text-muted)" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: careCategories[activeTab].color }} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Metal-specific guides */}
          <div className="mb-10">
            <p className="subheading mb-5">Care by Metal Type</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {metalGuides.map(({ metal, desc, color, bg }) => (
                <div key={metal} className="p-5 rounded-xl" style={{ background: bg, border: "1px solid var(--mj-border)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                    <p className="text-sm font-bold" style={{ color: "var(--mj-charcoal)" }}>{metal}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Professional cleaning */}
          <div className="p-6 rounded-xl" style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="w-6 h-6" style={{ color: "var(--mj-gold)" }} />
              <h3 className="heading-display text-xl">Professional Cleaning</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>
              We recommend having your fine jewelry professionally cleaned and inspected at least once a year. This helps identify loose settings, worn clasps, or other issues before they become serious. Contact us if you need a recommendation for a trusted jeweler in your city.
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
