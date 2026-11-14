"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  PhoneCall, 
  Mail, 
  Edit3, 
  Trash2,
  CheckCircle2
} from "lucide-react";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stageFilter, setStageFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // New Lead form fields
  const [newTitle, setNewTitle] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCountry, setNewCountry] = useState("Pakistan");
  const [newValue, setNewValue] = useState("5000");

  const fetchLeads = async () => {
    try {
      setLoading(true);
      let url = `/api/admin/leads?stage=${stageFilter}`;
      if (search) url += `&search=${encodeURIComponent(search)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
    } catch (e) {
      console.error("Leads error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [stageFilter]);

  const handleStageChange = async (leadId: string, stage: string) => {
    try {
      await fetch(`/api/admin/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage }),
      });
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, stage } : l))
      );
    } catch (e) {
      alert("Failed to update stage");
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle || `Inquiry: ${newCompany}`,
          contactName: newContact,
          companyName: newCompany,
          email: newEmail,
          phone: newPhone,
          country: newCountry,
          estimatedValue: Number(newValue),
        }),
      });
      if (res.ok) {
        setModalOpen(false);
        fetchLeads();
      }
    } catch (e) {
      alert("Error creating lead");
    }
  };

  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = "ID,Title,Company,Contact,Email,Phone,Country,Stage,EstimatedValueUSD,CreatedAt\n";
    const rows = leads.map(
      (l) =>
        `"${l.id}","${l.title.replace(/"/g, '""')}","${l.companyName}","${l.contactName}","${l.email}","${l.phone}","${l.country}","${l.stage}","${l.estimatedValue}","${l.createdAt}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Rajia_CRM_Leads_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0C294F]">
            CRM Leads & Pipeline Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track inquiries from initial contact through formal quotation and order closing
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#0C294F] hover:bg-[#194072] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>+ Add Lead Manually</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm text-xs">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="font-bold text-slate-500">Pipeline Stage:</span>
          {["ALL", "NEW", "CONTACTED", "QUALIFIED", "QUOTATION_SENT", "NEGOTIATION", "WON"].map(
            (st) => (
              <button
                key={st}
                onClick={() => setStageFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  stageFilter === st
                    ? "bg-[#0C294F] text-white shadow-sm"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            )
          )}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search company or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchLeads()}
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0C294F]"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Lead Title / Inquiry</th>
                <th className="py-3.5 px-4">Company & Buyer</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Est. Value</th>
                <th className="py-3.5 px-4">Pipeline Stage</th>
                <th className="py-3.5 px-4">Date Logged</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Loading CRM leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No leads matching current filters.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs truncate">
                      {lead.title}
                      {lead.notes && (
                        <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                          {lead.notes}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-800">{lead.companyName}</p>
                      <p className="text-slate-500">{lead.country}</p>
                    </td>
                    <td className="py-3 px-4 space-y-0.5">
                      <p className="font-semibold text-slate-800">{lead.contactName}</p>
                      <p className="text-slate-500">{lead.email}</p>
                      <p className="text-slate-500">{lead.phone}</p>
                    </td>
                    <td className="py-3 px-4 font-bold text-emerald-700">
                      ${Number(lead.estimatedValue || 0).toLocaleString()} {lead.currency}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={lead.stage}
                        onChange={(e) => handleStageChange(lead.id, e.target.value)}
                        className={`text-xs font-bold rounded px-2.5 py-1 border focus:outline-none ${
                          lead.stage === "WON"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : lead.stage === "LOST"
                            ? "bg-rose-100 text-rose-800 border-rose-300"
                            : "bg-blue-50 text-blue-800 border-blue-200"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="QUOTATION_SENT">QUOTATION_SENT</option>
                        <option value="NEGOTIATION">NEGOTIATION</option>
                        <option value="WON">WON</option>
                        <option value="LOST">LOST</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {lead.whatsapp && (
                        <a
                          href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex p-1.5 text-emerald-600 hover:bg-emerald-50 rounded"
                          title="WhatsApp Buyer"
                        >
                          <PhoneCall className="w-4 h-4" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Add Lead Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-[#0C294F]">Create New Sales Lead</h3>
            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Lead Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50,000 pcs Heather Grey Inquiry"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-[#0C294F]"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Company Ltd"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    placeholder="Contact Name"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="email@company.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+92 300 0000000"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Country</label>
                  <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Estimated Value ($)</label>
                  <input
                    type="number"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="w-full border border-slate-300 rounded p-2 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
              </div>
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0C294F] text-white rounded font-bold hover:bg-[#194072]"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
