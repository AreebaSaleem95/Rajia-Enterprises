"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Package, 
  Globe, 
  PhoneCall, 
  AlertCircle 
} from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPieces } = useCart();

  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [country, setCountry] = useState("United States");
  const [destinationPort, setDestinationPort] = useState("New York / New Jersey (CIF)");
  const [incoterms, setIncoterms] = useState("FOB_KARACHI");
  const [targetDeliveryDate, setTargetDeliveryDate] = useState("");
  const [packingRequirement, setPackingRequirement] = useState("Standard 3-Pcs Box in Export Master Carton (72 Pcs)");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSizeChange = (
    itemId: string,
    currentBreakdown: { [k: string]: number },
    size: string,
    val: string
  ) => {
    const num = Math.max(0, parseInt(val) || 0);
    const updated = { ...currentBreakdown, [size]: num };
    updateQuantity(itemId, updated);
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (items.length === 0) {
      setErrorMsg("Your wholesale inquiry cart is empty. Please add products first.");
      return;
    }
    if (!contactPerson || !email || !phone) {
      setErrorMsg("Please provide your name, business email, and phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          contactPerson,
          email,
          phone,
          whatsapp: whatsapp || phone,
          country,
          destinationPort,
          incoterms,
          targetDeliveryDate,
          packingRequirement,
          notes,
          items,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit inquiry");
      }

      setSubmittedRef(data.referenceNo);
      clearCart();
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // If submitted successfully:
  if (submittedRef) {
    const waUrl = `https://wa.me/923008663488?text=${encodeURIComponent(
      `Hello Rajia Enterprises, I have submitted wholesale inquiry reference ${submittedRef}. Please confirm receipt and share the formal quotation.`
    )}`;

    return (
      <div className="w-full bg-[#F8FAFC] py-16">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6 bg-white p-10 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
            Quotation Request Received
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0C294F]">
            Thank You, {contactPerson}!
          </h1>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 space-y-1">
            <p className="text-xs text-slate-500 font-semibold uppercase">Official Reference Number:</p>
            <p className="text-2xl font-mono font-black text-[#0C294F]">{submittedRef}</p>
            <p className="text-xs text-slate-500 pt-1">
              Recorded in Rajia Enterprises CRM system.
            </p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Our Senior Export Manager in Faisalabad is preparing your official pro-forma cost sheet including FOB Karachi / CIF freight rates and yarn index pricing. You will receive an official response via email within 24 hours.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white px-6 py-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Follow Up Immediately on WhatsApp</span>
            </a>
            <Link
              href="/products"
              className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg text-xs font-semibold"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate container load percentage approx (1x20ft FCL ~ 35,000 pcs)
  const containerPct = Math.min(100, Math.round((totalPieces / 35000) * 100));

  return (
    <div className="w-full bg-[#F8FAFC] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Breadcrumbs */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#0C294F]">Home</Link>
            <span>/</span>
            <span className="text-[#0C294F] font-bold">B2B Wholesale Inquiry Cart</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0C294F]">
                Wholesale Quotation Request Cart
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Review your garment configurations, sizing breakdown, and submit a formal Request for Quotation (RFQ).
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1 self-start sm:self-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Items</span>
              </button>
            )}
          </div>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              Your Wholesale Inquiry Cart is Empty
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              You haven&apos;t added any vests to your inquiry list yet. Browse our 100% combed cotton collection and specify your bulk quantity by size.
            </p>
            <div className="pt-2">
              <Link
                href="/products"
                className="bg-[#0C294F] hover:bg-[#194072] text-white px-6 py-3 rounded-lg text-xs font-bold inline-flex items-center gap-2"
              >
                <span>Browse Products Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-7 space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <div className="w-20 h-24 bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-bold text-amber-600 uppercase">
                            {item.sku}
                          </span>
                          <h3 className="font-bold text-sm text-[#0C294F]">
                            {item.productName}
                          </h3>
                          <p className="text-xs text-slate-500">Colorway: {item.color}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Remove Item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                        <span>
                          Total: <strong className="text-slate-900">{item.totalQuantity.toLocaleString()} Pcs</strong>
                        </span>
                        <span>•</span>
                        <span>Pack: <strong className="text-slate-900">{item.packagingPreference}</strong></span>
                        {item.customLogo && (
                          <>
                            <span>•</span>
                            <span className="text-amber-700 font-semibold">Custom Labeling</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Size breakdown inline editor */}
                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-600 block">
                      Edit Sizing Allocation (Pieces):
                    </span>
                    <div className="grid grid-cols-6 gap-2">
                      {["S", "M", "L", "XL", "2XL", "3XL"].map((sz) => (
                        <div key={sz} className="text-center">
                          <span className="text-[10px] text-slate-400 font-bold block">{sz}</span>
                          <input
                            type="number"
                            min="0"
                            step="10"
                            value={item.sizeBreakdown[sz] ?? 0}
                            onChange={(e) =>
                              handleSizeChange(item.id, item.sizeBreakdown, sz, e.target.value)
                            }
                            className="w-full text-center border border-slate-300 rounded p-1 text-xs font-semibold focus:outline-none focus:border-[#0C294F]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Container Estimation Notice */}
              <div className="bg-[#0C294F] text-white rounded-xl p-5 space-y-2 border border-slate-700">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Package className="w-4 h-4" />
                    Container Volume Estimate
                  </span>
                  <span>{totalPieces.toLocaleString()} / 35,000 Pcs (20ft FCL)</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-amber-400 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${containerPct}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-300">
                  Current inquiry represents approx {containerPct}% of a standard 20ft Full Container Load (FCL). We also fulfill LCL (Less than Container Load) orders.
                </p>
              </div>
            </div>

            {/* Right Column: Official B2B Request For Quotation (RFQ) Form */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-sm">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-base font-bold text-[#0C294F]">
                  Official Wholesale RFQ Form
                </h2>
                <p className="text-xs text-slate-500">
                  Provide your business credentials for factory pricing
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Company / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Apparel Imports LLC"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Phone Number *
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
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="For fastest quotation"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Destination Country
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. United States, UAE, UK"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Destination Port / City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Jebel Ali / Felixstowe"
                      value={destinationPort}
                      onChange={(e) => setDestinationPort(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Incoterms
                    </label>
                    <select
                      value={incoterms}
                      onChange={(e) => setIncoterms(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2.5 bg-white focus:outline-none focus:border-[#0C294F]"
                    >
                      <option value="FOB_KARACHI">FOB Karachi Port (Recommended)</option>
                      <option value="CIF_DESTINATION">CIF Destination Port</option>
                      <option value="CFR">CFR Port of Destination</option>
                      <option value="EXW_FAISALABAD">EXW Factory Faisalabad</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Target Delivery Window
                    </label>
                    <input
                      type="date"
                      value={targetDeliveryDate}
                      onChange={(e) => setTargetDeliveryDate(e.target.value)}
                      className="w-full border border-slate-300 rounded-lg p-2 focus:outline-none focus:border-[#0C294F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Special Packaging & Customization Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Custom GSM requirement, woven label artwork, barcode stickers, specific carton markings..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 focus:outline-none focus:border-[#0C294F]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0C294F] hover:bg-[#194072] text-white py-3.5 px-6 rounded-lg font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>{loading ? "Processing RFQ..." : `Submit B2B RFQ (${totalPieces.toLocaleString()} Pcs)`}</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center">
                  Direct submission to Rajia Enterprises ERP / CRM. No intermediaries.
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
