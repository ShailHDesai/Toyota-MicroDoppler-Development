// src/components/Paper.jsx
import React from "react";
import "./Paper.css";

const Paper = () => {
  // Azure Blob PDF link
  const pdfFile =
    "https://contactfunctionstor123.blob.core.windows.net/portfolio-resumes/TEST%20DOCUMENT%20FOR%20WEB%20DEVELOPMENT.pdf";

  return (
    <div className="paper-container">
      <h2 className="paper-title">Research Paper Viewer</h2>

      {/* PDF Viewer (Iframe only) */}
      <iframe
        src={pdfFile}
        width="100%"
        height="800px"
        style={{ border: "none", borderRadius: "12px" }}
        title="PDF Viewer"
      />

      {/* Download Button */}
      <div className="paper-download">
        <a href={pdfFile} download className="download-btn">
          ⬇ Download PDF
        </a>
      </div>
    </div>
  );
};

export default Paper;
