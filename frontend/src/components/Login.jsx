import { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import "./login.css";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      login(data);

      if (data.user.role === "admin") window.location.href = "/admin";
      else window.location.href = "/home";

    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to continue</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Email"
              required 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password"
              required 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
