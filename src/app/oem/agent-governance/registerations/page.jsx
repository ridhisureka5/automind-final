"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../../../lib/firebase";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Registrations() {
  const [allData, setAllData] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  // Fetch All Data
  const fetchData = async () => {
    try {
      setLoading(true);

      const snapshot = await getDocs(
        collection(db, "vehicles")
      );

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setAllData(list);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // Update Status
  const updateStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "vehicles", id), {
        status,
        reviewedAt: new Date(),
      });

      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered Data
  const filtered = allData.filter(
    (item) => item.status === activeTab
  );

  // Counts
  const pending = allData.filter(
    (i) => i.status === "pending"
  ).length;

  const approved = allData.filter(
    (i) => i.status === "approved"
  ).length;

  const rejected = allData.filter(
    (i) => i.status === "rejected"
  ).length;

  // Chart Data
  const chartData = [
    { name: "Pending", count: pending },
    { name: "Approved", count: approved },
    { name: "Rejected", count: rejected },
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.title}>Registrations Dashboard</h1>

      {/* Summary Cards */}
      <div style={styles.cards}>
        <Card title="Pending" value={pending} color="#f59e0b" />
        <Card title="Approved" value={approved} color="#22c55e" />
        <Card title="Rejected" value={rejected} color="#ef4444" />
      </div>

      {/* Chart */}
      <div style={styles.chartBox}>
        <h3>Approval Report</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        {["pending", "approved", "rejected"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.tab,
                background:
                  activeTab === tab
                    ? "#2563eb"
                    : "#e5e7eb",
                color:
                  activeTab === tab
                    ? "white"
                    : "black",
              }}
            >
              {tab.toUpperCase()}
            </button>
          )
        )}
      </div>

      {/* Table */}
      <div style={styles.tableBox}>
        {loading && <p>Loading...</p>}

        {!loading && filtered.length === 0 && (
          <p>No Records</p>
        )}

        {!loading && filtered.length > 0 && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Model</th>
                <th>Reg No</th>
                <th>Package</th>
                <th>User</th>
                <th>Status</th>
                {activeTab === "pending" && (
                  <th>Action</th>
                )}
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>{item.company}</td>
                  <td>{item.model}</td>
                  <td>{item.regNumber}</td>
                  <td>{item.package}</td>
                  <td>{item.userId}</td>
                  <td>{item.status}</td>

                  {activeTab === "pending" && (
                    <td>
                      <button
                        style={styles.approveBtn}
                        onClick={() =>
                          updateStatus(
                            item.id,
                            "approved"
                          )
                        }
                      >
                        Approve
                      </button>

                      <button
                        style={styles.rejectBtn}
                        onClick={() =>
                          updateStatus(
                            item.id,
                            "rejected"
                          )
                        }
                      >
                        Reject
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

/* Card Component */
function Card({ title, value, color }) {
  return (
    <div
      style={{
        ...styles.card,
        borderTop: `5px solid ${color}`,
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

/* Styles */
const styles = {
  container: {
    padding: 30,
    background: "#f8fafc",
    minHeight: "100vh",
  },

  title: {
    marginBottom: 20,
  },

  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: 20,
    marginBottom: 30,
  },

  card: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  chartBox: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  tabs: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },

  tab: {
    padding: "8px 16px",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },

  tableBox: {
    background: "white",
    padding: 20,
    borderRadius: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  approveBtn: {
    background: "#22c55e",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 5,
    cursor: "pointer",
  },

  rejectBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: 5,
    marginLeft: 8,
    cursor: "pointer",
  },
};