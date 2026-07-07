"use client";

import { useEffect, useState } from "react";
import {
  Car, Activity, AlertTriangle, CheckCircle,
  Gauge, Zap, Thermometer, Fuel
} from "lucide-react";

export default function VehiclesPage() {

  const API = process.env.NEXT_PUBLIC_API || "https://automind-backend-40d5.onrender.com";
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  /* LIVE POLLING */
  useEffect(() => {

    let active = true;

    const load = async () => {
      try {
        const res = await fetch(`${API}/vehicle-health`, { cache: "no-store" });
        const data = await res.json();

        if (active) {
          setVehicles(data.vehicles || []);
          setLoading(false);
        }
      } catch (e) {}
    };

    load();
    const id = setInterval(load, 3000);
    return () => { active = false; clearInterval(id); };

  }, [API]);

  /* STATUS CALCULATION */
  const getStatus = (v) => {
    const t = v.data;
    if (!t) return "Healthy";

    let health = 100 - (
      (t.misfire * 25) +
      (t.overheat * 25) +
      (t.low_oil * 25) +
      (t.vibration > 0.6 ? 25 : 0)
    );

    if (health < 40) return "Critical";
    if (health < 70) return "Warning";
    return "Healthy";
  };

  const healthy = vehicles.filter(v => getStatus(v) === "Healthy").length;
  const warning = vehicles.filter(v => getStatus(v) === "Warning").length;
  const critical = vehicles.filter(v => getStatus(v) === "Critical").length;

  if (loading) return <div className="p-10">Connecting to vehicles...</div>;

  return (
    <div className="w-full p-6 bg-slate-50 space-y-6">

      <h1 className="text-2xl font-bold text-slate-800">
        Live Fleet Telemetry
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <TopCard title="Online" value={vehicles.length} icon={<Car />} />
        <TopCard title="Healthy" value={healthy} icon={<CheckCircle />} />
        <TopCard title="Warning" value={warning} icon={<AlertTriangle />} />
        <TopCard title="Critical" value={critical} icon={<Activity />} />
      </div>

      {/* VEHICLES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map(v => <VehicleCard key={v.vin} vehicle={v} />)}
      </div>

    </div>
  );
}

/* UI COMPONENTS */

function TopCard({ title, value, icon }) {
  return (
    <div className="bg-indigo-600 text-white p-4 rounded-xl flex justify-between">
      <div>
        <p className="text-sm">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      {icon}
    </div>
  );
}

/* VEHICLE CARD */

function VehicleCard({ vehicle }) {

  const t = vehicle.data;
  if (!t) return null;

  let health = 100 - (
    (t.misfire * 25) +
    (t.overheat * 25) +
    (t.low_oil * 25) +
    (t.vibration > 0.6 ? 25 : 0)
  );
  if (health < 0) health = 0;

  let status = "Healthy";
  if (health < 70) status = "Warning";
  if (health < 40) status = "Critical";

  const statusColor = {
    Healthy: "text-green-400",
    Warning: "text-yellow-400",
    Critical: "text-red-400"
  };

  const mode = ["City", "Highway", "Aggressive", "Fault"];

  return (
    <div className="bg-slate-700 text-white rounded-2xl p-5 space-y-4">

      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{vehicle.vin}</h3>
          <p className="text-xs text-gray-400">{mode[t.mode]} Driving</p>
        </div>
        <span className={statusColor[status]}>{status}</span>
      </div>

      {/* HEALTH BAR */}
      <div>
        <div className="flex justify-between text-xs">
          <span>Health</span>
          <span>{health}%</span>
        </div>
        <div className="h-2 bg-slate-900 rounded-full">
          <div className="h-2 bg-indigo-500 rounded-full"
            style={{ width: `${health}%` }} />
        </div>
      </div>

      {/* TELEMETRY */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <Info icon={<Gauge size={14} />} label="RPM" value={t.rpm} />
        <Info icon={<Zap size={14} />} label="Speed" value={`${t.speed} km/h`} />
        <Info icon={<Thermometer size={14} />} label="Coolant" value={`${t.coolant} °C`} />
        <Info icon={<Thermometer size={14} />} label="Oil Temp" value={`${t.oil_temp} °C`} />
        <Info icon={<Fuel size={14} />} label="Fuel" value={`${t.fuel}%`} />
        <Info icon={<Activity size={14} />} label="Vibration" value={t.vibration} />
      </div>

    </div>
  );
}

/* SMALL INFO BOX */

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-lg">
      {icon}
      <span className="text-gray-400">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
