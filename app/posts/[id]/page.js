// app/posts/[id]/page.js
import { notFound } from "next/navigation";

export default async function PostPage({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);
  const { posts } = await res.json();

  const post = posts.find(p => p.id === params.id);
  if (!post) return notFound();

  return (
    <section style={{ padding: "4rem" }}>
      <h2>{post.title}</h2>
      <p>{post.date}</p>
      <p>{post.content}</p>
    </section>
  );
}
