"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, KeyRound, User, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const router = useRouter();

  // Check if already logged in
  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setCheckingSession(false);
      }
    } catch {
      setCheckingSession(false);
    }
  }, [router]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="flex justify-center items-center py-40 text-gold-primary">
        <div className="w-8 h-8 rounded-full border-2 border-gold-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-12 text-parchment">
      <div className="p-8 rounded-xl bg-surface border border-gold-primary/15 shadow-2xl flex flex-col gap-6 glass-panel manuscript-border">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center text-gold-primary">
            <KeyRound size={22} />
          </div>
          <h1 className="font-playfair text-2xl font-bold text-gold-primary mt-2">Archive Secretariat</h1>
          <p className="text-mutedText text-xs">Access restricted to authorized digital archivists.</p>
        </div>

        {error && (
          <div className="p-3 rounded bg-red-950/20 border border-red-500/20 text-red-400 text-xs flex gap-2 items-center">
            <ShieldAlert size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-gold-primary">Username</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mutedText" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-2.5 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-sm text-parchment transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-gold-primary">Secret Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-4 pr-10 py-2.5 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-sm text-parchment transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mutedText hover:text-gold-primary"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded bg-gradient-to-r from-gold-primary to-gold-secondary text-background font-bold text-xs uppercase tracking-widest disabled:opacity-50 hover:brightness-110 shadow-gold-glow transition-all"
          >
            {loading ? "Authenticating..." : "Authenticate"}
          </button>
        </form>
      </div>
    </div>
  );
}
