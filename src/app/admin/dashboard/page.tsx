"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LogOut, FileText, Users, Image as ImageIcon, MapPin, MessageSquare, Plus, Trash2, Edit, AlertCircle, CheckCircle, Star } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

interface Post {
  id: string;
  title: string;
  titleMalayalam: string;
  slug: string;
  summary: string;
  summaryMalayalam: string;
  content: string;
  contentMalayalam: string;
  category: string;
  tags: string;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
}

interface Metropolitan {
  id: string;
  name: string;
  nameMalayalam: string;
  slug: string;
  title: string;
  titleMalayalam: string;
  reignStart: string;
  reignEnd: string;
  bioSummary: string;
  bioSummaryMalayalam: string;
  biography: string;
  biographyMalayalam: string;
  imageUrl?: string;
  order: number;
  remembranceMonth?: number;
  remembranceDay?: number;
}

interface GalleryImage {
  id: string;
  title: string;
  titleMalayalam: string;
  description: string;
  descriptionMalayalam: string;
  imageUrl: string;
  category: string;
}

interface Parish {
  id: string;
  name: string;
  nameMalayalam: string;
  established: string;
  vicar: string;
  vicarMalayalam: string;
  contact: string;
  address: string;
  addressMalayalam: string;
  latitude?: number;
  longitude?: number;
  mapsUrl?: string;
  history: string;
  historyMalayalam: string;
  imageUrl?: string;
}

interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  rating: number;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"posts" | "metropolitans" | "gallery" | "parishes" | "feedback">("posts");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Data lists
  const [posts, setPosts] = useState<Post[]>([]);
  const [metropolitans, setMetropolitans] = useState<Metropolitan[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [parishes, setParishes] = useState<Parish[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  // Editor mode
  const [editorMode, setEditorMode] = useState<"none" | "create_post" | "edit_post" | "create_metro" | "edit_metro" | "create_gallery" | "create_parish" | "edit_parish">("none");
  const [currentEditId, setCurrentEditId] = useState("");
  const [currentEditSlug, setCurrentEditSlug] = useState("");

  // Post form states
  const [postTitle, setPostTitle] = useState("");
  const [postTitleMl, setPostTitleMl] = useState("");
  const [postSlug, setPostSlug] = useState("");
  const [postSummary, setPostSummary] = useState("");
  const [postSummaryMl, setPostSummaryMl] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postContentMl, setPostContentMl] = useState("");
  const [postCategory, setPostCategory] = useState("History");
  const [postTags, setPostTags] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");
  const [savingPost, setSavingPost] = useState(false);

  // Metropolitan form states
  const [metroName, setMetroName] = useState("");
  const [metroNameMl, setMetroNameMl] = useState("");
  const [metroSlug, setMetroSlug] = useState("");
  const [metroTitle, setMetroTitle] = useState("");
  const [metroTitleMl, setMetroTitleMl] = useState("");
  const [metroReignStart, setMetroReignStart] = useState("");
  const [metroReignEnd, setMetroReignEnd] = useState("");
  const [metroBioSummary, setMetroBioSummary] = useState("");
  const [metroBioSummaryMl, setMetroBioSummaryMl] = useState("");
  const [metroBiography, setMetroBiography] = useState("");
  const [metroBiographyMl, setMetroBiographyMl] = useState("");
  const [metroImageUrl, setMetroImageUrl] = useState("");
  const [metroOrder, setMetroOrder] = useState(1);
  const [metroMonth, setMetroMonth] = useState("");
  const [metroDay, setMetroDay] = useState("");
  const [savingMetro, setSavingMetro] = useState(false);

  // Gallery form states
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryTitleMl, setGalleryTitleMl] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryDescriptionMl, setGalleryDescriptionMl] = useState("");
  const [galleryCategory, setGalleryCategory] = useState("Manuscripts");
  const [galleryImageUrl, setGalleryImageUrl] = useState("");
  const [savingGallery, setSavingGallery] = useState(false);

  // Parish form states
  const [parishName, setParishName] = useState("");
  const [parishNameMl, setParishNameMl] = useState("");
  const [parishEstablished, setParishEstablished] = useState("");
  const [parishVicar, setParishVicar] = useState("");
  const [parishVicarMl, setParishVicarMl] = useState("");
  const [parishContact, setParishContact] = useState("");
  const [parishAddress, setParishAddress] = useState("");
  const [parishAddressMl, setParishAddressMl] = useState("");
  const [parishLat, setParishLat] = useState("");
  const [parishLng, setParishLng] = useState("");
  const [parishMapsUrl, setParishMapsUrl] = useState("");
  const [parishHistory, setParishHistory] = useState("");
  const [parishHistoryMl, setParishHistoryMl] = useState("");
  const [parishImageUrl, setParishImageUrl] = useState("");
  const [savingParish, setSavingParish] = useState(false);

  // Feedback notifications
  const [feedbackAlert, setFeedbackAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Validate session
  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (!res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json();
        setUser(data.user);
        fetchData();
      }
    } catch {
      router.push("/admin");
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Fetch list data
  const fetchData = async () => {
    try {
      setLoading(true);
      const resPosts = await fetch("/api/posts?includeDrafts=true");
      if (resPosts.ok) setPosts(await resPosts.json());

      const resMetro = await fetch("/api/metropolitans");
      if (resMetro.ok) setMetropolitans(await resMetro.json());

      const resGallery = await fetch("/api/gallery");
      if (resGallery.ok) setGallery(await resGallery.json());

      const resParishes = await fetch("/api/parishes");
      if (resParishes.ok) setParishes(await resParishes.json());

      const resFeedbacks = await fetch("/api/feedback");
      if (resFeedbacks.ok) setFeedbacks(await resFeedbacks.json());
    } catch (err) {
      showFeedback("error", "Failed to sync archive databases");
    } finally {
      setLoading(false);
    }
  };

  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedbackAlert({ type, message });
    setTimeout(() => setFeedbackAlert(null), 5000);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin");
    } catch {
      router.push("/admin");
    }
  };

  // POST CRUD HANDLERS
  const startCreatePost = () => {
    setPostTitle("");
    setPostTitleMl("");
    setPostSlug("");
    setPostSummary("");
    setPostSummaryMl("");
    setPostContent("");
    setPostContentMl("");
    setPostCategory("History");
    setPostTags("");
    setPostImageUrl("");
    setEditorMode("create_post");
  };

  const startEditPost = (post: Post) => {
    setPostTitle(post.title);
    setPostTitleMl(post.titleMalayalam);
    setPostSlug(post.slug);
    setPostSummary(post.summary);
    setPostSummaryMl(post.summaryMalayalam);
    setPostContent(post.content);
    setPostContentMl(post.contentMalayalam);
    setPostCategory(post.category);
    setPostTags(post.tags);
    setPostImageUrl(post.imageUrl || "");
    setCurrentEditSlug(post.slug);
    setEditorMode("edit_post");
  };

  const savePost = async (publishStatus: boolean) => {
    setSavingPost(true);
    try {
      const payload = {
        title: postTitle,
        titleMalayalam: postTitleMl,
        slug: postSlug,
        summary: postSummary,
        summaryMalayalam: postSummaryMl,
        content: postContent,
        contentMalayalam: postContentMl,
        category: postCategory,
        tags: postTags,
        imageUrl: postImageUrl,
        published: publishStatus,
      };

      const url = editorMode === "create_post" ? "/api/posts" : `/api/posts/${currentEditSlug}`;
      const method = editorMode === "create_post" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        showFeedback("success", `Post successfully saved`);
        setEditorMode("none");
        fetchData();
      } else {
        showFeedback("error", data.error || "Failed to save post");
      }
    } catch {
      showFeedback("error", "A network error occurred while saving post");
    } finally {
      setSavingPost(false);
    }
  };

  const deletePost = async (slug: string) => {
    if (!confirm("Delete post?")) return;
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (res.ok) {
        showFeedback("success", "Post deleted successfully");
        fetchData();
      }
    } catch {
      showFeedback("error", "Failed to delete post");
    }
  };

  // METROPOLITANS CRUD HANDLERS
  const startCreateMetro = () => {
    setMetroName("");
    setMetroNameMl("");
    setMetroSlug("");
    setMetroTitle("");
    setMetroTitleMl("");
    setMetroReignStart("");
    setMetroReignEnd("");
    setMetroBioSummary("");
    setMetroBioSummaryMl("");
    setMetroBiography("");
    setMetroBiographyMl("");
    setMetroImageUrl("");
    setMetroOrder(metropolitans.length + 1);
    setMetroMonth("");
    setMetroDay("");
    setEditorMode("create_metro");
  };

  const startEditMetro = (metro: Metropolitan) => {
    setMetroName(metro.name);
    setMetroNameMl(metro.nameMalayalam);
    setMetroSlug(metro.slug);
    setMetroTitle(metro.title);
    setMetroTitleMl(metro.titleMalayalam);
    setMetroReignStart(metro.reignStart);
    setMetroReignEnd(metro.reignEnd);
    setMetroBioSummary(metro.bioSummary);
    setMetroBioSummaryMl(metro.bioSummaryMalayalam);
    setMetroBiography(metro.biography);
    setMetroBiographyMl(metro.biographyMalayalam);
    setMetroImageUrl(metro.imageUrl || "");
    setMetroOrder(metro.order);
    setMetroMonth(metro.remembranceMonth ? String(metro.remembranceMonth) : "");
    setMetroDay(metro.remembranceDay ? String(metro.remembranceDay) : "");
    setCurrentEditSlug(metro.slug);
    setEditorMode("edit_metro");
  };

  const saveMetro = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingMetro(true);
    try {
      const payload = {
        name: metroName,
        nameMalayalam: metroNameMl,
        slug: metroSlug,
        title: metroTitle,
        titleMalayalam: metroTitleMl,
        reignStart: metroReignStart,
        reignEnd: metroReignEnd,
        bioSummary: metroBioSummary,
        bioSummaryMalayalam: metroBioSummaryMl,
        biography: metroBiography,
        biographyMalayalam: metroBiographyMl,
        imageUrl: metroImageUrl,
        order: metroOrder,
        remembranceMonth: metroMonth ? parseInt(metroMonth) : null,
        remembranceDay: metroDay ? parseInt(metroDay) : null,
      };

      const url = editorMode === "create_metro" ? "/api/metropolitans" : `/api/metropolitans/${currentEditSlug}`;
      const method = editorMode === "create_metro" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        showFeedback("success", "Metropolitan biography saved successfully");
        setEditorMode("none");
        fetchData();
      } else {
        showFeedback("error", data.error || "Failed to save biography");
      }
    } catch {
      showFeedback("error", "Network failure while saving biography");
    } finally {
      setSavingMetro(false);
    }
  };

  const deleteMetro = async (slug: string) => {
    if (!confirm("Delete biography?")) return;
    try {
      const res = await fetch(`/api/metropolitans/${slug}`, { method: "DELETE" });
      if (res.ok) {
        showFeedback("success", "Biography removed successfully");
        fetchData();
      }
    } catch {
      showFeedback("error", "Error removing biography");
    }
  };

  // PARISH CRUD HANDLERS
  const startCreateParish = () => {
    setParishName("");
    setParishNameMl("");
    setParishEstablished("");
    setParishVicar("");
    setParishVicarMl("");
    setParishContact("");
    setParishAddress("");
    setParishAddressMl("");
    setParishLat("");
    setParishLng("");
    setParishMapsUrl("");
    setParishHistory("");
    setParishHistoryMl("");
    setParishImageUrl("");
    setEditorMode("create_parish");
  };

  const startEditParish = (parish: Parish) => {
    setParishName(parish.name);
    setParishNameMl(parish.nameMalayalam);
    setParishEstablished(parish.established);
    setParishVicar(parish.vicar);
    setParishVicarMl(parish.vicarMalayalam);
    setParishContact(parish.contact);
    setParishAddress(parish.address);
    setParishAddressMl(parish.addressMalayalam);
    setParishLat(parish.latitude ? String(parish.latitude) : "");
    setParishLng(parish.longitude ? String(parish.longitude) : "");
    setParishMapsUrl(parish.mapsUrl || "");
    setParishHistory(parish.history);
    setParishHistoryMl(parish.historyMalayalam);
    setParishImageUrl(parish.imageUrl || "");
    setCurrentEditId(parish.id);
    setEditorMode("edit_parish");
  };

  const saveParish = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingParish(true);
    try {
      const payload = {
        name: parishName,
        nameMalayalam: parishNameMl,
        established: parishEstablished,
        vicar: parishVicar,
        vicarMalayalam: parishVicarMl,
        contact: parishContact,
        address: parishAddress,
        addressMalayalam: parishAddressMl,
        latitude: parishLat ? parseFloat(parishLat) : null,
        longitude: parishLng ? parseFloat(parishLng) : null,
        mapsUrl: parishMapsUrl,
        history: parishHistory,
        historyMalayalam: parishHistoryMl,
        imageUrl: parishImageUrl,
      };

      const url = editorMode === "create_parish" ? "/api/parishes" : `/api/parishes/${currentEditId}`;
      const method = editorMode === "create_parish" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        showFeedback("success", "Parish saved successfully");
        setEditorMode("none");
        fetchData();
      } else {
        showFeedback("error", data.error || "Failed to save parish");
      }
    } catch {
      showFeedback("error", "Error communicating with server");
    } finally {
      setSavingParish(false);
    }
  };

  const deleteParish = async (id: string) => {
    if (!confirm("Delete parish?")) return;
    try {
      const res = await fetch(`/api/parishes/${id}`, { method: "DELETE" });
      if (res.ok) {
        showFeedback("success", "Parish deleted successfully");
        fetchData();
      }
    } catch {
      showFeedback("error", "Failed to delete parish");
    }
  };

  // GALLERY CRUD HANDLERS
  const saveGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingGallery(true);
    try {
      const payload = {
        title: galleryTitle,
        titleMalayalam: galleryTitleMl,
        description: galleryDescription,
        descriptionMalayalam: galleryDescriptionMl,
        category: galleryCategory,
        imageUrl: galleryImageUrl,
      };

      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        showFeedback("success", "Gallery item deposited successfully");
        setEditorMode("none");
        setGalleryTitle("");
        setGalleryTitleMl("");
        setGalleryDescription("");
        setGalleryDescriptionMl("");
        setGalleryImageUrl("");
        fetchData();
      } else {
        showFeedback("error", data.error || "Failed to add image");
      }
    } catch {
      showFeedback("error", "Network failure during upload");
    } finally {
      setSavingGallery(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center py-40 text-gold-primary">
        <div className="w-8 h-8 rounded-full border-2 border-gold-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 text-parchment flex flex-col gap-10 font-jakarta">
      {/* Dashboard Top bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gold-primary/10 pb-6">
        <div>
          <span className="text-xs font-bold text-gold-primary uppercase tracking-wider">Heritage Administrative Console</span>
          <h1 className="font-cinzel text-3xl font-bold text-gold-primary mt-1">Nuhro Thozhiyoor CMS</h1>
        </div>

        <div className="flex items-center gap-4 bg-surface p-2.5 rounded-lg border border-gold-primary/10">
          <div className="text-right">
            <p className="text-xs text-mutedText font-semibold">Active Archivist</p>
            <p className="text-sm text-gold-light font-mono font-bold">{user?.name || "Administrator"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 bg-red-950/20 border border-red-500/20 hover:bg-red-950/40 text-red-400 rounded-md transition-colors flex items-center gap-2 text-xs font-bold uppercase"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {feedbackAlert && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 text-sm animate-scale-up border ${
            feedbackAlert.type === "success"
              ? "bg-green-950/30 border-green-500/30 text-green-400"
              : "bg-red-950/30 border-red-500/30 text-red-400"
          }`}
        >
          {feedbackAlert.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{feedbackAlert.message}</span>
        </div>
      )}

      {/* Forms Overlay editor */}
      {editorMode !== "none" ? (
        <div className="p-8 rounded-xl bg-surface border border-gold-primary/10 shadow-2xl glass-panel relative animate-scale-up">
          <button
            onClick={() => setEditorMode("none")}
            className="absolute top-4 right-4 text-xs font-semibold px-3 py-1.5 rounded bg-background border border-gold-primary/20 hover:bg-gold-primary/15 text-gold-primary"
          >
            Cancel / Close
          </button>

          {/* 1. POST EDITOR */}
          {(editorMode === "create_post" || editorMode === "edit_post") && (
            <div>
              <h2 className="font-cinzel text-xl font-bold text-gold-primary mb-6">
                {editorMode === "create_post" ? "Publish New Post" : "Edit Scholarly Post"}
              </h2>
              <RichTextEditor
                title={postTitle}
                setTitle={setPostTitle}
                titleMalayalam={postTitleMl}
                setTitleMalayalam={setPostTitleMl}
                slug={postSlug}
                setSlug={setPostSlug}
                summary={postSummary}
                setSummary={setPostSummary}
                summaryMalayalam={postSummaryMl}
                setSummaryMalayalam={setPostSummaryMl}
                content={postContent}
                setContent={setPostContent}
                contentMalayalam={postContentMl}
                setContentMalayalam={setPostContentMl}
                category={postCategory}
                setCategory={setPostCategory}
                tags={postTags}
                setTags={setPostTags}
                imageUrl={postImageUrl}
                setImageUrl={setPostImageUrl}
                onSave={savePost}
                isSaving={savingPost}
              />
            </div>
          )}

          {/* 2. METROPOLITAN BIOGRAPHY EDITOR */}
          {(editorMode === "create_metro" || editorMode === "edit_metro") && (
            <form onSubmit={saveMetro} className="flex flex-col gap-5 max-w-3xl mx-auto">
              <h2 className="font-cinzel text-xl font-bold text-gold-primary border-b border-gold-primary/10 pb-3 mb-2">
                {editorMode === "create_metro" ? "Add Metropolitan Biography" : "Edit Metropolitan Biography"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Metropolitan Name (English)</label>
                  <input
                    type="text"
                    required
                    value={metroName}
                    onChange={(e) => {
                      setMetroName(e.target.value);
                      setMetroSlug(e.target.value.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^\w-]/g, ""));
                    }}
                    placeholder="e.g. Abraham Mar Koorilose I"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Metropolitan Name (Malayalam)</label>
                  <input
                    type="text"
                    required
                    value={metroNameMl}
                    onChange={(e) => setMetroNameMl(e.target.value)}
                    placeholder="ഉദാ: അബ്രഹാം മാർ കൂറിലോസ് I"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">URL Slug (Auto-generated)</label>
                <input
                  type="text"
                  required
                  value={metroSlug}
                  onChange={(e) => setMetroSlug(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Formal Title (English)</label>
                  <input
                    type="text"
                    required
                    value={metroTitle}
                    onChange={(e) => setMetroTitle(e.target.value)}
                    placeholder="e.g. First Metropolitan of Thozhiyoor"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Formal Title (Malayalam)</label>
                  <input
                    type="text"
                    required
                    value={metroTitleMl}
                    onChange={(e) => setMetroTitleMl(e.target.value)}
                    placeholder="ഉദാ: തൊഴിയൂരിന്റെ ഒന്നാമത് മെത്രാപ്പോലീത്ത"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Reign Start Year</label>
                  <input
                    type="text"
                    required
                    value={metroReignStart}
                    onChange={(e) => setMetroReignStart(e.target.value)}
                    placeholder="e.g. 1772"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Reign End Year</label>
                  <input
                    type="text"
                    required
                    value={metroReignEnd}
                    onChange={(e) => setMetroReignEnd(e.target.value)}
                    placeholder="e.g. 1802 or Present"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Succession Order Index</label>
                  <input
                    type="number"
                    required
                    value={metroOrder}
                    onChange={(e) => setMetroOrder(parseInt(e.target.value))}
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[8px] uppercase font-bold text-gold-primary">Feast Month</label>
                    <input
                      type="number"
                      value={metroMonth}
                      onChange={(e) => setMetroMonth(e.target.value)}
                      placeholder="1-12"
                      className="w-full px-3 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[8px] uppercase font-bold text-gold-primary">Feast Day</label>
                    <input
                      type="number"
                      value={metroDay}
                      onChange={(e) => setMetroDay(e.target.value)}
                      placeholder="1-31"
                      className="w-full px-3 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">Profile Portrait Image URL</label>
                <input
                  type="text"
                  value={metroImageUrl}
                  onChange={(e) => setMetroImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">English Summary</label>
                <textarea
                  required
                  rows={2}
                  value={metroBioSummary}
                  onChange={(e) => setMetroBioSummary(e.target.value)}
                  placeholder="Provide a 2-3 sentence overview..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment leading-normal"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">Malayalam Summary (മലയാളം ചുരുക്കം)</label>
                <textarea
                  required
                  rows={2}
                  value={metroBioSummaryMl}
                  onChange={(e) => setMetroBioSummaryMl(e.target.value)}
                  placeholder="മലയാളത്തിലുള്ള ചെറിയ വിവരണം നൽകുക..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment leading-normal"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">English Biography (Markdown supported)</label>
                <textarea
                  required
                  rows={8}
                  value={metroBiography}
                  onChange={(e) => setMetroBiography(e.target.value)}
                  placeholder="Write full biography text here..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none font-mono text-xs text-parchment leading-relaxed transition-all resize-y"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">Malayalam Biography (മലയാളം ഉള്ളടക്കം)</label>
                <textarea
                  required
                  rows={8}
                  value={metroBiographyMl}
                  onChange={(e) => setMetroBiographyMl(e.target.value)}
                  placeholder="വിശദമായ ചരിത്രം മലയാളത്തിൽ എഴുതുക..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none font-mono text-xs text-parchment leading-relaxed transition-all resize-y"
                />
              </div>

              <button
                type="submit"
                disabled={savingMetro}
                className="w-full py-3 rounded bg-gradient-to-r from-gold-primary to-gold-secondary text-background hover:brightness-110 font-bold text-xs uppercase tracking-wider"
              >
                {savingMetro ? "Saving Biography..." : "Save Biography"}
              </button>
            </form>
          )}

          {/* 3. GALLERY IMAGE CREATOR */}
          {editorMode === "create_gallery" && (
            <form onSubmit={saveGallery} className="flex flex-col gap-5 max-w-xl mx-auto">
              <h2 className="font-cinzel text-xl font-bold text-gold-primary border-b border-gold-primary/10 pb-3 mb-2">
                Deposit Museum Gallery Item
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Item Title (English)</label>
                  <input
                    type="text"
                    required
                    value={galleryTitle}
                    onChange={(e) => setGalleryTitle(e.target.value)}
                    placeholder="e.g. Ancient Liturgical Chalice"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Item Title (Malayalam)</label>
                  <input
                    type="text"
                    required
                    value={galleryTitleMl}
                    onChange={(e) => setGalleryTitleMl(e.target.value)}
                    placeholder="ഉദാ: പുരാതന കാസ"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">Category</label>
                <select
                  value={galleryCategory}
                  onChange={(e) => setGalleryCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                >
                  <option value="Manuscripts">Manuscripts</option>
                  <option value="Cathedrals">Cathedrals</option>
                  <option value="Historical Portraits">Historical Portraits</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">Image URL</label>
                <input
                  type="text"
                  required
                  value={galleryImageUrl}
                  onChange={(e) => setGalleryImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">Historical Description (English)</label>
                <textarea
                  required
                  rows={3}
                  value={galleryDescription}
                  onChange={(e) => setGalleryDescription(e.target.value)}
                  placeholder="Describe the artifact history and details..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment leading-normal"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">Historical Description (Malayalam)</label>
                <textarea
                  required
                  rows={3}
                  value={galleryDescriptionMl}
                  onChange={(e) => setGalleryDescriptionMl(e.target.value)}
                  placeholder="വിവരണം മലയാളത്തിൽ എഴുതുക..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment leading-normal"
                />
              </div>

              <button
                type="submit"
                disabled={savingGallery}
                className="w-full py-3 rounded bg-gradient-to-r from-gold-primary to-gold-secondary text-background hover:brightness-110 font-bold text-xs uppercase tracking-wider"
              >
                {savingGallery ? "Saving Deposit..." : "Save Deposit"}
              </button>
            </form>
          )}

          {/* 4. PARISH EDITOR */}
          {(editorMode === "create_parish" || editorMode === "edit_parish") && (
            <form onSubmit={saveParish} className="flex flex-col gap-5 max-w-3xl mx-auto">
              <h2 className="font-cinzel text-xl font-bold text-gold-primary border-b border-gold-primary/10 pb-3 mb-2">
                {editorMode === "create_parish" ? "Establish New Parish Record" : "Edit Parish Record"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Parish Name (English)</label>
                  <input
                    type="text"
                    required
                    value={parishName}
                    onChange={(e) => setParishName(e.target.value)}
                    placeholder="e.g. St. George's Cathedral, Thozhiyur"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Parish Name (Malayalam)</label>
                  <input
                    type="text"
                    required
                    value={parishNameMl}
                    onChange={(e) => setParishNameMl(e.target.value)}
                    placeholder="ഉദാ: സെന്റ് ജോർജ്ജ് കത്തീഡ്രൽ, തൊഴിയൂർ"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Established Year</label>
                  <input
                    type="text"
                    required
                    value={parishEstablished}
                    onChange={(e) => setParishEstablished(e.target.value)}
                    placeholder="e.g. 1789"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Vicar Name (English)</label>
                  <input
                    type="text"
                    required
                    value={parishVicar}
                    onChange={(e) => setParishVicar(e.target.value)}
                    placeholder="Very Rev. Fr. Mathew Thomas"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Vicar Name (Malayalam)</label>
                  <input
                    type="text"
                    required
                    value={parishVicarMl}
                    onChange={(e) => setParishVicarMl(e.target.value)}
                    placeholder="വെരി. റവ. ഫാ. മാത്യു തോമസ്"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Contact Details</label>
                  <input
                    type="text"
                    required
                    value={parishContact}
                    onChange={(e) => setParishContact(e.target.value)}
                    placeholder="+91 4885 222 201"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Latitude</label>
                  <input
                    type="text"
                    value={parishLat}
                    onChange={(e) => setParishLat(e.target.value)}
                    placeholder="e.g. 10.463385"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Longitude</label>
                  <input
                    type="text"
                    value={parishLng}
                    onChange={(e) => setParishLng(e.target.value)}
                    placeholder="e.g. 76.015243"
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">Google Maps Embed link / directions URL</label>
                <input
                  type="text"
                  value={parishMapsUrl}
                  onChange={(e) => setParishMapsUrl(e.target.value)}
                  placeholder="https://www.google.com/maps/embed?..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Address (English)</label>
                  <textarea
                    required
                    rows={2}
                    value={parishAddress}
                    onChange={(e) => setParishAddress(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment leading-normal resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] uppercase font-bold text-gold-primary">Address (Malayalam)</label>
                  <textarea
                    required
                    rows={2}
                    value={parishAddressMl}
                    onChange={(e) => setParishAddressMl(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment leading-normal resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">Parish Image URL</label>
                <input
                  type="text"
                  value={parishImageUrl}
                  onChange={(e) => setParishImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">History / Narrative (English)</label>
                <textarea
                  required
                  rows={4}
                  value={parishHistory}
                  onChange={(e) => setParishHistory(e.target.value)}
                  placeholder="Historical details of the parish church..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment leading-relaxed resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] uppercase font-bold text-gold-primary">History / Narrative (Malayalam)</label>
                <textarea
                  required
                  rows={4}
                  value={parishHistoryMl}
                  onChange={(e) => setParishHistoryMl(e.target.value)}
                  placeholder="മലയാള ചരിത്ര വിവരണം..."
                  className="w-full px-4 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment leading-relaxed resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={savingParish}
                className="w-full py-3 rounded bg-gradient-to-r from-gold-primary to-gold-secondary text-background hover:brightness-110 font-bold text-xs uppercase tracking-wider"
              >
                {savingParish ? "Saving Parish..." : "Save Parish"}
              </button>
            </form>
          )}
        </div>
      ) : (
        /* STANDARD LISTINGS VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Tabs Sidebar */}
          <div className="flex flex-row lg:flex-col gap-2 border-b lg:border-b-0 lg:border-r border-gold-primary/10 pb-4 lg:pb-0 lg:pr-6 h-fit select-none">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all w-full ${
                activeTab === "posts"
                  ? "bg-gold-primary/10 border border-gold-primary/30 text-gold-primary"
                  : "hover:bg-cardElevated text-mutedText hover:text-gold-light"
              }`}
            >
              <FileText size={16} /> Research Posts
            </button>
            <button
              onClick={() => setActiveTab("metropolitans")}
              className={`flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all w-full ${
                activeTab === "metropolitans"
                  ? "bg-gold-primary/10 border border-gold-primary/30 text-gold-primary"
                  : "hover:bg-cardElevated text-mutedText hover:text-gold-light"
              }`}
            >
              <Users size={16} /> Metropolitans
            </button>
            <button
              onClick={() => setActiveTab("gallery")}
              className={`flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all w-full ${
                activeTab === "gallery"
                  ? "bg-gold-primary/10 border border-gold-primary/30 text-gold-primary"
                  : "hover:bg-cardElevated text-mutedText hover:text-gold-light"
              }`}
            >
              <ImageIcon size={16} /> Museum Gallery
            </button>
            <button
              onClick={() => setActiveTab("parishes")}
              className={`flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all w-full ${
                activeTab === "parishes"
                  ? "bg-gold-primary/10 border border-gold-primary/30 text-gold-primary"
                  : "hover:bg-cardElevated text-mutedText hover:text-gold-light"
              }`}
            >
              <MapPin size={16} /> Manage Parishes
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={`flex items-center justify-start gap-3 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all w-full ${
                activeTab === "feedback"
                  ? "bg-gold-primary/10 border border-gold-primary/30 text-gold-primary"
                  : "hover:bg-cardElevated text-mutedText hover:text-gold-light"
              }`}
            >
              <MessageSquare size={16} /> Visitor Feedbacks
            </button>
          </div>

          {/* List contents */}
          <div className="lg:col-span-3">
            {/* 1. POSTS TAB */}
            {activeTab === "posts" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-gold-primary/5 pb-3">
                  <h3 className="font-cinzel text-base font-bold text-gold-primary">Research Manuscripts &amp; Posts</h3>
                  <button
                    onClick={startCreatePost}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gold-primary text-background font-bold text-[10px] uppercase hover:brightness-110 shadow-gold-glow transition-all"
                  >
                    <Plus size={12} /> New Post
                  </button>
                </div>

                {posts.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="p-4 rounded-lg bg-surface border border-gold-primary/5 hover:border-gold-primary/15 transition-all flex items-center justify-between gap-4"
                      >
                        <div className="flex flex-col gap-1">
                          <h4 className="font-cinzel text-sm font-bold text-parchment leading-snug">{post.title}</h4>
                          <p className="text-[10px] text-mutedText italic">{post.titleMalayalam}</p>
                          <div className="flex items-center gap-3 text-[10px] text-mutedText mt-1">
                            <span className="font-bold text-gold-primary/80 uppercase">{post.category}</span>
                            <span>&bull;</span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            <span>&bull;</span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase border ${
                                post.published
                                  ? "bg-green-950/20 border-green-500/20 text-green-400"
                                  : "bg-yellow-950/20 border-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {post.published ? "Published" : "Draft"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditPost(post)}
                            className="p-2 bg-background hover:bg-cardElevated border border-gold-primary/15 hover:border-gold-primary/45 rounded text-gold-primary transition-all"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={() => deletePost(post.slug)}
                            className="p-2 bg-background hover:bg-red-950/25 border border-red-500/10 hover:border-red-500/40 rounded text-red-400 transition-all"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-mutedText text-xs italic text-center py-10">No research articles archived yet.</p>
                )}
              </div>
            )}

            {/* 2. METROPOLITANS TAB */}
            {activeTab === "metropolitans" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-gold-primary/5 pb-3">
                  <h3 className="font-cinzel text-base font-bold text-gold-primary">Metropolitan Biographies</h3>
                  <button
                    onClick={startCreateMetro}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gold-primary text-background font-bold text-[10px] uppercase hover:brightness-110 shadow-gold-glow transition-all"
                  >
                    <Plus size={12} /> Add Metropolitan
                  </button>
                </div>

                {metropolitans.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {metropolitans.map((metro) => (
                      <div
                        key={metro.id}
                        className="p-4 rounded-lg bg-surface border border-gold-primary/5 hover:border-gold-primary/15 transition-all flex items-center justify-between gap-4"
                      >
                        <div className="flex flex-col gap-1">
                          <h4 className="font-cinzel text-sm font-bold text-parchment leading-snug">{metro.name}</h4>
                          <p className="text-[10px] text-mutedText italic">{metro.nameMalayalam}</p>
                          <div className="flex items-center gap-3 text-[10px] text-mutedText mt-1">
                            <span className="font-bold text-gold-primary/80 uppercase">Order: {metro.order}</span>
                            <span>&bull;</span>
                            <span>Reign: {metro.reignStart} – {metro.reignEnd}</span>
                            {metro.remembranceMonth && (
                              <>
                                <span>&bull;</span>
                                <span className="text-gold-light">Feast: {metro.remembranceDay}/{metro.remembranceMonth}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditMetro(metro)}
                            className="p-2 bg-background hover:bg-cardElevated border border-gold-primary/15 hover:border-gold-primary/45 rounded text-gold-primary transition-all"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={() => deleteMetro(metro.slug)}
                            className="p-2 bg-background hover:bg-red-950/25 border border-red-500/10 hover:border-red-500/40 rounded text-red-400 transition-all"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-mutedText text-xs italic text-center py-10">No Metropolitan biographies seeded.</p>
                )}
              </div>
            )}

            {/* 3. GALLERY TAB */}
            {activeTab === "gallery" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-gold-primary/5 pb-3">
                  <h3 className="font-cinzel text-base font-bold text-gold-primary">Museum Gallery Deposits</h3>
                  <button
                    onClick={() => setEditorMode("create_gallery")}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gold-primary text-background font-bold text-[10px] uppercase hover:brightness-110 shadow-gold-glow transition-all"
                  >
                    <Plus size={12} /> Deposit Image
                  </button>
                </div>

                {gallery.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gallery.map((img) => (
                      <div
                        key={img.id}
                        className="p-4 rounded-lg bg-surface border border-gold-primary/5 hover:border-gold-primary/15 transition-all flex gap-4 items-center justify-between"
                      >
                        <div className="flex gap-3 items-center">
                          {img.imageUrl && (
                            <div className="w-10 h-10 rounded overflow-hidden border border-gold-primary/10 flex-shrink-0 bg-background">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                            </div>
                          )}
                          <div className="flex flex-col">
                            <h4 className="font-cinzel font-bold text-xs text-parchment leading-snug">{img.title}</h4>
                            <span className="text-[9px] text-gold-primary uppercase font-bold mt-0.5">{img.category}</span>
                          </div>
                        </div>

                        <button
                          onClick={async () => {
                            if (!confirm("Remove gallery image?")) return;
                            try {
                              const resDel = await fetch(`/api/gallery`, {
                                method: "DELETE",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ id: img.id }),
                              });
                              if (resDel.ok) {
                                showFeedback("success", "Gallery item removed");
                                fetchData();
                              }
                            } catch {
                              showFeedback("error", "Error removing item");
                            }
                          }}
                          className="p-2 bg-background hover:bg-red-950/25 border border-red-500/10 hover:border-red-500/40 rounded text-red-400 transition-all flex-shrink-0"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-mutedText text-xs italic text-center py-10">No items deposited in museum archive.</p>
                )}
              </div>
            )}

            {/* 4. PARISHES CMS TAB */}
            {activeTab === "parishes" && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between border-b border-gold-primary/5 pb-3">
                  <h3 className="font-cinzel text-base font-bold text-gold-primary">Parishes &amp; Diocesan Churches</h3>
                  <button
                    onClick={startCreateParish}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gold-primary text-background font-bold text-[10px] uppercase hover:brightness-110 shadow-gold-glow transition-all"
                  >
                    <Plus size={12} /> Add Parish
                  </button>
                </div>

                {parishes.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {parishes.map((parish) => (
                      <div
                        key={parish.id}
                        className="p-4 rounded-lg bg-surface border border-gold-primary/5 hover:border-gold-primary/15 transition-all flex items-center justify-between gap-4"
                      >
                        <div className="flex flex-col gap-1">
                          <h4 className="font-cinzel text-sm font-bold text-parchment leading-snug">{parish.name}</h4>
                          <p className="text-[10px] text-mutedText italic">{parish.nameMalayalam}</p>
                          <div className="flex items-center gap-3 text-[10px] text-mutedText mt-1">
                            <span className="font-bold text-gold-primary/80 uppercase">Est: {parish.established}</span>
                            <span>&bull;</span>
                            <span>Vicar: {parish.vicar}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => startEditParish(parish)}
                            className="p-2 bg-background hover:bg-cardElevated border border-gold-primary/15 hover:border-gold-primary/45 rounded text-gold-primary transition-all"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={() => deleteParish(parish.id)}
                            className="p-2 bg-background hover:bg-red-950/25 border border-red-500/10 hover:border-red-500/40 rounded text-red-400 transition-all"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-mutedText text-xs italic text-center py-10">No parishes registered in church database.</p>
                )}
              </div>
            )}

            {/* 5. VISITOR FEEDBACKS VIEW */}
            {activeTab === "feedback" && (
              <div className="flex flex-col gap-6">
                <div className="border-b border-gold-primary/5 pb-3">
                  <h3 className="font-cinzel text-base font-bold text-gold-primary">Visitor Feedback Log</h3>
                </div>

                {feedbacks.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {feedbacks.map((fb) => (
                      <div
                        key={fb.id}
                        className="p-5 rounded-lg bg-surface border border-gold-primary/5 flex flex-col gap-3 shadow-md relative"
                      >
                        {/* Date */}
                        <span className="absolute top-4 right-4 text-[9px] font-mono text-mutedText">
                          {new Date(fb.createdAt).toLocaleDateString()}
                        </span>

                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-cinzel font-bold text-sm text-gold-primary">{fb.name}</h4>
                            <span className="text-[10px] text-mutedText">({fb.email})</span>
                          </div>
                          
                          {/* Stars */}
                          <div className="flex items-center gap-0.5 mt-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < fb.rating ? "text-gold-primary fill-current" : "text-mutedText/20"}
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-xs text-mutedText leading-relaxed border-t border-gold-primary/5 pt-2 mt-1">
                          {fb.message}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-mutedText text-xs italic text-center py-10">No visitor ratings submitted yet.</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
