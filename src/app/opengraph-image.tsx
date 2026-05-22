import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Smartech Group";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #073B4A 0%, #064456 60%, #0E6E78 100%)",
          color: "white",
          fontFamily: "system-ui",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 600,
            height: 600,
            borderRadius: "100%",
            background: "rgba(57,210,192,0.25)",
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 36,
            fontWeight: 800,
            color: "#39D2C0",
          }}
        >
          smartech.
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 78,
            fontWeight: 900,
            lineHeight: 1.05,
            maxWidth: 1000,
          }}
        >
          نبني الأنظمة ونصنع المحتوى
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 30,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 900,
          }}
        >
          شركة سعودية تجمع الحلول البرمجية والإنتاج الإعلامي
        </div>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 16,
            fontSize: 22,
          }}
        >
          <span
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              background: "#39D2C0",
              color: "#073B4A",
              fontWeight: 700,
            }}
          >
            Smartech Systems
          </span>
          <span
            style={{
              padding: "10px 20px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.12)",
              fontWeight: 700,
            }}
          >
            Smartech Media
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
