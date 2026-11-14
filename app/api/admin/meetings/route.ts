import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const meetings = await prisma.meeting.findMany({
      orderBy: { meetingDate: "desc" },
    });

    return NextResponse.json({
      success: true,
      meetings: meetings.map((m) => ({
        id: m.id,
        title: `${m.meetingType} (${m.meetingMethod})`,
        contactName: m.fullName,
        companyName: m.companyName,
        email: m.email,
        phone: m.whatsapp,
        scheduledAt: m.meetingDate,
        timeZone: m.timeSlot,
        meetingType: m.meetingMethod,
        meetingLink: m.meetingLink,
        status: m.status,
        notes: m.agenda,
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

    const { id, status, notes } = await req.json();

    const data: any = {};
    if (status) data.status = status;
    if (notes) data.adminNotes = notes;

    const meeting = await prisma.meeting.update({
      where: { id },
      data,
    });

    return NextResponse.json({ success: true, meeting });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
