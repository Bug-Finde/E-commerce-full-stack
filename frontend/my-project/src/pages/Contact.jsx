import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
            {/* Contact Info */}
            <div>
              <h2
                className="heading-display text-3xl mb-8"
              >
                How to reach us
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: FaWhatsapp,
                    label: "WhatsApp",
                    value: "+92 300 123 4567",
                    href: "https://wa.me/923001234567",
                    color: "#22c55e",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@merijewelry.com",
                    href: "mailto:hello@merijewelry.com",
                    color: "var(--mj-gold)",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Lahore, Pakistan",
                    href: null,
                    color: "var(--mj-rose)",
                  },
                ].map((item) => (
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
            </div>

            {/* Contact Form */}
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
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--mj-text-muted)" }}>
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
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--mj-text-muted)" }}>
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
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--mj-text-muted)" }}>
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
