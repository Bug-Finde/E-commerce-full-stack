import React, { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Shield,
  Package,
} from "lucide-react";
import { AppContext } from "../context/Context";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { getImageUrl } from "../utils/imageUrl";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/products" },
  { label: "New Arrivals", to: "/products?sort=newest" },
  { label: "Best Sellers", to: "/products?sort=rating-desc" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null);
  const searchRef = useRef(null);
  const { cartCount } = useContext(AppContext);
  const { wishlistCount } = useWishlist();
  const { user, isAdmin, isAuthenticated, logout } = useAuth();

  const userId = user?._id;
  const avatarUrl = getImageUrl(user?.avatar);
  const initial = (user?.firstName || user?.email || "U").charAt(0).toUpperCase();

  // Detect scroll for header background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to.split("?")[0]);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm border-b border-[var(--mj-border-light)]"
          : "bg-[var(--mj-ivory)] border-b border-[var(--mj-border-light)]"
      }`}
    >
      {/* Announcement bar */}
      <div
        className="hidden sm:flex items-center justify-center px-4 py-2 text-center text-[11px] font-semibold tracking-widest uppercase"
        style={{ background: "var(--mj-charcoal)", color: "white", letterSpacing: "0.15em" }}
      >
        ✦ Free delivery on orders above Rs. 2,500 &nbsp;·&nbsp; Cash on Delivery Available ✦
      </div>

      <div className="container-mj">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center w-9 h-9 text-[var(--mj-charcoal)]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="Meri Jewelry - Home"
          >
            <img
              src="/meri-jewelry-logo.svg"
              alt="Meri Jewelry"
              className="h-11 w-auto object-contain"
              onError={(e) => { e.target.style.display = "none"; }}
            />
            <span
              className="hidden sm:block text-xl font-medium tracking-wide text-[var(--mj-charcoal)]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "0.04em" }}
            >
              Meri Jewelry
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`px-3.5 py-2 text-[12.5px] font-semibold tracking-wider uppercase transition-colors duration-150 ${
                  isActive(to)
                    ? "text-[var(--mj-gold-dark)]"
                    : "text-[var(--mj-warm-brown)] hover:text-[var(--mj-gold-dark)]"
                }`}
                style={{ letterSpacing: "0.06em" }}
              >
                {label}
              </Link>
            ))}

            {/* Admin link — only shown when role is admin */}
            {isAdmin && (
              <Link
                to="/admin"
                className={`ml-1 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-150 ${
                  location.pathname.startsWith("/admin")
                    ? "text-white"
                    : "hover:opacity-90"
                }`}
                style={{
                  background: location.pathname.startsWith("/admin")
                    ? "var(--mj-charcoal)"
                    : "var(--mj-gold)",
                  color: "white",
                  letterSpacing: "0.1em",
                }}
                aria-label="Admin Dashboard"
              >
                <Shield className="w-3 h-3" />
                Admin
              </Link>
            )}
          </nav>

          {/* Action icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <div className="relative" ref={searchRef}>
              <button
                type="button"
                onClick={() => setSearchOpen((v) => !v)}
                className="flex items-center justify-center w-9 h-9 text-[var(--mj-warm-brown)] hover:text-[var(--mj-gold-dark)] transition-colors"
                aria-label="Search"
              >
                <Search className="w-4.5 h-4.5" />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    onSubmit={handleSearch}
                    initial={{ opacity: 0, scaleX: 0.85, y: -4 }}
                    animate={{ opacity: 1, scaleX: 1, y: 0 }}
                    exit={{ opacity: 0, scaleX: 0.85, y: -4 }}
                    transition={{ duration: 0.2 }}
                    style={{ transformOrigin: "right" }}
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-lg shadow-xl border border-[var(--mj-border)] overflow-hidden"
                  >
                    <div className="flex items-center">
                      <Search className="ml-3.5 w-4 h-4 text-[var(--mj-text-light)] shrink-0" />
                      <input
                        autoFocus
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search jewelry..."
                        className="flex-1 px-3 py-3 text-sm text-[var(--mj-charcoal)] placeholder-[var(--mj-text-light)] bg-transparent focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="mr-2 px-3 py-1.5 btn-gold rounded text-[11px]"
                      >
                        Go
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex items-center justify-center w-9 h-9 text-[var(--mj-warm-brown)] hover:text-[var(--mj-gold-dark)] transition-colors"
              aria-label={`Wishlist (${wishlistCount} items)`}
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlistCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-4 h-4 px-0.5 rounded-full text-[9px] font-bold text-white"
                  style={{ background: "var(--mj-rose)" }}
                >
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-9 h-9 text-[var(--mj-warm-brown)] hover:text-[var(--mj-gold-dark)] transition-colors"
              aria-label={`Cart (${cartCount} items)`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-4 h-4 px-0.5 rounded-full text-[9px] font-bold text-white"
                  style={{ background: "var(--mj-gold)" }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded text-[var(--mj-warm-brown)] hover:text-[var(--mj-gold-dark)] transition-colors"
                  aria-label="Account menu"
                  aria-expanded={profileOpen}
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={user?.firstName || "Account"}
                      className="w-7 h-7 rounded-full object-cover border border-[var(--mj-border)]"
                    />
                  ) : (
                    <span
                      className="flex w-7 h-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
                      style={{ background: "var(--mj-gold)" }}
                    >
                      {initial}
                    </span>
                  )}
                  <ChevronDown
                    className={`hidden sm:block w-3 h-3 transition-transform duration-150 ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-[var(--mj-border)] shadow-xl overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-[var(--mj-border-light)]">
                        <p className="text-xs font-semibold text-[var(--mj-charcoal)]">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-[11px] text-[var(--mj-text-muted)] mt-0.5 truncate">
                          {user?.email}
                        </p>
                      </div>
                      <div className="p-1.5">
                        <Link
                          to={userId ? `/profile/${userId}` : "/profile"}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-[var(--mj-warm-brown)] hover:bg-[var(--mj-cream)] hover:text-[var(--mj-charcoal)] rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4" />
                          My Account
                        </Link>
                        <Link
                          to={userId ? `/profile/${userId}` : "/profile"}
                          onClick={() => { setProfileOpen(false); }}
                          state={{ tab: "orders" }}
                          className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-[var(--mj-warm-brown)] hover:bg-[var(--mj-cream)] hover:text-[var(--mj-charcoal)] rounded-lg transition-colors"
                        >
                          <Package className="w-4 h-4" />
                          My Orders
                        </Link>
                        <Link
                          to="/wishlist"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-[13px] text-[var(--mj-warm-brown)] hover:bg-[var(--mj-cream)] hover:text-[var(--mj-charcoal)] rounded-lg transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          Wishlist
                          {wishlistCount > 0 && (
                            <span className="ml-auto badge-gold">{wishlistCount}</span>
                          )}
                        </Link>
                        {isAdmin && (
                          <>
                            <hr className="my-1 border-[var(--mj-border-light)]" />
                            <Link
                              to="/admin"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-bold rounded-lg transition-all"
                              style={{
                                background: "var(--mj-cream)",
                                color: "var(--mj-gold-dark)",
                                border: "1px solid var(--mj-gold-light)",
                              }}
                            >
                              <span
                                className="flex w-5 h-5 items-center justify-center rounded"
                                style={{ background: "var(--mj-gold)", flexShrink: 0 }}
                              >
                                <Shield className="w-3 h-3 text-white" />
                              </span>
                              Admin Dashboard
                            </Link>
                          </>
                        )}
                        <hr className="my-1 border-[var(--mj-border-light)]" />
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] text-[var(--mj-text-muted)] hover:bg-[var(--mj-cream)] hover:text-[var(--mj-charcoal)] rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 btn-gold rounded-lg text-[11px]"
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-[var(--mj-border-light)] bg-white"
          >
            <div className="container-mj py-4 flex flex-col gap-0.5">
              {/* Mobile search */}
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 mb-3 px-3 py-2.5 bg-[var(--mj-cream)] rounded-lg"
              >
                <Search className="w-4 h-4 text-[var(--mj-text-light)] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search jewelry..."
                  className="flex-1 bg-transparent text-sm text-[var(--mj-charcoal)] placeholder-[var(--mj-text-light)] focus:outline-none"
                />
              </form>

              {navLinks.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-3 text-sm font-semibold tracking-wider uppercase rounded-lg transition-colors ${
                    isActive(to)
                      ? "bg-[var(--mj-cream)] text-[var(--mj-gold-dark)]"
                      : "text-[var(--mj-warm-brown)] hover:bg-[var(--mj-cream)]"
                  }`}
                  style={{ letterSpacing: "0.06em" }}
                >
                  {label}
                </Link>
              ))}

              <hr className="my-2 border-[var(--mj-border-light)]" />

              {isAuthenticated ? (
                <>
                  <Link
                    to={userId ? `/profile/${userId}` : "/profile"}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-3 text-sm text-[var(--mj-warm-brown)] hover:bg-[var(--mj-cream)] rounded-lg"
                  >
                    <User className="w-4 h-4" />
                    My Account
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-3 text-sm text-[var(--mj-warm-brown)] hover:bg-[var(--mj-cream)] rounded-lg"
                  >
                    <Heart className="w-4 h-4" />
                    Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-3 text-sm font-bold rounded-lg transition-all"
                      style={{
                        background: "var(--mj-cream)",
                        color: "var(--mj-gold-dark)",
                        border: "1px solid var(--mj-gold-light)",
                      }}
                    >
                      <span
                        className="flex w-6 h-6 items-center justify-center rounded"
                        style={{ background: "var(--mj-gold)", flexShrink: 0 }}
                      >
                        <Shield className="w-3.5 h-3.5 text-white" />
                      </span>
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-3 text-sm text-[var(--mj-text-muted)] hover:bg-[var(--mj-cream)] rounded-lg w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mx-3 mt-1 py-3 btn-gold rounded-lg text-center text-xs"
                >
                  Sign In / Create Account
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
