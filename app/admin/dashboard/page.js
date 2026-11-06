"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    if (!title || !excerpt || !content) return alert("All fields are required");

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, excerpt, content }),
      });
      const data = await res.json();

      if (data.success) {
        setTitle("");
        setExcerpt("");
        setContent("");
        fetchPosts();
        alert("Post added successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const handleDeletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      if (data.success) fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside style={{
        width: "280px",
        background: "#1a1a2e",
        color: "#ececf2",
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2.5rem",
        minHeight: "100vh"
      }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "#f0c27b" }}>Admin</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1.5rem", fontSize: "1.2rem" }}>
          <a href="#" style={{ color: "#ececf2", textDecoration: "none" }}>Dashboard</a>
          <a href="#" style={{ color: "#ececf2", textDecoration: "none" }}>Posts</a>
          <a href="#" style={{ color: "#ececf2", textDecoration: "none" }}>Settings</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, background: "#0f0f18", padding: "4rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3.5rem", alignItems: "center" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.8rem", color: "#f0c27b" }}>Dashboard</h1>
          <div style={{ color: "#ececf2", fontSize: "1.4rem" }}>Welcome, Admin</div>
        </div>

        {/* Add Post Form */}
        <div style={{
          marginBottom: "4rem",
          maxWidth: "950px",
          background: "#171723",
          padding: "3.5rem",
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
        }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", color: "#f0c27b", marginBottom: "2rem" }}>Add New Post</h2>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{
            display: "block",
            width: "100%",
            marginBottom: "1.8rem",
            padding: "1.2rem",
            borderRadius: "16px",
            border: "1px solid rgba(240,194,123,0.3)",
            background: "#1b1b29",
            color: "#ececf2",
            fontSize: "1.3rem",
          }} />
          <input type="text" placeholder="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} style={{
            display: "block",
            width: "100%",
            marginBottom: "1.8rem",
            padding: "1.2rem",
            borderRadius: "16px",
            border: "1px solid rgba(240,194,123,0.3)",
            background: "#1b1b29",
            color: "#ececf2",
            fontSize: "1.3rem",
          }} />
          <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} rows={7} style={{
            display: "block",
            width: "100%",
            marginBottom: "2rem",
            padding: "1.2rem",
            borderRadius: "16px",
            border: "1px solid rgba(240,194,123,0.3)",
            background: "#1b1b29",
            color: "#ececf2",
            fontSize: "1.3rem",
            resize: "vertical",
          }} />
          <button onClick={handleAddPost} style={{
            padding: "1.2rem 3rem",
            background: "linear-gradient(135deg,#f0c27b,#cfa24f)",
            border: "none",
            borderRadius: "20px",
            fontWeight: 700,
            fontSize: "1.4rem",
            cursor: "pointer",
            transition: "transform 0.2s"
          }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Add Post
          </button>
        </div>

        {/* Posts List */}
        <div style={{
          display: "grid",
          gap: "2.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))"
        }}>
          {posts.map((post) => (
            <div key={post._id} style={{
              background: "#1c1c2b",
              borderRadius: "24px",
              padding: "2.5rem",
              boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "240px"
            }}>
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#f0c27b", fontSize: "1.9rem", marginBottom: "1rem" }}>{post.title}</h3>
                <p style={{ color: "#a5a5b5", marginBottom: "1rem", fontSize: "1.2rem" }}>{post.excerpt}</p>
              </div>
              <button onClick={() => handleDeletePost(post._id)} style={{
                padding: "0.9rem 2rem",
                background: "#f0c27b",
                color: "#000",
                fontWeight: 700,
                border: "none",
                borderRadius: "16px",
                cursor: "pointer",
                fontSize: "1.2rem",
                alignSelf: "flex-start",
                transition: "transform 0.2s"
              }}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
