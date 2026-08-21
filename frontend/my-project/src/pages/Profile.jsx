import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MapPin, Hash, Camera, Package, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";
import axiosInstance from "./api/axios";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams, useLocation } from "react-router-dom";
import { getImageUrl } from "../utils/imageUrl";
import { useAuth } from "../context/AuthContext";

const statusConfig = {
  delivered:  { icon: CheckCircle2, label: "Delivered",  bg: "#d1fae5", color: "#065f46", border: "#6ee7b7" },
  shipped:    { icon: Truck,         label: "Shipped",    bg: "#dbeafe", color: "#1e40af", border: "#93c5fd" },
  processing: { icon: Clock,         label: "Processing", bg: "#fef3c7", color: "#92400e", border: "#fcd34d" },
  pending:    { icon: Clock,         label: "Pending",    bg: "#fef3c7", color: "#92400e", border: "#fcd34d" },
  cancelled:  { icon: XCircle,       label: "Cancelled",  bg: "#fee2e2", color: "#991b1b", border: "#fca5a5" },
};

function StatusBadge({ status = "pending" }) {
  const cfg = statusConfig[status] || statusConfig.pending;
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold capitalize"
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

export default function ProfilePage() {
  const { updateUser } = useAuth();
  const { id } = useParams();
  const location = useLocation();

  const [tab, setTab]                 = useState(location.state?.tab || "profile");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile]   = useState(null);
  const [errors, setErrors]           = useState({});
  const [saving, setSaving]           = useState(false);
  const [orders, setOrders]           = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phoneNumber: "", address: "", city: "", postalCode: "",
  });

  useEffect(() => {
    if (!id) return;
    axiosInstance.get(`/user/get-user/${id}`).then(res => {
      const u = res.data.data;
      setForm({
        firstName: u.firstName || "", lastName: u.lastName || "",
        email: u.email || "", phoneNumber: u.phoneNumber || "",
        address: u.address || "", city: u.city || "", postalCode: u.postalCode || "",
      });
      setAvatarPreview(getImageUrl(u.avatar) || null);
    }).catch(err => toast.error(err.response?.data?.message || "Could not load profile"));
  }, [id]);

  useEffect(() => {
    if (tab !== "orders") return;
    setLoadingOrders(true);
    axiosInstance.get("/orders/my-orders")
      .then(res => setOrders(res.data?.data || []))
      .catch(err => toast.error(err.response?.data?.message || "Could not load orders"))
      .finally(() => setLoadingOrders(false));
  }, [tab]);

  const update = key => e => {
    setForm(f => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors(er => ({ ...er, [key]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "Required";
    if (!form.lastName.trim())  next.lastName  = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleUpdate = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (avatarFile) fd.append("avatar", avatarFile);
    try {
      const res = await axiosInstance.put(`/user/updateduser/${id}`, fd);
      const updated = res.data?.data;
      if (updated?.avatar) setAvatarPreview(getImageUrl(updated.avatar));
      if (updated) updateUser(updated);
      setAvatarFile(null);
      toast.success(res.data.message || "Profile updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const TABS = [
    { key: "profile", label: "Profile",    icon: User },
    { key: "orders",  label: "My Orders",  icon: Package },
  ];

  return (
    <>
      <Navbar />
      <div style={{ background: "var(--mj-ivory)", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}
          className="py-12 px-6 text-center">
          <p className="subheading mb-2">My Account</p>
          <h1 className="heading-display text-4xl sm:text-5xl">Your Profile</h1>
        </div>

        <div className="container-mj py-12 max-w-3xl">

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl mb-8 w-fit"
            style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
            {TABS.map(({ key, label, icon: Icon }) => (
              <button key={key} type="button" onClick={() => setTab(key)}
                className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                style={{ color: tab === key ? "white" : "var(--mj-text-muted)" }}>
                {tab === key && (
                  <motion.span layoutId="profile-tab"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "var(--mj-charcoal)" }}
                    transition={{ type: "spring", duration: 0.4 }} />
                )}
                <Icon className="relative z-10 w-3.5 h-3.5" />
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* ── Profile tab ── */}
            {tab === "profile" && (
              <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                className="rounded-xl bg-white p-8"
                style={{ border: "1px solid var(--mj-border)" }}>

                {/* Avatar */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full overflow-hidden"
                      style={{ border: "3px solid var(--mj-gold)", background: "var(--mj-blush)" }}>
                      {avatarPreview
                        ? <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center">
                            <User className="w-8 h-8" style={{ color: "var(--mj-rose)" }} />
                          </div>}
                    </div>
                    <label htmlFor="avatar-upload"
                      className="absolute -bottom-1 -right-1 w-7 h-7 flex items-center justify-center rounded-full cursor-pointer transition-colors"
                      style={{ background: "var(--mj-gold)", border: "2px solid white" }}>
                      <Camera className="w-3.5 h-3.5 text-white" />
                    </label>
                    <input id="avatar-upload" type="file" accept="image/*" className="hidden"
                      onChange={e => {
                        const f = e.target.files?.[0];
                        if (!f) return;
                        setAvatarFile(f);
                        setAvatarPreview(URL.createObjectURL(f));
                      }} />
                  </div>
                  <div>
                    <p className="text-base font-medium" style={{ fontFamily: "var(--font-display)", color: "var(--mj-charcoal)", fontSize: "1.1rem" }}>
                      {form.firstName} {form.lastName}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--mj-text-muted)" }}>
                      JPG or PNG, up to 5 MB
                    </p>
                  </div>
                </div>

                <form onSubmit={handleUpdate} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "First Name",  key: "firstName",   type: "text",  icon: User,  ph: "Sara" },
                      { label: "Last Name",   key: "lastName",    type: "text",  icon: User,  ph: "Khan" },
                      { label: "Email",       key: "email",       type: "email", icon: Mail,  ph: "sara@example.com" },
                      { label: "Phone",       key: "phoneNumber", type: "tel",   icon: Phone, ph: "+92 300 1234567" },
                    ].map(({ label, key, type, icon: Icon, ph }) => (
                      <div key={key}>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
                          style={{ color: "var(--mj-text-muted)" }}>{label}</label>
                        <div className="relative">
                          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                            style={{ color: "var(--mj-text-light)" }} />
                          <input type={type} value={form[key]} onChange={update(key)} placeholder={ph}
                            className={`input-mj pl-10 ${errors[key] ? "error" : ""}`} />
                        </div>
                        {errors[key] && <p className="mt-1 text-xs" style={{ color: "var(--mj-rose)" }}>{errors[key]}</p>}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
                      style={{ color: "var(--mj-text-muted)" }}>Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                        style={{ color: "var(--mj-text-light)" }} />
                      <input type="text" value={form.address} onChange={update("address")}
                        placeholder="House 12, Street 4, Gulberg" className="input-mj pl-10" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { label: "City",        key: "city",        icon: MapPin, ph: "Lahore" },
                      { label: "Postal Code", key: "postalCode",  icon: Hash,   ph: "54000"  },
                    ].map(({ label, key, icon: Icon, ph }) => (
                      <div key={key}>
                        <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
                          style={{ color: "var(--mj-text-muted)" }}>{label}</label>
                        <div className="relative">
                          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                            style={{ color: "var(--mj-text-light)" }} />
                          <input type="text" value={form[key]} onChange={update(key)}
                            placeholder={ph} className="input-mj pl-10" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <motion.button type="submit" disabled={saving}
                      whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 btn-gold rounded-lg text-xs font-bold disabled:opacity-60">
                      {saving ? "Saving..." : "Save Changes"}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ── Orders tab ── */}
            {tab === "orders" && (
              <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                className="space-y-4">

                {loadingOrders ? (
                  Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="skeleton rounded-xl h-24" />
                  ))
                ) : orders.length === 0 ? (
                  <div className="flex flex-col items-center gap-4 py-16 text-center rounded-xl bg-white"
                    style={{ border: "1px solid var(--mj-border)" }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "var(--mj-cream)" }}>
                      <Package className="w-7 h-7" style={{ color: "var(--mj-text-light)" }} strokeWidth={1.5} />
                    </div>
                    <h3 className="heading-display text-xl">No orders yet</h3>
                    <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>
                      Once you place an order it will appear here.
                    </p>
                  </div>
                ) : (
                  orders.map(order => (
                    <div key={order._id}
                      className="rounded-xl bg-white p-5"
                      style={{ border: "1px solid var(--mj-border)" }}>

                      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider mb-1"
                            style={{ color: "var(--mj-gold)", letterSpacing: "0.12em" }}>
                            Order #{order.orderId || order._id?.slice(-8).toUpperCase()}
                          </p>
                          <p className="text-sm font-medium" style={{ color: "var(--mj-charcoal)" }}>
                            {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                          </p>
                          <p className="text-[11px] mt-0.5" style={{ color: "var(--mj-text-muted)" }}>
                            {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-PK",
                              { day: "numeric", month: "long", year: "numeric" }) : ""}
                          </p>
                        </div>
                        <StatusBadge status={order.orderStatus || order.status || "pending"} />
                      </div>

                      <div className="divider-gold mb-4" />

                      <div className="flex items-center justify-between">
                        <p className="text-xs" style={{ color: "var(--mj-text-muted)" }}>
                          💵 {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                        </p>
                        <p className="text-sm font-bold" style={{ color: "var(--mj-charcoal)" }}>
                          Rs. {Number(order.totalAmount || order.total || 0).toLocaleString("en-PK")}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </>
  );
}
