"use client"
import { useState } from "react"

export default function ComplaintDashboard() {

  const [text, setText] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const classifyComplaint = async () => {

    if (!text.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch("https://auto-backend-w9a3.onrender.com/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text })
      })

      if (!response.ok) {
        throw new Error("Server error")
      }

      const data = await response.json()
      setResult(data)

    } catch (err) {
      setError("Unable to connect to backend")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">
        Complaint Intelligence Dashboard
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-lg">

        <textarea
          placeholder="Enter customer complaint..."
          className="w-full border p-3 rounded-xl mb-4"
          rows="4"
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />

        <button
          onClick={classifyComplaint}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? "Analyzing..." : "Analyze Complaint"}
        </button>

      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-600 rounded-xl">
          {error}
        </div>
      )}

      {result && (
        <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">

          <h2 className="text-xl font-semibold mb-4">
            🔍 Prediction Result
          </h2>

          <p className="mb-2">
            <strong>Complaint:</strong> {result.complaint}
          </p>

          <p className="mb-2">
            <strong>Predicted Issue:</strong> {result.predicted_issue}
          </p>

          <p className="mb-2">
            <strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%
          </p>

          {result.predicted_issue === "Engine Heating" && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl">
              🔥 High Engine Heating Complaints Detected
            </div>
          )}

          {result.predicted_issue === "Brake Failure" && (
            <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded-xl">
              ⚠️ Brake Failure Risk Identified
            </div>
          )}

          {result.predicted_issue === "Transmission Issue" && (
            <div className="mt-4 p-4 bg-orange-100 text-orange-700 rounded-xl">
              ⚙️ Transmission Issue Detected
            </div>
          )}

        </div>
      )}

    </div>
  )
}