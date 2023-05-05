const express = require("express");
const router = express.Router();
const queries = require("../helpers/queries");
const cTable = require("console.table");

console.log("employee.js");
router.get("/", async (req, res) => {
  try {
    const employees = await queries.getEmployees();
    console.table(employees);
    res.json(employees);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal servor error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, roleId, managerId } = req.body;
    console.log(firstName, lastName, roleId, managerId);
    const employee = await queries.addEmployee(
      firstName,
      lastName,
      roleId,
      managerId
    );
    console.table(employee);
    res.json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal servor error" });
  }
});

router.post("/:id", async (req, res) => {
  try {
    const { employeeId, roleId } = req.body;
    console.log(employeeId, roleId);
    const employee = await queries.updateEmployeeRole(employeeId, roleId);
    console.table(employee);
    res.json(employee);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal servor error" });
  }
});
module.exports = router;
