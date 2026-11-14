import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Factory, 
  Award, 
  Layers, 
  Globe2, 
  Calendar,
  Sparkles,
  ExternalLink,
  Package,
  Building2,
  Boxes
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import Button from "@/components/ui/Button";
import { getProductGallery } from "@/lib/product-images";

export const revalidate = 0; // Fresh database data

async function getHomePageData() {
  try {
    const products = await prisma.product.findMany({
      where: { status: "ACTIVE" },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        variants: true,
      },
      take: 6,
    });
    return { products };
  } catch (e) {
    return { products: [] };
  }
}

export default async function HomePage() {
  const { products } = await getHomePageData();

  return (
    <div className="flex flex-col w-full bg-[#EDF2F7]">
      {/* 1. PROFESSIONAL TEXTILE HERO SECTION */}
      <section className="relative bg-[#0C294F] text-white py-20 lg:py-28 overflow-hidden border-b-4 border-[#C59B27]">
        {/* Full-width realistic manufacturing background with navy overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero/textile-manufacturing-hero.jpg"
            alt="Rajia Enterprises textile manufacturing floor and cotton fabric rolls"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C294F]/95 via-[#0C294F]/85 to-[#0C294F]/75"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            {/* Subheading pill */}
            <div className="inline-flex items-center gap-2 bg-[#194072]/80 border border-amber-400/40 rounded-full px-4 py-1.5 text-xs text-amber-300 font-semibold tracking-wide shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Rajia Enterprises — House of VESTO®</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight">
              Direct Sourcing. Trusted Manufacturing. Global Supply.
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Premium men&apos;s apparel, cotton bed sheets and textile products manufactured for wholesale buyers and international markets. Sourced and produced in Faisalabad, Pakistan.
            </p>

            {/* Key Business Capabilities Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-[#0C294F]/80 backdrop-blur-sm border border-slate-600 rounded-lg p-3">
                <span className="text-xs text-slate-300 font-medium block">Garment & Textile Hub</span>
                <span className="text-base font-bold text-white">Faisalabad, Pakistan</span>
              </div>
              <div className="bg-[#0C294F]/80 backdrop-blur-sm border border-slate-600 rounded-lg p-3">
                <span className="text-xs text-slate-300 font-medium block">Core Product Lines</span>
                <span className="text-base font-bold text-white">Vests & Bed Sheets</span>
              </div>
              <div className="bg-[#0C294F]/80 backdrop-blur-sm border border-slate-600 rounded-lg p-3 col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-300 font-medium block">Export Supply</span>
                <span className="text-base font-bold text-amber-300">FOB Karachi & CIF</span>
              </div>
            </div>

            {/* CTAs with exactly one dominant primary */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                href="/products"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Our Products
              </Button>

              <Button
                href="/manufacturing"
                variant="secondary"
                size="lg"
              >
                Discover Manufacturing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BALANCED TRUST STRIP - 4 INDICATORS */}
      <section className="bg-white border-b border-[#CBD5E0] py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EDF2F7] flex items-center justify-center text-[#0C294F] shrink-0 border border-[#CBD5E0]">
                <Factory className="w-5 h-5 text-[#194072]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0C294F]">Manufacturing Expertise</h3>
                <p className="text-xs text-slate-500">In-house knitting, cutting & stitching</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EDF2F7] flex items-center justify-center text-[#0C294F] shrink-0 border border-[#CBD5E0]">
                <ShieldCheck className="w-5 h-5 text-[#194072]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0C294F]">Quality Control</h3>
                <p className="text-xs text-slate-500">Stringent fabric & seam inspection</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EDF2F7] flex items-center justify-center text-[#0C294F] shrink-0 border border-[#CBD5E0]">
                <Boxes className="w-5 h-5 text-[#194072]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0C294F]">Wholesale Supply</h3>
                <p className="text-xs text-slate-500">Volume orders & custom private label</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EDF2F7] flex items-center justify-center text-[#0C294F] shrink-0 border border-[#CBD5E0]">
                <Truck className="w-5 h-5 text-[#194072]" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0C294F]">Global Import & Export</h3>
                <p className="text-xs text-slate-500">FCL & LCL shipments via Karachi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS CATEGORIES OVERVIEW */}
      <section className="py-16 bg-[#EDF2F7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#C59B27] uppercase tracking-wider block">
              Core Manufacturing Sectors
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C294F]">
              Comprehensive Textile Manufacturing & Export Solutions
            </h2>
            <p className="text-sm text-slate-600">
              From men&apos;s essential apparel under the VESTO® label to premium woven cotton bed sheet sets and custom OEM lines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category 1: Men's Vests */}
            <div className="bg-white rounded-xl border border-[#CBD5E0] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                <img
                  src="/images/branding/vesto-trio.webp"
                  alt="VESTO Men's Cotton Vests"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#0C294F] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  VESTO® Line
                </span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-[#0C294F]">
                    Men&apos;s Vests & Undershirts
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    100% combed cotton sleeveless vests in Jet Black, Heather Grey, and Optic White with 4-thread overlock seaming.
                  </p>
                </div>
                <Link
                  href="/products?category=mens-cotton-vest"
                  className="text-xs font-bold text-[#194072] hover:text-[#0C294F] flex items-center gap-1 hover:underline pt-2 border-t border-slate-100"
                >
                  <span>Explore vest collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Category 2: Bed Sheets & Bedding */}
            <div className="bg-white rounded-xl border border-[#CBD5E0] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                <img
                  src="/images/bedsheets/white-cotton/front.jpg"
                  alt="Cotton Bed Sheets Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#194072] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  Home Textiles
                </span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-[#0C294F]">
                    Bed Sheets & Bedding Sets
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Pure cotton percale, sateen, and institutional hotel bed sheet sets with fitted sheets and matching pillowcases.
                  </p>
                </div>
                <Link
                  href="/products?category=bed-sheets-bedding"
                  className="text-xs font-bold text-[#194072] hover:text-[#0C294F] flex items-center gap-1 hover:underline pt-2 border-t border-slate-100"
                >
                  <span>Explore bedding collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Category 3: Home Textiles */}
            <div className="bg-white rounded-xl border border-[#CBD5E0] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                <img
                  src="/images/bedsheets/royal-blue/front.jpg"
                  alt="Home Textile Products"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#2B6CB0] text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  Export Grade
                </span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-[#0C294F]">
                    Home Textile Products
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Durable institutional, hospitality, and retail home textile products manufactured from premium ring-spun cotton.
                  </p>
                </div>
                <Link
                  href="/products?category=home-textiles"
                  className="text-xs font-bold text-[#194072] hover:text-[#0C294F] flex items-center gap-1 hover:underline pt-2 border-t border-slate-100"
                >
                  <span>Explore home textiles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Category 4: Private Label Manufacturing */}
            <div className="bg-white rounded-xl border border-[#CBD5E0] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                <img
                  src="/images/manufacturing/export-packing.jpg"
                  alt="Textile export cartons prepared for shipment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#C59B27] text-[#0C294F] text-[11px] font-bold px-2 py-0.5 rounded">
                  Custom OEM
                </span>
              </div>
              <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-[#0C294F]">
                    Private Label Manufacturing
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">
                    Complete OEM services including woven brand labels, custom packaging, hangtags, and buyer-specified yarn GSM.
                  </p>
                </div>
                <Link
                  href="/products?category=custom-private-label"
                  className="text-xs font-bold text-[#194072] hover:text-[#0C294F] flex items-center gap-1 hover:underline pt-2 border-t border-slate-100"
                >
                  <span>Inquire private label</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SHOWCASE */}
      <section className="py-16 bg-white border-t border-[#CBD5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#C59B27] uppercase tracking-wider block">
                Wholesale Product Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C294F]">
                Featured Garments & Textile Products
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                Manufactured from verified raw materials. Request pro-forma pricing and minimum order quantities directly.
              </p>
            </div>
            <Link
              href="/products"
              className="text-sm font-bold text-[#194072] hover:text-[#0C294F] inline-flex items-center gap-1.5 hover:underline"
            >
              <span>View full catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => {
              const primaryImage = getProductGallery(product.slug)[0];
              const isBedding = product.slug.includes("bed-sheet") || product.slug.includes("bedding");
              return (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-[#CBD5E0] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  <div className={`relative aspect-[4/3] overflow-hidden ${isBedding ? "bg-[#F3F4F6]" : "bg-gradient-to-br from-white via-[#FAFBFC] to-[#EEF3F8]"}`}>
                    <img
                      src={primaryImage.url}
                      alt={primaryImage.alt}
                      className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${isBedding ? "object-cover" : "object-contain p-5 sm:p-7"}`}
                    />
                    <div className="absolute top-3 left-3 bg-[#0C294F] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                      {product.sku}
                    </div>
                    <div className="absolute top-3 right-3 bg-[#C59B27] text-[#0C294F] text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      {product.gsm} GSM
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-base text-[#0C294F] group-hover:text-[#194072] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs text-slate-600">
                        <div>
                          <span className="font-semibold text-slate-800">Fabric:</span> {product.fabric}
                        </div>
                        <div>
                          <span className="font-semibold text-slate-800">Stitch:</span> {product.stitching}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <Button
                        href={`/products/${product.slug}`}
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                      >
                        Inspect Gallery & Specs
                      </Button>
                      <Button
                        href={`/products/${product.slug}#inquiry`}
                        variant="primary"
                        size="sm"
                      >
                        Inquire
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. MANUFACTURING CAPABILITIES PREVIEW */}
      <section className="py-16 bg-[#EDF2F7] border-t border-[#CBD5E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#C59B27] uppercase tracking-wider block">
              Faisalabad Industrial Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C294F]">
              Manufacturing Quality from Fabric to Finish
            </h2>
            <p className="text-sm text-slate-600">
              We manage the entire production cycle from raw cotton procurement to precision cutting, stitching, and carton packing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-xl overflow-hidden border border-[#CBD5E0] shadow-sm">
              <img
                src="/images/manufacturing/cotton-fabric-rolls.jpg"
                alt="Cotton fabric production rolls at textile mill"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#0C294F]">
                Modern Garment & Bedding Assembly
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Operating in the industrial heart of Faisalabad gives Rajia Enterprises direct access to high-grade Pakistani upland cotton and modern textile infrastructure. Our plant operates continuous lines for men&apos;s cotton undershirts and woven bed sheet sets.
              </p>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Controlled yarn combing and single jersey / rib knit circular knitting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Precision multi-ply pattern cutting with tight dimensional tolerances</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Industrial 4-thread overlock workstations for reinforced seam elasticity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Individual garment inspection and marine-grade carton packaging</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  href="/manufacturing"
                  variant="secondary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  View Step-by-Step Production Process
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. GLOBAL SUPPLY & EXPORT PREVIEW */}
      <section className="py-16 bg-[#0C294F] text-white border-t border-[#194072]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#C59B27] uppercase tracking-wider block">
                International Trade & Supply Chain
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Connecting Textile Manufacturing with Global Markets
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                We supply wholesale buyers, retail distributors, and institutional importers across key global markets. Shipments are consolidated and dispatched through Karachi seaport under FOB Karachi and CIF terms.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 bg-[#194072]/60 rounded-lg border border-slate-700">
                  <span className="font-bold text-amber-300 block">Middle East</span>
                  <span className="text-slate-300">UAE, Saudi Arabia</span>
                </div>
                <div className="p-3 bg-[#194072]/60 rounded-lg border border-slate-700">
                  <span className="font-bold text-amber-300 block">Europe & UK</span>
                  <span className="text-slate-300">United Kingdom, EU</span>
                </div>
                <div className="p-3 bg-[#194072]/60 rounded-lg border border-slate-700 col-span-2 sm:col-span-1">
                  <span className="font-bold text-amber-300 block">Americas</span>
                  <span className="text-slate-300">USA, Canada</span>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  href="/export"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Discuss Export Partnership
                </Button>
              </div>
            </div>

            <div className="bg-[#194072]/50 border border-slate-700 rounded-2xl p-6 sm:p-8 space-y-4 text-xs text-slate-300">
              <h3 className="text-base font-bold text-white">
                Wholesale Inquiry & Sourcing Workflow
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Direct communication with our Faisalabad export desk ensures accurate pricing, sample dispatch, and container scheduling without intermediary markups.
              </p>

              <div className="space-y-2">
                <p>• Step 1: Select required specifications and quantities in the Inquiry Cart</p>
                <p>• Step 2: Receive official pro-forma cost sheet and container load estimates</p>
                <p>• Step 3: Approve counter sample and confirm contract</p>
                <p>• Step 4: Factory production, inspection, and dispatch via Port of Karachi</p>
              </div>

              <div className="pt-2 border-t border-slate-700 flex flex-wrap gap-3">
                <Button
                  href="/contact"
                  variant="primary"
                  size="sm"
                >
                  Contact Export Desk
                </Button>
                <Button
                  href="/meetings"
                  variant="secondary"
                  size="sm"
                >
                  Schedule Video Consultation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
