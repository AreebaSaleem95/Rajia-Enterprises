import React from "react";
import Link from "next/link";
import { 
  Building2, 
  Award, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  Mail, 
  ArrowRight,
  CheckCircle2,
  Factory
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="w-full bg-[#EDF2F7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb & Main Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#718096]">
            <Link href="/" className="hover:text-[#0C294F] hover:underline">Home</Link>
            <span>/</span>
            <span className="text-[#0C294F] font-semibold">About Rajia Enterprises</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#C59B27] uppercase tracking-wider block">
                Textile manufacturing & export
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0C294F] tracking-tight">
                About Rajia Enterprises & VESTO®
              </h1>
              <p className="text-base sm:text-lg text-slate-700 max-w-2xl mt-2 leading-relaxed">
                Headquartered in Faisalabad—the premier textile epicenter of South Asia—Rajia Enterprises is a vertically integrated knitwear and home textile manufacturing company delivering premium cotton garments and bedding sets.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#CBD5E0] shadow-sm shrink-0 text-xs space-y-1">
              <span className="text-[#0C294F] font-bold block text-sm">Industrial location</span>
              <span className="text-base font-bold text-slate-800 block">Faisalabad, Punjab, Pakistan</span>
              <span className="text-[#718096] block text-xs">Direct access to Pakistan cotton ginning & spinning mills</span>
            </div>
          </div>
        </div>

        {/* Corporate Story & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            {/* Secondary heading subordinated to H1 */}
            <h2 className="text-xl sm:text-2xl font-bold text-[#0C294F] leading-snug">
              Direct sourcing, authentic craftsmanship, and dependable supply
            </h2>

            <p className="text-base text-slate-700 leading-relaxed">
              Founded with the vision to deliver dependable cotton essential apparel and home textiles, Rajia Enterprises has grown into a verified manufacturing house producing both men&apos;s knitwear under the <strong>VESTO®</strong> label and woven bed sheet collections for international wholesale.
            </p>

            <p className="text-base text-slate-700 leading-relaxed">
              Our operations oversee raw cotton selection, yarn ring-spinning coordination, soft-flow dyeing, laser-graded pattern cutting, high-speed assembly, and international container packaging directly from our production base in Faisalabad.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-[#CBD5E0] shadow-sm">
                <span className="text-2xl font-extrabold text-[#0C294F] block">Faisalabad</span>
                <span className="text-xs text-[#718096] font-medium">Textile industrial capital of Pakistan</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-[#CBD5E0] shadow-sm">
                <span className="text-2xl font-extrabold text-[#0C294F] block">FOB & CIF</span>
                <span className="text-xs text-[#718096] font-medium">Containerized sea freight logistics via Karachi</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-xl overflow-hidden border border-[#CBD5E0] shadow-sm">
              <img
                src="/images/manufacturing/cotton-fabric-rolls.jpg"
                alt="Rajia Enterprises textile fabric rolls and manufacturing facility"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Pillars - Standardized equal heights and padding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[#CBD5E0] p-6 space-y-3 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0C294F] text-[#C59B27] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0C294F]">Ethical workplace standards</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Fair industrial wages, ventilated and illuminated production halls, and safe operational conditions compliant with national labor laws.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#CBD5E0] p-6 space-y-3 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0C294F] text-[#C59B27] flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0C294F]">In-house quality inspection</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Multi-stage quality audits spanning yarn intake, in-line sewing patrols, measurement compliance across all sizes, and pre-shipment checks.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#CBD5E0] p-6 space-y-3 shadow-sm flex flex-col justify-between min-h-[220px]">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#0C294F] text-[#C59B27] flex items-center justify-center font-bold">
                <Factory className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-[#0C294F]">Faisalabad supply advantage</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Direct physical proximity to local spinning mills, dye houses, and dry port logistics, reducing lead times and transportation costs.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Address & Action Card */}
        <div className="bg-[#0C294F] text-white rounded-2xl p-8 sm:p-10 border border-[#194072] shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#C59B27] uppercase tracking-wider block">
                Official factory headquarters
              </span>
              <h3 className="text-2xl font-bold text-white">
                Visit our manufacturing facility
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We invite domestic and international buyers, sourcing agencies, and retail merchandisers to visit our offices in Faisalabad to review sample collections and inspect ongoing production.
              </p>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                  <span>Office #786, Street #4, Imdad Town, Sheikhupura Road, Faisalabad, Pakistan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>041-8750391 | WhatsApp: +92 300 8663488</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>info@rajipk.com</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:items-end">
              <Button
                href="/meetings"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Schedule factory meeting
              </Button>
              <Button
                href="/products"
                variant="secondary"
                size="md"
              >
                Inspect product catalog
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
