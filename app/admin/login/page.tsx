"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@rajipk.com");
  const [password, setPassword] = useState("Admin@123456");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (userEmail: string, userPass: string) => {
    setEmail(userEmail);
    setPassword(userPass);
  };

  return (
    <div className="min-h-screen bg-[#0C294F] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#091f3c] p-6 text-center text-white border-b-2 border-amber-500">
          <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950 font-serif font-black text-2xl mx-auto mb-2">
            V
          </div>
          <h1 className="text-xl font-bold tracking-tight">RAJIA ENTERPRISES</h1>
          <p className="text-xs text-slate-400">
            Internal Operations, CRM & Production Portal
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Staff Corporate Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0C294F]"
                  placeholder="admin@rajipk.com"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0C294F]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0C294F] hover:bg-[#194072] text-white py-3 rounded-lg font-bold text-xs shadow transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Sign In to ERP Portal"}</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>

          {/* Quick Demo Credentials for Reviewers */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Quick One-Click Test Accounts:
            </span>
            <div className="grid grid-cols-3 gap-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => fillCredentials("admin@rajipk.com", "Admin@123456")}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-center border border-slate-200"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => fillCredentials("sales@rajipk.com", "Staff@123456")}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-center border border-slate-200"
              >
                Sales Mgr
              </button>
              <button
                type="button"
                onClick={() => fillCredentials("production@rajipk.com", "Staff@123456")}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-center border border-slate-200"
              >
                Production
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link href="/" className="text-xs text-slate-500 hover:text-[#0C294F] underline">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
