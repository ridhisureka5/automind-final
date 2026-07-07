"use client";

import React from "react";
import {
  FileText,
  Download,
  Calendar,
  Clock,
  Filter,
  FileSpreadsheet,
  File,
} from "lucide-react";

import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

/* ---------------- Fake Data Generator ---------------- */

const generateFakeData = (count = 120) => {
  const data = [];

  for (let i = 1; i <= count; i++) {
    data.push({
      ID: i,
      Vehicle: `CAR-${1000 + i}`,
      Status: i % 2 === 0 ? "Healthy" : "Needs Service",
      Mileage: `${20000 + i * 10} km`,
      Alert: i % 3 === 0 ? "Engine Check" : "None",
      Date: new Date().toLocaleDateString(),
    });
  }

  return data;
};

/* ---------------- PDF Generator ---------------- */

const downloadPDF = (title) => {
  const doc = new jsPDF();

  const data = generateFakeData();

  doc.setFontSize(18);
  doc.text(title, 14, 15);

  doc.setFontSize(12);
  doc.text(`Records: ${data.length}`, 14, 25);

  let y = 35;

  doc.text("ID   Vehicle     Status     Mileage     Alert", 14, y);
  y += 5;

  data.slice(0, 40).forEach((row) => {
    doc.text(
      `${row.ID}   ${row.Vehicle}   ${row.Status}   ${row.Mileage}   ${row.Alert}`,
      14,
      y
    );
    y += 6;
  });

  doc.save(`${title}.pdf`);
};

/* ---------------- Excel Generator ---------------- */

const downloadExcel = (title) => {
  const data = generateFakeData();

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(file, `${title}.xlsx`);
};

/* ================== MAIN PAGE ================== */

export default function ReportsPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Reports & Export
        </h1>
        <p className="text-slate-500 text-sm">
          Generate and download comprehensive reports
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        <StatCard
          title="Reports Generated"
          value="1,247"
          sub="+85 this month"
          icon={<FileText size={22} />}
          color="bg-blue-500"
        />

        <StatCard
          title="Downloads"
          value="3,456"
          sub="+12% total"
          icon={<Download size={22} />}
          color="bg-indigo-500"
        />

        <StatCard
          title="Scheduled Reports"
          value="24"
          sub="active"
          icon={<Calendar size={22} />}
          color="bg-emerald-500"
        />

        <StatCard
          title="Avg Generation Time"
          value="12s"
          sub="-3s improved"
          icon={<Clock size={22} />}
          color="bg-orange-500"
        />

      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">

        <h2 className="text-lg font-semibold text-slate-800 mb-5">
          Available Reports
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <ReportCard
            title="Fleet Health Summary"
            desc="Comprehensive overview of all vehicle health metrics"
            time="2024-01-15 09:30"
          />

          <ReportCard
            title="Alert Analysis Report"
            desc="Detailed breakdown of alerts and resolution time"
            time="2024-01-15 08:15"
          />

          <ReportCard
            title="Service Center Performance"
            desc="Capacity utilization and efficiency analysis"
            time="2024-01-14 17:45"
          />

          <ReportCard
            title="Manufacturing Quality Report"
            desc="Defect trends and supplier performance"
            time="2024-01-14 14:20"
          />

        </div>

      </div>

      {/* Quick Export */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 flex justify-between items-center gap-4">

        <div className="flex items-center gap-3">

          <div className="bg-blue-100 p-3 rounded-lg">
            <Download className="text-blue-600" />
          </div>

          <div>
            <h3 className="font-semibold text-slate-800">
              Quick Export
            </h3>
            <p className="text-sm text-slate-500">
              Generate report with current data
            </p>
          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => downloadPDF("Quick_Report")}
            className="border px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
          >
            Export PDF
          </button>

          <button
            onClick={() => downloadExcel("Quick_Report")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Export Excel
          </button>

        </div>

      </div>

    </div>
  );
}

/* ---------------- Components ---------------- */

function StatCard({ title, value, sub, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center">

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-semibold text-slate-800 mt-1">
          {value}
        </h3>
        <p className="text-xs text-emerald-600 mt-1">{sub}</p>
      </div>

      <div className={`${color} p-3 rounded-lg text-white`}>
        {icon}
      </div>

    </div>
  );
}

function ReportCard({ title, desc, time }) {
  return (
    <div className="bg-slate-100 rounded-xl p-5">

      <div className="flex gap-3 items-start mb-3">

        <div className="bg-blue-100 p-2 rounded-lg">
          <FileText className="text-blue-600" size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            {title}
          </h3>

          <p className="text-sm text-slate-600">
            {desc}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Last: {time}
          </p>
        </div>

      </div>

      <div className="flex gap-3 mt-4">

        <button
          onClick={() => downloadPDF(title)}
          className="flex-1 border rounded-lg py-2 text-sm text-red-500 hover:bg-red-50 transition"
        >
          <File size={16} className="inline mr-1" />
          PDF
        </button>

        <button
          onClick={() => downloadExcel(title)}
          className="flex-1 border rounded-lg py-2 text-sm text-emerald-600 hover:bg-emerald-50 transition"
        >
          <FileSpreadsheet size={16} className="inline mr-1" />
          Excel
        </button>

      </div>

    </div>
  );
}
