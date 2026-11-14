import React from "react";
import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  Lock,
  ArrowRight
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0C294F] text-slate-300 border-t-4 border-[#C59B27]">
      {/* Main Four-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Rajia Enterprises Brand & Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C59B27] flex items-center justify-center text-[#0C294F] font-serif font-black text-2xl shadow-sm">
                R
              </div>
              <div>
                <span className="text-lg font-black text-white tracking-tight leading-none block">
                  RAJIA ENTERPRISES
                </span>
                <span className="text-xs text-amber-300 font-semibold tracking-wide">
                  House of VESTO® · Sourcing & Export
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Premier textile manufacturing and international export company based in Faisalabad, Pakistan. Specializing in high-performance combed cotton apparel, bed sheets, and custom private label textile production.
            </p>

            <div className="pt-1 text-xs text-slate-400 space-y-1">
              <p>Registered textile manufacturer & exporter</p>
              <p>Faisalabad industrial supply chain</p>
            </div>
          </div>

          {/* Column 2: Product Catalog */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider text-amber-300">
              Product catalog
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/products?category=mens-cotton-vest"
                  className="text-slate-300 hover:text-white hover:underline transition-colors block"
                >
                  Men&apos;s vests & undershirts
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=bed-sheets-bedding"
                  className="text-slate-300 hover:text-white hover:underline transition-colors block"
                >
                  Bed sheets & bedding sets
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=home-textiles"
                  className="text-slate-300 hover:text-white hover:underline transition-colors block"
                >
                  Home textile products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=custom-private-label"
                  className="text-slate-300 hover:text-white hover:underline transition-colors block"
                >
                  Custom manufacturing & OEM
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-amber-400 hover:text-amber-300 hover:underline transition-colors inline-flex items-center gap-1 font-semibold"
                >
                  <span>Explore full catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Business & Capabilities */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider text-amber-300">
              Business
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/manufacturing"
                  className="text-slate-300 hover:text-white hover:underline transition-colors block"
                >
                  Manufacturing capabilities
                </Link>
              </li>
              <li>
                <Link
                  href="/export"
                  className="text-slate-300 hover:text-white hover:underline transition-colors block"
                >
                  Industrial export & logistics
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-300 hover:text-white hover:underline transition-colors block"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/quality"
                  className="text-slate-300 hover:text-white hover:underline transition-colors block"
                >
                  Quality standards
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-300 hover:text-white hover:underline transition-colors block"
                >
                  Contact & inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Factory HQ */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider text-amber-300">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span className="leading-snug">
                  Office #786, Street #4, Imdad Town, Sheikhupura Road, Faisalabad, Pakistan
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:0418750391" className="hover:text-white hover:underline transition-colors">
                  041-8750391
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/923008663488"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-300 hover:text-emerald-200 hover:underline font-medium transition-colors"
                >
                  WhatsApp: +92 300 8663488
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:info@rajipk.com" className="hover:text-white hover:underline transition-colors">
                  info@rajipk.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Standardized Bottom Bar - Reduced horizontal gap */}
        <div className="mt-10 pt-6 border-t border-[#194072] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Rajia Enterprises. All rights reserved. VESTO® is a registered trademark.
          </p>
          <div className="flex items-center gap-4">
            <span>Faisalabad, Pakistan</span>
            <span className="text-slate-600">·</span>
            <span>Port of Karachi Sea Freight</span>
            <span className="text-slate-600">·</span>
            <Link
              href="/admin/login"
              className="text-slate-300 hover:text-amber-300 inline-flex items-center gap-1 font-medium hover:underline transition-colors"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Staff portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
