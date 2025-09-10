// src/pages/DataPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import "../styles/DataPage.css";

/* ---------- Inline SVG icons ---------- */
const Icon = ({ name, size = 16 }) => {
  const base = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: { display: "inline-block", verticalAlign: "text-bottom" },
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
    case "slope":
      return (
        <svg {...base}>
          <path d="M3 19h18" />
          <path d="M6 16l10-8" />
          <path d="M6 16h3M6 13v3" />
        </svg>
      );
    case "help":
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 1 1 4.3 1.7c-.7.7-1.3 1.1-1.8 1.6-.4.4-.7.9-.7 1.7" />
          <circle cx="12" cy="18" r="1" />
        </svg>
      );
    default:
      return null;
  }
};

/* ---------- Compact help tooltip ---------- */
const Help = ({ text }) => {
  const [open, setOpen] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-flex", marginLeft: 6, cursor: "help" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      aria-label="Help"
    >
      <Icon name="help" size={14} />
      {open && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            top: "120%",
            left: 0,
            zIndex: 20,
            width: 260,
            padding: "8px 10px",
            borderRadius: 8,
            background: "rgba(15,23,42,0.96)",
            color: "#eaf2ff",
            boxShadow: "0 8px 18px rgba(0,0,0,0.35)",
            fontSize: 12,
            lineHeight: 1.3,
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
};

/* ---------- Labeled field (compact) ---------- */
const FieldLabel = ({ children, help }) => (
  <label style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600 }}>
    {children}
    {help ? <Help text={help} /> : null}
  </label>
);

