import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "Postter1" && password === "KLM1234567") {
      setError("");
      alert("Giriş başarılı!");
      handleNavigateToPosts();
    } else {
      setError("Kullanıcı adı veya şifre hatalı!");
    }
  };

  const handleNavigateToPosts = () => {
    navigate("/posts");
  };

  return (
    <div className="main">
      <div className="login-image-area"></div>
      <div className="login-screen">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-container">
              <p className="form-label">User Name:</p>
              <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-container">
              <p className="form-label">Password:</p>
              <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
