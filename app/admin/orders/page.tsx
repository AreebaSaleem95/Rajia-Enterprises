"use client";

import React, { useState, useEffect } from "react";
import { 
  ShoppingCart, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  CreditCard 
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
    } catch (e) {
      console.error("Orders error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (
    orderId: string,
    field: "productionStatus" | "paymentStatus",
    value: string
  ) => {
    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, [field]: value }),
      });
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, [field]: value } : o))
      );
    } catch (e) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-[#0C294F]">
          Export Orders & Fulfillment Tracking
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Monitor confirmed export contracts, production dispatch stages, and LC/payment clearance
        </p>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Order Ref</th>
                <th className="py-3.5 px-4">Customer & Destination</th>
                <th className="py-3.5 px-4">Quantity & Value</th>
                <th className="py-3.5 px-4">Production Stage</th>
                <th className="py-3.5 px-4">Payment Status</th>
                <th className="py-3.5 px-4">Order Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Loading export orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No confirmed orders found.
                  </td>
                </tr>
              ) : (
                orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0C294F]">
                      {ord.orderNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">
                        {ord.customer?.companyName || "B2B Client"}
                      </p>
                      <p className="text-slate-500">
                        {ord.shippingAddress || "Port of Jebel Ali, UAE (CIF)"}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">
                        {ord.totalQuantity.toLocaleString()} Pieces
                      </p>
                      <p className="text-emerald-700 font-bold">
                        ${Number(ord.totalAmount).toLocaleString()} {ord.currency}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={ord.productionStatus}
                        onChange={(e) =>
                          handleUpdateStatus(ord.id, "productionStatus", e.target.value)
                        }
                        className={`text-xs font-bold rounded px-2.5 py-1 border focus:outline-none ${
                          ord.productionStatus === "DELIVERED"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : ord.productionStatus === "DISPATCHED"
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : "bg-amber-50 text-amber-800 border-amber-200"
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="IN_PRODUCTION">IN_PRODUCTION</option>
                        <option value="QUALITY_CHECK">QUALITY_CHECK</option>
                        <option value="READY_FOR_DISPATCH">READY_FOR_DISPATCH</option>
                        <option value="DISPATCHED">DISPATCHED</option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={ord.paymentStatus}
                        onChange={(e) =>
                          handleUpdateStatus(ord.id, "paymentStatus", e.target.value)
                        }
                        className={`text-xs font-bold rounded px-2.5 py-1 border focus:outline-none ${
                          ord.paymentStatus === "PAID"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : ord.paymentStatus === "PARTIALLY_PAID"
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : "bg-slate-100 text-slate-700 border-slate-300"
                        }`}
                      >
                        <option value="UNPAID">UNPAID</option>
                        <option value="PARTIALLY_PAID">PARTIALLY_PAID</option>
                        <option value="PAID">PAID</option>
                        <option value="LC_OPENED">LC_OPENED</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(ord.createdAt).toLocaleDateString()}
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
