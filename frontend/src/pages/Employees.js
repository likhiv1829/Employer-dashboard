import React, { useState, useEffect } from "react";
import HRViewEmployeeList from "../components/HRViewEmployeeList";
import ManagerViewEmployeeList from "../components/ManagerViewEmployeeList";
import EmployeeForm from "../components/EmployeeForm";
import axios from "axios";

const Employees = () => {
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);

  
  const role = localStorage.getItem("role"); 

  
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8888/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);


  const ViewComponent =
    role === "hr" ? HRViewEmployeeList : ManagerViewEmployeeList;

  return (
    <div className="employees-container">
      
      {editingEmployee && (
        <EmployeeForm
          employee={editingEmployee}
          onSuccess={() => {
            setEditingEmployee(null); 
            fetchEmployees();         
          }}
        />
      )}

  
      <ViewComponent
        employees={employees}
        onEdit={(emp) => setEditingEmployee(emp)}
        onDelete={() => fetchEmployees()}
      />
    </div>
  );
};

export default Employees;
