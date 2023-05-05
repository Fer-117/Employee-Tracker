const express = require("express");
const router = express.Router();
const queries = require("../helpers/queries");
const cTable = require("console.table");

console.log("role.js");
router.get("/", async (req, res) => {
  try {
    const roles = await queries.getRoles();
    console.table(roles);
    res.json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal servor error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { salary, title, department_id } = req.body;
    console.log(salary, title, department_id);
    const roles = await queries.addRole(salary, title, department_id);
    console.table(roles);
    res.json(roles);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal servor error" });
  }
});
module.exports = router;
