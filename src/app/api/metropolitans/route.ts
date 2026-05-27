import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

// Public GET: Fetch all Metropolitans ordered chronologically
export async function GET() {
  try {
    const metropolitans = await prisma.metropolitan.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(metropolitans);
  } catch (error: any) {
    console.error("Fetch metropolitans error:", error);
    return NextResponse.json({ error: "Failed to fetch metropolitans" }, { status: 500 });
  }
}

// Secure POST: Add a new Metropolitan
export async function POST(req: Request) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      nameMalayalam,
      slug,
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

    if (
      !name ||
      !nameMalayalam ||
      !slug ||
      !title ||
      !titleMalayalam ||
      !reignStart ||
      !reignEnd ||
      !bioSummary ||
      !bioSummaryMalayalam ||
      !biography ||
      !biographyMalayalam
    ) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await prisma.metropolitan.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json({ error: "A biography with this URL slug already exists" }, { status: 400 });
    }

    const metropolitan = await prisma.metropolitan.create({
      data: {
        name,
        nameMalayalam,
        slug,
        title,
        titleMalayalam,
        reignStart,
        reignEnd,
        bioSummary,
        bioSummaryMalayalam,
        biography,
        biographyMalayalam,
        imageUrl: imageUrl || null,
        order: parseInt(order) || 99,
        remembranceMonth: remembranceMonth ? parseInt(remembranceMonth) : null,
        remembranceDay: remembranceDay ? parseInt(remembranceDay) : null,
      },
    });

    return NextResponse.json(metropolitan, { status: 201 });
  } catch (error: any) {
    console.error("Create metropolitan error:", error);
    return NextResponse.json({ error: "Failed to add metropolitan" }, { status: 500 });
  }
}
