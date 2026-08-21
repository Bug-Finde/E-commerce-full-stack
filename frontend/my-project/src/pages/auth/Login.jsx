import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const inputBase =
  "w-full rounded-xl border py-2.5 pl-10 pr-4 text-sm placeholder-[var(--mj-text-light)] outline-none transition-all duration-150 focus:ring-2";
const inputNormal = "border-[var(--mj-border)] bg-white/60 text-[var(--mj-charcoal)] focus:border-[var(--mj-gold)] focus:ring-[rgba(201,169,110,0.2)]";
const inputError  = "border-[var(--mj-rose)] focus:border-[var(--mj-rose)] focus:ring-[rgba(200,135,138,0.2)]";

function Field({ label, icon: Icon, error, children, extra }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label
          className="block text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: "rgba(74,55,40,0.6)" }}
        >
          {label}
        </label>
        {extra}
      </div>
      <div className="relative flex items-center">
        <Icon className="pointer-events-none absolute left-3.5 h-4 w-4"
          style={{ color: "var(--mj-text-muted)" }} />
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

export default function Login() {
  const navigate  = useNavigate();
  const { login } = useAuth();

  const [form, setForm]       = useState({ email: "", password: "" });
  const [errors, setErrors]   = useState({});
  const [showPw, setShowPw]   = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: null }));
  };

  const validate = () => {
    const next = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email    = "Enter a valid email";
    if (form.password.length < 8)            next.password = "At least 8 characters";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: form.email, password: form.password,
      });
      if (res.data.success) {
        const userData = res.data.data;
        login(userData, userData.token);
        toast.success("Welcome back!");
        navigate(userData.role === "admin" ? "/admin" : "/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 py-10"
      style={{ background: "var(--mj-cream)" }}
    >
      {/* Animated blush blobs — same layout as Signup */}
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

      {/* Glass card */}
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
        {/* Logo + brand */}
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

        {/* Heading */}
        <h1
          className="mb-1 text-3xl font-semibold leading-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)" }}
        >
          Welcome back
        </h1>
        <p className="mb-7 text-sm" style={{ color: "var(--mj-text-muted)" }}>
          Sign in to your account to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

          <Field
            label="Email"
            icon={Mail}
            error={errors.email}
          >
            <input
              type="email"
              className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
              placeholder="sara@example.com"
              value={form.email}
              onChange={update("email")}
              autoComplete="email"
            />
          </Field>

          <Field
            label="Password"
            icon={Lock}
            error={errors.password}
            extra={
              <Link
                to="/forget"
                className="text-[11px] font-semibold hover:underline underline-offset-2"
                style={{ color: "var(--mj-gold-dark)" }}
              >
                Forgot password?
              </Link>
            }
          >
            <input
              type={showPw ? "text" : "password"}
              className={`${inputBase} pr-11 ${errors.password ? inputError : inputNormal}`}
              placeholder="••••••••"
              value={form.password}
              onChange={update("password")}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPw((s) => !s)}
              className="absolute right-3.5 flex items-center transition-colors duration-150"
              style={{ color: "var(--mj-text-muted)" }}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </Field>

          {/* Submit — brand gold */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, var(--mj-gold-light) 0%, var(--mj-gold) 60%, var(--mj-gold-dark) 100%)",
              boxShadow: "0 6px 20px rgba(201,169,110,0.35)",
            }}
          >
            {loading ? "Signing in…" : "Sign in"}
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </motion.button>
        </form>

        <p className="mt-6 text-center text-sm" style={{ color: "var(--mj-text-muted)" }}>
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold hover:underline underline-offset-2"
            style={{ color: "var(--mj-gold-dark)" }}
          >
            Create one free
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
