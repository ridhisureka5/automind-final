"use client";

import { useEffect, useState } from "react";
import {
  Car,
  Wrench,
  Activity,
  AlertTriangle,
  Users,
  Zap,
} from "lucide-react";

import Charts from "../components/Charts";

const API = process.env.NEXT_PUBLIC_API || "https://automind-backend-40d5.onrender.com";

export default function Home() {



  useEffect(()=>{

    fetch(`${API}/predict-alerts`)
      .then(r=>r.json())
      .then(d=>setAlerts(d.alerts || []));

    fetch(`${API}/predict-services`)
      .then(r=>r.json())
      .then(d=>setServices(d.services || []));

  },[]);

  // derive dashboard values from API
  useEffect(()=>{
    const totalVehicles = services.length;
    const activeAlerts = alerts.length;

    setDashboard({
      total_vehicles: totalVehicles,
      active_alerts: activeAlerts,
      upcoming_services: totalVehicles,
      fleet_health: totalVehicles
        ? Math.round(((totalVehicles-activeAlerts)/totalVehicles)*100)
        : 0,
      system_uptime: 99.2
    });

  },[alerts,services]);

  return (
    <div className="w-full">

      <main className="p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 text-sm">
              Real-time predictive maintenance insights
            </p>
          </div>

          <div className="bg-white border rounded-lg px-4 py-2 text-sm flex items-center gap-2">
            <span className="h-2 w-2 bg-green-500 rounded-full" />
            Live AI Data
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard title="Total Vehicles" value={dashboard?.total_vehicles ?? "-"} icon={<Car />} />
          <StatCard title="Active Alerts" value={dashboard?.active_alerts ?? "-"} icon={<AlertTriangle />} />
          <StatCard title="Upcoming Services" value={dashboard?.upcoming_services ?? "-"} icon={<Wrench />} />
          <StatCard title="Fleet Health" value={`${dashboard?.fleet_health ?? "-"}%`} icon={<Activity />} />

        </div>

        <Charts />

        {/* Alerts + Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <Card title="Active Alerts" badge={`${alerts.length} Active`}>

            {alerts.map((a,i)=>(
              <AlertItem
                key={i}
                title={a.car_name}
                desc={`VIN: ${a.vin} • ${a.failure_probability || ""}`}
                level={a.level}
                color={
                  a.level==="critical"?"red":
                  a.level==="high"?"orange":
                  a.level==="medium"?"yellow":"blue"
                }
              />
            ))}

          </Card>

          <Card title="Upcoming Services" badge={`${services.length} Scheduled`}>

            {services.map((s,i)=>(
              <ServiceItem
                key={i}
                vin={s.vin}
                city={s.city}
                tag={s.tag}
              />
            ))}

          </Card>

        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <MiniStat title="Healthy Vehicles" value={dashboard? Math.round(dashboard.total_vehicles*0.7):"-"} icon={<Activity />} />
          <MiniStat title="Critical Status" value={alerts.filter(a=>a.level==="critical").length} icon={<AlertTriangle />} />
          <MiniStat title="Active Customers" value="Live" icon={<Users />} />
          <MiniStat title="System Uptime" value={`${dashboard?.system_uptime ?? "-"}%`} icon={<Zap />} />

        </div>

      </main>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Card({ title, badge, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-800">{title}</h3>
        {badge && <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">{badge}</span>}
      </div>
      {children}
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 flex justify-between">
      <div>
        <p className="text-slate-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-slate-800">{value}</h3>
      </div>
      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
        {icon}
      </div>
    </div>
  );
}

function AlertItem({ title, desc, level, color }) {
  const colors = {
    yellow: "bg-yellow-50 border-yellow-200",
    blue: "bg-blue-50 border-blue-200",
    orange: "bg-orange-50 border-orange-200",
    red: "bg-red-50 border-red-200",
  };

  return (
    <div className={`border rounded-xl p-3 mb-3 ${colors[color]}`}>
      <div className="flex justify-between">
        <p className="font-medium text-slate-800">{title}</p>
        <span className="text-xs capitalize text-slate-600">{level}</span>
      </div>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  );
}

function ServiceItem({ vin, city, tag }) {
  return (
    <div className="border rounded-xl p-3 mb-3">
      <div className="flex justify-between">
        <p className="font-medium text-sm text-slate-800">VIN: {vin}</p>
        <span className="text-xs bg-blue-100 text-blue-600 px-2 rounded">{tag}</span>
      </div>
      <p className="text-xs text-slate-500 mt-1">{city}</p>
    </div>
  );
}

function MiniStat({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
      <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-blue-600">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500">{title}</p>
        <h3 className="font-bold text-slate-800">{value}</h3>
      </div>
    </div>
  );
}