"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  MessageCircle, 
  Building2 
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: company || "Direct Contact Form",
          contactPerson: name,
          email,
          phone,
          whatsapp: phone,
          notes: message,
          items: [],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit inquiry");

      setSuccess(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#0C294F]">Home</Link>
            <span>/</span>
            <span className="text-[#0C294F] font-bold">Contact & Factory Location</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Official Factory Headquarters
              </span>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0C294F]">
                Get in Touch with Rajia Enterprises
              </h1>
              <p className="text-sm text-slate-600 max-w-2xl mt-1">
                Reach out to our export merchandising desk for wholesale inquiries, sample requests, pro-forma quotations, and manufacturing specifications.
              </p>
            </div>

            <div className="bg-[#0C294F] text-white p-4 rounded-xl border border-slate-700 shrink-0 text-xs space-y-1">
              <span className="text-amber-400 font-bold block text-sm">Working Hours (PKT)</span>
              <span className="text-slate-200">Monday – Saturday: 9:00 AM – 7:00 PM</span>
              <span className="text-slate-400 block text-[11px]">24/7 WhatsApp Export Representative Available</span>
            </div>
          </div>
        </div>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0C294F]">Factory Address</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Office #786, Street #4, Imdad Town, Sheikhupura Road, Near HBL Bank, Faisalabad, Pakistan
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0C294F]">WhatsApp Hotline</h3>
            <a
              href="https://wa.me/923008663488"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-700 hover:underline font-bold block"
            >
              +92 300 8663488
            </a>
            <p className="text-[11px] text-slate-500">Fastest response for international importers</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0C294F]">Direct Landline</h3>
            <a href="tel:0418750391" className="text-xs text-slate-800 font-bold block hover:underline">
              041-8750391
            </a>
            <p className="text-[11px] text-slate-500">Corporate & administrative inquiries</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#0C294F]">Official Email</h3>
            <a href="mailto:info@rajipk.com" className="text-xs text-slate-800 font-bold block hover:underline">
              info@rajipk.com
            </a>
            <p className="text-[11px] text-slate-500">Pro-forma invoices and procurement RFQs</p>
          </div>
        </div>

        {/* Contact Form & Google Map Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-lg font-bold text-[#0C294F]">
                Send Direct Message to Export Desk
              </h2>
              <p className="text-xs text-slate-500">
                All submissions are logged into our CRM and responded to within 24 hours.
              </p>
            </div>

            {success ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-base text-emerald-900">Message Transmitted</h3>
                <p className="text-xs text-emerald-800">
                  Thank you for reaching out. An export representative from our Faisalabad headquarters has been assigned to your message.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Company Name</label>
                    <input
                      type="text"
                      placeholder="Trading / Retail Company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="buyer@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 0000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Message / RFQ Details *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about required quantities, target prices, destination port, or specific garment inquiries..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0C294F] hover:bg-[#194072] text-white py-3.5 px-6 rounded-lg font-bold text-sm shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>{loading ? "Sending..." : "Submit Inquiry"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Interactive Google Map & Location Card */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm space-y-4">
            <div className="aspect-[4/3] w-full bg-slate-100">
              <iframe
                title="Rajia Enterprises Factory Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108930.56942698948!2d73.00392348545899!3d31.42867823528859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922425cf015a819%3A0xf63989c45a76c8c4!2sFaisalabad%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="p-6 pt-0 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Rajia Enterprises (House of VESTO®)</span>
              </div>
              <p className="text-slate-600">
                Sheikhupura Road, Imdad Town, Faisalabad Industrial Zone. Conveniently located with direct highway links to M-4 / M-3 Motorway for rapid container haulage to Karachi seaport.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
