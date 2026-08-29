import { useState } from "react";
import { motion } from "framer-motion";
import { Save, User, Mail, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

export default function AdminSettings() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName:  user?.lastName  || "",
    email:     user?.email     || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await axiosInstance.put(`/user/updateduser/${user._id}`, form);
      updateUser(res.data.data);
      toast.success("Settings saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <p className="subheading mb-1">Configuration</p>
        <h1 className="heading-display text-3xl">Settings</h1>
      </div>

      {/* Account info */}
      <div className="rounded-xl bg-white p-6" style={{ border: "1px solid var(--mj-border)" }}>
        <p className="subheading mb-5">Account Information</p>
        <div className="space-y-4">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "First Name", key: "firstName", ph: "Sara",  icon: User },
              { label: "Last Name",  key: "lastName",  ph: "Khan",  icon: User },
            ].map(({ label, key, ph, icon: Icon }) => (
              <div key={key}>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
                  style={{ color: "var(--mj-text-muted)" }}>
                  {label}
                </label>
                <div className="relative">
                  <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none z-10"
                    style={{ color: "var(--mj-text-light)" }} />
                  <input
                    type="text"
                    value={form[key]}
                    placeholder={ph}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    className="input-mj with-icon"
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5"
              style={{ color: "var(--mj-text-muted)" }}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none z-10"
                style={{ color: "var(--mj-text-light)" }} />
              <input
                type="email"
                value={form.email}
                placeholder="admin@merijewelry.com"
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="input-mj with-icon"
              />
            </div>
          </div>
        </div>

        <motion.button
          onClick={handleSave}
          disabled={saving}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 flex items-center gap-2 px-6 py-3 btn-gold rounded-lg text-xs font-bold disabled:opacity-60"
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving…" : "Save Changes"}
        </motion.button>
      </div>

      {/* Role info */}
      <div className="rounded-xl bg-white p-6" style={{ border: "1px solid var(--mj-border)" }}>
        <p className="subheading mb-5">Role & Permissions</p>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-gold-light)" }}>
            <Shield className="h-5 w-5" style={{ color: "var(--mj-gold)" }} />
          </div>
          <div>
            <p className="text-sm font-bold capitalize" style={{ color: "var(--mj-charcoal)" }}>
              {user?.role}
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--mj-text-muted)" }}>
              Full access to all admin features
            </p>
          </div>
          <span className="ml-auto px-3 py-1.5 rounded-full text-[10px] font-bold"
            style={{ background: "var(--mj-cream)", color: "var(--mj-gold-dark)", border: "1px solid var(--mj-gold-light)" }}>
            ADMIN
          </span>
        </div>
      </div>

      {/* System info */}
      <div className="rounded-xl bg-white p-6" style={{ border: "1px solid var(--mj-border)" }}>
        <p className="subheading mb-5">System Information</p>
        <div className="space-y-0">
          {[
            { label: "User ID",         value: user?._id, mono: true },
            { label: "Account Created", value: user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "long", year: "numeric" })
                : "N/A" },
            { label: "Email Verified",  value: user?.isVerified ? "Verified ✓" : "Not Verified",
              color: user?.isVerified ? "#059669" : "var(--mj-rose)" },
          ].map(({ label, value, mono, color }) => (
            <div key={label}
              className="flex items-center justify-between py-3"
              style={{ borderBottom: "1px solid var(--mj-border-light)" }}>
              <span className="text-xs font-semibold" style={{ color: "var(--mj-text-muted)" }}>
                {label}
              </span>
              <span
                className={`text-xs font-medium ${mono ? "font-mono" : ""} max-w-[60%] truncate text-right`}
                style={{ color: color || "var(--mj-charcoal)" }}
                title={typeof value === "string" ? value : undefined}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
