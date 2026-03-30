import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  variant?: "default" | "white";
}

const SIZES = {
  sm: { img: 28, text: "text-lg" },
  md: { img: 36, text: "text-2xl" },
  lg: { img: 48, text: "text-3xl" },
  xl: { img: 64, text: "text-4xl" },
};

export function Logo({ size = "md", href = "/", variant = "default" }: LogoProps) {
  const s = SIZES[size];
  const textColor = variant === "white" ? "text-white" : "text-ocean-800";
  const tmColor = variant === "white" ? "text-sky-300" : "text-sky-500";

  const content = (
    <span className="inline-flex items-center gap-2">
      <Image
        src="/images/logo.jpg"
        alt="CouthActs logo"
        width={s.img}
        height={s.img}
        className="rounded-lg object-contain"
      />
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
