import React from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Gauge, 
  ArrowRight,
  FileCheck2,
  Sparkles
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function QualityPage() {
  const qualityPillars = [
    {
      title: "Yarn Quality & Combing",
      desc: "Raw cotton fibers are combed to remove short fibers under 12mm, ensuring high tensile strength, smooth surface texture, and reduced pilling during everyday wear.",
      specs: ["100% Combed Cotton", "Consistent Count Uniformity", "Zero Synthetic Adulteration"],
    },
    {
      title: "Dimensional Stability & Shrinkage",
      desc: "Fabrics undergo controlled compacting and heat setting. Test washes ensure residual shrinkage remains within standard commercial tolerances.",
      specs: ["Wash Shrinkage Control", "Spirality & Torque Checks", "Color Fastness to Washing"],
    },
    {
      title: "Overlock Seam & Assembly Integrity",
      desc: "All seams are assembled using high-speed 4-thread overlock safety machines, delivering elastic seam recovery that moves naturally with body contours.",
      specs: ["4-Thread Safety Overlock", "Reinforced Neckline Ribbing", "Even Stitch Density"],
    },
    {
      title: "Pre-Shipment Piece Inspection",
      desc: "Every finished batch is checked for skipped stitches, measurement compliance from Small to 3XL, and clean thread trimming before carton packing.",
      specs: ["Full Visual Table Audit", "Metal Detection Needle Scan", "Moisture Barrier Export Packing"],
    },
  ];

  return (
    <div className="w-full bg-[#EDF2F7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-[#0C294F]">Home</Link>
            <span>/</span>
            <span className="text-[#0C294F] font-bold">Quality Standards</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#C59B27] uppercase tracking-wider block">
                Textile Excellence & Verification
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0C294F] tracking-tight">
                Quality Assurance & Manufacturing Standards
              </h1>
              <p className="text-base text-slate-600 max-w-2xl mt-1">
                At Rajia Enterprises, quality control begins at the cotton yarn stage and continues through knitting, precision cutting, 4-thread assembly, and export packaging.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#CBD5E0] shadow-sm shrink-0 text-xs space-y-1">
              <span className="text-[#0C294F] font-bold block text-sm">Quality Commitment</span>
              <span className="text-slate-600 block">Strict consistency across bulk production</span>
              <span className="text-amber-700 font-semibold block text-[11px]">Faisalabad Plant Testing</span>
            </div>
          </div>
        </div>

        {/* 4 Quality Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {qualityPillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#CBD5E0] p-6 space-y-4 shadow-sm hover:border-[#194072] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0C294F] text-[#C59B27] flex items-center justify-center font-bold">
                  0{idx + 1}
                </div>
                <h2 className="text-lg font-bold text-[#0C294F]">
                  {p.title}
                </h2>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {p.desc}
              </p>

              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                {p.specs.map((sp, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{sp}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Inspection SOP Section */}
        <div className="bg-white rounded-2xl border border-[#CBD5E0] p-8 space-y-6 shadow-sm">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xl font-bold text-[#0C294F]">
              Standard Operating Inspection Stages
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              Multi-gate quality checkpoints throughout the manufacturing lifecycle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Stage 1: Inward Raw Material
              </span>
              <h4 className="font-bold text-slate-800">Yarn & Fabric Inspection</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verification of yarn count, weight in GSM, and knitting loop structure before fabric rolls are released to the cutting department.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Stage 2: In-Line Assembly
              </span>
              <h4 className="font-bold text-slate-800">Sewing Line Quality Patrols</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supervisors continuously monitor stitch tension, needle sharpness, and seam elasticity on active overlock lines to prevent defect accumulation.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Stage 3: End-Line Audit
              </span>
              <h4 className="font-bold text-slate-800">Pre-Packing Final Review</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% visual table check for thread ends, measurement tolerances, and garment symmetry prior to box insertion and carton strapping.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="bg-[#0C294F] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-[#194072] shadow-md">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Request Fabric Swatches or Counter Samples
            </h3>
            <p className="text-sm text-slate-300 max-w-xl">
              Qualified wholesale buyers can request physical fabric swatch books and production counter samples to evaluate our hand-feel and stitching quality firsthand.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Request Sample Swatches
            </Button>
            <Button
              href="/products"
              variant="secondary"
              size="md"
            >
              Browse Catalog
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
