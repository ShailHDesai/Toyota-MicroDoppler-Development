import React from "react";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mdp-footer" role="contentinfo" aria-label="Site footer">
      <div className="mdp-footer__line" aria-hidden="true" />

      <div className="mdp-footer__inner mdp-footer__inner--center">
        <div className="mdp-footer__brand" title="Micro-Doppler Project">
          <span className="logo-dot" aria-hidden="true" />
          <span className="brand-name">Micro-Doppler Project</span>
          <span className="sep" aria-hidden="true">•</span>
          <span className="year">© {year}</span>
        </div>
      </div>
    </footer>
  );
}