/* ---------- Compact icon dropdown (custom select) ---------- */
function IconSelect({ options, value, onChange, placeholder = "Select..." }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <div
      tabIndex={0}
      onBlur={() => setOpen(false)}
      style={{ position: "relative", width: 220, maxWidth: "100%" }}
    >
      <button
        type="button"
        className="input input-sm"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          padding: "6px 10px",
          minHeight: 32,
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {selected?.icon ? <Icon name={selected.icon} /> : null}
          <span style={{ fontSize: 14 }}>
            {selected ? selected.label : <span style={{ opacity: 0.6 }}>{placeholder}</span>}
          </span>
        </span>
        <span style={{ opacity: 0.7, fontSize: 12 }}>▼</span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            right: 0,
            zIndex: 30,
            background: "#fff",
            color: "#111827",
            border: "1px solid rgba(15,23,42,0.14)",
            borderRadius: 10,
            overflow: "hidden",
            boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
          }}
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              role="option"
              className="input"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              style={{
                width: "100%",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                background: value === o.value ? "rgba(59,130,246,0.08)" : "transparent",
              }}
            >
              {o.icon ? <Icon name={o.icon} /> : null}
              <span style={{ fontSize: 14 }}>{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- VRU categories → subtypes ---------- */
const VRU_CATEGORIES = [
  {
    value: "ped",
    label: "Pedestrian",
    icon: "ped",
    children: [
      { value: "ped_arm", label: "With Arm Swing", icon: "ped" },
      { value: "ped_no_arm", label: "Without Arm Swing", icon: "pedStatic" },
    ],
  },
  {
    value: "bike",
    label: "Bicyclist",
    icon: "bike",
    children: [
      { value: "bike_pedal", label: "With Pedaling", icon: "bike" },
      { value: "bike_no_pedal", label: "Without Pedaling", icon: "bike" },
    ],
  },
  {
    value: "escooter",
    label: "E-Scooter",
    icon: "scooter",
    children: [
      { value: "escooter", label: "Generic", icon: "scooter" },
      { value: "bird_escooter", label: "Bird", icon: "bird" },
      { value: "lime_escooter", label: "Lime", icon: "lime" },
    ],
  },
  {
    value: "wheelchair",
    label: "Wheelchair",
    icon: "wheelchair",
    children: [{ value: "wheelchair", label: "Any", icon: "wheelchair" }],
  },
];

/* ---------- Defaults ---------- */
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

  // New: dropdown state (category -> subtype)
  const [vruCategory, setVruCategory] = useState(VRU_CATEGORIES[0].value);
  const [vruSubtype, setVruSubtype] = useState(VRU_CATEGORIES[0].children[0].value);

  const [gait, setGait] = useState(DEFAULTS.gait);
  const [minInterval, setMinInterval] = useState(DEFAULTS.minInterval);
  const [minTrajLen, setMinTrajLen] = useState(DEFAULTS.minTrajLen);
  const [ranges, setRanges] = useState({ ...DEFAULTS.ranges });

  const showControlledOnly = environment === "Controlled";
  const showStraightOnly = showControlledOnly && pathType === "Straight";
  const showCurvedOnly = showControlledOnly && pathType === "Curved";

  // Auto-sync subtype whenever category changes
  useEffect(() => {
    const cat = VRU_CATEGORIES.find((c) => c.value === vruCategory);
    if (cat && cat.children?.length) setVruSubtype(cat.children[0].value);
  }, [vruCategory]);

  const showGait = useMemo(() => vruCategory === "ped", [vruCategory]);

  // Validation / dirty checks
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
    const rangesEqual = JSON.stringify(ranges) === JSON.stringify(DEFAULTS.ranges);
    return !(
      radarMotion === DEFAULTS.radarMotion &&
      environment === DEFAULTS.environment &&
      numVRUs === DEFAULTS.numVRUs &&
      pathType === DEFAULTS.pathType &&
      slope === DEFAULTS.slope &&
      turn === DEFAULTS.turn &&
      vruCategory === VRU_CATEGORIES[0].value &&
      vruSubtype === VRU_CATEGORIES[0].children[0].value &&
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
    vruCategory,
    vruSubtype,
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
      vru: { category: vruCategory, subtype: vruSubtype },
      gait: showGait ? gait : null,
      minInterval: parseFloat(minInterval),
      minTrajectoryLength: showControlledOnly ? parseFloat(minTrajLen) : null,
      ranges: { ...ranges },
    };
    console.log("Apply Filters ->", payload);
  }

  // ---------- UI ----------
  return (
    <div className="data-page">
      <main className="tool-frame density-compact">
        <header className="page-header" style={{ marginBottom: 12 }}>
          <h1 style={{ margin: 0 }}>VRU Radar Micro-Doppler Database Tool</h1>
          <p className="page-help" style={{ marginTop: 6 }}>
            Adjust scenario and data parameters. Defaults mean <em>no preference</em>.
          </p>
        </header>

        {/* Compact grid: 3 columns on wide screens */}
        <form
          className="form-card"
          onSubmit={applyFilters}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(260px, 1fr))",
            gap: 14,
          }}
        >
          {/* --- Column 1: Scenario A --- */}
          <div style={{ display: "grid", gap: 10 }}>
            <h2 style={{ margin: "2px 0 6px" }}>Scenario</h2>

            <div className="field">
              <FieldLabel help="Is the radar sensor fixed in place (stationary) or mounted on a moving platform (e.g., vehicle)?">
                Radar Motion Type
              </FieldLabel>
              <select
                className="input input-sm"
                value={radarMotion}
                onChange={(e) => setRadarMotion(e.target.value)}
                style={{ minHeight: 32, width: 180 }}
              >
                <option>Stationary</option>
                <option>Moving</option>
              </select>
            </div>

            <div className="field">
              <FieldLabel help="Controlled: designed experiments with fixed routes. Naturalistic: real-world, uncontrolled scenes.">
                Data Collection Environment
              </FieldLabel>
              <select
                className="input input-sm"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                style={{ minHeight: 32, width: 200 }}
              >
                <option>Controlled</option>
                <option>Naturalistic</option>
              </select>
            </div>

            <div className="field">
              <FieldLabel help="How many vulnerable road users (VRUs) appear at the same time. Leave blank for no constraint.">
                Number of VRUs
              </FieldLabel>
              <input
                className="input input-xs"
                type="number"
                inputMode="numeric"
                min="1"
                step="1"
                placeholder="e.g., 1"
                value={numVRUs}
                onChange={(e) => setNumVRUs(e.target.value)}
                style={{ width: 120 }}
              />
            </div>

            {showControlledOnly && (
              <div className="field">
                <FieldLabel help="Overall path shape followed by the VRU(s).">
                  Trajectory Path Type
                </FieldLabel>
                <select
                  className="input input-sm"
                  value={pathType}
                  onChange={(e) => setPathType(e.target.value)}
                  style={{ minHeight: 32, width: 160 }}
                >
                  <option value="Straight">Straight</option>
                  <option value="Curved">Curved</option>
                </select>
              </div>
            )}

            {showStraightOnly && (
              <div className="field">
                <FieldLabel help="Heading angle of the straight path relative to the radar reference axis.">
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <Icon name="slope" /> Trajectory Path Slope
                  </span>
                </FieldLabel>
                <select
                  className="input input-xs"
                  value={slope}
                  onChange={(e) => setSlope(e.target.value)}
                  style={{ width: 120 }}
                >
                  {["-45", "0", "45", "90", "135", "180", "225", "270"].map((deg) => (
                    <option key={deg} value={deg}>
                      {deg}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {showCurvedOnly && (
              <div className="field">
                <FieldLabel help="Turn options for curved trajectories in the controlled environment.">
                  Trajectory Turn Options
                </FieldLabel>
                <select
                  className="input input-sm"
                  value={turn}
                  onChange={(e) => setTurn(e.target.value)}
                  style={{ minHeight: 32, width: 220 }}
                >
                  <option>Right Turn by 90 Degrees</option>
                  <option>Right Turn by 45 Degrees</option>
                </select>
              </div>
            )}
          </div>

          {/* --- Column 2: Scenario B (VRU + Timing) --- */}
          <div style={{ display: "grid", gap: 10 }}>
            <h2 style={{ margin: "2px 0 6px" }}>VRU & Timing</h2>

            {/* VRU Category */}
            <div className="field">
              <FieldLabel help="Choose the VRU category; then refine the specific subtype.">
                VRU Type
              </FieldLabel>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <IconSelect
                  options={VRU_CATEGORIES.map((c) => ({
                    value: c.value,
                    label: c.label,
                    icon: c.icon,
                  }))}
                  value={vruCategory}
                  onChange={setVruCategory}
                />
                <IconSelect
                  options={
                    VRU_CATEGORIES.find((c) => c.value === vruCategory)?.children || []
                  }
                  value={vruSubtype}
                  onChange={setVruSubtype}
                />
              </div>
            </div>

            {showGait && (
              <div className="field">
                <FieldLabel help="Gait pattern is relevant when Pedestrian is selected.">
                  Gait Type
                </FieldLabel>
                <select
                  className="input input-sm"
                  value={gait}
                  onChange={(e) => setGait(e.target.value)}
                  style={{ minHeight: 32, width: 220 }}
                >
                  <option>Paced Walking</option>
                  <option>Natural Walking</option>
                  <option>Jogging</option>
                  <option>Irregular Walking</option>
                </select>
              </div>
            )}

            <div className="field">
              <FieldLabel help="Minimum time gap between frames/events considered in a trajectory (seconds).">
                Minimum Time Interval (s)
              </FieldLabel>
              <input
                className="input input-xs"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={minInterval}
                onChange={(e) => setMinInterval(e.target.value)}
                style={{ width: 120 }}
              />
            </div>

            {showControlledOnly && (
              <div className="field">
                <FieldLabel help="Shortest acceptable path length for a trajectory (meters).">
                  Minimum Trajectory Length (m)
                </FieldLabel>
                <input
                  className="input input-xs"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={minTrajLen}
                  onChange={(e) => setMinTrajLen(e.target.value)}
                  style={{ width: 120 }}
                />
              </div>
            )}
          </div>

          {/* --- Column 3: Signal Constraints --- */}
          <div style={{ display: "grid", gap: 10 }}>
            <h2 style={{ margin: "2px 0 6px" }}>Signal Constraints</h2>

            <RangePair
              title="VRU Range (m)"
              help="Distance from radar to VRU constituent points."
              value={ranges.vruRange}
              onChange={(min, max) => setRanges((r) => ({ ...r, vruRange: { min, max } }))}
            />
            <RangePair
              title="VRU Azimuth Angle (deg)"
              help="Angle of the VRU relative to radar boresight in the horizontal plane."
              value={ranges.azimuth}
              onChange={(min, max) => setRanges((r) => ({ ...r, azimuth: { min, max } }))}
            />
            <RangePair
              title="VRU Constituent Point Velocity (m/s)"
              help="Point-level radial velocity measured by the radar."
              value={ranges.velocity}
              onChange={(min, max) => setRanges((r) => ({ ...r, velocity: { min, max } }))}
            />
            <RangePair
              title="VRU Constituent Point RCS (dBscm)"
              help="Radar cross section of constituent points."
              value={ranges.rcs}
              onChange={(min, max) => setRanges((r) => ({ ...r, rcs: { min, max } }))}
            />
            <RangePair
              title="VRU Constituent Point SNR (dB)"
              help="Signal-to-noise ratio of constituent points."
              value={ranges.snr}
              onChange={(min, max) => setRanges((r) => ({ ...r, snr: { min, max } }))}
            />
          </div>

          {/* Actions (full row) */}
          <div
            className="bottom-actions"
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              gap: 10,
              justifyContent: "flex-end",
              paddingTop: 6,
            }}
          >
            <button
              type="button"
              className="btn btn-sm btn-apply"
              onClick={applyFilters}
              disabled={!canApply}
              style={{ minHeight: 34, padding: "6px 14px" }}
            >
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
                setVruCategory(VRU_CATEGORIES[0].value);
                setVruSubtype(VRU_CATEGORIES[0].children[0].value);
                setGait(DEFAULTS.gait);
                setMinInterval(DEFAULTS.minInterval);
                setMinTrajLen(DEFAULTS.minTrajLen);
                setRanges({ ...DEFAULTS.ranges });
              }}
              disabled={!canClear}
              style={{ minHeight: 34, padding: "6px 14px" }}
            >
              Clear
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

/* ---------- Range pair (compact with help) ---------- */
function RangePair({ title, value, onChange, help }) {
  return (
    <div className="field range-pair" style={{ marginBottom: 2 }}>
      <FieldLabel help={help}>{title}</FieldLabel>
      <div
        className="range-row"
        style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}
      >
        <div className="range-box" style={{ display: "grid", gap: 4 }}>
          <div className="mini-label" style={{ fontSize: 11, opacity: 0.7 }}>
            min
          </div>
          <input
            className="input input-xs"
            type="number"
            step="1"
            value={value.min}
            onChange={(e) => onChange(e.target.value, value.max)}
            style={{ width: 90 }}
          />
        </div>
        <div className="range-box" style={{ display: "grid", gap: 4 }}>
          <div className="mini-label" style={{ fontSize: 11, opacity: 0.7 }}>
            max
          </div>
          <input
            className="input input-xs"
            type="number"
            step="1"
            value={value.max}
            onChange={(e) => onChange(value.min, e.target.value)}
            style={{ width: 90 }}
          />
        </div>
      </div>
    </div>
  );
}
