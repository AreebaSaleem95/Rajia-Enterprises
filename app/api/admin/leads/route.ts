import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const stage = searchParams.get("stage");
    const search = searchParams.get("search");

    const where: any = {};
    if (stage && stage !== "ALL") {
      where.status = stage;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { company: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    const leads = await prisma.lead.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      leads: leads.map((l) => ({
        id: l.id,
        title: l.leadNumber,
        companyName: l.company,
        contactName: l.name,
        email: l.email,
        phone: l.phone || l.whatsapp || "",
        whatsapp: l.whatsapp || l.phone || "",
        country: l.country,
        stage: l.status,
        estimatedValue: l.requiredQuantity > 0 ? l.requiredQuantity * 1.85 : 5000,
        currency: "USD",
        notes: l.internalNotes,
        createdAt: l.createdAt,
      })),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch leads: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const leadNumber = `LD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const lead = await prisma.lead.create({
      data: {
        leadNumber,
        name: body.contactName,
        company: body.companyName || "Prospective Buyer",
        email: body.email,
        phone: body.phone || "",
        whatsapp: body.whatsapp || body.phone || "",
        country: body.country || "Pakistan",
        status: body.stage || "NEW",
        leadSource: body.source || "Direct Call",
        businessType: "Wholesaler",
        requiredQuantity: Number(body.estimatedValue ? Math.round(body.estimatedValue / 1.85) : 2500),
        internalNotes: body.notes || "",
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to create lead: " + error.message },
      { status: 500 }
    );
  }
}
