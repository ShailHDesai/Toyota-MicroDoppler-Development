import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "../styles/CreateAccount.module.css"; // ✅ CSS Modules import

export default function CreateAccount() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    // TODO: connect to backend API
    console.log("Creating account:", form);
    navigate("/login"); // redirect after signup
  }

  return (
    <div className={styles["create-page"]}>
      <div className={styles["create-card"]}>
        <header className={styles["create-head"]}>
          <h1 className={styles["create-title"]}>Create Account</h1>
          <p className={styles["create-sub"]}>
            Sign up to access the VRU Radar Micro-Doppler dataset
          </p>
        </header>

        <form className={styles["create-form"]} onSubmit={onSubmit}>
          {/* First + Last Name Row */}
          <div className={styles["name-row"]}>
            <label className={styles.field}>
              <span className={styles["field-label"]}>First Name</span>
              <input
                className={styles.input}
                type="text"
                name="firstName"
                placeholder="John"
                value={form.firstName}
                onChange={onChange}
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles["field-label"]}>Last Name</span>
              <input
                className={styles.input}
                type="text"
                name="lastName"
                placeholder="Doe"
                value={form.lastName}
                onChange={onChange}
                required
              />
            </label>
          </div>

          {/* Email */}
          <label className={styles.field}>
            <span className={styles["field-label"]}>Email</span>
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="you@institution.edu"
              value={form.email}
              onChange={onChange}
              required
            />
          </label>

          {/* Password */}
          <label className={styles.field}>
            <span className={styles["field-label"]}>Password</span>
            <div className={styles["password-wrapper"]}>
              <input
                className={styles.input}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={onChange}
                required
              />
              <button
                type="button"
                className={styles["eye-btn"]}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          {/* Confirm Password */}
          <label className={styles.field}>
            <span className={styles["field-label"]}>Confirm Password</span>
            <div className={styles["password-wrapper"]}>
              <input
                className={styles.input}
                type={showConfirm ? "text" : "password"}
                name="confirm"
                placeholder="••••••••"
                value={form.confirm}
                onChange={onChange}
                required
              />
              <button
                type="button"
                className={styles["eye-btn"]}
                onClick={() => setShowConfirm((v) => !v)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          {/* Submit Button */}
          <div className={styles.actions}>
            <button type="submit" className={`${styles.btn} ${styles["btn-purple"]}`}>
              Create Account
            </button>
          </div>
        </form>

        <footer className={styles["create-footer"]}>
          <Link className={styles["link-muted"]} to="/login">
            Already have an account? Sign In
          </Link>
        </footer>
      </div>
    </div>
  );
}
