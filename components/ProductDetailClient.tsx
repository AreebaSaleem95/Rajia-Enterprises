"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  ShoppingCart, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  Truck, 
  ArrowRight, 
  PhoneCall, 
  Sparkles,
  Info,
  PackageCheck
} from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  viewType: string;
}

interface ProductVariant {
  id: string;
  sku: string;
  size: string;
}

interface ProductDetailClientProps {
  product: {
    id: string;
    name: string;
    slug: string;
    categorySlug?: string | null;
    sku: string;
    color: string;
    description: string;
    fabric: string;
    gsm: string;
    stitching: string;
    packing: string;
    images: ProductImage[];
    variants: ProductVariant[];
  };
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Compute available sizes dynamically from product variants
  const availableSizes = useMemo(() => {
    if (product.variants && product.variants.length > 0) {
      const distinct = Array.from(new Set(product.variants.map((v) => v.size)));
      if (distinct.length > 0) return distinct;
    }
    return ["S", "M", "L", "XL", "2XL", "3XL"];
  }, [product.variants]);

  // Initial quantities per size
  const [sizeQuantities, setSizeQuantities] = useState<{ [key: string]: number }>(() => {
    const init: { [key: string]: number } = {};
    availableSizes.forEach((sz) => {
      init[sz] = 100;
    });
    return init;
  });

  const [packagingPreference, setPackagingPreference] = useState("3_PACK_BOX");
  const [customLogo, setCustomLogo] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const totalQuantity = Object.values(sizeQuantities).reduce((acc, curr) => acc + (Number(curr) || 0), 0);

  const handleSizeChange = (size: string, val: string) => {
    const num = Math.max(0, parseInt(val) || 0);
    setSizeQuantities((prev) => ({ ...prev, [size]: num }));
  };

