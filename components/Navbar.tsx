"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const productLinks = [
  { label: "Men's Vests", href: "/products?category=mens-cotton-vest" },
  { label: "Bed Sheets", href: "/products?category=bed-sheets-bedding" },
  { label: "Home Textiles", href: "/products?category=home-textiles" },
  { label: "Custom Manufacturing", href: "/products?category=custom-private-label" },
];

const aboutLinks = [
  { label: "Company Overview", href: "/about" },
  { label: "Quality & Process", href: "/quality" },
  { label: "Factory Capabilities", href: "/manufacturing" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { itemCount } = useCart();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const linkClass = (href: string) =>
    `whitespace-nowrap px-2 py-2 text-[15px] font-medium transition-colors duration-150 hover:text-[#194072] ${
      isActive(href) ? "text-[#194072]" : "text-[#243B53]"
    }`;

  const renderDropdown = (
    label: string,
    href: string,
    links: { label: string; href: string }[]
  ) => (
    <div className="group relative">
      <button
        type="button"
        aria-expanded={openDropdown === label}
        onClick={() =>
          setOpenDropdown((current) => (current === label ? null : label))
        }
        className={`${linkClass(href)} flex items-center gap-1`}
      >
        {label}
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
      </button>
      <div
        className={`invisible absolute left-0 top-full z-50 min-w-56 translate-y-1 rounded-xl border border-[#E2E8F0] bg-white p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
          openDropdown === label ? "!visible !translate-y-0 !opacity-100" : ""
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpenDropdown(null)}
            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#526174] transition-colors hover:bg-slate-50 hover:text-[#194072]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <header className="sticky top-[10px] z-50 mx-[10px] mt-[10px] rounded-[15px] border border-[#E2E8F0] bg-white shadow-[0_8px_28px_rgba(36,59,83,0.08)]">
      <div className="mx-auto flex h-[80px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 xl:h-[108px] xl:px-8">
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Rajia Enterprises, home"
          className="flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3"
        >
          <Image
            src="/images/branding/logo.png"
            alt="VESTO"
            width={56}
            height={62}
            priority
            className="h-12 w-12 shrink-0 object-contain sm:h-[54px] sm:w-[54px]"
          />
          <span className="flex min-w-0 flex-col">
            <span className="whitespace-nowrap text-[14px] font-extrabold leading-tight tracking-[0.035em] text-[#243B53] sm:text-base">
              RAJIA ENTERPRISES
            </span>
            <span className="mt-1 whitespace-nowrap text-[10px] font-semibold tracking-[0.08em] text-[#194072] sm:text-[11px]">
              HOUSE OF VESTO<sup>®</sup>
            </span>
            <span className="mt-0.5 hidden text-[10px] leading-tight text-[#526174] sm:block">
              Textile Manufacturing &amp; Global Exports
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden flex-1 items-center justify-center gap-1 xl:flex 2xl:gap-2"
        >
          <Link href="/" className={linkClass("/")}>Home</Link>
          {renderDropdown("Our Products", "/products", productLinks)}
          <Link href="/manufacturing" className={linkClass("/manufacturing")}>
            Manufacturing
          </Link>
          <Link href="/export" className={linkClass("/export")}>
            Import &amp; Export
          </Link>
          {renderDropdown("About Us", "/about", aboutLinks)}
          <Link href="/contact" className={linkClass("/contact")}>
            Contact Us
          </Link>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/products"
            aria-label="Browse products"
            title="Browse products"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#243B53] transition-colors hover:bg-slate-50 hover:text-[#194072]"
          >
            <Search className="h-[21px] w-[21px]" strokeWidth={1.8} />
          </Link>
          <Link
            href="/cart"
            aria-label={`Inquiry cart${itemCount > 0 ? `, ${itemCount} selected products` : ""}`}
            title="Inquiry Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#243B53] transition-colors hover:bg-slate-50 hover:text-[#194072]"
          >
            <ShoppingBag className="h-[21px] w-[21px]" strokeWidth={1.8} />
            {itemCount > 0 && (
              <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#194072] px-1 text-[10px] font-bold leading-none text-white">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#243B53] transition-colors hover:bg-slate-50 xl:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Mobile navigation"
          className="absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-110px)] overflow-y-auto rounded-b-[15px] border border-t-0 border-[#E2E8F0] bg-white px-4 pb-5 pt-2 shadow-lg xl:hidden"
        >
          <Link href="/" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#243B53] hover:bg-slate-50">
            Home
          </Link>
          <div className="py-1">
            <p className="px-3 py-2 text-sm font-semibold text-[#243B53]">Our Products</p>
            {productLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block rounded-lg py-2 pl-6 pr-3 text-sm text-[#526174] hover:bg-slate-50 hover:text-[#194072]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="/manufacturing" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#243B53] hover:bg-slate-50">
            Manufacturing
          </Link>
          <Link href="/export" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#243B53] hover:bg-slate-50">
            Import &amp; Export
          </Link>
          <div className="py-1">
            <p className="px-3 py-2 text-sm font-semibold text-[#243B53]">About Us</p>
            {aboutLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block rounded-lg py-2 pl-6 pr-3 text-sm text-[#526174] hover:bg-slate-50 hover:text-[#194072]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link href="/contact" onClick={closeMenu} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-[#243B53] hover:bg-slate-50">
            Contact Us
          </Link>
          <Link
            href="/cart"
            onClick={closeMenu}
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-[#194072] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#243B53]"
          >
            <ShoppingBag className="h-4 w-4" />
            Inquiry Cart{itemCount > 0 ? ` (${itemCount})` : ""}
          </Link>
        </nav>
      )}
    </header>
  );
}
