import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Trash2, X, Tag, ToggleLeft, ToggleRight, Upload } from "lucide-react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { getImageUrl } from "../../utils/imageUrl";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editCat, setEditCat]   = useState(null);
  const [form, setForm]         = useState({ name: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [saving, setSaving]     = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/category/admin/all");
      setCategories(res.data.data || []);
    } catch { toast.error("Failed to load categories"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const openCreate = () => {
    setEditCat(null); setForm({ name:"", description:"" });
    setImageFile(null); setImagePreview(null); setShowModal(true);
  };

  const openEdit = (c) => {
    setEditCat(c); setForm({ name: c.name||"", description: c.description||"" });
    setImageFile(null);
    setImagePreview(c.image ? getImageUrl(c.image) : null);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error("Category name is required"); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("description", form.description);
      if (imageFile) fd.append("image", imageFile);
      if (editCat) {
        await axiosInstance.put(`/category/${editCat._id}`, fd);
        toast.success("Category updated");
      } else {
        await axiosInstance.post("/category/create", fd);
        toast.success("Category created");
      }
      setShowModal(false); fetchCategories();
    } catch (err) { toast.error(err.response?.data?.message || "Save failed"); }
    finally { setSaving(false); }
  };

  const handleToggleActive = async (c) => {
    try {
      await axiosInstance.put(`/category/${c._id}`, { isActive: !c.isActive });
      toast.success(c.isActive ? "Deactivated" : "Activated"); fetchCategories();
    } catch { toast.error("Toggle failed"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      await axiosInstance.delete(`/category/${id}`);
      toast.success("Category deleted"); fetchCategories();
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
          <p className="subheading mb-1">Taxonomy</p>
          <h1 className="heading-display text-3xl">Categories</h1>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 btn-gold rounded-lg text-xs font-bold">
          <Plus className="h-4 w-4" /> Add Category
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton rounded-xl h-28" />)}
        </div>
      ) : categories.length === 0 ? (
        <div className="py-16 text-center rounded-xl bg-white" style={{ border: "1px solid var(--mj-border)" }}>
          <Tag className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--mj-text-light)" }} strokeWidth={1} />
          <p className="text-sm" style={{ color: "var(--mj-text-muted)" }}>No categories yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(c => (
            <div key={c._id} className="rounded-xl bg-white p-5"
              style={{ border: "1px solid var(--mj-border)" }}>
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
                  style={{ background: "var(--mj-blush)", border: "1px solid var(--mj-blush-dark)" }}>
                  {c.image
                    ? <img src={getImageUrl(c.image)} alt={c.name} className="w-full h-full object-cover" />
                    : <Tag className="w-5 h-5" style={{ color: "var(--mj-rose)" }} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold" style={{ color: "var(--mj-charcoal)" }}>
                      {c.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0"
                      style={c.isActive
                        ? { background: "#D1FAE5", color: "#065F46" }
                        : { background: "#FEE2E2", color: "#991B1B" }}>
                      {c.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "var(--mj-text-muted)" }}>
                    {c.description || "No description"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3" style={{ borderTop: "1px solid var(--mj-border-light)" }}>
                <button onClick={() => handleToggleActive(c)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                  style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
                  {c.isActive ? <ToggleRight className="h-3.5 w-3.5" /> : <ToggleLeft className="h-3.5 w-3.5" />}
                  {c.isActive ? "Deactivate" : "Activate"}
                </button>
                <button onClick={() => openEdit(c)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                  style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
                  <Edit3 className="h-3.5 w-3.5" style={{ color: "var(--mj-gold-dark)" }} />
                </button>
                <button onClick={() => handleDelete(c._id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                  style={{ background: "var(--mj-blush)", border: "1px solid var(--mj-blush-dark)" }}>
                  <Trash2 className="h-3.5 w-3.5" style={{ color: "var(--mj-rose)" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(44,36,32,0.5)" }}
            onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
              style={{ background: "white", border: "1px solid var(--mj-border)" }}
              onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="heading-display text-xl">{editCat ? "Edit Category" : "Add Category"}</h3>
                <button onClick={() => setShowModal(false)} style={{ color: "var(--mj-text-muted)" }}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-3">
                {/* Image upload */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider mb-2"
                    style={{ color: "var(--mj-text-muted)" }}>Image</label>
                  <div className="flex items-center gap-3">
                    {imagePreview && (
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0"
                        style={{ border: "1px solid var(--mj-border)" }}>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button onClick={() => { setImagePreview(null); setImageFile(null); }}
                          className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white"
                          style={{ background: "var(--mj-rose)" }}>
                          <X className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    )}
                    <label className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg cursor-pointer text-xs font-semibold"
                      style={{ background: "var(--mj-cream)", border: "2px dashed var(--mj-border)", color: "var(--mj-text-muted)" }}>
                      <Upload className="w-4 h-4" />
                      {imageFile ? imageFile.name.slice(0, 18) + "…" : "Upload"}
                      <input type="file" accept="image/*" className="hidden"
                        onChange={e => {
                          const f = e.target.files?.[0]; if (!f) return;
                          setImageFile(f);
                          const r = new FileReader();
                          r.onloadend = () => setImagePreview(r.result);
                          r.readAsDataURL(f);
                        }} />
                    </label>
                  </div>
                </div>
                <input type="text" placeholder="Category Name" value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
                <textarea placeholder="Description (optional)" value={form.description} rows={3}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  style={{ ...inputStyle, resize: "none" }} />
              </div>
              <button onClick={handleSave} disabled={saving}
                className="mt-5 w-full py-3 btn-gold rounded-lg text-xs font-bold disabled:opacity-60">
                {saving ? "Saving…" : editCat ? "Update" : "Create"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
