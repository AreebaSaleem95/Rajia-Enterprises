import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const batches = await prisma.productionBatch.findMany({
      include: {
        order: {
          include: { customer: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      batches: batches.map((b) => ({
        id: b.id,
        batchNumber: b.batchNumber,
        totalQuantity: b.plannedQty,
        completedQty: b.actualQty,
        rejectedQty: 0,
        status: b.cuttingStatus === "COMPLETED" && b.stitchingStatus === "COMPLETED" && b.packingStatus === "COMPLETED"
          ? "COMPLETED"
          : b.qcStatus === "PASSED"
          ? "PACKING"
          : b.stitchingStatus === "IN_PROGRESS"
          ? "STITCHING"
          : "CUTTING",
        startDate: b.startDate,
        targetEndDate: b.completionDate,
        order: b.order,
      })),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, status, completedQty } = await req.json();

    const data: any = {};
    if (completedQty !== undefined) data.actualQty = Number(completedQty);
    if (status === "CUTTING") {
      data.cuttingStatus = "IN_PROGRESS";
    } else if (status === "STITCHING") {
      data.cuttingStatus = "COMPLETED";
      data.stitchingStatus = "IN_PROGRESS";
    } else if (status === "QUALITY_CHECK") {
      data.stitchingStatus = "COMPLETED";
      data.qcStatus = "IN_PROGRESS";
    } else if (status === "PACKING") {
      data.qcStatus = "PASSED";
      data.packingStatus = "IN_PROGRESS";
    } else if (status === "COMPLETED") {
      data.cuttingStatus = "COMPLETED";
      data.stitchingStatus = "COMPLETED";
      data.qcStatus = "PASSED";
      data.packingStatus = "COMPLETED";
    }

    const batch = await prisma.productionBatch.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, batch });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
