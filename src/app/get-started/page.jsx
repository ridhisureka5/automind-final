"use client";

import { motion } from "framer-motion";
import { Factory, Wrench, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="max-w-4xl w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Choose Your Role
          </h1>

          <p className="text-slate-400 text-lg">
            Select how you want to access the AUTOMIND platform
          </p>

        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* OEM */}
          <RoleCard
            title="OEM Administrator"
            desc="Manage fleet analytics, warranty insights, and manufacturing feedback"
            icon={Factory}
            color="blue"
            href="/oem/agent-governance"
          />

          {/* Service */}
          <RoleCard
            title="Service Center"
            desc="Handle scheduling, repairs, technicians, and customer operations"
            icon={Wrench}
            color="green"
            href="/service"
          />

        </div>

      </div>
    </div>
  );
}

/* ================= CARD ================= */

function RoleCard({ title, desc, icon: Icon, color, href }) {

  const colors = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "bg-blue-500",
      btn: "bg-blue-500 hover:bg-blue-600",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "bg-green-500",
      btn: "bg-green-500 hover:bg-green-600",
    },
  };

  const c = colors[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >

      <div
        className={`${c.bg} border-2 ${c.border}
                   rounded-3xl p-8 text-center
                   hover:shadow-xl transition-all`}
      >

        {/* Icon */}
        <div
          className={`w-16 h-16 ${c.icon}
                     rounded-2xl mx-auto
                     flex items-center justify-center mb-6`}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          {title}
        </h3>

        <p className="text-slate-600 mb-8">
          {desc}
        </p>

        {/* Button */}
        <Link href={href}>

          <button
            className={`w-full ${c.btn}
                       text-white font-semibold
                       py-4 rounded-xl
                       flex items-center justify-center gap-2
                       transition`}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>

        </Link>

      </div>

    </motion.div>
  );
}
