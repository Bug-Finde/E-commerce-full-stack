import { useEffect, useState } from "react";
import { Trash2, Star, CheckCircle, XCircle, Search } from "lucide-react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

export default function AdminReviews() {
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [page, setPage]         = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch]     = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/review/all?page=${page}&limit=10`);
      setReviews(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch { toast.error("Failed to load reviews"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchReviews(); }, [page]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this review?")) return;
    try {
      await axiosInstance.delete(`/review/${id}`);
      toast.success("Review deleted"); fetchReviews();
    } catch (err) { toast.error(err.response?.data?.message || "Delete failed"); }
  };

  const handleToggleApproval = async (r) => {
    try {
      await axiosInstance.put(`/review/${r._id}`, { isApproved: !r.isApproved });
      toast.success(r.isApproved ? "Review unapproved" : "Review approved"); fetchReviews();
    } catch { toast.error("Update failed"); }
  };

  const filtered = search
    ? reviews.filter(r =>
        r.comment?.toLowerCase().includes(search.toLowerCase()) ||
        r.userId?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        r.productId?.productName?.toLowerCase().includes(search.toLowerCase())
      )
    : reviews;

  return (
    <div className="space-y-6">
      <div>
        <p className="subheading mb-1">Moderation</p>
        <h1 className="heading-display text-3xl">Reviews</h1>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none z-10"
          style={{ color: "var(--mj-text-light)" }} />
        <input type="text" placeholder="Search reviews…" value={search}
          onChange={e => setSearch(e.target.value)} className="input-mj with-icon" />
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="skeleton rounded-xl h-24" />)}</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(r => (
            <div key={r._id} className="rounded-xl bg-white p-5"
              style={{ border: "1px solid var(--mj-border)" }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-sm font-semibold" style={{ color: "var(--mj-charcoal)" }}>
                      {r.userId?.firstName} {r.userId?.lastName}
                    </span>
                    {/* Stars */}
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className="h-3 w-3"
                          style={{ fill: i <= r.rating ? "var(--mj-gold)" : "transparent",
                                   color: i <= r.rating ? "var(--mj-gold)" : "var(--mj-border)" }} />
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                      style={r.isApproved
                        ? { background: "#D1FAE5", color: "#065F46" }
                        : { background: "#FEF3C7", color: "#92400E" }}>
                      {r.isApproved ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <p className="text-[11px] mb-2" style={{ color: "var(--mj-text-muted)" }}>
                    On <span style={{ color: "var(--mj-warm-brown)" }}>
                      {r.productId?.productName || "Deleted Product"}
                    </span>
                    {" · "}{new Date(r.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm" style={{ color: "var(--mj-charcoal)" }}>{r.comment}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleToggleApproval(r)}
                    title={r.isApproved ? "Unapprove" : "Approve"}
                    className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                    style={r.isApproved
                      ? { background: "#FEF3C7", border: "1px solid #FCD34D" }
                      : { background: "#D1FAE5", border: "1px solid #6EE7B7" }}>
                    {r.isApproved
                      ? <XCircle className="h-4 w-4" style={{ color: "#D97706" }} />
                      : <CheckCircle className="h-4 w-4" style={{ color: "#059669" }} />}
                  </button>
                  <button onClick={() => handleDelete(r._id)} title="Delete"
                    className="w-8 h-8 flex items-center justify-center rounded-lg"
                    style={{ background: "var(--mj-blush)", border: "1px solid var(--mj-blush-dark)" }}>
                    <Trash2 className="h-4 w-4" style={{ color: "var(--mj-rose)" }} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm" style={{ color: "var(--mj-text-muted)" }}>No reviews found</p>
          )}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
            <button key={n} onClick={() => setPage(n)}
              className="w-8 h-8 rounded-lg text-xs font-bold transition-colors"
              style={n === page
                ? { background: "var(--mj-charcoal)", color: "white" }
                : { background: "white", border: "1px solid var(--mj-border)", color: "var(--mj-warm-brown)" }}>
              {n}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
