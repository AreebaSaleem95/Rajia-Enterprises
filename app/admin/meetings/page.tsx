"use client";

import React, { useState, useEffect } from "react";
import { Calendar, Video, Building2, Phone, CheckCircle2, XCircle, Clock } from "lucide-react";

export default function AdminMeetingsPage() {
  const [meetings, setMeetings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/meetings");
      const data = await res.json();
      if (data.meetings) setMeetings(data.meetings);
    } catch (e) {
      console.error("Meetings error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/admin/meetings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      setMeetings((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status } : m))
      );
    } catch (e) {
      alert("Failed to update meeting status");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#0C294F]">
          Consultation Meetings & Factory Tours
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review booked video consultations, Google Meet links, and scheduled plant visits
        </p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Meeting Title / Agenda</th>
                <th className="py-3.5 px-4">Client & Company</th>
                <th className="py-3.5 px-4">Scheduled Time</th>
                <th className="py-3.5 px-4">Format & Link</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Loading scheduled meetings...
                  </td>
                </tr>
              ) : meetings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No scheduled meetings found.
                  </td>
                </tr>
              ) : (
                meetings.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 max-w-xs truncate">
                      {m.title}
                      {m.notes && (
                        <p className="text-[11px] text-slate-400 font-normal truncate mt-0.5">
                          {m.notes}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800">{m.contactName}</p>
                      <p className="text-slate-500">{m.companyName}</p>
                      <p className="text-slate-400 text-[11px]">{m.email} | {m.phone}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#0C294F]">
                        {new Date(m.scheduledAt).toLocaleString()}
                      </p>
                      <p className="text-slate-400 text-[11px]">{m.timeZone}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-700 block">
                        {m.meetingType}
                      </span>
                      {m.meetingLink && (
                        <a
                          href={m.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-[11px] font-bold block truncate max-w-xs"
                        >
                          Join Google Meet
                        </a>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          m.status === "CONFIRMED"
                            ? "bg-emerald-100 text-emerald-800"
                            : m.status === "COMPLETED"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      {m.status !== "COMPLETED" && (
                        <button
                          onClick={() => handleUpdateStatus(m.id, "COMPLETED")}
                          className="px-2 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold hover:bg-emerald-700"
                        >
                          Complete
                        </button>
                      )}
                      {m.status !== "CANCELLED" && (
                        <button
                          onClick={() => handleUpdateStatus(m.id, "CANCELLED")}
                          className="px-2 py-1 bg-rose-600 text-white rounded text-[11px] font-bold hover:bg-rose-700"
                        >
                          Cancel
                        </button>
                      )}
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
