"use client";

import React, { useState, useEffect } from "react";
import { Factory, CheckCircle2, Clock, AlertTriangle, Layers } from "lucide-react";

export default function AdminProductionPage() {
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBatches = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/production");
      const data = await res.json();
      if (data.batches) setBatches(data.batches);
    } catch (e) {
      console.error("Production fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleUpdateStatus = async (batchId: string, status: string) => {
    try {
      await fetch("/api/admin/production", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: batchId, status }),
      });
      setBatches((prev) =>
        prev.map((b) => (b.id === batchId ? { ...b, status } : b))
      );
    } catch (e) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#0C294F]">
          Production Batches & Floor Operations
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Live tracking of active cutting lays, 4-thread stitching lines, and AQL 2.5 packing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Monthly Plant Capacity</span>
          <span className="text-xl font-black text-[#0C294F]">200,000 Pieces</span>
          <span className="text-[11px] text-emerald-600 font-semibold block">Faisalabad Facility Online</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Stitching Workstations</span>
          <span className="text-xl font-black text-[#0C294F]">4-Thread Industrial Lines</span>
          <span className="text-[11px] text-slate-500 block">Juki & Yamato Overlock Machines</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Quality Standard</span>
          <span className="text-xl font-black text-amber-700">AQL 2.5 Inspection</span>
          <span className="text-[11px] text-slate-500 block">Zero Defect Tolerance</span>
        </div>
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Batch Number</th>
                <th className="py-3.5 px-4">Order / Client</th>
                <th className="py-3.5 px-4">Total Quantity</th>
                <th className="py-3.5 px-4">Completed / Rejected</th>
                <th className="py-3.5 px-4">Batch Stage</th>
                <th className="py-3.5 px-4">Start / Target End</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Loading production batches...
                  </td>
                </tr>
              ) : batches.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No active production batches found.
                  </td>
                </tr>
              ) : (
                batches.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0C294F]">
                      {b.batchNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">
                        {b.order?.orderNumber || "Stock Batch"}
                      </p>
                      <p className="text-slate-500">
                        {b.order?.customer?.companyName || "Internal Warehouse Allocation"}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {b.totalQuantity.toLocaleString()} Pieces
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-emerald-700">
                        {b.completedQty.toLocaleString()} Pcs
                      </span>
                      {b.rejectedQty > 0 && (
                        <span className="text-rose-600 ml-1.5 font-bold">
                          ({b.rejectedQty} rejected)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateStatus(b.id, e.target.value)}
                        className={`text-xs font-bold rounded px-2.5 py-1 border focus:outline-none ${
                          b.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : b.status === "QUALITY_CHECK"
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : "bg-blue-50 text-blue-800 border-blue-200"
                        }`}
                      >
                        <option value="PLANNED">PLANNED</option>
                        <option value="CUTTING">CUTTING</option>
                        <option value="STITCHING">STITCHING</option>
                        <option value="QUALITY_CHECK">QUALITY_CHECK</option>
                        <option value="PACKING">PACKING</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(b.startDate).toLocaleDateString()} →{" "}
                      {b.targetEndDate ? new Date(b.targetEndDate).toLocaleDateString() : "Ongoing"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
