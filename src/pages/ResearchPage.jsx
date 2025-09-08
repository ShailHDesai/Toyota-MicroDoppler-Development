// src/pages/ResearchPaper.jsx
import React, { useState, useEffect } from "react";
import Paper from "../components/Paper";
import SkeletonInfo from "../components/SkeletonInfo";
import "../styles/ResearchPage.css";

const DOC_URL = "/docs/microdoppler-research-paper.pdf"; // ← put your PDF here

const META = {
  title: "Radar MicroDoppler Dataset for VRU Safety Research",
  authors: ["Shail Desai", "Stanley Chien", "Team"],
  venue: "Purdue – OSU – Toyota Collaboration",
  year: "2025",
  doi: "10.1234/microdoppler.2025.001",
  tags: ["Radar", "MicroDoppler", "VRU", "ADAS", "Dataset"],
};

const bibtex = `@article{microdoppler2025,
  title={${META.title}},
  author={${META.authors.join(" and ")}},
  journal={${META.venue}},
  year={${META.year}},
  doi={${META.doi}}
}`;

const ResearchPaper = () => {
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const copyCitation = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <main className="research-page">
      <div className="rp-topbar" aria-hidden="true" />
      <div className="rp-wrapper">
        {/* Left: Paper viewer */}
        <section className="rp-paper">
          <Paper src={DOC_URL} title={META.title} />
        </section>

        {/* Right: Info panel */}
        <aside className="rp-aside">
          {loading ? (
            <SkeletonInfo />
          ) : (
            <div className="rp-card">
              <h2 className="rp-title">{META.title}</h2>

              <ul className="rp-meta">
                <li><span>Authors</span><strong>{META.authors.join(", ")}</strong></li>
                <li><span>Venue</span><strong>{META.venue}</strong></li>
                <li><span>Year</span><strong>{META.year}</strong></li>
                <li><span>DOI</span><strong>{META.doi}</strong></li>
              </ul>

              <div className="rp-tags">
                {META.tags.map((t) => (
                  <span key={t} className="rp-tag">{t}</span>
                ))}
              </div>

              <div className="rp-actions">
                <a className="btn btn-primary" href={DOC_URL} target="_blank" rel="noreferrer">
                  Open PDF
                </a>
                <a className="btn btn-ghost" href={DOC_URL} download>
                  Download
                </a>
              </div>

              <div className="rp-citation">
                <div className="rp-citation-header">
                  <h3>Citation (BibTeX)</h3>
                  <button className="btn btn-mini" onClick={copyCitation}>
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="rp-code"><code>{bibtex}</code></pre>
              </div>

              <div className="rp-notes">
                <h3>About this paper</h3>
                <p>
                  This document presents our cross-institution MicroDoppler dataset and
                  methods for robust VRU (pedestrians, cyclists, e-scooters, wheelchairs)
                  detection and analysis. The PDF viewer supports continuous scrolling and
                  a distraction-free fullscreen mode.
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
};

export default ResearchPaper;
