import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const BACKEND_URL = import.meta.env.VITE_BASE_URL?.replace("/api", "") || "http://localhost:5000";

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
        <Icon className="pointer-events-none absolute left-3.5 h-4 w-4 z-10"
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
        <div className="mb-7 flex flex-col items-center gap-1">
          <img
            src="/meri-jewelry-logo.svg"
            alt="Meri Jewelry"
            className="w-24 h-24 object-contain"
            style={{ filter: "drop-shadow(0 2px 8px rgba(168,86,90,0.15))" }}
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <span
            className="text-lg font-semibold italic tracking-wide"
            style={{ fontFamily: "var(--font-display)", color: "var(--mj-rose-dark)" }}
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

        {/* ── Social divider ── */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1" style={{ background: "var(--mj-border)" }} />
          <span className="text-[11px] font-semibold uppercase tracking-wider"
                style={{ color: "rgba(74,55,40,0.45)" }}>
            or continue with
          </span>
          <div className="h-px flex-1" style={{ background: "var(--mj-border)" }} />
        </div>

        {/* ── OAuth buttons ── */}
        <div className="mt-4 grid grid-cols-1 justify-center  gap-3">
          {/* Google */}
          <motion.a
            href={`${BACKEND_URL}/api/auth/google`}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors duration-150"
            style={{
              borderColor: "var(--mj-border)",
              background: "rgba(255,255,255,0.8)",
              color: "var(--mj-charcoal)",
            }}
          >
            {/* Google SVG icon */}
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </motion.a>

          {/* Facebook */}
          {/* <motion.a
            href={`${BACKEND_URL}/api/auth/facebook`}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium transition-colors duration-150"
            style={{
              borderColor: "var(--mj-border)",
              background: "rgba(255,255,255,0.8)",
              color: "var(--mj-charcoal)",
            }}
          >
            {/* Facebook SVG icon */}
            {/* <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
              <path fill="#1877F2" d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
            </svg>
            Facebook */}
          {/* </motion.a> */}
        </div>
      </motion.div>
    </div>
  );
}
