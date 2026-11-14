import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database with verified Rajia Enterprises & VESTO® data...");

  // 1. Clean existing records
  await prisma.auditLog.deleteMany();
  await prisma.stockTransaction.deleteMany();
  await prisma.inventoryItem.deleteMany();
  await prisma.productionBatch.deleteMany();
  await prisma.meetingSlot.deleteMany();
  await prisma.meeting.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.quotationItem.deleteMany();
  await prisma.quotation.deleteMany();
  await prisma.followUp.deleteMany();
  await prisma.leadActivity.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.inquiryItem.deleteMany();
  await prisma.inquiryRequest.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.productCategory.deleteMany();
  await prisma.user.deleteMany();

  // 2. Seed Administrator Users with Role-Based Access
  const adminPassword = await bcrypt.hash("Admin@123456", 10);
  const staffPassword = await bcrypt.hash("Staff@123456", 10);

  const superAdmin = await prisma.user.create({
    data: {
      email: "admin@rajipk.com",
      passwordHash: adminPassword,
      fullName: "M. Tariq (Executive Office)",
      phone: "+92 300 8663488",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
  });

  const salesManager = await prisma.user.create({
    data: {
      email: "sales@rajipk.com",
      passwordHash: staffPassword,
      fullName: "Asim Bilal (Head of Export Sales)",
      phone: "+92 321 8750391",
      role: "SALES_MANAGER",
      status: "ACTIVE",
    },
  });

  const productionManager = await prisma.user.create({
    data: {
      email: "production@rajipk.com",
      passwordHash: staffPassword,
      fullName: "Rauf Ahmed (Plant Director)",
      phone: "+92 301 7654321",
      role: "PRODUCTION_MGR",
      status: "ACTIVE",
    },
  });

  console.log("✓ Seeded Admin Users (admin@rajipk.com, sales@rajipk.com, production@rajipk.com)");

  // 3. Seed Categories
  const catVest = await prisma.productCategory.create({
    data: {
      name: "Men's Cotton Vest",
      slug: "mens-cotton-vest",
      description: "100% Combed Cotton Rich Men's Sleeveless Undershirts / Tank Tops (GSM 160–180)",
    },
  });

  const catUndershirt = await prisma.productCategory.create({
    data: {
      name: "Premium Cotton Undershirt",
      slug: "premium-cotton-undershirt",
      description: "Export quality soft hand-feel combed yarn undershirts for domestic and overseas wholesale.",
    },
  });

  const catWholesale = await prisma.productCategory.create({
    data: {
      name: "Wholesale Vest Collection",
      slug: "wholesale-vest-collection",
      description: "Master carton containerized consignments for distributors, retailers and institutional buyers.",
    },
  });

  const catPrivateLabel = await prisma.productCategory.create({
    data: {
      name: "Custom / Private Label Products",
      slug: "custom-private-label",
      description: "OEM bespoke production with buyer brand labels, custom packaging, and customized GSM specs.",
    },
  });

  console.log("✓ Seeded Product Categories");

  // 4. Seed Products with accurate specifications & photography galleries
  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  // PRODUCT 1: Jet Black
  const prodBlack = await prisma.product.create({
    data: {
      sku: "VST-BLK-100",
      slug: "vesto-jet-black",
      name: "VESTO® Jet Black",
      color: "Black",
      colorHex: "#111111",
      fabric: "100% Cotton",
      gsm: "160–180",
      stitching: "Overlock",
      packing: "Bulk / Box",
      description: "Signature VESTO® Jet Black premium men's vest crafted from 100% combed cotton rich fabric. Engineered with soft armhole binding, reinforced neckline, and precision overlock stitching for long-lasting comfort and shape retention. Dyed with reactive colorfast dyestuffs ensuring deep black luster wash after wash.",
      featuresJson: JSON.stringify([
        "100% Combed Pure Cotton Rich Fabric",
        "Export-grade 160–180 GSM Single Jersey Knit",
        "Reinforced 4-Thread Overlock Anti-Chafe Seams",
        "Superior Sweat Absorption & High Breathability",
        "Pre-shrunk Fabric with ±3% Dimensional Stability",
        "Available in Retail Boxes (3-pack) or Export Master Cartons"
      ]),
      featured: true,
      categoryId: catVest.id,
      images: {
        create: [
          { url: "/images/branding/vesto-trio.webp", alt: "VESTO cotton vests in black, heather grey, and optic white", viewType: "collection", sortOrder: 0 },
          { url: "/images/fabrics/cotton-weave-macro.jpg", alt: "Close-up of cotton textile weave", viewType: "fabric", sortOrder: 1 },
          { url: "/images/manufacturing/overlock-stitching.jpg", alt: "Textile stitching on an industrial overlock machine", viewType: "production", sortOrder: 2 },
        ],
      },
      variants: {
        create: sizes.map((s) => ({ size: s, sku: `VST-BLK-100-${s}` })),
      },
    },
  });

  // PRODUCT 2: Heather Grey
  const prodGrey = await prisma.product.create({
    data: {
      sku: "VST-GRY-200",
      slug: "vesto-heather-grey",
      name: "VESTO® Heather Grey",
      color: "Heather Grey",
      colorHex: "#A0A5AA",
      fabric: "100% Cotton",
      gsm: "160–180",
      stitching: "Overlock",
      packing: "Bulk / Box",
      description: "Premium VESTO® Heather Grey men's sleeveless vest woven with melange combed cotton fibers. Delivers an ultra-soft hand-feel with natural micro-ventilation, perfect for everyday casual wear, loungewear, or undershirt layer under business shirts. Rigorously inspected under 4-point quality control systems.",
      featuresJson: JSON.stringify([
        "100% Combed Cotton Rich Melange Yarn",
        "160–180 GSM Lightweight, Breathable Construction",
        "Smooth Soft-Touch Ribbed Binding at Neck & Armholes",
        "Anti-Pilling & Shape-Memory Knit",
        "Pre-washed to Eliminate Bulk Shrinkage",
        "Export Packaged in Polybags & Heavy-Duty Corrugated Cartons"
      ]),
      featured: true,
      categoryId: catVest.id,
      images: {
        create: [
          { url: "/images/branding/vesto-trio.webp", alt: "VESTO cotton vests in black, heather grey, and optic white", viewType: "collection", sortOrder: 0 },
          { url: "/images/fabrics/cotton-weave-macro.jpg", alt: "Close-up of cotton textile weave", viewType: "fabric", sortOrder: 1 },
          { url: "/images/manufacturing/overlock-stitching.jpg", alt: "Textile stitching on an industrial overlock machine", viewType: "production", sortOrder: 2 },
        ],
      },
      variants: {
        create: sizes.map((s) => ({ size: s, sku: `VST-GRY-200-${s}` })),
      },
    },
  });

  // PRODUCT 3: Optic White
  const prodWhite = await prisma.product.create({
    data: {
      sku: "VST-WHT-300",
      slug: "vesto-optic-white",
      name: "VESTO® Optic White",
      color: "Optic White",
      colorHex: "#FFFFFF",
      fabric: "100% Cotton",
      gsm: "160–180",
      stitching: "Overlock",
      packing: "Bulk / Box",
      description: "The classic VESTO® Optic White men's vest — the benchmark in international undershirt standards. Spun from premium long-staple Pakistani cotton, bleached with optical brighteners for crisp, brilliant whiteness. Features high absorbency, zero tag irritation, and clean overlock hems that remain flat under clothing.",
      featuresJson: JSON.stringify([
        "100% Long-Staple Pure Combed Cotton",
        "Brilliant Optic White Optical-Bleached Finishing",
        "160–180 GSM Export Standard Single Jersey",
        "Reinforced Seams for Heavy Commercial Laundering",
        "Hypoallergenic & Eco-Friendly Processing",
        "Individual Polybag or 3-Piece Retail Box Available"
      ]),
      featured: true,
      categoryId: catVest.id,
      images: {
        create: [
          { url: "/images/branding/vesto-trio.webp", alt: "VESTO cotton vests in black, heather grey, and optic white", viewType: "collection", sortOrder: 0 },
          { url: "/images/fabrics/cotton-weave-macro.jpg", alt: "Close-up of cotton textile weave", viewType: "fabric", sortOrder: 1 },
          { url: "/images/manufacturing/overlock-stitching.jpg", alt: "Textile stitching on an industrial overlock machine", viewType: "production", sortOrder: 2 },
        ],
      },
      variants: {
        create: sizes.map((s) => ({ size: s, sku: `VST-WHT-300-${s}` })),
      },
    },
  });

  console.log("✓ Seeded Products (Jet Black, Heather Grey, Optic White) with DSLR Galleries & Variants");

  // 5. Seed Inventory for each variant
  const allProducts = [prodBlack, prodGrey, prodWhite];
  for (const prod of allProducts) {
    for (const size of sizes) {
      await prisma.inventoryItem.create({
        data: {
          productId: prod.id,
          size,
          availableStock: Math.floor(Math.random() * 4000) + 1500,
          reservedStock: Math.floor(Math.random() * 600) + 200,
          dispatchedQty: Math.floor(Math.random() * 8000) + 2000,
          lowStockAlert: 500,
          warehouseCode: "WH-FSD-01",
        },
      });
    }
  }

  console.log("✓ Seeded Inventory Items across S–3XL sizes at Warehouse WH-FSD-01");

  // 6. Seed Verified Customer Accounts
  const cust1 = await prisma.customer.create({
    data: {
      customerNumber: "CUST-2026-001",
      name: "Global Apparel Importers Ltd",
      company: "Global Apparel Importers Ltd",
      contactPerson: "David Richardson",
      email: "david@globalapparel.co.uk",
      phone: "+44 20 7946 0912",
      whatsapp: "+44 7700 900123",
      country: "United Kingdom",
      billingAddress: "45 Commercial Road, London E1 1LP, UK",
      shippingAddress: "Port of Felixstowe / Tilbury Docks, UK",
      category: "Importer",
      status: "ACTIVE",
      totalRecordedPurchases: 48500,
      notes: "High-volume wholesale buyer ordering 40ft containers on FOB Karachi terms.",
    },
  });

  const cust2 = await prisma.customer.create({
    data: {
      customerNumber: "CUST-2026-002",
      name: "Al-Barakah Textile Trading LLC",
      company: "Al-Barakah Textile Trading LLC",
      contactPerson: "Sheikh Tariq Mansoor",
      email: "tariq@albarakah-textiles.ae",
      phone: "+971 4 398 7654",
      whatsapp: "+971 50 123 4567",
      country: "United Arab Emirates",
      billingAddress: "Al Ras, Deira Wholesale Market, Dubai, UAE",
      shippingAddress: "Jebel Ali Free Zone Port, Dubai, UAE",
      category: "Wholesaler",
      status: "ACTIVE",
      totalRecordedPurchases: 32000,
      notes: "Regular monthly buyer of 30,000 pcs split across Black and White 3-packs.",
    },
  });

  const cust3 = await prisma.customer.create({
    data: {
      customerNumber: "CUST-2026-003",
      name: "Apex Garment Wholesalers",
      company: "Apex Garment Wholesalers",
      contactPerson: "Malik Usman",
      email: "usman@apexgarments.pk",
      phone: "+92 42 37654321",
      whatsapp: "+92 300 4567890",
      country: "Pakistan",
      billingAddress: "Anarkali Wholesale Bazaar, Lahore, Pakistan",
      shippingAddress: "Main Warehouse, Sheikhupura Road, Lahore",
      category: "Wholesaler",
      status: "ACTIVE",
      totalRecordedPurchases: 18500,
      notes: "Domestic wholesale distributor supplying 120 retail outlets in Punjab.",
    },
  });

  console.log("✓ Seeded Active B2B Customers");

  // 7. Seed CRM Leads across pipeline
  await prisma.lead.create({
    data: {
      leadNumber: "LD-2026-001",
      name: "Markus Schneider",
      company: "Hanseatic Trading GmbH",
      email: "m.schneider@hanseatic-trading.de",
      phone: "+49 40 12345678",
      whatsapp: "+49 170 1234567",
      country: "Germany",
      city: "Hamburg",
      businessType: "Importer",
      leadSource: "Website Inquiry",
      interestedProducts: "VESTO® Optic White, VESTO® Jet Black",
      requiredQuantity: 25000,
      preferredGsm: "180 GSM",
      requiredSizes: "M:8000, L:10000, XL:7000",
      packingRequirements: "Custom German language retail boxes with EAN-13 barcodes",
      destination: "Port of Hamburg",
      status: "QUOTATION_SENT",
      priority: "HIGH",
      internalNotes: "Buyer visited website from Google Germany. Requested CIF Hamburg pricing. Sent formal PDF quote QT-2026-001.",
      assignedToId: salesManager.id,
      customerId: cust1.id,
      lastContactAt: new Date(Date.now() - 2 * 86400000),
      nextFollowUpAt: new Date(Date.now() + 2 * 86400000),
    },
  });

  await prisma.lead.create({
    data: {
      leadNumber: "LD-2026-002",
      name: "Fahad Al-Husseini",
      company: "Gulf Wholesale Apparel",
      email: "fahad@gulfapparel.com.sa",
      whatsapp: "+966 50 987 6543",
      country: "Saudi Arabia",
      city: "Jeddah",
      businessType: "Wholesaler",
      leadSource: "WhatsApp Direct",
      interestedProducts: "VESTO® Heather Grey, VESTO® Optic White",
      requiredQuantity: 15000,
      preferredGsm: "160 GSM",
      requiredSizes: "L:6000, XL:6000, 2XL:3000",
      destination: "Jeddah Islamic Port",
      status: "QUALIFIED",
      priority: "HIGH",
      internalNotes: "Interested in private label under their registered brand name. Scheduled virtual meeting on Google Meet.",
      assignedToId: salesManager.id,
      lastContactAt: new Date(Date.now() - 1 * 86400000),
      nextFollowUpAt: new Date(Date.now() + 1 * 86400000),
    },
  });

  await prisma.lead.create({
    data: {
      leadNumber: "LD-2026-003",
      name: "Ahmed Raza",
      company: "Raza Garments Wholesale Hub",
      email: "raza@garmentsfaisalabad.pk",
      phone: "+92 300 1122334",
      whatsapp: "+92 300 1122334",
      country: "Pakistan",
      city: "Karachi",
      businessType: "Wholesaler",
      leadSource: "Direct Referral",
      interestedProducts: "VESTO® Jet Black, VESTO® Heather Grey",
      requiredQuantity: 5000,
      preferredGsm: "160–180",
      destination: "Karachi Bolarum Cloth Market",
      status: "NEGOTIATION",
      priority: "MEDIUM",
      internalNotes: "Requesting 5% cash settlement discount on 5,000 pcs batch. Awaiting management confirmation.",
      assignedToId: salesManager.id,
    },
  });

  console.log("✓ Seeded CRM Leads across Pipeline Stages");

  // 8. Seed Quotations & Orders
  const quote1 = await prisma.quotation.create({
    data: {
      quotationNumber: "QT-2026-001",
      customerId: cust1.id,
      incoterm: "FOB Karachi",
      originPort: "Karachi Port Qasim",
      destinationPort: "Port of Felixstowe / Tilbury",
      currency: "USD",
      exchangeRate: 278.5,
      subtotal: 35000,
      discountAmount: 1000,
      packingCost: 750,
      shippingCost: 0,
      totalAmount: 34750,
      paymentTerms: "30% Advance T/T, 70% against Scanned Bill of Lading (B/L)",
      deliveryTimeline: "25 Days from Advance Payment Receipt",
      validUntil: new Date(Date.now() + 30 * 86400000),
      status: "SENT",
      createdById: superAdmin.id,
      notes: "Export quotation for 25,000 pcs VESTO 100% Cotton Vests packed in export master cartons.",
      items: {
        create: [
          {
            productId: prodWhite.id,
            size: "L",
            quantity: 15000,
            unitPrice: 1.40,
            lineTotal: 21000,
            notes: "Optic White 180 GSM",
          },
          {
            productId: prodBlack.id,
            size: "L",
            quantity: 10000,
            unitPrice: 1.40,
            lineTotal: 14000,
            notes: "Jet Black 180 GSM",
          },
        ],
      },
    },
  });

  const order1 = await prisma.order.create({
    data: {
      orderNumber: "ORD-2026-001",
      customerId: cust2.id,
      quotationId: quote1.id,
      totalQuantity: 20000,
      currency: "USD",
      totalAmount: 28000,
      paymentStatus: "ADVANCE_RECEIVED",
      productionStatus: "IN_PRODUCTION",
      destination: "Dubai, UAE",
      incoterm: "FOB Karachi",
      packingType: "Retail 3-Pack Box in Master Cartons",
      targetDeliveryDate: new Date(Date.now() + 18 * 86400000),
      internalNotes: "Advance payment received in Meezan Bank. Fabric cutting completed, stitching stage active.",
      items: {
        create: [
          {
            productId: prodBlack.id,
            size: "L",
            quantity: 10000,
            unitPrice: 1.40,
            totalPrice: 14000,
          },
          {
            productId: prodWhite.id,
            size: "XL",
            quantity: 10000,
            unitPrice: 1.40,
            totalPrice: 14000,
          },
        ],
      },
    },
  });

  console.log("✓ Seeded Quotations and Recorded Orders");

  // 9. Seed Active Production Batches
  await prisma.productionBatch.create({
    data: {
      batchNumber: "BATCH-2026-001",
      orderId: order1.id,
      productSku: "VST-BLK-100",
      plannedQty: 10000,
      actualQty: 9980,
      fabricLot: "LOT-KNT-9081",
      gsm: "160–180",
      cuttingStatus: "COMPLETED",
      stitchingStatus: "IN_PROGRESS",
      finishingStatus: "PENDING",
      qcStatus: "PENDING",
      packingStatus: "PENDING",
      startDate: new Date(Date.now() - 5 * 86400000),
      completionDate: new Date(Date.now() + 10 * 86400000),
    },
  });

  await prisma.productionBatch.create({
    data: {
      batchNumber: "BATCH-2026-002",
      orderId: order1.id,
      productSku: "VST-WHT-300",
      plannedQty: 10000,
      actualQty: 10020,
      fabricLot: "LOT-KNT-9082",
      gsm: "160–180",
      cuttingStatus: "COMPLETED",
      stitchingStatus: "COMPLETED",
      finishingStatus: "IN_PROGRESS",
      qcStatus: "PASSED",
      packingStatus: "IN_PROGRESS",
      startDate: new Date(Date.now() - 8 * 86400000),
      completionDate: new Date(Date.now() + 6 * 86400000),
    },
  });

  console.log("✓ Seeded Production Batches (Cutting -> Stitching -> QC -> Packing)");

  // 10. Seed Scheduled Meetings
  await prisma.meeting.create({
    data: {
      bookingNumber: "MTG-2026-001",
      fullName: "Markus Schneider",
      companyName: "Hanseatic Trading GmbH",
      email: "m.schneider@hanseatic-trading.de",
      whatsapp: "+49 170 1234567",
      country: "Germany",
      meetingType: "Wholesale Inquiry Meeting",
      meetingMethod: "Google Meet",
      meetingDate: new Date(Date.now() + 2 * 86400000),
      timeSlot: "02:00 PM - 02:45 PM PKT",
      agenda: "Review VESTO fabric lab test results, European size specs, and 40ft container shipping timeline.",
      status: "CONFIRMED",
      meetingLink: "https://meet.google.com/xyz-vesto-b2b",
      hostUserId: salesManager.id,
      customerId: cust1.id,
    },
  });

  await prisma.meeting.create({
    data: {
      bookingNumber: "MTG-2026-002",
      fullName: "Sheikh Tariq Mansoor",
      companyName: "Al-Barakah Textile Trading LLC",
      email: "tariq@albarakah-textiles.ae",
      whatsapp: "+971 50 123 4567",
      country: "United Arab Emirates",
      meetingType: "Factory Visit Appointment",
      meetingMethod: "Factory Visit",
      meetingDate: new Date(Date.now() + 6 * 86400000),
      timeSlot: "11:00 AM - 01:00 PM PKT",
      agenda: "On-site visit to Rajia Enterprises Faisalabad stitching facility and warehouse inspection.",
      status: "CONFIRMED",
      adminNotes: "Client visiting Faisalabad textile cluster. Coordinate chauffeur pick-up from Faisalabad airport.",
      hostUserId: superAdmin.id,
      customerId: cust2.id,
    },
  });

  console.log("✓ Seeded Booking Calendar Meetings");

  // 11. Seed Audit Logs
  await prisma.auditLog.create({
    data: {
      action: "CREATE",
      entityType: "ORDER",
      entityId: order1.id,
      details: "Confirmed Order ORD-2026-001 for Al-Barakah Textile Trading LLC (20,000 pcs).",
      userId: superAdmin.id,
    },
  });

  console.log("==================================================================");
  console.log("🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!");
  console.log("Credentials:");
  console.log("  Super Admin: admin@rajipk.com / Admin@123456");
  console.log("  Sales Mgr:   sales@rajipk.com / Staff@123456");
  console.log("  Production:  production@rajipk.com / Staff@123456");
  console.log("==================================================================");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
