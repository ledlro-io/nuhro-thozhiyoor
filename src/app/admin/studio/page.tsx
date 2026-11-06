"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Shield } from "lucide-react";
import DocumentStudio from "@/components/studio/DocumentStudio";

export default function DocumentStudioPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gold-primary">
        <div className="w-8 h-8 rounded-full border-2 border-gold-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 text-parchment flex flex-col gap-6 font-jakarta">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-primary/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="p-2 rounded-lg bg-surface border border-gold-primary/20 text-gold-primary hover:bg-gold-primary/10 transition-colors"
            title="Back to Admin Dashboard"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-primary px-2 py-0.5 rounded bg-gold-primary/10 border border-gold-primary/20">
                Heritage Archive
              </span>
              <span className="text-xs text-mutedText flex items-center gap-1">
                <Shield size={12} className="text-gold-primary" /> Admin Authenticated ({user?.name || "Admin"})
              </span>
            </div>
            <h1 className="font-cinzel text-2xl font-bold text-gold-primary mt-0.5">
              Document Studio &amp; Certificate Generator
            </h1>
          </div>
        </div>
      </div>

      {/* Studio */}
      <DocumentStudio />
    </div>
  );
}