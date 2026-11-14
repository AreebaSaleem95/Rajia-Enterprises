"use client";

import React, { useState, useEffect } from "react";
import { Package, AlertCircle, ArrowUpRight, ArrowDownRight, Plus, RefreshCw } from "lucide-react";

export default function AdminInventoryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [adjustModal, setAdjustModal] = useState<any | null>(null);
  const [adjustQty, setAdjustQty] = useState("100");
  const [adjustType, setAdjustType] = useState("PRODUCTION_IN");
  const [adjustReason, setAdjustReason] = useState("Daily production batch received from packing");

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/inventory");
      const data = await res.json();
      if (data.items) setItems(data.items);
    } catch (e) {
      console.error("Inventory error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleAdjustSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adjustModal) return;

    try {
      const res = await fetch("/api/admin/inventory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inventoryItemId: adjustModal.id,
          type: adjustType,
          quantity: Number(adjustQty),
          reason: adjustReason,
        }),
      });

      if (res.ok) {
        setAdjustModal(null);
        fetchInventory();
      }
    } catch (e) {
      alert("Failed to adjust inventory");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0C294F]">
            Warehouse Inventory & Stock Control
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Physical finished goods stock across S, M, L, XL, 2XL, 3XL at Warehouse WH-FSD-01
          </p>
        </div>

        <button
          onClick={fetchInventory}
          className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Stock</span>
        </button>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">SKU / Product Variant</th>
                <th className="py-3.5 px-4">Size & Color</th>
                <th className="py-3.5 px-4">Warehouse Location</th>
                <th className="py-3.5 px-4">Current Stock</th>
                <th className="py-3.5 px-4">Safety Reorder Point</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Loading inventory records...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No inventory records found.
                  </td>
                </tr>
              ) : (
                items.map((it) => {
                  const isLow = it.currentStock <= it.safetyStock;
                  return (
                    <tr key={it.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#0C294F]">
                        {it.productVariant?.sku}
                        <p className="text-[11px] text-slate-500 font-normal">
                          {it.productVariant?.product?.title}
                        </p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-800">
                          Size {it.productVariant?.size}
                        </span>
                        <p className="text-slate-500">{it.productVariant?.color}</p>
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-600">
                        {it.warehouseLocation}
                      </td>
                      <td className="py-3 px-4 font-black text-sm text-slate-900">
                        {it.currentStock.toLocaleString()} Pcs
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {it.safetyStock} Pcs
                      </td>
                      <td className="py-3 px-4">
                        {isLow ? (
                          <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 w-max">
                            <AlertCircle className="w-3 h-3" />
                            <span>Low Stock Alert</span>
                          </span>
                        ) : (
                          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setAdjustModal(it)}
                          className="bg-[#0C294F] text-white px-2.5 py-1 rounded text-[11px] font-bold hover:bg-[#194072]"
                        >
                          Adjust Stock
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Modal */}
      {adjustModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-[#0C294F]">
              Stock Adjustment: {adjustModal.productVariant?.sku}
            </h3>
            <p className="text-xs text-slate-500">
              Current stock: <strong>{adjustModal.currentStock} Pcs</strong>
            </p>

            <form onSubmit={handleAdjustSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Transaction Type</label>
                <select
                  value={adjustType}
                  onChange={(e) => setAdjustType(e.target.value)}
                  className="w-full border rounded p-2 focus:outline-none focus:border-[#0C294F]"
                >
                  <option value="PRODUCTION_IN">Production In (+) - Finished goods from floor</option>
                  <option value="ADJUSTMENT_IN">Adjustment In (+) - Audit reconciliation</option>
                  <option value="SALES_DISPATCH">Sales Dispatch (-) - Container shipment</option>
                  <option value="SAMPLE_OUT">Sample Out (-) - DHL counter sample to buyer</option>
                  <option value="DAMAGE_OUT">Damage / Scrap Out (-)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Quantity (Pieces)</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(e.target.value)}
                  className="w-full border rounded p-2 focus:outline-none focus:border-[#0C294F]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Reason / Notes</label>
                <input
                  type="text"
                  required
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full border rounded p-2 focus:outline-none focus:border-[#0C294F]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustModal(null)}
                  className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0C294F] text-white rounded font-bold hover:bg-[#194072]"
                >
                  Save Stock Movement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
