// src/pages/DataPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import "../styles/DataPage.css";

/* ---------- Inline SVG icons ---------- */
const Icon = ({ name }) => {
  const base = {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "ped":
      return (
        <svg {...base}>
          <circle cx="12" cy="5" r="2" />
          <path d="M7 13l3-2 4 1 2 3" />
          <path d="M9 22l2-6 2 3 2 3" />
        </svg>
      );
    case "pedStatic":
      return (
        <svg {...base}>
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v7" />
          <path d="M10 9v3" />
          <path d="M14 9v3" />
          <path d="M12 14l-2 4" />
          <path d="M12 14l2 4" />
        </svg>
      );
    case "bike":
      return (
        <svg {...base}>
          <circle cx="6" cy="17" r="3" />
          <circle cx="18" cy="17" r="3" />
          <path d="M6 17l6-7 3 7M12 10h4" />
        </svg>
      );
    case "scooter":
      return (
        <svg {...base}>
          <path d="M4 17h10" />
          <circle cx="6" cy="17" r="2.5" />
          <circle cx="16" cy="17" r="2.5" />
          <path d="M14 17V8l4-2" />
        </svg>
      );
    case "wheelchair":
      return (
        <svg {...base}>
          <circle cx="9" cy="6" r="2" />
          <path d="M9 8v5l6 1m-2-3h4l2 6" />
          <circle cx="9" cy="18" r="4" />
        </svg>
      );
    case "bird":
      return (
        <svg {...base}>
          <path d="M3 12c4-1 6-5 9-5 3 0 4 2 7 2-2 2-3 5-9 5-2 0-5-1-7-2z" />
          <path d="M10 9l2 3" />
        </svg>
      );
    case "lime":
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="7" />
          <path d="M12 5v14M5 12h14M7.5 7.5l9 9M16.5 7.5l-9 9" />
        </svg>
      );
    /* NEW: slope icon for “Trajectory Path Slope” */
    case "slope":
      return (
        <svg {...base}>
          {/* baseline */}
          <path d="M3 19h18" />
          {/* incline */}
          <path d="M6 16l10-8" />
          {/* small right-angle marker */}
          <path d="M6 16h3M6 13v3" />
        </svg>
      );
    default:
      return null;
  }
};

/* ---------- VRU options ---------- */
const VRU_OPTIONS = [
  { key: "ped_arm", label: "Pedestrian with Arm Swing", icon: "ped" },
  { key: "ped_no_arm", label: "Pedestrian Without Arm Swing", icon: "pedStatic" },
  { key: "bike_pedal", label: "Bicyclist With Pedaling", icon: "bike" },
  { key: "bike_no_pedal", label: "Bicyclist Without Pedaling", icon: "bike" },
  { key: "escooter", label: "E-Scooter", icon: "scooter" },
  { key: "wheelchair", label: "Wheelchair", icon: "wheelchair" },
  { key: "bird_escooter", label: "Bird E-Scooter", icon: "bird" },
  { key: "lime_escooter", label: "Lime E-Scooter", icon: "lime" },
];

const INIT_VRU_PREFS = VRU_OPTIONS.reduce((acc, o) => ({ ...acc, [o.key]: "ignore" }), {});

const DEFAULTS = {
  radarMotion: "Stationary",
  environment: "Controlled",
  numVRUs: "",
  pathType: "Straight",
  slope: "0",
  turn: "Right Turn by 90 Degrees",
  gait: "Paced Walking",
  minInterval: "0.00",
  minTrajLen: "0.00",
  ranges: {
    vruRange: { min: "0", max: "50" },
    azimuth: { min: "-45", max: "40" },
    velocity: { min: "0", max: "8" },
    rcs: { min: "-25", max: "-5" },
    snr: { min: "5", max: "30" },
  },
};

