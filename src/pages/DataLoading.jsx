// src/pages/DataLoading.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";          // ✅ use the advanced spinner
import "../styles/DataLoading.css";                   // ✅ keeps your background, layout, etc.

// Fallback steps (rotating messages under the spinner)
const DEFAULT_STEPS = [
  "Preparing data",
  "Data being transformed",
  "Optimizing frames",
  "Generating preview tiles",
  "Indexing scenario",
  "Almost ready",
];

export default function DataLoading() {
  const location = useLocation();

  // External progress (0–100) & optional steps from navigate(..., { state })
  const externalProgress = location.state?.progress;             // number | undefined
  const steps = location.state?.steps ?? DEFAULT_STEPS;          // string[]

  // Local progress (used only when no external progress is provided)
  const [progress, setProgress] = useState(0);

  // Rotate through the status messages
  const [msgIndex, setMsgIndex] = useState(0);

  // Simulated progress (remove if driving from outside)
  useEffect(() => {
    if (typeof externalProgress === "number") return;
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + Math.max(1, Math.round((100 - p) / 18))));
    }, 120);
    return () => clearInterval(id);
  }, [externalProgress]);

  // Cycle status message every ~1.4s
  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % steps.length);
    }, 1400);
    return () => clearInterval(id);
  }, [steps.length]);

  // Effective progress (external takes precedence)
  const pct = typeof externalProgress === "number" ? externalProgress : progress;
  const done = pct >= 100;

  // Map progress to a corresponding step (only for semantic SR text / consistency)
  const stepIndex = useMemo(() => {
    if (!steps.length) return 0;
    const per = 100 / steps.length;
    return Math.min(steps.length - 1, Math.floor(pct / per));
  }, [pct, steps]);

  const currentMessage = steps[msgIndex] || steps[stepIndex] || "Preparing data";

  return (
    <div className="loading-page loading-centered">
      {/* Load a crisp, futuristic Google font for the “Gemini-like” look */}
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;800&display=swap"
        rel="stylesheet"
      />

      {/* Local styles for shimmering AI gradient text */}
      <style>{`
        .ai-stack {
          display: grid;
          justify-items: center;
          align-content: center;
          gap: 14px;
          min-height: 60vh;
          padding-top: 80px;
          text-align: center;
        }
        .ai-percent {
          font-family: 'Sora', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.3px;
          background: linear-gradient(120deg, #60a5fa, #a78bfa, #34d399, #60a5fa);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ai-shine 3s ease-in-out infinite;
          text-shadow: 0 0 0 rgba(0,0,0,0); /* keep crisp edges */
        }
        .ai-message {
          font-family: 'Sora', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.2px;
          opacity: 0.95;
          background: linear-gradient(120deg, #93c5fd, #c084fc, #86efac, #93c5fd);
          background-size: 220% 220%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: ai-shine 2.6s ease-in-out infinite, ai-pulse 2.6s ease-in-out infinite;
        }
        .ai-subtle {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.7);
        }
        @keyframes ai-shine {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ai-pulse {
          0%, 100% { filter: drop-shadow(0 0 0 rgba(99,102,241,0)); }
          50%      { filter: drop-shadow(0 0 10px rgba(99,102,241,.35)); }
        }

        /* Keep the spinner compact; text below it */
        .loading-centered .spinner-card {
          --size: 120px;   /* smaller card */
        }
      `}</style>

      <div className="ai-stack" role="status" aria-live="polite" aria-busy={!done}>
        {/* Advanced spinner (transparent square card) */}
        <Spinner size={120} text="" />

        {/* Gradient, shining progress text */}
        <div className="ai-percent" aria-label={`Progress ${Math.round(pct)} percent`}>
          {Math.round(pct)}%
        </div>
        <div className="ai-message">
          {currentMessage}
        </div>
        <div className="ai-subtle">
          {/* helpful hint / secondary line (optional) */}
          {done ? "Ready — opening preview…" : "Fetching from storage and preparing images…"}
        </div>

        {/* Screen-reader fallback detail */}
        <span className="sr-only">
          {steps[stepIndex]} — {Math.round(pct)} percent
        </span>
      </div>
    </div>
  );
}
