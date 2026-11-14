"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Users, 
  FileText, 
  ShoppingCart, 
  Factory, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        if (res.ok) {
          const result = await res.json();
          setData(result);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs">
        Loading real-time enterprise metrics from SQLite database...
      </div>
    );
  }

  const kpis = data?.kpis || {
    totalLeads: 0,
    totalInquiries: 0,
    totalQuotations: 0,
    totalOrders: 0,
    totalMeetings: 0,
    totalRevenueUSD: 0,
    totalOrderedPieces: 0,
    activeProductionPieces: 0,
    factoryCapacity: "200,000 Pcs/Month",
  };

  return (
    <div className="space-y-8">
      {/* Title & Fast Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0C294F]">
            Operational Overview & Business Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time pipeline metrics, manufacturing capacity, and active quotations
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/leads"
            className="bg-[#0C294F] hover:bg-[#194072] text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow"
          >
            Manage CRM Leads
          </Link>
          <Link
            href="/admin/quotations"
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow"
          >
            + New Quotation
          </Link>
        </div>
      </div>

      {/* 8 Real-Time KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>CRM Pipeline Leads</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-black text-[#0C294F]">{kpis.totalLeads}</p>
          <span className="text-[10px] text-emerald-600 font-bold block">
            Active buyer inquiries
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Wholesale Inquiries</span>
            <FileText className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-[#0C294F]">{kpis.totalInquiries}</p>
          <span className="text-[10px] text-slate-500 block">
            Cart & web RFQs logged
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Approved Quotations</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl font-black text-[#0C294F]">{kpis.totalQuotations}</p>
          <span className="text-[10px] text-purple-600 font-bold block">
            Pro-forma cost sheets
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Recorded Export Orders</span>
            <ShoppingCart className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-[#0C294F]">{kpis.totalOrders}</p>
          <span className="text-[10px] text-emerald-600 font-bold block">
            {kpis.totalOrderedPieces.toLocaleString()} pieces in orders
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Total Booked Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700">
            ${kpis.totalRevenueUSD.toLocaleString()}
          </p>
          <span className="text-[10px] text-slate-500 block">
            Confirmed export sales
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Active Production</span>
            <Factory className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-[#0C294F]">
            {kpis.activeProductionPieces.toLocaleString()} Pcs
          </p>
          <span className="text-[10px] text-indigo-600 font-bold block">
            In cutting/stitching/packing
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Scheduled Meetings</span>
            <Calendar className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-[#0C294F]">{kpis.totalMeetings}</p>
          <span className="text-[10px] text-rose-600 font-bold block">
            Confirmed consultations
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Monthly Plant Capacity</span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-black text-[#0C294F]">200,000 Pcs</p>
          <span className="text-[10px] text-slate-500 block">
            Faisalabad industrial facility
          </span>
        </div>
      </div>

      {/* Two Column Layout: Recent Inquiries & Recent CRM Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-sm text-[#0C294F]">
              Recent Wholesale Inquiries (RFQs)
            </h3>
            <span className="text-xs text-slate-400">Latest from website cart</span>
          </div>

          <div className="space-y-3">
            {data?.recentInquiries?.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No inquiries logged yet.</p>
            ) : (
              data?.recentInquiries?.map((inq: any) => (
                <div
                  key={inq.id}
                  className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#0C294F]">
                      {inq.referenceNo}
                    </span>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {inq.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>
                      <strong className="text-slate-900">{inq.contactPerson}</strong> ({inq.companyName})
                    </span>
                    <span className="font-bold text-[#0C294F]">
                      {inq.totalQuantity.toLocaleString()} Pcs
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>Port: {inq.destinationPort}</span>
                    <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent CRM Leads */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-sm text-[#0C294F]">
              Active Pipeline Leads
            </h3>
            <Link href="/admin/leads" className="text-xs font-bold text-amber-700 hover:underline">
              View All Leads →
            </Link>
          </div>

          <div className="space-y-3">
            {data?.recentLeads?.length === 0 ? (
              <p className="text-xs text-slate-400 py-4 text-center">No active leads found.</p>
            ) : (
              data?.recentLeads?.map((lead: any) => (
                <div
                  key={lead.id}
                  className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0C294F] truncate max-w-[200px]">
                      {lead.title}
                    </span>
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {lead.stage}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span>Contact: {lead.contactName} ({lead.companyName})</span>
                    <span className="font-bold text-emerald-700">
                      ${lead.estimatedValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>{lead.email} | {lead.country}</span>
                    <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Consultation Meetings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 className="font-bold text-sm text-[#0C294F]">
            Upcoming Scheduled Consultations & Factory Tours
          </h3>
          <Link href="/admin/meetings" className="text-xs font-bold text-amber-700 hover:underline">
            Manage Calendar →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.upcomingMeetings?.length === 0 ? (
            <p className="text-xs text-slate-400 py-4 text-center col-span-3">No upcoming meetings scheduled.</p>
          ) : (
            data?.upcomingMeetings?.map((mtg: any) => (
              <div key={mtg.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{mtg.contactName}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    {mtg.status}
                  </span>
                </div>
                <p className="text-slate-600">{mtg.companyName}</p>
                <div className="text-slate-500 font-medium">
                  {new Date(mtg.scheduledAt).toLocaleString()}
                </div>
                {mtg.meetingLink && (
                  <a
                    href={mtg.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline block text-[11px] font-bold truncate pt-1"
                  >
                    Open Google Meet Link
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
