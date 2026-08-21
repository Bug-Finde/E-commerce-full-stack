import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const faqCategories = [
  {
    category: "Orders & Shipping",
    faqs: [
      {
        q: "How do I place an order?",
        a: "Browse our collection, add items to your cart, and proceed to checkout. Fill in your delivery address and phone number, then confirm your order. We'll contact you via WhatsApp to confirm.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We currently accept Cash on Delivery (COD) only. You pay when your order is delivered to your doorstep — no advance payment required.",
      },
      {
        q: "How long does delivery take?",
        a: "Lahore, Karachi, and Islamabad: 2–3 business days. Other major cities: 3–5 business days. Remote areas: 5–7 business days. Orders are processed within 1 business day.",
      },
      {
        q: "Is there a minimum order amount?",
        a: "There is no minimum order amount. However, orders above Rs. 2,500 qualify for free delivery.",
      },
      {
        q: "Can I change or cancel my order after placing it?",
        a: "You can request changes or cancellations by contacting us via WhatsApp within 2 hours of placing your order, before it is dispatched.",
      },
      {
        q: "How do I track my order?",
        a: "Once dispatched, you can track your order from the My Orders section in your account. You will also receive updates via WhatsApp.",
      },
    ],
  },
  {
    category: "Products & Quality",
    faqs: [
      {
        q: "Are your products genuine and high quality?",
        a: "Yes. Every piece at Meri Jewelry is carefully selected and quality-checked. We work with skilled artisans to ensure premium craftsmanship and materials.",
      },
      {
        q: "Are the product images accurate?",
        a: "We make every effort to photograph products accurately. However, slight variations in color may occur due to different screen settings. The product description always provides the most accurate details.",
      },
      {
        q: "Do you offer custom or personalised jewelry?",
        a: "Currently we do not offer custom orders. However, we are working on introducing this feature. Follow us on Instagram to stay updated.",
      },
      {
        q: "How do I know which size to order?",
        a: "Product listings include sizing information where applicable. For rings, refer to the size guide in the product description. If you are unsure, contact us before ordering.",
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    faqs: [
      {
        q: "What is your return policy?",
        a: "We accept returns within 7 days of delivery for items that are defective, damaged, or incorrect. Items must be in original condition and packaging. Sale items are not eligible for return.",
      },
      {
        q: "How do I request a return?",
        a: "Contact us via WhatsApp or email within 7 days of delivery with your order number and photos of the issue. Our team will guide you through the process.",
      },
      {
        q: "How are refunds processed?",
        a: "Since we use Cash on Delivery, refunds are processed via bank transfer, Easypaisa, or JazzCash within 3–5 business days of receiving the returned item.",
      },
      {
        q: "Can I exchange an item for a different design?",
        a: "Exchanges are possible for defective or incorrectly dispatched items. If you wish to exchange for a different style, contact us and we will try our best to assist.",
      },
    ],
  },
  {
    category: "Account & Privacy",
    faqs: [
      {
        q: "Do I need to create an account to order?",
        a: "Currently, an account is required to place an order. Creating an account is free and allows you to track orders, save addresses, and manage your wishlist.",
      },
      {
        q: "Is my personal information safe?",
        a: "Yes. We take your privacy seriously. Your personal information is never sold or shared with third parties. See our Privacy Policy for full details.",
      },
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page and enter your email. You will receive an OTP to reset your password.",
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid var(--mj-border)" }}>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors"
        style={{ background: open ? "var(--mj-cream)" : "white" }}
      >
        <span className="text-sm font-semibold" style={{ color: "var(--mj-charcoal)" }}>{q}</span>
        <ChevronDown
          className="w-4 h-4 shrink-0 transition-transform duration-200"
          style={{ color: "var(--mj-gold)", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 pt-1" style={{ background: "var(--mj-cream)", borderTop: "1px solid var(--mj-border-light)" }}>
              <p className="text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>

        {/* Header */}
        <div className="py-20 px-6 text-center"
          style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-3">Help Center</p>
          <h1 className="heading-display text-5xl sm:text-6xl mb-4">Frequently Asked Questions</h1>
          <p className="text-sm mx-auto" style={{ color: "var(--mj-text-muted)", maxWidth: 460 }}>
            Find quick answers to the most common questions about ordering, shipping, returns, and more.
          </p>
        </div>

        <div className="container-mj py-16 max-w-3xl">

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {faqCategories.map(({ category }, i) => (
              <button key={category} onClick={() => setActiveCategory(i)}
                className="px-4 py-2 rounded-full text-xs font-bold transition-all"
                style={activeCategory === i
                  ? { background: "var(--mj-charcoal)", color: "white" }
                  : { background: "white", color: "var(--mj-warm-brown)", border: "1px solid var(--mj-border)" }}>
                {category}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {faqCategories[activeCategory].faqs.map(({ q, a }) => (
                <FAQItem key={q} q={q} a={a} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Still need help */}
          <div className="mt-14 text-center p-8 rounded-xl"
            style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
            <MessageCircle className="w-8 h-8 mx-auto mb-3" style={{ color: "var(--mj-gold)" }} />
            <h3 className="heading-display text-2xl mb-2">Still have questions?</h3>
            <p className="text-sm mb-5" style={{ color: "var(--mj-text-muted)" }}>
              Our friendly support team is available 7 days a week to help you.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer"
                className="px-6 py-2.5 btn-gold rounded-lg text-xs font-bold">
                Chat on WhatsApp
              </a>
              <Link to="/contact"
                className="px-6 py-2.5 btn-outline rounded-lg text-xs font-bold">
                Send a Message
              </Link>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
}
