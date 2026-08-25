import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Trash2, Ban, CheckCircle, Shield, X, User, ShieldOff } from "lucide-react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { getImageUrl } from "../../utils/imageUrl";

export default function AdminUsers() {
  const [users, setUsers]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [roleModal, setRoleModal] = useState(null); // { user, role }
  const [processing, setProcessing] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/user/get-all-users");
      let data = res.data.data || [];
      if (search) {
        const s = search.toLowerCase();
        data = data.filter(u =>
          u.firstName?.toLowerCase().includes(s) ||
          u.lastName?.toLowerCase().includes(s) ||
          u.email?.toLowerCase().includes(s)
        );
      }
      setUsers(data);
    } catch { toast.error("Failed to load users"); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, [search]);

  const handleToggleBlock = async (id) => {
    try {
      const res = await axiosInstance.patch(`/user/toggle-block/${id}`);
      toast.success(res.data.message); fetchUsers();
    } catch (err) { toast.error(err.response?.data?.message || "Action failed"); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      const res = await axiosInstance.delete(`/user/delete-user/${id}`);
      toast.success(res.data.message); fetchUsers();
    } catch (err) { toast.error(err.response?.data?.message || "Delete failed"); }
  };

  const confirmRoleChange = async () => {
    if (!roleModal) return;
    setProcessing(true);
    try {
      const res = await axiosInstance.patch(`/user/change-role/${roleModal.user._id}`, { role: roleModal.role });
      toast.success(res.data.message); setRoleModal(null); fetchUsers();
    } catch (err) { toast.error(err.response?.data?.message || "Role change failed"); }
    finally { setProcessing(false); }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="subheading mb-1">Management</p>
        <h1 className="heading-display text-3xl">Users</h1>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
          style={{ color: "var(--mj-text-light)" }} />
        <input type="text" placeholder="Search users…" value={search}
          onChange={e => setSearch(e.target.value)} className="input-mj  px-6" />
      </div>

      {loading ? (
        <div className="space-y-2">{[1,2,3,4].map(i => <div key={i} className="skeleton h-14 rounded-lg" />)}</div>
      ) : (
        <div className="rounded-xl overflow-hidden bg-white" style={{ border: "1px solid var(--mj-border)" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--mj-cream)", borderBottom: "1px solid var(--mj-border)" }}>
                  {["User","Email","Role","Status","Joined","Actions"].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: "var(--mj-text-muted)", letterSpacing: "0.12em" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id}
                    style={{ borderBottom: "1px solid var(--mj-border-light)",
                             background: i % 2 === 0 ? "white" : "var(--mj-ivory)" }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden shrink-0"
                          style={{ border: "2px solid var(--mj-gold)", background: "var(--mj-blush)" }}>
                          {u.avatar
                            ? <img src={getImageUrl(u.avatar)} alt={u.firstName} className="w-full h-full object-cover" />
                            : <div className="w-full h-full flex items-center justify-center text-xs font-bold"
                                style={{ color: "var(--mj-gold-dark)" }}>
                                {(u.firstName||"U").charAt(0)}
                              </div>}
                        </div>
                        <span className="font-medium" style={{ color: "var(--mj-charcoal)" }}>
                          {u.firstName} {u.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--mj-text-muted)" }}>
                      {u.email}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase"
                        style={u.role === "admin"
                          ? { background: "var(--mj-cream)", color: "var(--mj-gold-dark)", border: "1px solid var(--mj-gold-light)" }
                          : { background: "var(--mj-ivory)", color: "var(--mj-text-muted)", border: "1px solid var(--mj-border)" }}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                        style={u.isBlocked
                          ? { background: "#FEE2E2", color: "#991B1B", border: "1px solid #FCA5A5" }
                          : { background: "#D1FAE5", color: "#065F46", border: "1px solid #6EE7B7" }}>
                        {u.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--mj-text-muted)" }}>
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => handleToggleBlock(u._id)}
                          title={u.isBlocked ? "Unblock" : "Block"}
                          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                          style={{ background: u.isBlocked ? "#D1FAE5" : "#FEE2E2",
                                   border: `1px solid ${u.isBlocked ? "#6EE7B7" : "#FCA5A5"}` }}>
                          {u.isBlocked
                            ? <CheckCircle className="h-3.5 w-3.5" style={{ color: "#059669" }} />
                            : <Ban className="h-3.5 w-3.5" style={{ color: "#DC2626" }} />}
                        </button>

                        <button onClick={() => setRoleModal({ user: u, role: u.role === "user" ? "admin" : "user" })}
                          title={u.role === "user" ? "Make Admin" : "Remove Admin"}
                          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                          style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border)" }}>
                          {u.role === "user"
                            ? <Shield className="h-3.5 w-3.5" style={{ color: "var(--mj-gold-dark)" }} />
                            : <ShieldOff className="h-3.5 w-3.5" style={{ color: "var(--mj-text-muted)" }} />}
                        </button>

                        <button onClick={() => handleDelete(u._id)} title="Delete"
                          className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                          style={{ background: "var(--mj-blush)", border: "1px solid var(--mj-blush-dark)" }}>
                          <Trash2 className="h-3.5 w-3.5" style={{ color: "var(--mj-rose)" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <p className="py-10 text-center text-sm" style={{ color: "var(--mj-text-muted)" }}>No users found</p>
            )}
          </div>
        </div>
      )}

      {/* Role change confirm */}
      <AnimatePresence>
        {roleModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(44,36,32,0.5)" }}
            onClick={() => setRoleModal(null)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
              className="w-full max-w-sm rounded-2xl p-6 shadow-2xl"
              style={{ background: "white", border: "1px solid var(--mj-border)" }}
              onClick={e => e.stopPropagation()}>
              <h3 className="heading-display text-xl mb-3">Confirm Role Change</h3>
              <p className="text-sm mb-5" style={{ color: "var(--mj-text-muted)" }}>
                Change <strong style={{ color: "var(--mj-charcoal)" }}>
                  {roleModal.user.firstName} {roleModal.user.lastName}
                </strong>'s role to{" "}
                <strong style={{ color: "var(--mj-gold-dark)" }}>{roleModal.role}</strong>?
              </p>
              <div className="flex gap-3">
                <button onClick={() => setRoleModal(null)}
                  className="flex-1 py-2.5 btn-outline rounded-lg text-xs">Cancel</button>
                <button onClick={confirmRoleChange} disabled={processing}
                  className="flex-1 py-2.5 btn-gold rounded-lg text-xs font-bold disabled:opacity-60">
                  {processing ? "Processing…" : "Confirm"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
