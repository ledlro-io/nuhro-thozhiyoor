import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("admin_dashboard");
    const posts = await db.collection("posts").find({}).sort({ _id: -1 }).toArray();
    return new Response(JSON.stringify({ posts }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, excerpt, content } = await req.json();
    if (!title || !excerpt || !content) {
      return new Response(JSON.stringify({ success: false, error: "All fields are required" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("admin_dashboard");
    const result = await db.collection("posts").insertOne({
      title,
      excerpt,
      content,
      date: new Date().toLocaleString(),
    });

    return new Response(JSON.stringify({ success: true, postId: result.insertedId }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return new Response(JSON.stringify({ success: false, error: "No ID provided" }), { status: 400 });

    const client = await clientPromise;
    const db = client.db("admin_dashboard");
    await db.collection("posts").deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
  }
}
