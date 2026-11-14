import React from "react";
import Link from "next/link";
import { 
  Factory, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Scissors, 
  Cpu, 
  Gauge, 
  ArrowRight,
  Boxes,
  Sparkles,
  ClipboardCheck,
  Package
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function ManufacturingPage() {
  const steps = [
    {
      step: "01",
      title: "Yarn & Raw Cotton Selection",
      desc: "We source 100% combed cotton fibers and long-staple ring-spun yarn (30s/1, 32s/1, and fine warp yarns for bedding). All fiber lots undergo tensile testing and fiber length verification.",
      specs: ["100% Long-Staple Cotton", "Zero Neps & Low Hairiness", "Strict Tensile Strength Tests"],
    },
    {
      step: "02",
      title: "Knitting & Weaving Control",
      desc: "For apparel, high-speed computerized circular knitting yields 160–180 GSM jersey. For bedding, high-density air-jet looms produce 200–400 thread count percale and sateen weaves with uniform loop structure.",
      specs: ["High-Precision Weft Insertion", "Uniform GSM & Thread Density", "Defect-Free Fabric Greige"],
    },
    {
      step: "03",
      title: "Eco-Friendly Dyeing & Finishing",
      desc: "Low-liquor ratio reactive dyeing using OEKO-TEX Standard 100 certified non-toxic dyestuffs. Followed by bio-polishing for vests or mercerization for luxury sateen bedding to ensure silky handfeel.",
      specs: ["Grade 4.0+ Color Fastness", "OEKO-TEX Certified Chemistries", "Silky Mercerized & Bio-Polished"],
    },
    {
      step: "04",
      title: "Compacting & Dimensional Stability",
      desc: "Tubular and open-width compactors stabilize fabric shrinkage to strictly under 3.5% through multiple industrial wash cycles. Eliminates post-purchase warping and torque.",
      specs: ["< 3.5% Residual Shrinkage", "Zero Torquing / Spirality", "Calibrated Width & Weight"],
    },
    {
      step: "05",
      title: "Automated Spreading & Precision Cutting",
      desc: "Automated CNC spreading and precision vertical cutting tables with digital Gerber pattern grading. Ensures exact dimensional accuracy from S to 3XL for vests and Twin to King for bedding.",
      specs: ["Laser & CNC Precision", "Zero Ply Shifting", "Perfect Edge Tolerances ±1mm"],
    },
    {
      step: "06",
      title: "Industrial Stitching & Seaming",
      desc: "Assembly by experienced tailors using Japanese Juki & Brother sewing units. 4-thread overlock safety stitching (12–14 SPI) for garments and 5-thread safety flatlocking with reinforced hems for bed sheets.",
      specs: ["4-Thread Overlock (Garments)", "5-Thread Safety Hem (Bedding)", "Tear-Resistant Seam Integrity"],
    },
    {
      step: "07",
      title: "100% Inspection & AQL 2.5 Audit",
      desc: "Every single piece is inspected on illuminated light tables for seam strength, loose threads, skipped stitches, and shade conformity. Continuous needle detection sweeps guarantee zero metal hazards.",
      specs: ["100% Visual Table Inspection", "AQL 2.5 Standard Verification", "Multi-Point Needle Detection"],
    },
    {
      step: "08",
      title: "Export Consolidation & Master Packing",
      desc: "Neatly folded with desiccant protection. Packaged in customized retail boxes, banded sets, or bulk polybags, then packed into heavy-duty 5-ply corrugated export cartons strapped for ocean transit.",
      specs: ["Custom Barcoding & Packaging", "5-Ply Heavy Export Cartons", "Full Ocean Palletization"],
    },
  ];

  return (
    <div className="w-full bg-[#EDF2F7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#718096] font-medium">
          <Link href="/" className="hover:text-[#0C294F] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#0C294F] font-bold">Manufacturing Operations</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#0C294F] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden border border-[#194072] shadow-sm">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase inline-flex items-center gap-2">
              <Factory className="w-4 h-4" />
              Direct Mill Operations · Faisalabad, Pakistan
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Manufacturing Quality from Fabric to Finish
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Rajia Enterprises combines authentic textile mill capabilities with rigorous international quality standards. From precision fabric cutting to high-speed industrial stitching and export packaging, our Faisalabad facility produces over 200,000 units monthly for global distributors.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button
                href="/products"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View Product Catalog
              </Button>
              <Button
                href="/contact"
                variant="secondary"
                size="md"
              >
                Request Mill Audit / Visit
              </Button>
            </div>
          </div>
        </div>

        {/* Facility Photographic Showcase */}
        <div className="space-y-6">
          <div className="border-b border-[#CBD5E0] pb-4">
            <h2 className="text-2xl font-bold text-[#0C294F]">
              Factory Floor & Equipment in Action
            </h2>
            <p className="text-sm text-[#718096] mt-1">
              Verified production units in our Faisalabad industrial compound
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Cutting tables */}
            <div className="bg-white rounded-xl border border-[#CBD5E0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-slate-900 relative overflow-hidden">
                <img
                  src="/images/manufacturing/cutting-tables.jpg"
                  alt="Automated CNC fabric cutting tables at Rajia Enterprises"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#0C294F]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded">
                  Spreading & Cutting Hall
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-[#0C294F]">
                  Precision Cutting & Spreading
                </h3>
                <p className="text-xs text-[#718096] leading-relaxed">
                  Automated lay tables and laser-guided pattern cutting guarantee zero ply shifting and millimeter-accurate garment tolerances across all production batches.
                </p>
              </div>
            </div>

            {/* Card 2: Industrial Stitching */}
            <div className="bg-white rounded-xl border border-[#CBD5E0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-slate-900 relative overflow-hidden">
                <img
                  src="/images/manufacturing/industrial-stitching.jpg"
                  alt="Industrial overlock stitching assembly line at Rajia Enterprises"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#0C294F]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded">
                  Industrial Stitching Lines
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-[#0C294F]">
                  High-Speed Stitching Lines
                </h3>
                <p className="text-xs text-[#718096] leading-relaxed">
                  Equipped with 4-thread overlock and 5-thread safety seaming machines ensuring durable tensile seams that endure commercial laundering cycles.
                </p>
              </div>
            </div>

            {/* Card 3: Quality Inspection */}
            <div className="bg-white rounded-xl border border-[#CBD5E0] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] bg-slate-900 relative overflow-hidden">
                <img
                  src="/images/manufacturing/quality-inspection.jpg"
                  alt="Textile quality inspection table and lighted measurement station"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#0C294F]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded">
                  Illuminated QC Table
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-bold text-base text-[#0C294F]">
                  Piece-by-Piece Quality Inspection
                </h3>
                <p className="text-xs text-[#718096] leading-relaxed">
                  Every garment and sheet is checked over daylight-calibrated inspection tables for thread trim, stitch uniformity, dimensional sizing, and fabric purity.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 8-Stage Process */}
        <div className="space-y-6">
          <div className="border-b border-[#CBD5E0] pb-4">
            <h2 className="text-2xl font-bold text-[#0C294F]">
              The 8-Stage Manufacturing & Quality Assurance Process
            </h2>
            <p className="text-sm text-[#718096] mt-1">
              Engineered workflows designed to prevent defects and deliver uniform export specifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-xl border border-[#CBD5E0] p-6 flex flex-col justify-between space-y-4 hover:border-amber-500 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-amber-500">
                      {s.step}
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  </div>
                  <h3 className="font-bold text-base text-[#0C294F]">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#718096] leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Verified Specifications:
                  </span>
                  {s.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Production Lines: Apparel & Bedding */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Apparel Line */}
          <div className="bg-white rounded-2xl border border-[#CBD5E0] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0C294F] text-white flex items-center justify-center font-bold">
                01
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0C294F]">
                  Men&apos;s Apparel & Undershirt Line (VESTO®)
                </h3>
                <p className="text-xs text-[#718096]">Single jersey knitwear & athletic sleeveless cut</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Specialized high-speed circular knit production running 160–180 GSM single jersey cotton. Featuring 1x1 rib knit binding at necklines and armholes with 4-thread overlock safety seams. Offered in 6 standard export sizes (S through 3XL) and custom corporate packaging.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[#718096] block">Monthly Run</span>
                <span className="font-bold text-[#0C294F]">200,000 Pcs</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[#718096] block">Yarn Type</span>
                <span className="font-bold text-[#0C294F]">100% Combed Cotton</span>
              </div>
            </div>
          </div>

          {/* Bedding Line */}
          <div className="bg-white rounded-2xl border border-[#CBD5E0] p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#194072] text-white flex items-center justify-center font-bold">
                02
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#0C294F]">
                  Bed Sheets & Home Textiles Line
                </h3>
                <p className="text-xs text-[#718096]">Percale & sateen sheet sets for retail & hospitality</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Wide-width weaving and automated hem-stitching for luxury sheet sets, pillow shams, and duvet covers. 200 to 400 thread counts in crisp percale and lustrous sateen finishes. Tailored to international bedding sizing (Twin, Full, Queen, King, and California King).
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[#718096] block">Thread Count</span>
                <span className="font-bold text-[#0C294F]">200 – 400 TC</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[#718096] block">Export Standards</span>
                <span className="font-bold text-[#0C294F]">US & EU Specifications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Strip */}
        <div className="bg-white rounded-2xl border border-[#CBD5E0] p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-xl font-bold text-[#0C294F]">
              Ready to Order Custom Bulk Production?
            </h3>
            <p className="text-sm text-[#718096] mt-1">
              Speak directly with our technical merchandising team in Faisalabad.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Contact Manufacturing Desk
            </Button>
            <Button
              href="/export"
              variant="secondary"
              size="md"
            >
              Shipping & Container Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}