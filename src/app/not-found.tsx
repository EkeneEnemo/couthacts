import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <nav className="border-b border-[#E8E8ED]/60 bg-[#F5F5F7]/80 backdrop-blur-xl px-6 py-3.5">
        <Logo size="sm" />
      </nav>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-[80px] font-display font-bold text-[#1D1D1F] leading-none tracking-tight">404</p>
          <h1 className="mt-4 text-xl font-display font-bold text-[#1D1D1F] tracking-tight">
            Page not found
          </h1>
          <p className="mt-3 text-[14px] text-[#6E6E73] leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#007AFF] px-6 py-3 text-[13px] font-semibold text-white hover:bg-[#0055D4] active:scale-[0.97] transition-all min-h-[44px]"
            >
              Go home
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center justify-center rounded-full border border-[#E8E8ED] px-6 py-3 text-[13px] font-semibold text-[#1D1D1F] hover:bg-white active:scale-[0.97] transition-all min-h-[44px]"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
