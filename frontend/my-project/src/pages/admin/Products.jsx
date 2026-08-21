import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Edit3, Trash2, X, Package, ChevronLeft, ChevronRight, Upload } from "lucide-react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { getImageUrl } from "../../utils/imageUrl";

const JEWELRY_CATEGORIES = ["Necklaces","Earrings","Jhumkas","Rings","Bracelets","Bangles","Matha Sets","Hair Accessories","Jewelry Sets"];

function Modal({ title, onClose, children }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(44,36,32,0.5)" }}
      onClick={onClose}>
      <motion.div initial={{ scale: 0.95, y: 16 }} animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 16 }} transition={{ duration: 0.2 }}
        className="w-full max-w-md rounded-2xl p-6 shadow-2xl"
        style={{ background: "white", border: "1px solid var(--mj-border)" }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="heading-display text-xl">{title}</h3>
          <button onClick={onClose} style={{ color: "var(--mj-text-muted)" }}
            className="hover:text-[var(--mj-charcoal)] transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function AdminProducts() {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState("");
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal]   = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ productName:"", productPrice:"", description:"", brand:"", category:"" });
  const [imageFile, setImageFile]   = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving]         = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/product/get-products?page=${page}&limit=10&search=${search}`);
      setProducts(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch { toast.error("Failed to load products"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, [page, search]);

  const openCreate = () => {
    setEditProduct(null);
    setForm({ productName:"", productPrice:"", description:"", brand:"", category:"" });
    setImageFile(null); setImagePreview(null); setShowModal(true);
  };

  const openEdit = (p) => {
    setEditProduct(p);
    setForm({ productName: p.productName||"", productPrice: p.productPrice||"",
              description: p.description||"", brand: p.brand||"", category: p.category||"" });
    setImageFile(null);
    setImagePreview(p.productImg ? getImageUrl(p.productImg) : null);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.productName.trim()) { toast.error("Product name is required"); return; }
    if (!form.productPrice)       { toast.error("Price is required"); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v]) => fd.append(k, v));
      if (imageFile) fd.append("productImg", imageFile);
      if (editProduct) {
        await axiosInstance.put(`/product/update-product/${editProduct._id}`, fd);
        toast.success("Product updated");
      } else {
        await axiosInstance.post("/product/create", fd);
        toast.success("Product created");
      }
      setShowModal(false); fetchProducts();
    } catch (err) { toast.error(err.response?.data?.message || "Save failed"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await axiosInstance.delete(`/product/del-product/${id}`);
      toast.success("Product deleted"); fetchProducts();
    } catch (err) { toast.error(err.response?.data?.message || "Delete failed"); }
  };

  const inputStyle = {
    width: "100%", padding: "0.625rem 1rem", borderRadius: "0.5rem",
    border: "1px solid var(--mj-border)", background: "var(--mj-cream)",
    color: "var(--mj-charcoal)", fontSize: "0.875rem", outline: "none",
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="subheading mb-1">Catalog</p>
          <h1 className="heading-display text-3xl">Products</h1>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 btn-gold rounded-lg text-xs font-bold">
          <Plus className="h-4 w-4" /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
          style={{ color: "var(--mj-text-light)" }} />
        <input type="text" placeholder="Search products..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          className="input-mj pl-10" />
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-2">
          {[1,2,3,4,5].map(i => <div key={i} className="skeleton h-14 rounded-lg" />)}
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1px solid var(--mj-border)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}>
                  {["Product","Price","Category","Brand","Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: "var(--mj-text-muted)", letterSpacing: "0.12em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p, i) => (
                  <tr key={p._id}
                    style={{ borderBottom: "1px solid var(--mj-border-light)",
                             background: i % 2 === 0 ? "white" : "var(--mj-ivory)" }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0"
                          style={{ background: "var(--mj-blush)", border: "1px solid var(--mj-border-light)" }}>
                          {p.productImg
                            ? <img src={getImageUrl(p.productImg)} alt={p.productName}
                                className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center">
                                <Package className="h-4 w-4" style={{ color: "var(--mj-text-light)" }} />
                              </div>}
                        </div>
                        <span className="font-medium" style={{ color: "var(--mj-charcoal)" }}>
                          {p.productName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold" style={{ color: "var(--mj-charcoal)" }}>
                      Rs. {Number(p.productPrice).toLocaleString("en-PK")}
                    </td>
                    <td className="px-4 py-3">
                      {p.category && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                          style={{ background: "var(--mj-cream)", color: "var(--mj-warm-brown)",
                                   border: "1px solid var(--mj-border)" }}>
                          {p.category}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--mj-text-muted)" }}>
                      {p.brand || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(p)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                          style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}
                          title="Edit">
                          <Edit3 className="h-3.5 w-3.5" style={{ color: "var(--mj-gold-dark)" }} />
                        </button>
                        <button onClick={() => handleDelete(p._id)}
                          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                          style={{ background: "var(--mj-blush)", border: "1px solid var(--mj-blush-dark)" }}
                          title="Delete">
                          <Trash2 className="h-3.5 w-3.5" style={{ color: "var(--mj-rose)" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <p className="py-10 text-center text-sm" style={{ color: "var(--mj-text-muted)" }}>
                No products found
              </p>
            )}
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg disabled:opacity-30 transition-colors"
            style={{ background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
            <ChevronLeft className="h-4 w-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-xs font-bold transition-colors"
              style={n === page
                ? { background: "var(--mj-charcoal)", color: "white" }
                : { background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
              {n}
            </button>
          ))}
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
            className="w-9 h-9 flex items-center justify-center rounded-lg disabled:opacity-30 transition-colors"
            style={{ background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <Modal title={editProduct ? "Edit Product" : "Add Product"} onClose={() => setShowModal(false)}>
            <div className="space-y-3">
              {/* Image upload */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-2"
                  style={{ color: "var(--mj-text-muted)" }}>Product Image</label>
                <div className="flex items-center gap-3">
                  {imagePreview && (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0"
                      style={{ border: "1px solid var(--mj-border)" }}>
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button onClick={() => { setImagePreview(null); setImageFile(null); }}
                        className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                        style={{ background: "var(--mj-rose)" }}>
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}
                  <label className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg cursor-pointer text-xs font-semibold transition-colors"
                    style={{ background: "var(--mj-cream)", border: "2px dashed var(--mj-border)", color: "var(--mj-text-muted)" }}>
                    <Upload className="w-4 h-4" />
                    {imageFile ? imageFile.name.slice(0, 20) + "…" : "Upload Image"}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>

              <input type="text" placeholder="Product Name" value={form.productName}
                onChange={e => setForm({ ...form, productName: e.target.value })}
                style={inputStyle} />
              <input type="number" placeholder="Price (Rs.)" value={form.productPrice}
                onChange={e => setForm({ ...form, productPrice: e.target.value })}
                style={inputStyle} />
              <textarea placeholder="Description" value={form.description} rows={3}
                onChange={e => setForm({ ...form, description: e.target.value })}
                style={{ ...inputStyle, resize: "none" }} />
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Brand" value={form.brand}
                  onChange={e => setForm({ ...form, brand: e.target.value })}
                  style={inputStyle} />
                <select value={form.category}
                  onChange={e => setForm({ ...form, category: e.target.value })}
                  style={inputStyle}>
                  <option value="">Select Category</option>
                  {JEWELRY_CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <button onClick={handleSave} disabled={saving}
              className="mt-5 w-full py-3 btn-gold rounded-lg text-xs font-bold disabled:opacity-60">
              {saving ? "Saving…" : editProduct ? "Update Product" : "Create Product"}
            </button>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
