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
  Home,
  Sparkles,
  Smile,
  Sun,
  Waves,
  Car,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { LiveActivity } from "@/components/live-activity";
import { SmartSearch } from "@/components/smart-search";
import { getTranslations } from "next-intl/server";

export default async function LandingPage() {
  const t = await getTranslations("home");
  const tFooter = await getTranslations("home.footer");
  const tCommon = await getTranslations("common");

  const verticals = [
    {
      title: t("moving.aroundTown.title"),
      emoji: "🚕",
      count: t("moving.aroundTown.count"),
      tagline: t("moving.aroundTown.tagline"),
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80",
      alt: t("moving.aroundTown.title"),
      color: "from-[#FF7A59] to-[#FFB020]",
      icon: Car,
    },
    {
      title: t("moving.air.title"),
      emoji: "✈️",
      count: t("moving.air.count"),
      tagline: t("moving.air.tagline"),
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80",
      alt: t("moving.air.title"),
      color: "from-[#5AC8FA] to-[#007AFF]",
      icon: Plane,
    },
    {
      title: t("moving.sea.title"),
      emoji: "⛵",
      count: t("moving.sea.count"),
      tagline: t("moving.sea.tagline"),
      image: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=1200&q=80",
      alt: t("moving.sea.title"),
      color: "from-[#34C759] to-[#5AC8FA]",
      icon: Waves,
    },
    {
      title: t("moving.special.title"),
      emoji: "💎",
      count: t("moving.special.count"),
      tagline: t("moving.special.tagline"),
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80",
      alt: t("moving.special.title"),
      color: "from-[#FF6B9D] to-[#FF7A59]",
      icon: Sparkles,
    },
  ];

  const moments = [
    {
      emoji: "📦",
      title: t("moments.sending.title"),
      desc: t("moments.sending.desc"),
      cta: t("moments.sending.cta"),
      color: "#FF7A59",
      image: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=1000&q=80",
      alt: t("moments.sending.title"),
    },
    {
      emoji: "🏡",
      title: t("moments.moving.title"),
      desc: t("moments.moving.desc"),
      cta: t("moments.moving.cta"),
      color: "#34C759",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=80",
      alt: t("moments.moving.title"),
    },
    {
      emoji: "💼",
      title: t("moments.business.title"),
      desc: t("moments.business.desc"),
      cta: t("moments.business.cta"),
      color: "#007AFF",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80",
      alt: t("moments.business.title"),
    },
    {
      emoji: "✨",
      title: t("moments.premium.title"),
      desc: t("moments.premium.desc"),
      cta: t("moments.premium.cta"),
      color: "#FF6B9D",
      image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1000&q=80",
      alt: t("moments.premium.title"),
    },
  ];

  const steps = [
    { num: "01", title: t("how.step1.title"), desc: t("how.step1.desc"), emoji: "💬", color: "#FF7A59", bg: "#FFF1E8" },
    { num: "02", title: t("how.step2.title"), desc: t("how.step2.desc"), emoji: "👋", color: "#007AFF", bg: "#E8F1FF" },
    { num: "03", title: t("how.step3.title"), desc: t("how.step3.desc"), emoji: "🔒", color: "#34C759", bg: "#E8F7EC" },
    { num: "04", title: t("how.step4.title"), desc: t("how.step4.desc"), emoji: "📍", color: "#FF6B9D", bg: "#FFE8F0" },
  ];

  const features = [
    { emoji: "🪪", title: t("peace.feature1.title"), desc: t("peace.feature1.desc"), color: "#007AFF", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&q=80" },
    { emoji: "🔐", title: t("peace.feature2.title"), desc: t("peace.feature2.desc"), color: "#34C759", image: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=1000&q=80" },
    { emoji: "📍", title: t("peace.feature3.title"), desc: t("peace.feature3.desc"), color: "#FF7A59", image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1000&q=80" },
    { emoji: "🤝", title: t("peace.feature4.title"), desc: t("peace.feature4.desc"), color: "#FF6B9D", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1000&q=80" },
  ];

  const trackingLayers = [
    { icon: MapPin, title: t("tracking.gps.title"), desc: t("tracking.gps.desc"), color: "#007AFF" },
    { icon: Plane, title: t("tracking.flight.title"), desc: t("tracking.flight.desc"), color: "#5AC8FA" },
    { icon: Anchor, title: t("tracking.maritime.title"), desc: t("tracking.maritime.desc"), color: "#34C759" },
    { icon: QrCode, title: t("tracking.qr.title"), desc: t("tracking.qr.desc"), color: "#FF7A59" },
    { icon: Camera, title: t("tracking.photo.title"), desc: t("tracking.photo.desc"), color: "#FFB020" },
    { icon: Thermometer, title: t("tracking.sensors.title"), desc: t("tracking.sensors.desc"), color: "#FF6B9D" },
    { icon: Satellite, title: t("tracking.satellite.title"), desc: t("tracking.satellite.desc"), color: "#007AFF" },
    { icon: Radio, title: t("tracking.geofence.title"), desc: t("tracking.geofence.desc"), color: "#34C759" },
    { icon: Eye, title: t("tracking.timeline.title"), desc: t("tracking.timeline.desc"), color: "#FF7A59" },
  ];

  const statsMeta = [
    { value: 190, suffix: "+", label: t("countries"), color: "#007AFF" },
    { value: 18, suffix: "", label: t("waysToMove"), color: "#FF7A59" },
    { value: 100, suffix: "%", label: t("moneySafe"), color: "#34C759" },
    { value: 24, suffix: "/7", label: t("realSupport"), color: "#FFB020" },
  ];

  const peaceChips = [
    t("peace.chipIdVerified"),
    t("peace.chipEscrowSafe"),
    t("peace.chipTracking"),
    t("peace.chipDisputes"),
  ];

  const footerLinks = {
    platform: [
      { href: "/browse", label: tFooter("links.browseJobs") },
      { href: "/register", label: tFooter("links.getStarted") },
      { href: "/register?role=PROVIDER", label: tFooter("links.forProviders") },
      { href: "/enterprise", label: tFooter("links.enterprise") },
      { href: "/government", label: tFooter("links.government") },
    ],
    resources: [
      { href: "/about", label: tFooter("links.about") },
      { href: "/academy", label: tFooter("links.academy") },
      { href: "/advance", label: tFooter("links.advance") },
      { href: "/api-docs", label: tFooter("links.apiDocs") },
      { href: "/login", label: tFooter("links.signIn") },
      { href: "/settings", label: tFooter("links.settings") },
      { href: "/careers", label: tFooter("links.careers") },
      { href: "/press", label: tFooter("links.press") },
      { href: "/help", label: tFooter("links.help") },
    ],
    legal: [
      { href: "/terms", label: tFooter("links.terms") },
      { href: "/privacy", label: tFooter("links.privacy") },
      { href: "/cookies", label: tFooter("links.cookies") },
      { href: "/acceptable-use", label: tFooter("links.acceptableUse") },
      { href: "/safety", label: tFooter("links.safety") },
    ],
  };

  const advanceStats = [
    { v: "70%", l: t("pros.advanceStat1") },
    { v: "24h", l: t("pros.advanceStat2") },
    { v: "1%", l: t("pros.advanceStat3") },
  ];

  const academyCourses = [
    { icon: GraduationCap, title: t("pros.courseSafety"), meta: "12 modules · 4h", badge: t("pros.courseCert") },
    { icon: BookOpen, title: t("pros.courseHazmat"), meta: "8 modules · 3h", badge: t("pros.courseCert") },
    { icon: Award, title: t("pros.courseExcellence"), meta: "6 modules · 2h", badge: t("pros.courseBoost") },
  ];

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      <main id="main">
      {/* ═══════════════════════ 1. HERO ═══════════════════════ */}
      <section className="relative overflow-hidden bg-[#FFFBF5] pt-20 pb-20 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-36">
        <div className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/50 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#B5E3FF]/50 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-[#FFB8C9]/40 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
                <Sun className="h-3.5 w-3.5 text-[#FF9A3C]" aria-hidden="true" />
                <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                  {t("heroBadge")}
                </span>
              </div>

              <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-5xl sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
                {t("heroTitle")}
                <br />
                {t("heroTitleLine2")}{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#007AFF] via-[#5AC8FA] to-[#34C759] bg-clip-text text-transparent">
                    {t("heroTitleHighlight")}
                  </span>
                  <span className="absolute -bottom-1 left-0 right-0 h-3 rounded-full bg-[#FFE3A3]/70 z-0" />
                </span>
              </h1>

              <p
                className="mt-6 max-w-xl text-lg text-[#1D1D1F]/60 leading-relaxed sm:text-xl"
                dangerouslySetInnerHTML={{ __html: t.raw("heroSub") as string }}
              />

              <div className="mt-8">
                <SmartSearch />
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:shadow-[0_12px_40px_rgba(0,122,255,0.35)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  {t("letsMoveSomething")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/register?role=PROVIDER"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1D1D1F]/15 bg-white/80 backdrop-blur px-8 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-white hover:scale-[1.03]"
                >
                  {t("iDrive")}
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-[13px] text-[#1D1D1F]/50">
                <span className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-[#FF6B9D]" aria-hidden="true" />
                  {t("freeToJoin")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#34C759]" aria-hidden="true" />
                  {t("moneyHeldSafely")}
                </span>
                <span className="flex items-center gap-1.5">
                  <Smile className="h-3.5 w-3.5 text-[#FFB020]" aria-hidden="true" />
                  {t("realHumans")}
                </span>
              </div>
            </div>

            {/* Right: friendly collage */}
            <div className="animate-fade-up animation-delay-300 relative">
              <div className="relative grid grid-cols-6 grid-rows-6 gap-3 h-[32rem] lg:h-[36rem]">
                <div className="relative col-span-4 row-span-4 overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-black/5">
                  <Image
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
                    alt=""
                    fill
                    priority
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 backdrop-blur-md p-3 shadow-lg flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#34C759]/15">
                      <Home className="h-4 w-4 text-[#34C759]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold text-[#1D1D1F]">{t("moments.moving.title")}</p>
                      <p className="text-[10px] text-[#1D1D1F]/50">{t("how.step4.title")}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-[#34C759]">{t("peace.chipTracking")}</span>
                  </div>
                </div>

                <div className="relative col-span-2 row-span-4 overflow-hidden rounded-[1.5rem] shadow-lg ring-1 ring-black/5">
                  <Image
                    src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=800&q=80"
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/50 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-2xl bg-white/95 backdrop-blur text-lg shadow-md">
                    📦
                  </div>
                </div>

                <div className="relative col-span-3 row-span-2 overflow-hidden rounded-[1.5rem] shadow-lg ring-1 ring-black/5">
                  <Image
                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1000&q=80"
                    alt=""
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1D1D1F]/40 via-transparent to-transparent" />
                </div>

                <div className="col-span-3 row-span-2 rounded-[1.5rem] bg-[#FF7A59] p-5 flex flex-col justify-between shadow-lg text-white">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/80" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    <p className="text-[11px] font-semibold uppercase tracking-wider">
                      {t("peace.chipTracking")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live activity ticker */}
          <div className="mt-12 lg:mt-16 flex justify-center">
            <LiveActivity />
          </div>

          {/* Stats row */}
          <div className="mt-10 lg:mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {statsMeta.map((s) => (
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
                <MapPin className="h-5 w-5 text-[#007AFF]" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-display font-bold text-[#1D1D1F] sm:text-2xl">
                  {t("track.title")}
                </h2>
                <p className="mt-1 text-[13px] text-[#1D1D1F]/55">{t("track.sub")}</p>
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
              {t("moving.label")}
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              {t("moving.title")}
            </h2>
            <p className="mt-4 text-[15px] text-[#1D1D1F]/55">{t("moving.sub")}</p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {verticals.map((v) => (
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
                <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-40`} />
                <div className="absolute top-5 right-5 h-11 w-11 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur text-xl shadow-md">
                  {v.emoji}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <h3 className="text-3xl font-display font-black text-white lg:text-4xl">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-white/80">{v.tagline}</p>
                  <p className="mt-3 text-[12px] text-white/60 font-medium">{v.count}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-1.5 text-[12px] font-semibold text-[#1D1D1F] opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {tCommon("letsGo")} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
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
              {t("moments.label")}
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              {t("moments.title")}
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {moments.map((s) => (
              <Link
                key={s.title}
                href="/register"
                className="group relative overflow-hidden rounded-[2rem] bg-white transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:-translate-y-1 border border-[#1D1D1F]/5 flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
                  <span className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/95 backdrop-blur text-2xl shadow-lg transition-transform group-hover:rotate-[-8deg] group-hover:scale-110">
                    {s.emoji}
                  </span>
                </div>
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-display font-bold text-[#1D1D1F]">{s.title}</h3>
                  <p className="mt-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed flex-1">
                    {s.desc}
                  </p>
                  <div
                    className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
                    style={{ color: s.color }}
                  >
                    {s.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
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
              {t("how.label")}
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              {t("how.title")}
            </h2>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.num}
                className="group relative rounded-[2rem] bg-white p-7 shadow-[0_4px_30px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: s.color }}>
                    {s.num}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl text-xl transition-transform group-hover:rotate-[10deg]" style={{ backgroundColor: s.bg }}>
                    {s.emoji}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-display font-bold text-[#1D1D1F]">{s.title}</h3>
                <p className="mt-2 text-[13px] text-[#1D1D1F]/55 leading-relaxed">{s.desc}</p>
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
                {t("peace.label")}
              </p>
              <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
                {t("peace.title")}
                <br />
                <span className="text-[#1D1D1F]/50">{t("peace.titleSub")}</span>
              </h2>
              <p className="mt-6 text-[15px] text-[#1D1D1F]/60 leading-relaxed max-w-md">
                {t("peace.body")}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {peaceChips.map((chip) => (
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
              {features.map((f) => (
                <div
                  key={f.title}
                  className="group overflow-hidden rounded-[1.5rem] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_16px_44px_rgba(0,0,0,0.10)] hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={f.image}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                    <span className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/95 backdrop-blur text-xl shadow-md transition-transform group-hover:rotate-[-8deg] group-hover:scale-110">
                      {f.emoji}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-[15px] font-display font-bold" style={{ color: f.color }}>
                      {f.title}
                    </h3>
                    <p className="mt-2 text-[13px] text-[#1D1D1F]/60 leading-relaxed">{f.desc}</p>
                  </div>
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
              {t("tracking.label")}
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              {t("tracking.title")}
              <br />
              <span className="text-[#007AFF]">{t("tracking.titleHighlight")}</span>
            </h2>
            <p className="mt-4 text-[15px] text-[#1D1D1F]/55">{t("tracking.sub")}</p>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trackingLayers.map((tl) => (
              <div
                key={tl.title}
                className="group rounded-2xl bg-[#FFFBF5] p-5 transition-all hover:bg-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 border border-[#1D1D1F]/5"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${tl.color}18` }}
                  >
                    <tl.icon className="h-4 w-4" style={{ color: tl.color }} aria-hidden="true" />
                  </div>
                  <h3 className="text-[14px] font-semibold text-[#1D1D1F]">{tl.title}</h3>
                </div>
                <p className="mt-2 text-[12px] text-[#1D1D1F]/50 leading-relaxed">{tl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 8. FOR PROS ═══════════════════════ */}
      <section className="bg-[#FFFBF5]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF7A59]">
              {t("pros.label")}
            </p>
            <h2 className="mt-3 text-4xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-5xl">
              {t("pros.title")}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Advance */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0B2E1E] via-[#0E3D27] to-[#0B2E1E] p-10 lg:p-12 text-white shadow-xl">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#34C759]/30 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#34C759]/15 px-4 py-1.5">
                  <Zap className="h-3.5 w-3.5 text-[#34C759]" aria-hidden="true" />
                  <span className="text-[11px] font-semibold text-[#34C759] uppercase tracking-wider">
                    {t("pros.advanceBadge")}
                  </span>
                </div>
                <h3 className="mt-6 text-3xl font-display font-black sm:text-4xl">
                  {t("pros.advanceTitle")} <span className="text-[#34C759]">{t("pros.advanceTitleFast")}</span>
                </h3>
                <p className="mt-4 text-[14px] text-white/65 leading-relaxed max-w-md">
                  {t("pros.advanceBody")}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {advanceStats.map((s) => (
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
                  {t("pros.advanceCta")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Academy */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#FFF5E6] via-white to-[#FFE8F0] p-10 lg:p-12 shadow-xl border border-white">
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#FF6B9D]/20 blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#FF6B9D]/10 px-4 py-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-[#FF6B9D]" aria-hidden="true" />
                  <span className="text-[11px] font-semibold text-[#FF6B9D] uppercase tracking-wider">
                    {t("pros.academyBadge")}
                  </span>
                </div>
                <h3 className="mt-6 text-3xl font-display font-black text-[#1D1D1F] sm:text-4xl">
                  {t("pros.academyTitle")} <span className="text-[#FF6B9D]">{t("pros.academyTitleEarn")}</span> {t("pros.academyTitleRepeat")}
                </h3>
                <p className="mt-4 text-[14px] text-[#1D1D1F]/60 leading-relaxed max-w-md">
                  {t("pros.academyBody")}
                </p>

                <div className="mt-8 space-y-3">
                  {academyCourses.map((c) => (
                    <div key={c.title} className="flex items-center gap-4 rounded-2xl bg-white/80 backdrop-blur border border-white p-4 shadow-sm">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B9D]/10 flex-shrink-0">
                        <c.icon className="h-4 w-4 text-[#FF6B9D]" aria-hidden="true" />
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
                  {t("pros.academyCta")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 9. BIG OPERATIONS ═══════════════════════ */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <div className="rounded-[2.5rem] bg-[#1D1D1F] p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#007AFF]/10 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1fr_1fr] lg:items-start">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5AC8FA]">
                  {t("bigOps.label")}
                </p>
                <h2 className="mt-3 text-3xl font-display font-bold text-white sm:text-4xl">
                  {t("bigOps.title")}
                  <br />
                  {t("bigOps.titleSub")}
                </h2>
                <p className="mt-4 text-[13px] text-white/50 leading-relaxed">{t("bigOps.body")}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Building2 className="h-6 w-6 text-[#5AC8FA]" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-display font-bold text-white">{t("bigOps.enterpriseTitle")}</h3>
                <p className="mt-2 text-[12px] text-white/50 leading-relaxed">{t("bigOps.enterpriseBody")}</p>
                <Link
                  href="/enterprise"
                  className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#5AC8FA] hover:text-white transition-colors"
                >
                  {tCommon("contactSales")} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <Landmark className="h-6 w-6 text-[#5AC8FA]" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-display font-bold text-white">{t("bigOps.governmentTitle")}</h3>
                <p className="mt-2 text-[12px] text-white/50 leading-relaxed">{t("bigOps.governmentBody")}</p>
                <Link
                  href="/government"
                  className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#5AC8FA] hover:text-white transition-colors"
                >
                  {tCommon("seeSolutions")} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
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
            {t("devs.label")}
          </p>
          <h2 className="mt-3 text-3xl font-display font-bold tracking-tight text-[#1D1D1F] sm:text-4xl">
            {t("devs.title")}
          </h2>
          <p className="mt-4 text-[14px] text-[#1D1D1F]/55 max-w-xl mx-auto">{t("devs.body")}</p>

          <div className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-[#1D1D1F] px-6 py-4 shadow-xl">
            <Code2 className="h-5 w-5 text-[#5AC8FA]" aria-hidden="true" />
            <code className="text-[13px] text-[#5AC8FA] font-mono">POST /api/v1/jobs</code>
            <span className="text-[12px] text-white/40">{t("devs.codeNote")}</span>
          </div>

          <div className="mt-8">
            <Link
              href="/api-docs"
              className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#007AFF] hover:text-[#0055D4]"
            >
              {tCommon("readTheDocs")} <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
            <Heart className="h-3.5 w-3.5 text-[#FF6B9D]" aria-hidden="true" />
            <span className="text-[12px] font-semibold text-[#1D1D1F]/70">{t("finalCta.badge")}</span>
          </div>

          <h2 className="mt-8 text-5xl font-display font-black tracking-tight text-[#1D1D1F] sm:text-6xl lg:text-7xl">
            {t("finalCta.title")}
            <br />
            <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#007AFF] bg-clip-text text-transparent">
              {t("finalCta.titleHighlight")}
            </span>
          </h2>

          <p className="mt-6 text-lg text-[#1D1D1F]/55 mx-auto max-w-xl">{t("finalCta.body")}</p>

          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-10 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(29,29,31,0.25)] transition-all hover:bg-[#007AFF] hover:scale-[1.03] hover:shadow-[0_12px_40px_rgba(0,122,255,0.35)] sm:w-auto"
            >
              {t("finalCta.cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link
              href="/register?role=PROVIDER"
              className="inline-flex w-full items-center justify-center rounded-full border border-[#1D1D1F]/15 bg-white px-10 py-4 text-[15px] font-semibold text-[#1D1D1F] transition-all hover:bg-[#1D1D1F] hover:text-white sm:w-auto"
            >
              {t("iDrive")}
            </Link>
          </div>
        </div>
      </section>

      </main>

      {/* ═══════════════════════ 12. FOOTER ═══════════════════════ */}
      <footer className="bg-[#1D1D1F]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <Logo size="md" variant="white" href="/" />
              <p className="mt-5 text-[13px] text-white/40 leading-relaxed max-w-sm">
                {tFooter("tagline")}
              </p>
              <div className="mt-6 flex items-center gap-2">
                <Heart className="h-4 w-4 text-[#FF6B9D]" aria-hidden="true" />
                <span className="text-[12px] text-white/50">{tFooter("madeWithCare")}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-8 lg:col-span-3">
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.12em]">
                  {tFooter("platform")}
                </p>
                {footerLinks.platform.map((l) => (
                  <Link key={l.href + l.label} href={l.href} className="block text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.12em]">
                  {tFooter("resources")}
                </p>
                {footerLinks.resources.map((l) => (
                  <Link key={l.href} href={l.href} className="block text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
              <div className="space-y-3 text-[13px]">
                <p className="text-[10px] font-semibold text-white/60 uppercase tracking-[0.12em]">
                  {tFooter("legal")}
                </p>
                {footerLinks.legal.map((l) => (
                  <Link key={l.href} href={l.href} className="block text-white/40 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-[11px] text-white/30 max-w-2xl leading-relaxed">
              &copy; {new Date().getFullYear()} {tFooter("ownership")}
            </p>
            <p className="text-[11px] text-white/30 sm:text-right">
              {tFooter("address")} · {tFooter("contact")}
            </p>
          </div>
          <p className="mt-3 text-[10px] text-white/25 leading-relaxed">
            {tFooter("trademarks")}
          </p>
        </div>
      </footer>
    </div>
  );
}
