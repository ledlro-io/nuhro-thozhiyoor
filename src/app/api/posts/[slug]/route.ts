import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

// Public GET: Fetch single post by slug
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params;
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!post.published) {
      const session = getSessionUser(req);
      if (!session || session.role !== "admin") {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
    }

    return NextResponse.json(post);
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

// Secure PUT: Update a post
export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;
    const {
      title,
      titleMalayalam,
      summary,
      summaryMalayalam,
      content,
      contentMalayalam,
      imageUrl,
      category,
      tags,
      published,
    } = await req.json();

    const existing = await prisma.post.findUnique({
      where: { slug },
    });

    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
      where: { slug },
      data: {
        title,
        titleMalayalam,
        summary,
        summaryMalayalam,
        content,
        contentMalayalam,
        imageUrl: imageUrl || null,
        category,
        tags: tags || "",
        published,
        publishedAt: published && !existing.published ? new Date() : existing.publishedAt,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error: any) {
    console.error("Update post error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

// Secure DELETE: Delete a post
export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;

    const existing = await prisma.post.findUnique({
      where: { slug },
    });

    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.post.delete({
      where: { slug },
    });

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error: any) {
    console.error("Delete post error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
