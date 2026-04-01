"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { ArrowLeft, CheckCircle, Upload, Briefcase, MapPin } from "lucide-react";

const ROLES: Record<string, { title: string; location: string; type: string }> = {
  "senior-full-stack-engineer": { title: "Senior Full Stack Engineer", location: "Remote (US / EMEA)", type: "Full-time" },
  "growth-lead": { title: "Growth Lead", location: "Dallas, TX or Remote", type: "Full-time" },
  "enterprise-sales-manager": { title: "Enterprise Sales Manager", location: "Dallas, TX", type: "Full-time" },
  "operations-manager": { title: "Operations Manager", location: "Dallas, TX", type: "Full-time" },
  general: { title: "General Application", location: "Remote / Dallas, TX", type: "Full-time" },
};

function ApplyForm() {
  const params = useSearchParams();
  const roleSlug = params.get("role") || "general";
  const role = ROLES[roleSlug] || ROLES.general;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    coverLetter: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!resumeFile) {
      alert("Please upload your resume before submitting.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("role", role.title);
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("linkedin", form.linkedin);
      formData.append("portfolio", form.portfolio);
      formData.append("coverLetter", form.coverLetter);
      formData.append("resume", resumeFile);

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F5F7]">
        <Navbar />
        <div className="mx-auto max-w-xl px-4 py-20 sm:px-6 text-center">
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-10 sm:p-14">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EEFBF1] mx-auto">
              <CheckCircle className="h-8 w-8 text-[#34C759]" />
            </div>
            <h1 className="mt-6 text-2xl font-display font-bold text-[#1D1D1F] tracking-tight">
              Application submitted
            </h1>
            <p className="mt-3 text-[14px] text-[#6E6E73] leading-relaxed">
              Thank you for your interest in <strong className="text-[#1D1D1F]">{role.title}</strong> at CouthActs.
              Your application and resume have been received. Our team reviews every submission
              and will reach out if there&apos;s a fit.
            </p>
            <p className="mt-4 text-[13px] text-[#86868B]">
              You&apos;ll receive a confirmation at the email address you provided.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/careers"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#007AFF] px-6 py-3 text-[13px] font-semibold text-white hover:bg-[#0055D4] active:scale-[0.97] transition-all min-h-[44px]"
              >
                Back to Careers
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#E8E8ED] px-6 py-3 text-[13px] font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] active:scale-[0.97] transition-all min-h-[44px]"
              >
                Visit Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Back link */}
        <Link href="/careers" className="group inline-flex items-center gap-1.5 text-[13px] text-[#007AFF] hover:text-[#0055D4] transition-colors min-h-[44px]">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" /> Back to Careers
        </Link>

        {/* Role header */}
        <div className="mt-6 rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-6 sm:p-8">
          <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em]">Apply for</p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-[#1D1D1F] tracking-tight">
            {role.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] text-[#6E6E73]">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-[#86868B]" /> {role.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5 text-[#86868B]" /> {role.type}
            </span>
          </div>
        </div>

        {/* Application form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Personal info */}
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-6 sm:p-8">
            <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em] mb-5">Personal Information</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[12px] font-semibold text-[#1D1D1F] mb-1.5">First Name *</label>
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className="w-full rounded-xl border border-[#E8E8ED] bg-white/80 px-4 py-3 text-[14px] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15 transition-all"
                  placeholder="Jane"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#1D1D1F] mb-1.5">Last Name *</label>
                <input
                  required
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className="w-full rounded-xl border border-[#E8E8ED] bg-white/80 px-4 py-3 text-[14px] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15 transition-all"
                  placeholder="Doe"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#1D1D1F] mb-1.5">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="w-full rounded-xl border border-[#E8E8ED] bg-white/80 px-4 py-3 text-[14px] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15 transition-all"
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#1D1D1F] mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="w-full rounded-xl border border-[#E8E8ED] bg-white/80 px-4 py-3 text-[14px] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-6 sm:p-8">
            <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em] mb-5">Links</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-[12px] font-semibold text-[#1D1D1F] mb-1.5">LinkedIn</label>
                <input
                  type="url"
                  value={form.linkedin}
                  onChange={(e) => update("linkedin", e.target.value)}
                  className="w-full rounded-xl border border-[#E8E8ED] bg-white/80 px-4 py-3 text-[14px] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15 transition-all"
                  placeholder="linkedin.com/in/janedoe"
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-[#1D1D1F] mb-1.5">Portfolio / GitHub</label>
                <input
                  type="url"
                  value={form.portfolio}
                  onChange={(e) => update("portfolio", e.target.value)}
                  className="w-full rounded-xl border border-[#E8E8ED] bg-white/80 px-4 py-3 text-[14px] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15 transition-all"
                  placeholder="github.com/janedoe"
                />
              </div>
            </div>
          </div>

          {/* Resume + Cover letter */}
          <div className="rounded-3xl bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(0,0,0,.04)] border border-white/60 p-6 sm:p-8">
            <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-[0.12em] mb-5">Application</p>

            {/* Resume upload */}
            <div>
              <label className="block text-[12px] font-semibold text-[#1D1D1F] mb-1.5">Resume *</label>
              <label
                htmlFor="resume-upload"
                className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all min-h-[120px] ${
                  resumeFile
                    ? "border-[#34C759] bg-[#EEFBF1]/50"
                    : "border-[#E8E8ED] bg-[#F5F5F7]/50 hover:border-[#007AFF] hover:bg-[#007AFF]/[0.02]"
                }`}
              >
                {resumeFile ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-[#34C759]" />
                    <p className="mt-2 text-[13px] font-medium text-[#1D1D1F]">{resumeFile.name}</p>
                    <p className="mt-0.5 text-[11px] text-[#86868B]">
                      {(resumeFile.size / 1024 / 1024).toFixed(1)} MB &middot; Tap to replace
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className="h-6 w-6 text-[#C7C7CC]" />
                    <p className="mt-2 text-[13px] text-[#6E6E73]">
                      Tap to upload your resume
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#86868B]">
                      PDF, DOC, or DOCX &middot; Max 10 MB
                    </p>
                  </>
                )}
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.size <= 10 * 1024 * 1024) {
                      setResumeFile(file);
                    } else if (file) {
                      alert("File must be under 10 MB.");
                    }
                  }}
                />
              </label>
            </div>

            {/* Cover letter */}
            <div className="mt-5">
              <label className="block text-[12px] font-semibold text-[#1D1D1F] mb-1.5">Cover Letter *</label>
              <textarea
                required
                rows={6}
                value={form.coverLetter}
                onChange={(e) => update("coverLetter", e.target.value)}
                className="w-full rounded-xl border border-[#E8E8ED] bg-white/80 px-4 py-3 text-[14px] outline-none focus:border-[#007AFF] focus:ring-2 focus:ring-[#007AFF]/15 transition-all resize-none"
                placeholder={`Tell us why you're interested in ${role.title} at CouthActs and what you would bring to the team...`}
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-[#86868B]">
              By submitting, you agree to our <Link href="/privacy" className="text-[#007AFF] hover:text-[#0055D4]">Privacy Policy</Link>.
            </p>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#007AFF] px-8 py-3.5 text-[14px] font-semibold text-white hover:bg-[#0055D4] active:scale-[0.97] transition-all shadow-sm min-h-[48px] disabled:opacity-50 w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F5F5F7]">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-20 text-center">
          <div className="h-8 w-48 animate-pulse rounded-full bg-[#E8E8ED] mx-auto" />
        </div>
      </div>
    }>
      <ApplyForm />
    </Suspense>
  );
}
