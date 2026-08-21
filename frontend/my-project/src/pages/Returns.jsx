import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { RotateCcw, CheckCircle, XCircle, Clock, AlertCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="heading-display text-2xl mb-4" style={{ color: "var(--mj-charcoal)" }}>
        {title}
      </h2>
      <div style={{ width: 48, height: 2, background: "var(--mj-gold)", marginBottom: 20, borderRadius: 9999 }} />
      {children}
    </div>
  );
}

const eligible = [
  "Item received in damaged or defective condition",
  "Wrong item delivered",
  "Item significantly different from the product description",
  "Packaging damaged during transit",
];

const notEligible = [
  "Items that have been worn, used, or altered",
  "Items without original packaging",
  "Custom or personalised orders",
  "Items returned after 7 days of delivery",
  "Sale or clearance items (unless defective)",
];

const steps = [
  { n: "01", title: "Contact Us", desc: "Reach out via WhatsApp or email within 7 days of receiving your order. Share your order number and photos of the issue." },
  { n: "02", title: "Approval",   desc: "Our team will review your request within 24 hours and confirm if it is eligible for return or exchange." },
  { n: "03", title: "Ship Back",  desc: "Pack the item securely in its original packaging and send it to our address. We will share the return address upon approval." },
  { n: "04", title: "Resolution", desc: "Once we receive and inspect the item, we will process your exchange or refund within 3–5 business days." },
];

export default function Returns() {
  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>
        {/* Header */}
        <div className="py-20 px-6 text-center"
          style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-3">Our Policy</p>
          <h1 className="heading-display text-5xl sm:text-6xl mb-4">Returns & Exchanges</h1>
          <p className="text-sm mx-auto" style={{ color: "var(--mj-text-muted)", maxWidth: 480 }}>
            Your satisfaction is our priority. If something isn't right with your order, we're here to make it right.
          </p>
        </div>

        <div className="container-mj py-16 max-w-4xl">

          {/* Policy summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            {[
              { icon: Clock,      color: "var(--mj-gold)",  title: "7-Day Window",      desc: "Return or exchange requests must be made within 7 days of delivery." },
              { icon: RotateCcw,  color: "var(--mj-rose)",  title: "Easy Process",       desc: "Simple 4-step process with quick turnaround." },
              { icon: MessageCircle, color: "#059669",       title: "Friendly Support",   desc: "Our team responds within 24 hours on WhatsApp or email." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-xl"
                style={{ background: "white", border: "1px solid var(--mj-border)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: color + "22" }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: "var(--mj-charcoal)" }}>{title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Eligible vs not */}
          <Section title="What Can Be Returned?">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl" style={{ background: "#D1FAE5", border: "1px solid #6EE7B7" }}>
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5" style={{ color: "#059669" }} />
                  <p className="text-sm font-bold" style={{ color: "#065F46" }}>Eligible for Return</p>
                </div>
                <ul className="space-y-2">
                  {eligible.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#065F46" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-green-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl" style={{ background: "#FEE2E2", border: "1px solid #FCA5A5" }}>
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5" style={{ color: "#DC2626" }} />
                  <p className="text-sm font-bold" style={{ color: "#991B1B" }}>Not Eligible</p>
                </div>
                <ul className="space-y-2">
                  {notEligible.map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "#991B1B" }}>
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-red-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          {/* Process steps */}
          <Section title="Return Process">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map(({ n, title, desc }) => (
                <div key={n} className="p-5 rounded-xl" style={{ background: "white", border: "1px solid var(--mj-border)" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--mj-gold)" }}>
                      {n}
                    </span>
                    <p className="text-sm font-bold" style={{ color: "var(--mj-charcoal)" }}>{title}</p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Refund info */}
          <Section title="Refunds">
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--mj-text-muted)" }}>
              Since we operate on <strong style={{ color: "var(--mj-charcoal)" }}>Cash on Delivery</strong>, refunds will be processed via bank transfer or Easypaisa/JazzCash within <strong style={{ color: "var(--mj-charcoal)" }}>3–5 business days</strong> of receiving the returned item.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>
              Return shipping costs are covered by Meri Jewelry in cases of defective or incorrectly dispatched items.
            </p>
          </Section>

          {/* Important note */}
          <div className="flex items-start gap-3 p-5 rounded-xl mb-10"
            style={{ background: "var(--mj-blush)", border: "1px solid var(--mj-blush-dark)" }}>
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--mj-rose)" }} />
            <p className="text-sm leading-relaxed" style={{ color: "var(--mj-warm-brown)" }}>
              Please do not send items back without prior approval. Unapproved returns will not be accepted and will be returned to sender.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center p-8 rounded-xl" style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
            <p className="heading-display text-2xl mb-3">Need Help?</p>
            <p className="text-sm mb-6" style={{ color: "var(--mj-text-muted)" }}>
              Our support team is available 7 days a week.
            </p>
            <Link to="/contact"
              className="inline-flex px-8 py-3 btn-gold rounded-lg text-xs font-bold">
              Contact Support
            </Link>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
