// src/components/Paper.jsx
import React from "react";
import "./Paper.css";

/**
 * Iframe PDF viewer using pdf.js with full toolbar.
 * - Shows entire page (page-fit)
 * - Print & Download buttons visible in the toolbar
 * Prereq: pdf.js files in /public/pdfjs (so /pdfjs/web/viewer.html exists).
 */
export default function Paper({
  src = "https://contactfunctionstor123.blob.core.windows.net/portfolio-resumes/TEST%20DOCUMENT%20FOR%20WEB%20DEVELOPMENT.pdf",
  title = "Research Paper Viewer",
}) {
  const viewerUrl = `/pdfjs/web/viewer.html?file=${encodeURIComponent(
    src
  )}#zoom=page-fit&pagemode=none`;

  return (
    <div className="paper-container">
      <h2 className="paper-title">Research Paper Viewer</h2>
      <iframe
        className="paper-frame"
        src={viewerUrl}
        title={title}
        loading="lazy"
        /* allow clipboard for pdf.js copy, optional */
        allow="clipboard-read; clipboard-write"
      />
      {/* You can keep this external download as a secondary action if you want */}
      <div className="paper-download">
        <a href={src} download className="download-btn">
          ⬇ Download PDF
        </a>
      </div>
    </div>
  );
}
