// src/pages/ProjectDescription.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ProjectDescription.css";

// Hero artwork (re-using your banner)
import adBanner from "../assets/images/Advertisement1.png";

// Partner logos (same set/order)
import purdueLogo from "../assets/images/Purdue.png";
import tasiLogo from "../assets/images/TASI.png";
import toyotaLogo from "../assets/images/Toyota.png";
import csrcLogo from "../assets/images/CSRC.png";
import osuLogo from "../assets/images/OSU.png";
import eslLogo from "../assets/images/ESL.png";

/** Accessible, lightweight Accordion */
const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`acc-item ${open ? "open" : ""}`}>
      <button
        className="acc-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="acc-title">{title}</span>
        <svg
          className="acc-chevron"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
      <div className="acc-panel" role="region">
        {children}
      </div>
    </div>
  );
};

const ProjectDescription = () => {
  return (
    <main className="project-description">
      {/* Top gradient bar for subtle brand */}
      <div className="top-gradient" aria-hidden="true" />

      {/* Hero */}
      <section className="wrapper hero">
        <div className="hero-copy">
          <span className="eyebrow">Research Dataset</span>
          <h1 className="hero-title">
            Purdue – OSU – Toyota <span>Radar MicroDoppler</span> Dataset
          </h1>
          <p className="hero-subtitle">
            High-fidelity radar signatures across pedestrians, cyclists, e-scooters, and
            wheelchairs—curated for safety research, perception models, and real-world
            AV/ADAS scenarios.
          </p>

          <div className="hero-cta">
            <Link className="btn btn-primary" to="/dataset">
              Explore the Dataset
            </Link>
            <Link className="btn btn-ghost" to="/research">
              Read the Paper
            </Link>
          </div>
        </div>

        <figure className="hero-media">
          <img src={adBanner} alt="MicroDoppler dataset artwork" loading="eager" />
        </figure>
      </section>

      {/* Details */}
      <section className="wrapper details">
        <h2 className="section-title">Project Details</h2>

        <div className="acc-group">
          <Accordion title="Overview">
            <p>...</p>
          </Accordion>
          <Accordion title="Research Objective">
            <p>...</p>
          </Accordion>
          <Accordion title="Methodology">
            <p>...</p>
          </Accordion>
          <Accordion title="Key Findings">
            <p>...</p>
          </Accordion>
          <Accordion title="Impact and Applications">
            <p>...</p>
          </Accordion>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="logos-band" aria-label="Research Partners">
        <div className="wrapper logos-grid">
          <img src={purdueLogo} alt="Purdue University" />
          <img src={toyotaLogo} alt="Toyota Research & Development" />
          <img src={osuLogo} alt="The Ohio State University" />
          <img src={tasiLogo} alt="Transportation & Autonomous Systems Initiative (TASI)" />
          <img src={csrcLogo} alt="Toyota Collaborative Safety Research Center (CSRC)" />
          <img src={eslLogo} alt="ElectroScience Laboratory (ESL)" />
        </div>
      </section>
      {/* No local footer here; global site footer will render from App */}
    </main>
  );
};

export default ProjectDescription;
