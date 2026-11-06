"use client";

import React, { useState, useEffect } from "react";
import { Upload, Link as LinkIcon, AlertCircle, Settings, Check } from "lucide-react";

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  placeholder = "https://example.com/image.jpg",
}: ImageUploadProps) {
  const [activeTab, setActiveTab] = useState<"link" | "upload">("link");
  const [cloudName, setCloudName] = useState("");
  const [uploadPreset, setUploadPreset] = useState("");
  const [showConfig, setShowConfig] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  // Load Cloudinary configs from localStorage or Env
  useEffect(() => {
    const storedCloud = localStorage.getItem("cloudinary_cloud_name") || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
    const storedPreset = localStorage.getItem("cloudinary_upload_preset") || process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";
    setCloudName(storedCloud);
    setUploadPreset(storedPreset);
  }, []);

  const saveConfig = (cName: string, preset: string) => {
    localStorage.setItem("cloudinary_cloud_name", cName);
    localStorage.setItem("cloudinary_upload_preset", preset);
    setCloudName(cName);
    setUploadPreset(preset);
    setShowConfig(false);
    setError("");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!cloudName || !uploadPreset) {
      setError("Please configure your Cloud Name and Upload Preset in settings first.");
      setShowConfig(true);
      return;
    }

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData?.error?.message || "Cloudinary Upload Failed");
      }

      const data = await response.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong during file upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 rounded bg-background/50 border border-gold-primary/10">
      <div className="flex justify-between items-center select-none">
        <label className="text-[10px] uppercase font-extrabold tracking-widest text-gold-primary">
          {label}
        </label>
        
        {/* Toggle Settings */}
        <button
          type="button"
          onClick={() => setShowConfig(!showConfig)}
          className={`flex items-center gap-1 text-[9px] font-bold uppercase transition-colors px-1.5 py-0.5 rounded border ${
            showConfig 
              ? "bg-gold-primary/20 border-gold-primary/40 text-gold-light" 
              : "border-gold-primary/10 text-mutedText hover:text-gold-primary"
          }`}
        >
          <Settings size={10} />
          {showConfig ? "Close Setup" : "Cloudinary Setup"}
        </button>
      </div>

      {/* Settings Panel */}
      {showConfig && (
        <div className="flex flex-col gap-2 p-3 bg-background rounded border border-gold-primary/20 text-[10px]">
          <span className="text-gold-light font-bold">Unsigned Cloudinary Upload Setup</span>
          <p className="text-mutedText leading-relaxed">
            Direct upload from client requires an <strong>unsigned upload preset</strong> enabled in your Cloudinary Settings under the Upload tab.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="flex flex-col gap-1">
              <span className="text-mutedText">Cloud Name</span>
              <input
                type="text"
                value={cloudName}
                onChange={(e) => setCloudName(e.target.value)}
                placeholder="e.g. dxyz1234"
                className="w-full px-2 py-1 rounded bg-surface border border-gold-primary/20 focus:border-gold-primary/50 text-[10px] outline-none text-parchment"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-mutedText">Upload Preset</span>
              <input
                type="text"
                value={uploadPreset}
                onChange={(e) => setUploadPreset(e.target.value)}
                placeholder="e.g. preset_unsigned"
                className="w-full px-2 py-1 rounded bg-surface border border-gold-primary/20 focus:border-gold-primary/50 text-[10px] outline-none text-parchment"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => saveConfig(cloudName, uploadPreset)}
            className="mt-2 py-1 rounded bg-gold-primary text-background font-bold text-[9px] uppercase tracking-wider hover:brightness-110"
          >
            Save Credentials
          </button>
        </div>
      )}

      {/* Tabs selectors */}
      <div className="flex gap-2 border-b border-gold-primary/5 pb-2 mt-1 select-none">
        <button
          type="button"
          onClick={() => setActiveTab("link")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
            activeTab === "link"
              ? "bg-gold-primary/10 border border-gold-primary/20 text-gold-primary"
              : "text-mutedText hover:text-gold-light"
          }`}
        >
          <LinkIcon size={12} />
          Image Link (URL)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`flex items-center gap-1.5 px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
            activeTab === "upload"
              ? "bg-gold-primary/10 border border-gold-primary/20 text-gold-primary"
              : "text-mutedText hover:text-gold-light"
          }`}
        >
          <Upload size={12} />
          Upload File
        </button>
      </div>

      {/* Tab contents */}
      <div className="mt-2">
        {activeTab === "link" ? (
          <div className="flex flex-col gap-1">
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full px-3 py-2 rounded bg-background border border-gold-primary/20 focus:border-gold-primary/50 outline-none text-xs text-parchment font-mono"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-lg cursor-pointer bg-background/30 border-gold-primary/20 hover:bg-background/50 hover:border-gold-primary/40 transition-colors relative">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-5 h-5 rounded-full border border-gold-primary border-t-transparent animate-spin" />
                      <span className="text-[9px] font-bold uppercase text-gold-light">Uploading to Cloudinary...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 mb-1.5 text-gold-primary/70 animate-float" />
                      <p className="text-[9px] uppercase tracking-wider text-mutedText font-semibold">
                        Click to select image file
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            </div>

            {value && (
              <div className="flex items-center gap-2 mt-1.5 p-2 bg-surface rounded border border-green-500/10 text-xs">
                <Check className="text-green-400 flex-shrink-0" size={14} />
                <span className="text-[10px] text-mutedText truncate flex-grow font-mono">
                  {value}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value} alt="Preview" className="w-7 h-7 rounded object-cover border border-gold-primary/10" />
              </div>
            )}
          </div>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-1.5 mt-2 text-[10px] font-medium text-red-400 border border-red-500/10 bg-red-950/10 p-2 rounded">
          <AlertCircle size={12} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
