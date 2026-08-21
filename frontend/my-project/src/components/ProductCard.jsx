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

  const wishlisted = isWishlisted(product?._id);
  const imgSrc = getImageUrl(product?.productImg);

  const displayPrice = product?.salePrice || product?.productPrice || 0;
  const originalPrice = product?.salePrice ? product?.productPrice : null;
  const discountPct = originalPrice
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.05 }}
      className="group relative flex flex-col bg-white rounded-lg overflow-hidden card-lift"
      style={{ border: "1px solid var(--mj-border-light)" }}
    >
      {/* Image area */}
      <div className="relative img-zoom aspect-[3/4] overflow-hidden bg-[var(--mj-cream)]">
        <Link to={`/product-detail/${product?._id}`} tabIndex={-1} aria-hidden="true">
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
                className="w-12 h-12"
                style={{ color: "var(--mj-text-light)" }}
                strokeWidth={1}
              />
              <span className="text-xs" style={{ color: "var(--mj-text-light)" }}>
                No image
              </span>
            </div>
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discountPct > 0 && (
            <span className="badge-rose">-{discountPct}%</span>
          )}
          {product?.isNew && (
            <span className="badge-gold">New</span>
          )}
        </div>

        {/* Action buttons (shown on hover) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
          <button
            type="button"
            onClick={handleWishlist}
            className="flex w-9 h-9 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110"
            style={{ border: "1px solid var(--mj-border-light)" }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className="w-4 h-4 transition-colors"
              style={{
                fill: wishlisted ? "var(--mj-rose)" : "transparent",
                color: wishlisted ? "var(--mj-rose)" : "var(--mj-text-muted)",
              }}
            />
          </button>

          <Link
            to={`/product-detail/${product?._id}`}
            className="flex w-9 h-9 items-center justify-center rounded-full bg-white shadow-md transition-all hover:scale-110"
            style={{ border: "1px solid var(--mj-border-light)" }}
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4" style={{ color: "var(--mj-text-muted)" }} />
          </Link>
        </div>

        {/* Add to cart — slides up from bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-3 btn-gold flex items-center justify-center gap-2 text-[11px]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info area */}
      <div className="flex flex-col flex-1 p-4">
        <p
          className="text-[10px] font-semibold uppercase tracking-widest mb-1.5"
          style={{ color: "var(--mj-gold)", letterSpacing: "0.14em" }}
        >
          {product?.category || "Jewelry"}
        </p>

        <Link
          to={`/product-detail/${product?._id}`}
          className="flex-1 group/title"
        >
          <h3
            className="text-[15px] font-medium leading-snug text-[var(--mj-charcoal)] group-hover/title:text-[var(--mj-gold-dark)] transition-colors line-clamp-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {product?.productName || "Jewelry Piece"}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mt-2.5">
          <span
            className="text-base font-bold"
            style={{ color: "var(--mj-charcoal)", fontFamily: "var(--font-body)" }}
          >
            Rs. {Number(displayPrice).toLocaleString("en-PK")}
          </span>
          {originalPrice && (
            <span
              className="text-sm line-through"
              style={{ color: "var(--mj-text-light)" }}
            >
              Rs. {Number(originalPrice).toLocaleString("en-PK")}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
