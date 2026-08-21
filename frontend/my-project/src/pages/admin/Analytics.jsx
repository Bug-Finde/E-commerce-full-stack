import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Package, Star, Shield } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line,
} from "recharts";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";

const CHART_COLORS = ["#C9A96E","#C8878A","#E4C98A","#A07840","#A8565A"];

const tooltipStyle = {
  background: "white",
  border: "1px solid var(--mj-border)",
  borderRadius: 10,
  color: "var(--mj-charcoal)",
  fontSize: 12,
};

function StatCard({ icon: Icon, label, value, bg, iconColor, delay = 0 }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay }} className="rounded-xl bg-white p-5"
      style={{ border: "1px solid var(--mj-border)" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--mj-text-muted)" }}>{label}</p>
          <p className="text-3xl font-bold" style={{ color: "var(--mj-charcoal)", fontFamily: "var(--font-display)" }}>
            {value}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg }}>
          <Icon className="h-5 w-5" style={{ color: iconColor }} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Analytics() {
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get("/analytics/analytics")
      .then(res => setData(res.data.data))
      .catch(err => toast.error(err.response?.data?.message || "Could not load analytics"))
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

  const userStats    = data?.userStatistics || [];
  const totalAdmins  = userStats.find(s => s.role === "admin")?.count  || 0;
  const totalUsers   = userStats.find(s => s.role === "user")?.count   || 0;
  const pieData      = userStats.map(s => ({ name: s.role, value: s.count }));

  const monthlyProducts = (data?.monthlyData?.products || []).slice(-6);
  const monthlyUsers    = (data?.monthlyData?.users    || []).slice(-6);
  const categoryData    = (data?.productsByCategory    || []).slice(0, 6);

  const ratingDist = data?.reviewsOverview?.ratingDistribution || {};
  const ratingData = [5,4,3,2,1].map(r => ({ name: `${r}★`, count: ratingDist[r] || 0 }));

  return (
    <div className="space-y-6">
      <div>
        <p className="subheading mb-1">Insights</p>
        <h1 className="heading-display text-3xl">Analytics</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}   label="Total Users"    value={totalUsers + totalAdmins}
          bg="#FEF3C7" iconColor="#D97706" delay={0} />
        <StatCard icon={Shield}  label="Admins"         value={totalAdmins}
          bg="var(--mj-cream)" iconColor="var(--mj-gold-dark)" delay={0.05} />
        <StatCard icon={Package} label="Products"       value={data?.totalProducts || 0}
          bg="#D1FAE5" iconColor="#059669" delay={0.1} />
        <StatCard icon={Star}    label="Reviews"        value={data?.reviewsOverview?.total || 0}
          bg="var(--mj-blush)" iconColor="var(--mj-rose)" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User distribution */}
        <div className="rounded-xl bg-white p-5" style={{ border: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-4">User Distribution</p>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {pieData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Rating distribution */}
        <div className="rounded-xl bg-white p-5" style={{ border: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-4">Rating Distribution</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ratingData}>
              <XAxis dataKey="name" tick={{ fill: "var(--mj-text-light)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--mj-text-light)", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--mj-cream)" }} />
              <Bar dataKey="count" fill="var(--mj-gold)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly products */}
        <div className="rounded-xl bg-white p-5" style={{ border: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-4">Products by Month</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyProducts}>
              <XAxis dataKey="month" tick={{ fill: "var(--mj-text-light)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--mj-text-light)", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="count" stroke="var(--mj-gold)" strokeWidth={2}
                dot={{ fill: "var(--mj-gold)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly users */}
        <div className="rounded-xl bg-white p-5" style={{ border: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-4">Registrations by Month</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyUsers}>
              <XAxis dataKey="month" tick={{ fill: "var(--mj-text-light)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--mj-text-light)", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="count" stroke="var(--mj-rose)" strokeWidth={2}
                dot={{ fill: "var(--mj-rose)", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Products by category */}
      {categoryData.length > 0 && (
        <div className="rounded-xl bg-white p-5" style={{ border: "1px solid var(--mj-border)" }}>
          <p className="subheading mb-4">Products by Category</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" tick={{ fill: "var(--mj-text-light)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--mj-text-light)", fontSize: 11 }} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--mj-cream)" }} />
              <Bar dataKey="count" fill="var(--mj-rose)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
