import React from "react";
import "./Spinner.css";

/**
 * NeuroSpinner (scoped)
 */
export default function Spinner({
  size = 128,
  text = "",
  progress,
  className = "",
}) {
  const hasProgress = typeof progress === "number" && !Number.isNaN(progress);
  const clamped = hasProgress ? Math.max(0, Math.min(100, progress)) : undefined;

  const a11yProps = hasProgress
    ? { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(clamped), "aria-busy": true }
    : { role: "status", "aria-live": "polite", "aria-busy": true };

  return (
    <div
      className={`spinner-card neuro ${className}`}
      style={{ "--size": `${size}px`, "--p": hasProgress ? clamped / 100 : undefined }}
      data-has-progress={hasProgress ? "true" : "false"}
      {...a11yProps}
    >
      <div className="spinner neuro">
        {/* renamed & scoped: was "grid" */}
        <div className="spin-grid" aria-hidden="true" />
        <div className="neural-wave" aria-hidden="true" />

        <div className="gyro gx" aria-hidden="true" />
        <div className="gyro gy" aria-hidden="true" />

        <div className="trail t1" aria-hidden="true"><span className="trail-dot" /></div>
        <div className="trail t2" aria-hidden="true"><span className="trail-dot" /></div>

        <div className="core" aria-hidden="true" />
        <div className="progress-ring" aria-hidden="true" />

        <div className="particle-field" aria-hidden="true">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="particle" style={{ "--i": i + 1 }} />
          ))}
        </div>
      </div>

      {text ? <div className="spinner-text">{text}</div> : null}
      <span className="sr-only">{hasProgress ? `Loading ${Math.round(clamped)}%` : "Loading"}</span>
    </div>
  );
}
