import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ChevronLeft, ChevronRight, X, Eye, Package,
  Clock, Truck, CheckCircle, XCircle, RefreshCw,
} from "lucide-react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { getImageUrl } from "../../utils/imageUrl";

const ORDER_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

const statusConfig = {
  pending:    { label: "Pending",    bg: "#FEF3C7", color: "#92400E", border: "#FCD34D", icon: Clock },
  processing: { label: "Processing", bg: "#DBEAFE", color: "#1E40AF", border: "#93C5FD", icon: RefreshCw },
  shipped:    { label: "Shipped",    bg: "#EDE9FE", color: "#5B21B6", border: "#C4B5FD", icon: Truck },
  delivered:  { label: "Delivered",  bg: "#D1FAE5", color: "#065F46", border: "#6EE7B7", icon: CheckCircle },
  cancelled:  { label: "Cancelled",  bg: "#FEE2E2", color: "#991B1B", border: "#FCA5A5", icon: XCircle },
};

function StatusBadge({ status }) {
  const cfg = statusConfig[status] || statusConfig.pending;
  const Icon = cfg.icon;
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold capitalize"
      style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
      <Icon className="w-3 h-3" />
      {cfg.label}
    </span>
  );
}

function OrderDetailModal({ order, onClose, onStatusChange }) {
  const [status, setStatus] = useState(order.orderStatus || "pending");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (status === order.orderStatus) { onClose(); return; }
    setSaving(true);
    try {
      await axiosInstance.put(`/orders/update-status/${order._id}`, { orderStatus: status });
      toast.success("Order status updated");
      onStatusChange();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(44,36,32,0.55)" }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 16 }} transition={{ duration: 0.2 }}
        className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "white", border: "1px solid var(--mj-border)" }}
        onClick={e => e.stopPropagation()}>

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4"
          style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}>
          <div>
            <p className="subheading mb-0.5">Order Details</p>
            <p className="text-sm font-bold" style={{ color: "var(--mj-charcoal)" }}>
              #{order.orderId || order._id?.slice(-8).toUpperCase()}
            </p>
          </div>
          <button onClick={onClose} className="hover:opacity-70 transition-opacity"
            style={{ color: "var(--mj-text-muted)" }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">

          {/* Customer info */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2"
              style={{ color: "var(--mj-text-muted)" }}>Customer</p>
            <div className="p-4 rounded-xl" style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
              <p className="text-sm font-semibold" style={{ color: "var(--mj-charcoal)" }}>
                {order.userId?.firstName} {order.userId?.lastName}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--mj-text-muted)" }}>
                {order.userId?.email}
              </p>
            </div>
          </div>

          {/* Shipping address */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2"
              style={{ color: "var(--mj-text-muted)" }}>Delivery Address</p>
            <div className="p-4 rounded-xl" style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
              <p className="text-sm" style={{ color: "var(--mj-charcoal)" }}>
                {order.shippingAddress?.address}
              </p>
              <p className="text-sm" style={{ color: "var(--mj-charcoal)" }}>
                {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}
              </p>
              <p className="text-sm mt-1 font-medium" style={{ color: "var(--mj-warm-brown)" }}>
                📞 {order.shippingAddress?.phone}
              </p>
            </div>
          </div>

          {/* Order items */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2"
              style={{ color: "var(--mj-text-muted)" }}>Items ({order.items?.length || 0})</p>
            <div className="space-y-2">
              {(order.items || []).map((item, i) => {
                const imgSrc = getImageUrl(item.image);
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0"
                      style={{ background: "var(--mj-blush)" }}>
                      {imgSrc
                        ? <img src={imgSrc} alt={item.name} className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-4 h-4" style={{ color: "var(--mj-text-light)" }} />
                          </div>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: "var(--mj-charcoal)" }}>
                        {item.name}
                      </p>
                      <p className="text-[11px]" style={{ color: "var(--mj-text-muted)" }}>
                        Qty: {item.qty} · {item.color} · {item.size}
                      </p>
                    </div>
                    <p className="text-xs font-bold shrink-0" style={{ color: "var(--mj-charcoal)" }}>
                      Rs. {Number(item.price * item.qty).toLocaleString("en-PK")}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order totals */}
          <div className="p-4 rounded-xl space-y-2"
            style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
            <div className="flex justify-between text-xs" style={{ color: "var(--mj-text-muted)" }}>
              <span>Subtotal</span>
              <span>Rs. {Number(order.subtotal || 0).toLocaleString("en-PK")}</span>
            </div>
            <div className="flex justify-between text-xs" style={{ color: "var(--mj-text-muted)" }}>
              <span>Shipping</span>
              <span>{(order.shippingCost || 0) === 0 ? "Free" : `Rs. ${order.shippingCost}`}</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-2"
              style={{ color: "var(--mj-charcoal)", borderTop: "1px solid var(--mj-border)" }}>
              <span>Total</span>
              <span>Rs. {Number(order.totalAmount || 0).toLocaleString("en-PK")}</span>
            </div>
            <div className="flex justify-between text-xs pt-1" style={{ color: "var(--mj-text-muted)" }}>
              <span>Payment</span>
              <span className="font-medium">💵 {order.paymentMethod} — {order.paymentStatus}</span>
            </div>
          </div>

          {/* Update status */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2"
              style={{ color: "var(--mj-text-muted)" }}>Update Order Status</p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {ORDER_STATUSES.map(s => {
                const cfg = statusConfig[s];
                return (
                  <button key={s} type="button" onClick={() => setStatus(s)}
                    className="py-2 px-1 rounded-lg text-[10px] font-bold capitalize transition-all"
                    style={status === s
                      ? { background: cfg.bg, color: cfg.color, border: `2px solid ${cfg.border}` }
                      : { background: "white", color: "var(--mj-text-muted)", border: "1px solid var(--mj-border)" }}>
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4"
          style={{ borderTop: "1px solid var(--mj-border)", background: "var(--mj-ivory)" }}>
          <button type="button" onClick={onClose}
            className="px-5 py-2.5 btn-outline rounded-lg text-xs">
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={saving}
            className="px-5 py-2.5 btn-gold rounded-lg text-xs font-bold disabled:opacity-60">
            {saving ? "Saving…" : "Save Status"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AdminOrders() {
  const [orders, setOrders]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage]             = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const LIMIT = 10;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/orders/all-orders");
      setOrders(res.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  // Client-side filter + search
  const filtered = orders.filter(o => {
    const matchStatus = statusFilter === "all" || o.orderStatus === statusFilter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      o.orderId?.toLowerCase().includes(q) ||
      o.userId?.firstName?.toLowerCase().includes(q) ||
      o.userId?.lastName?.toLowerCase().includes(q) ||
      o.userId?.email?.toLowerCase().includes(q) ||
      o.shippingAddress?.city?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / LIMIT);
  const paginated  = filtered.slice((page - 1) * LIMIT, page * LIMIT);

  // Summary counts
  const counts = ORDER_STATUSES.reduce((acc, s) => {
    acc[s] = orders.filter(o => o.orderStatus === s).length;
    return acc;
  }, {});

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="subheading mb-1">Management</p>
          <h1 className="heading-display text-3xl">Orders</h1>
          <p className="mt-1 text-sm" style={{ color: "var(--mj-text-muted)" }}>
            {orders.length} total orders
          </p>
        </div>
        <button onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors"
          style={{ background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Status summary pills */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => { setStatusFilter("all"); setPage(1); }}
          className="px-4 py-2 rounded-full text-xs font-bold transition-all"
          style={statusFilter === "all"
            ? { background: "var(--mj-charcoal)", color: "white" }
            : { background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
          All ({orders.length})
        </button>
        {ORDER_STATUSES.map(s => {
          const cfg = statusConfig[s];
          return (
            <button key={s} onClick={() => { setStatusFilter(s); setPage(1); }}
              className="px-4 py-2 rounded-full text-xs font-bold capitalize transition-all"
              style={statusFilter === s
                ? { background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }
                : { background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
              {cfg.label} ({counts[s] || 0})
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none z-10"
          style={{ color: "var(--mj-text-light)" }} />
        <input type="text" placeholder="Search order ID, customer, city…"
          value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="input-mj with-icon" />
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-2">
          {[1,2,3,4,5].map(i => <div key={i} className="skeleton h-16 rounded-lg" />)}
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1px solid var(--mj-border)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}>
                  {["Order ID", "Customer", "Items", "Total", "Status", "Date", "Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: "var(--mj-text-muted)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((order, i) => (
                  <tr key={order._id}
                    style={{ borderBottom: "1px solid var(--mj-border-light)",
                             background: i % 2 === 0 ? "white" : "var(--mj-ivory)" }}>
                    <td className="px-4 py-3">
                      <p className="text-xs font-bold font-mono" style={{ color: "var(--mj-gold-dark)" }}>
                        #{order.orderId || order._id?.slice(-8).toUpperCase()}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold" style={{ color: "var(--mj-charcoal)" }}>
                        {order.userId?.firstName} {order.userId?.lastName}
                      </p>
                      <p className="text-[11px]" style={{ color: "var(--mj-text-muted)" }}>
                        {order.shippingAddress?.city}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium" style={{ color: "var(--mj-text-muted)" }}>
                      {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs font-bold" style={{ color: "var(--mj-charcoal)" }}>
                        Rs. {Number(order.totalAmount || 0).toLocaleString("en-PK")}
                      </p>
                      <p className="text-[10px]" style={{ color: "var(--mj-text-light)" }}>COD</p>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.orderStatus || "pending"} />
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--mj-text-muted)" }}>
                      {new Date(order.createdAt).toLocaleDateString("en-PK", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelectedOrder(order)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                        style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}
                        title="View & Edit">
                        <Eye className="w-3.5 h-3.5" style={{ color: "var(--mj-gold-dark)" }} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paginated.length === 0 && (
              <div className="py-16 text-center">
                <Package className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--mj-text-light)" }} strokeWidth={1} />
                <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>
                  {search || statusFilter !== "all" ? "No orders match your filters" : "No orders yet"}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg disabled:opacity-30"
            style={{ background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold"
              style={n === page
                ? { background: "var(--mj-charcoal)", color: "white" }
                : { background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
              {n}
            </button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg disabled:opacity-30"
            style={{ background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Order detail modal */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onStatusChange={fetchOrders}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
