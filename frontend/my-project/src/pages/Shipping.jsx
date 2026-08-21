import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Truck, Clock, MapPin, Package, AlertCircle, CheckCircle } from "lucide-react";

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2
        className="heading-display text-2xl mb-4"
        style={{ color: "var(--mj-charcoal)" }}
      >
        {title}
      </h2>
      <div className="divider-gold mb-5 w-12" style={{ height: 2 }} />
      {children}
    </div>
  );
}

function InfoCard({ icon: Icon, title, desc, color }) {
  return (
    <div
      className="flex items-start gap-4 p-5 rounded-xl"
      style={{ background: "white", border: "1px solid var(--mj-border)" }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ background: color + "22" }}
      >
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <p className="text-sm font-bold mb-1" style={{ color: "var(--mj-charcoal)" }}>
          {title}
        </p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

const shippingZones = [
  { zone: "Lahore, Karachi, Islamabad", time: "2–3 Business Days", fee: "Rs. 200" },
  { zone: "Other Major Cities", time: "3–5 Business Days", fee: "Rs. 250" },
  { zone: "Remote / Rural Areas", time: "5–7 Business Days", fee: "Rs. 300" },
];

export default function Shipping() {
  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>
        {/* Header */}
        <div
          className="py-20 px-6 text-center"
          style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}
        >
          <p className="subheading mb-3">Delivery</p>
          <h1 className="heading-display text-5xl sm:text-6xl mb-4">Shipping Information</h1>
          <p className="text-sm mx-auto" style={{ color: "var(--mj-text-muted)", maxWidth: 480 }}>
            We ship across Pakistan with care and speed. Every order is packed securely so your jewelry arrives in perfect condition.
          </p>
        </div>

        <div className="container-mj py-16 max-w-4xl">

          {/* Highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            <InfoCard icon={Truck}   color="var(--mj-gold)"  title="Nationwide Delivery" desc="We deliver to all cities and towns across Pakistan." />
            <InfoCard icon={Clock}   color="var(--mj-rose)"  title="Fast Processing"     desc="Orders are processed within 1 business day of placement." />
            <InfoCard icon={Package} color="#059669"          title="Safe Packaging"      desc="Every piece is wrapped securely to prevent damage in transit." />
          </div>

          {/* Free shipping banner */}
          <div
            className="flex items-center gap-4 p-5 rounded-xl mb-12"
            style={{ background: "var(--mj-cream)", border: "2px solid var(--mj-gold)" }}
          >
            <CheckCircle className="w-6 h-6 shrink-0" style={{ color: "var(--mj-gold)" }} />
            <p className="text-sm font-semibold" style={{ color: "var(--mj-charcoal)" }}>
              Free delivery on all orders above <strong>Rs. 2,500</strong> — nationwide.
            </p>
          </div>

          <Section title="Delivery Charges">
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--mj-border)" }}>
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}>
                    {["Delivery Zone", "Estimated Time", "Shipping Fee"].map(h => (
                      <th key={h} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider"
                        style={{ color: "var(--mj-text-muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shippingZones.map((z, i) => (
                    <tr key={z.zone} style={{ background: i % 2 === 0 ? "white" : "var(--mj-ivory)", borderBottom: "1px solid var(--mj-border-light)" }}>
                      <td className="px-5 py-3.5 font-medium" style={{ color: "var(--mj-charcoal)" }}>{z.zone}</td>
                      <td className="px-5 py-3.5" style={{ color: "var(--mj-text-muted)" }}>{z.time}</td>
                      <td className="px-5 py-3.5 font-bold" style={{ color: "var(--mj-gold-dark)" }}>{z.fee}</td>
                    </tr>
                  ))}
                  <tr style={{ background: "var(--mj-blush)", borderTop: "1px solid var(--mj-border)" }}>
                    <td className="px-5 py-3.5 font-bold" style={{ color: "var(--mj-charcoal)" }}>Orders above Rs. 2,500</td>
                    <td className="px-5 py-3.5" style={{ color: "var(--mj-text-muted)" }}>Standard timeline</td>
                    <td className="px-5 py-3.5 font-bold" style={{ color: "#059669" }}>FREE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Payment Method">
            <p className="text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>
              We currently offer <strong style={{ color: "var(--mj-charcoal)" }}>Cash on Delivery (COD)</strong> on all orders. Pay securely when your package arrives at your doorstep — no advance payment required.
            </p>
          </Section>

          <Section title="Order Processing">
            <ul className="space-y-3">
              {[
                "Orders placed before 2:00 PM (PKT) are processed the same business day.",
                "Orders placed after 2:00 PM or on weekends are processed the next business day.",
                "You will receive an order confirmation via WhatsApp or email after your order is placed.",
                "Delivery timelines begin from the day your order is dispatched, not the day it is placed.",
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--mj-text-muted)" }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--mj-gold)" }} />
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Important Notes">
            <div
              className="flex items-start gap-3 p-4 rounded-xl"
              style={{ background: "var(--mj-blush)", border: "1px solid var(--mj-blush-dark)" }}
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--mj-rose)" }} />
              <div className="space-y-2 text-sm" style={{ color: "var(--mj-warm-brown)" }}>
                <p>Delivery timelines are estimates and may vary due to courier delays, holidays, or weather conditions.</p>
                <p>Please ensure your delivery address and phone number are correct when placing your order. Meri Jewelry is not responsible for failed deliveries due to incorrect information.</p>
              </div>
            </div>
          </Section>

          <Section title="Track Your Order">
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--mj-text-muted)" }}>
              Once your order is dispatched, you can track it from your account dashboard under <strong style={{ color: "var(--mj-charcoal)" }}>My Orders</strong>. You will also receive updates via WhatsApp.
            </p>
            <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>
              For any shipping queries, contact us at{" "}
              <a href="https://wa.me/923001234567" className="font-semibold hover:underline" style={{ color: "var(--mj-gold-dark)" }}>
                +92 300 123 4567
              </a>{" "}
              or{" "}
              <a href="mailto:hello@merijewelry.com" className="font-semibold hover:underline" style={{ color: "var(--mj-gold-dark)" }}>
                hello@merijewelry.com
              </a>
            </p>
          </Section>

        </div>
      </div>
      <Footer />
    </>
  );
}
