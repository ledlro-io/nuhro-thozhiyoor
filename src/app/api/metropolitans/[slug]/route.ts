import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

// Public GET: Fetch single Metropolitan by slug
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const metropolitan = await prisma.metropolitan.findUnique({
      where: { slug },
    });

    if (!metropolitan) {
      return NextResponse.json({ error: "Biography not found" }, { status: 404 });
    }

    return NextResponse.json(metropolitan);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch biography" }, { status: 500 });
  }
}

// Secure PUT: Update a Metropolitan biography
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;
    const {
      name,
      nameMalayalam,
      title,
      titleMalayalam,
      reignStart,
      reignEnd,
      bioSummary,
      bioSummaryMalayalam,
      biography,
      biographyMalayalam,
      imageUrl,
      order,
      remembranceMonth,
      remembranceDay,
    } = await req.json();

    const existing = await prisma.metropolitan.findUnique({
      where: { slug },
    });

    if (!existing) {
      return NextResponse.json({ error: "Biography not found" }, { status: 404 });
    }

    const updated = await prisma.metropolitan.update({
      where: { slug },
      data: {
        name,
        nameMalayalam,
        title,
        titleMalayalam,
        reignStart,
        reignEnd,
        bioSummary,
        bioSummaryMalayalam,
        biography,
        biographyMalayalam,
        imageUrl: imageUrl || null,
        order: parseInt(order) || existing.order,
        remembranceMonth: remembranceMonth ? parseInt(remembranceMonth) : null,
        remembranceDay: remembranceDay ? parseInt(remembranceDay) : null,
      },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Update biography error:", error);
    return NextResponse.json({ error: "Failed to update biography" }, { status: 500 });
  }
}

// Secure DELETE: Delete a Metropolitan biography
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;

    const existing = await prisma.metropolitan.findUnique({
      where: { slug },
    });

    if (!existing) {
      return NextResponse.json({ error: "Biography not found" }, { status: 404 });
    }

    await prisma.metropolitan.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true, message: "Biography deleted successfully" });
  } catch (error: any) {
    console.error("Delete biography error:", error);
    return NextResponse.json({ error: "Failed to delete biography" }, { status: 500 });
  }
}
