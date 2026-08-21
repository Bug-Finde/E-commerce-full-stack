import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Package, MessageSquare, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

const STAT_COLORS = [
  { bg: "#FEF3C7", icon: "#D97706" }, // amber
  { bg: "#D1FAE5", icon: "#059669" }, // emerald
  { bg: "#FCE7F3", icon: "#BE185D" }, // pink/rose
  { bg: "#EDE9FE", icon: "#7C3AED" }, // violet
];

function StatCard({ icon: Icon, label, value, colorIndex = 0, delay = 0 }) {
  const c = STAT_COLORS[colorIndex % STAT_COLORS.length];
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="rounded-xl p-5 bg-white"
      style={{ border: "1px solid var(--mj-border)" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--mj-text-muted)", letterSpacing: "0.14em" }}>{label}</p>
          <p className="text-3xl font-bold" style={{ color: "var(--mj-charcoal)", fontFamily: "var(--font-display)" }}>
            {value}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: c.bg }}>
          <Icon className="h-5 w-5" style={{ color: c.icon }} />
        </div>
      </div>
    </motion.div>
  );
}

const chartTooltipStyle = {
  background: "white",
  border: "1px solid var(--mj-border)",
  borderRadius: 10,
  color: "var(--mj-charcoal)",
  fontSize: 12,
};

export default function Dashboard() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/analytics/dashboard")
      .then(res => setData(res.data.data))
      .catch(err => toast.error(err.response?.data?.message || "Could not load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="skeleton rounded-xl h-24" />)}
        </div>
        <div className="skeleton rounded-xl h-64" />
      </div>
    );
  }

  const stats = [
    { icon: Users,        label: "Total Users",    value: data?.totalUsers    || 0 },
    { icon: Package,      label: "Total Products", value: data?.totalProducts || 0 },
    { icon: MessageSquare,label: "Total Reviews",  value: data?.totalReviews  || 0 },
    { icon: Activity,     label: "Activities",     value: data?.recentActivities?.length || 0 },
  ];

  const activityData = (data?.recentActivities || []).slice(0, 7).reverse().map((a, i) => ({
    name: `#${i + 1}`,
    value: 1,
    label: a.description?.slice(0, 20) || "Activity",
  }));

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <p className="subheading mb-1">Overview</p>
        <h1 className="heading-display text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--mj-text-muted)" }}>
          Welcome back! Here's your store at a glance.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} colorIndex={i} delay={i * 0.05} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white p-5" style={{ border: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-4">Activity Overview</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={activityData}>
              <XAxis dataKey="name" tick={{ fill: "var(--mj-text-light)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "var(--mj-cream)" }} />
              <Bar dataKey="value" fill="var(--mj-gold)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl bg-white p-5" style={{ border: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-4">Activity Trend</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={activityData}>
              <XAxis dataKey="name" tick={{ fill: "var(--mj-text-light)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area type="monotone" dataKey="value" stroke="var(--mj-rose)" fill="var(--mj-blush)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="rounded-xl bg-white p-5" style={{ border: "1px solid var(--mj-border)" }}>
        <p className="subheading mb-4">Recent Activity</p>
        <div className="space-y-2">
          {(data?.recentActivities || []).length === 0 ? (
            <p className="text-sm py-4 text-center" style={{ color: "var(--mj-text-muted)" }}>
              No recent activities
            </p>
          ) : (
            data.recentActivities.map((a, i) => (
              <div key={a._id || i}
                className="flex items-center justify-between px-4 py-3 rounded-lg"
                style={{ background: "var(--mj-cream)", border: "1px solid var(--mj-border-light)" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--mj-charcoal)" }}>
                    {a.description}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: "var(--mj-text-muted)" }}>
                    {a.userId?.firstName || "System"} · {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ml-4 shrink-0"
                  style={{ background: "var(--mj-blush)", color: "var(--mj-rose-dark)" }}>
                  {a.action?.replace(/_/g, " ")}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
