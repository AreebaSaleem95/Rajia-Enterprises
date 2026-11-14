import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const quotations = await prisma.quotation.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      quotations: quotations.map((q) => ({
        id: q.id,
        quotationNumber: q.quotationNumber,
        incoterms: q.incoterm,
        portOfLoading: q.originPort,
        portOfDischarge: q.destinationPort || "Felixstowe, UK",
        currency: q.currency,
        paymentTerms: q.paymentTerms,
        subtotal: q.subtotal,
        totalAmount: q.totalAmount,
        status: q.status,
        createdAt: q.createdAt,
        customer: q.customer,
        items: q.items.map((it) => ({
          id: it.id,
          productName: it.product.name,
          sku: it.product.sku,
          size: it.size,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          totalPrice: it.lineTotal,
          color: it.product.color,
        })),
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      customerId,
      incoterms,
      portOfLoading,
      portOfDischarge,
      currency,
      paymentTerms,
      notes,
      validUntil,
      items, // array of { productName, sku, description, quantity, unitPrice, color, size }
    } = body;

    const defaultProduct = await prisma.product.findFirst();
    if (!defaultProduct) {
      return NextResponse.json({ error: "No products in database" }, { status: 400 });
    }

    const subtotal = items.reduce(
      (sum: number, it: any) => sum + Number(it.quantity) * Number(it.unitPrice),
      0
    );

    const quotationNumber = `QT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const quotation = await prisma.quotation.create({
      data: {
        quotationNumber,
        customerId: customerId || null,
        incoterm: incoterms || "FOB Karachi",
        originPort: portOfLoading || "Karachi Port, Pakistan",
        destinationPort: portOfDischarge || "Felixstowe, UK",
        currency: currency || "USD",
        paymentTerms: paymentTerms || "30% Advance T/T, 70% against BL Copy",
        notes: notes || "Prices valid for 30 days.",
        validUntil: validUntil ? new Date(validUntil) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        subtotal,
        totalAmount: subtotal,
        status: "DRAFT",
        createdById: user.id,
        items: {
          create: items.map((it: any) => ({
            productId: defaultProduct.id,
            size: it.size || "M",
            quantity: Number(it.quantity),
            unitPrice: Number(it.unitPrice),
            lineTotal: Number(it.quantity) * Number(it.unitPrice),
            notes: it.description || null,
          })),
        },
      },
      include: {
        items: true,
        customer: true,
      },
    });

    return NextResponse.json({ success: true, quotation });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
