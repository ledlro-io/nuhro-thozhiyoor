import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

// Public GET: Fetch all gallery images
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const where: any = {};
    if (category && category !== "All") {
      where.category = category;
    }

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(images);
  } catch (error: any) {
    console.error("Fetch gallery error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 });
  }
}

// Secure POST: Add a new gallery image
export async function POST(req: Request) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, titleMalayalam, description, descriptionMalayalam, imageUrl, category } = await req.json();

    if (!title || !titleMalayalam || !description || !descriptionMalayalam || !imageUrl || !category) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const image = await prisma.galleryImage.create({
      data: {
        title,
        titleMalayalam,
        description,
        descriptionMalayalam,
        imageUrl,
        category,
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error: any) {
    console.error("Create gallery image error:", error);
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}

// Secure DELETE: Remove a gallery image
export async function DELETE(req: Request) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
    }

    await prisma.galleryImage.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Gallery image deleted successfully" });
  } catch (error: any) {
    console.error("Delete gallery image error:", error);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
