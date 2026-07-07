"use client";

import React, { useState } from "react";
import { Line, Scatter, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {

  const [data] = useState({
    fleet: {
      totalVehicles: 1250,
      activeBatches: 12,
      criticalAlerts: 8,
      fleetHealth: 92
    },
    components: {
      turbo: 25,
      battery: 30,
      brake: 20,
      steering: 15
    },
    degradationTrend: [12, 18, 22, 30, 28, 35],
    batchCluster: [
      { x: 10, y: 20 },
      { x: 15, y: 25 },
      { x: 20, y: 30 },
      { x: 25, y: 35 },
      { x: 30, y: 40 }
    ],
    confidence: 87
  });

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>
        🚗 Auto Defect Intelligence Dashboard
      </h1>

      {/* Fleet Overview */}
      <div style={overviewGrid}>
        <StatCard title="Total Vehicles" value={data.fleet.totalVehicles} color="#4e73df" />
        <StatCard title="Active Batches" value={data.fleet.activeBatches} color="#1cc88a" />
        <StatCard title="Critical Alerts" value={data.fleet.criticalAlerts} color="#e74a3b" />
        <StatCard title="Fleet Health %" value={data.fleet.fleetHealth} color="#f6c23e" />
      </div>

      {/* Main Grid */}
      <div style={mainGrid}>

        {/* Component Risk */}
        <div style={card}>
          <h3>Component Risk Monitor</h3>

          <Doughnut
            data={{
              labels: ["Turbo", "Battery", "Brake", "Steering"],
              datasets: [{
                data: [
                  data.components.turbo,
                  data.components.battery,
                  data.components.brake,
                  data.components.steering
                ],
                backgroundColor: [
                  "#4e73df",
                  "#1cc88a",
                  "#e74a3b",
                  "#f6c23e"
                ]
              }]
            }}
          />
        </div>

        {/* Degradation Trend */}
        <div style={card}>
          <h3>Degradation Trend</h3>
          <Line
            data={{
              labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
              datasets: [{
                label: "Degradation",
                data: data.degradationTrend,
                borderColor: "#4e73df",
                backgroundColor: "rgba(78,115,223,0.2)",
                tension: 0.4,
                fill: true
              }]
            }}
          />
        </div>

        {/* Batch Clustering */}
        <div style={card}>
          <h3>Batch Similarity Clustering</h3>
          <Scatter
            data={{
              datasets: [{
                label: "Cluster",
                data: data.batchCluster,
                backgroundColor: "#1cc88a"
              }]
            }}
          />
        </div>

        {/* Defect Confidence */}
        <div style={cardCenter}>
          <h3>Defect Confidence Score</h3>
          <h1 style={{ fontSize: 60, color: "#e74a3b" }}>
            {data.confidence}%
          </h1>
        </div>

      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div
      style={{
        ...statCard,
        background: `linear-gradient(135deg, ${color}, ${lighten(color, 40)})`
      }}
    >
      <h4 style={{ opacity: 0.9 }}>{title}</h4>
      <h2 style={{ fontSize: 28 }}>{value}</h2>
    </div>
  );
}

function lighten(color, percent) {
  return color;
}

/* STYLES */

const pageStyle = {
  background: "linear-gradient(135deg, #eef2f7, #f9fbfd)",
  minHeight: "100vh",
  padding: 40,
  fontFamily: "Segoe UI, sans-serif"
};

const titleStyle = {
  textAlign: "center",
  marginBottom: 40,
  fontWeight: 700,
  color: "#2c3e50"
};

const overviewGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 25,
  marginBottom: 40
};

const mainGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 35
};

const card = {
  background: "white",
  padding: 30,
  borderRadius: 16,
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  transition: "0.3s"
};

const cardCenter = {
  ...card,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const statCard = {
  padding: 25,
  borderRadius: 16,
  color: "white",
  textAlign: "center",
  boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
  transition: "transform 0.2s"
};