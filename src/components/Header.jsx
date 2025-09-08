import React, { useState } from "react";
import "./Header.css";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

// ⬇️ Adjust the path if your assets folder differs
import mdLogo from "../assets/images/MicroDoppler-Logo1.png";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Always route Dataset through Login first, then bounce to /dataset
  const handleDatasetClick = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate("/login", { state: { from: { pathname: "/dataset" } } });
  };

  const goLoginForDataset = () => {
    setOpen(false);
    navigate("/login", { state: { from: { pathname: "/dataset" } } });
  };

  return (
    <header className={`md-header ${open ? "is-open" : ""}`}>
      {/* Animated background FX (nodes + texture) */}
      <div className="md-header__fx" aria-hidden="true">
        <span className="node n1" />
        <span className="node n2" />
        <span className="node n3" />
        <span className="node n4" />
        <span className="node n5" />
        <span className="node n6" />
        <span className="grain" />
      </div>

      <div className="md-header__inner">
        {/* NEW: MicroDoppler logo pinned to the left edge */}
        <NavLink
          to="/"
          end
          className="md-logo"
          aria-label="Micro-Doppler home"
          onClick={() => setOpen(false)}
        >
          <img src={mdLogo} alt="Micro-Doppler Project logo" />
        </NavLink>

        {/* Brand text */}
        <NavLink to="/" end className="brand" onClick={() => setOpen(false)}>
          <span className="brand-dot" aria-hidden="true" />
          <span className="brand-text">Micro-Doppler Project</span>
        </NavLink>

        {/* Mobile toggle */}
        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open ? "true" : "false"}
          aria-controls="primary-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* Primary nav */}
        <nav className="md-nav" id="primary-nav">
          <ul onClick={() => setOpen(false)}>
            <li>
              <NavLink to="/description">Project Description</NavLink>
            </li>
            <li>
              <NavLink to="/research">Research Paper</NavLink>
            </li>
            <li>
              <NavLink to="/contributors">Contributors</NavLink>
            </li>
            <li>
              {/* Route through login first */}
              <NavLink to="/dataset" onClick={handleDatasetClick}>
                Dataset
              </NavLink>
            </li>
            <li>
              <NavLink to="/feedback">Feedback</NavLink>
            </li>
          </ul>
        </nav>

        {/* Login */}
        <div className="login-section">
          <button className="login-btn" onClick={goLoginForDataset}>
            <FaUserCircle className="login-icon" />
            <span className="login-text">Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}
