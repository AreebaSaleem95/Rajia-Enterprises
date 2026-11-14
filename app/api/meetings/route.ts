import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateStr = searchParams.get("date");

    if (!dateStr) {
      const meetings = await prisma.meeting.findMany({
        where: {
          meetingDate: { gte: new Date() },
          status: { not: "CANCELLED" },
        },
        select: {
          id: true,
          bookingNumber: true,
          meetingDate: true,
          timeSlot: true,
          meetingType: true,
        },
      });
      return NextResponse.json({ success: true, meetings });
    }

    const startOfDay = new Date(`${dateStr}T00:00:00.000Z`);
    const endOfDay = new Date(`${dateStr}T23:59:59.999Z`);

    const bookedSlots = await prisma.meeting.findMany({
      where: {
        meetingDate: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: { not: "CANCELLED" },
      },
      select: {
        timeSlot: true,
        meetingDate: true,
      },
    });

    return NextResponse.json({
      success: true,
      date: dateStr,
      bookedSlots: bookedSlots.map((b) => b.meetingDate.toISOString()),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch meeting slots: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      contactName,
      companyName,
      email,
      phone,
      whatsapp,
      meetingType,
      scheduledAt,
      timeZone,
      notes,
    } = body;

    if (!contactName || !email || !scheduledAt) {
      return NextResponse.json(
        { error: "Contact name, email, and scheduled time are required." },
        { status: 400 }
      );
    }

    const scheduledDate = new Date(scheduledAt);

    // Double booking collision check: 40 minute buffer
    const slotStart = new Date(scheduledDate.getTime() - 40 * 60 * 1000);
    const slotEnd = new Date(scheduledDate.getTime() + 40 * 60 * 1000);

    const collision = await prisma.meeting.findFirst({
      where: {
        meetingDate: {
          gte: slotStart,
          lte: slotEnd,
        },
        status: { not: "CANCELLED" },
      },
    });

    if (collision) {
      return NextResponse.json(
        {
          error:
            "This time slot is already reserved by another client. Please select another slot.",
        },
        { status: 409 }
      );
    }

    const bookingNumber = `MTG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const isMeet = meetingType !== "FACTORY_VISIT_FAISALABAD";

    const meeting = await prisma.meeting.create({
      data: {
        bookingNumber,
        fullName: contactName,
        companyName: companyName || "Prospective Importer",
        email,
        whatsapp: whatsapp || phone || "",
        country: "International",
        meetingType: meetingType || "Wholesale Inquiry",
        meetingMethod: isMeet ? "Google Meet" : "Factory Visit",
        meetingDate: scheduledDate,
        timeSlot: `${scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} PKT`,
        agenda: notes || "Client requested export discussion",
        meetingLink: isMeet
          ? `https://meet.google.com/fsd-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 6)}`
          : null,
        status: "CONFIRMED",
      },
    });

    // Auto-create lead
    const leadNumber = `LD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    await prisma.lead.create({
      data: {
        leadNumber,
        name: contactName,
        company: companyName || "Client Meeting",
        email,
        phone: phone || "",
        whatsapp: whatsapp || phone || "",
        country: "International",
        businessType: "Wholesaler",
        leadSource: "Calendar Booking",
        status: "CONTACTED",
        internalNotes: `Booked meeting for ${scheduledDate.toUTCString()} (${meetingType}). Notes: ${notes || "None"}`,
      },
    });

    return NextResponse.json({
      success: true,
      meeting: {
        ...meeting,
        contactName: meeting.fullName,
        scheduledAt: meeting.meetingDate,
        timeZone: timeZone || "PKT (+05:00)",
      },
      message: "Your consultation has been successfully scheduled.",
    });
  } catch (error: any) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to schedule meeting: " + error.message },
      { status: 500 }
    );
  }
}
