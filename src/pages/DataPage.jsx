// src/pages/DataPage.jsx
import React, { useMemo, useState } from "react";
import "../styles/DataPage.css";

/* ---------- Inline SVG icons (compact, monochrome) ---------- */
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
    /* Walking / with arm swing */
    case "ped":
      return (
        <svg {...base}>
          <circle cx="12" cy="5" r="2" />
          {/* arm/leg motion lines */}
          <path d="M7 13l3-2 4 1 2 3" />
          <path d="M9 22l2-6 2 3 2 3" />
        </svg>
      );
    /* Standing / no arm swing (arms down) */
    case "pedStatic":
      return (
        <svg {...base}>
          <circle cx="12" cy="5" r="2" />
          {/* torso */}
          <path d="M12 7v7" />
          {/* arms down, close to body */}
          <path d="M10 9v3" />
          <path d="M14 9v3" />
          {/* legs neutral */}
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
    default:
      return null;
  }
};

/* ---------- Options with icon mapping ---------- */
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

const INIT_VRU_PREFS = VRU_OPTIONS.reduce((acc, o) => {
  acc[o.key] = "ignore"; // "ignore" | "must" | "mustNot"
  return acc;
}, {});

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
  /* ---------- State ---------- */
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

  /* ---------- Derived visibility ---------- */
  const showControlledOnly = environment === "Controlled";
  const showStraightOnly = showControlledOnly && pathType === "Straight";
  const showCurvedOnly = showControlledOnly && pathType === "Curved";
  const showGait = useMemo(
    () => vruPrefs["ped_arm"] === "must" || vruPrefs["ped_no_arm"] === "must",
    [vruPrefs]
  );

  /* ---------- Helpers ---------- */
  function setVruPref(key, next) {
    setVruPrefs((prev) => {
      const curr = prev[key];
      const value = curr === next ? "ignore" : next; // toggle off
      return { ...prev, [key]: value };
    });
  }

  // For liquid aurora hover following the cursor
  const handleCardMouseMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", x.toFixed(4));
    el.style.setProperty("--my", y.toFixed(4));
  };

  const handleCardFocus = (e) => e.currentTarget.classList.add("is-focus");
  const handleCardBlur = (e) => e.currentTarget.classList.remove("is-focus");

  function resetAll() {
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
  }

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
    const rangesEqual =
      JSON.stringify(ranges) === JSON.stringify(DEFAULTS.ranges);

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

  /* ---------- Render ---------- */
  return (
    <div className="data-page">
      <main className="tool-frame density-compact">
        <header className="page-header">
          <h1>VRU Radar Micro-Doppler Database Tool</h1>
          <p className="page-help">
            Adjust scenario and data parameters. Defaults mean <em>no preference</em>.
          </p>
        </header>

        <section className="grid">
          {/* LEFT: Scenario Filters */}
          <form className="card" onSubmit={applyFilters}>
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
                <label>Trajectory Path Slope</label>
                <select
                  className="input input-xs"
                  value={slope}
                  onChange={(e) => setSlope(e.target.value)}
                >
                  {["-45", "0", "45", "90", "135", "180", "225", "270"].map(
                    (deg) => (
                      <option key={deg} value={deg}>
                        {deg}
                      </option>
                    )
                  )}
                </select>
                <p className="help">Straight paths only.</p>
              </div>
            )}

            {showCurvedOnly && (
              <div className="field">
                <label>Trajectory Turn Options</label>
                <select
                  className="input input-sm"
                  value={turn}
                  onChange={(e) => setTurn(e.target.value)}
                >
                  <option>Right Turn by 90 Degrees</option>
                  <option>Right Turn by 45 Degrees</option>
                </select>
                <p className="help">Curved paths only.</p>
              </div>
            )}

            <div className="field">
              <label>VRU Types</label>
              <p className="help">Choose “Must contain” or “Must not contain”; otherwise no preference.</p>
              <div className="vru-grid">
                {VRU_OPTIONS.map((o) => {
                  const value = vruPrefs[o.key];
                  const isMust = value === "must";
                  const isMustNot = value === "mustNot";

                  return (
                    <div
                      key={o.key}
                      className={`vru-card aurora hover-shadow ${value !== "ignore" ? "picked" : ""}`}
                      data-state={value}
                      data-key={o.key}
                      role="group"
                      aria-label={o.label}
                      tabIndex={0}
                      title={o.label}
                      onMouseMove={handleCardMouseMove}
                      onFocus={handleCardFocus}
                      onBlur={handleCardBlur}
                    >
                      <div className="vru-head">
                        <span className="vru-icon" aria-hidden="true">
                          <Icon name={o.icon} />
                        </span>
                        <div className="vru-title">{o.label}</div>
                      </div>

                      <div className="vru-controls">
                        <label
                          className={`toggle toggle-yes ${isMust ? "on" : ""}`}
                          aria-pressed={isMust}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              setVruPref(o.key, "must");
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isMust}
                            onChange={() => setVruPref(o.key, "must")}
                          />
                          Must contain
                        </label>

                        <label
                          className={`toggle toggle-no ${isMustNot ? "on" : ""}`}
                          aria-pressed={isMustNot}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === " " || e.key === "Enter") {
                              e.preventDefault();
                              setVruPref(o.key, "mustNot");
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isMustNot}
                            onChange={() => setVruPref(o.key, "mustNot")}
                          />
                          Must not contain
                        </label>
                      </div>

                      {value === "ignore" && (
                        <div className="vru-subtle" id={`${o.key}-np`}>
                          No preference
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 8. Pedestrian gait (only if pedestrian is required in #7) */}
            {showGait && (
              <div className="field">
                <label>Pedestrian Gait Type</label>
                <select
                  className="input input-sm"
                  value={gait}
                  onChange={(e) => setGait(e.target.value)}
                >
                  <option>Paced Walking</option>
                  <option>Natural Walking</option>
                  <option>Jogging</option>
                  <option>Irregular Walking</option>
                </select>
              </div>
            )}

            {/* 9. Always visible */}
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

            {/* 10. Only if Controlled (from #2) */}
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
          </form>

          {/* RIGHT: VRU Data Filters */}
          <aside className="card">
            <h2>Signal Constraints</h2>

            <RangePair
              title="VRU Range (m)"
              value={ranges.vruRange}
              onChange={(min, max) =>
                setRanges((r) => ({ ...r, vruRange: { min, max } }))
              }
            />
            <RangePair
              title="VRU Azimuth Angle (deg)"
              value={ranges.azimuth}
              onChange={(min, max) =>
                setRanges((r) => ({ ...r, azimuth: { min, max } }))
              }
            />
            <RangePair
              title="VRU Constituent Point Velocity (m/s)"
              value={ranges.velocity}
              onChange={(min, max) =>
                setRanges((r) => ({ ...r, velocity: { min, max } }))
              }
            />
            <RangePair
              title="VRU Constituent Point RCS (dBscm)"
              value={ranges.rcs}
              onChange={(min, max) =>
                setRanges((r) => ({ ...r, rcs: { min, max } }))
              }
            />
            <RangePair
              title="VRU Constituent Point SNR (dB)"
              value={ranges.snr}
              onChange={(min, max) =>
                setRanges((r) => ({ ...r, snr: { min, max } }))
              }
            />
          </aside>
        </section>

        {/* Bottom actions */}
        <div className="bottom-actions">
          <button
            type="button"
            className="btn btn-sm btn-apply"
            onClick={applyFilters}
            disabled={!canApply}
          >
            Apply
          </button>
          <button
            type="button"
            className="btn btn-sm btn-clear"
            onClick={resetAll}
            disabled={!canClear}
          >
            Clear
          </button>
        </div>
      </main>
    </div>
  );
}

/* ---------- Range pair ---------- */
function RangePair({ title, value, onChange }) {
  return (
    <div className="field range-pair">
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
