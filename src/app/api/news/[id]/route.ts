import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

// Secure PUT: Update a news item (Admin only)
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { title, titleMalayalam, content, contentMalayalam, imageUrl } = await req.json();

    const existing = await prisma.news.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    const updated = await prisma.news.update({
      where: { id },
      data: {
        title,
        titleMalayalam,
        content,
        contentMalayalam,
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Update news error:", error);
    return NextResponse.json({ error: "Failed to update news details" }, { status: 500 });
  }
}

// Secure DELETE: Delete a news item (Admin only)
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    const existing = await prisma.news.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: "News item not found" }, { status: 404 });
    }

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "News announcement deleted successfully" });
  } catch (error) {
    console.error("Delete news error:", error);
    return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
  }
}
