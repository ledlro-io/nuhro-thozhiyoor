"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        // Instead of blocking access, just redirect freely
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "4rem", minHeight: "100vh", background: "#0b0b10", color: "#ececf2", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", color: "#e2b56f", marginBottom: "2rem", textAlign: "center" }}>Admin Login</h1>

        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ display: "block", width: "100%", marginBottom: "1rem", padding: "0.7rem", borderRadius: "8px", border: "1px solid rgba(226,181,111,.25)", background: "#13131c", color: "#ececf2" }} />

        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: "block", width: "100%", marginBottom: "1rem", padding: "0.7rem", borderRadius: "8px", border: "1px solid rgba(226,181,111,.25)", background: "#13131c", color: "#ececf2" }} />

        <button onClick={handleLogin} disabled={loading} style={{ width: "100%", padding: "0.7rem", background: "linear-gradient(135deg,#f0c27b,#cfa24f)", border: "none", borderRadius: "12px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>{error}</p>}
      </div>
    </div>
  );
}