  const handleAddToCart = () => {
    if (totalQuantity <= 0) {
      alert("Please enter a quantity greater than zero.");
      return;
    }

    const primaryImg = product.images[0]?.url || "/images/branding/vesto-trio.webp";

    addItem({
      productId: product.id,
      productName: product.name,
      sku: product.sku,
      color: product.color || "Standard",
      sizeBreakdown: sizeQuantities,
      totalQuantity,
      packagingPreference,
      customLogo,
      image: primaryImg,
    });

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 4000);
  };

  const currentImage = product.images[activeImageIndex] || product.images[0] || {
    id: `${product.slug}-fallback`,
    url: "/images/fabrics/cotton-weave-macro.jpg",
    alt: product.name,
    viewType: "Textile detail",
  };
  const isBedding = product.categorySlug === "bed-sheets-bedding";

  const sizeBreakdownText = availableSizes.map((sz) => `${sz}: ${sizeQuantities[sz] || 0}`).join(", ");
  const whatsappMessage = encodeURIComponent(
    `Hello Rajia Enterprises,\n\nI am inquiring about ${product.name} (${product.sku}).\nTotal Estimated Quantity: ${totalQuantity} pcs.\nBreakdown: ${sizeBreakdownText}.\nPlease provide FOB Karachi export quotation.`
  );

  return (
    <div className="space-y-10">
      {/* Toast Alert */}
      {addedToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0C294F] text-white px-5 py-4 rounded-xl shadow-2xl border border-amber-400 flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-amber-300">Added to Wholesale Inquiry Cart!</p>
            <p className="text-xs text-slate-200">
              {totalQuantity.toLocaleString()} pieces added. You can review your inquiry now.
            </p>
          </div>
          <Link
            href="/cart"
            className="ml-3 bg-[#C59B27] hover:bg-[#b0881e] text-slate-950 font-bold px-3 py-1.5 rounded text-xs transition-colors"
          >
            View Cart
          </Link>
        </div>
      )}

      {/* Main Top Grid: Gallery on Left, Specs & Order Matrix on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Commercial Photography Viewer */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#E2E8F0] shadow-sm ${isBedding ? "bg-[#F3F4F6]" : "bg-gradient-to-br from-white via-[#FAFBFC] to-[#EEF3F8]"}`}>
            <img
              src={currentImage.url}
              alt={currentImage.alt || product.name}
              className={`h-full w-full object-center ${isBedding ? "object-cover" : "object-contain p-5 sm:p-8"}`}
            />
            <div className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-xs font-semibold text-[#243B53] shadow-sm backdrop-blur">
              {currentImage.viewType || "Commercial Product View"}
            </div>
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={img.id || img.url || idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? "border-[#0C294F] ring-2 ring-[#0C294F]/20"
                      : "border-[#CBD5E0] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt || `Angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Manufacturing Guarantee Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong className="font-bold">Direct Mill Production Guarantee:</strong> All items are manufactured with tested color fastness, seam reinforcement, and wash shrinkage under 3.5%. Pre-production lab dips and physical samples shipped upon RFQ request.
            </div>
          </div>
        </div>

        {/* Right Column: Specs & B2B Order Matrix */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Direct Mill Supply
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-[#718096]">
                SKU: <strong className="text-slate-800">{product.sku}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0C294F]">
              {product.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#718096] leading-relaxed pt-1">
              {product.description}
            </p>
          </div>

          {/* Quick Specifications Table */}
          <div className="bg-white rounded-xl border border-[#CBD5E0] p-4 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#718096] font-medium">Composition:</span>
              <span className="font-bold text-[#0C294F]">{product.fabric}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#718096] font-medium">Fabric Weight / Density:</span>
              <span className="font-bold text-[#0C294F]">{product.gsm}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#718096] font-medium">Seam / Hem Construction:</span>
              <span className="font-bold text-[#0C294F]">{product.stitching}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-[#718096] font-medium">Export Terms:</span>
              <span className="font-bold text-[#0C294F]">FOB Karachi Port / CIF Worldwide</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#718096] font-medium">Minimum Wholesale Order:</span>
              <span className="font-bold text-amber-700">500 Pieces / Sets</span>
            </div>
          </div>

          {/* B2B Size Breakdown Matrix */}
          <div className="bg-white rounded-xl border-2 border-[#0C294F]/20 p-5 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-[#0C294F]">
                  Wholesale Quantity by Size Matrix
                </h3>
                <p className="text-xs text-[#718096]">
                  Specify units needed per size for pro-forma quotation
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#718096] block">Total Order</span>
                <span className="text-lg font-black text-[#0C294F]">
                  {totalQuantity.toLocaleString()} Units
                </span>
              </div>
            </div>

            {/* Matrix Inputs */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {availableSizes.map((sz) => (
                <div key={sz} className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 block text-center bg-slate-100 py-1 rounded">
                    {sz}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={sizeQuantities[sz] ?? 0}
                    onChange={(e) => handleSizeChange(sz, e.target.value)}
                    className="w-full text-center border border-[#CBD5E0] rounded p-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-[#0C294F] focus:ring-1 focus:ring-[#0C294F]"
                  />
                </div>
              ))}
            </div>

            {/* Packaging Preference */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 block">
                Packaging Preference:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "3_PACK_BOX", label: "Retail Presentation Box", desc: "Shelf Ready Box" },
                  { id: "SINGLE_POLYBAG", label: "Individual Polybag", desc: "Standard Export Pack" },
                  { id: "CUSTOM_OEM", label: "Custom OEM Artwork", desc: "Private Label Pack" },
                ].map((pack) => (
                  <button
                    key={pack.id}
                    type="button"
                    onClick={() => setPackagingPreference(pack.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      packagingPreference === pack.id
                        ? "border-[#0C294F] bg-[#0C294F]/5 text-[#0C294F] font-bold"
                        : "border-[#CBD5E0] text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-xs block font-bold">{pack.label}</span>
                    <span className="text-[10px] text-[#718096] block">{pack.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Private Label Checkbox */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="checkbox"
                id="customLogo"
                checked={customLogo}
                onChange={(e) => setCustomLogo(e.target.checked)}
                className="w-4 h-4 text-[#0C294F] rounded border-[#CBD5E0] focus:ring-[#0C294F]"
              />
              <label htmlFor="customLogo" className="text-xs text-slate-700 font-medium cursor-pointer">
                Include Custom Private Labeling (Woven labels, hangtags, custom master cartons)
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-[#C59B27] hover:bg-[#b0881e] text-slate-950 py-3.5 px-6 rounded-lg font-bold text-sm shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4 text-slate-950" />
                <span>Add {totalQuantity.toLocaleString()} Units to Inquiry Cart</span>
              </button>

              <a
                href={`https://wa.me/923008663488?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-5 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-all shrink-0"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}