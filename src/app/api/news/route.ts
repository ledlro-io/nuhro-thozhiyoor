import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

// Public GET: Fetch all news items ordered by date
export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(news);
  } catch (error) {
    console.error("Fetch news error:", error);
    return NextResponse.json({ error: "Failed to fetch news posts" }, { status: 500 });
  }
}

// Secure POST: Add a new news item (Admin only)
export async function POST(req: Request) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, titleMalayalam, content, contentMalayalam, imageUrl } = await req.json();

    if (!title || !titleMalayalam || !content || !contentMalayalam) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const item = await prisma.news.create({
      data: {
        title,
        titleMalayalam,
        content,
        contentMalayalam,
        imageUrl: imageUrl || null,
        date: new Date(),
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Create news error:", error);
    return NextResponse.json({ error: "Failed to post news announcement" }, { status: 500 });
  }
}
