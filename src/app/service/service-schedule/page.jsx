"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ServiceCenterDashboard() {
  const [bookings, setBookings] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "service_booking"),
      (snapshot) => {
        setBookings(
          snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
      }
    );
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "supervisors"),
      (snapshot) => {
        setSupervisors(
          snapshot.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          }))
        );
      }
    );
    return () => unsub();
  }, []);

  const active = bookings.filter(b => b.status !== "completed");
  const completed = bookings.filter(b => b.status === "completed");

  return (
    <div className="min-h-screen bg-gray-50 p-10">

      <h1 className="text-4xl font-bold text-yellow-600 mb-10">
        Service Car Schedule
      </h1>

      <Section title="Active Services">
        {active.length === 0 && <p>No active services</p>}
        {active.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            supervisors={supervisors}
          />
        ))}
      </Section>

      <Section title="Completed Services">
        {completed.length === 0 && <p>No completed services</p>}
        {completed.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            supervisors={supervisors}
            completed
          />
        ))}
      </Section>

    </div>
  );
}

/* ======================================== */

function Section({ title, children }) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}

/* ======================================== */

function BookingCard({ booking, supervisors, completed }) {

  const supervisor =
    supervisors.find(s => s.id === booking.supervisorId);

  const cardColor =
    booking.status === "completed"
      ? "bg-green-100 border-green-400"
      : booking.status === "in_process"
      ? "bg-blue-100 border-blue-400"
      : "bg-yellow-100 border-yellow-400";

  /* ASSIGN */
  const assignSupervisor = async () => {
    const free = supervisors.find(
      (s) => s.isAvailable === true && !s.activeJobId
    );

    if (!free) {
      alert("No supervisor available");
      return;
    }

    await updateDoc(doc(db, "service_booking", booking.id), {
      supervisorId: free.id,
      supervisorName: free.name,
      status: "assigned",
      liveStage: "waiting",
    });

    await updateDoc(doc(db, "supervisors", free.id), {
      isAvailable: false,
      activeJobId: booking.id,
    });
  };

  /* START WORK */
  const startWorking = async () => {
    await updateDoc(doc(db, "service_booking", booking.id), {
      status: "in_process",
      liveStage: "working",
      serviceStartTime: Timestamp.now(),
    });
  };

  /* COMPLETE */
  const markCompleted = async () => {
    await updateDoc(doc(db, "service_booking", booking.id), {
      status: "completed",
      liveStage: "done",
      actualCompletionTime: Timestamp.now(), // only here
    });

    if (booking.supervisorId) {
      await updateDoc(doc(db, "supervisors", booking.supervisorId), {
        isAvailable: true,
        activeJobId: null,
      });
    }
  };

  return (
    <div className={`border-2 rounded-2xl p-6 shadow-lg mb-6 transition-all duration-300 ${cardColor}`}>

      <div className="flex justify-between items-start">

        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {booking.vehicleName}
          </h3>

          <p className="text-sm text-gray-700 mt-1">
            {booking.serviceType}
          </p>

          <div className="text-sm text-gray-600 mt-2 space-y-1">
  <p>Service Center: {booking.serviceCenter}</p>
  <p>Slot: {booking.slotTime}</p>
  <p>Car ID: {booking.carId}</p>
  <p>Contact: {booking.contact}</p>
  <p>User ID: {booking.userId}</p>

  <p>
    Expected Delivery:
    {booking.expectedCompletionTime &&
      booking.expectedCompletionTime.toDate().toLocaleString()}
  </p>

  {booking.status === "completed" &&
    booking.actualCompletionTime && (
      <p className="text-green-700 font-medium">
        Completed At:
        {booking.actualCompletionTime.toDate().toLocaleString()}
      </p>
  )}
</div>
        </div>

        <span className={`px-4 py-1 rounded-full text-white text-sm ${
          booking.status === "completed"
            ? "bg-green-600"
            : booking.status === "in_process"
            ? "bg-blue-600"
            : "bg-yellow-600"
        }`}>
          {booking.status}
        </span>
      </div>

      <div className="mt-4 text-sm">
        <b>Supervisor:</b> {supervisor ? supervisor.name : "Not Assigned"}
        <br />
        <b>Stage:</b> {booking.liveStage}
      </div>

      {!completed && (
        <div className="mt-4 flex gap-3 flex-wrap">

          {!booking.supervisorId && (
            <button
              onClick={assignSupervisor}
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
            >
              Assign Supervisor
            </button>
          )}

          {booking.supervisorId && booking.status !== "in_process" && (
            <button
              onClick={startWorking}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Working On This Car
            </button>
          )}

          {booking.status === "in_process" && (
            <button
              onClick={markCompleted}
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
            >
              Mark Completed
            </button>
          )}

        </div>
      )}

    </div>
  );
}