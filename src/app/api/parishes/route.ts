import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

// Public GET: Fetch all parishes
export async function GET() {
  try {
    const parishes = await prisma.parish.findMany({
      orderBy: { established: "asc" }, // Order chronologically by established year
    });
    return NextResponse.json(parishes);
  } catch (error) {
    console.error("Fetch parishes error:", error);
    return NextResponse.json({ error: "Failed to fetch parishes" }, { status: 500 });
  }
}

// Secure POST: Add a new parish
export async function POST(req: Request) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      name,
      nameMalayalam,
      established,
      vicar,
      vicarMalayalam,
      contact,
      address,
      addressMalayalam,
      latitude,
      longitude,
      mapsUrl,
      history,
      historyMalayalam,
      imageUrl,
    } = await req.json();

    if (!name || !nameMalayalam || !established || !vicar || !vicarMalayalam || !address || !addressMalayalam || !history || !historyMalayalam) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const parish = await prisma.parish.create({
      data: {
        name,
        nameMalayalam,
        established,
        vicar,
        vicarMalayalam,
        contact,
        address,
        addressMalayalam,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        mapsUrl: mapsUrl || null,
        history,
        historyMalayalam,
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(parish, { status: 201 });
  } catch (error) {
    console.error("Create parish error:", error);
    return NextResponse.json({ error: "Failed to create parish" }, { status: 500 });
  }
}
