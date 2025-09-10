import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

export default function CreateAccount() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const navigate = useNavigate();

  // validation rules
  const emailOk = /^\S+@\S+\.\S+$/.test(form.email);
  const namesOk = form.firstName.trim() && form.lastName.trim();
  const pwOk = form.password.length >= 8;
  const matchOk = form.password === form.confirm && form.confirm.length > 0;
  const isValid = emailOk && namesOk && pwOk && matchOk;

  function update(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid) return alert("Please fill all fields correctly.");
    await new Promise((r) => setTimeout(r, 400)); // mock API
    navigate("/login", { replace: true });
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="p-4 bg-white shadow rounded" style={{ width: "400px" }}>
        {/* top sign in link */}
        <div className="text-end mb-2">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>

        {/* title */}
        <h3 className="text-center mb-4">Create Account</h3>

        {/* form */}
        <Form onSubmit={handleSubmit} className="text-start">
          {/* First & Last Name */}
          <Row className="mb-3">
            <Col>
              <Form.Control
                placeholder="First name"
                name="firstName"
                value={form.firstName}
                onChange={update}
                required
              />
            </Col>
            <Col>
              <Form.Control
                placeholder="Last name"
                name="lastName"
                value={form.lastName}
                onChange={update}
                required
              />
            </Col>
          </Row>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={update}
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3 position-relative">
            <Form.Control
              type={showPw ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={update}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPw((v) => !v)}
            >
              {showPw ? <FaEyeSlash /> : <FaEye />}
            </span>
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group className="mb-3 position-relative">
            <Form.Control
              type={showPw2 ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirm"
              value={form.confirm}
              onChange={update}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPw2((v) => !v)}
            >
              {showPw2 ? <FaEyeSlash /> : <FaEye />}
            </span>
          </Form.Group>

          {/* Submit */}
          <div className="d-grid mt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="fw-semibold"
            >
              Create Account
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
