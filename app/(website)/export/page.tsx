import React from "react";
import Link from "next/link";
import { 
  Globe2, 
  Truck, 
  Anchor, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Boxes,
  MapPin,
  CalendarCheck
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function ExportPage() {
  const containerSpecs = [
    {
      type: "20 FT Standard Container (FCL)",
      cbm: "Approx 28–30 CBM",
      cartons: "Approx 480–500 Master Cartons",
      pieces: "34,000 to 36,000 Pieces",
      leadTime: "18 to 25 Days Production",
      idealFor: "Regional Wholesalers & Specialty Distributors",
    },
    {
      type: "40 FT Standard Container (FCL)",
      cbm: "Approx 58–60 CBM",
      cartons: "Approx 950–1,000 Master Cartons",
      pieces: "68,000 to 72,000 Pieces",
      leadTime: "25 to 30 Days Production",
      idealFor: "National Retail Chains & Department Stores",
    },
    {
      type: "40 FT High Cube (HC) Container",
      cbm: "Approx 68–72 CBM",
      cartons: "Approx 1,150–1,200 Master Cartons",
      pieces: "80,000 to 86,000 Pieces",
      leadTime: "30 to 35 Days Production",
      idealFor: "Large-Scale Importers & High-Volume Bedding Orders",
    },
    {
      type: "LCL (Less than Container Load)",
      cbm: "1 to 15 CBM",
      cartons: "20 to 200 Cartons",
      pieces: "1,500 to 14,000 Pieces",
      leadTime: "12 to 18 Days Production",
      idealFor: "Trial Orders, Sampling, & Boutique Brands",
    },
  ];

  const exportDocs = [
    { name: "Commercial Invoice", desc: "Itemized SKU breakdown, HS codes (6109.10 for vests, 6302.21 for bedding), and Incoterms pricing." },
    { name: "Detailed Packing List", desc: "Carton gross/net weights, dimensions, and piece count per box." },
    { name: "Clean On-Board Ocean Bill of Lading (B/L)", desc: "Issued by leading global carriers (Maersk, MSC, CMA CGM, Hapag-Lloyd)." },
    { name: "Certificate of Origin (COO)", desc: "Issued by Faisalabad Chamber of Commerce & Industry (FCCI)." },
    { name: "Form E (State Bank of Pakistan)", desc: "Official foreign exchange export registration document." },
    { name: "Factory Inspection & AQL Certificate", desc: "Internal or third-party (SGS, Intertek) pre-shipment quality audit sign-off." },
  ];

  const tradeLanes = [
    { region: "North America (USA & Canada)", port: "New York, Savannah, Long Beach", days: "28 – 35 Days", icon: "🇺🇸" },
    { region: "United Kingdom", port: "Felixstowe, Southampton, London Gateway", days: "22 – 28 Days", icon: "🇬🇧" },
    { region: "European Union", port: "Rotterdam, Hamburg, Antwerp, Valencia", days: "20 – 26 Days", icon: "🇪🇺" },
    { region: "Middle East & GCC", port: "Jebel Ali (UAE), Jeddah, Dammam (KSA)", days: "5 – 8 Days", icon: "🇦🇪" },
    { region: "Australia & New Zealand", port: "Melbourne, Sydney, Auckland", days: "24 – 30 Days", icon: "🇦🇺" },
    { region: "Rest of the World", port: "Major Global Container Terminals", days: "Subject to Routing", icon: "🌐" },
  ];

  return (
    <div className="w-full bg-[#EDF2F7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#718096] font-medium">
          <Link href="/" className="hover:text-[#0C294F] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#0C294F] font-bold">Industrial Export Logistics</span>
        </div>

        {/* Hero Section */}
        <div className="bg-[#0C294F] rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden border border-[#194072] shadow-sm">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase inline-flex items-center gap-2">
              <Anchor className="w-4 h-4" />
              Global Shipping Desk · FOB Karachi & CIF Logistics
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Connecting Textile Manufacturing with Global Markets
            </h1>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Rajia Enterprises manages the complete supply chain from our Faisalabad production plant to the customer&apos;s destination port. With sea freight clearance via Karachi Port (KPT) and Port Qasim (QICT), we serve distributors across North America, Europe, the Middle East, and beyond.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Discuss Export Partnership
              </Button>
              <Button
                href="/products"
                variant="secondary"
                size="md"
              >
                Explore Export Products
              </Button>
            </div>
          </div>
        </div>

        {/* Real Logistics Visuals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#CBD5E0] overflow-hidden shadow-sm">
            <div className="aspect-[16/9] bg-slate-900 relative">
              <img
                src="/images/export/container-terminal.jpg"
                alt="Karachi ocean container terminal and export vessel loading"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#0C294F]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded">
                Ocean Terminal Logistics · Port of Karachi
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-base text-[#0C294F]">
                Port Clearance & Ocean Freight Consolidation
              </h3>
              <p className="text-xs text-[#718096] leading-relaxed">
                Direct container dispatch from Faisalabad Dry Port via bonded railway and road transport directly to Port of Karachi (KPT) and Port Qasim (QICT) for global vessel departures.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#CBD5E0] overflow-hidden shadow-sm">
            <div className="aspect-[16/9] bg-slate-900 relative">
              <img
                src="/images/export/warehouse-pallets.jpg"
                alt="Modern textile export warehouse racks with strapped cartons and pallets"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-[#0C294F]/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded">
                Warehouse Staging & Export Palletization
              </div>
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-base text-[#0C294F]">
                Palletized Staging & Fumigation Standards
              </h3>
              <p className="text-xs text-[#718096] leading-relaxed">
                Finished master cartons are shrink-wrapped, barcoded, strapped on ISPM-15 heat-treated export pallets, and loaded into containers under strict moisture control conditions.
              </p>
            </div>
          </div>
        </div>

        {/* Global Trade Lanes */}
        <div className="bg-white rounded-2xl border border-[#CBD5E0] p-8 space-y-6 shadow-sm">
          <div className="border-b border-[#CBD5E0] pb-4">
            <h2 className="text-2xl font-bold text-[#0C294F]">
              Primary Export Destinations & Transit Times
            </h2>
            <p className="text-sm text-[#718096] mt-1">
              Estimated transit times from Port of Karachi to key global hubs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradeLanes.map((lane, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{lane.icon}</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    {lane.days}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-[#0C294F]">{lane.region}</h4>
                <p className="text-xs text-[#718096]">{lane.port}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Container Sizing Breakdown */}
        <div className="bg-white rounded-2xl border border-[#CBD5E0] p-8 space-y-6 shadow-sm">
          <div className="border-b border-[#CBD5E0] pb-4">
            <h2 className="text-2xl font-bold text-[#0C294F]">
              Container Loading Specifications & Volume Capacities
            </h2>
            <p className="text-sm text-[#718096] mt-1">
              Calculated volume capacities for apparel master cartons and bedding cartons
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {containerSpecs.map((c, i) => (
              <div key={i} className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-600 block uppercase">FCL & LCL Options</span>
                  <h4 className="font-bold text-sm text-[#0C294F]">{c.type}</h4>
                  <div className="space-y-1 text-xs text-[#718096]">
                    <div><span className="font-semibold text-slate-700">Volume:</span> {c.cbm}</div>
                    <div><span className="font-semibold text-slate-700">Cartons:</span> {c.cartons}</div>
                    <div><span className="font-semibold text-slate-700">Capacity:</span> {c.pieces}</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-700 block">Lead Time:</span> {c.leadTime}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Documentation */}
        <div className="bg-white rounded-2xl border border-[#CBD5E0] p-8 space-y-6 shadow-sm">
          <div className="border-b border-[#CBD5E0] pb-4">
            <h2 className="text-2xl font-bold text-[#0C294F]">
              Standard Export Documentation Package
            </h2>
            <p className="text-sm text-[#718096] mt-1">
              Complete regulatory and customs documentation issued with every international shipment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exportDocs.map((doc, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-200">
                <FileText className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#0C294F]">{doc.name}</h4>
                  <p className="text-[11px] text-[#718096] leading-relaxed">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#0C294F] text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">
              Ready to Calculate Freight Rates to Your Destination Port?
            </h3>
            <p className="text-sm text-slate-300">
              Submit your required quantities and preferred destination port for an immediate FOB or CIF estimate.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Request Freight & Quotation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}