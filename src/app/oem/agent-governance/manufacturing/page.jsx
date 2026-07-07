"use client";

import { useEffect, useState, useMemo } from "react";
import {
  AlertTriangle,
  XCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function Manufacturing() {

  const [cars,setCars]=useState([]);
  const [selectedCar,setSelectedCar]=useState(null);

  useEffect(()=>{
    fetch("/mock/manufacturing-data.json")
      .then(res => res.json())
      .then(data => {
        setCars(data.cars || []);
        if(data.cars?.length) setSelectedCar(data.cars[0].car_id);
      });
  },[]);

  /* ---------------- CAR DATA ---------------- */

  const selectedCarData = useMemo(()=>{
    return cars.find(c=>c.car_id===selectedCar);
  },[cars,selectedCar]);

  /* ---------------- COMPANY AGGREGATION ---------------- */

  const companyData = useMemo(()=>{

    const grouped = {};

    cars.forEach(car=>{
      if(!grouped[car.company]){
        grouped[car.company] = {};
      }

      car.components.forEach(comp=>{
        if(!grouped[car.company][comp.name]){
          grouped[car.company][comp.name] = {
            name: comp.name,
            minor:0, moderate:0, major:0, critical:0
          };
        }

        grouped[car.company][comp.name].minor += comp.minor;
        grouped[car.company][comp.name].moderate += comp.moderate;
        grouped[car.company][comp.name].major += comp.major;
        grouped[car.company][comp.name].critical += comp.critical;
      });
    });

    return grouped;

  },[cars]);

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manufacturing Insights</h1>
          <p className="text-gray-500 text-sm">
            Car-wise & Company-wise defect intelligence
          </p>
        </div>

        <select
          value={selectedCar || ""}
          onChange={(e)=>setSelectedCar(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        >
          {cars.map((c,i)=>(
            <option key={i} value={c.car_id}>
              {c.car_name}
            </option>
          ))}
        </select>
      </div>

      {/* ---------------- CAR WISE ---------------- */}

      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4">
          Car-wise Defect Distribution – {selectedCarData?.car_name}
        </h3>

        <div className="space-y-4">
          {selectedCarData?.components.map((d, i) => (
            <HeatRow key={i} data={d}/>
          ))}
        </div>
      </div>

      {/* ---------------- COMPANY WISE ---------------- */}

      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-6">
          Company-wise Defect Distribution
        </h3>

        {Object.keys(companyData).map((company, idx)=>(
          <div key={idx} className="mb-8">

            <h4 className="text-md font-semibold text-indigo-600 mb-3">
              {company}
            </h4>

            <div className="space-y-3">
              {Object.values(companyData[company]).map((comp, i)=>(
                <HeatRow key={i} data={comp}/>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function HeatRow({ data }) {

  const total = data.minor + data.moderate + data.major + data.critical || 1;

  return (
    <div className="flex items-center gap-4">
      <div className="w-36 text-sm font-medium text-gray-600">
        {data.name}
      </div>

      <div className="flex-1 flex h-6 rounded-full overflow-hidden bg-slate-200">
        <Bar color="blue" value={data.minor} total={total}/>
        <Bar color="yellow" value={data.moderate} total={total}/>
        <Bar color="orange" value={data.major} total={total}/>
        <Bar color="red" value={data.critical} total={total}/>
      </div>

      <div className="w-20 text-xs text-gray-500 text-right">
        {total}
      </div>
    </div>
  );
}

function Bar({ color, value, total }) {

  const colors = {
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  const width = Math.max((value / total) * 100, 2);

  return (
    <div
      className={`${colors[color]} h-full`}
      style={{ width: `${width}%` }}
    />
  );
}