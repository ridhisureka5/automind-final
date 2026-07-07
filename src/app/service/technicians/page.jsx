"use client";

import { useState, useEffect } from "react";

import {
  Plus,
  Phone,
  Mail,
  Star,
  Wrench,
  CheckCircle,
  Users,
  Award,
} from "lucide-react";

/* ======================================================
   MAIN COMPONENT
====================================================== */

export default function Technicians() {

  /* ---------------- STATE ---------------- */

  const [technicians, setTechnicians] = useState([]);

  const [summary, setSummary] = useState({
    total: 0,
    available: 0,
    working: 0,
    avg_rating: 0,
  });

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    specialty: "",
    phone: "",
    email: "",
  });


  /* ---------------- FETCH ML DATA ---------------- */
 const API_URL = `${process.env.NEXT_PUBLIC_API || "https://automind-backend-40d5.onrender.com"}/technician-analytics`;
  useEffect(() => {

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {

        const formatted = data.technicians.map((t) => ({

          id: t.id,

          name: t.name,

          role: t.experience > 10
            ? "Senior Technician"
            : "Technician",

          specialty: t.skill,

          experience: t.experience,

          rating: t.rating,

          jobs: t.jobs,

          status: t.status.toLowerCase(),

          phone: "9876543210",

          email: `${t.name
            .toLowerCase()
            .replace(" ", ".")}@service.com`,

          job:
            t.status === "Working"
              ? "Assigned Service Task"
              : null,

          progress: t.load,
        }));

        setTechnicians(formatted);
        setSummary(data.summary);

      })
      .catch((err) => {
        console.error("ML Fetch Error:", err);
      });

  }, []);


  /* ---------------- ADD TECH ---------------- */

  const handleAdd = () => {

    if (!form.name || !form.role) return;

    const newTech = {

      id: Date.now(),

      name: form.name,

      role: form.role,

      specialty: form.specialty,

      experience: 1,

      rating: 4.5,

      jobs: 0,

      status: "available",

      phone: form.phone,

      email: form.email,
    };

    setTechnicians([...technicians, newTech]);

    setShowModal(false);

    setForm({
      name: "",
      role: "",
      specialty: "",
      phone: "",
      email: "",
    });
  };


  /* ---------------- ASSIGN JOB ---------------- */

  const handleAssign = (id) => {

    setTechnicians((prev) =>
      prev.map((tech) =>
        tech.id === id
          ? {
              ...tech,
              status: "working",
              job: "New Service Task",
              progress: 10,
            }
          : tech
      )
    );
  };


  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className="p-6 bg-slate-50 min-h-screen">


      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Technician Management
          </h1>

          <p className="text-gray-500">
            Track and manage your service team
          </p>

        </div>


        <button
          onClick={() => setShowModal(true)}
          className="btn-primary"
        >
          <Plus size={18} /> Add Technician
        </button>

      </div>


      {/* STATS */}

      <div className="grid md:grid-cols-4 gap-5 mb-8">

        <StatCard
          icon={<Users />}
          title="Total Technicians"
          value={summary.total}
        />

        <StatCard
          icon={<CheckCircle />}
          title="Available"
          value={summary.available}
        />

        <StatCard
          icon={<Wrench />}
          title="Working"
          value={summary.working}
        />

        <StatCard
          icon={<Award />}
          title="Team Rating"
          value={summary.avg_rating}
        />

      </div>


      {/* TECH GRID */}

      <div className="grid md:grid-cols-3 gap-6">

        {technicians.map((tech) => (

          <TechCard
            key={tech.id}
            tech={tech}
            onAssign={handleAssign}
          />

        ))}

      </div>


      {/* ADD MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-bold mb-4">
              Add Technician
            </h2>

            <div className="space-y-3">

              <input
                placeholder="Full Name"
                className="input w-full"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Role"
                className="input w-full"
                value={form.role}
                onChange={(e) =>
                  setForm({ ...form, role: e.target.value })
                }
              />

              <input
                placeholder="Specialty"
                className="input w-full"
                value={form.specialty}
                onChange={(e) =>
                  setForm({
                    ...form,
                    specialty: e.target.value,
                  })
                }
              />

              <input
                placeholder="Phone"
                className="input w-full"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <input
                placeholder="Email"
                className="input w-full"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

            </div>


            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setShowModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="btn-primary"
              >
                Add
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}


/* ======================================================
   COMPONENTS
====================================================== */


/* ---------- STAT CARD ---------- */

function StatCard({ icon, title, value }) {

  return (
    <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">

      <div>

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h2 className="text-2xl font-bold">
          {value}
        </h2>

      </div>

      <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
        {icon}
      </div>

    </div>
  );
}


/* ---------- TECH CARD ---------- */

function TechCard({ tech, onAssign }) {

  const initials = tech.name
    .split(" ")
    .map((n) => n[0])
    .join("");


  const statusStyle = {
    working: "bg-yellow-100 text-yellow-700",
    available: "bg-green-100 text-green-700",
    break: "bg-gray-200 text-gray-700",
  };


  const statusText = {
    working: "Working",
    available: "Available",
    break: "On Break",
  };


  return (
    <div className="bg-white p-5 rounded-xl shadow flex flex-col min-h-[420px]">


      {/* HEADER */}

      <div className="flex items-center justify-between mb-4">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-bold">
            {initials}
          </div>

          <div>

            <h3 className="font-semibold">
              {tech.name}
            </h3>

            <p className="text-sm text-gray-500">
              {tech.role}
            </p>

          </div>

        </div>


        <span
          className={`px-3 py-1 rounded-full text-xs ${statusStyle[tech.status]}`}
        >
          {statusText[tech.status]}
        </span>

      </div>


      {/* INFO */}

      <div className="space-y-2 text-sm text-gray-600 mb-4">

        <p>🔧 {tech.specialty}</p>

        <p>⏱ {tech.experience} years experience</p>

        <p className="flex items-center gap-2">
          <Star size={14} className="text-yellow-400" />
          {tech.rating} · {tech.jobs} jobs
        </p>

      </div>


      {/* JOB */}

      <div className="min-h-[110px] mb-4">

        {tech.status === "working" && tech.job ? (

          <div className="bg-yellow-50 p-3 rounded-lg">

            <p className="text-sm font-medium">
              Current Job
            </p>

            <p className="text-sm mb-2">
              {tech.job}
            </p>

            <div className="h-2 bg-gray-200 rounded">

              <div
                className="h-full bg-black rounded"
                style={{
                  width: `${tech.progress}%`,
                }}
              />

            </div>

            <p className="text-right text-xs mt-1">
              {tech.progress}%
            </p>

          </div>

        ) : (

          <div className="h-full bg-slate-50 rounded-lg" />

        )}

      </div>


      {/* ACTIONS */}

      <div className="mt-auto flex gap-3">

        <a
          href={`tel:${tech.phone}`}
          className="btn-secondary flex-1 flex items-center justify-center gap-1"
        >
          <Phone size={16} /> Call
        </a>

        <a
          href={`mailto:${tech.email}`}
          className="btn-secondary flex-1 flex items-center justify-center gap-1"
        >
          <Mail size={16} /> Email
        </a>

        {tech.status === "available" && (

          <button
            onClick={() => onAssign(tech.id)}
            className="btn-primary flex-1"
          >
            Assign
          </button>

        )}

      </div>

    </div>
  );
}
