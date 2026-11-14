import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const items = await prisma.inventoryItem.findMany({
      include: {
        product: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      items: items.map((it) => ({
        id: it.id,
        currentStock: it.availableStock,
        safetyStock: it.lowStockAlert,
        warehouseLocation: it.warehouseCode,
        productVariant: {
          sku: `${it.product.sku}-${it.size}`,
          size: it.size,
          color: it.product.color,
          product: {
            title: it.product.name,
          },
        },
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

    const { inventoryItemId, type, quantity, reason } = await req.json();

    const current = await prisma.inventoryItem.findUnique({
      where: { id: inventoryItemId },
    });

    if (!current) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    const delta = type.includes("IN") ? Number(quantity) : -Number(quantity);
    const newStock = Math.max(0, current.availableStock + delta);

    const [updatedItem, transaction] = await prisma.$transaction([
      prisma.inventoryItem.update({
        where: { id: inventoryItemId },
        data: { availableStock: newStock },
      }),
      prisma.stockTransaction.create({
        data: {
          productId: current.productId,
          size: current.size,
          quantity: Number(quantity),
          type: type.includes("IN") ? "PRODUCTION_INWARD" : "DISPATCH_OUTWARD",
          notes: reason || "Manual adjustment",
          performedById: user.id,
        },
      }),
    ]);

    return NextResponse.json({ success: true, item: updatedItem, transaction });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
