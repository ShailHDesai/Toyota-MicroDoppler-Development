// src/pages/ResearchPaper.jsx
import React, { useLayoutEffect, useMemo, useState } from "react";
import "../styles/ResearchPage.css";

/* ---------- Selectable PDFs ---------- */
const PAPERS = [
  {
    id: "pdf1",
    label: "PDF 1",
    title: "Radar MicroDoppler Dataset for VRU Safety Research",
    url: "https://contactfunctionstor123.blob.core.windows.net/portfolio-resumes/TEST%20DOCUMENT%20FOR%20WEB%20DEVELOPMENT.pdf",
  },
  {
    id: "pdf2",
    label: "PDF 2",
    title: "Technical Report — System & Tooling",
    url: "/docs/microdoppler-tech-report.pdf",
  },
];

/* ---------- Left-rail details ---------- */
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

/* ======================================================================= */

export default function ResearchPaper() {
  const [activeId, setActiveId] = useState(null);
  const activePaper = useMemo(
    () => PAPERS.find((p) => p.id === activeId) || null,
    [activeId]
  );

  const [copied, setCopied] = useState(false);

  // Sync header/footer sizes to avoid clipping
  useLayoutEffect(() => {
    const root = document.documentElement;
    const sync = () => {
      const header = document.querySelector("header");
      const footer = document.querySelector("footer");
      root.style.setProperty("--header-h", `${header?.offsetHeight || 80}px`);
      root.style.setProperty("--footer-h", `${footer?.offsetHeight || 0}px`);
      root.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* no-op */
    }
  };

  return (
    <main className="research-page light">
      <div className="rpL-shell">
        {/* LEFT: details */}
        <aside className="rpL-aside">
          <h2 className="rpL-title">{META.title}</h2>

          <ul className="rpL-meta">
            <li><span>Authors</span><strong>{META.authors.join(", ")}</strong></li>
            <li><span>Venue</span><strong>{META.venue}</strong></li>
            <li><span>Year</span><strong>{META.year}</strong></li>
            <li><span>DOI</span><strong>{META.doi}</strong></li>
          </ul>

          <div className="rpL-tags">
            {META.tags.map((t) => (
              <span key={t} className="rpL-tag">{t}</span>
            ))}
          </div>

          {/* PDF choices */}
          <div className="rpL-pdfs">
            <span className="rpL-sub">Open</span>
            {PAPERS.map((p) => (
              <button
                key={p.id}
                className={`btn-s ghost ${activeId === p.id ? "active" : ""}`}
                onClick={() => setActiveId(p.id)}
                title={p.title}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M14 2v6h6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                {p.label}
              </button>
            ))}
          </div>

          <div className="rpL-actions">
            <a
              className="btn-s primary"
              href={activePaper?.url || "#"}
              target="_blank"
              rel="noreferrer"
              aria-disabled={!activePaper}
              onClick={(e) => !activePaper && e.preventDefault()}
            >
              Open in New Tab
            </a>
            <a
              className="btn-s ghost"
              href={activePaper?.url || "#"}
              download
              aria-disabled={!activePaper}
              onClick={(e) => !activePaper && e.preventDefault()}
            >
              Download
            </a>
          </div>

          <div className="rpL-subrow">
            <span className="rpL-sub">Citation</span>
            <button className="btn-s tiny" onClick={onCopy}>
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="rpL-code"><code>{bibtex}</code></pre>
        </aside>

        {/* RIGHT: native PDF viewer */}
        <section className="rpL-viewer">
          {activePaper ? (
            <iframe
              className="paper-frame"
              src={`${activePaper.url}#toolbar=1&navpanes=1&scrollbar=1`}
              title={activePaper.title}
            />
          ) : (
            <div className="rpL-placeholder">
              <p>Select <strong>PDF 1</strong> or <strong>PDF 2</strong> to render the document.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
