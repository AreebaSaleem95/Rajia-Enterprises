import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "@/components/ProductDetailClient";
import { ShieldCheck, Truck, Factory, ArrowRight } from "lucide-react";
import { getProductGallery } from "@/lib/product-images";

export const revalidate = 0;

interface ProductDetailPageProps {
  params: { slug: string };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      variants: true,
      inventory: true,
    },
  });

  if (!product) {
    notFound();
  }

  // Related products
  const relatedProducts = await prisma.product.findMany({
    where: {
      status: "ACTIVE",
      id: { not: product.id },
    },
    take: 2,
    include: {
      category: true,
    },
  });

  const isBedding = product.category?.slug?.includes("bed") || product.category?.name?.toLowerCase().includes("bed");

  return (
    <div className="w-full bg-[#EDF2F7] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#718096] font-medium">
          <Link href="/" className="hover:text-[#0C294F] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#0C294F] transition-colors">Products Catalog</Link>
          <span>/</span>
          <span className="text-[#0C294F] font-bold">{product.name}</span>
        </div>

        {/* Client Interactive Product Viewer & Size Matrix */}
        <ProductDetailClient
          product={{
            ...product,
            categorySlug: product.category?.slug,
            images: getProductGallery(product.slug, product.category?.slug).map((image, index) => ({
              ...image,
              id: `${product.slug}-${index}`,
            })),
          }}
        />

        {/* Technical Engineering & Quality Specs Deep-Dive */}
        <section className="bg-white rounded-2xl border border-[#CBD5E0] p-8 space-y-6 shadow-sm">
          <div className="border-b border-[#CBD5E0] pb-4">
            <h2 className="text-xl font-bold text-[#0C294F]">
              Technical Manufacturing Engineering & Testing Parameters
            </h2>
            <p className="text-xs text-[#718096] mt-1">
              Rigorous laboratory specifications compliant with international textile export standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-3">
              <h4 className="font-bold text-[#0C294F] uppercase tracking-wider text-amber-700">
                1. Fiber & Fabric Construction
              </h4>
              <ul className="space-y-2 text-slate-600">
                {isBedding ? (
                  <>
                    <li>• 100% Combed Compact Long-Staple Cotton</li>
                    <li>• Weave type: Percale Crisp Weave or Lustrous Sateen</li>
                    <li>• High thread count density (200 – 400 TC)</li>
                    <li>• Breathable, thermal regulating, and gentle on sensitive skin</li>
                  </>
                ) : (
                  <>
                    <li>• 100% Combed Compact Ring-Spun Cotton</li>
                    <li>• Yarn count: 30/1 or 32/1 Combed (Zero short fibers)</li>
                    <li>• High capillary moisture absorbency for warm climates</li>
                    <li>• Ultra-soft bio-polished surface finish</li>
                  </>
                )}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-[#0C294F] uppercase tracking-wider text-amber-700">
                2. Sewing & Seam Integrity
              </h4>
              <ul className="space-y-2 text-slate-600">
                {isBedding ? (
                  <>
                    <li>• 5-Thread safety overlock interior seams</li>
                    <li>• Reinforced 4-inch self-hem on flat sheets and pillowcases</li>
                    <li>• High-grade continuous elastic encasing on fitted sheets</li>
                    <li>• Double-stitched borders tested for commercial laundry</li>
                  </>
                ) : (
                  <>
                    <li>• Industrial 4-Thread Overlock Seaming on all joints</li>
                    <li>• Reinforced neck ribbing and armhole bindings</li>
                    <li>• Double-needle bottom hem stitching (12–14 stitches/inch)</li>
                    <li>• Anti-curling collar rib retention after wash</li>
                  </>
                )}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-[#0C294F] uppercase tracking-wider text-amber-700">
                3. Color Fastness & Shrinkage Controls
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li>• Reactive eco-friendly dyeing (OEKO-TEX Standard 100)</li>
                <li>• Color fastness to washing: Grade 4.0+ (ISO 105-C06)</li>
                <li>• Wash shrinkage: Strictly under 3.5% length & width</li>
                <li>• Calibrated dimensions tested across repeated wash cycles</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Products Showcase */}
        {relatedProducts.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#CBD5E0] pb-3">
              <h3 className="text-lg font-bold text-[#0C294F]">
                Other Core Textile Lines
              </h3>
              <Link href="/products" className="text-xs font-bold text-amber-600 hover:underline">
                View All In Catalog
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/products/${rel.slug}`}
                  className="bg-white border border-[#CBD5E0] rounded-xl p-4 flex gap-4 hover:border-amber-500 hover:shadow-md transition-all group"
                >
                  <div className="w-24 h-28 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={getProductGallery(rel.slug, rel.category?.slug)[0].url}
                      alt={getProductGallery(rel.slug, rel.category?.slug)[0].alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div>
                      <span className="text-[10px] font-bold text-amber-600 uppercase">
                        {rel.sku}
                      </span>
                      <h4 className="font-bold text-sm text-[#0C294F] group-hover:text-amber-600 transition-colors">
                        {rel.name}
                      </h4>
                      <p className="text-xs text-[#718096] mt-1 line-clamp-2">
                        {rel.description}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#0C294F] flex items-center gap-1">
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}