import React from "react";

const HRViewEmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div>
      <h2>👩‍💼 HR Dashboard – Employee Records</h2>
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Job</th>
            <th>Department</th>
            <th>Joining Date</th>
            <th>Salary</th>
            <th>Bank</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td><img src={emp.photo_url} alt="Profile" width="40" /></td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone_number}</td>
              <td>{emp.address}</td>
              <td>{emp.job_title}</td>
              <td>{emp.department}</td>
              <td>{emp.joining_date}</td>
              <td>{emp.salary}</td>
              <td>{emp.bank_account_details}</td>
              <td>
                <button onClick={() => onEdit(emp)}>✏️</button>
                <button onClick={() => onDelete(emp.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HRViewEmployeeList;
