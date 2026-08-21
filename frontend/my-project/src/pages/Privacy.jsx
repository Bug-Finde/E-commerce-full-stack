import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ShieldCheck } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "Information You Provide",
        text: "When you create an account or place an order, we collect your name, email address, phone number, and delivery address. This information is necessary to process and deliver your orders.",
      },
      {
        subtitle: "Automatically Collected Information",
        text: "We may collect basic technical information such as your device type, browser, and general location to improve our website's performance and your shopping experience.",
      },
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      {
        text: "We use your personal information solely for the following purposes:",
        list: [
          "Processing and fulfilling your orders",
          "Communicating order confirmations, shipping updates, and support via WhatsApp or email",
          "Improving our website and customer experience",
          "Sending promotional offers and newsletters (only if you have subscribed)",
          "Preventing fraud and maintaining account security",
        ],
      },
    ],
  },
  {
    title: "3. Sharing Your Information",
    content: [
      {
        text: "Meri Jewelry does not sell, rent, or trade your personal information to third parties. We may share limited information only with:",
        list: [
          "Courier and delivery services to fulfil your orders",
          "Payment processing partners (where applicable in future)",
          "Legal authorities if required by law",
        ],
      },
    ],
  },
  {
    title: "4. Data Security",
    content: [
      {
        text: "We take appropriate technical and organisational measures to protect your personal information against unauthorised access, loss, or disclosure. Your account is protected by your password, and we encourage you to choose a strong, unique password and never share it.",
      },
    ],
  },
  {
    title: "5. Cookies",
    content: [
      {
        text: "Our website may use cookies to enhance your browsing experience, remember your preferences, and analyse website traffic. You can disable cookies in your browser settings; however, this may affect some functionality of the website.",
      },
    ],
  },
  {
    title: "6. Your Rights",
    content: [
      {
        text: "You have the right to:",
        list: [
          "Access the personal information we hold about you",
          "Request correction of inaccurate information",
          "Request deletion of your account and personal data",
          "Opt out of marketing communications at any time",
        ],
      },
      {
        text: "To exercise any of these rights, contact us at hello@merijewelry.com.",
      },
    ],
  },
  {
    title: "7. Children's Privacy",
    content: [
      {
        text: "Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.",
      },
    ],
  },
  {
    title: "8. Changes to This Policy",
    content: [
      {
        text: "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of our website after changes constitutes your acceptance of the revised policy.",
      },
    ],
  },
  {
    title: "9. Contact Us",
    content: [
      {
        text: "If you have any questions about this Privacy Policy, please contact us:",
        list: [
          "Email: hello@merijewelry.com",
          "WhatsApp: +92 300 123 4567",
          "Location: Lahore, Pakistan",
        ],
      },
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>

        {/* Header */}
        <div className="py-20 px-6 text-center"
          style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-3">Legal</p>
          <h1 className="heading-display text-5xl sm:text-6xl mb-4">Privacy Policy</h1>
          <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>
            Last updated: January 2025
          </p>
        </div>

        <div className="container-mj py-16 max-w-3xl">

          {/* Trust banner */}
          <div className="flex items-start gap-4 p-5 rounded-xl mb-12"
            style={{ background: "var(--mj-cream)", border: "2px solid var(--mj-gold)" }}>
            <ShieldCheck className="w-6 h-6 shrink-0 mt-0.5" style={{ color: "var(--mj-gold)" }} />
            <p className="text-sm leading-relaxed" style={{ color: "var(--mj-charcoal)" }}>
              At <strong>Meri Jewelry</strong>, your privacy matters to us. This policy explains how we collect, use, and protect your personal information when you shop with us.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map(({ title, content }) => (
              <div key={title}>
                <h2 className="heading-display text-xl mb-4" style={{ color: "var(--mj-charcoal)" }}>
                  {title}
                </h2>
                <div style={{ width: 32, height: 2, background: "var(--mj-gold)", marginBottom: 16, borderRadius: 9999 }} />
                <div className="space-y-4">
                  {content.map((c, i) => (
                    <div key={i}>
                      {c.subtitle && (
                        <p className="text-sm font-bold mb-1.5" style={{ color: "var(--mj-warm-brown)" }}>
                          {c.subtitle}
                        </p>
                      )}
                      {c.text && (
                        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--mj-text-muted)" }}>
                          {c.text}
                        </p>
                      )}
                      {c.list && (
                        <ul className="space-y-2 mt-2">
                          {c.list.map(item => (
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
              </div>
            ))}
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
