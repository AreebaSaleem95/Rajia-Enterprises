import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [
      totalLeads,
      totalInquiries,
      totalQuotations,
      totalOrders,
      totalMeetings,
      orders,
      productionBatches,
      recentLeads,
      recentInquiries,
      upcomingMeetings,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.inquiryRequest.count(),
      prisma.quotation.count(),
      prisma.order.count(),
      prisma.meeting.count({ where: { status: "CONFIRMED" } }),
      prisma.order.findMany({ select: { totalAmount: true, totalQuantity: true } }),
      prisma.productionBatch.findMany({ select: { plannedQty: true, actualQty: true } }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.inquiryRequest.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { items: true },
      }),
      prisma.meeting.findMany({
        where: { meetingDate: { gte: new Date() } },
        take: 5,
        orderBy: { meetingDate: "asc" },
      }),
    ]);

    const totalRevenueUSD = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
    const totalOrderedPieces = orders.reduce((sum, o) => sum + (o.totalQuantity || 0), 0);
    const activeProductionPieces = productionBatches.reduce((sum, b) => sum + b.plannedQty, 0);

    return NextResponse.json({
      success: true,
      kpis: {
        totalLeads,
        totalInquiries,
        totalQuotations,
        totalOrders,
        totalMeetings,
        totalRevenueUSD,
        totalOrderedPieces,
        activeProductionPieces,
        factoryCapacity: "200,000 Pcs/Month",
      },
      recentLeads: recentLeads.map((l) => ({
        id: l.id,
        title: l.leadNumber,
        companyName: l.company,
        contactName: l.name,
        email: l.email,
        country: l.country,
        stage: l.status,
        estimatedValue: l.requiredQuantity > 0 ? l.requiredQuantity * 1.85 : 5000,
        createdAt: l.createdAt,
      })),
      recentInquiries: recentInquiries.map((inq) => ({
        id: inq.id,
        referenceNo: inq.inquiryNumber,
        contactPerson: inq.customerName,
        companyName: inq.companyName,
        destinationPort: inq.destinationPort || "Karachi Port",
        totalQuantity: inq.estimatedTotalQty,
        status: inq.status,
        createdAt: inq.createdAt,
      })),
      upcomingMeetings: upcomingMeetings.map((m) => ({
        id: m.id,
        contactName: m.fullName,
        companyName: m.companyName,
        scheduledAt: m.meetingDate,
        status: m.status,
        meetingLink: m.meetingLink,
      })),
    });
  } catch (error: any) {
    console.error("Dashboard KPI fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard metrics" },
      { status: 500 }
    );
  }
}
