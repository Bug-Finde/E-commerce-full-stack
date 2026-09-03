import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const ERROR_MESSAGES = {
  oauth_failed:    "Social login failed. Please try again.",
  google_failed:   "Google login failed. Please try again.",
  facebook_failed: "Facebook login failed. Please try again.",
  account_blocked: "Your account has been blocked. Please contact support.",
  server_error:    "Something went wrong. Please try again.",
};

export default function OAuthCallback() {
  const [params]  = useSearchParams();
  const navigate  = useNavigate();
  const { login } = useAuth();
  const handled   = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    // Immediately wipe the token/data from the address bar
    window.history.replaceState({}, document.title, "/auth/callback");

    const error = params.get("error");
    if (error) {
      toast.error(ERROR_MESSAGES[error] || "Login failed.");
      navigate("/login", { replace: true });
      return;
    }

    const raw = params.get("data");
    if (!raw) {
      toast.error("No authentication data received.");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const parsed = JSON.parse(decodeURIComponent(raw));

      // token lives inside the data object from the backend
      const { token, ...user } = parsed;

      if (!token) throw new Error("Missing token");

      login(user, token);
      toast.success(`Welcome, ${user.firstName}!`);
      navigate(user.role === "admin" ? "/admin" : "/", { replace: true });
    } catch (err) {
      console.error("OAuthCallback parse error:", err);
      toast.error("Failed to process login. Please try again.");
      navigate("/login", { replace: true });
    }
  }, []); // empty deps — only run once on mount

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--mj-cream)" }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-solid"
          style={{ borderColor: "var(--mj-gold) transparent transparent transparent" }}
        />
        <p className="text-sm font-medium" style={{ color: "var(--mj-text-muted)" }}>
          Completing sign-in…
        </p>
      </div>
    </div>
  );
}
