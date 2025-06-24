import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.leftContainer}>
      <a href="#home" style={styles.logo}>
  <img
    src="https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/ktxawy1of4k8v6c5mvqe"
    alt="Nueve Solutions Logo"
    style={{ height: "45px", verticalAlign: "middle" }}
  />
</a>
  
        <div style={styles.links}>
          <a href="#home" style={styles.link}>Home</a>
          <a href="#about" style={styles.link}>About Us</a>
          <a href="#careers" style={styles.link}>Careers</a>
          <a href="#contact" style={styles.link}>Contact</a>
        </div>
      </div>

      <div style={styles.dropdownContainer}>
        <button onClick={toggleDropdown} style={styles.loginBtn}>
          🔐 Login
        </button>

        {dropdownOpen && (
          <div style={styles.dropdown}>
            <Link to="/login/hr" onClick={closeDropdown} style={styles.dropdownLink}>
              Login as HR
            </Link>
            <Link to="/login/manager" onClick={closeDropdown} style={styles.dropdownLink}>
              Login as Manager
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position:"fixed",
    width:"100%",
    top:0,
    left:0,
    background:"#0d47a1",
    zIndex:1000,
    padding: "10px 0px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
    
  },
  leftContainer: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "20px",
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px",
  },
  dropdownContainer: {
    position: "relative",
  },
  loginBtn: {
    background: "#0b3c7c",
    color: "white",
    padding: "8px 16px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    borderRadius: "4px",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "40px",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "160px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    zIndex: 1000,
  },
  dropdownLink: {
    display: "block",
    padding: "10px 15px",
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
};

export default Navbar;
