"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloating() {
  const message = encodeURIComponent(
    "Hello Rajia Enterprises / VESTO Team,\n\nI am contacting you from your website regarding a B2B wholesale / export inquiry for men's cotton vests. Please share your latest export catalog and minimum order quantities."
  );

  return (
    <a
      href={`https://wa.me/923008663488?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group font-sans"
      aria-label="Chat on WhatsApp"
    >
      <div className="relative">
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full animate-ping"></span>
      </div>
      <div className="hidden sm:flex flex-col text-left">
        <span className="text-[10px] uppercase font-bold text-emerald-950/70 tracking-wider">Fast Response</span>
        <span className="text-xs font-bold text-white tracking-wide">WhatsApp Sales Rep</span>
      </div>
    </a>
  );
}
