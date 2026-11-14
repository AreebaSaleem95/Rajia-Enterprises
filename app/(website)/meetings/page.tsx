"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Video, 
  Building2, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Globe2, 
  ArrowRight 
} from "lucide-react";

export default function MeetingsPage() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<string[]>([
    "10:00 AM",
    "11:30 AM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
  ]);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [meetingType, setMeetingType] = useState<string>("VIRTUAL_GOOGLE_MEET");

  const [contactName, setContactName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [timeZone, setTimeZone] = useState("Asia/Karachi (PKT +05:00)");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [confirmedMeeting, setConfirmedMeeting] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Default to tomorrow
  useEffect(() => {
    const tmrw = new Date();
    tmrw.setDate(tmrw.getDate() + 1);
    const dateFormatted = tmrw.toISOString().split("T")[0];
    setSelectedDate(dateFormatted);
  }, []);

  // Fetch booked slots whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;
    const fetchBooked = async () => {
      try {
        const res = await fetch(`/api/meetings?date=${selectedDate}`);
        const data = await res.json();
        if (data.bookedSlots) {
          // Convert ISO timestamps to matching HH:MM AM/PM strings in local timezone
          const bookedTimes = data.bookedSlots.map((iso: string) => {
            const d = new Date(iso);
            let hours = d.getHours();
            const minutes = d.getMinutes();
            const ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12;
            hours = hours ? hours : 12;
            const mStr = minutes < 10 ? `0${minutes}` : minutes;
            return `${hours < 10 ? `0${hours}` : hours}:${mStr} ${ampm}`;
          });
          setBookedSlots(bookedTimes);
        }
      } catch (e) {
        console.error("Error loading booked slots", e);
      }
    };
    fetchBooked();
  }, [selectedDate]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedDate || !selectedSlot) {
      setErrorMsg("Please select a date and an available time slot.");
      return;
    }
    if (!contactName || !email) {
      setErrorMsg("Please fill in your name and email address.");
      return;
    }

    setLoading(true);

    try {
      // Construct ISO scheduledAt date
      const [time, period] = selectedSlot.split(" ");
      const [hourStr, minStr] = time.split(":");
      let hour = parseInt(hourStr, 10);
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      const scheduledDate = new Date(`${selectedDate}T${hour < 10 ? `0${hour}` : hour}:${minStr}:00`);

      const res = await fetch("/api/meetings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `B2B Sourcing Consultation - ${companyName || contactName}`,
          contactName,
          companyName,
          email,
          phone,
          whatsapp: whatsapp || phone,
          meetingType,
          scheduledAt: scheduledDate.toISOString(),
          timeZone,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to schedule consultation.");
      }

      setConfirmedMeeting(data.meeting);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (confirmedMeeting) {
    return (
      <div className="w-full bg-[#F8FAFC] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6 bg-white p-10 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
            Meeting Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0C294F]">
            Consultation Scheduled with Rajia Enterprises
          </h1>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-left space-y-3 text-xs text-slate-700">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-500">Attendee:</span>
              <strong className="text-slate-900">{confirmedMeeting.contactName} ({confirmedMeeting.companyName})</strong>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-500">Scheduled Date & Time:</span>
              <strong className="text-slate-900">
                {new Date(confirmedMeeting.scheduledAt).toLocaleString()} ({confirmedMeeting.timeZone})
              </strong>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="font-semibold text-slate-500">Meeting Format:</span>
              <strong className="text-slate-900">{confirmedMeeting.meetingType}</strong>
            </div>
            {confirmedMeeting.meetingLink && (
              <div className="flex justify-between items-center pt-1">
                <span className="font-semibold text-slate-500">Google Meet URL:</span>
                <a
                  href={confirmedMeeting.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-bold underline"
                >
                  {confirmedMeeting.meetingLink}
                </a>
              </div>
            )}
            {confirmedMeeting.location && (
              <div className="flex justify-between items-center pt-1">
                <span className="font-semibold text-slate-500">Location:</span>
                <strong className="text-slate-800">{confirmedMeeting.location}</strong>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            A calendar invitation has been generated. Our Export Sales Director will contact you at <strong>{confirmedMeeting.email}</strong> and via WhatsApp if needed.
          </p>

          <div className="pt-2">
            <Link
              href="/"
              className="bg-[#0C294F] hover:bg-[#194072] text-white px-6 py-3 rounded-lg text-xs font-bold inline-flex items-center gap-2"
            >
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#0C294F]">Home</Link>
            <span>/</span>
            <span className="text-[#0C294F] font-bold">Schedule Business Meeting</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Direct Mill Technical Consultation
              </span>
              <h1 className="text-3xl font-black text-[#0C294F]">
                Book a Video Call or Faisalabad Factory Visit
              </h1>
              <p className="text-sm text-slate-600 max-w-2xl mt-1">
                Schedule a 45-minute direct consultation with our Senior Export Sales Director and Production Engineers. Review fabric swatches, custom specifications, FOB Karachi pricing, and lead times.
              </p>
            </div>

            <div className="bg-[#0C294F] text-white p-4 rounded-xl border border-slate-700 shrink-0 text-xs space-y-1">
              <span className="text-amber-400 font-bold block text-sm">Real-Time Scheduling</span>
              <span className="text-slate-200">Guaranteed no double-booking</span>
              <span className="text-slate-400 block text-[11px]">Instant calendar invite with Google Meet link</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Date & Slot Selector on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Calendar & Time Slots */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-6 shadow-sm">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-[#0C294F] flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-amber-600" />
                <span>1. Select Date & Time</span>
              </h2>
              <p className="text-xs text-slate-500">
                Timezone: Asia/Karachi (PKT, UTC+5)
              </p>
            </div>

            {/* Date Picker Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Choose Meeting Date:
              </label>
              <input
                type="date"
                value={selectedDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs font-semibold focus:outline-none focus:border-[#0C294F]"
              />
            </div>

            {/* Available Time Slots */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                Available Time Slots (45 Minutes):
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  const isSelected = selectedSlot === slot;

                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-3 rounded-lg border text-xs font-bold transition-all flex items-center justify-between ${
                        isBooked
                          ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed line-through"
                          : isSelected
                          ? "bg-[#0C294F] border-[#0C294F] text-white shadow"
                          : "border-slate-200 text-slate-700 hover:border-amber-500 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 opacity-70" />
                        <span>{slot}</span>
                      </div>
                      {isBooked && <span className="text-[9px] uppercase font-bold text-slate-400">Booked</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Meeting Type Selector */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 block">
                Meeting Format:
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: "VIRTUAL_GOOGLE_MEET",
                    title: "Google Meet Video Call",
                    desc: "Virtual screen sharing with factory samples review",
                    icon: Video,
                  },
                  {
                    id: "FACTORY_VISIT_FAISALABAD",
                    title: "In-Person Factory Visit",
                    desc: "Physical tour of Rajia Enterprises plant in Faisalabad",
                    icon: Building2,
                  },
                  {
                    id: "PHONE_CONSULTATION",
                    title: "Direct Phone Call",
                    desc: "Quick 15-minute voice conference with export desk",
                    icon: Phone,
                  },
                ].map((mt) => {
                  const Icon = mt.icon;
                  const active = meetingType === mt.id;
                  return (
                    <button
                      key={mt.id}
                      type="button"
                      onClick={() => setMeetingType(mt.id)}
                      className={`w-full p-3 rounded-lg border text-left transition-all flex items-start gap-3 ${
                        active
                          ? "bg-[#0C294F]/5 border-[#0C294F] text-[#0C294F]"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="w-4 h-4 mt-0.5 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-xs font-bold block">{mt.title}</span>
                        <span className="text-[11px] text-slate-500 block">{mt.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Attendee Information Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-sm">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-[#0C294F]">
                2. Attendee & Business Credentials
              </h2>
              <p className="text-xs text-slate-500">
                Please provide your contact information to receive the calendar invite
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe / Tariq Mahmood"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Company / Trading House Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Global Apparel Imports LLC"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Your Timezone
                </label>
                <input
                  type="text"
                  value={timeZone}
                  onChange={(e) => setTimeZone(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Primary Discussion Agenda / Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Monthly requirement of 30,000 pcs 180 GSM vests in Jet Black and Optic White. Interested in FOB Karachi terms and private label packaging..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0C294F] hover:bg-[#194072] text-white py-3.5 px-6 rounded-lg font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <CalendarIcon className="w-4 h-4 text-amber-400" />
                  <span>
                    {loading
                      ? "Reserving Slot..."
                      : selectedSlot
                      ? `Confirm Booking for ${selectedSlot}`
                      : "Select a Time Slot to Confirm"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
