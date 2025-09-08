// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";   // 👈 new import
import "../styles/LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 state for toggling

  function onSubmit(e) {
    e.preventDefault();
    navigate("/dataset", { replace: true, state: { fromLogin: true } });
  }

  // Aurora button hotspot follow
  function handleBtnMove(e) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", x.toFixed(3));
    el.style.setProperty("--my", y.toFixed(3));
  }

  function resetBtn(e) {
    const el = e.currentTarget;
    el.style.setProperty("--mx", "0.5");
    el.style.setProperty("--my", "0.5");
    el.classList.remove("is-press");
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <header className="login-head">
          <h1 className="login-title">Sign in</h1>
          <p className="login-sub">Access the VRU Radar Micro-Doppler dataset</p>
        </header>

        <form className="login-form" onSubmit={onSubmit}>
          <label className="field">
            <span className="field-label">Email</span>
            <input
              className="input"
              type="email"
              autoComplete="email"
              placeholder="you@institution.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <div className="password-wrapper">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <div className="actions">
            <button
              type="submit"
              className="btn btn-aurora btn-purple"
              onMouseMove={handleBtnMove}
              onMouseLeave={resetBtn}
              onMouseDown={(e) => e.currentTarget.classList.add("is-press")}
              onMouseUp={(e) => e.currentTarget.classList.remove("is-press")}
            >
              Sign In
            </button>

            <Link
              to="/create-account"
              className="btn btn-aurora btn-outline"
              onMouseMove={handleBtnMove}
              onMouseLeave={resetBtn}
              onMouseDown={(e) => e.currentTarget.classList.add("is-press")}
              onMouseUp={(e) => e.currentTarget.classList.remove("is-press")}
              aria-label="Create a new account"
              title="Create a new account"
            >
              Create Account
            </Link>
          </div>
        </form>

        <footer className="login-footer">
          <Link className="link-muted" to="/reset">
            Forgot password?
          </Link>
        </footer>
      </div>
    </div>
  );
}
