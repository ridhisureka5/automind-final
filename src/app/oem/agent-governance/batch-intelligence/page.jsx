"use client"
import { useState } from "react"

const batchDatabase = {
  "Mahindra XUV700": {
    "MX7-2024-A": {
      supplier: "Bosch India",
      plant: "Chennai",
      risk_score: 0.82,
      warranty_claims: 1240,
      parts_replaced: 3421,
      top_issues: ["Engine Heating", "Cooling Fan Failure", "Sensor Malfunction"]
    },
    "MX7-2024-B": {
      supplier: "Valeo India",
      plant: "Pune",
      risk_score: 0.45,
      warranty_claims: 420,
      parts_replaced: 900,
      top_issues: ["Brake Wear", "ABS Sensor Fault"]
    }
  },

  "Hyundai Creta 2024": {
    "HC24-A": {
      supplier: "Denso India",
      plant: "Sriperumbudur",
      risk_score: 0.76,
      warranty_claims: 980,
      parts_replaced: 2100,
      top_issues: ["Transmission Delay", "Clutch Slippage"]
    },
    "HC24-B": {
      supplier: "Bosch India",
      plant: "Chennai",
      risk_score: 0.39,
      warranty_claims: 310,
      parts_replaced: 640,
      top_issues: ["AC Cooling Issue"]
    }
  },

  "Tata Nexon 2024": {
    "TN24-A": {
      supplier: "Sundaram Clayton",
      plant: "Sanand",
      risk_score: 0.69,
      warranty_claims: 710,
      parts_replaced: 1550,
      top_issues: ["Battery Drain", "Wiring Harness Fault"]
    }
  },

  "Kia Seltos 2024": {
    "KS24-A": {
      supplier: "Hyundai Mobis",
      plant: "Anantapur",
      risk_score: 0.74,
      warranty_claims: 850,
      parts_replaced: 1780,
      top_issues: ["Engine Vibration", "Gearbox Noise"]
    }
  },

  "MG Hector 2024": {
    "MG24-A": {
      supplier: "SAIC Components",
      plant: "Halol",
      risk_score: 0.63,
      warranty_claims: 640,
      parts_replaced: 1320,
      top_issues: ["Infotainment Lag", "Sensor Calibration Issue"]
    }
  },

  "Toyota Hyryder": {
    "TH24-A": {
      supplier: "Aisin Seiki",
      plant: "Bidadi",
      risk_score: 0.48,
      warranty_claims: 390,
      parts_replaced: 710,
      top_issues: ["Hybrid Battery Alert"]
    }
  },

  "Maruti Grand Vitara": {
    "MGV24-A": {
      supplier: "Maruti Suzuki Components",
      plant: "Gurgaon",
      risk_score: 0.58,
      warranty_claims: 520,
      parts_replaced: 990,
      top_issues: ["Brake Noise", "ECU Glitch"]
    }
  },

  "Skoda Kushaq": {
    "SK24-A": {
      supplier: "Continental India",
      plant: "Pune",
      risk_score: 0.71,
      warranty_claims: 760,
      parts_replaced: 1680,
      top_issues: ["Turbo Lag", "Oil Leakage"]
    }
  },

  "Honda Elevate": {
    "HE24-A": {
      supplier: "Honda Siel Parts",
      plant: "Tapukara",
      risk_score: 0.52,
      warranty_claims: 480,
      parts_replaced: 880,
      top_issues: ["Steering Vibration"]
    }
  }
}

export default function BatchIntelligence() {

  const [model, setModel] = useState("Mahindra XUV700")
  const [batch, setBatch] = useState("MX7-2024-A")
  const [data, setData] = useState(batchDatabase["Mahindra XUV700"]["MX7-2024-A"])

  const handleModelChange = (value) => {
    setModel(value)
    const firstBatch = Object.keys(batchDatabase[value])[0]
    setBatch(firstBatch)
    setData(batchDatabase[value][firstBatch])
  }

  const handleBatchChange = (value) => {
    setBatch(value)
    setData(batchDatabase[model][value])
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        Batch Intelligence Dashboard
      </h1>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 grid grid-cols-3 gap-4">

        <select
          value={model}
          onChange={(e)=>handleModelChange(e.target.value)}
          className="border p-3 rounded-xl"
        >
          {Object.keys(batchDatabase).map((car)=>(
            <option key={car}>{car}</option>
          ))}
        </select>

        <select
          value={batch}
          onChange={(e)=>handleBatchChange(e.target.value)}
          className="border p-3 rounded-xl"
        >
          {Object.keys(batchDatabase[model]).map((b)=>(
            <option key={b}>{b}</option>
          ))}
        </select>

        <button className="bg-blue-600 text-white rounded-xl">
          Batch Loaded
        </button>

      </div>

      {/* Results */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-xl font-semibold mb-6">
          🔍 Batch Analysis Result
        </h2>

        <div className="grid grid-cols-3 gap-6 mb-8">

          <InfoCard label="Supplier" value={data.supplier} />
          <InfoCard label="Plant" value={data.plant} />
          <InfoCard label="Risk Score"
            value={`${(data.risk_score*100).toFixed(0)}%`}
            highlight={data.risk_score > 0.7}
          />

          <InfoCard label="Warranty Claims" value={data.warranty_claims} />
          <InfoCard label="Parts Replaced" value={data.parts_replaced} />

        </div>

        <div>
          <p className="font-semibold mb-2">Top Issues:</p>
          <ul className="list-disc ml-6 text-gray-700">
            {data.top_issues.map((issue,i)=>(
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>

        {data.risk_score > 0.7 && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-xl">
            ⚠️ High Risk Batch – Immediate Supplier Review Required
          </div>
        )}

      </div>
    </div>
  )
}

function InfoCard({ label, value, highlight }) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl">
      <p className="text-gray-500">{label}</p>
      <p className={`text-lg font-bold ${highlight ? "text-red-600" : ""}`}>
        {value}
      </p>
    </div>
  )
}