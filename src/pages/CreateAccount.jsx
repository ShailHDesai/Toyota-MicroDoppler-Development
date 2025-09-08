import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";   // 👈 added icons
import "../styles/CreateAccount.css";

import landingBg from "../assets/images/LandingPage1.png";

const initial = {
  firstName: "",
  lastName: "",
  email: "",
  position: "",
  password: "",
  confirm: "",
  reason: "",
};

function usePasswordStrength(pw) {
  const score = useMemo(() => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (pw.length >= 12) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[a-z]/.test(pw)) s++;
    if (/\d/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return Math.min(4, Math.floor(s / 2));
  }, [pw]);

  const label = ["Weak", "Fair", "Good", "Strong", "Excellent"][score] || "Weak";
  return { score, label };
}

export default function CreateAccount() {
  const [form, setForm] = useState(initial);
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const { score, label } = usePasswordStrength(form.password);

  const emailOk = /^\S+@\S+\.\S+$/.test(form.email);
  const namesOk = form.firstName.trim().length > 1 && form.lastName.trim().length > 1;
  const posOk = form.position.trim().length > 1;
  const pwOk =
    form.password.length >= 8 &&
    /[A-Za-z]/.test(form.password) &&
    /\d/.test(form.password);
  const matchOk = form.password === form.confirm && form.confirm.length > 0;
  const reasonOk = form.reason.trim().length >= 20;

  const isValid = emailOk && namesOk && posOk && pwOk && matchOk && reasonOk;

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);

    await new Promise((r) => setTimeout(r, 900));

    setSuccess(true);
    setSubmitting(false);

    setTimeout(() => navigate("/login", { replace: true }), 1100);
  }

  return (
    <div
      className="create-page"
      style={{ backgroundImage: `url(${landingBg})` }}
    >
      <div className="mesh-backdrop" aria-hidden />
      <main className="signup-shell" role="main">
        <section className="glass-card aurora-hairline">
          <header className="card-head">
            <p className="kicker">Create your access</p>
            <h1 className="title">Join the Micro-Doppler dataset community</h1>
            <p className="lede">
              One account for exploring curated sessions, scenario-aware filters,
              and downloadable CSV + image bundles.
            </p>
          </header>

          <form className="form-grid" onSubmit={handleSubmit} noValidate>
            {/* Name row */}
            <div className="row two">
              <div className="field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  className="input"
                  value={form.firstName}
                  onChange={update}
                  autoComplete="given-name"
                  aria-invalid={namesOk ? "false" : "true"}
                />
              </div>
              <div className="field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  className="input"
                  value={form.lastName}
                  onChange={update}
                  autoComplete="family-name"
                  aria-invalid={namesOk ? "false" : "true"}
                />
              </div>
            </div>

            {/* Email + Position */}
            <div className="row two">
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  value={form.email}
                  onChange={update}
                  autoComplete="email"
                  aria-invalid={emailOk ? "false" : "true"}
                />
                {!emailOk && form.email && (
                  <p className="hint error">Enter a valid email (e.g., name@org.com)</p>
                )}
              </div>
              <div className="field">
                <label htmlFor="position">Position</label>
                <input
                  id="position"
                  name="position"
                  className="input"
                  value={form.position}
                  onChange={update}
                  placeholder="e.g., Graduate Researcher, ADAS Engineer"
                  aria-invalid={posOk ? "false" : "true"}
                />
              </div>
            </div>

            {/* Passwords */}
            <div className="row two">
              <div className="field">
                <label htmlFor="password">Password</label>
                <div className="password-wrap">
                  <input
                    id="password"
                    name="password"
                    type={showPw ? "text" : "password"}
                    className="input"
                    value={form.password}
                    onChange={update}
                    autoComplete="new-password"
                    aria-invalid={pwOk ? "false" : "true"}
                  />
                  <button
                    type="button"
                    className="peek"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                <div className={`strength strength-${score}`} aria-live="polite">
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  <span className="bar" />
                  <em className="label">{label}</em>
                </div>

                <p className="hint">
                  Use at least 8 characters, with letters and numbers. Symbols improve strength.
                </p>
              </div>

              <div className="field">
                <label htmlFor="confirm">Confirm Password</label>
                <div className="password-wrap">
                  <input
                    id="confirm"
                    name="confirm"
                    type={showPw2 ? "text" : "password"}
                    className="input"
                    value={form.confirm}
                    onChange={update}
                    autoComplete="new-password"
                    aria-invalid={matchOk ? "false" : "true"}
                  />
                  <button
                    type="button"
                    className="peek"
                    onClick={() => setShowPw2((v) => !v)}
                    aria-label={showPw2 ? "Hide password" : "Show password"}
                  >
                    {showPw2 ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {!matchOk && form.confirm && (
                  <p className="hint error">Passwords don’t match.</p>
                )}
              </div>
            </div>

            {/* Reason */}
            <div className="row one">
              <div className="field">
                <label htmlFor="reason">Reason for using Dataset</label>
                <textarea
                  id="reason"
                  name="reason"
                  className="input textarea"
                  rows={5}
                  value={form.reason}
                  onChange={update}
                  placeholder="Briefly describe the research or development context, expected usage, and team/project."
                  aria-invalid={reasonOk ? "false" : "true"}
                />
                <p className={`hint ${reasonOk || !form.reason ? "" : "error"}`}>
                  {reasonOk
                    ? "Looks good."
                    : "Please provide at least 20 characters."}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="actions">
              <button
                type="submit"
                className="btn btn-primary liquid-aurora"
                disabled={!isValid || submitting}
              >
                {submitting ? "Creating..." : "Create account"}
              </button>

              <Link to="/login" className="btn btn-ghost aurora-green">
                I already have an account
              </Link>
            </div>

            {success && (
              <div className="banner success" role="status" aria-live="polite">
                Account created. Redirecting to login…
              </div>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}
