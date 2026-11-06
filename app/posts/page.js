// app/posts/page.js
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, []);

  return (
    <section id="posts">
      <h3 className="title">Posts & Research</h3>
      <div className="grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
            <span>{post.date}</span>
            <Link href={`/posts/${post.id}`} className="btn">
              Read More
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
