"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Clock, AlertTriangle, Upload } from "lucide-react";

export default function VerifyBusinessPage() {
  const [loading, setLoading] = useState(true);
  const [kybStatus, setKybStatus] = useState<string | null>(null);
  const [insuranceUrl, setInsuranceUrl] = useState("");
  const [licenseUrl, setLicenseUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/providers/verify-business")
      .then((r) => r.json())
      .then((d) => {
        setKybStatus(d.kybStatus);
        setInsuranceUrl(d.insuranceCertUrl || "");
        setLicenseUrl(d.licenseUrl || "");
        setLoading(false);
      });
  }, []);

  async function handleFileUpload(
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (url: string) => void
  ) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setter(reader.result as string);
    reader.readAsDataURL(file);
  }

  async function submitDocuments() {
    setSubmitting(true);
    setError("");
    const res = await fetch("/api/providers/verify-business", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ insuranceCertUrl: insuranceUrl, licenseUrl: licenseUrl }),
    });
    const data = await res.json();
    if (res.ok) {
      setKybStatus(data.status);
    } else {
      setError(data.error || "Submission failed");
    }
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7]">
        <Navbar />
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <div className="h-8 w-48 mx-auto animate-pulse rounded-xl bg-[#E8E8ED]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-display font-bold tracking-tight text-[#1D1D1F]">
          Business Verification
        </h1>
        <p className="mt-2 text-[14px] text-[#6E6E73]">
          Submit your business documents for CouthActs&#8482; team review.
          You cannot bid on opportunities until your business is verified.
        </p>

        <div className="mt-8 rounded-3xl bg-white/80 backdrop-blur-xl p-8 shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60">
          {/* Status */}
          {kybStatus === "APPROVED" ? (
            <div className="flex items-center gap-3 rounded-xl bg-[#EEFBF1] p-4 border border-[#34C759]/20">
              <CheckCircle className="h-5 w-5 text-[#34C759]" />
              <div>
                <p className="text-[13px] font-semibold text-[#1D1D1F]">Business verified</p>
                <p className="text-[12px] text-[#34C759]">Your business is approved to bid on opportunities.</p>
              </div>
            </div>
          ) : kybStatus === "IN_REVIEW" ? (
            <div className="flex items-center gap-3 rounded-xl bg-[#FF9500]/5 p-4 border border-[#FF9500]/20 mb-6">
              <Clock className="h-5 w-5 text-[#FF9500]" />
              <div>
                <p className="text-[13px] font-semibold text-[#1D1D1F]">Documents under review</p>
                <p className="text-[12px] text-[#FF9500]">Our team will verify within 1-3 business days.</p>
              </div>
            </div>
          ) : kybStatus === "REJECTED" ? (
            <div className="flex items-center gap-3 rounded-xl bg-[#FFF1F0] p-4 border border-[#FF3B30]/20 mb-6">
              <AlertTriangle className="h-5 w-5 text-[#FF3B30]" />
              <div>
                <p className="text-[13px] font-semibold text-[#1D1D1F]">Verification rejected</p>
                <p className="text-[12px] text-[#FF3B30]">Please re-upload correct documents and try again.</p>
              </div>
            </div>
          ) : null}

          {kybStatus !== "APPROVED" && (
            <div className="space-y-6 mt-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#86868B] mb-3">
                  Required Documents
                </p>
                <p className="text-[14px] text-[#6E6E73] mb-4">
                  Upload copies of your transportation licenses, business registration,
                  and protection certificate. Accepted formats: PDF, JPG, PNG.
                </p>
              </div>

              {/* Insurance Certificate */}
              <div>
                <label className="block text-[12px] font-semibold text-[#1D1D1F] mb-2">
                  Insurance Certificate
                </label>
                {insuranceUrl ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#34C759]" />
                    <p className="text-[13px] text-[#34C759]">Document uploaded</p>
                    <button
                      onClick={() => setInsuranceUrl("")}
                      className="text-[12px] text-[#FF3B30] hover:text-[#FF3B30]/80"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E8E8ED] p-6 cursor-pointer hover:border-[#007AFF] hover:bg-[#007AFF]/5 transition">
                    <Upload className="h-5 w-5 text-[#86868B]" />
                    <span className="text-[13px] text-[#6E6E73]">Upload protection certificate</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, setInsuranceUrl)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Business License */}
              <div>
                <label className="block text-[12px] font-semibold text-[#1D1D1F] mb-2">
                  Business License / Registration
                </label>
                {licenseUrl ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-[#34C759]" />
                    <p className="text-[13px] text-[#34C759]">Document uploaded</p>
                    <button
                      onClick={() => setLicenseUrl("")}
                      className="text-[12px] text-[#FF3B30] hover:text-[#FF3B30]/80"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E8E8ED] p-6 cursor-pointer hover:border-[#007AFF] hover:bg-[#007AFF]/5 transition">
                    <Upload className="h-5 w-5 text-[#86868B]" />
                    <span className="text-[13px] text-[#6E6E73]">Upload business license</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, setLicenseUrl)}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {error && (
                <p className="text-[12px] text-[#FF3B30]">{error}</p>
              )}

              <Button
                onClick={submitDocuments}
                loading={submitting}
                disabled={!insuranceUrl && !licenseUrl}
                className="w-full"
                size="lg"
              >
                <Shield className="mr-2 h-4 w-4" />
                Submit for Verification
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
