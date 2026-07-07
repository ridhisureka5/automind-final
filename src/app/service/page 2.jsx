"use client";

import {
  Shield,
  AlertTriangle,
  Zap,
  Eye,
  Lock,
} from "lucide-react";

/* ---------------- DATA ---------------- */

const trustTrend = [88, 86, 89, 91, 90, 92, 91];

const agents = [
  {
    name: "Predictive Engine",
    id: "AGT-001",
    score: 94,
    actions: 1247,
    anomalies: 2,
    risk: "low",
    status: "active",
  },
  {
    name: "Diagnostic Assistant",
    id: "AGT-002",
    score: 88,
    actions: 856,
    anomalies: 5,
    risk: "medium",
    status: "active",
  },
  {
    name: "Service Scheduler",
    id: "AGT-003",
    score: 96,
    actions: 423,
    anomalies: 0,
    risk: "low",
    status: "active",
  },
  {
    name: "Alert Processor",
    id: "AGT-004",
    score: 72,
    actions: 2341,
    anomalies: 12,
    risk: "high",
    status: "monitoring",
  },
  {
    name: "Report Generator",
    id: "AGT-005",
    score: 91,
    actions: 156,
    anomalies: 1,
    risk: "low",
    status: "active",
  },
  {
    name: "Data Aggregator",
    id: "AGT-006",
    score: 85,
    actions: 3456,
    anomalies: 8,
    risk: "medium",
    status: "active",
  },
];

const logs = [
  {
    title: "Unusual access pattern",
    agent: "Alert Processor",
    time: "14:32:05",
    ip: "192.168.1.45",
    level: "high",
  },
  {
    title: "Rate limit exceeded",
    agent: "Data Aggregator",
    time: "13:18:22",
    ip: "192.168.1.89",
    level: "medium",
  },
  {
    title: "Failed authentication",
    agent: "Diagnostic Assistant",
    time: "12:45:11",
    ip: "192.168.1.23",
    level: "medium",
  },
  {
    title: "Suspicious query pattern",
    agent: "Alert Processor",
    time: "11:22:45",
    ip: "192.168.1.45",
    level: "high",
  },
  {
    title: "Resource spike",
    agent: "Predictive Engine",
    time: "10:05:33",
    ip: "192.168.1.12",
    level: "low",
  },
];

/* ---------------- PAGE ---------------- */

export default function AgentGovernance() {
  return (
    <div className="w-full p-6 bg-slate-50 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Agent Governance (UEBA)
        </h1>

        <p className="text-slate-500 text-sm">
          User and Entity Behavior Analytics for AI agents
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <StatCard
          title="Active Agents"
          value="5"
          note="monitoring 24/7"
          color="blue"
          icon={<Shield />}
        />

        <StatCard
          title="Avg Trust Score"
          value="88%"
          note="+3% this week"
          color="green"
          icon={<Shield />}
        />

        <StatCard
          title="Anomalies Detected"
          value="28"
          note="-8 vs yesterday"
          color="orange"
          icon={<AlertTriangle />}
        />

        <StatCard
          title="Actions Today"
          value="8.5K"
          note="+12%"
          color="purple"
          icon={<Zap />}
        />

      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Trend */}
        <Card title="Fleet Trust Score Trend">

          <div className="flex items-end gap-4 h-56">

            {trustTrend.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">

                <div
                  className="w-full bg-emerald-500 rounded-t-lg"
                  style={{ height: `${v * 2}px` }}
                />

                <span className="text-xs mt-2 text-slate-500">
                  {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}
                </span>

              </div>
            ))}

          </div>

        </Card>

        {/* Radar */}
        <Card title="Agent Capabilities Assessment">

          <div className="h-56 flex items-center justify-center text-indigo-500 font-semibold">
            Radar Chart Placeholder
          </div>

        </Card>

      </div>

      {/* Agents Table */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between mb-4">

          <h3 className="font-semibold text-lg text-slate-800">
            Agent Trust Scores
          </h3>

          <input
            placeholder="Search agents..."
            className="border rounded-lg px-3 py-1 text-sm"
          />

        </div>

        <table className="w-full text-sm">

          <thead className="border-b text-slate-500">

            <tr>
              <th className="py-2 text-left">Agent</th>
              <th>Trust</th>
              <th>Actions</th>
              <th>Anomalies</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {agents.map((a, i) => (
              <AgentRow key={i} data={a} />
            ))}

          </tbody>

        </table>

      </div>

      {/* Logs */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between mb-4">

          <h3 className="font-semibold text-lg text-slate-800">
            Anomaly Detection Logs
          </h3>

          <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs">
            Live Feed
          </span>

        </div>

        <div className="space-y-3">

          {logs.map((l, i) => (
            <LogItem key={i} data={l} />
          ))}

        </div>

      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value, note, icon, color }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-emerald-100 text-emerald-600",
    orange: "bg-orange-100 text-orange-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex justify-between">

      <div>
        <p className="text-slate-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
        <p className="text-xs text-slate-500">{note}</p>
      </div>

      <div
        className={`h-10 w-10 rounded-lg flex items-center justify-center ${colors[color]}`}
      >
        {icon}
      </div>

    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h3 className="font-semibold mb-4 text-slate-800">
        {title}
      </h3>

      {children}

    </div>
  );
}

function AgentRow({ data }) {
  const riskColors = {
    low: "bg-emerald-100 text-emerald-600",
    medium: "bg-yellow-100 text-yellow-600",
    high: "bg-red-100 text-red-600",
  };

  return (
    <tr className="border-b last:border-none">

      <td className="py-3 font-medium text-slate-800">
        {data.name}
        <p className="text-xs text-slate-400">{data.id}</p>
      </td>

      <td>
        <div className="flex items-center gap-2">

          <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">

            <div
              className="h-full bg-indigo-600"
              style={{ width: `${data.score}%` }}
            />

          </div>

          <span className="font-medium text-slate-700">
            {data.score}%
          </span>

        </div>
      </td>

      <td>{data.actions}</td>

      <td>{data.anomalies}</td>

      <td>
        <span
          className={`px-2 py-1 rounded text-xs ${riskColors[data.risk]}`}
        >
          {data.risk}
        </span>
      </td>

      <td className="flex items-center gap-2 text-slate-700">
        <span className="h-2 w-2 bg-green-500 rounded-full" />
        {data.status}
      </td>

      <td className="flex gap-2 text-slate-600">
        <Eye size={16} />
        <Lock size={16} />
      </td>

    </tr>
  );
}

function LogItem({ data }) {
  const colors = {
    high: "bg-red-50 border-red-200",
    medium: "bg-yellow-50 border-yellow-200",
    low: "bg-emerald-50 border-emerald-200",
  };

  return (
    <div
      className={`border rounded-xl p-4 flex justify-between items-center ${colors[data.level]}`}
    >

      <div className="flex items-start gap-3">

        <AlertTriangle
          className={
            data.level === "high"
              ? "text-red-500"
              : data.level === "medium"
              ? "text-yellow-500"
              : "text-emerald-500"
          }
        />

        <div>

          <p className="font-medium text-slate-800">
            {data.title}
          </p>

          <p className="text-xs text-slate-500">
            Agent: {data.agent} • {data.time} • IP: {data.ip}
          </p>

        </div>

      </div>

      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          data.level === "high"
            ? "bg-red-100 text-red-600"
            : data.level === "medium"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-emerald-100 text-emerald-600"
        }`}
      >
        {data.level}
      </span>

    </div>
  );
}
