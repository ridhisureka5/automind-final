"use client";

import { useEffect, useState } from "react";
import { Shield, AlertTriangle, Zap, Eye, Lock } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

const API = process.env.NEXT_PUBLIC_API || "https://automind-backend-40d5.onrender.com";

export default function AgentGovernancePage() {

  const [agents, setAgents] = useState([]);
  const [summary, setSummary] = useState({});

  const fetchData = async () => {
    const res = await fetch(`${API}/agent-governance`);
    const data = await res.json();
    setAgents(data.agents || []);
    setSummary(data.summary || {});
  };

  useEffect(() => {
    fetchData();
    const t=setInterval(fetchData,5000);
    return ()=>clearInterval(t);
  }, []);

  const chartData = agents.map(a => ({
    name: a.id,
    trust: a.trust
  }));

  return (
    <main className="p-6 space-y-6 bg-slate-50 min-h-screen">

      <h1 className="text-2xl font-bold">Agent Governance (UEBA)</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6">

        <Stat title="Active Agents" value={summary.active_agents} icon={<Shield />} />
        <Stat title="Avg Trust" value={`${summary.avg_trust || 0}%`} icon={<Shield />} />
        <Stat title="Anomalies" value={summary.anomalies} icon={<AlertTriangle />} />
        <Stat title="Actions" value={summary.actions} icon={<Zap />} />

      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow p-6 h-[300px]">
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <XAxis dataKey="name"/>
            <YAxis domain={[50,100]}/>
            <Tooltip/>
            <Bar dataKey="trust" fill="#6366f1"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full text-sm">
          <thead className="border-b text-slate-500">
            <tr>
              <th>Agent</th>
              <th>Trust</th>
              <th>Actions</th>
              <th>Anomalies</th>
              <th>Risk</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {agents.map(a => (
              <tr key={a.id} className="h-14 border-b">
                <td>
                  <p className="font-medium">{a.name}</p>
                  <p className="text-xs text-gray-400">{a.id}</p>
                </td>
                <td>{a.trust}%</td>
                <td>{a.actions}</td>
                <td>{a.anomalies}</td>
                <td>{a.risk}</td>
                <td>{a.status}</td>
                <td className="flex gap-3 pt-3">
                  <Eye size={18}/>
                  <Lock size={18}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </main>
  );
}

function Stat({title,value,icon}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
    </div>
  );
}
