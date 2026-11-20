import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowRight, CheckCircle2, ShieldCheck, Factory, Layers, Boxes } from "lucide-react";
import Button from "@/components/ui/Button";
import { getProductGallery } from "@/lib/product-images";

export const revalidate = 0;

async function getProducts() {
  try {
    return await prisma.product.findMany({
      where: { status: "ACTIVE" },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        variants: true,
      },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Products fetch error:", error);
    return [];
  }
}

export default async function ProductsCatalogPage({
  searchParams,
}: {
  searchParams?: { category?: string };
}) {
  const allProducts = await getProducts();
  const selectedCategory = searchParams?.category;

  const filteredProducts = selectedCategory
    ? allProducts.filter((p) => p.category?.slug === selectedCategory)
    : allProducts;

  const categories = [
    { name: "All Products", slug: "" },
    { name: "Men's Vests — VESTO®", slug: "mens-cotton-vest" },
    { name: "Bed Sheets & Bedding", slug: "bed-sheets-bedding" },
    { name: "Home Textiles", slug: "home-textiles" },
    { name: "Custom Manufacturing", slug: "custom-private-label" },
  ];

  return (
    <div className="w-full bg-[#EDF2F7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Breadcrumb & Title */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#718096]">
            <Link href="/" className="hover:text-[#0C294F] hover:underline">Home</Link>
            <span>/</span>
            <span className="text-[#0C294F] font-semibold">Wholesale product catalog</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0C294F] tracking-tight">
                Textile Products & Wholesale Catalog
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-1 leading-relaxed">
                Explore our full line of 100% combed cotton sleeveless vests, luxury bed sheet sets, and custom private label textile products. Direct manufacturer wholesale pricing from our Faisalabad production plant.
              </p>
            </div>

            <div className="bg-white text-[#0C294F] text-xs px-4 py-2.5 rounded-xl border border-[#CBD5E0] shadow-sm font-semibold flex items-center gap-2 self-start md:self-auto shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct factory wholesale supply</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-b border-[#CBD5E0] pb-4">
          {categories.map((cat) => {
            const active = (!selectedCategory && cat.slug === "") || selectedCategory === cat.slug;
            return (
              <Link
                key={cat.slug}
                href={cat.slug ? `/products?category=${cat.slug}` : "/products"}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-150 ${
                  active
                    ? "bg-[#0C294F] text-white shadow"
                    : "bg-white border border-[#CBD5E0] text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const isBedding = product.category?.slug === "bed-sheets-bedding";
            const productGallery = getProductGallery(product.slug, product.category?.slug);
            const primaryImage = productGallery[0];

            return (
              <div
                key={product.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Product Image */}
                <div className={`relative aspect-[4/3] overflow-hidden ${isBedding ? "bg-[#F3F4F6]" : "bg-gradient-to-br from-white via-[#FAFBFC] to-[#EEF3F8]"}`}>
                  <img
                    src={primaryImage.url}
                    alt={primaryImage.alt}
                    className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${isBedding ? "object-cover" : "object-contain p-5 sm:p-7"}`}
                  />
                  <div className="absolute left-4 top-4 rounded-full border border-white/80 bg-white/90 px-3 py-1 text-[10px] font-bold tracking-wide text-[#243B53] shadow-sm backdrop-blur">
                    {product.sku}
                  </div>
                  <div className="absolute bottom-4 right-4 rounded-full bg-[#194072] px-3 py-1.5 text-[10px] font-semibold text-white shadow-sm">
                    {isBedding ? product.gsm : "VESTO®"}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-grow flex-col justify-between space-y-4 p-5 sm:p-6">
                  <div className="space-y-2">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#526174]">
                      {product.category?.name || "Textile Product"}
                    </span>
                    <h2 className="text-lg font-bold leading-snug text-[#243B53] transition-colors group-hover:text-[#194072]">
                      {product.name}
                    </h2>
                    <p className="line-clamp-2 text-xs leading-relaxed text-[#526174]">
                      {product.description}
                    </p>

                    {/* Specs List */}
                    <div className="space-y-1.5 border-t border-[#E2E8F0] pt-3 text-xs text-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-[#718096]">Fabric:</span>
                        <span className="font-semibold text-slate-900">{product.fabric}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#718096]">Density / Weave:</span>
                        <span className="font-semibold text-slate-900">{product.gsm}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#718096]">Sizes:</span>
                        <span className="font-semibold text-slate-900">
                          {product.variants.map((v) => v.size).join(", ") || "Standard"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#718096]">Finish / Seam:</span>
                        <span className="font-semibold text-slate-900">{product.stitching}</span>
                      </div>
                    </div>
                  </div>

                  {/* Standardized Action Buttons */}
                  <div className="flex items-center gap-2 border-t border-[#E2E8F0] pt-3">
                    <Button
                      href={`/products/${product.slug}`}
                      variant="secondary"
                      size="sm"
                      className="flex-1"
                    >
                      View Specs & Gallery
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

        {/* Custom Sourcing Banner */}
        <div className="bg-[#0C294F] text-white rounded-2xl p-8 sm:p-10 border border-[#194072] shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="lg:col-span-2 space-y-2">
              <span className="text-xs font-bold text-[#C59B27] uppercase tracking-wider block">
                Private label & custom specifications
              </span>
              <h3 className="text-2xl font-bold text-white">
                Require custom dimensions, thread counts, or brand labels?
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                As a direct textile manufacturer, Rajia Enterprises provides full OEM private labeling. We customize fabric knits (140 to 220 GSM), bed sheet thread counts (200 to 400 TC), custom dye pantone shades, stitch woven brand labels, and produce printed retail presentation packaging.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Button
                href="/cart"
                variant="primary"
                size="md"
              >
                Build wholesale request
              </Button>
              <Button
                href="/meetings"
                variant="secondary"
                size="md"
              >
                Schedule factory call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
