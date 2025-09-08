import React, { useEffect, useState } from "react";
import "../styles/LandingPage.css";

import landingBg from "../assets/images/LandingPage1.png";
import titleBg from "../assets/images/Title_Background.jpg";
import purdueLogo from "../assets/images/Purdue.png";
import tasiLogo from "../assets/images/TASI.png";
import toyotaLogo from "../assets/images/Toyota.png";
import csrcLogo from "../assets/images/CSRC.png";
import osuLogo from "../assets/images/OSU.png";
import eslLogo from "../assets/images/ESL.png";

const logos = [
  { src: purdueLogo, alt: "Purdue University" },
  { src: toyotaLogo, alt: "Toyota Research & Development" },
  { src: osuLogo, alt: "The Ohio State University" },
  { src: tasiLogo, alt: "TASI" },
  { src: csrcLogo, alt: "Toyota CSRC" },
  { src: eslLogo, alt: "ElectroScience Laboratory" },
];

const LandingPage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 320);
    return () => clearTimeout(timer);
  }, []);

  // 3D tilt + hotspot for logo badges
  const handleCardMouseMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", x.toFixed(3));
    el.style.setProperty("--my", y.toFixed(3));
    const rx = (0.5 - y) * 5;
    const ry = (x - 0.5) * 6;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
  };
  const resetTilt = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--mx", "0.5");
    el.style.setProperty("--my", "0.5");
  };

  // Hotspot-follow effect for aurora buttons
  const handleBtnMove = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", x.toFixed(3));
    el.style.setProperty("--my", y.toFixed(3));
  };
  const resetBtn = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--mx", "0.5");
    el.style.setProperty("--my", "0.5");
    el.classList.remove("is-press");
  };

  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${landingBg})` }}
    >
      <div className="ai-aurora" aria-hidden />

      {showContent && (
        <div className="lp-container">
          {/* HERO */}
          <section
            className="hero"
            style={{ backgroundImage: `url(${titleBg})` }}
          >
            <span aria-hidden className="hero-aurora" />

            <div className="hero-inner">
              <p className="hero-kicker">VRU Radar Micro-Doppler Database</p>

              <h1 className="hero-title">
                Purdue – OSU – Toyota
                <span className="hero-cursor" aria-hidden />
              </h1>

              <p className="hero-lede">
                A research-grade dataset for understanding micro-Doppler
                signatures of vulnerable road users. Built to be queried,
                filtered, and downloaded—fast.
              </p>

              <div className="chip-row" role="list">
                <span className="chip" role="listitem">Curated Sessions</span>
                <span className="chip" role="listitem">
                  Synchronized CAN · Radar · Camera
                </span>
                <span className="chip" role="listitem">Scenario-aware Filters</span>
                <span className="chip" role="listitem">CSV + Image Bundles</span>
              </div>

              <div className="hero-cta">
                <a
                  className="btn btn-aurora btn-purple"
                  href="/dataset"
                  onMouseMove={handleBtnMove}
                  onMouseLeave={resetBtn}
                  onMouseDown={(e) => e.currentTarget.classList.add("is-press")}
                  onMouseUp={(e) => e.currentTarget.classList.remove("is-press")}
                >
                  Explore Dataset
                </a>

                <a
                  className="btn btn-aurora btn-emerald"
                  href="/project"
                  onMouseMove={handleBtnMove}
                  onMouseLeave={resetBtn}
                  onMouseDown={(e) => e.currentTarget.classList.add("is-press")}
                  onMouseUp={(e) => e.currentTarget.classList.remove("is-press")}
                >
                  Project Overview
                </a>
              </div>

              <ul className="stat-row" aria-label="Dataset snapshot">
                <li><strong>1.2M+</strong><span>frames</span></li>
                <li><strong>200+</strong><span>VRU runs</span></li>
                <li><strong>2 modes</strong><span>Stationary &amp; Moving radar</span></li>
              </ul>
            </div>
          </section>

          {/* LOGO BADGES */}
          <section className="logo-grid" aria-label="Contributing Organizations">
            {logos.map((l) => (
              <article
                key={l.alt}
                className="logo-card aurora-border"
                tabIndex={0}
                title={l.alt}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={resetTilt}
                onFocus={(e) => e.currentTarget.classList.add("is-focus")}
                onBlur={(e) => e.currentTarget.classList.remove("is-focus")}
                aria-label={l.alt}
              >
                <img src={l.src} alt={l.alt} loading="lazy" />
              </article>
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
