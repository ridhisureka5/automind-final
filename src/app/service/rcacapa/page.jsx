"use client";
import { useState, useMemo, useEffect } from "react";
import { Search, Filter, AlertTriangle, Clock, CheckCircle, Factory, Brain, Send, X } from "lucide-react";

/* ---------------- AI SIMULATION ---------------- */

let AUTO_ID = 1;

const COMPONENTS = [
  ["Battery","Thermal degradation","Replace supplier","Improve cooling"],
  ["Cooling","Coolant inefficiency","Pump replacement","Add monitoring"],
  ["Motor","Rotor wear","Replace motor","Lubrication schedule"],
  ["Brake","Pad wear","Replace pads","Predictive maintenance"],
  ["Sensor","Calibration drift","Recalibrate sensor","Self diagnostics"],
  ["Transmission","Gear wear","Replace gearbox","Oil monitoring"]
];

function generateCase(){
  const pick = COMPONENTS[Math.floor(Math.random()*COMPONENTS.length)];
  return {
    id:AUTO_ID++,
    component:pick[0],
    root:pick[1],
    corrective:pick[2],
    preventive:pick[3],
    status:"identified",
    vehicles:Math.floor(Math.random()*3000)+50,
    failures:Math.floor(Math.random()*1000)+10,
    years:"2022-2025",
    created:Date.now()
  };
}

/* ---------------- PAGE ---------------- */

export default function RcaCapa(){

  const [cases,setCases]=useState([]);
  const [search,setSearch]=useState("");
  const [tab,setTab]=useState("all");
  const [selected,setSelected]=useState(null);
  const [loading,setLoading]=useState(true);
  const [aiLoading,setAiLoading]=useState(false);

  useEffect(()=>{

    setCases(Array.from({length:4},generateCase));
    setLoading(false);

    const generator=setInterval(()=>{
      setCases(prev=>[generateCase(),...prev.slice(0,14)]);
    },5000);

    const lifecycle=setInterval(()=>{
      setCases(prev=>prev.map(c=>{
        const age=(Date.now()-c.created)/1000;
        if(age>20 && c.status==="identified") return {...c,status:"investigating"};
        if(age>40 && c.status==="investigating") return {...c,status:"resolved"};
        return c;
      }));
    },3000);

    return ()=>{
      clearInterval(generator);
      clearInterval(lifecycle);
    };

  },[]);

  const filtered=useMemo(()=>{
    let data=[...cases];
    if(search) data=data.filter(c=>c.component.toLowerCase().includes(search.toLowerCase())||c.root.toLowerCase().includes(search.toLowerCase()));
    if(tab!=="all") data=data.filter(c=>c.status===tab);
    return data;
  },[cases,search,tab]);

  const sendToMfg=id=>setCases(prev=>prev.map(c=>c.id===id?{...c,status:"sent"}:c));

  const generateAI=()=>{
    setAiLoading(true);
    setTimeout(()=>{
      setCases(prev=>[generateCase(),...prev]);
      setAiLoading(false);
    },1200);
  };

  const count=s=>cases.filter(c=>c.status===s).length;

  return(
    <div className="p-6 bg-slate-50 min-h-screen">

      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">RCA/CAPA Insights</h1>
          <p className="text-gray-500">Root Cause Analysis & Corrective/Preventive Actions</p>
        </div>
        <button onClick={generateAI} className="btn-primary flex gap-2 items-center">
          <Brain size={18}/>{aiLoading?"Analyzing...":"Generate AI Analysis"}
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-5 mb-7">
        <Stat icon={<AlertTriangle/>} title="Identified" value={count("identified")}/>
        <Stat icon={<Clock/>} title="Investigating" value={count("investigating")}/>
        <Stat icon={<CheckCircle/>} title="Resolved" value={count("resolved")}/>
        <Stat icon={<Factory/>} title="Sent to MFG" value={count("sent")}/>
      </div>

      <div className="flex gap-4 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400"/>
          <input className="input w-full pl-10" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)}/>
        </div>
        <button className="btn-secondary flex items-center gap-2"><Filter size={18}/> Filters</button>
      </div>

      <div className="flex gap-2 mb-6">
        {["all","identified","investigating","resolved"].map(k=>(
          <button key={k} onClick={()=>setTab(k)} className={`px-4 py-2 rounded-lg ${tab===k?"bg-yellow-400":"bg-white border"}`}>
            {k.charAt(0).toUpperCase()+k.slice(1)}
          </button>
        ))}
      </div>

      {loading?<p>Loading...</p>:
      <div className="space-y-6">
        {filtered.map(item=>(
          <Card key={item.id} item={item} onView={()=>setSelected(item)} onSend={()=>sendToMfg(item.id)}/>
        ))}
      </div>}

      {selected && <Modal item={selected} onClose={()=>setSelected(null)}/>}
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Card({item,onView,onSend}){
  return(
    <div className="bg-white rounded-xl shadow p-5">
      <div className="flex justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold">{item.component}</h3>
          <p className="text-sm text-gray-500">{item.vehicles} vehicles • {item.failures} failures</p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs bg-gray-200">{item.status}</span>
      </div>

      <p><b>Root:</b> {item.root}</p>
      <p><b>Fix:</b> {item.corrective}</p>
      <p><b>Prevent:</b> {item.preventive}</p>

      <div className="flex gap-3 mt-3">
        <button onClick={onView} className="btn-secondary">Details</button>
        {item.status!=="sent" && <button onClick={onSend} className="bg-purple-500 text-white px-4 py-2 rounded-lg flex gap-2 items-center"><Send size={16}/>Send</button>}
      </div>
    </div>
  );
}

function Modal({item,onClose}){
  return(
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[500px]">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">{item.component}</h2>
          <button onClick={onClose}><X/></button>
        </div>
        <p>{item.root}</p>
        <p>{item.corrective}</p>
        <p>{item.preventive}</p>
      </div>
    </div>
  );
}

function Stat({icon,title,value}){
  return(
    <div className="bg-white p-5 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
      <div className="p-3 rounded-lg bg-gray-100">{icon}</div>
    </div>
  );
}