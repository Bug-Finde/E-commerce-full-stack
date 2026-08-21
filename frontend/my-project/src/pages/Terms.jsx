import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Acceptance of Terms",
    text: "By accessing or using the Meri Jewelry website and placing orders, you agree to be bound by these Terms and Conditions. If you do not agree to any part of these terms, please do not use our website.",
  },
  {
    title: "2. Products & Availability",
    items: [
      "All products listed on our website are subject to availability.",
      "We reserve the right to limit quantities or discontinue products at any time without notice.",
      "Product images are for illustrative purposes. Slight variations in colour or finish may occur.",
      "Prices are displayed in Pakistani Rupees (PKR) and are subject to change without prior notice.",
    ],
  },
  {
    title: "3. Orders & Payment",
    items: [
      "Placing an order constitutes an offer to purchase. Meri Jewelry reserves the right to accept or decline any order.",
      "We currently accept Cash on Delivery (COD) only. Payment is made at the time of delivery.",
      "You are responsible for providing accurate delivery information. Orders with incorrect information may be delayed or cancelled.",
      "Order confirmation will be sent via WhatsApp or email after successful placement.",
    ],
  },
  {
    title: "4. Pricing",
    text: "All prices shown are inclusive of any applicable taxes unless otherwise stated. Shipping fees are calculated at checkout and are in addition to the product price. We offer free delivery on orders above Rs. 2,500.",
  },
  {
    title: "5. Shipping & Delivery",
    text: "Delivery timelines are estimates and not guarantees. Meri Jewelry is not liable for delays caused by courier partners, weather conditions, public holidays, or circumstances beyond our control. Please refer to our Shipping Information page for full delivery details.",
  },
  {
    title: "6. Returns & Refunds",
    text: "Returns and exchanges are subject to our Returns & Exchanges Policy. Items must be returned in original condition within 7 days of delivery. We reserve the right to refuse returns that do not meet our policy criteria. Please review our full returns policy before purchasing.",
  },
  {
    title: "7. Intellectual Property",
    items: [
      "All content on this website — including text, images, logos, product designs, and graphics — is the property of Meri Jewelry.",
      "You may not reproduce, distribute, or use any content from this website without prior written permission.",
      "Unauthorised use of our brand name or imagery may result in legal action.",
    ],
  },
  {
    title: "8. User Accounts",
    items: [
      "You are responsible for maintaining the confidentiality of your account credentials.",
      "You must not share your account with others or use another person's account.",
      "Meri Jewelry reserves the right to suspend or terminate accounts that violate these terms.",
      "You are responsible for all activity that occurs under your account.",
    ],
  },
  {
    title: "9. Limitation of Liability",
    text: "Meri Jewelry shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our maximum liability shall not exceed the value of the order placed. We make no warranties regarding uninterrupted website access or error-free content.",
  },
  {
    title: "10. Privacy",
    text: "Your use of our website is also governed by our Privacy Policy, which is incorporated into these Terms and Conditions by reference. Please review our Privacy Policy to understand our data practices.",
  },
  {
    title: "11. Modifications",
    text: "Meri Jewelry reserves the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated date. Continued use of our website after any changes constitutes acceptance of the revised terms.",
  },
  {
    title: "12. Governing Law",
    text: "These Terms and Conditions are governed by and construed in accordance with the laws of Pakistan. Any disputes arising from these terms or your use of our website shall be subject to the jurisdiction of courts in Lahore, Pakistan.",
  },
  {
    title: "13. Contact",
    text: "For any questions regarding these Terms and Conditions, contact us at hello@merijewelry.com or via WhatsApp at +92 300 123 4567.",
  },
];

export default function Terms() {
  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>

        {/* Header */}
        <div className="py-20 px-6 text-center"
          style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-3">Legal</p>
          <h1 className="heading-display text-5xl sm:text-6xl mb-4">Terms & Conditions</h1>
          <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>
            Last updated: January 2025
          </p>
        </div>

        <div className="container-mj py-16 max-w-3xl">

          {/* Intro banner */}
          <div className="flex items-start gap-4 p-5 rounded-xl mb-12"
            style={{ background: "var(--mj-cream)", border: "2px solid var(--mj-gold)" }}>
            <FileText className="w-6 h-6 shrink-0 mt-0.5" style={{ color: "var(--mj-gold)" }} />
            <p className="text-sm leading-relaxed" style={{ color: "var(--mj-charcoal)" }}>
              Please read these Terms and Conditions carefully before using <strong>merijewelry.com</strong>. By accessing our website or placing an order, you agree to these terms.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map(({ title, text, items }) => (
              <div key={title}>
                <h2 className="heading-display text-xl mb-4" style={{ color: "var(--mj-charcoal)" }}>
                  {title}
                </h2>
                <div style={{ width: 32, height: 2, background: "var(--mj-gold)", marginBottom: 16, borderRadius: 9999 }} />
                {text && (
                  <p className="text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>{text}</p>
                )}
                {items && (
                  <ul className="space-y-2">
                    {items.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-sm"
                        style={{ color: "var(--mj-text-muted)" }}>
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "var(--mj-gold)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Related links */}
          <div className="mt-14 p-6 rounded-xl" style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
            <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--mj-text-muted)" }}>
              Related Policies
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Privacy Policy",      to: "/privacy"      },
                { label: "Returns & Exchanges", to: "/returns"      },
                { label: "Shipping Information",to: "/shipping"     },
              ].map(({ label, to }) => (
                <Link key={to} to={to}
                  className="px-4 py-2 rounded-lg text-xs font-semibold transition-colors hover:bg-[var(--mj-blush)]"
                  style={{ background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
