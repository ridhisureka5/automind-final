"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import {
  
  Shield,
  Zap,
  ArrowRight,
  AlertTriangle,
  DollarSign,
  Clock,
  Wrench,
  Radio,
  Bell,
  Calendar,
  CheckCircle,
  Activity,
  Settings,
  Factory,
  Cpu,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Car,
    BarChart3,
} from "lucide-react";

/* ================= PAGE ================= */

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">

      <Hero />

      <Problem />

      <HowItWorks />

      <Features />

      <Stakeholders />

      <CTA />

      <Footer />

    </main>
  );
}

/* ================= HERO ================= */

function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center text-white">

      {/* Glow */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span className="inline-flex items-center gap-2 px-4 py-2 border border-yellow-400/40 rounded-full text-yellow-400 mb-8">
            <Brain size={16} />
            Agentic AI Powered
          </span>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
            Transforming
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
              Vehicle Uptime
            </span>
            with Agentic AI
          </h1>

          <p className="text-slate-400 text-xl mb-10 max-w-lg">
            Predict failures, optimize maintenance, and maximize fleet
            performance with autonomous AI agents.
          </p>

          <div className="flex gap-4 flex-wrap">

            <Link href="/get-started">
              <button className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 flex items-center gap-2">
                Get Started
                <ArrowRight size={18} />
              </button>
            </Link>

            <button className="border border-white/20 px-8 py-4 rounded-xl hover:bg-white/5">
              Watch Demo
            </button>

          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-12">

            <Stat icon={<Zap />} value="99.9%" text="Uptime" color="green" />

            <Stat icon={<Shield />} value="40%" text="Cost Reduction" color="blue" />

          </div>

        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="hidden lg:flex justify-center"
        >

          <div className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-3xl flex items-center justify-center shadow-2xl">

            <Brain size={64} className="text-slate-900" />

          </div>

        </motion.div>

      </div>
    </section>
  );
}

/* ================= PROBLEM ================= */

/* ================= PROBLEM (PREMIUM) ================= */

