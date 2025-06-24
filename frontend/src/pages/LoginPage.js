import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { role } = useParams(); 
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole === "hr" || storedRole === "manager") {
      navigate(`/dashboard/${storedRole}`, { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      (role === "hr" && credentials.username === "hr" && credentials.password === "hr123") ||
      (role === "manager" && credentials.username === "manager" && credentials.password === "manager123")
    ) {
      localStorage.setItem("userRole", role);
      toast.success(`Logged in as ${role.toUpperCase()}`);
      navigate(`/dashboard/${role}`, { replace: true });
    } else {
      toast.error("Invalid credentials. Try again.");
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#0a46a1", minHeight: "150vh" }}>
 
  <div
    style={{
      backgroundColor: "#0d47a1",
      color: "white",
      padding: "10px 20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div style={{ fontSize: "14px" }}>
      📞 (512) 630-0635 &nbsp;&nbsp;&nbsp; 📧 hello@nuevesolutions.com
    </div>
    <div style={{ fontWeight: "bold", fontSize: "40px" }}>in</div>
  </div>

      

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "80px" }}>
        <form
          onSubmit={handleLogin}
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            width: "100%",
            maxWidth: "400px"
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "30px", color: "#1976d2" }}>
            Login as {role.toUpperCase()}
          </h3>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "25px",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            🔐 Login
          </button>
        </form>
      </div>

  
      <footer style={{ backgroundColor: "#0d1b3d", color: "white", padding: "20px", textAlign: "center", marginTop: "60px" }}>
        <p>&copy; 2025 NUEVE Solutions | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LoginPage;
