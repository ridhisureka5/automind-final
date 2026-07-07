"use client";

import {
  Activity,
  Car,
  Wrench,
  MessageSquare,
  FileText,
  Bell,
  Users,
  Package,
  X,
} from "lucide-react";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function ServiceClientLayout({ children }) {

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

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
            <p className="text-xs text-gray-500">OEM</p>
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          <MenuItem href="/oem/agent-governance" icon={<Activity size={18} />} text="Dashboard" />
          <MenuItem href="/oem/agent-governance/manufacturing" icon={<Car size={18} />} text="Manufacturing" />
          <MenuItem href="/oem/agent-governance/feedback" icon={<MessageSquare size={18} />} text="Feedback" />
          <MenuItem href="/oem/agent-governance/reports" icon={<FileText size={18} />} text="Reports" />
          <MenuItem href="/oem/agent-governance/registerations" icon={<FileText size={18} />} text="Registerations" />
          <MenuItem href="/oem/agent-governance/master-agent" icon={<FileText size={18} />} text="Master Agent" />
           <MenuItem href="/oem/agent-governance/batch" icon={<FileText size={18} />} text="Complaint Analysis" />
           <MenuItem href="/oem/agent-governance/batch-intelligence" icon={<FileText size={18} />} text="Batch Intelligence" />
           <MenuItem href="/oem/agent-governance/dash" icon={<FileText size={18} />} text=" Intelligence Dashboard" />
            <MenuItem href="/oem/agent-governance/carmodel" icon={<FileText size={18} />} text=" Model Dashboard" />
          
          
          
        </nav>

        <Link href="/get-started" className="mt-4 w-full text-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm font-medium transition">
          Exit
        </Link>

      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">

        <header className="bg-white border-b px-6 py-4 flex justify-end relative z-40">

          <div className="flex items-center gap-4 relative" ref={ref}>

            <Bell size={20} />

            <div
              onClick={() => setOpen(!open)}
              className="h-8 w-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm cursor-pointer"
            >
              OEM
            </div>

            {open && (
              <div className="absolute right-0 top-12 w-56 bg-white border rounded-xl shadow-xl p-3 text-sm z-50">

                <div className="border-b pb-2 mb-2">
                  <p className="font-semibold">OEM</p>
                  <p className="text-xs text-gray-500">oem@automind.ai</p>
                </div>

                <button
                  onClick={() => { setProfileOpen(true); setOpen(false); }}
                  className="block w-full text-left px-2 py-2 rounded-md hover:bg-slate-100">
                  Profile
                </button>

                <button
                  onClick={() => { setSettingsOpen(true); setOpen(false); }}
                  className="block w-full text-left px-2 py-2 rounded-md hover:bg-slate-100">
                  Settings
                </button>

                <Link href="/get-started" className="block px-2 py-2 rounded-md text-red-500 hover:bg-red-50">
                  Logout
                </Link>

              </div>
            )}

          </div>

        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>

      </div>

      {/* OEM POPUPS */}
      {profileOpen && <Modal type="profile" onClose={()=>setProfileOpen(false)} />}
      {settingsOpen && <Modal type="settings" onClose={()=>setSettingsOpen(false)} />}

    </div>
  );
}

function MenuItem({ href, icon, text }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-slate-100 hover:text-indigo-600 transition">
      {icon}{text}
    </Link>
  );
}

/* OEM MODAL */

function Modal({ type, onClose }) {

  const isProfile = type === "profile";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-xl shadow-xl p-5 relative">

        <button onClick={onClose} className="absolute right-3 top-3 text-gray-500">
          <X size={18}/>
        </button>

        <h2 className="font-semibold text-lg mb-4">
          {isProfile ? "OEM Profile" : "OEM Settings"}
        </h2>

        {isProfile ? (
          <div className="space-y-3 text-sm">

            <div>
              <p className="text-gray-500">Organization</p>
              <p className="font-medium">AutoMind Motors Pvt Ltd</p>
            </div>

            <div>
              <p className="text-gray-500">Admin Email</p>
              <p className="font-medium">oem@automind.ai</p>
            </div>

            <div>
              <p className="text-gray-500">Region</p>
              <p className="font-medium">India - Central Operations</p>
            </div>

            <div>
              <p className="text-gray-500">Access Level</p>
              <p className="font-medium text-indigo-600">Global Fleet Control</p>
            </div>

          </div>
        ) : (
          <div className="space-y-4 text-sm">

            <div className="flex justify-between items-center">
              <span>Recall Automation</span>
              <span className="text-green-600 font-medium">Enabled</span>
            </div>

            <div className="flex justify-between items-center">
              <span>OTA Updates</span>
              <span className="text-green-600 font-medium">Enabled</span>
            </div>

            <div className="flex justify-between items-center">
              <span>AI Decision Mode</span>
              <span className="text-indigo-600 font-medium">Autonomous</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Security Monitoring (UEBA)</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
