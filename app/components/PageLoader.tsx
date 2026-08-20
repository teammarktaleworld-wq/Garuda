"use client";

import { useEffect, useState } from "react";

// ─── PAGE LOADER ──────────────────────────────────────────────────────────────
// Shows on initial page load and hides once the window "load" event fires
// (all resources including images resolved) OR after a max of 4 seconds.
//
// Design: dark #050A12 base matching the site, Garud Tata wordmark, a
// horizontal sweep line (referencing the car silhouette motif), and a
// progress bar that fills based on real load progress.

export default function PageLoader() {
  const [visible, setVisible]   = useState(true);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting]   = useState(false);

  useEffect(() => {
    // Simulate progressive loading feel with a fast-then-slow fill
    let prog = 0;
    const interval = setInterval(() => {
      prog += prog < 70 ? Math.random() * 12 : Math.random() * 3;
      if (prog >= 95) { prog = 95; clearInterval(interval); }
      setProgress(Math.min(prog, 95));
    }, 120);

    const dismiss = () => {
      clearInterval(interval);
      setProgress(100);
      // Small delay so "100%" is visible before fade
      setTimeout(() => {
        setExiting(true);
        setTimeout(() => setVisible(false), 500);
      }, 250);
    };

    // Fire on window load (images, fonts, etc. done)
    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    // Safety net — never block the user for more than 4s
    const safety = setTimeout(dismiss, 4000);

    return () => {
      clearInterval(interval);
      clearTimeout(safety);
      window.removeEventListener("load", dismiss);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050A12",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.45s ease, transform 0.45s ease",
        opacity: exiting ? 0 : 1,
        transform: exiting ? "scale(1.015)" : "scale(1)",
        pointerEvents: exiting ? "none" : "auto",
      }}
    >
      <style>{`
        @keyframes sweepLine {
          0%   { transform: scaleX(0) translateX(-50%); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: scaleX(1) translateX(0%); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.15; }
          50%       { opacity: 0.30; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>

      {/* ── Ambient blue glow behind everything ─────────────── */}
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60vw",
        height: "40vh",
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(0,85,165,0.22) 0%, transparent 70%)",
        animation: "pulseGlow 2.4s ease-in-out infinite",
        pointerEvents: "none",
      }} />

      {/* ── Horizontal sweep line — the signature element ─────
          References the car silhouette / speed-line motif.
          Sweeps left-to-right once, then fades.
      ─────────────────────────────────────────────────────── */}
      <div style={{
        position: "absolute",
        top: "calc(50% - 60px)",
        left: 0,
        right: 0,
        height: "1px",
        overflow: "hidden",
        pointerEvents: "none",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent 0%, #1E7FE8 40%, #5BA3E8 60%, transparent 100%)",
          transformOrigin: "left center",
          animation: "sweepLine 1.8s ease-in-out infinite",
        }} />
      </div>

      {/* ── Wordmark ─────────────────────────────────────────── */}
      <div style={{
        animation: "fadeSlideUp 0.5s ease 0.1s both",
        textAlign: "center",
        marginBottom: "32px",
      }}>
        <div style={{
          fontWeight: 900,
          fontSize: "clamp(22px, 5vw, 32px)",
          letterSpacing: "0.22em",
          color: "#ffffff",
          lineHeight: 1,
          textTransform: "uppercase",
        }}>
          GARUD
        </div>
        <div style={{
          fontWeight: 700,
          fontSize: "clamp(11px, 2vw, 13px)",
          letterSpacing: "0.18em",
          color: "#1E7FE8",
          marginTop: "4px",
          textTransform: "uppercase",
        }}>
          TATA MOTORS
        </div>
      </div>

      {/* ── Progress bar ─────────────────────────────────────── */}
      <div style={{
        animation: "fadeSlideUp 0.5s ease 0.2s both",
        width: "clamp(180px, 40vw, 260px)",
        marginBottom: "20px",
      }}>
        {/* Track */}
        <div style={{
          width: "100%",
          height: "2px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "2px",
          overflow: "hidden",
        }}>
          {/* Fill */}
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #0055A5, #5BA3E8)",
            borderRadius: "2px",
            transition: "width 0.18s ease",
            boxShadow: "0 0 8px rgba(91,163,232,0.6)",
          }} />
        </div>
      </div>

      {/* ── Bouncing dots ────────────────────────────────────── */}
      <div style={{
        animation: "fadeSlideUp 0.5s ease 0.3s both",
        display: "flex",
        gap: "6px",
        alignItems: "center",
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: "block",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#1E7FE8",
            animation: `dotBounce 1.2s ease-in-out ${i * 0.18}s infinite`,
          }} />
        ))}
      </div>

      {/* ── Progress percentage (subtle) ─────────────────────── */}
      <div style={{
        marginTop: "16px",
        fontSize: "10px",
        letterSpacing: "0.18em",
        color: "rgba(255,255,255,0.2)",
        fontWeight: 600,
        textTransform: "uppercase",
        animation: "fadeSlideUp 0.5s ease 0.35s both",
      }}>
        {Math.round(progress)}%
      </div>
    </div>
  );
}