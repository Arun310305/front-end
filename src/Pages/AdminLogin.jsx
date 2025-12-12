import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminLogin.module.css";

 function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "admin" && password === "1234") {
      localStorage.setItem("adminAuth", "true");
      navigate("/Admin"); 
    } else {
      alert("Invalid admin credentials");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Admin Login</h2>

        <div className={styles.fieldWrapper}>
          <label className={styles.label}>Username</label>
          <input
            type="text"
            placeholder="Enter admin username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.fieldWrapper}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter admin password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className={styles.btn} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
export default AdminLogin;