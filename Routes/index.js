const express = require("express");
const departments = require("./department");
const roles = require("./role");
const employees = require("./employee");

const app = express();

console.log("Entering the index");
app.use("/departments", departments);
app.use("/roles", roles);
app.use("/employees", employees);

module.exports = app;
