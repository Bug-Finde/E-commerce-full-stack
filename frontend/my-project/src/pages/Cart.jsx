import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/Context";
import { getImageUrl } from "../utils/imageUrl";

export default function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useContext(AppContext);

  const FREE_SHIPPING_THRESHOLD = 2500;
  const SHIPPING_FEE = 200;
  const shipping = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : SHIPPING_FEE;
  const total = cartTotal + shipping;
  const remaining = FREE_SHIPPING_THRESHOLD - cartTotal;

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}
          className="py-12 px-6 text-center">
          <p className="subheading mb-2">Your Selection</p>
          <h1 className="heading-display text-4xl sm:text-5xl">Shopping Cart</h1>
        </div>

        <div className="container-mj py-12">
          {cart.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-5 py-20 text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: "var(--mj-blush)" }}>
                <ShoppingBag className="w-8 h-8" style={{ color: "var(--mj-rose)" }} strokeWidth={1.5} />
              </div>
              <h2 className="heading-display text-2xl">Your cart is empty</h2>
              <p className="text-sm" style={{ color: "var(--mj-text-muted)", maxWidth: 280 }}>
                Discover our beautiful jewelry collection and add your favourites.
              </p>
              <Link to="/products" className="mt-2 px-8 py-3 btn-gold rounded-lg text-xs">
                Shop Now
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">

              {/* Cart items */}
              <div>
                {/* Free shipping progress */}
                {cartTotal < FREE_SHIPPING_THRESHOLD && (
                  <div className="mb-6 p-4 rounded-xl" style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
                    <p className="text-xs font-semibold mb-2" style={{ color: "var(--mj-warm-brown)" }}>
                      Add Rs. {Number(remaining).toLocaleString("en-PK")} more for free delivery
                    </p>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--mj-border)" }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100)}%`,
                                 background: "var(--mj-gold)" }} />
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {cart.map((item) => {
                      const imgSrc = getImageUrl(item.image);
                      return (
                        <motion.div key={`${item.productId}-${item.color}-${item.size}`}
                          layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                          className="flex gap-4 p-4 rounded-xl bg-white sm:p-5"
                          style={{ border: "1px solid var(--mj-border)" }}>

                          {/* Image */}
                          <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0"
                            style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border-light)" }}>
                            {imgSrc
                              ? <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center">
                                  <ShoppingBag className="w-8 h-8" style={{ color: "var(--mj-text-light)" }} strokeWidth={1} />
                                </div>}
                          </div>

                          {/* Details */}
                          <div className="flex flex-1 flex-col justify-between min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="text-sm font-medium truncate"
                                  style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)", fontSize: "1rem" }}>
                                  {item.name}
                                </h3>
                                <p className="text-[11px] mt-0.5" style={{ color: "var(--mj-text-light)" }}>
                                  {item.color} · {item.size}
                                </p>
                              </div>
                              <button type="button"
                                onClick={() => removeFromCart(item.productId, item.color, item.size)}
                                className="w-8 h-8 flex items-center justify-center rounded-full shrink-0 transition-colors hover:bg-[var(--mj-blush)]"
                                aria-label="Remove item">
                                <Trash2 className="w-3.5 h-3.5" style={{ color: "var(--mj-rose)" }} />
                              </button>
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              {/* Qty stepper */}
                              <div className="flex items-center rounded-lg overflow-hidden"
                                style={{ border: "1px solid var(--mj-border)" }}>
                                <button type="button"
                                  onClick={() => updateQty(item.productId, item.color, item.size, item.qty - 1)}
                                  className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--mj-cream)]"
                                  style={{ color: "var(--mj-warm-brown)" }}>
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-xs font-bold"
                                  style={{ color: "var(--mj-charcoal)" }}>{item.qty}</span>
                                <button type="button"
                                  onClick={() => updateQty(item.productId, item.color, item.size, item.qty + 1)}
                                  className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-[var(--mj-cream)]"
                                  style={{ color: "var(--mj-warm-brown)" }}>
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="text-sm font-bold" style={{ color: "var(--mj-charcoal)" }}>
                                Rs. {Number(item.price * item.qty).toLocaleString("en-PK")}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between mt-5">
                  <Link to="/products"
                    className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-[var(--mj-gold-dark)]"
                    style={{ color: "var(--mj-text-muted)" }}>
                    <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
                  </Link>
                  <button type="button" onClick={clearCart}
                    className="text-xs font-semibold underline-offset-2 hover:underline"
                    style={{ color: "var(--mj-rose)" }}>
                    Clear Cart
                  </button>
                </div>
              </div>

              {/* Order summary */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="h-fit rounded-xl p-6 bg-white"
                style={{ border: "1px solid var(--mj-border)" }}>

                <h2 className="text-xs font-bold uppercase tracking-widest mb-5"
                  style={{ color: "var(--mj-text-muted)", letterSpacing: "0.18em" }}>
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "var(--mj-text-muted)" }}>Subtotal ({cart.reduce((s, i) => s + i.qty, 0)} items)</span>
                    <span className="font-medium" style={{ color: "var(--mj-charcoal)" }}>
                      Rs. {Number(cartTotal).toLocaleString("en-PK")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--mj-text-muted)" }}>Shipping</span>
                    <span className="font-medium" style={{ color: shipping === 0 ? "var(--mj-gold-dark)" : "var(--mj-charcoal)" }}>
                      {shipping === 0 ? "Free" : `Rs. ${SHIPPING_FEE}`}
                    </span>
                  </div>
                </div>

                <div className="divider-gold my-5" />

                <div className="flex justify-between text-base font-bold mb-6"
                  style={{ color: "var(--mj-charcoal)" }}>
                  <span>Total</span>
                  <span>Rs. {Number(total).toLocaleString("en-PK")}</span>
                </div>

                <Link to="/checkout">
                  <motion.button type="button" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 btn-gold rounded-lg text-xs font-bold">
                    Proceed to Checkout
                  </motion.button>
                </Link>

                <p className="mt-4 text-center text-[11px]" style={{ color: "var(--mj-text-light)" }}>
                  💵 Cash on Delivery available
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
