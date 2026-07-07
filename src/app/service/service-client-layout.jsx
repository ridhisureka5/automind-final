"use client";

import {
  Activity, Car, Wrench, MessageSquare,
  FileText, Bell, Users, Package
} from "lucide-react";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function ServiceClientLayout({ children }) {

  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState("app"); 
  // app | profile | settings

  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="min-h-screen flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Car size={20} />
          </div>
          <div>
            <h2 className="font-bold">AutoMind</h2>
            <p className="text-xs text-gray-500">Service Center</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <MenuItem href="/service" icon={<Activity size={18}/>} text="Dashboard"/>
          <MenuItem href="/service/vehicles" icon={<Car size={18}/>} text="Vehicles"/>
          <MenuItem href="/service/service-centers" icon={<Wrench size={18}/>} text="Service Centers"/>
          <MenuItem href="/service/feedback" icon={<MessageSquare size={18}/>} text="Feedback"/>
          <MenuItem href="/service/reports" icon={<FileText size={18}/>} text="Reports"/>
          <MenuItem href="/service/service-schedule" icon={<FileText size={18}/>} text="Schedules"/>
          <MenuItem href="/service/technicians" icon={<Users size={18}/>} text="Technicians"/>
          <MenuItem href="/service/inventory" icon={<Package size={18}/>} text="Inventory"/>
          <MenuItem href="/service/rcacapa" icon={<FileText size={18}/>} text="RCA / CAPA"/>
            <MenuItem href="/service/Insurance" icon={<FileText size={18}/>} text="Insurance"/>

        </nav>

        <Link href="/get-started" className="mt-4 w-full text-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium">
          Exit
        </Link>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        {/* NAVBAR */}
        <header className="bg-white border-b px-6 py-4 flex justify-end relative z-40">
          <div className="flex items-center gap-4 relative" ref={ref}>
            <Bell size={20}/>

            <div
              onClick={()=>setOpen(!open)}
              className="h-8 w-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm cursor-pointer"
            >
              SC
            </div>

            {open && (
              <div className="absolute right-0 top-12 w-56 bg-white border rounded-xl shadow-xl p-3 text-sm z-50">

                <button
                  onClick={()=>{
                    setPanel("profile");
                    setOpen(false);
                  }}
                  className="block w-full text-left px-2 py-2 hover:bg-slate-100 rounded-md"
                >
                  Profile
                </button>

                <button
                  onClick={()=>{
                    setPanel("settings");
                    setOpen(false);
                  }}
                  className="block w-full text-left px-2 py-2 hover:bg-slate-100 rounded-md"
                >
                  Settings
                </button>

                <Link href="/get-started" className="block px-2 py-2 text-red-500 hover:bg-red-50 rounded-md">
                  Logout
                </Link>

              </div>
            )}
          </div>
        </header>

        {/* CONTENT SWITCHER */}
        <main className="flex-1 overflow-auto p-6">

          {panel === "app" && children}

          {panel === "profile" && <ProfilePanel onBack={()=>setPanel("app")} />}

          {panel === "settings" && <SettingsPanel onBack={()=>setPanel("app")} />}

        </main>

      </div>
    </div>
  );
}

/* ---------------- PROFILE ---------------- */

function ProfilePanel({ onBack }) {
  return (
    <div className="max-w-xl space-y-4">
      <button onClick={onBack} className="text-indigo-600 text-sm">← Back</button>
      <h2 className="text-xl font-semibold">Service Center Profile</h2>
      <p><b>Name:</b> AutoMind Service Center</p>
      <p><b>Email:</b> service@automind.ai</p>
      <p><b>Role:</b> Service Partner</p>
      <p><b>Connected Vehicles:</b> 248</p>
    </div>
  );
}

/* ---------------- SETTINGS ---------------- */

function SettingsPanel({ onBack }) {
  return (
    <div className="max-w-xl space-y-4">
      <button onClick={onBack} className="text-indigo-600 text-sm">← Back</button>
      <h2 className="text-xl font-semibold">Settings</h2>
      <Toggle label="Repair Alerts"/>
      <Toggle label="Auto Booking"/>
      <Toggle label="Customer Notifications"/>
      <Toggle label="Parts Availability Sync"/>
    </div>
  );
}

/* ---------------- TOGGLE ---------------- */

function Toggle({ label }) {
  const [on,setOn]=useState(true);
  return (
    <div className="flex items-center justify-between bg-white border rounded-lg px-4 py-3">
      <span>{label}</span>
      <button onClick={()=>setOn(!on)}
        className={`w-11 h-6 flex items-center rounded-full transition ${on?"bg-indigo-600":"bg-gray-300"}`}>
        <div className={`h-5 w-5 bg-white rounded-full shadow transform transition ${on?"translate-x-5":"translate-x-1"}`} />
      </button>
    </div>
  );
}

/* ---------------- MENU ---------------- */

function MenuItem({href,icon,text}) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-slate-100 hover:text-indigo-600">
      {icon}{text}
    </Link>
  );
}
