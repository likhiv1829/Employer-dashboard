CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    joining_date DATE,
    job_title VARCHAR(100),
    department VARCHAR(100),
    project_assigned VARCHAR(255),
    team_lead VARCHAR(255),
    photo_url TEXT,
    salary DECIMAL(10,2),
    role VARCHAR(100),
    payment_method VARCHAR(50),
    bank_account_details VARCHAR(100)
);
