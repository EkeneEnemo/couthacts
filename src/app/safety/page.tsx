import { Navbar } from "@/components/navbar";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Heart } from "lucide-react";
export const metadata = { title: "Safety Center — CouthActs™" };
export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-cream-50">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-display font-bold text-ocean-900">Safety Center</h1>
        <p className="mt-4 text-base text-gray-500">Your safety is the foundation of the CouthActs&#8482; platform. Every feature is designed to protect you.</p>
        <div className="mt-10 space-y-6">
          {[
            { icon: AlertTriangle, title: "SOS Emergency Response", desc: "For passenger modes (taxi, limo, medical, armored), an SOS button is available during active rides. One tap alerts our safety team with your exact GPS coordinates. The provider's account is immediately frozen pending investigation.", color: "text-red-500" },
            { icon: Shield, title: "Identity Verification", desc: "Every user and provider on CouthActs must pass Persona government ID verification. Your name is matched against your government-issued photo ID. Unverified users cannot post jobs or bid on opportunities.", color: "text-ocean-600" },
            { icon: Lock, title: "Escrow Protection", desc: "Customer funds are held in escrow from the moment a job is posted. The provider is paid only when both parties confirm completion. If a dispute is filed, funds are frozen until resolution.", color: "text-sky-600" },
            { icon: Eye, title: "Real-Time Tracking", desc: "Live GPS tracking for ground transport, QR/PIN delivery confirmation, and a full checkpoint timeline. Every job can be tracked publicly with just a tracking code — no login required.", color: "text-green-600" },
            { icon: Heart, title: "Insurance Options", desc: "Five insurance tiers from No Coverage to Elite Protection (up to full declared value). Elite Protection is mandatory for hazmat, oversized, armored, medical, private jet, and yacht charter jobs.", color: "text-purple-600" },
            { icon: CheckCircle, title: "Dispute Resolution", desc: "Evidence upload, escrow freeze, and admin-mediated resolution. Our team reviews disputes within 24 hours. Funds don't move until the dispute is resolved.", color: "text-amber-600" },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <f.icon className={`h-6 w-6 ${f.color}`} />
                <h2 className="text-base font-display font-semibold text-ocean-900">{f.title}</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-sm text-gray-500">Safety concerns: <a href="mailto:safety@couthacts.com" className="text-ocean-600 font-medium">safety@couthacts.com</a></p>
      </div>
    </div>
  );
}
