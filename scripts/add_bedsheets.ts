import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Adding Bed Sheets & Home Textiles to Rajia Enterprises database...");

  // 1. Ensure categories exist
  let catBedding = await prisma.productCategory.findUnique({
    where: { slug: "bed-sheets-bedding" },
  });
  if (!catBedding) {
    catBedding = await prisma.productCategory.create({
      data: {
        name: "Bed Sheets & Bedding Sets",
        slug: "bed-sheets-bedding",
        description: "100% Combed Cotton Bed Sheets, Percale and Sateen Hotel Weaves with Fitted Sheets and Pillowcases.",
      },
    });
  }

  let catHomeTextiles = await prisma.productCategory.findUnique({
    where: { slug: "home-textiles" },
  });
  if (!catHomeTextiles) {
    catHomeTextiles = await prisma.productCategory.create({
      data: {
        name: "Home Textile Products",
        slug: "home-textiles",
        description: "Durable institutional, hospitality, and residential cotton home textile products.",
      },
    });
  }

  const beddingSizes = ["Twin", "Full", "Queen", "King"];

  // 2. Add Bed Sheet 1: Classic White Cotton Bed Sheet Set
  let bstWhite = await prisma.product.findUnique({ where: { sku: "BST-WHT-101" } });
  if (!bstWhite) {
    bstWhite = await prisma.product.create({
      data: {
        sku: "BST-WHT-101",
        slug: "classic-white-cotton-bed-sheet-set",
        name: "Classic White Cotton Bed Sheet Set",
        color: "White",
        colorHex: "#FFFFFF",
        fabric: "100% Combed Cotton Percale",
        gsm: "300 Thread Count",
        stitching: "Overlocked Hem & Deep Pocket Elastic",
        packing: "Retail Box / Master Carton",
        description: "Hotel-grade luxury white cotton bed sheet set manufactured with 100% long-staple combed cotton percale weave. Breathable, crisp hand-feel with reinforced perimeter stitching. Includes deep-pocket fitted sheet (fits up to 16\" mattresses), flat sheet, and two envelope-closure pillowcases.",
        featuresJson: JSON.stringify([
          "100% Long-Staple Combed Cotton Percale",
          "Crisp 300 Thread Count Breathable Weave",
          "Deep Pocket Fitted Sheet with 360-Degree Heavy Duty Elastic",
          "Includes 1 Flat Sheet, 1 Fitted Sheet, and 2 Pillowcases",
          "Colorfast & Machine Washable with Low Shrinkage",
          "Export Cartons (24 Sets per Master Carton)"
        ]),
        featured: true,
        categoryId: catBedding.id,
        images: {
          create: [
            { url: "/images/bedsheets/white-cotton/front.jpg", alt: "Classic White Cotton Bed Sheet Set on King Bed", viewType: "front", sortOrder: 0 },
            { url: "/images/bedsheets/fabric-texture.jpg", alt: "Cotton Percale Fabric Weave Macro Texture", viewType: "fabric", sortOrder: 1 },
          ],
        },
        variants: {
          create: beddingSizes.map((s) => ({ size: s, sku: `BST-WHT-101-${s}` })),
        },
      },
    });
    console.log("✓ Added Classic White Cotton Bed Sheet Set");
  }

  // 3. Add Bed Sheet 2: Royal Blue Percale Bedding Set
  let bstBlue = await prisma.product.findUnique({ where: { sku: "BST-BLU-201" } });
  if (!bstBlue) {
    bstBlue = await prisma.product.create({
      data: {
        sku: "BST-BLU-201",
        slug: "royal-blue-percale-bedding-set",
        name: "Royal Blue Percale Bedding Set",
        color: "Royal Blue",
        colorHex: "#1E3A8A",
        fabric: "100% Combed Cotton",
        gsm: "250 Thread Count",
        stitching: "Precision Edge Hemming",
        packing: "Gift Box / Polybag",
        description: "Vibrant royal blue cotton bed sheet set crafted for residential and hospitality wholesale buyers. Dyed with high-grade reactive colors ensuring fade-resistant saturation. Ultra-smooth texture with moisture-wicking properties ideal for warm climates.",
        featuresJson: JSON.stringify([
          "100% Pure Combed Cotton Yarn",
          "250 Thread Count Durable Percale Weave",
          "Fade-Resistant Reactive Dyeing Technology",
          "Pillowcases with Double-Stitched Hems",
          "Pre-shrunk to Retain Precision Dimensions",
          "Available for Private Label Custom Branding"
        ]),
        featured: true,
        categoryId: catBedding.id,
        images: {
          create: [
            { url: "/images/bedsheets/royal-blue/front.jpg", alt: "Royal Blue Cotton Bed Sheet Set Studio Display", viewType: "front", sortOrder: 0 },
            { url: "/images/bedsheets/fabric-texture.jpg", alt: "Cotton Bedding Fabric Weave Close-up", viewType: "fabric", sortOrder: 1 },
          ],
        },
        variants: {
          create: beddingSizes.map((s) => ({ size: s, sku: `BST-BLU-201-${s}` })),
        },
      },
    });
    console.log("✓ Added Royal Blue Percale Bedding Set");
  }

  // 4. Add Bed Sheet 3: Slate Grey Sateen Bedding Set
  let bstGrey = await prisma.product.findUnique({ where: { sku: "BST-GRY-301" } });
  if (!bstGrey) {
    bstGrey = await prisma.product.create({
      data: {
        sku: "BST-GRY-301",
        slug: "slate-grey-sateen-bedding-set",
        name: "Slate Grey Sateen Bedding Set",
        color: "Slate Grey",
        colorHex: "#4B5563",
        fabric: "100% Combed Cotton Sateen",
        gsm: "400 Thread Count",
        stitching: "Mercerized Satin Stitch Hem",
        packing: "Presentation Box",
        description: "Contemporary slate grey sateen luxury bed sheet collection featuring a subtle luminous sheen and silky soft hand-feel. Woven with 4-over-1 sateen weave using combed long-staple cotton. Engineered for high-end boutique hotels and retail department store lines.",
        featuresJson: JSON.stringify([
          "400 Thread Count Long-Staple Sateen Weave",
          "Silky Luminous Luster & Exceptionally Soft Drape",
          "Tear-Resistant Reinforced Seam Integrity",
          "Naturally Breathable & Temperature Regulating",
          "Complete Sizing Assortment (Twin to King)",
          "Bulk Export Master Carton Packaging"
        ]),
        featured: true,
        categoryId: catBedding.id,
        images: {
          create: [
            { url: "/images/bedsheets/slate-grey/front.jpg", alt: "Slate Grey Cotton Bed Sheet Set in Contemporary Bedroom", viewType: "front", sortOrder: 0 },
            { url: "/images/bedsheets/fabric-texture.jpg", alt: "Sateen Fabric Weave Close-up Detail", viewType: "fabric", sortOrder: 1 },
          ],
        },
        variants: {
          create: beddingSizes.map((s) => ({ size: s, sku: `BST-GRY-301-${s}` })),
        },
      },
    });
    console.log("✓ Added Slate Grey Sateen Bedding Set");
  }

  // 5. Seed inventory for the bedding sets
  for (const prod of [bstWhite, bstBlue, bstGrey]) {
    for (const size of beddingSizes) {
      const existing = await prisma.inventoryItem.findFirst({
        where: { productId: prod.id, size, warehouseCode: "WH-FSD-01" },
      });
      if (!existing) {
        await prisma.inventoryItem.create({
          data: {
            productId: prod.id,
            size,
            availableStock: Math.floor(Math.random() * 2000) + 800,
            reservedStock: 150,
            dispatchedQty: 1200,
            lowStockAlert: 200,
            warehouseCode: "WH-FSD-01",
          },
        });
      }
    }
  }

  console.log("✓ Seeded Inventory for Bed Sheets at Warehouse WH-FSD-01");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
