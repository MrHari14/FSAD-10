import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const existingRole = localStorage.getItem("userRole");
    if (existingRole) {
      navigate(`/${existingRole}`);
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // simple client-side validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    // Persist minimal session info for demo routing
    localStorage.setItem("userRole", role || "student");
    localStorage.setItem("username", email.split("@")[0] || "User");

    navigate(`/${role || "student"}`);
  };

  return (
    <div className="login-page">
      <div className="brand">
        <div className="brand-icon" aria-hidden>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="6" fill="#2563EB" />
            <path d="M6 9l6 3 6-3-6-3-6 3z" fill="#fff" />
            <path d="M6 12.5v3L12 19l6-3.5v-3" stroke="#fff" strokeWidth="0.6" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="brand-text">EduSphere</div>
      </div>

      <div className="login-card">
        <h3 className="welcome">Welcome back</h3>
        <p className="sub">Sign in to your account to continue</p>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="field-label">Email</label>
          <input
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-input"
            required
          />

          <label className="field-label">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-input"
            required
          />

          <div className="role-row">
            <div>
              <label className="field-label">Sign in as</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="role-select">
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="creator">Creator</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="forgot-link-wrap">
              <Link to="/forgot" className="forgot-link">Forgot password?</Link>
            </div>
          </div>

          <button className="submit-btn" type="submit">Sign in</button>

          <div className="signup-row">
            Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;