import React, { useState } from "react";
import { MapPin, Mail } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const contactItems = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "0302 1587855",
    href: "https://wa.me/923021587855",
    color: "#22c55e",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info.merijewelery@gmail.com",
    href: "mailto:info.merijewelery@gmail.com",
    color: "var(--mj-gold)",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pakistan",
    href: null,
    color: "var(--mj-rose)",
  },
];

const socialLinks = [
  {
    icon: FaFacebookF,
    label: "Facebook",
    handle: "@merijewellerypk",
    href: "https://www.facebook.com/merijewellerypk/",
    bg: "#1877F2",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    handle: "@meri_jewelry_store",
    href: "https://www.instagram.com/meri_jewelry_store/",
    bg: "radial-gradient(circle at 30% 110%, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp Channel",
    handle: "Join our Channel",
    href: "https://whatsapp.com/channel/0029VbD3ygcAYlUNd8C0pp2M",
    bg: "#22c55e",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen" style={{ background: "var(--mj-ivory)" }}>
        {/* Header */}
        <div
          className="py-20 px-6 text-center"
          style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}
        >
          <p className="subheading mb-3">Get In Touch</p>
          <h1 className="heading-display text-5xl sm:text-6xl mb-4">Contact Us</h1>
          <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>
            We'd love to hear from you. Reach out for any queries or support.
          </p>
        </div>

        <div className="container-mj py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">

            {/* ── Left column: Contact info + social links ── */}
            <div>
              <h2 className="heading-display text-3xl mb-8">How to reach us</h2>

              {/* Contact details */}
              <div className="space-y-6 mb-10">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: "var(--mj-blush)" }}
                    >
                      <item.icon className="w-4 h-4" style={{ color: item.color }} />
                    </div>
                    <div>
                      <p
                        className="text-[11px] font-bold uppercase tracking-widest mb-0.5"
                        style={{ color: "var(--mj-gold)" }}
                      >
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-sm font-medium hover:text-[var(--mj-gold-dark)] transition-colors"
                          style={{ color: "var(--mj-charcoal)" }}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: "var(--mj-charcoal)" }}>
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social links */}
              <h3
                className="text-[11px] font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--mj-gold)" }}
              >
                Follow Us
              </h3>
              <div className="flex flex-col gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all hover:scale-[1.02]"
                    style={{
                      background: "white",
                      border: "1px solid var(--mj-border)",
                      boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: s.bg }}
                    >
                      <s.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: "var(--mj-charcoal)" }}>
                        {s.label}
                      </p>
                      <p className="text-xs" style={{ color: "var(--mj-text-muted)" }}>
                        {s.handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* ── Right column: Contact form ── */}
            <div
              className="p-8 rounded-2xl"
              style={{ background: "white", border: "1px solid var(--mj-border)" }}
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-10">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ background: "var(--mj-blush)" }}
                  >
                    <Mail className="w-6 h-6" style={{ color: "var(--mj-rose)" }} />
                  </div>
                  <h3 className="heading-display text-2xl">Message Sent!</h3>
                  <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 px-6 py-2 btn-outline rounded-lg text-xs"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="heading-display text-2xl mb-6">Send a Message</h3>
                  <div>
                    <label
                      className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
                      style={{ color: "var(--mj-text-muted)" }}
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="input-mj"
                      placeholder="Sara Khan"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
                      style={{ color: "var(--mj-text-muted)" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="input-mj"
                      placeholder="sara@example.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
                      style={{ color: "var(--mj-text-muted)" }}
                    >
                      Message
                    </label>
                    <textarea
                      className="input-mj resize-none"
                      rows={5}
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      required
                    />
                  </div>
                  <button type="submit" className="w-full py-3 btn-gold rounded-lg text-xs font-bold">
                    Send Message
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
