"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  ShoppingCart, 
  Factory, 
  Package, 
  Calendar, 
  BarChart3, 
  LogOut, 
  ExternalLink,
  Menu,
  X,
  ShieldCheck
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    let active = true;
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          if (active) router.push("/admin/login");
          return;
        }
        const data = await res.json();
        if (active) setCurrentUser(data.user);
      } catch {
        if (active) router.push("/admin/login");
      }
    };
    fetchUser();
    return () => {
      active = false;
    };
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const menuItems = [
    { label: "Dashboard Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "CRM Leads & Pipeline", href: "/admin/leads", icon: Users },
    { label: "Formal Quotations", href: "/admin/quotations", icon: FileText },
    { label: "Orders & Shipping", href: "/admin/orders", icon: ShoppingCart },
    { label: "Production Batches", href: "/admin/production", icon: Factory },
    { label: "Warehouse Inventory", href: "/admin/inventory", icon: Package },
    { label: "Consultation Meetings", href: "/admin/meetings", icon: Calendar },
    { label: "Reports & Analytics", href: "/admin/reports", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#0C294F] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded text-slate-950 font-bold flex items-center justify-center">
            V
          </div>
          <span className="font-bold text-sm">VESTO ERP</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`w-64 bg-[#0C294F] text-slate-300 flex flex-col justify-between shrink-0 border-r border-[#194072] ${
          mobileOpen ? "block" : "hidden"
        } md:flex`}
      >
        <div className="p-6 space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center text-slate-950 font-serif font-black text-xl shadow">
              V
            </div>
            <div>
              <h2 className="text-white font-black tracking-tight text-base">
                RAJIA ERP
              </h2>
              <span className="text-[10px] text-amber-400 font-bold uppercase">
                Operations & CRM
              </span>
            </div>
          </div>

          {/* User profile card */}
          {currentUser && (
            <div className="bg-[#194072]/60 rounded-xl p-3 border border-slate-700 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[11px]">
                  {currentUser.name?.charAt(0) || "U"}
                </div>
                <div className="truncate">
                  <p className="text-white font-bold truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-amber-300 font-semibold">{currentUser.role}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? "bg-amber-500 text-slate-950 font-bold shadow"
                      : "text-slate-300 hover:bg-[#194072] hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#194072] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-[#194072] transition-colors"
          >
            <span>Live Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Rajia Enterprises Faisalabad Plant</span>
            <span>•</span>
            <span className="text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Database Online (SQLite dev.db)
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-slate-600">Capacity: 200,000 Pcs/Mo</span>
            <Link
              href="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1 text-[#0C294F] hover:underline"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
