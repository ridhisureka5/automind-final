"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const lineData = [
  { month: "Jan", value: 94 },
  { month: "Feb", value: 92 },
  { month: "Mar", value: 89 },
  { month: "Apr", value: 91 },
  { month: "May", value: 93 },
  { month: "Jun", value: 95 },
  { month: "Jul", value: 94 },
];

const pieData = [
  { name: "Healthy", value: 48, color: "#10b981" },
  { name: "Warning", value: 24, color: "#f59e0b" },
  { name: "Critical", value: 14, color: "#ef4444" },
  { name: "Maintenance", value: 14, color: "#6366f1" },
];

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold mb-4">Fleet Health Trend</h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="month" />
            <YAxis domain={[80, 100]} />
            <Tooltip />
            <Line dataKey="value" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <h3 className="font-semibold mb-4">
          Vehicle Status Distribution
        </h3>

        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
            >
              {pieData.map((item, i) => (
                <Cell key={i} fill={item.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-4 text-xs mt-2">
          {pieData.map((item) => (
            <div key={item.name} className="flex items-center gap-1">
              <span
                className="h-3 w-3 rounded"
                style={{ background: item.color }}
              />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
