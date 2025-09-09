// src/pages/ProjectDescription.jsx
import React, { useState } from "react";
import "../styles/ProjectDescription.css";

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

      {/* Details only (hero removed) */}
      <section className="wrapper details">
        <h2 className="section-title">Project Description</h2>

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
      {/* No local footer; global site footer renders from App */}
    </main>
  );
};

export default ProjectDescription;
