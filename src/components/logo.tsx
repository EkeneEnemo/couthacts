import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  variant?: "default" | "white";
}

const SIZES = {
  sm: { img: 32, text: "text-lg", micro: "text-[5px]" },
  md: { img: 40, text: "text-2xl", micro: "text-[6px]" },
  lg: { img: 52, text: "text-3xl", micro: "text-[7px]" },
  xl: { img: 68, text: "text-4xl", micro: "text-[8px]" },
};

export function Logo({ size = "md", href = "/", variant = "default" }: LogoProps) {
  const s = SIZES[size];
  const textColor = variant === "white" ? "text-white" : "text-ocean-800";
  const tmColor = variant === "white" ? "text-sky-300" : "text-sky-500";
  const microBg = variant === "white" ? "bg-white/90 text-ocean-900" : "bg-ocean-900 text-white";

  const content = (
    <span className="inline-flex items-center gap-2.5">
      {/* Logo icon with branded micro-text */}
      <span className="relative inline-block flex-shrink-0" style={{ width: s.img, height: s.img }}>
        <Image
          src="/images/logo.jpg"
          alt="CouthActs logo"
          width={s.img}
          height={s.img}
          className="rounded-lg object-contain w-full h-full"
        />
        {/* Micro brand label */}
        <span
          className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 ${microBg} ${s.micro} font-bold tracking-wider px-1 py-px rounded-sm leading-none whitespace-nowrap`}
          style={{ fontFamily: "var(--font-figtree), system-ui, sans-serif" }}
        >
          COUTHACTS
        </span>
      </span>

      <span className={`font-display font-bold ${s.text} ${textColor} leading-none`}>
        CouthActs
        <span className={`${tmColor} text-[0.5em] align-super ml-0.5`}>&trade;</span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
