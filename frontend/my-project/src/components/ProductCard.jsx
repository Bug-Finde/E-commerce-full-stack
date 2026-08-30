import { useContext } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/Context";
import { useWishlist } from "../context/WishlistContext";
import { getImageUrl } from "../utils/imageUrl";

export function ProductCard({ product, index = 0 }) {
  const { addToCart } = useContext(AppContext);
  const { toggleWishlist, isWishlisted } = useWishlist();

  const wishlisted   = isWishlisted(product?._id);
  const imgSrc       = getImageUrl(product?.productImg);
  const displayPrice = product?.salePrice || product?.productPrice || 0;
  const originalPrice = product?.salePrice ? product?.productPrice : null;
  const discountPct   = originalPrice
    ? Math.round((1 - displayPrice / originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.04 }}
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden card-lift"
      style={{ border: "1px solid var(--mj-border-light)" }}
    >
      {/* ── Image area ── */}
      <div
        className="relative overflow-hidden img-zoom"
        style={{ aspectRatio: "4 / 5", background: "var(--mj-cream)" }}
      >
        <Link
          to={`/product-detail/${product?._id}`}
          tabIndex={-1}
          aria-hidden="true"
          className="block w-full h-full"
        >
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={product?.productName || "Jewelry piece"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <ShoppingBag
                className="w-10 h-10"
                style={{ color: "var(--mj-text-light)" }}
                strokeWidth={1}
              />
              <span className="text-[11px]" style={{ color: "var(--mj-text-light)" }}>
                No image
              </span>
            </div>
          )}
        </Link>

        {/* Discount / New badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {discountPct > 0 && <span className="badge-rose">-{discountPct}%</span>}
          {product?.isNew  && <span className="badge-gold">New</span>}
        </div>

        {/* Wishlist + Quick-view — slide in from right on hover */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
          <button
            type="button"
            onClick={handleWishlist}
            className="flex w-8 h-8 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:scale-110"
            style={{ border: "1px solid var(--mj-border-light)" }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className="w-3.5 h-3.5 transition-colors"
              style={{
                fill:  wishlisted ? "var(--mj-rose)" : "transparent",
                color: wishlisted ? "var(--mj-rose)" : "var(--mj-text-muted)",
              }}
            />
          </button>

          <Link
            to={`/product-detail/${product?._id}`}
            className="flex w-8 h-8 items-center justify-center rounded-full bg-white shadow-sm transition-all hover:scale-110"
            style={{ border: "1px solid var(--mj-border-light)" }}
            aria-label="Quick view"
          >
            <Eye className="w-3.5 h-3.5" style={{ color: "var(--mj-text-muted)" }} />
          </Link>
        </div>

        {/* Add-to-cart bar — slides up from bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-2.5 btn-gold flex items-center justify-center gap-1.5 text-[11px] font-bold"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* ── Info area ── */}
      <div className="flex flex-col p-3 gap-1">
        {/* Category label */}
        <p
          className="text-[9px] font-bold uppercase tracking-widest leading-none"
          style={{ color: "var(--mj-gold)", letterSpacing: "0.14em" }}
        >
          {product?.category || "Jewelry"}
        </p>

        {/* Product name */}
        <Link to={`/product-detail/${product?._id}`}>
          <h3
            className="text-[13px] font-medium leading-snug line-clamp-1
                       text-[var(--mj-charcoal)] hover:text-[var(--mj-gold-dark)] transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {product?.productName || "Jewelry Piece"}
          </h3>
        </Link>

        {/* Price row */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <span
            className="text-sm font-bold"
            style={{ color: "var(--mj-charcoal)" }}
          >
            Rs.&nbsp;{Number(displayPrice).toLocaleString("en-PK")}
          </span>
          {originalPrice && (
            <span
              className="text-[11px] line-through"
              style={{ color: "var(--mj-text-light)" }}
            >
              Rs.&nbsp;{Number(originalPrice).toLocaleString("en-PK")}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
