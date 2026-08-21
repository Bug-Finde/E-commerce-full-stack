import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlist } from "../context/WishlistContext";
import { AppContext } from "../context/Context";
import { getImageUrl } from "../utils/imageUrl";

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useContext(AppContext);

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product._id);
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen" style={{ background: "var(--mj-ivory)" }}>
        <div className="container-mj py-14">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="subheading mb-2">Your Collection</p>
              <h1 className="heading-display text-4xl sm:text-5xl">Wishlist</h1>
            </div>
            <Link
              to="/products"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-[var(--mj-text-muted)] hover:text-[var(--mj-charcoal)] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {wishlist.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-5 py-20 text-center"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "var(--mj-blush)" }}
              >
                <Heart className="w-8 h-8" style={{ color: "var(--mj-rose)" }} strokeWidth={1.5} />
              </div>
              <h2 className="heading-display text-2xl">Your wishlist is empty</h2>
              <p className="text-sm" style={{ color: "var(--mj-text-muted)", maxWidth: 300 }}>
                Browse our collection and save the pieces you love.
              </p>
              <Link
                to="/products"
                className="mt-2 px-8 py-3 btn-gold rounded-lg"
              >
                Explore Jewelry
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>
                  {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved
                </p>
                <button
                  type="button"
                  onClick={clearWishlist}
                  className="text-xs font-semibold underline-offset-2 hover:underline transition-colors"
                  style={{ color: "var(--mj-rose)" }}
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                <AnimatePresence>
                  {wishlist.map((product, i) => {
                    const imgSrc = getImageUrl(product.productImg);
                    const displayPrice = product.salePrice || product.productPrice || 0;
                    const originalPrice = product.salePrice ? product.productPrice : null;

                    return (
                      <motion.div
                        key={product._id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                        className="group relative flex flex-col bg-white rounded-lg overflow-hidden card-lift"
                        style={{ border: "1px solid var(--mj-border-light)" }}
                      >
                        {/* Image */}
                        <div className="relative img-zoom aspect-[3/4] overflow-hidden bg-[var(--mj-cream)]">
                          <Link to={`/product-detail/${product._id}`}>
                            {imgSrc ? (
                              <img
                                src={imgSrc}
                                alt={product.productName}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Heart className="w-10 h-10" style={{ color: "var(--mj-text-light)" }} strokeWidth={1} />
                              </div>
                            )}
                          </Link>
                          {/* Remove button */}
                          <button
                            type="button"
                            onClick={() => removeFromWishlist(product._id)}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ border: "1px solid var(--mj-border-light)" }}
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" style={{ color: "var(--mj-rose)" }} />
                          </button>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col flex-1 p-3">
                          <p
                            className="text-[9px] font-bold uppercase tracking-widest mb-1"
                            style={{ color: "var(--mj-gold)", letterSpacing: "0.14em" }}
                          >
                            {product.category || "Jewelry"}
                          </p>
                          <Link to={`/product-detail/${product._id}`}>
                            <h3
                              className="text-[13px] font-medium leading-snug line-clamp-2 mb-2 hover:text-[var(--mj-gold-dark)] transition-colors"
                              style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)" }}
                            >
                              {product.productName}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-1.5 mb-3">
                            <span className="text-sm font-bold" style={{ color: "var(--mj-charcoal)" }}>
                              Rs. {Number(displayPrice).toLocaleString("en-PK")}
                            </span>
                            {originalPrice && (
                              <span className="text-xs line-through" style={{ color: "var(--mj-text-light)" }}>
                                Rs. {Number(originalPrice).toLocaleString("en-PK")}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleMoveToCart(product)}
                            className="w-full py-2 btn-gold rounded-md text-[10px] flex items-center justify-center gap-1.5"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            Add to Cart
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
