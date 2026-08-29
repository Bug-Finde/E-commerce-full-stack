import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Mail, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

const inputBase =
  "w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm placeholder-[var(--mj-text-light)] outline-none transition-all duration-150 focus:ring-2";
const inputNormal =
  "border-[var(--mj-border)] bg-white/60 text-[var(--mj-charcoal)] focus:border-[var(--mj-gold)] focus:ring-[rgba(201,169,110,0.2)]";
const inputError =
  "border-[var(--mj-rose)] focus:border-[var(--mj-rose)] focus:ring-[rgba(200,135,138,0.2)]";

function SignatureDraw() {
  return (
    <svg viewBox="0 0 190 60" width="160" height="52" fill="none">
      <defs>
        <linearGradient id="mjSignatureGrad" x1="0" y1="0" x2="190" y2="0">
          <stop offset="0%" stopColor="#E4C98A" />
          <stop offset="100%" stopColor="#C9A96E" />
        </linearGradient>
      </defs>
      <motion.path
        d="M10 42 C 30 8, 45 8, 55 32 C 63 50, 75 18, 90 28 C 105 38, 100 50, 120 36 C 138 24, 150 45, 170 30"
        stroke="url(#mjSignatureGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
      />
    </svg>
  );
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: "rgba(74,55,40,0.6)" }}
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <Icon
          className="pointer-events-none absolute left-3.5 h-4 w-4 z-10"
          style={{ color: "var(--mj-text-muted)" }}
        />
        {children}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 text-xs"
            style={{ color: "var(--mj-rose-dark)" }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!email) next.email = "Enter your email";
    if (otp.length < 4) next.otp = "Enter a valid code";
    if (Object.keys(next).length) { setErrors(next); return; }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/auth/verify-otp",
        { otp, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

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
        className="relative z-10 w-full max-w-md rounded-3xl p-8 shadow-2xl backdrop-blur-2xl sm:p-10"
        style={{
          background: "rgba(255,255,255,0.72)",
          border: "1px solid var(--mj-border)",
        }}
      >
        {/* Logo */}
        <div className="mb-6 flex items-center gap-2.5">
          <img
            src="/meri-jewelry-logo.svg"
            alt="Meri Jewelry"
            className="h-12 w-12 object-contain"
            style={{ filter: "drop-shadow(0 2px 6px rgba(168,86,90,0.15))" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <span style={{ fontFamily: "var(--font-display)" }}>
            <span className="block text-xl font-semibold italic leading-none" style={{ color: "var(--mj-rose-dark)" }}>
              Meri
            </span>
            <span className="block text-[0.58rem] font-bold tracking-[0.2em] uppercase" style={{ color: "var(--mj-gold-dark)" }}>
              Jewelry
            </span>
          </span>
        </div>

        <h1
          className="mb-1 text-3xl font-semibold leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)" }}
        >
          Enter your code
        </h1>
        <p className="mb-3 text-sm" style={{ color: "var(--mj-text-muted)" }}>
          We sent a verification code to your email.
        </p>
        <SignatureDraw />

        <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
          <Field label="Email" icon={Mail} error={errors.email}>
            <input
              type="email"
              className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
              placeholder="sara@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((er) => ({ ...er, email: null }));
              }}
              autoComplete="email"
            />
          </Field>

          <Field label="Verification code" icon={Key} error={errors.otp}>
            <input
              type="text"
              inputMode="numeric"
              maxLength="6"
              className={`${inputBase} tracking-[0.3em] ${errors.otp ? inputError : inputNormal}`}
              placeholder="123456"
              value={otp}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                setOtp(val);
                if (errors.otp) setErrors((er) => ({ ...er, otp: null }));
              }}
            />
          </Field>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
            style={{
              background:
                "linear-gradient(135deg, var(--mj-gold-light) 0%, var(--mj-gold) 60%, var(--mj-gold-dark) 100%)",
              boxShadow: "0 6px 20px rgba(201,169,110,0.35)",
            }}
          >
            {loading ? "Verifying…" : "Verify code"}
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </motion.button>

          <p className="text-center text-xs" style={{ color: "var(--mj-text-light)" }}>
            Didn't receive the code?{" "}
            <button
              type="button"
              className="font-semibold hover:underline underline-offset-2"
              style={{ color: "var(--mj-gold-dark)" }}
            >
              Resend
            </button>
          </p>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--mj-text-muted)" }}>
          <Link
            to="/login"
            className="font-semibold hover:underline underline-offset-2"
            style={{ color: "var(--mj-gold-dark)" }}
          >
            Back to sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
