import React from "react";
import EmployeeForm from "../components/EmployeeForm";
import { useNavigate } from "react-router-dom";

const AddEmployeePage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/dashboard/hr"); 
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Segoe UI, sans-serif",
        backgroundColor: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          padding: "40px 30px",
        }}
      >
        <h2
          style={{
            color: "#1565c0",
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "25px",
          }}
        >
          
        </h2>

        {/* Embedded form */}
        <EmployeeForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
};

export default AddEmployeePage;
