"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle } from "lucide-react";

export default function CompleteProfilePage() {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Please select a JPG or PNG image."); return; }
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5MB."); return; }

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const res = await fetch("/api/upload/avatar", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();
      if (data.success) {
        setAvatarUrl(data.avatarUrl);
        // Redirect to dashboard after short delay
        setTimeout(() => { window.location.href = "/dashboard"; }, 1500);
      } else {
        alert(data.error || "Upload failed");
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-md px-6 py-20">
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-center">
          {avatarUrl ? (
            <>
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h1 className="mt-4 text-xl font-display font-bold text-ocean-900">Profile complete!</h1>
              <p className="mt-2 text-sm text-gray-500">Redirecting to your dashboard...</p>
            </>
          ) : (
            <>
              <Camera className="mx-auto h-12 w-12 text-ocean-400" />
              <h1 className="mt-4 text-xl font-display font-bold text-ocean-900">Complete your profile</h1>
              <p className="mt-2 text-sm text-gray-500">
                Upload a professional headshot to access all CouthActs&#8482; features.
              </p>
              <div className="mt-6 space-y-3">
                <input ref={fileRef} type="file" accept="image/jpeg,image/png" onChange={handleUpload} className="hidden" />
                <Button className="w-full" size="lg" onClick={() => fileRef.current?.click()} loading={uploading}>
                  Upload Headshot
                </Button>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>Requirements:</p>
                  <ul className="list-disc pl-4 text-left">
                    <li>Clear photo of your face</li>
                    <li>JPG or PNG, max 5MB</li>
                    <li>No sunglasses, group photos, or logos</li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
