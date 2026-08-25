import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../api/axios";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setVerified(false);
      setStatus("Verification token is missing.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const res = await axiosInstance.post(
          "/auth/verify",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setVerified(true);
          setStatus(res.data.message);
          toast.success(res.data.message);
          setTimeout(() => navigate("/login"), 2500);
        }
      } catch (error) {
        setVerified(false);
        const message =
          error.response?.data?.message || "Verification link is invalid or expired.";
        setStatus(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate]);

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

        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: "var(--mj-cream)" }}
            >
              <Loader2 className="h-9 w-9" style={{ color: "var(--mj-gold)" }} />
            </motion.div>
            <h2
              className="mb-2 text-2xl font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)" }}
            >
              Verifying your email…
            </h2>
            <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>
              Please wait a moment.
            </p>
          </>
        ) : verified ? (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: "var(--mj-cream)" }}
            >
              <CheckCircle2 className="h-10 w-10" style={{ color: "var(--mj-gold-dark)" }} />
            </motion.div>
            <h2
              className="mb-2 text-3xl font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)" }}
            >
              Email verified ✨
            </h2>
            <p className="mb-7 text-sm" style={{ color: "var(--mj-text-muted)" }}>
              {status}
            </p>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login")}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--mj-gold-light) 0%, var(--mj-gold) 60%, var(--mj-gold-dark) 100%)",
                boxShadow: "0 6px 20px rgba(201,169,110,0.35)",
              }}
            >
              Continue to sign in
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </>
        ) : (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: "var(--mj-blush)" }}
            >
              <XCircle className="h-10 w-10" style={{ color: "var(--mj-rose-dark)" }} />
            </motion.div>
            <h2
              className="mb-2 text-3xl font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)" }}
            >
              Verification failed
            </h2>
            <p className="mb-7 text-sm" style={{ color: "var(--mj-text-muted)" }}>
              {status}
            </p>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/signup")}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold"
              style={{
                background: "transparent",
                border: "1px solid var(--mj-border)",
                color: "var(--mj-charcoal)",
              }}
            >
              Back to sign up
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
}
