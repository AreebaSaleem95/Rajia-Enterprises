"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home, Mail } from "lucide-react";

export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8FAFC] px-4 py-16">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#CBD5E0] shadow-sm p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-[#0C294F]">
            Something Went Wrong
          </h2>
          <p className="text-sm text-[#718096] leading-relaxed">
            We encountered a temporary server error while loading this page. Our technical team has been notified.
          </p>
          {error.digest && (
            <span className="inline-block text-[11px] font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded">
              Error Digest: {error.digest}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 bg-[#0C294F] hover:bg-[#194072] text-white py-3 px-4 rounded-lg font-bold text-sm shadow transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 bg-white hover:bg-slate-50 text-[#0C294F] py-3 px-4 rounded-lg font-semibold text-sm border border-[#CBD5E0] transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-slate-100 text-xs text-[#718096]">
          Need urgent assistance?{" "}
          <a
            href="mailto:info@rajipk.com"
            className="text-[#0C294F] font-semibold underline inline-flex items-center gap-1"
          >
            <Mail className="w-3 h-3" />
            Contact info@rajipk.com
          </a>
        </div>
      </div>
    </div>
  );
}
