import React, { useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard, BarChart3, Package, Users, Tag,
  MessageSquare, Settings, Menu, X, ChevronRight,
  LogOut, Shield, ArrowLeft, ShoppingBag,
} from "lucide-react";
import { getImageUrl } from "../../utils/imageUrl";

const sidebarItems = [
  { label: "Dashboard",  to: "/admin",            icon: LayoutDashboard },
  { label: "Analytics",  to: "/admin/analytics",  icon: BarChart3 },
  { label: "Orders",     to: "/admin/orders",     icon: ShoppingBag },
  { label: "Products",   to: "/admin/products",   icon: Package },
  { label: "Users",      to: "/admin/users",      icon: Users },
  { label: "Categories", to: "/admin/categories", icon: Tag },
  { label: "Reviews",    to: "/admin/reviews",    icon: MessageSquare },
  { label: "Settings",   to: "/admin/settings",   icon: Settings },
];

function Breadcrumbs() {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  const crumbs = parts.map((part, i) => ({
    label: part.charAt(0).toUpperCase() + part.slice(1),
    path: "/" + parts.slice(0, i + 1).join("/"),
  }));
  return (
    <nav className="flex items-center gap-1 text-xs" style={{ color: "var(--mj-text-light)" }}>
      <NavLink to="/admin" className="hover:text-[var(--mj-gold-dark)] transition-colors font-medium">
        Admin
      </NavLink>
      {crumbs.slice(1).map(({ label, path }) => (
        <React.Fragment key={path}>
          <ChevronRight className="h-3 w-3" />
          <NavLink to={path} className="hover:text-[var(--mj-gold-dark)] transition-colors capitalize">
            {label}
          </NavLink>
        </React.Fragment>
      ))}
    </nav>
  );
}

function SidebarContent({ onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const avatarUrl = getImageUrl(user?.avatar);
  const initial = (user?.firstName || "A").charAt(0).toUpperCase();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex h-full flex-col" style={{ background: "var(--mj-ivory)" }}>

      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5"
        style={{ borderBottom: "1px solid var(--mj-border)" }}>
        <div className="flex items-center gap-3">
          <img src="/meri-jewelry-logo.svg" alt="Meri Jewelry"
            className="h-11 w-11 object-contain"
            style={{ filter: "drop-shadow(0 1px 4px rgba(168,86,90,0.15))" }}
            onError={e => { e.target.style.display = "none"; }} />
          <div>
            <p className="text-sm font-semibold italic" style={{ fontFamily: "var(--font-display)", color: "var(--mj-rose-dark)", lineHeight: 1 }}>
              Meri
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: "var(--mj-gold-dark)", letterSpacing: "0.18em" }}>
              Jewelry · Admin
            </p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ color: "var(--mj-text-muted)" }}>
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {sidebarItems.map(({ label, to, icon: Icon }) => {
          const isActive = to === "/admin"
            ? location.pathname === "/admin"
            : location.pathname.startsWith(to);
          return (
            <NavLink key={to} to={to} onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150"
              style={isActive
                ? { background: "var(--mj-cream)", color: "var(--mj-gold-dark)", border: "1px solid var(--mj-gold-light)" }
                : { color: "var(--mj-text-muted)", border: "1px solid transparent" }}>
              <Icon className="h-4 w-4 shrink-0"
                style={{ color: isActive ? "var(--mj-gold)" : "var(--mj-text-light)" }} />
              {label}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-4 py-4 space-y-1" style={{ borderTop: "1px solid var(--mj-border)" }}>
        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0"
            style={{ border: "2px solid var(--mj-gold)", background: "var(--mj-blush)" }}>
            {avatarUrl
              ? <img src={avatarUrl} alt={user?.firstName} className="w-full h-full object-cover" />
              : <div className="w-full h-full flex items-center justify-center text-xs font-bold"
                  style={{ color: "var(--mj-gold-dark)" }}>{initial}</div>}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: "var(--mj-charcoal)" }}>
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-[10px] truncate" style={{ color: "var(--mj-text-light)" }}>
              {user?.email}
            </p>
          </div>
        </div>

        <NavLink to="/" onClick={onClose}
          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors"
          style={{ color: "var(--mj-text-muted)" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--mj-charcoal)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--mj-text-muted)"}>
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </NavLink>

        <button onClick={handleLogout}
          className="flex w-full items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors"
          style={{ color: "var(--mj-rose)" }}>
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const avatarUrl = getImageUrl(user?.avatar);
  const initial = (user?.firstName || "A").charAt(0).toUpperCase();

  return (
    <div className="flex h-screen w-full overflow-hidden" style={{ background: "var(--mj-ivory)" }}>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0"
        style={{ borderRight: "1px solid var(--mj-border)", background: "var(--mj-ivory)" }}>
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="relative w-60 flex flex-col shadow-2xl">
              <SidebarContent onClose={() => setSidebarOpen(false)} />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top bar */}
        <header className="flex h-14 items-center justify-between px-4 sm:px-6 shrink-0"
          style={{ background: "white", borderBottom: "1px solid var(--mj-border)" }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex w-9 h-9 items-center justify-center rounded-lg transition-colors"
              style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
              <Menu className="h-4 w-4" />
            </button>
            <Breadcrumbs />
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs" style={{ color: "var(--mj-text-muted)" }}>
              {user?.firstName} {user?.lastName}
            </span>
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0"
              style={{ border: "2px solid var(--mj-gold)", background: "var(--mj-blush)" }}>
              {avatarUrl
                ? <img src={avatarUrl} alt={user?.firstName} className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-xs font-bold"
                    style={{ color: "var(--mj-gold-dark)" }}>{initial}</div>}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6" style={{ background: "var(--mj-ivory)" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
