const express = require("express");
const router = express.Router();

const {
  addStudent,
  getAllStudents,
  getSingleStudent,
  editStudent,
  removeStudent,
} = require("../controllers/studentController");

router.post("/addStudent", addStudent);

router.get("/students", getAllStudents);

router.get("/student/:id", getSingleStudent);

router.put("/editStudent/:id", editStudent);

router.delete("/removeStudent/:id", removeStudent);

module.exports = router;
