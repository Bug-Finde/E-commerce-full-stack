import React from "react";
import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Verify() {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-10"
      style={{ background: "var(--mj-cream)" }}
    >
      {/* Animated blush blobs */}
      <motion.div
        className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--mj-blush)", opacity: 0.7 }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-36 -right-24 h-[380px] w-[380px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--mj-blush-dark)", opacity: 0.5 }}
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 left-[40%] h-[300px] w-[300px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--mj-gold-light)", opacity: 0.2 }}
        animate={{ x: [0, 40, -40, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      {/* Floating sparkles */}
      <motion.div
        className="absolute left-[12%] top-[18%] hidden sm:block"
        animate={{ y: [0, -14, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles className="h-6 w-6" style={{ color: "var(--mj-gold)", opacity: 0.6 }} />
      </motion.div>
      <motion.div
        className="absolute bottom-[16%] right-[14%] hidden sm:block"
        animate={{ y: [0, 14, 0], rotate: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <Sparkles className="h-5 w-5" style={{ color: "var(--mj-rose)", opacity: 0.5 }} />
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-3xl p-8 shadow-2xl backdrop-blur-2xl sm:p-10 text-center"
        style={{
          background: "rgba(255,255,255,0.72)",
          border: "1px solid var(--mj-border)",
        }}
      >
        {/* Logo */}
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <img
            src="/meri-jewelry-logo.svg"
            alt="Meri Jewelry"
            className="h-10 w-auto object-contain"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <span
            className="text-lg font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)" }}
          >
            Meri Jewelry
          </span>
        </div>

        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "var(--mj-blush)" }}
        >
          <Mail className="h-9 w-9" style={{ color: "var(--mj-rose)" }} />
        </motion.div>

        <h1
          className="mb-2 text-3xl font-semibold leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)" }}
        >
          Check your email
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: "var(--mj-text-muted)" }}>
          We've sent a verification link to your email address. Please open it to activate your account.
        </p>

        <div
          className="my-6 rounded-xl px-4 py-3 text-sm"
          style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border-light)", color: "var(--mj-text-muted)" }}
        >
          Didn't receive the email? Check your spam folder or{" "}
          <Link
            to="/signup"
            className="font-semibold hover:underline underline-offset-2"
            style={{ color: "var(--mj-gold-dark)" }}
          >
            try again
          </Link>
          .
        </div>

        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-sm font-semibold hover:underline underline-offset-2"
          style={{ color: "var(--mj-gold-dark)" }}
        >
          Back to sign in
        </Link>
      </motion.div>
    </div>
  );
}
