import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

// Public GET: Fetch all posts or filter by search/category
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const includeDrafts = searchParams.get("includeDrafts") === "true";

    const where: any = {};

    if (!includeDrafts) {
      where.published = true;
    } else {
      const session = getSessionUser(req);
      if (!session) {
        where.published = true;
      }
    }

    if (category && category !== "All") {
      where.category = category;
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { titleMalayalam: { contains: search } },
        { summary: { contains: search } },
        { summaryMalayalam: { contains: search } },
        { content: { contains: search } },
        { contentMalayalam: { contains: search } },
      ];
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("Fetch posts error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// Secure POST: Create a new post
export async function POST(req: Request) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      title,
      titleMalayalam,
      slug,
      summary,
      summaryMalayalam,
      content,
      contentMalayalam,
      imageUrl,
      category,
      tags,
      published,
    } = await req.json();

    if (!title || !titleMalayalam || !slug || !summary || !summaryMalayalam || !content || !contentMalayalam || !category) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    // Check slug uniqueness
    const existing = await prisma.post.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json({ error: "An article with this URL slug already exists" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        titleMalayalam,
        slug,
        summary,
        summaryMalayalam,
        content,
        contentMalayalam,
        imageUrl: imageUrl || null,
        category,
        tags: tags || "",
        published,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error("Create post error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
