"use client";

import { useEffect, useState } from "react";

import {
  Calendar,
  Clock,
  TrendingUp,
  MapPin,
  Brain,
  AlertTriangle,
} from "lucide-react";

/* ---------------- PAGE ---------------- */

export default function ServiceCenters() {

  /* ---------- STATE ---------- */

  const [centers, setCenters] = useState([]);
  const [global, setGlobal] = useState(null);
  const [loading, setLoading] = useState(true);


  /* ---------- FETCH ML ---------- */
const API_URL = `${process.env.NEXT_PUBLIC_API || "https://automind-backend-40d5.onrender.com"}/load-prediction`;
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCenters(data.centers);
        setGlobal(data.global);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ML API Error:", err);
        setLoading(false);
      });
  }, []);


  /* ---------- STATS ---------- */

  const avgUtil = centers.length
    ? Math.round(
        centers.reduce(
          (s, c) => s + c.utilization,
          0
        ) / centers.length
      )
    : 0;


  return (
    <div className="w-full p-6 bg-slate-50 space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Service Center Analytics
        </h1>

        <p className="text-slate-500 text-sm">
          AI-powered capacity insights
        </p>
      </div>


      {/* AI Insight */}

      {global && (
        <div className="bg-indigo-600 text-white p-4 rounded-xl flex items-center gap-4">

          <Brain size={26} />

          <div>
            <p className="font-bold text-lg">
              Load: {global.predicted_load}
            </p>

            <p className="text-sm">
              {global.recommendation}
            </p>
          </div>

        </div>
      )}


      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <StatCard
          title="Centers"
          value={centers.length}
          icon={<MapPin />}
        />

        <StatCard
          title="Avg Utilization"
          value={`${avgUtil}%`}
          icon={<TrendingUp />}
        />

        <StatCard
          title="High Load"
          value={
            centers.filter(
              (c) => c.predicted_load === "HIGH"
            ).length
          }
          icon={<AlertTriangle />}
        />

        <StatCard
          title="AI Status"
          value={global?.predicted_load || "—"}
          icon={<Brain />}
        />

      </div>


      {/* Table */}

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <h3 className="font-bold text-xl mb-6 text-slate-800">
          Service Center Performance
        </h3>


        {loading && (
          <p className="text-center py-6">
            Loading AI data...
          </p>
        )}


        {!loading && (

          <table className="w-full text-base">

            <thead className="text-slate-600 border-b-2">

              <tr>
                <th className="py-4 text-left">Center</th>
                <th className="py-4 text-center">City</th>
                <th className="py-4 text-left">Utilization</th>
                <th className="py-4 text-center">Load</th>
                <th className="py-4 text-left">AI Advice</th>
              </tr>

            </thead>


            <tbody>

              {centers.map((c) => (
                <Row key={c.id} data={c} />
              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}


/* ---------------- COMPONENTS ---------------- */


function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center">

      <div>
        <p className="text-slate-500 text-sm">
          {title}
        </p>

        <h3 className="text-2xl font-bold text-slate-800">
          {value}
        </h3>
      </div>

      <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
        {icon}
      </div>

    </div>
  );
}


function Row({ data }) {

  const colors = {
    HIGH: "text-red-600",
    MEDIUM: "text-yellow-600",
    LOW: "text-green-600",
  };

  return (
    <tr className="border-b last:border-none hover:bg-slate-50 transition">

      <td className="py-5 font-semibold text-slate-800">
        {data.name}
      </td>

      <td className="py-5 text-center text-slate-600">
        {data.city}
      </td>


      {/* Util Bar */}
      <td className="py-5">

        <div className="flex items-center gap-4">

          <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">

            <div
              className="h-full bg-indigo-600 rounded-full"
              style={{
                width: `${data.utilization}%`,
              }}
            />

          </div>

          <span className="font-medium text-slate-600">
            {data.utilization}%
          </span>

        </div>

      </td>


      {/* Load */}
      <td
        className={`py-5 text-center font-bold ${
          colors[data.predicted_load]
        }`}
      >
        {data.predicted_load}
      </td>


      {/* Recommendation */}
      <td className="py-5 text-sm text-indigo-600">

        {data.recommendation}

        {data.slots_filling_fast && (
          <span className="ml-2 text-red-500">
            ⚠
          </span>
        )}

      </td>

    </tr>
  );
}
