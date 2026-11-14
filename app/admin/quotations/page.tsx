"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, 
  Plus, 
  Send, 
  Printer, 
  CheckCircle2, 
  Trash2, 
  PhoneCall, 
  ExternalLink 
} from "lucide-react";

export default function AdminQuotationsPage() {
  const [quotations, setQuotations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null);

  // New Quotation state
  const [customerName, setCustomerName] = useState("Global Apparel Importers Ltd");
  const [incoterms, setIncoterms] = useState("FOB");
  const [portOfLoading, setPortOfLoading] = useState("Karachi Port, Pakistan");
  const [portOfDischarge, setPortOfDischarge] = useState("Felixstowe, UK");
  const [paymentTerms, setPaymentTerms] = useState("30% Advance T/T, 70% against BL Copy");
  const [items, setItems] = useState([
    {
      productName: "VESTO Men's Cotton Undershirt (Jet Black)",
      sku: "VST-BLK-100",
      description: "100% Combed Cotton 180 GSM, 4-Thread Overlock",
      quantity: 15000,
      unitPrice: 1.85,
      color: "Jet Black",
      size: "M",
    },
  ]);

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/quotations");
      const data = await res.json();
      if (data.quotations) setQuotations(data.quotations);
    } catch (e) {
      console.error("Quotations error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        productName: "VESTO Classic Cotton Vest",
        sku: "VST-WHT-300",
        description: "100% Combed Cotton 160 GSM",
        quantity: 10000,
        unitPrice: 1.75,
        color: "Optic White",
        size: "L",
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleItemChange = (index: number, field: string, val: any) => {
    setItems((prev) =>
      prev.map((it, idx) => (idx === index ? { ...it, [field]: val } : it))
    );
  };

  const calculateTotal = () => {
    return items.reduce((sum, it) => sum + Number(it.quantity) * Number(it.unitPrice), 0);
  };

  const handleCreateQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/quotations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          incoterms,
          portOfLoading,
          portOfDischarge,
          currency: "USD",
          paymentTerms,
          items,
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        fetchQuotations();
      }
    } catch (e) {
      alert("Failed to save quotation");
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0C294F]">
            Pro-Forma Quotations & Cost Sheets
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate formal export price quotations with Incoterms (FOB / CIF) and breakdown
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="bg-[#0C294F] hover:bg-[#194072] text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>+ Create Formal Quotation</span>
        </button>
      </div>

      {/* Quotations List Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Quote Number</th>
                <th className="py-3.5 px-4">Buyer / Customer</th>
                <th className="py-3.5 px-4">Incoterms & Ports</th>
                <th className="py-3.5 px-4">Payment Terms</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Loading pro-forma quotations...
                  </td>
                </tr>
              ) : quotations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No quotations generated yet. Click &apos;+ Create Formal Quotation&apos; above.
                  </td>
                </tr>
              ) : (
                quotations.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-[#0C294F]">
                      {q.quotationNumber}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-800">
                        {q.customer?.companyName || "International Buyer"}
                      </p>
                      <p className="text-slate-500">{q.customer?.country || "Global"}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {q.incoterms}
                      </span>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {q.portOfLoading} → {q.portOfDischarge}
                      </p>
                    </td>
                    <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                      {q.paymentTerms}
                    </td>
                    <td className="py-3 px-4 font-black text-slate-900 text-sm">
                      ${Number(q.totalAmount).toLocaleString()} {q.currency}
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                        {q.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => setSelectedQuote(q)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                        title="View & Print Pro-Forma"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(
                          `Official Quotation from Rajia Enterprises:\nQuote: ${q.quotationNumber}\nTotal: $${Number(
                            q.totalAmount
                          ).toLocaleString()} USD (${q.incoterms})\nPort: ${q.portOfLoading} to ${
                            q.portOfDischarge
                          }\nPlease review pro-forma details.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
                        title="Share on WhatsApp"
                      >
                        <PhoneCall className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: View / Print Pro-Forma Invoice */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-slate-200">
            {/* Header */}
            <div className="flex justify-between items-start border-b-2 border-[#0C294F] pb-4">
              <div>
                <h2 className="text-xl font-black text-[#0C294F]">
                  RAJIA ENTERPRISES
                </h2>
                <p className="text-xs text-slate-500 font-semibold">
                  Direct Garment Manufacturer & Exporter | House of VESTO®
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Faisalabad Textile Industrial Hub, Pakistan • info@rajipk.com • +92 300 8663488
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs bg-amber-500 text-slate-950 font-black px-2.5 py-1 rounded uppercase">
                  Pro-Forma Quotation
                </span>
                <p className="text-sm font-mono font-bold text-slate-900 mt-2">
                  {selectedQuote.quotationNumber}
                </p>
                <p className="text-xs text-slate-500">
                  Date: {new Date(selectedQuote.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Terms Summary */}
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <p className="text-slate-500">Incoterms:</p>
                <p className="font-bold text-slate-800">{selectedQuote.incoterms}</p>
                <p className="text-slate-500 mt-1">Port of Loading:</p>
                <p className="font-bold text-slate-800">{selectedQuote.portOfLoading}</p>
              </div>
              <div>
                <p className="text-slate-500">Port of Discharge:</p>
                <p className="font-bold text-slate-800">{selectedQuote.portOfDischarge}</p>
                <p className="text-slate-500 mt-1">Payment Terms:</p>
                <p className="font-bold text-slate-800">{selectedQuote.paymentTerms}</p>
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#0C294F] uppercase tracking-wider">
                Garment Specifications & Pricing Breakdown
              </h4>
              <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-2.5">Item Description</th>
                    <th className="p-2.5">SKU / Color</th>
                    <th className="p-2.5 text-right">Quantity</th>
                    <th className="p-2.5 text-right">Unit Price (USD)</th>
                    <th className="p-2.5 text-right">Total (USD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedQuote.items?.map((it: any) => (
                    <tr key={it.id}>
                      <td className="p-2.5 font-semibold text-slate-800">{it.productName}</td>
                      <td className="p-2.5 text-slate-600">{it.sku} - {it.color}</td>
                      <td className="p-2.5 text-right font-bold">{it.quantity.toLocaleString()} Pcs</td>
                      <td className="p-2.5 text-right">${Number(it.unitPrice).toFixed(2)}</td>
                      <td className="p-2.5 text-right font-black text-[#0C294F]">
                        ${Number(it.totalPrice).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-50 font-bold border-t border-slate-200">
                  <tr>
                    <td colSpan={4} className="p-3 text-right uppercase text-slate-600">
                      Total FOB / Export Value:
                    </td>
                    <td className="p-3 text-right text-base font-black text-[#0C294F]">
                      ${Number(selectedQuote.totalAmount).toLocaleString()} USD
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Print / Close Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 border rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close Preview
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-[#0C294F] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Official PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Quotation */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-[#0C294F]">Build New Export Quotation</h3>
            <form onSubmit={handleCreateQuotation} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Incoterms</label>
                  <select
                    value={incoterms}
                    onChange={(e) => setIncoterms(e.target.value)}
                    className="w-full border rounded p-2 focus:outline-none focus:border-[#0C294F]"
                  >
                    <option value="FOB">FOB Karachi Port</option>
                    <option value="CIF">CIF Destination Port</option>
                    <option value="CFR">CFR</option>
                    <option value="EXW">EXW Factory Faisalabad</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Port of Loading</label>
                  <input
                    type="text"
                    value={portOfLoading}
                    onChange={(e) => setPortOfLoading(e.target.value)}
                    className="w-full border rounded p-2 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Port of Discharge</label>
                  <input
                    type="text"
                    value={portOfDischarge}
                    onChange={(e) => setPortOfDischarge(e.target.value)}
                    className="w-full border rounded p-2 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Payment Terms</label>
                  <input
                    type="text"
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full border rounded p-2 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">Quotation Line Items:</span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-amber-700 font-bold text-xs hover:underline"
                  >
                    + Add Product Line
                  </button>
                </div>

                {items.map((it, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-slate-700">Item #{idx + 1}</span>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(idx)}
                          className="text-rose-600 hover:text-rose-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="text-[10px] text-slate-500 block">Product</label>
                        <input
                          type="text"
                          value={it.productName}
                          onChange={(e) => handleItemChange(idx, "productName", e.target.value)}
                          className="w-full border rounded p-1.5"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">Colorway</label>
                        <input
                          type="text"
                          value={it.color}
                          onChange={(e) => handleItemChange(idx, "color", e.target.value)}
                          className="w-full border rounded p-1.5"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] text-slate-500 block">Quantity (Pcs)</label>
                        <input
                          type="number"
                          value={it.quantity}
                          onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                          className="w-full border rounded p-1.5"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-500 block">Unit Price (USD)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={it.unitPrice}
                          onChange={(e) => handleItemChange(idx, "unitPrice", e.target.value)}
                          className="w-full border rounded p-1.5"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div className="text-right pt-2 font-bold text-sm text-[#0C294F]">
                  Estimated Total: ${calculateTotal().toLocaleString()} USD
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0C294F] text-white rounded font-bold hover:bg-[#194072]"
                >
                  Save Quotation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