function Problem() {

  const problems = [
    {
      icon: AlertTriangle,
      title: "Reactive Maintenance",
      description: "Vehicles break down unexpectedly, causing costly repairs and safety risks",
      stat: "70%",
      statLabel: "of breakdowns are preventable",
    },
    {
      icon: DollarSign,
      title: "Warranty Loss",
      description: "Delayed maintenance voids warranties and increases expenses",
      stat: "$3.2B",
      statLabel: "lost annually",
    },
    {
      icon: Clock,
      title: "Downtime Costs",
      description: "Lost productivity from vehicle downtime",
      stat: "45hrs",
      statLabel: "average downtime",
    },
    {
      icon: Wrench,
      title: "Inefficient Service",
      description: "Service centers operate reactively",
      stat: "35%",
      statLabel: "capacity wasted",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wider">
            The Problem
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Traditional Maintenance is Broken
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Billions are lost every year due to reactive maintenance.
          </p>

        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {problems.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >

              <div className="relative bg-white rounded-2xl p-8 h-full border border-slate-100
                              hover:shadow-2xl hover:shadow-red-100/40
                              transition-all duration-500 overflow-hidden">

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-400 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-6
                                group-hover:bg-red-100 transition">

                  <p.icon className="w-7 h-7 text-red-500" />

                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {p.title}
                </h3>

                <p className="text-slate-600 mb-6">
                  {p.description}
                </p>

                <div className="pt-6 border-t border-slate-100">

                  <p className="text-3xl font-bold text-red-500">
                    {p.stat}
                  </p>

                  <p className="text-sm text-slate-500">
                    {p.statLabel}
                  </p>

                </div>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}


/* ================= HOW IT WORKS ================= */

/* ================= HOW IT WORKS (PREMIUM) ================= */

function HowItWorks() {

  const steps = [
    {
      icon: Radio,
      title: "Real-Time Telemetry",
      desc: "Continuous monitoring of 200+ vehicle sensors including engine, brakes, battery, and transmission",
      color: "bg-blue-500",
    },
    {
      icon: Brain,
      title: "AI Prediction",
      desc: "Agentic AI analyzes patterns and predicts failures 2–4 weeks before they occur",
      color: "bg-purple-500",
    },
    {
      icon: Bell,
      title: "Proactive Alerts",
      desc: "Voice AI and notifications contact vehicle owners with personalized recommendations",
      color: "bg-yellow-500",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      desc: "Automated appointment booking optimized for service center capacity and customer preferences",
      color: "bg-green-500",
    },
    {
      icon: CheckCircle,
      title: "Continuous Learning",
      desc: "RCA/CAPA analysis feeds insights back to manufacturing for quality improvement",
      color: "bg-emerald-500",
    },
  ];

  return (
    <section className="relative py-28 bg-[#050b1f] overflow-hidden">

      {/* Star Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >

          <p className="text-yellow-400 font-semibold tracking-wider mb-2">
            HOW IT WORKS
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            The AUTOMIND Process
          </h2>

          <p className="text-slate-400 max-w-3xl mx-auto text-lg">
            Our Master AI Agent orchestrates multiple specialized worker agents
            to deliver end-to-end predictive maintenance automation.
          </p>

        </motion.div>

        {/* Timeline */}
        <div className="relative">

          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px]
                          bg-gradient-to-r from-yellow-400/20 via-yellow-400 to-yellow-400/20
                          -translate-y-1/2" />

          {/* Cards */}
          <div className="grid lg:grid-cols-5 gap-8">

            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >

                {/* Card */}
                <div
                  className="relative bg-[#0c1735]/90 backdrop-blur
                             border border-white/10 rounded-2xl p-6 h-full
                             hover:border-yellow-400/40
                             hover:shadow-xl hover:shadow-yellow-400/10
                             transition-all duration-300 group"
                >

                  {/* Step Number */}
                  <div
                    className="absolute -top-4 left-6 w-9 h-9 bg-yellow-400
                               rounded-full flex items-center justify-center
                               text-black font-bold text-sm shadow-lg"
                  >
                    {i + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl ${step.color}
                               flex items-center justify-center mb-5 mt-3
                               group-hover:scale-110 transition-transform`}
                  >

                    <step.icon className="w-7 h-7 text-white" />

                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.desc}
                  </p>

                </div>

                {/* Arrow */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:flex absolute top-1/2 -right-4 z-20
                               -translate-y-1/2"
                  >

                    <ArrowRight className="w-8 h-8 text-yellow-400" />

                  </div>
                )}

              </motion.div>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}


/* ================= FEATURES ================= */

  /* ================= FEATURES (PREMIUM) ================= */

function Features() {

  const features = [
    {
      icon: Activity,
      title: "Predictive Failure Detection",
      description: "AI analyzes real-time sensor data to predict mechanical failures weeks in advance with 95%+ accuracy",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Bell,
      title: "Proactive Voice Alerts",
      description: "Voice AI agents contact vehicle owners with personalized maintenance recommendations via phone calls",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Settings,
      title: "Service Optimization",
      description: "Intelligent scheduling optimizes service center workloads, reducing wait times by 60%",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Factory,
      title: "Manufacturing Feedback Loop",
      description: "RCA/CAPA analysis feeds insights back to OEMs to improve product quality and reduce defects",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Shield,
      title: "Secure AI Governance",
      description: "UEBA monitors AI agent behavior, detecting anomalies and preventing unauthorized actions",
      gradient: "from-indigo-500 to-violet-500",
    },
    {
      icon: Cpu,
      title: "Agentic AI Architecture",
      description: "Master Agent orchestrates specialized worker agents for seamless autonomous operations",
      gradient: "from-yellow-500 to-amber-500",
    },
  ];

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <span className="text-yellow-600 font-semibold uppercase tracking-wider text-sm">
            Features
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mt-4 mb-6">
            Intelligent Maintenance Platform
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Cutting-edge AI for predictive maintenance.
          </p>

        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >

              <div className="relative bg-slate-50 rounded-2xl p-8 h-full border border-slate-100
                              hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50
                              transition-all duration-500 overflow-hidden">

                {/* Hover Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${f.gradient}
                              opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.gradient}
                              flex items-center justify-center mb-6
                              group-hover:scale-110 transition-transform duration-300`}
                >

                  <f.icon className="w-7 h-7 text-white" />

                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {f.title}
                </h3>

                <p className="text-slate-600 leading-relaxed">
                  {f.description}
                </p>

              </div>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}


/* ================= STAKEHOLDERS ================= */


    /* ================= WHO IT'S FOR ================= */

function Stakeholders() {

  const roles = [
    {
      icon: Car,
      title: "Vehicle Owners",
      desc:
        "Stay ahead of breakdowns with AI-powered predictions. Receive proactive alerts and book services effortlessly.",
      points: [
        "Real-time vehicle health monitoring",
        "Personalized maintenance alerts",
        "Easy service scheduling",
        "Complete service history",
      ],
      color: "yellow",
    },
    {
      icon: BarChart3,
      title: "OEM Administrators",
      desc:
        "Gain insights into fleet health, reduce warranty costs, and improve product quality through data-driven feedback.",
      points: [
        "Fleet-wide analytics dashboard",
        "Warranty cost optimization",
        "Manufacturing feedback loop",
        "Quality improvement insights",
      ],
      color: "blue",
    },
    {
      icon: Wrench,
      title: "Service Centers",
      desc:
        "Optimize operations with predictive demand forecasting and intelligent scheduling.",
      points: [
        "Predictive job scheduling",
        "Parts inventory optimization",
        "Technician workload balancing",
        "Customer satisfaction tracking",
      ],
      color: "green",
    },
  ];

  const colors = {
    yellow: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: "bg-yellow-400",
      dot: "bg-yellow-400",
      btn: "bg-yellow-400 hover:bg-yellow-500 text-black",
    },
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "bg-blue-500",
      dot: "bg-blue-500",
      btn: "bg-blue-500 hover:bg-blue-600 text-white",
    },
    green: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "bg-green-500",
      dot: "bg-green-500",
      btn: "bg-green-500 hover:bg-green-600 text-white",
    },
  };

  return (
    <section className="py-28 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >

          <p className="text-yellow-600 font-semibold tracking-wider mb-2">
            WHO IT'S FOR
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Built for Every Stakeholder
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            AUTOMIND delivers tailored experiences for vehicle owners, OEMs, and
            service centers.
          </p>

        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">

          {roles.map((role, i) => {
            const c = colors[role.color];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >

                <div
                  className={`${c.bg} border-2 ${c.border}
                             rounded-3xl p-8 h-full
                             hover:shadow-xl transition-all duration-300`}
                >

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${c.icon}
                               rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <role.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {role.title}
                  </h3>

                  <p className="text-slate-600 mb-6">
                    {role.desc}
                  </p>

                  {/* Points */}
                  <ul className="space-y-3 mb-8">

                    {role.points.map((p, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-slate-700"
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${c.dot}`}
                        />
                        {p}
                      </li>
                    ))}

                  </ul>

                  {/* Button */}
                 <Link href="/get-started" className="block">
  <button
    className={`w-full ${c.btn}
               font-semibold py-4 rounded-xl
               flex items-center justify-center gap-2
               transition`}
  >
    Get Started
    <ArrowRight className="w-5 h-5" />
  </button>
</Link>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}


/* ================= CTA ================= */

function CTA() {
  return (
    <section className="py-32 bg-gradient-to-r from-slate-950 to-slate-900 text-white text-center">

      <div className="max-w-4xl mx-auto px-6">

        <span className="inline-block mb-6 px-4 py-2 border border-yellow-400 rounded-full text-yellow-400">
          ✨ Start Your Journey
        </span>

        <h2 className="text-5xl font-bold mb-6">
          Ready to Transform{" "}
          <span className="text-yellow-400">
            Maintenance?
          </span>
        </h2>

        <p className="text-slate-400 mb-10">
          Join thousands of businesses using AI maintenance.
        </p>

        <Link href="/app">
          <button className="bg-yellow-400 text-black px-10 py-4 rounded-xl font-semibold hover:bg-yellow-500">
            Get Started Free →
          </button>
        </Link>

        <p className="text-slate-500 mt-6 text-sm">
          No credit card • 14-day trial • Cancel anytime
        </p>

      </div>

    </section>
  );
}

/* ================= FOOTER ================= */


    /* ================= FOOTER ================= */

function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617] text-white">

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div>

            <div className="flex items-center gap-3 mb-6">

              <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-black" />
              </div>

              <span className="text-2xl font-bold">
                AUTOMIND
              </span>

            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Transforming vehicle uptime with Agentic AI-powered predictive
              maintenance.
            </p>

          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-lg mb-5">Product</h4>

            <ul className="space-y-3 text-slate-400">

              {["Features", "Pricing", "API", "Documentation"].map((item) => (
                <li
                  key={item}
                  className="hover:text-yellow-400 cursor-pointer transition"
                >
                  {item}
                </li>
              ))}

            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-lg mb-5">Company</h4>

            <ul className="space-y-3 text-slate-400">

              {["About Us", "Careers", "Blog", "Contact"].map((item) => (
                <li
                  key={item}
                  className="hover:text-yellow-400 cursor-pointer transition"
                >
                  {item}
                </li>
              ))}

            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-lg mb-5">Legal</h4>

            <ul className="space-y-3 text-slate-400">

              {["Privacy Policy", "Terms of Service", "Security", "Compliance"].map(
                (item) => (
                  <li
                    key={item}
                    className="hover:text-yellow-400 cursor-pointer transition"
                  >
                    {item}
                  </li>
                )
              )}

            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Copyright */}
          <p className="text-slate-500 text-sm">
            © 2024 AUTOMIND. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">

            {[
              { icon: Twitter },
              { icon: Linkedin },
              { icon: Github },
              { icon: Mail },
            ].map((Item, i) => (
              <div
                key={i}
                className="w-11 h-11 bg-slate-800 rounded-lg
                           flex items-center justify-center
                           hover:bg-yellow-400 hover:text-black
                           transition-all cursor-pointer"
              >
                <Item.icon className="w-5 h-5" />
              </div>
            ))}

          </div>

        </div>

      </div>

    </footer>
  );
}


/* ================= SMALL COMPONENTS ================= */

function Stat({ icon, value, text, color }) {
  const colors = {
    green: "bg-green-500/20 text-green-400",
    blue: "bg-blue-500/20 text-blue-400",
  };

  return (
    <div className="flex items-center gap-3">

      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors[color]}`}>
        {icon}
      </div>

      <div>
        <p className="font-semibold">{value}</p>
        <p className="text-sm text-slate-500">{text}</p>
      </div>

    </div>
  );
}

function StakeCard({ title, color, items }) {
  const colors = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
  };

  return (
    <div className={`border-2 rounded-3xl p-8 ${colors[color]}`}>

      <h3 className="text-2xl font-bold mb-6">{title}</h3>

      <ul className="space-y-3 mb-8">

        {items.map((i, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="w-2 h-2 bg-current rounded-full mt-2"></span>
            {i}
          </li>
        ))}

      </ul> 

      <Link href="/get-started">
        <button className="w-full py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800">
          Get Started →
        </button>
      </Link>

    </div>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>

      <h4 className="text-white font-semibold mb-4">{title}</h4>

      <ul className="space-y-2 text-sm">

        {items.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}

      </ul>

    </div>
  );
}

function IconBtn({ children }) {
  return (
    <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-yellow-400 hover:text-black transition cursor-pointer">
      {children}
    </div>
  );
}
