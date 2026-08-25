import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
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
          className="pointer-events-none absolute left-3.5 h-4 w-4"
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

export default function ResetPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: null }));
  };

  const validate = () => {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (form.password.length < 8) next.password = "Use at least 8 characters";
    if (form.confirm !== form.password) next.confirm = "Passwords do not match";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axiosInstance.post(
        "/auth/change-password",
        { email: form.email, password: form.password, confirmPassword: form.confirm },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      setForm({ email: "", password: "", confirm: "" });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
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

        <h1
          className="mb-1 text-3xl font-semibold leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)" }}
        >
          Create new password
        </h1>
        <p className="mb-3 text-sm" style={{ color: "var(--mj-text-muted)" }}>
          Your new password must be different from your previous one.
        </p>
        <SignatureDraw />

        <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
          <Field label="Email" icon={Mail} error={errors.email}>
            <input
              type="email"
              className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
              placeholder="sara@example.com"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
            />
          </Field>

          <Field label="New password" icon={Lock} error={errors.password}>
            <input
              type={showPassword ? "text" : "password"}
              className={`${inputBase} pr-11 ${errors.password ? inputError : inputNormal}`}
              placeholder="At least 8 characters"
              value={form.password}
              onChange={update("password")}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3.5 flex items-center transition-colors duration-150"
              style={{ color: "var(--mj-text-muted)" }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </Field>

          <Field label="Confirm password" icon={Lock} error={errors.confirm}>
            <input
              type={showConfirm ? "text" : "password"}
              className={`${inputBase} pr-11 ${errors.confirm ? inputError : inputNormal}`}
              placeholder="Repeat your password"
              value={form.confirm}
              onChange={update("confirm")}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              className="absolute right-3.5 flex items-center transition-colors duration-150"
              style={{ color: "var(--mj-text-muted)" }}
              aria-label={showConfirm ? "Hide password" : "Show password"}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
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
            {loading ? "Resetting…" : "Reset password"}
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--mj-text-muted)" }}>
          Remember your password?{" "}
          <Link
            to="/login"
            className="font-semibold hover:underline underline-offset-2"
            style={{ color: "var(--mj-gold-dark)" }}
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
