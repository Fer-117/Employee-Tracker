const express = require("express");
const router = express.Router();
const queries = require("../helpers/queries");
const cTable = require("console.table");

console.log("Department.js");
router.get("/", async (req, res) => {
  try {
    const departments = await queries.getDepartments();
    console.table(departments);
    res.json(departments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal servor error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const departments = await queries.addDepartment(name);
    console.table(departments);
    res.json(departments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal servor error" });
  }
});
module.exports = router;
