import type { Metadata } from "next";
import { requireAuth } from "@/lib/auth";
import { Navbar } from "@/components/navbar";
import { getOrCreateReferralCode, REFERRER_REWARD_USD, REFERRED_REWARD_USD } from "@/lib/referrals";
import { InvitePanel } from "./invite-panel";

export const metadata: Metadata = {
  title: `Give $${REFERRED_REWARD_USD}, get $${REFERRER_REWARD_USD} — invite friends to CouthActs`,
  description: `Share CouthActs with a friend. They get $${REFERRED_REWARD_USD} off their first move; you earn $${REFERRER_REWARD_USD} in wallet credit when they complete a booking.`,
  robots: { index: false, follow: false },
};

export default async function InvitePage() {
  const session = await requireAuth();
  const { code, redeemCount } = await getOrCreateReferralCode(session.user.id);
  const shareUrl = `https://www.couthacts.com/register?ref=${code}`;

  return (
    <div className="min-h-screen bg-[#FFFBF5]">
      <Navbar />

      <main id="main">
        <section className="relative overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-20">
          <div className="pointer-events-none absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[#FFD8B5]/50 blur-3xl" />
          <div className="pointer-events-none absolute top-10 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#B5E3FF]/50 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/3 h-[22rem] w-[22rem] rounded-full bg-[#FFB8C9]/40 blur-3xl" />

          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1D1D1F]/10 bg-white/70 backdrop-blur px-4 py-1.5 shadow-sm">
              <span className="text-base leading-none">🎁</span>
              <span className="text-[12px] font-semibold text-[#1D1D1F]/70 tracking-wide">
                Give ${REFERRED_REWARD_USD} · Get ${REFERRER_REWARD_USD}
              </span>
            </div>
            <h1 className="mt-6 font-display font-black leading-[1.02] tracking-tight text-[#1D1D1F] text-5xl sm:text-6xl">
              Share CouthActs.
              <br />
              <span className="bg-gradient-to-r from-[#FF7A59] via-[#FF6B9D] to-[#007AFF] bg-clip-text text-transparent">
                Earn credit.
              </span>
            </h1>
            <p className="mt-6 max-w-xl mx-auto text-[15px] text-[#1D1D1F]/60 leading-relaxed sm:text-[17px]">
              Send your invite code to a friend. They get ${REFERRED_REWARD_USD} off their first
              move. When their move is complete, we drop ${REFERRER_REWARD_USD} into your wallet.
              No cap.
            </p>

            <InvitePanel code={code} shareUrl={shareUrl} redeemCount={redeemCount} />

            <div className="mt-16 grid gap-4 sm:grid-cols-3 max-w-2xl mx-auto">
              {[
                { emoji: "📲", title: "Share", desc: "Copy your code or share the link with anyone." },
                { emoji: "📦", title: "They book", desc: "Friend signs up and books their first job." },
                { emoji: "💰", title: "Everyone wins", desc: `$${REFERRER_REWARD_USD} to you, $${REFERRED_REWARD_USD} to them, no limits.` },
              ].map((s) => (
                <div
                  key={s.title}
                  className="rounded-[1.5rem] bg-white/70 backdrop-blur border border-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl shadow-sm mx-auto">
                    {s.emoji}
                  </span>
                  <h3 className="mt-3 text-[14px] font-display font-bold text-[#1D1D1F]">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-[12px] text-[#1D1D1F]/55 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
