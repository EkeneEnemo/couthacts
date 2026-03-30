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
      <div className="min-h-screen bg-cream-100">
        <Navbar />
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <div className="h-8 w-48 mx-auto animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 py-10">
        <h1 className="text-2xl font-display font-bold text-ocean-900">
          Business Verification
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Submit your business documents for CouthActs&#8482; team review.
          You cannot bid on opportunities until your business is verified.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
          {/* Status */}
          {kybStatus === "APPROVED" ? (
            <div className="flex items-center gap-3 rounded-xl bg-green-50 p-4 border border-green-200">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Business verified</p>
                <p className="text-xs text-green-600">Your business is approved to bid on opportunities.</p>
              </div>
            </div>
          ) : kybStatus === "IN_REVIEW" ? (
            <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-4 border border-amber-200 mb-6">
              <Clock className="h-5 w-5 text-amber-600" />
              <div>
                <p className="text-sm font-medium text-amber-800">Documents under review</p>
                <p className="text-xs text-amber-600">Our team will verify within 1-3 business days.</p>
              </div>
            </div>
          ) : kybStatus === "REJECTED" ? (
            <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 border border-red-200 mb-6">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-red-800">Verification rejected</p>
                <p className="text-xs text-red-600">Please re-upload correct documents and try again.</p>
              </div>
            </div>
          ) : null}

          {kybStatus !== "APPROVED" && (
            <div className="space-y-6 mt-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-600 mb-3">
                  Required Documents
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Upload copies of your transportation licenses, business registration,
                  and insurance certificate. Accepted formats: PDF, JPG, PNG.
                </p>
              </div>

              {/* Insurance Certificate */}
              <div>
                <label className="block text-sm font-medium text-ocean-800 mb-2">
                  Insurance Certificate
                </label>
                {insuranceUrl ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-green-700">Document uploaded</p>
                    <button
                      onClick={() => setInsuranceUrl("")}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-6 cursor-pointer hover:border-sky-400 hover:bg-sky-50/50 transition">
                    <Upload className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload insurance certificate</span>
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
                <label className="block text-sm font-medium text-ocean-800 mb-2">
                  Business License / Registration
                </label>
                {licenseUrl ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p className="text-sm text-green-700">Document uploaded</p>
                    <button
                      onClick={() => setLicenseUrl("")}
                      className="text-xs text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-6 cursor-pointer hover:border-sky-400 hover:bg-sky-50/50 transition">
                    <Upload className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-500">Upload business license</span>
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
                <p className="text-sm text-red-500">{error}</p>
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
