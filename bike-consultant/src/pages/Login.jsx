import { useState } from "react";
import { Bike, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

function Login({ onLogin }) {
  const [username, setUsername] = useState("michaelw");
  const [password, setPassword] = useState("michaelwpass");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function useDemoAccount() {
    setUsername("michaelw");
    setPassword("michaelwpass");
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await loginUser(username, password);
      const loginRole = username.toLowerCase() === "emilys" ? "admin" : "customer";
      onLogin({ ...data, role: loginRole });
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    }
    setLoading(false);
  }

  return <main className="login-page"><div className="login-shell">
    <div className="login-brand"><span className="brand-mark"><Bike size={22} /></span><strong>motora<span className="dot">.</span></strong></div>
    <div className="login-card">
      <div className="login-head"><p className="eyebrow">WELCOME BACK</p><h1>Sign in to Motora</h1><p>Discover your next ride and manage your bike listings.</p></div>
      <form onSubmit={submit} className="login-form">
        <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} required /></label>
        <label>Password<div className="password-field"><input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label>
        {error && <div className="error-box">{error}</div>}
        <button className="primary-btn full-btn" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
      </form>
      <button className="demo-btn" onClick={useDemoAccount}>Use customer demo account</button>
      <div className="login-security"><ShieldCheck size={17} /><span>Secure demo authentication via REST API</span></div>
    </div>
    <Link className="back-home" to="/">← Back to home</Link>
  </div></main>;
}
export default Login;
