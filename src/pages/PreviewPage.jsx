// src/pages/PreviewPage.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/PreviewPage.css";

export default function PreviewPage() {
  // what to show
  const [sources, setSources] = useState({
    video: true,          // Scenario Video
    vtrCan: true,         // Velocity–Time–Range plot (CAN)
    vtrCube: true,        // Velocity–Time–Range plot (Radarcube)
    snrCan: true,         // SNR–Time–Range plot (CAN)
  });

  // current frame
  const [frame, setFrame] = useState(0);

  // optional payload from DataPage (if you passed it)
  const location = useLocation();
  const payload = location.state?.payload ?? null;

  // router nav -> DataLoading
  const navigate = useNavigate();
  function goToLoading() {
    navigate("/loading", {
      state: {
        fromPreview: true,
        payload,
        sources,
        progress: 0,
      },
    });
  }

  const selectedCount = useMemo(
    () => Object.values(sources).filter(Boolean).length,
    [sources]
  );

  function toggle(key) {
    setSources((s) => ({ ...s, [key]: !s[key] }));
  }
  function selectAll() {
    setSources({ video: true, vtrCan: true, vtrCube: true, snrCan: true });
  }
  function clearAll() {
    setSources({ video: false, vtrCan: false, vtrCube: false, snrCan: false });
  }

  return (
    <div className="preview-page">
      {/* Header */}
      <header className="preview-header">
        <div className="header-left">
          <h1 className="title">Data Preview</h1>
          <div className="kpis">
            <div className="kpi">
              <div className="kpi-label">Scenarios Matched</div>
              <div className="kpi-value">
                {payload ? "YYY" : "—"}
              </div>
            </div>
            <div className="kpi">
              <div className="kpi-label">Frame</div>
              <div className="kpi-value">{frame}</div>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <span className="scenario-id">
            {payload
              ? `${payload.radarMotion ?? "—"} • ${payload.environment ?? "—"}`
              : "Scenario"}
          </span>
          <div className="frame-nav">
            <button
              className="icon-btn"
              aria-label="Previous frame"
              onClick={() => setFrame((f) => Math.max(0, f - 1))}
            >
              ‹
            </button>
            <button
              className="icon-btn"
              aria-label="Next frame"
              onClick={() => setFrame((f) => Math.min(100, f + 1))}
            >
              ›
            </button>
          </div>
          <button className="btn btn-primary" onClick={goToLoading}>
            Download Dataset
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="preview-main">
        {/* Left: selector */}
        <aside className="selector-card">
          <div className="selector-head">
            <h2 className="selector-title">Select Preview Data</h2>
            <div className="selector-meta">{selectedCount} / 4 selected</div>
          </div>

          <ul className="checkbox-list">
            <li>
              <label className="chk">
                <input
                  type="checkbox"
                  checked={sources.video}
                  onChange={() => toggle("video")}
                />
                <span className="chk-box" />
                <span className="chk-label">Scenario Video</span>
              </label>
            </li>
            <li>
              <label className="chk">
                <input
                  type="checkbox"
                  checked={sources.vtrCan}
                  onChange={() => toggle("vtrCan")}
                />
                <span className="chk-box" />
                <span className="chk-label">Velocity–Time–Range plot (CAN)</span>
              </label>
            </li>
            <li>
              <label className="chk">
                <input
                  type="checkbox"
                  checked={sources.vtrCube}
                  onChange={() => toggle("vtrCube")}
                />
                <span className="chk-box" />
                <span className="chk-label">Velocity–Time–Range plot (Radarcube)</span>
              </label>
            </li>
            <li>
              <label className="chk">
                <input
                  type="checkbox"
                  checked={sources.snrCan}
                  onChange={() => toggle("snrCan")}
                />
                <span className="chk-box" />
                <span className="chk-label">SNR–Time–Range plot (CAN)</span>
              </label>
            </li>
          </ul>

          <div className="selector-actions">
            <button className="btn btn-light" onClick={selectAll}>
              Select All
            </button>
            <button className="btn btn-ghost" onClick={clearAll}>
              Clear
            </button>
          </div>
        </aside>

        {/* Middle: media */}
        <section className="media-card">
          <h2 className="panel-title">Scenario Media</h2>

          <div className="media-grid">
            {sources.video && (
              <div className="media-box">
                <div className="media-head">Camera Image</div>
                <div className="media-body placeholder stripes" />
                <div className="media-ctrls">
                  <button className="mini-btn">Start</button>
                  <button className="mini-btn">Pause</button>
                  <button className="mini-btn">Resume</button>
                </div>
              </div>
            )}

            {sources.vtrCube && (
              <div className="media-box large">
                <div className="media-head">Doppler Cube</div>
                <div className="media-body placeholder dots" />
              </div>
            )}

            {sources.video && (
              <div className="media-box">
                <div className="media-head">Radar Point Cloud</div>
                <div className="media-body placeholder grid" />
              </div>
            )}
          </div>

          <div className="media-actions">
            <button className="btn btn-success">Keep</button>
            <button className="btn btn-danger">Remove</button>
            <button className="btn btn-primary" onClick={goToLoading}>
              Download Scenario
            </button>
          </div>
        </section>

        {/* Right: plots */}
        <section className="plot-card">
          <h2 className="panel-title">Frame Details</h2>

          <div className="frame-row">
            <div className="frame-pill">Frame ID</div>
            <div className="frame-meta">
              <strong>Velocity:</strong> -2.62 m/s
            </div>
          </div>

          {sources.vtrCan && <div className="plot-box">Velocity–Time–Range (CAN)</div>}
          {sources.vtrCube && <div className="plot-box">Velocity–Time–Range (Radarcube)</div>}
          {sources.snrCan && <div className="plot-box">SNR–Time–Range (CAN)</div>}

          <div className="slider">
            <label className="slider-label">Frame slider</label>
            <input
              type="range"
              min="0"
              max="100"
              value={frame}
              onChange={(e) => setFrame(Number(e.target.value))}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
