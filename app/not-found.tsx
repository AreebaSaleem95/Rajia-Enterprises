import React from "react";
import Link from "next/link";
import { FileQuestion, Home, ArrowRight, Package } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAFC] px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#CBD5E0] shadow-sm p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-[#C59B27] flex items-center justify-center mx-auto border border-amber-100">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
            404 Error · Page Not Found
          </span>
          <h1 className="text-2xl font-bold text-[#0C294F]">
            Requested Page Does Not Exist
          </h1>
          <p className="text-sm text-[#718096] leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 bg-[#0C294F] hover:bg-[#194072] text-white py-3 px-4 rounded-lg font-bold text-sm shadow transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/products"
            className="flex-1 bg-[#C59B27] hover:bg-[#b0881e] text-slate-950 py-3 px-4 rounded-lg font-bold text-sm shadow transition-colors flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>Browse Catalog</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
