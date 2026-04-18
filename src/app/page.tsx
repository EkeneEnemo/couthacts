import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { TrackInput } from "@/components/track-input";
import { AnimatedCounter } from "@/components/animated-counter";
import {
  ArrowRight,
  Shield,
  Zap,
  Eye,
  MapPin,
  Satellite,
  Radio,
  Fingerprint,
  Camera,
  Thermometer,
  Anchor,
  Plane,
  QrCode,
  GraduationCap,
  BookOpen,
  Award,
  Building2,
  Landmark,
  Code2,
  Heart,
  Package,
  Home,
  Briefcase,
  Sparkles,
  Smile,
  Sun,
  Lock,
  Scale,
  Waves,
  Car,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      {/* ═══════════════════════ 1. HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#FFFBF5] pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-36">
        {/* Soft gradient blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/50 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#B5E3FF]/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-[#FFB8C9]/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            {/* Left: copy */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
                <Sun className="h-3.5 w-3.5 text-[#FF9A3C]" />
                <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                  Hi there &mdash; welcome to the easy way
                </span>
              </div>

              <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                Hey. Let&rsquo;s
                <br />
                get it{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#007AFF] via-[#5AC8FA] to-[#34C759] bg-clip-text text-transparent">
                    there.
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-3 rounded-full bg-[#FFE3A3]/70 z-0" />
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-[#1D1D1F]/60 leading-relaxed sm:text-xl">
                A birthday gift across town. A whole apartment across the country. A
                container across the ocean. CouthActs is the{" "}
                <span className="font-semibold text-[#1D1D1F]/80">friendliest way</span>{" "}
                to move anything, anywhere &mdash; with real humans you can trust and
                your money safely held until it lands.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:shadow-[0_12px_40px_rgba(0,122,255,0.35)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  Let&rsquo;s move something
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/register?role=PROVIDER"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white/80 backdrop-blur px-8 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-white hover:scale-[1.03]"
                >
                  I drive / I deliver
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-[13px] text-[#1D1D1F]/50">
                <span className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-[#FF6B9D]" />
                  Free to join
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#34C759]" />
                  Money held safely
                </span>
                <span className="flex items-center gap-1.5">
                  <Smile className="h-3.5 w-3.5 text-[#FFB020]" />
                  Real humans
                </span>
              </div>
            </div>

            {/* Right: friendly collage */}
            <div className="animate-fade-up animation-delay-300 relative">
              <div className="relative grid grid-cols-6 grid-rows-6 gap-3 h-[32rem] lg:h-[36rem]">
                {/* Big happy moving photo */}
                <div className="relative col-span-4 row-span-4 overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                    alt="Bright sunny home ready for move-in"
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 backdrop-blur-md p-3 shadow-lg flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#34C759]/15">
                      <Home className="h-4 w-4 text-[#34C759]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#1D1D1F]">Movers arriving</p>
                      <p className="text-[10px] text-[#1D1D1F]/50">Tomorrow · 9:00 AM</p>
                    </div>
                    <span className="text-[10px] font-semibold text-[#34C759]">On the way</span>
                  </div>
                </div>

                {/* Package photo */}
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-[1.5rem] shadow-lg ring-1 ring-black/5">
                  <Image
                    src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=800&q=80"
                    alt="Package being delivered"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Yellow smile card */}
                <div className="col-span-2 row-span-2 rounded-[1.5rem] bg-[#FFE3A3] p-5 flex flex-col justify-between shadow-lg">
                  <Sparkles className="h-6 w-6 text-[#1D1D1F]" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1D1D1F]/60">
                      Today
                    </p>
                    <p className="mt-1 text-3xl font-display font-black text-[#1D1D1F] tabular-nums">
                      <AnimatedCounter end={4200} /> +
                    </p>
                    <p className="text-[11px] text-[#1D1D1F]/60">
                      moves in progress
                    </p>
                  </div>
                </div>

                {/* Road trip */}
                <div className="relative col-span-3 row-span-2 overflow-hidden rounded-[1.5rem] shadow-lg ring-1 ring-black/5">
                  <Image
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&q=80"
                    alt="Open road at sunset"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/40 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-white/80">On route</p>
                    <p className="text-[15px] font-display font-bold">Denver → Austin</p>
                  </div>
                </div>

                {/* Coral live-chip */}
                <div className="col-span-3 row-span-2 rounded-[1.5rem] bg-[#FF7A59] p-5 flex flex-col justify-between shadow-lg text-white">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-wider">
                      Live tracking
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] font-medium opacity-90">
                      &ldquo;Box arrived and mom loved it.&rdquo;
                    </p>
                    <p className="mt-2 text-[11px] opacity-70">— Priya, Chicago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating stats row */}
          <div className="mt-16 lg:mt-24 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { value: 190, suffix: "+", label: "Countries", color: "#007AFF" },
              { value: 18, suffix: "", label: "Ways to move", color: "#FF7A59" },
              { value: 100, suffix: "%", label: "Money-safe", color: "#34C759" },
              { value: 24, suffix: "/7", label: "Real support", color: "#FFB020" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 px-5 py-5 text-center shadow-[0_2px_16px_rgba(0,0,0,0.04)] hover-lift"
              >
                <p
                  className="text-3xl font-display font-black tabular-nums sm:text-4xl"
                  style={{ color: s.color }}
                >
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1D1D1F]/50">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 2. QUICK TRACK ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-3xl px-6 pb-16">
          <div className="rounded-[2rem] bg-gradient-to-br from-[#EAF4FF] via-white to-[#FFF1E3] p-8 sm:p-10 shadow-sm border border-white">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#007AFF]/10">
                <MapPin className="h-5 w-5 text-[#007AFF]" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-display font-bold text-[#1D1D1F] sm:text-2xl">
                  Got a tracking code?
                </h2>
                <p className="mt-1 text-[13px] text-[#1D1D1F]/55">
                  Peek at your stuff right now. No sign-in, no fuss.
                </p>
                <div className="mt-4">
                  <TrackInput />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 3. WHAT ARE YOU MOVING ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
              Pick your vibe
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              So, what are we moving today?
            </h2>
            <p className="mt-4 text-[15px] text-[#1D1D1F]/55">
              Eighteen ways to get it there. Pick the one that fits and we&rsquo;ll take
              it from there.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Around town",
                emoji: "🚕",
                count: "Taxi · Courier · Moving · Freight",
                tagline: "From groceries to grand pianos.",
                image: "https://images.unsplash.com/photo-1558980664-10ea5e6a0e04?w=1200&q=80",
                alt: "Friendly courier on a sunny street",
                color: "from-[#FF7A59] to-[#FFB020]",
                icon: Car,
              },
              {
                title: "Up in the air",
                emoji: "✈️",
                count: "Jets · Helicopters · Airlines · Cargo",
                tagline: "Window seat or window frame, we fly it.",
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
                alt: "Airplane wing over clouds at sunset",
                color: "from-[#5AC8FA] to-[#007AFF]",
                icon: Plane,
              },
              {
                title: "Out at sea",
                emoji: "⛵",
                count: "Cargo · Yacht · Ferry",
                tagline: "Calm seas and container ships.",
                image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200&q=80",
                alt: "Sailboat on calm sunny water",
                color: "from-[#34C759] to-[#5AC8FA]",
                icon: Waves,
              },
              {
                title: "Something special",
                emoji: "💎",
                count: "Rail · Armored · Medical · Hazmat · Oversized",
                tagline: "The stuff other platforms won&rsquo;t touch.",
                image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80",
                alt: "Scenic freight train through landscape",
                color: "from-[#FF6B9D] to-[#FF7A59]",
                icon: Sparkles,
              },
            ].map((v) => (
              <Link
                key={v.title}
                href="/register"
                className="group relative overflow-hidden rounded-[2rem] bg-white aspect-[16/10] shadow-[0_4px_30px_rgba(0,0,0,0.05)] ring-1 ring-black/5 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1"
              >
                <Image
                  src={v.image}
                  alt={v.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F] via-[#1D1D1F]/30 to-transparent" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40`}
                />

                <div className="absolute top-5 right-5 h-11 w-11 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur text-xl shadow-md">
                  {v.emoji}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="text-3xl font-display font-black text-white lg:text-4xl">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-white/80">{v.tagline}</p>
                  <p className="mt-3 text-[12px] text-white/60 font-medium">
                    {v.count}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-1.5 text-[12px] font-semibold text-[#1D1D1F] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    Let&rsquo;s go <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 4. MADE FOR YOUR MOMENTS ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Made for your moments
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Whatever the day brings.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Package,
                title: "Sending it",
                desc: "A birthday box to mom. A forgotten charger to your partner. We&rsquo;ll get it there today.",
                cta: "Send a package",
                color: "#FF7A59",
                bg: "#FFF1E8",
              },
              {
                icon: Home,
                title: "Moving in",
                desc: "First apartment, fifth house, or somewhere in between. Book verified movers with one tap.",
                cta: "Book movers",
                color: "#34C759",
                bg: "#E8F7EC",
              },
              {
                icon: Briefcase,
                title: "Running a biz",
                desc: "Pallets, containers, or a fleet of deliveries. Scale up without hiring a logistics team.",
                cta: "Ship at scale",
                color: "#007AFF",
                bg: "#E8F1FF",
              },
              {
                icon: Sparkles,
                title: "Going big",
                desc: "Private jet for the weekend. Yacht for the honeymoon. Armored transport for the art. Yes, really.",
                cta: "Go premium",
                color: "#FF6B9D",
                bg: "#FFE8F0",
              },
            ].map((s) => (
              <Link
                key={s.title}
                href="/register"
                className="group rounded-[2rem] bg-[#FFFBF5] p-7 transition-all hover:bg-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 border border-[#1D1D1F]/5"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110 group-hover:rotate-[-4deg]"
                  style={{ backgroundColor: s.bg }}
                >
                  <s.icon className="h-5 w-5" style={{ color: s.color }} />
                </div>
                <h3 className="mt-5 text-xl font-display font-bold text-[#1D1D1F]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] text-[#1D1D1F]/60 leading-relaxed">
                  {s.desc}
                </p>
                <div
                  className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
                  style={{ color: s.color }}
                >
                  {s.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 5. HOW IT WORKS ═══════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF4FF] via-[#FFFBF5] to-[#FFF1E3]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
              Easier than texting a friend
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Four taps. You&rsquo;re done.
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                num: "01",
                title: "Say what you need",
                desc: "A taxi? A courier? A container ship? Tell us in your own words.",
                emoji: "💬",
                color: "#FF7A59",
                bg: "#FFF1E8",
              },
              {
                num: "02",
                title: "Real people bid",
                desc: "Verified pros with real ratings compete for your job. Pick the one you like.",
                emoji: "👋",
                color: "#007AFF",
                bg: "#E8F1FF",
              },
              {
                num: "03",
                title: "Money held safely",
                desc: "Your funds sit in escrow. Nobody gets paid until you&rsquo;re happy.",
                emoji: "🔒",
                color: "#34C759",
                bg: "#E8F7EC",
              },
              {
                num: "04",
                title: "Watch it happen",
                desc: "Live map, photo check-ins, and a friendly ping when it arrives.",
                emoji: "📍",
                color: "#FF6B9D",
                bg: "#FFE8F0",
              },
            ].map((s) => (
              <div
                key={s.num}
                className="group relative rounded-[2rem] bg-white p-7 shadow-[0_4px_30px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-wider"
                    style={{ color: s.color }}
                  >
                    Step {s.num}
                  </span>
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[10deg]"
                    style={{ backgroundColor: s.bg }}
                  >
                    {s.emoji}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-display font-bold text-[#1D1D1F]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] text-[#1D1D1F]/55 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 6. PEACE OF MIND ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#34C759]">
                Peace of mind, included
              </p>
              <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
                We&rsquo;ve got your back.
                <br />
                <span className="text-[#1D1D1F]/50">Every single move.</span>
              </h2>
              <p className="mt-6 text-[15px] text-[#1D1D1F]/60 leading-relaxed max-w-md">
                Strangers on the internet? Not here. Every driver, mover, and pilot
                passes real ID checks. Your money is held safely until you say the
                word. And if something goes sideways, a real person steps in &mdash;
                not a chatbot.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "ID-verified",
                  "Escrow-safe",
                  "9-layer tracking",
                  "Real-human disputes",
                ].map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-2 text-[12px] font-semibold text-[#1D1D1F]/70 shadow-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Fingerprint,
                  title: "Real people, real IDs",
                  desc: "Every user passes government ID checks. Ghosts need not apply.",
                  color: "#007AFF",
                  bg: "#E8F1FF",
                },
                {
                  icon: Lock,
                  title: "Money held safely",
                  desc: "Your funds wait in escrow. The provider only gets paid when you&rsquo;re happy.",
                  color: "#34C759",
                  bg: "#E8F7EC",
                },
                {
                  icon: Eye,
                  title: "Know where it is",
                  desc: "GPS, photos, QR check-ins. Nine layers of &ldquo;yep, still on track.&rdquo;",
                  color: "#FF7A59",
                  bg: "#FFF1E8",
                },
                {
                  icon: Scale,
                  title: "Fair if it goes wrong",
                  desc: "Real people resolve disputes within 24 hours. Funds stay frozen till it&rsquo;s sorted.",
                  color: "#FF6B9D",
                  bg: "#FFE8F0",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-[1.5rem] bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)] hover:-translate-y-1"
                >
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: f.bg }}
                  >
                    <f.icon className="h-5 w-5" style={{ color: f.color }} />
                  </div>
                  <h3 className="mt-4 text-[15px] font-display font-bold text-[#1D1D1F]">
                    {f.title}
                  </h3>
                  <p
                    className="mt-2 text-[13px] text-[#1D1D1F]/55 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: f.desc }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 7. TRACKING LAYERS ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
              Always in the loop
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              You&rsquo;ll never wonder
              <br />
              <span className="text-[#007AFF]">&ldquo;where is it?&rdquo;</span>
            </h2>
            <p className="mt-4 text-[15px] text-[#1D1D1F]/55">
              Nine ways of keeping eyes on your stuff. Quietly, in the background.
            </p>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: MapPin, title: "Live GPS", desc: "Updates every 15 seconds.", color: "#007AFF" },
              { icon: Plane, title: "Flight tracking", desc: "Follow every wing in the sky.", color: "#5AC8FA" },
              { icon: Anchor, title: "Maritime AIS", desc: "Cargo ships and yacht charters on the map.", color: "#34C759" },
              { icon: QrCode, title: "QR / PIN confirm", desc: "Cryptographic proof at pickup & drop.", color: "#FF7A59" },
              { icon: Camera, title: "Photo check-ins", desc: "Timestamped, geotagged, shareable.", color: "#FFB020" },
              { icon: Thermometer, title: "Condition sensors", desc: "Temperature, humidity, shock — all logged.", color: "#FF6B9D" },
              { icon: Satellite, title: "Satellite GPS", desc: "GLONASS backup where cell won&rsquo;t reach.", color: "#007AFF" },
              { icon: Radio, title: "Geofence pings", desc: "Notified the moment it enters your zone.", color: "#34C759" },
              { icon: Eye, title: "Full timeline", desc: "Every checkpoint, exportable as PDF.", color: "#FF7A59" },
            ].map((t) => (
              <div
                key={t.title}
                className="group rounded-2xl bg-[#FFFBF5] p-5 transition-all hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 border border-[#1D1D1F]/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${t.color}18` }}
                  >
                    <t.icon className="h-4 w-4" style={{ color: t.color }} />
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#1D1D1F]">
                    {t.title}
                  </h3>
                </div>
                <p
                  className="mt-2 text-[12px] text-[#1D1D1F]/50 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: t.desc }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 8. FOR PROS (Advance + Academy) ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
              For the pros behind the wheel
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              Drivers. Movers. Pilots. We built this for you too.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Advance */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0B2E1E] via-[#0E3D27] to-[#0B2E1E] p-10 lg:p-12 text-white shadow-xl">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#34C759]/30 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#34C759]/15 px-4 py-1.5">
                  <Zap className="h-3.5 w-3.5 text-[#34C759]" />
                  <span className="text-[11px] font-semibold text-[#34C759] uppercase tracking-wider">
                    CouthActs Advance
                  </span>
                </div>
                <h3 className="mt-6 text-3xl font-display font-black sm:text-4xl">
                  Get paid. <span className="text-[#34C759]">Fast.</span>
                </h3>
                <p className="mt-4 text-[14px] text-white/65 leading-relaxed max-w-md">
                  Don&rsquo;t wait for the job to close. Elite providers can pull up to
                  70% of their escrow within 24 hours &mdash; so the next fuel tank,
                  next load, next week is always covered.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { v: "70%", l: "Advance rate" },
                    { v: "24h", l: "Funding speed" },
                    { v: "1%", l: "Lowest fee" },
                  ].map((s) => (
                    <div key={s.l} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <p className="text-2xl font-display font-black text-[#34C759] tabular-nums">{s.v}</p>
                      <p className="mt-1 text-[11px] text-white/50">{s.l}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href="/advance"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#34C759] px-7 py-3 text-[13px] font-semibold text-[#0B2E1E] transition-all hover:bg-white hover:scale-[1.03]"
                >
                  Learn about Advance <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Academy */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#FFF5E6] via-white to-[#FFE8F0] p-10 lg:p-12 shadow-xl border border-white">
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#FF6B9D]/20 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#FF6B9D]/10 px-4 py-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-[#FF6B9D]" />
                  <span className="text-[11px] font-semibold text-[#FF6B9D] uppercase tracking-wider">
                    CouthActs Academy
                  </span>
                </div>
                <h3 className="mt-6 text-3xl font-display font-black text-[#1D1D1F] sm:text-4xl">
                  Learn. <span className="text-[#FF6B9D]">Earn.</span> Repeat.
                </h3>
                <p className="mt-4 text-[14px] text-[#1D1D1F]/60 leading-relaxed max-w-md">
                  Short courses. Real certifications. Bigger jobs. Level up your score
                  and unlock the stuff everyone else can&rsquo;t touch.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    { icon: GraduationCap, title: "Transport Safety", meta: "12 modules · 4h", badge: "Cert" },
                    { icon: BookOpen, title: "Hazmat Handling", meta: "8 modules · 3h", badge: "Cert" },
                    { icon: Award, title: "Customer Excellence", meta: "6 modules · 2h", badge: "Boost" },
                  ].map((c) => (
                    <div key={c.title} className="flex items-center gap-4 rounded-2xl bg-white/80 backdrop-blur border border-white p-4 shadow-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B9D]/10 flex-shrink-0">
                        <c.icon className="h-4 w-4 text-[#FF6B9D]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#1D1D1F]">{c.title}</p>
                        <p className="text-[11px] text-[#1D1D1F]/50">{c.meta}</p>
                      </div>
                      <span className="rounded-full bg-[#FF6B9D]/10 px-2.5 py-1 text-[10px] font-semibold text-[#FF6B9D] uppercase tracking-wider">
                        {c.badge}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/academy"
                  className="mt-8 inline-flex items-center gap-2 text-[13px] font-semibold text-[#FF6B9D] hover:text-[#FF7A59]"
                >
                  Explore the Academy <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 9. BIG OPERATIONS (Enterprise + Gov) ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="rounded-[2.5rem] bg-[#1D1D1F] p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#007AFF]/10 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr_1fr] lg:items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5AC8FA]">
                  Big operations
                </p>
                <h2 className="mt-3 text-3xl font-display font-bold text-white sm:text-4xl">
                  Moving more?
                  <br />
                  We do that too.
                </h2>
                <p className="mt-4 text-[13px] text-white/50 leading-relaxed">
                  Whether you&rsquo;re a Fortune 500 or a federal agency, the
                  infrastructure scales. Same platform, serious tools.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Building2 className="h-6 w-6 text-[#5AC8FA]" />
                <h3 className="mt-4 text-xl font-display font-bold text-white">
                  Enterprise
                </h3>
                <p className="mt-2 text-[12px] text-white/50 leading-relaxed">
                  Volume pricing, dedicated teams, SSO, API webhooks, white-label
                  tracking.
                </p>
                <Link
                  href="/enterprise"
                  className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#5AC8FA] hover:text-white transition-colors"
                >
                  Contact sales <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Landmark className="h-6 w-6 text-[#5AC8FA]" />
                <h3 className="mt-4 text-xl font-display font-bold text-white">
                  Government
                </h3>
                <p className="mt-2 text-[12px] text-white/50 leading-relaxed">
                  FedRAMP-aligned controls, SAM.gov integration, full audit trail.
                </p>
                <Link
                  href="/government"
                  className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#5AC8FA] hover:text-white transition-colors"
                >
                  See solutions <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 10. DEVELOPERS ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#007AFF]">
            Builders welcome
          </p>
          <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
            Got code? Build on us.
          </h2>
          <p className="mt-4 text-[14px] text-[#1D1D1F]/55 max-w-xl mx-auto">
            A clean REST API, real-time webhooks, and a playground that doesn&rsquo;t
            hate you.
          </p>

          <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-[#1D1D1F] px-6 py-4 shadow-xl">
            <Code2 className="h-5 w-5 text-[#5AC8FA]" />
            <code className="text-[13px] text-[#5AC8FA] font-mono">
              POST /api/v1/jobs
            </code>
            <span className="text-[12px] text-white/40">
              &mdash; one request, done
            </span>
          </div>

          <div className="mt-8">
            <Link
              href="/api-docs"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#007AFF] hover:text-[#0055D4]"
            >
              Read the docs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 11. FINAL CTA ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#FFFBF5]">
        <div className="pointer-events-none absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-[#FFD8B5]/40 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#B5E3FF]/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 lg:py-32 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-[#1D1D1F]/10 px-4 py-1.5 shadow-sm">
            <Heart className="h-3.5 w-3.5 text-[#FF6B9D]" />
            <span className="text-[12px] font-semibold text-[#1D1D1F]/70">
              Free account. No credit card. No catch.
            </span>
          </div>

          <h2 className="mt-8 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl lg:text-7xl">
            So. Ready to
            <br />
            <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#007AFF] bg-clip-text text-transparent">
              move something?
            </span>
          </h2>

          <p className="mt-6 text-lg text-[#1D1D1F]/55 mx-auto max-w-xl">
            Sign up in under a minute. Post your first move in two more. Watch it
            happen from wherever you are.
          </p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-10 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(0,122,255,0.35)] sm:w-auto"
            >
              Start moving
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/register?role=PROVIDER"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#1D1D1F]/15 bg-white px-10 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-[#1D1D1F] hover:text-white sm:w-auto"
            >
              I drive / I deliver
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 12. FOOTER ═══════════════════════ */}
      <footer className="bg-[#1D1D1F]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Logo size="md" variant="white" href="/" />
              <p className="mt-5 text-[13px] text-white/40 leading-relaxed max-w-sm">
                The friendliest way to move anything, anywhere. 18 modes, 190+
                countries, and real humans you can trust.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <Heart className="h-4 w-4 text-[#FF6B9D]" />
                <span className="text-[12px] text-white/50">Made with care in Dallas, TX</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 lg:col-span-3">
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.12em]">
                  Platform
                </p>
                {[
                  { href: "/browse", label: "Browse Jobs" },
                  { href: "/register", label: "Get Started" },
                  { href: "/register?role=PROVIDER", label: "For Providers" },
                  { href: "/enterprise", label: "Enterprise" },
                  { href: "/government", label: "Government" },
                ].map((l) => (
                  <Link key={l.href + l.label} href={l.href} className="block text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.12em]">
                  Resources
                </p>
                {[
                  { href: "/about", label: "About" },
                  { href: "/academy", label: "Academy" },
                  { href: "/advance", label: "Advance" },
                  { href: "/api-docs", label: "API Docs" },
                  { href: "/login", label: "Sign In" },
                  { href: "/settings", label: "Settings" },
                  { href: "/careers", label: "Careers" },
                  { href: "/press", label: "Press" },
                  { href: "/help", label: "Help Center" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.12em]">
                  Legal
                </p>
                {[
                  { href: "/terms", label: "Terms of Service" },
                  { href: "/privacy", label: "Privacy Policy" },
                  { href: "/cookies", label: "Cookies" },
                  { href: "/acceptable-use", label: "Acceptable Use" },
                  { href: "/safety", label: "Safety" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} className="block text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-[11px] text-white/30">
              &copy; {new Date().getFullYear()} CouthActs&#8482;, Inc. Founded
              Nov. 27, 2021. All rights reserved.
            </p>
            <p className="text-[11px] text-white/30">
              The Adolphus Tower, Dallas, TX &middot; legal@couthacts.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
