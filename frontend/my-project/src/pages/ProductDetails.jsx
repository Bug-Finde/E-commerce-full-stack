import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag, Star, Minus, Plus, Truck, ShieldCheck, RotateCcw,
  Heart, Share2, ChevronLeft, ChevronRight, Check, Package,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "./api/axios";
import { AppContext } from "../context/Context";
import { useWishlist } from "../context/WishlistContext";
import { getImageUrl } from "../utils/imageUrl";

const features = [
  { icon: Truck,       label: "Nationwide Delivery" },
  { icon: ShieldCheck, label: "Secure & Carefully Packed" },
  { icon: RotateCcw,   label: "Easy Returns" },
  { icon: Package,     label: "Cash on Delivery" },
];

const DEFAULT_HIGHLIGHTS = [
  "Premium quality materials",
  "Expert craftsmanship",
  "Hypoallergenic finish",
  "Ships within 2–3 business days",
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(AppContext);
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [product, setProduct]       = useState(null);
  const [related, setRelated]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [qty, setQty]               = useState(1);
  const [tab, setTab]               = useState("description");
  const [added, setAdded]           = useState(false);
  const [activeImg, setActiveImg]   = useState(0);
  const [copied, setCopied]         = useState(false);

  const wishlisted = isWishlisted(product?._id);

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/product/detail-product/${id}`);
        if (res.data.success) setProduct(res.data.data);
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    if (!product?.category) return;
    axiosInstance.get("product/get-products", { params: { category: product.category, limit: 4 } })
      .then(r => {
        if (r.data.success) setRelated(r.data.data.filter(p => p._id !== id).slice(0, 4));
      }).catch(() => {});
  }, [product?.category, id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const displayPrice  = product?.salePrice || product?.productPrice || 0;
  const originalPrice = product?.salePrice ? product?.productPrice : null;
  const discountPct   = originalPrice ? Math.round((1 - displayPrice / originalPrice) * 100) : 0;
  const imgSrc        = getImageUrl(product?.productImg);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <>
        <Navbar />
        <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>
          <div className="container-mj py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="skeleton rounded-xl aspect-square" />
              <div className="space-y-4 pt-4">
                <div className="skeleton h-4 w-24 rounded" />
                <div className="skeleton h-8 w-3/4 rounded" />
                <div className="skeleton h-6 w-1/3 rounded" />
                <div className="skeleton h-32 rounded" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ── Not found ── */
  if (!product) {
    return (
      <>
        <Navbar />
        <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}
          className="flex flex-col items-center justify-center gap-5 py-20">
          <ShoppingBag className="w-14 h-14" style={{ color: "var(--mj-text-light)" }} strokeWidth={1} />
          <h2 className="heading-display text-2xl">Product not found</h2>
          <Link to="/products" className="px-6 py-3 btn-gold rounded-lg text-xs">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>
        <div className="container-mj py-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs mb-8" style={{ color: "var(--mj-text-light)" }}>
            <Link to="/" className="hover:text-[var(--mj-gold-dark)] transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-[var(--mj-gold-dark)] transition-colors">Shop</Link>
            <span>/</span>
            <span style={{ color: "var(--mj-charcoal)" }}>{product.productName}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16">

            {/* ── Gallery ── */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden bg-[var(--mj-cream)] aspect-square"
                style={{ border: "1px solid var(--mj-border)" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={activeImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="w-full h-full">
                    {imgSrc ? (
                      <img src={imgSrc} alt={product.productName}
                        className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-24 h-24" style={{ color: "var(--mj-text-light)" }} strokeWidth={1} />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {discountPct > 0 && (
                  <span className="absolute top-4 left-4 badge-rose">-{discountPct}%</span>
                )}

                <button type="button" onClick={() => setActiveImg(i => Math.max(0, i - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-105"
                  style={{ border: "1px solid var(--mj-border)" }}>
                  <ChevronLeft className="w-4 h-4" style={{ color: "var(--mj-warm-brown)" }} />
                </button>
                <button type="button" onClick={() => setActiveImg(i => i + 1)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-105"
                  style={{ border: "1px solid var(--mj-border)" }}>
                  <ChevronRight className="w-4 h-4" style={{ color: "var(--mj-warm-brown)" }} />
                </button>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mt-3">
                {[0, 1, 2, 3].map(i => (
                  <button key={i} type="button" onClick={() => setActiveImg(i)}
                    className="aspect-square rounded-lg overflow-hidden transition-all"
                    style={{
                      border: activeImg === i
                        ? "2px solid var(--mj-gold)"
                        : "1px solid var(--mj-border)",
                      background: "var(--mj-cream)",
                    }}>
                    {imgSrc ? (
                      <img src={imgSrc} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5" style={{ color: "var(--mj-text-light)" }} strokeWidth={1} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* ── Product Info ── */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }} className="flex flex-col">

              {/* Category + actions */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <p className="subheading">{product.category || "Jewelry"}</p>
                <div className="flex items-center gap-2 shrink-0">
                  <button type="button" onClick={() => toggleWishlist(product)}
                    className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110"
                    style={{ background: wishlisted ? "var(--mj-blush)" : "var(--mj-cream)", border: "1px solid var(--mj-border)" }}
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}>
                    <Heart className="w-4 h-4 transition-colors"
                      style={{ color: wishlisted ? "var(--mj-rose)" : "var(--mj-text-muted)",
                               fill: wishlisted ? "var(--mj-rose)" : "transparent" }} />
                  </button>
                  <button type="button" onClick={handleShare}
                    className="w-9 h-9 flex items-center justify-center rounded-full transition-all hover:scale-110"
                    style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}
                    aria-label="Share">
                    {copied
                      ? <Check className="w-4 h-4" style={{ color: "var(--mj-gold)" }} />
                      : <Share2 className="w-4 h-4" style={{ color: "var(--mj-text-muted)" }} />}
                  </button>
                </div>
              </div>

              {/* Name */}
              <h1 className="heading-display text-3xl sm:text-4xl mb-3" style={{ lineHeight: 1.1 }}>
                {product.productName}
              </h1>

              {/* Stars placeholder */}
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5"
                      style={{ fill: "var(--mj-gold)", color: "var(--mj-gold)" }} />
                  ))}
                </div>
                <span className="text-xs" style={{ color: "var(--mj-text-muted)" }}>Premium Quality</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold" style={{ color: "var(--mj-charcoal)" }}>
                  Rs. {Number(displayPrice).toLocaleString("en-PK")}
                </span>
                {originalPrice && (
                  <span className="text-lg line-through" style={{ color: "var(--mj-text-light)" }}>
                    Rs. {Number(originalPrice).toLocaleString("en-PK")}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="divider-gold mb-6" />

              {/* Short description */}
              {product.description && (
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--mj-text-muted)" }}>
                  {product.description.slice(0, 180)}{product.description.length > 180 ? "…" : ""}
                </p>
              )}

              {/* Qty + Add to Cart */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center rounded-lg overflow-hidden"
                  style={{ border: "1px solid var(--mj-border)", background: "white" }}>
                  <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="w-10 h-11 flex items-center justify-center transition-colors hover:bg-[var(--mj-cream)]"
                    style={{ color: "var(--mj-warm-brown)" }}>
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold"
                    style={{ color: "var(--mj-charcoal)" }}>{qty}</span>
                  <button type="button" onClick={() => setQty(q => q + 1)}
                    className="w-10 h-11 flex items-center justify-center transition-colors hover:bg-[var(--mj-cream)]"
                    style={{ color: "var(--mj-warm-brown)" }}>
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <motion.button type="button" onClick={handleAddToCart}
                  whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                  className="flex-1 h-11 btn-gold rounded-lg flex items-center justify-center gap-2 text-xs">
                  <AnimatePresence mode="wait" initial={false}>
                    {added ? (
                      <motion.span key="added" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" /> Add to Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {/* Buy Now */}
              <Link to="/checkout" onClick={handleAddToCart}
                className="w-full h-11 btn-outline rounded-lg flex items-center justify-center gap-2 text-xs mb-6">
                Buy Now
              </Link>

              {/* Trust features */}
              <div className="grid grid-cols-2 gap-3">
                {features.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 p-3 rounded-lg"
                    style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
                    <Icon className="w-4 h-4 shrink-0" style={{ color: "var(--mj-gold)" }} />
                    <span className="text-[11px] font-semibold" style={{ color: "var(--mj-warm-brown)" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* SKU */}
              <p className="mt-4 text-[11px]" style={{ color: "var(--mj-text-light)" }}>
                SKU: {product._id?.slice(-8).toUpperCase() || "N/A"}
              </p>
            </motion.div>
          </div>

          {/* ── Tabs: Description / Highlights / Jewelry Care ── */}
          <div className="mt-16 rounded-xl overflow-hidden" style={{ border: "1px solid var(--mj-border)" }}>
            <div className="flex border-b" style={{ background: "var(--mj-cream)", borderColor: "var(--mj-border)" }}>
              {[
                { id: "description", label: "Description" },
                { id: "highlights",  label: "Product Details" },
                { id: "care",        label: "Jewelry Care" },
              ].map(t => (
                <button key={t.id} type="button" onClick={() => setTab(t.id)}
                  className="relative px-6 py-4 text-xs font-bold uppercase tracking-wider transition-colors"
                  style={{ color: tab === t.id ? "var(--mj-gold-dark)" : "var(--mj-text-muted)" }}>
                  {t.label}
                  {tab === t.id && (
                    <motion.span layoutId="pdp-tab" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "var(--mj-gold)" }} />
                  )}
                </button>
              ))}
            </div>
            <div className="p-8" style={{ background: "white" }}>
              <AnimatePresence mode="wait">
                {tab === "description" && (
                  <motion.p key="desc" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                    className="text-sm leading-relaxed max-w-2xl" style={{ color: "var(--mj-text-muted)" }}>
                    {product.description || "A beautifully crafted piece of jewelry. No description provided."}
                  </motion.p>
                )}
                {tab === "highlights" && (
                  <motion.ul key="highlights" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                    {DEFAULT_HIGHLIGHTS.map(h => (
                      <li key={h} className="flex items-start gap-2.5 text-sm"
                        style={{ color: "var(--mj-text-muted)" }}>
                        <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "var(--mj-gold)" }} />
                        {h}
                      </li>
                    ))}
                  </motion.ul>
                )}
                {tab === "care" && (
                  <motion.div key="care" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                    className="space-y-3 max-w-2xl">
                    {[
                      "Store in a cool, dry place away from direct sunlight.",
                      "Remove before swimming, bathing, or exercising.",
                      "Clean gently with a soft, lint-free cloth.",
                      "Keep away from perfumes, lotions, and harsh chemicals.",
                      "Store separately to prevent scratching.",
                    ].map(c => (
                      <p key={c} className="flex items-start gap-2.5 text-sm"
                        style={{ color: "var(--mj-text-muted)" }}>
                        <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "var(--mj-rose)" }} />
                        {c}
                      </p>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Related Products ── */}
          {related.length > 0 && (
            <div className="mt-20">
              <div className="text-center mb-10">
                <p className="subheading mb-2">You May Also Like</p>
                <h2 className="heading-display text-3xl">Related Pieces</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {related.map((p, i) => (
                  <ProductCard key={p._id} product={p} index={i} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}