export default function DataPage() {
  const [radarMotion, setRadarMotion] = useState(DEFAULTS.radarMotion);
  const [environment, setEnvironment] = useState(DEFAULTS.environment);
  const [numVRUs, setNumVRUs] = useState(DEFAULTS.numVRUs);
  const [pathType, setPathType] = useState(DEFAULTS.pathType);
  const [slope, setSlope] = useState(DEFAULTS.slope);
  const [turn, setTurn] = useState(DEFAULTS.turn);
  const [vruPrefs, setVruPrefs] = useState({ ...INIT_VRU_PREFS });
  const [gait, setGait] = useState(DEFAULTS.gait);
  const [minInterval, setMinInterval] = useState(DEFAULTS.minInterval);
  const [minTrajLen, setMinTrajLen] = useState(DEFAULTS.minTrajLen);
  const [ranges, setRanges] = useState({ ...DEFAULTS.ranges });

  /* Modal state (popup) */
  const [vruModalOpen, setVruModalOpen] = useState(false);
  const [modalPrefs, setModalPrefs] = useState({ ...vruPrefs });

  /* Derived visibility */
  const showControlledOnly = environment === "Controlled";
  const showStraightOnly = showControlledOnly && pathType === "Straight";
  const showCurvedOnly = showControlledOnly && pathType === "Curved";
  const showGait = useMemo(
    () => vruPrefs["ped_arm"] === "must" || vruPrefs["ped_no_arm"] === "must",
    [vruPrefs]
  );

  /* Helpers */
  function setModalPref(key, next) {
    setModalPrefs((prev) => {
      const curr = prev[key];
      const value = curr === next ? "ignore" : next; // toggle off → ignore
      return { ...prev, [key]: value };
    });
  }

  /* Modal handlers */
  const openVruModal = () => {
    setModalPrefs({ ...vruPrefs }); // stage current
    setVruModalOpen(true);
  };
  const closeVruModal = () => setVruModalOpen(false);
  const confirmVruModal = () => {
    setVruPrefs({ ...modalPrefs });
    setVruModalOpen(false);
  };
  const clearModalPrefs = () => setModalPrefs({ ...INIT_VRU_PREFS });

  /* Close on Esc */
  useEffect(() => {
    if (!vruModalOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeVruModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [vruModalOpen]);

  /* Validation / dirty checks */
  const isValid = useMemo(() => {
    const vrusOk =
      numVRUs === "" ||
      (!Number.isNaN(parseInt(numVRUs, 10)) && parseInt(numVRUs, 10) > 0);
    const rangesOk = Object.values(ranges).every(({ min, max }) => {
      const a = parseFloat(min);
      const b = parseFloat(max);
      return !Number.isNaN(a) && !Number.isNaN(b) && a <= b;
    });
    return vrusOk && rangesOk;
  }, [numVRUs, ranges]);

  const isDirty = useMemo(() => {
    const prefsDefault = Object.values(vruPrefs).every((v) => v === "ignore");
    const rangesEqual = JSON.stringify(ranges) === JSON.stringify(DEFAULTS.ranges);
    return !(
      radarMotion === DEFAULTS.radarMotion &&
      environment === DEFAULTS.environment &&
      numVRUs === DEFAULTS.numVRUs &&
      pathType === DEFAULTS.pathType &&
      slope === DEFAULTS.slope &&
      turn === DEFAULTS.turn &&
      prefsDefault &&
      gait === DEFAULTS.gait &&
      minInterval === DEFAULTS.minInterval &&
      minTrajLen === DEFAULTS.minTrajLen &&
      rangesEqual
    );
  }, [
    radarMotion,
    environment,
    numVRUs,
    pathType,
    slope,
    turn,
    vruPrefs,
    gait,
    minInterval,
    minTrajLen,
    ranges,
  ]);

  const canApply = isValid && isDirty;
  const canClear = isDirty;

  function applyFilters(e) {
    e?.preventDefault?.();
    if (!canApply) return;
    const payload = {
      radarMotion,
      environment,
      numVRUs: numVRUs ? parseInt(numVRUs, 10) : null,
      pathType: showControlledOnly ? pathType : null,
      slope: showStraightOnly ? parseInt(slope, 10) : null,
      turn: showCurvedOnly ? turn : null,
      vruPreferences: vruPrefs,
      gait: showGait ? gait : null,
      minInterval: parseFloat(minInterval),
      minTrajectoryLength: showControlledOnly ? parseFloat(minTrajLen) : null,
      ranges: { ...ranges },
    };
    console.log("Apply Filters ->", payload);
  }

  const configuredCount = Object.values(vruPrefs).filter((v) => v !== "ignore").length;

  return (
    <div className={`data-page ${vruModalOpen ? "modal-open" : ""}`}>
      <main className="tool-frame density-compact">
        <header className="page-header">
          <h1>VRU Radar Micro-Doppler Database Tool</h1>
          <p className="page-help">
            Adjust scenario and data parameters. Defaults mean <em>no preference</em>.
          </p>
        </header>

        {/* SINGLE CARD */}
        <form className="form-card" onSubmit={applyFilters}>
          <div className="two-col">
            {/* LEFT: Scenario */}
            <div>
              <h2>Scenario</h2>

              <div className="field">
                <label>Radar Motion Type</label>
                <select
                  className="input input-sm"
                  value={radarMotion}
                  onChange={(e) => setRadarMotion(e.target.value)}
                >
                  <option>Stationary</option>
                  <option>Moving</option>
                </select>
              </div>

              <div className="field">
                <label>Data Collection Environment</label>
                <select
                  className="input input-sm"
                  value={environment}
                  onChange={(e) => setEnvironment(e.target.value)}
                >
                  <option>Controlled</option>
                  <option>Naturalistic</option>
                </select>
                <p className="help">Some trajectory options apply only to controlled sessions.</p>
              </div>

              <div className="field">
                <label>Number of VRUs</label>
                <input
                  className="input input-xs"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  placeholder="e.g., 1"
                  value={numVRUs}
                  onChange={(e) => setNumVRUs(e.target.value)}
                />
              </div>

              {showControlledOnly && (
                <div className="field">
                  <label>Trajectory Path Type</label>
                  <select
                    className="input input-sm"
                    value={pathType}
                    onChange={(e) => setPathType(e.target.value)}
                  >
                    <option value="Straight">Straight</option>
                    <option value="Curved">Curved</option>
                  </select>
                </div>
              )}

              {showStraightOnly && (
                <div className="field">
                  <label>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <Icon name="slope" />
                      Trajectory Path Slope
                    </span>
                  </label>
                  <select
                    className="input input-xs"
                    value={slope}
                    onChange={(e) => setSlope(e.target.value)}
                  >
                    {["-45", "0", "45", "90", "135", "180", "225", "270"].map((deg) => (
                      <option key={deg} value={deg}>
                        {deg}
                      </option>
                    ))}
                  </select>
                  <p className="help">Straight paths only.</p>
                </div>
              )}

              {showCurvedOnly && (
                <div className="field">
                  <label>Trajectory Turn Options</label>
                  <select className="input input-sm" value={turn} onChange={(e) => setTurn(e.target.value)}>
                    <option>Right Turn by 90 Degrees</option>
                    <option>Right Turn by 45 Degrees</option>
                  </select>
                  <p className="help">Curved paths only.</p>
                </div>
              )}

              {/* VRU + Gait row */}
              <div className="row-two">
                <div className={`field ${!showGait ? "span-2" : ""}`}>
                  <label>VRU Types</label>

                  {/* Trigger opens the modal */}
                  <button type="button" className="vru-trigger" onClick={openVruModal}>
                    <span>Configure VRU types</span>
                    <span className="count-pill">{configuredCount} set</span>
                  </button>

                  <p className="help">
                    Mark each VRU as <strong>Must</strong>, <strong>Not</strong>, or leave as{" "}
                    <strong>Ignore</strong>.
                  </p>
                </div>

                {showGait && (
                  <div className="field gait-field">
                    <label>Gait Type (auto when Pedestrian is required)</label>
                    <select className="input input-sm" value={gait} onChange={(e) => setGait(e.target.value)}>
                      <option>Paced Walking</option>
                      <option>Natural Walking</option>
                      <option>Jogging</option>
                      <option>Irregular Walking</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="field">
                <label>Minimum Time Interval (s)</label>
                <input
                  className="input input-xs"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={minInterval}
                  onChange={(e) => setMinInterval(e.target.value)}
                />
              </div>

              {showControlledOnly && (
                <div className="field">
                  <label>Minimum Trajectory Length (m)</label>
                  <input
                    className="input input-xs"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    value={minTrajLen}
                    onChange={(e) => setMinTrajLen(e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* RIGHT: Signal Constraints */}
            <div>
              <h2>Signal Constraints</h2>
              <div className="constraints-grid">
                <RangePair
                  title="VRU Range (m)"
                  value={ranges.vruRange}
                  onChange={(min, max) => setRanges((r) => ({ ...r, vruRange: { min, max } }))}
                />
                <RangePair
                  title="VRU Azimuth Angle (deg)"
                  value={ranges.azimuth}
                  onChange={(min, max) => setRanges((r) => ({ ...r, azimuth: { min, max } }))}
                />
                <RangePair
                  title="VRU Constituent Point Velocity (m/s)"
                  value={ranges.velocity}
                  onChange={(min, max) => setRanges((r) => ({ ...r, velocity: { min, max } }))}
                />
                <RangePair
                  title="VRU Constituent Point RCS (dBscm)"
                  value={ranges.rcs}
                  onChange={(min, max) => setRanges((r) => ({ ...r, rcs: { min, max } }))}
                />
                <RangePair
                  title="VRU Constituent Point SNR (dB)"
                  value={ranges.snr}
                  onChange={(min, max) => setRanges((r) => ({ ...r, snr: { min, max } }))}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bottom-actions">
            <button type="button" className="btn btn-sm btn-apply" onClick={applyFilters} disabled={!canApply}>
              Apply
            </button>
            <button
              type="button"
              className="btn btn-sm btn-clear"
              onClick={() => {
                setRadarMotion(DEFAULTS.radarMotion);
                setEnvironment(DEFAULTS.environment);
                setNumVRUs(DEFAULTS.numVRUs);
                setPathType(DEFAULTS.pathType);
                setSlope(DEFAULTS.slope);
                setTurn(DEFAULTS.turn);
                setVruPrefs({ ...INIT_VRU_PREFS });
                setGait(DEFAULTS.gait);
                setMinInterval(DEFAULTS.minInterval);
                setMinTrajLen(DEFAULTS.minTrajLen);
                setRanges({ ...DEFAULTS.ranges });
              }}
              disabled={!canClear}
            >
              Clear
            </button>
          </div>
        </form>
      </main>

      {/* ===== VRU MODAL (popup) ===== */}
      <div
        className="vru-modal"
        aria-hidden={!vruModalOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vru-modal-title"
      >
        <div className="vru-modal__backdrop" onClick={closeVruModal} />
        <div className="vru-modal__panel" onClick={(e) => e.stopPropagation()}>
          <div className="vru-modal__header">
            <div id="vru-modal-title" className="vru-modal__title">
              Select VRU preferences
            </div>
            {/* Red clear-all */}
            <button type="button" className="btn-danger" onClick={clearModalPrefs}>
              Clear all
            </button>
          </div>

          <div className="vru-modal__body">
            <div className="grid">
              {VRU_OPTIONS.map((o) => {
                const val = modalPrefs[o.key];
                const isIg = val === "ignore";
                const isMust = val === "must";
                const isNot = val === "mustNot";
                return (
                  <div key={o.key} className="vru-row">
                    <span className="vru-icon" aria-hidden="true">
                      <Icon name={o.icon} />
                    </span>
                    <div className="name">{o.label}</div>
                    <div className="seg" role="group" aria-label={o.label}>
                      <button
                        type="button"
                        className={`ig ${isIg ? "on" : ""}`}
                        onClick={() => setModalPref(o.key, "ignore")}
                        title="Ignore"
                      >
                        Ig
                      </button>
                      <button
                        type="button"
                        className={`must ${isMust ? "on must" : ""}`}
                        onClick={() => setModalPref(o.key, "must")}
                        title="Must contain"
                      >
                        Must
                      </button>
                      <button
                        type="button"
                        className={`not ${isNot ? "on not" : ""}`}
                        onClick={() => setModalPref(o.key, "mustNot")}
                        title="Must not contain"
                      >
                        Not
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="vru-modal__footer">
            <button type="button" className="btn" onClick={closeVruModal}>
              Cancel
            </button>
            {/* Compact primary confirm (styled in CSS) */}
            <button type="button" className="btn-primary" onClick={confirmVruModal}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Range pair ---------- */
function RangePair({ title, value, onChange }) {
  return (
    <div className="field range-pair" style={{ marginBottom: 6 }}>
      <label>{title}</label>
      <div className="range-row">
        <div className="range-box">
          <div className="mini-label">min</div>
          <input
            className="input input-xs"
            type="number"
            step="1"
            value={value.min}
            onChange={(e) => onChange(e.target.value, value.max)}
          />
        </div>
        <div className="range-box">
          <div className="mini-label">max</div>
          <input
            className="input input-xs"
            type="number"
            step="1"
            value={value.max}
            onChange={(e) => onChange(value.min, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
