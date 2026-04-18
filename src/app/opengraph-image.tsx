import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "CouthActs — Move Anything. Anywhere.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#FFFBF5",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, #FFD8B5 0%, transparent 40%), radial-gradient(circle at 85% 85%, #B5E3FF 0%, transparent 42%), radial-gradient(circle at 80% 20%, #FFE3A3 0%, transparent 35%), radial-gradient(circle at 20% 85%, #FFB8C9 0%, transparent 40%)",
          padding: 72,
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Left column — copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "56%",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* Wordmark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 26,
              fontWeight: 800,
              color: "#1D1D1F",
              letterSpacing: -0.5,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: "#1D1D1F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 24,
                fontWeight: 900,
              }}
            >
              C
            </div>
            CouthActs
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 84,
                fontWeight: 900,
                color: "#1D1D1F",
                lineHeight: 0.98,
                letterSpacing: -2.5,
                fontFamily: "serif",
              }}
            >
              Move anything.
            </div>
            <div
              style={{
                fontSize: 84,
                fontWeight: 900,
                color: "#1D1D1F",
                lineHeight: 0.98,
                letterSpacing: -2.5,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Anywhere.
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
              }}
            >
              <div
                style={{
                  fontSize: 84,
                  fontWeight: 900,
                  color: "#007AFF",
                  lineHeight: 0.98,
                  letterSpacing: -2.5,
                }}
              >
                Protected.
              </div>
            </div>

            {/* Coral accent bar */}
            <div
              style={{
                width: 120,
                height: 8,
                borderRadius: 4,
                backgroundColor: "#FF7A59",
                marginTop: 12,
              }}
            />

            <div
              style={{
                fontSize: 26,
                color: "#1D1D1F",
                opacity: 0.6,
                marginTop: 24,
                fontFamily: "sans-serif",
                lineHeight: 1.35,
                maxWidth: 560,
              }}
            >
              The friendliest way to move things across town or across the ocean.
            </div>
          </div>

          {/* Bottom chips */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { label: "🔒  Escrow-safe", bg: "#E8F7EC", color: "#34C759" },
              { label: "🪪  Verified humans", bg: "#E8F1FF", color: "#007AFF" },
              { label: "📍  Live tracking", bg: "#FFF1E8", color: "#FF7A59" },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 22px",
                  borderRadius: 999,
                  backgroundColor: c.bg,
                  color: c.color,
                  fontSize: 20,
                  fontWeight: 700,
                  fontFamily: "sans-serif",
                }}
              >
                {c.label}
              </div>
            ))}
          </div>
        </div>

        {/* Right column — 2x2 emoji mode tiles */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "40%",
            height: "100%",
            marginLeft: "auto",
            justifyContent: "center",
            gap: 18,
          }}
        >
          <div style={{ display: "flex", gap: 18 }}>
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: 36,
                backgroundColor: "#FFF1E8",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 120,
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              }}
            >
              🚕
            </div>
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: 36,
                backgroundColor: "#E8F1FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 120,
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                transform: "translateY(-20px)",
              }}
            >
              ✈️
            </div>
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: 36,
                backgroundColor: "#E8F7EC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 120,
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
                transform: "translateY(20px)",
              }}
            >
              ⛵
            </div>
            <div
              style={{
                width: 220,
                height: 220,
                borderRadius: 36,
                backgroundColor: "#FFE8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 120,
                boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
              }}
            >
              💎
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
