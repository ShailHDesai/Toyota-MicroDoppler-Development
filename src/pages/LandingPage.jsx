// src/pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import "../styles/LandingPage.css";

import landingBg from "../assets/images/LandingPage1.png";
import titleBg from "../assets/images/Title_Background.jpg";
import purdueLogo from "../assets/images/Purdue.png";
import toyotaLogo from "../assets/images/Toyota.png";
import osuLogo from "../assets/images/OSU.png";
import tasiLogo from "../assets/images/TASI.png";
import csrcLogo from "../assets/images/CSRC.png";
import eslLogo from "../assets/images/ESL.png";

const logos = [
  // Row 1
  { src: purdueLogo, alt: "Purdue University" },
  { src: toyotaLogo, alt: "Toyota Research & Development" },
  { src: osuLogo, alt: "The Ohio State University" },
  // Row 2
  { src: tasiLogo, alt: "TASI" },
  { src: csrcLogo, alt: "Toyota CSRC" },
  { src: eslLogo, alt: "ElectroScience Laboratory" },
];

const LandingPage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${landingBg})` }}
    >
      {showContent && (
        <div className="lp-container">
          {/* HERO */}
          <section
            className="hero"
            style={{ backgroundImage: `url(${titleBg})` }}
          >
            <div className="hero-inner">
              <h1 className="hero-main">VRU Radar Micro-Doppler Dataset</h1>
              <h2 className="hero-sub">Purdue – OSU – Toyota</h2>

              <p className="hero-lede">
                A research-grade dataset for understanding micro-Doppler
                signatures of vulnerable road users. Built to be queried,
                filtered, and downloaded fast.
              </p>
            </div>
          </section>

          {/* LOGOS */}
          <section className="logo-grid" aria-label="Contributing Organizations">
            {logos.map((l) => (
              <div key={l.alt} className="logo-card" title={l.alt}>
                <img src={l.src} alt={l.alt} loading="lazy" />
              </div>
            ))}
          </section>

          <p className="lp-tagline">
            Built by Purdue · OSU · Toyota — radar micro-Doppler data ready for
            research and ML.
          </p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
