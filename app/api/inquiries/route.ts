import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      companyName,
      contactPerson,
      email,
      phone,
      whatsapp,
      country,
      destinationPort,
      packingRequirement,
      notes,
      items, // array of { productId, productName, sku, color, totalQuantity, sizeBreakdown }
    } = data;

    if (!contactPerson || !email || !phone) {
      return NextResponse.json(
        { error: "Contact person, email, and phone number are required." },
        { status: 400 }
      );
    }

    const totalQuantity = items && items.length > 0
      ? items.reduce((acc: number, item: any) => acc + (Number(item.totalQuantity) || 0), 0)
      : 0;

    const inquiryNumber = `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Prepare items list for InquiryItem creation
    // If an item has sizeBreakdown, create an InquiryItem for each size
    const inquiryItemData: any[] = [];
    if (items && items.length > 0) {
      for (const item of items) {
        if (item.productId && item.sizeBreakdown) {
          for (const [sz, qty] of Object.entries(item.sizeBreakdown)) {
            if (Number(qty) > 0) {
              inquiryItemData.push({
                productId: item.productId,
                size: sz,
                quantity: Number(qty),
                packingOption: item.packagingPreference || packingRequirement,
                notes: item.customLogo ? "Custom OEM Logo" : null,
              });
            }
          }
        }
      }
    }

    // Create InquiryRequest
    const inquiry = await prisma.inquiryRequest.create({
      data: {
        inquiryNumber,
        customerName: contactPerson,
        companyName: companyName || "Prospective Importer",
        email,
        whatsapp: whatsapp || phone,
        country: country || "Pakistan",
        destinationPort: destinationPort || "Karachi Port (FOB)",
        estimatedTotalQty: totalQuantity,
        packingPreference: packingRequirement || "Standard Export Carton",
        additionalMessage: notes || "",
        status: "NEW",
        items: inquiryItemData.length > 0 ? { create: inquiryItemData } : undefined,
      },
    });

    // Auto-create CRM Lead
    const leadNumber = `LD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const lead = await prisma.lead.create({
      data: {
        leadNumber,
        name: contactPerson,
        company: companyName || "Prospective Buyer",
        email,
        phone,
        whatsapp: whatsapp || phone,
        country: country || "Pakistan",
        businessType: "Importer / Wholesaler",
        leadSource: "Website Inquiry",
        requiredQuantity: totalQuantity,
        destination: destinationPort || "FOB Karachi",
        status: "NEW",
        inquiryRequestId: inquiry.id,
        internalNotes: `Submitted online RFQ on ${new Date().toLocaleDateString()}. Port: ${destinationPort || "FOB Karachi"}. Notes: ${notes || "None"}`,
      },
    });

    return NextResponse.json({
      success: true,
      referenceNo: inquiryNumber,
      inquiryId: inquiry.id,
      leadId: lead.id,
      message: "Your wholesale inquiry has been submitted. Our export sales manager will contact you within 24 hours.",
    });
  } catch (error: any) {
    console.error("Inquiry submission error:", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry: " + error.message },
      { status: 500 }
    );
  }
}
