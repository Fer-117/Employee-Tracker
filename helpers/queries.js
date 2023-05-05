const mysql = require("mysql2/promise");
require("dotenv").config();

// const pool = mysql.createPool({
//   host: "localhost",
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

const pool = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the classlist_db database.`)
);

console.log(`Connected to the business_db database.`);

async function getDepartments() {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [rows] = await connection.execute("SELECT * FROM department");
    connection.release();
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getRoles() {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [rows] = await connection.execute("SELECT * FROM role");
    connection.release();
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getEmployees() {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    const [rows] = await connection.execute(
      "SELECT * FROM employee JOIN role ON employee.role_id = role.id"
    );
    connection.release();
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addDepartment(departmentId) {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.execute("INSERT INTO department(name) VALUES(?)", [
      departmentId,
    ]);
    await connection.commit();
    connection.release();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addRole(salary, title, department_id) {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.execute(
      "INSERT INTO role(salary, title, department_id) VALUES(?, ?, ?)",
      [salary, title, department_id]
    );
    await connection.commit();
    connection.release();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function addEmployee(firstName, lastName, roleId, managerId) {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.execute(
      "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)",
      [firstName, lastName, roleId, managerId]
    );
    await connection.commit();
    connection.release();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateEmployeeRole(employeeId, roleId) {
  try {
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    await connection.execute("UPDATE employee SET role_id = ? WHERE id = ?", [
      roleId,
      employeeId,
    ]);
    await connection.commit();
    connection.release();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  getDepartments,
  getRoles,
  getEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
