// src/pages/ResearchPaper.jsx
import React, { useLayoutEffect, useMemo, useState } from "react";
import "../styles/ResearchPage.css";

/* ---------- PDFs available ---------- */
const PAPERS = [
  {
    id: "pdf1",
    title: "Radar MicroDoppler Dataset for VRU Safety Research",
    url: "https://contactfunctionstor123.blob.core.windows.net/portfolio-resumes/TEST%20DOCUMENT%20FOR%20WEB%20DEVELOPMENT.pdf",
  },
  {
    id: "pdf2",
    title: "Technical Report — System & Tooling",
    url: "/docs/microdoppler-tech-report.pdf",
  },
];

/* ---------- Small PDF icon ---------- */
const PdfIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: 8 }}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);

/* ======================================================================= */

export default function ResearchPaper() {
  const [activeId, setActiveId] = useState(null);
  const activePaper = useMemo(
    () => PAPERS.find((p) => p.id === activeId) || null,
    [activeId]
  );

  // Keep viewer sized correctly with header/footer
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

  return (
    <main className="research-page light">
      <div className="rpL-shell">
        {/* LEFT: titles only */}
        <aside className="rpL-aside">
          <h2 className="rpL-title">Papers</h2>

          <ul className="rpL-list">
            {PAPERS.map((p) => (
              <li key={p.id} className="rpL-item">
                <button
                  className={`rpL-link ${activeId === p.id ? "active" : ""}`}
                  onClick={() => setActiveId(p.id)}
                  title={p.title}
                >
                  <PdfIcon />
                  <span className="rpL-ellipsis">{p.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* RIGHT: PDF viewer */}
        <section className="rpL-viewer">
          {activePaper ? (
            <iframe
              className="paper-frame"
              src={`${activePaper.url}#toolbar=1&navpanes=1&scrollbar=1`}
              title={activePaper.title}
            />
          ) : (
            <div className="rpL-placeholder">
              <p>Select a paper title on the left to view the PDF.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
