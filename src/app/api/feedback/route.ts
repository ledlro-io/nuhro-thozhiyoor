import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

// Public POST: Submit feedback
export async function POST(req: Request) {
  try {
    const { name, email, message, rating } = await req.json();

    if (!name || !email || !message || rating === undefined) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
    }

    const rateVal = parseInt(rating);
    if (isNaN(rateVal) || rateVal < 1 || rateVal > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        name,
        email,
        message,
        rating: rateVal,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error: any) {
    console.error("Submit feedback error:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}

// Secure GET: Fetch all feedbacks (Admin only)
export async function GET(req: Request) {
  try {
    const session = getSessionUser(req);
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const feedbacks = await prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Fetch feedbacks error:", error);
    return NextResponse.json({ error: "Failed to fetch feedback listings" }, { status: 500 });
  }
}
