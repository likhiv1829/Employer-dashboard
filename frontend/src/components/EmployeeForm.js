import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ employee, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    id: null,
    full_name: "",
    email: "",
    phone_number: "",
    address: "",
    date_of_birth: "",
    joining_date: "",
    job_title: "",
    department: "",
    project_assigned: "",
    team_lead: "",
    photo_url: "",
    salary: "",
    role: "",
    payment_method: "",
    bank_account_details: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (employee) {
      setFormData((prev) => ({ ...prev, ...employee }));
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employee) {
        await axios.put("http://localhost:8888/employees", formData);
        toast.success("Employee updated successfully!");
      } else {
        await axios.post("http://localhost:8888/employees", formData);
        toast.success("Employee added successfully!");
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save employee");
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1); 
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
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
      <h3 style={{ color: "#1565c0", marginBottom: "20px" }}>
        {employee ? "✏️ Edit Employee" : "➕ Add New Employee"}
      </h3>

      {[
        "full_name", "email", "phone_number", "address",
        "date_of_birth", "joining_date", "job_title", "department",
        "project_assigned", "team_lead", "photo_url", "salary",
        "role", "payment_method", "bank_account_details",
      ].map((field) => (
        <div key={field} style={fieldContainer}>
          <label htmlFor={field} style={labelStyle}>
            {field.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </label>
          <input
            id={field}
            type={
              field.includes("date")
                ? "date"
                : field === "salary"
                ? "number"
                : "text"
            }
            name={field}
            value={formData[field]}
            onChange={handleChange}
            style={inputStyle}
            required={["full_name", "email"].includes(field)}
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
          {employee ? "Update" : "Add"} Employee
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            padding: "10px 20px",
            backgroundColor: "#90a4ae",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
