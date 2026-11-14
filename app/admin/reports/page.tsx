"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, Download, TrendingUp, Factory, Globe2, Award } from "lucide-react";

export default function AdminReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const downloadReport = () => {
    const csvContent =
      "Metric,Value,Unit\n" +
      "Monthly Manufacturing Capacity,200000,Pieces\n" +
      "Active Production Batches,45000,Pieces\n" +
      "Export Orders Delivered,120000,Pieces\n" +
      "Primary Export Regions,Middle East / UK / EU / USA,Global\n" +
      "GSM Quality Compliance,100%,OEKO-TEX & AATCC\n";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Rajia_Enterprises_Operational_Report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0C294F]">
            Reports & Operational Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Production yield, export trade lane distribution, and AQL quality compliance metrics
          </p>
        </div>

        <button
          onClick={downloadReport}
          className="bg-[#0C294F] hover:bg-[#194072] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Download Executive CSV Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#0C294F] font-bold text-sm border-b pb-3">
            <Factory className="w-4 h-4 text-amber-600" />
            <span>Plant Capacity Utilization (200,000 Pcs/Mo)</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Active Cutting & Assembly</span>
                <span className="font-bold text-slate-800">45,000 Pcs (22.5%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "22.5%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Finished Goods Packed & Dispatched</span>
                <span className="font-bold text-slate-800">120,000 Pcs (60.0%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Available Production Slot (Current Month)</span>
                <span className="font-bold text-amber-600">35,000 Pcs (17.5%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full" style={{ width: "17.5%" }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-[#0C294F] font-bold text-sm border-b pb-3">
            <Globe2 className="w-4 h-4 text-amber-600" />
            <span>Export Destination Volume Breakdown</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="font-semibold text-slate-700">Middle East & GCC (Dubai / Jeddah)</span>
              <span className="font-black text-[#0C294F]">42% of Shipments</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="font-semibold text-slate-700">United Kingdom (Felixstowe / London)</span>
              <span className="font-black text-[#0C294F]">28% of Shipments</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="font-semibold text-slate-700">North America (US & Canada)</span>
              <span className="font-black text-[#0C294F]">18% of Shipments</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-semibold text-slate-700">Domestic Wholesale (Pakistan)</span>
              <span className="font-black text-[#0C294F]">12% of Volume</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
