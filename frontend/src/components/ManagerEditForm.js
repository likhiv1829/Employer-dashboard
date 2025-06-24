import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManagerEditForm = ({ employee, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    id: "",
    project_assigned: "",
    team_lead: "",
    role: "",
    salary: "",
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id,
        project_assigned: employee.project_assigned || "",
        team_lead: employee.team_lead || "",
        role: employee.role || "",
        salary: employee.salary || "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8888/employees/manager?id=${formData.id}`, formData);
      toast.success("Employee updated successfully");
      onSuccess();
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed");
    }
  };

  const inputStyle = {
    border: "1px solid #90caf9",
    borderRadius: "4px",
    padding: "8px",
    fontSize: "14px",
    outlineColor: "#1976d2",
  };

  const labelStyle = {
    fontWeight: "600",
    marginBottom: "4px",
    color: "#0d47a1",
  };

  const fieldContainer = {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        borderRadius: "10px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h3 style={{ color: "#1565c0", marginBottom: "20px" }}>
        ✏️ Edit Employee Fields (Manager Access)
      </h3>

      {[
        { name: "project_assigned", label: "Project Assigned", type: "text" },
        { name: "team_lead", label: "Team Lead", type: "text" },
        { name: "role", label: "Role", type: "text" },
        { name: "salary", label: "Salary", type: "number" },
      ].map((field) => (
        <div key={field.name} style={fieldContainer}>
          <label htmlFor={field.name} style={labelStyle}>
            {field.label}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            onChange={handleChange}
            style={inputStyle}
            required
            min={field.name === "salary" ? "0" : undefined}
          />
        </div>
      ))}

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#1976d2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          💾 Save
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              backgroundColor: "#90a4ae",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ❌ Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ManagerEditForm;
