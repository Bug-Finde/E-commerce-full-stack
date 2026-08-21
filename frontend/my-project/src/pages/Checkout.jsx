import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, CheckCircle2, Loader2, ShoppingBag } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AppContext } from "../context/Context";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "./api/axios";
import { toast } from "react-toastify";
import { getImageUrl } from "../utils/imageUrl";

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, cartTotal, clearCart } = useContext(AppContext);

  const FREE_SHIPPING = 2500;
  const SHIPPING_FEE  = 200;
  const shipping = cartTotal >= FREE_SHIPPING ? 0 : SHIPPING_FEE;
  const total    = cartTotal + shipping;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ address: "", city: "", postalCode: "", phone: "" });

  useEffect(() => {
    if (cart.length === 0) navigate("/cart");
  }, [cart, navigate]);

  useEffect(() => {
    if (user) {
      setForm({
        address:    user.address    && user.address    !== "undefined" ? user.address    : "",
        city:       user.city       && user.city       !== "undefined" ? user.city       : "",
        postalCode: user.postalCode && user.postalCode !== "undefined" ? user.postalCode : "",
        phone:      user.phoneNumber && user.phoneNumber !== "undefined" ? user.phoneNumber : "",
      });
    }
  }, [user]);

  const update = key => e => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    if (!form.address.trim())    { toast.error("Address is required");      return false; }
    if (!form.city.trim())       { toast.error("City is required");         return false; }
    if (!form.postalCode.trim()) { toast.error("Postal code is required");  return false; }
    if (!form.phone.trim())      { toast.error("Phone number is required"); return false; }
    if (!/^\+?[0-9\s-]{7,15}$/.test(form.phone)) { toast.error("Enter a valid phone number"); return false; }
    return true;
  };

  const handlePlaceOrder = async e => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post("/orders/place-order", {
        items: cart.map(item => ({
          productId: item.productId, name: item.name,
          price: item.price, qty: item.qty, color: item.color, size: item.size,
        })),
        shippingAddress: form,
        paymentMethod: "COD",
      });
      if (res.data.success) {
        toast.success("Order placed successfully!");
        clearCart();
        navigate(`/profile/${user._id}`, { state: { tab: "orders" } });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return null;

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}
          className="py-12 px-6 text-center">
          <p className="subheading mb-2">Final Step</p>
          <h1 className="heading-display text-4xl sm:text-5xl">Checkout</h1>
        </div>

        <div className="container-mj py-12">
          <div className="flex items-center justify-between mb-8">
            <Link to="/cart"
              className="flex items-center gap-1.5 text-xs font-semibold transition-colors"
              style={{ color: "var(--mj-text-muted)" }}>
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">

            {/* ── Left: form ── */}
            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-6">

              {/* Shipping address */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-6 rounded-xl bg-white"
                style={{ border: "1px solid var(--mj-border)" }}>

                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-6"
                  style={{ color: "var(--mj-text-muted)", letterSpacing: "0.16em" }}>
                  <MapPin className="w-4 h-4" style={{ color: "var(--mj-gold)" }} />
                  Delivery Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
                      style={{ color: "var(--mj-text-muted)" }}>Street Address</label>
                    <input type="text" className="input-mj"
                      placeholder="House 12, Street 4, Gulberg"
                      value={form.address} onChange={update("address")} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
                        style={{ color: "var(--mj-text-muted)" }}>City</label>
                      <input type="text" className="input-mj"
                        placeholder="Lahore" value={form.city} onChange={update("city")} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
                        style={{ color: "var(--mj-text-muted)" }}>Postal Code</label>
                      <input type="text" className="input-mj"
                        placeholder="54000" value={form.postalCode} onChange={update("postalCode")} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
                      style={{ color: "var(--mj-text-muted)" }}>Phone Number</label>
                    <input type="tel" className="input-mj"
                      placeholder="+92 300 1234567" value={form.phone} onChange={update("phone")} />
                  </div>
                </div>
              </motion.div>

              {/* Payment method */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="p-6 rounded-xl bg-white"
                style={{ border: "1px solid var(--mj-border)" }}>

                <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5"
                  style={{ color: "var(--mj-text-muted)", letterSpacing: "0.16em" }}>
                  <CreditCard className="w-4 h-4" style={{ color: "var(--mj-gold)" }} />
                  Payment Method
                </h2>

                <div className="flex items-start gap-4 p-4 rounded-xl"
                  style={{ background: "var(--mj-cream)", border: "2px solid var(--mj-gold)" }}>
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--mj-gold)" }} />
                  <div>
                    <p className="text-sm font-bold" style={{ color: "var(--mj-charcoal)" }}>
                      Cash on Delivery (COD)
                    </p>
                    <p className="mt-1 text-xs" style={{ color: "var(--mj-text-muted)" }}>
                      Pay with cash when your order arrives at your door.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.button type="submit" disabled={loading}
                whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 btn-gold rounded-xl flex items-center justify-center gap-2 text-xs font-bold disabled:opacity-60">
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order...</>
                ) : (
                  `Place Order · Rs. ${Number(total).toLocaleString("en-PK")}`
                )}
              </motion.button>
            </form>

            {/* ── Right: order summary ── */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="h-fit rounded-xl bg-white p-6"
              style={{ border: "1px solid var(--mj-border)" }}>

              <h2 className="text-xs font-bold uppercase tracking-widest mb-5"
                style={{ color: "var(--mj-text-muted)", letterSpacing: "0.18em" }}>
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-5">
                {cart.map(item => {
                  const imgSrc = getImageUrl(item.image);
                  return (
                    <div key={`${item.productId}-${item.color}-${item.size}`}
                      className="flex gap-3 p-3 rounded-lg"
                      style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border-light)" }}>
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0"
                        style={{ background: "var(--mj-blush)" }}>
                        {imgSrc
                          ? <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
                          : <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="w-5 h-5" style={{ color: "var(--mj-text-light)" }} strokeWidth={1} />
                            </div>}
                      </div>
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: "var(--mj-charcoal)" }}>
                          {item.name}
                        </p>
                        <p className="text-[10px]" style={{ color: "var(--mj-text-light)" }}>
                          Qty: {item.qty}
                        </p>
                        <p className="text-xs font-bold" style={{ color: "var(--mj-charcoal)" }}>
                          Rs. {Number(item.price * item.qty).toLocaleString("en-PK")}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2.5 text-sm mb-5">
                <div className="flex justify-between">
                  <span style={{ color: "var(--mj-text-muted)" }}>Subtotal</span>
                  <span style={{ color: "var(--mj-charcoal)" }}>
                    Rs. {Number(cartTotal).toLocaleString("en-PK")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "var(--mj-text-muted)" }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? "var(--mj-gold-dark)" : "var(--mj-charcoal)" }}>
                    {shipping === 0 ? "Free" : `Rs. ${SHIPPING_FEE}`}
                  </span>
                </div>
              </div>

              <div className="divider-gold mb-5" />

              <div className="flex justify-between font-bold text-base"
                style={{ color: "var(--mj-charcoal)" }}>
                <span>Total</span>
                <span>Rs. {Number(total).toLocaleString("en-PK")}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
