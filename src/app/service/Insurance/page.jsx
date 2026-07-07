"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function InsurancePage() {
  const [insurances, setInsurances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsurance();
  }, []);

  const fetchInsurance = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "insurance_requests")
      );

      const list = [];

      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();

        list.push({
  id: docSnap.id,
  description: data.description || "Insurance Policy",
  timestamp: data.timestamp || null,
  claimed: data.claimed ?? false,
  fileUrl: data.fileUrl || "",
  userId: data.userId || "Unknown User",
});
      });

      setInsurances(list);
    } catch (error) {
      console.error("Error fetching insurance:", error);
    } finally {
      setLoading(false);
    }
  };

  const markClaimed = async (id) => {
    await updateDoc(doc(db, "insurance_requests", id), {
      claimed: true,
    });

    setInsurances((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, claimed: true } : item
      )
    );
  };

  const downloadFile = (url) => {
    const link = document.createElement("a");
    link.href =
      url ||
      "data:text/plain;charset=utf-8,Insurance Document - AutoMind";
    link.download = "insurance_document.txt";
    link.click();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Insurance Documents</h1>

        {loading && <p style={styles.empty}>Loading...</p>}

        {!loading && insurances.length === 0 && (
          <p style={styles.empty}>No Insurance Documents Found</p>
        )}

        <div style={styles.grid}>
          {insurances.map((item) => (
            <div key={item.id} style={styles.card}>
              <div>
                <h3 style={styles.cardTitle}>{item.description}</h3><
                    p style={styles.userId}>User ID: {item.userId}</p>


                <p style={styles.date}>
                  {item.timestamp?.seconds
                    ? new Date(
                        item.timestamp.seconds * 1000
                      ).toLocaleDateString()
                    : "No Date"}
                </p>

                <span
                  style={{
                    ...styles.status,
                    backgroundColor: item.claimed
                      ? "#ffeaea"
                      : "#eef7ff",
                    color: item.claimed
                      ? "#d11a2a"
                      : "#0070f3",
                  }}
                >
                  {item.claimed ? "Claimed" : "Active"}
                </span>
              </div>

              <div style={styles.buttonGroup}>
                <button
                  style={styles.downloadBtn}
                  onClick={() => downloadFile(item.fileUrl)}
                >
                  Download
                </button>

                {!item.claimed && (
                  <button
                    style={styles.claimBtn}
                    onClick={() => markClaimed(item.id)}
                  >
                    Mark Claimed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    padding: "60px 20px",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    fontSize: "34px",
    fontWeight: 600,
    marginBottom: "50px",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "28px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.05)",
    border: "1px solid #f0f0f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: 600,
  },
  date: {
    fontSize: "14px",
    color: "#777",
  },
  status: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 500,
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
  },
  downloadBtn: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  claimBtn: {
    backgroundColor: "#f5f5f5",
    padding: "10px 18px",
    borderRadius: "10px",
    border: "1px solid #e0e0e0",
    cursor: "pointer",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
};