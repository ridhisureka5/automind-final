"use client";

import { useEffect, useState } from "react";
import { Brain, Activity, Shield, AlertTriangle } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API || "https://automind-backend-40d5.onrender.com";

export default function MasterAgent() {

  const [data,setData]=useState(null);

  const fetchData=async()=>{
    const res=await fetch(`${API}/master-agent`);
    const json=await res.json();
    setData(json);
  };

  useEffect(()=>{
    fetchData();
    const t=setInterval(fetchData,4000);
    return()=>clearInterval(t);
  },[]);

  if(!data) return <div className="p-6">Loading AI...</div>;

  const {fleet,ai}=data;

  return (
    <main className="p-6 bg-slate-50 min-h-screen space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Brain className="text-indigo-600"/> Master AI Orchestrator
        </h1>
        <p className="text-gray-500">
          Central decision intelligence across all automotive agents
        </p>
      </div>

      {/* Fleet Stats */}
      <div className="grid md:grid-cols-4 gap-6">

        <Card title="Vehicles Online" value={fleet.vehicles_online} icon={<Activity/>}/>
        <Card title="Active Alerts" value={fleet.active_alerts} icon={<AlertTriangle/>}/>
        <Card title="Avg Trust" value={`${fleet.avg_trust}%`} icon={<Shield/>}/>
        <Card title="Open Failures" value={fleet.open_failures} icon={<Activity/>}/>

      </div>

      {/* AI Decision */}
      <div className="bg-white rounded-xl shadow p-8 text-center space-y-4">

        <h2 className="text-xl font-semibold">AI Intelligence Score</h2>

        <div className="text-6xl font-bold text-indigo-600">
          {ai.intelligence_score}
        </div>

        <div className="text-lg font-medium text-gray-700">
          Decision: <span className="text-indigo-600">{ai.decision}</span>
        </div>

      </div>

    </main>
  );
}

function Card({title,value,icon}) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
    </div>
  );
}
