// src/components/SkeletonInfo.jsx
import React from "react";
import "../styles/ResearchPage.css";

const SkeletonInfo = () => {
  return (
    <aside className="info-section">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-line"></div>
      <div className="skeleton skeleton-line short"></div>
      <div className="skeleton skeleton-line"></div>
    </aside>
  );
};

export default SkeletonInfo;
