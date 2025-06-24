import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import EmployeeForm from "../components/EmployeeForm";
import { useNavigate, Link } from "react-router-dom";

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchBy, setSearchBy] = useState("name");
  const [query, setQuery] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role !== "hr") {
      toast.error("⚠️ Unauthorized access. Please log in.");
      navigate(`/login/hr`);
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8888/employees");
      setEmployees(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching employees:", err);
      toast.error("Failed to load employee data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = () => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return setFiltered(employees);

    const result = employees.filter((emp) =>
      searchBy === "id"
        ? emp.id?.toString() === trimmed
        : emp.full_name?.toLowerCase().includes(trimmed)
    );
    setFiltered(result);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await axios.delete(`http://localhost:8888/employees?id=${id}`);
      toast.success("🗑️ Deleted successfully");
      fetchData();
    } catch (err) {
      console.error("Error deleting:", err);
      toast.error("Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/", { replace: true });
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Segoe UI, sans-serif",  background:"#e5f3fd"}}>
      {editingEmployee ? (
        <div style={{
          marginBottom: "20px",
          padding: "20px",
          background: "#f0f4f7",
          border: "1px solid #ccc",
          borderRadius: "8px"
        }}>
          <EmployeeForm
            employee={editingEmployee}
            onSuccess={() => {
              setEditingEmployee(null);
              fetchData();
            }}
            onCancel={() => setEditingEmployee(null)}
          />
        </div>
      ) : (
        <>
          
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            
          }}>
            <h2 style={{ color: "#0a2c58" }}>👩‍💼 HR Dashboard – Full Access</h2>
            <button
              onClick={handleLogout}
              style={{
                background: "#d32f2f",
                color: "white",
                padding: "10px 16px",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              🚪 Logout
            </button>
          </div>

          
          <div style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap"
          }}>
            <label>
              <input
                type="radio"
                name="searchBy"
                value="name"
                checked={searchBy === "name"}
                onChange={() => setSearchBy("name")}
              /> Search by Name
            </label>
            <label>
              <input
                type="radio"
                name="searchBy"
                value="id"
                checked={searchBy === "id"}
                onChange={() => setSearchBy("id")}
              /> Search by ID
            </label>
            <input
              type="text"
              placeholder={`Enter ${searchBy}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              style={{
                padding: "6px 10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                width: "200px"
              }}
            />
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: "#1976d2",
                color: "white",
                padding: "7px 14px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              🔍 Search
            </button>
            <button
              onClick={fetchData}
              style={{
                backgroundColor: "#607d8b",
                color: "white",
                padding: "7px 14px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              🔄 Reset
            </button>
            <Link to="/hr/add">
              <button
                style={{
                  backgroundColor: "#4caf50",
                  color: "white",
                  padding: "7px 14px",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  marginLeft: "auto"
                }}
              >
                ➕ Add Employee
              </button>
            </Link>
          </div>

          
          <div style={{ overflowX: "auto" , background:"#8dcfec" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "15px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
            }}>
              <thead style={{ backgroundColor: "#0d47a1", color: "white" }}>
                <tr>
                  <th style={thStyle}>Employee ID</th>
                  <th style={thStyle}>Photo</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>DOB</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Address</th>
                  <th style={thStyle}>Joining Date</th>
                  <th style={thStyle}>Job Title</th>
                  <th style={thStyle}>Department</th>
                  <th style={thStyle}>Project</th>
                  <th style={thStyle}>Team Lead</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Salary</th>
                  <th style={thStyle}>Payment Method</th>
                  <th style={thStyle}>Bank</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="17" align="center" style={{ padding: "20px" }}>
                      No matching employees
                    </td>
                  </tr>
                ) : (
                  filtered.map((emp) => (
                    <tr key={emp.id} style={{ borderBottom: "1px solid #ddd" }}>
                      <td style={tdStyle}>{emp.id}</td>
                      <td style={tdStyle}>
                        <img
                          src={emp.photo_url || "https://via.placeholder.com/50"}
                          alt="profile"
                          width="50"
                          height="50"
                          style={{ borderRadius: "50%" }}
                        />
                      </td>
                      <td style={tdStyle}>{emp.full_name}</td>
                      <td style={tdStyle}>{emp.email}</td>
                      <td style={tdStyle}>{emp.date_of_birth}</td>
                      <td style={tdStyle}>{emp.phone_number}</td>
                      <td style={tdStyle}>{emp.address}</td>
                      <td style={tdStyle}>{emp.joining_date}</td>
                      <td style={tdStyle}>{emp.job_title}</td>
                      <td style={tdStyle}>{emp.department}</td>
                      <td style={tdStyle}>{emp.project_assigned}</td>
                      <td style={tdStyle}>{emp.team_lead}</td>
                      <td style={tdStyle}>{emp.role}</td>
                      <td style={tdStyle}>{emp.salary}</td>
                      <td style={tdStyle}>{emp.payment_method}</td>
                      <td style={tdStyle}>{emp.bank_account_details}</td>
                      <td style={tdStyle}>
                        <button
                          onClick={() => setEditingEmployee(emp)}
                          style={actionBtnStyle}
                        >✏️</button>
                        <button
                          onClick={() => handleDelete(emp.id)}
                          style={{ ...actionBtnStyle, backgroundColor: "#d32f2f" }}
                        >🗑️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};


const thStyle = {
  padding: "10px",
  textAlign: "left"
};

const tdStyle = {
  padding: "10px 8px"
};

const actionBtnStyle = {
  marginRight: "6px",
  backgroundColor: "#0288d1",
  color: "white",
  border: "none",
  padding: "6px 10px",
  borderRadius: "4px",
  cursor: "pointer"
};

export default HRDashboard;
