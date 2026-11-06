import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

// Secure PUT: Update a parish record
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
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

    const existing = await prisma.parish.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Parish not found" }, { status: 404 });
    }

    const updated = await prisma.parish.update({
      where: { id },
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

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update parish error:", error);
    return NextResponse.json({ error: "Failed to update parish details" }, { status: 500 });
  }
}

// Secure DELETE: Delete a parish record
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const existing = await prisma.parish.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "Parish not found" }, { status: 404 });
    }

    await prisma.parish.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Parish deleted successfully" });
  } catch (error) {
    console.error("Delete parish error:", error);
    return NextResponse.json({ error: "Failed to delete parish" }, { status: 500 });
  }
}
