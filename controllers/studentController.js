"use strict";

const firebase = require("../db");
const Student = require("../models/student");
const firestore = firebase.firestore();

exports.addStudent = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("students").doc().set(data);
    res.send("Record saved successfully...!!");
  } catch (err) {
    res.ststaus(400).send(err.message);
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    const data = await firestore.collection("students").get();
    const students = [];
    if (data.empty) {
      res.status(400).send("No student record found");
    } else {
      data.forEach((doc) => {
        const student = new Student(
          doc.id,
          doc.data().firstname,
          doc.data().lastname,
          doc.data().age
        );
        students.push(student);
      });
      res.send(students);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.getSingleStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await firestore.collection("students").doc(id).get();
    if (!data.exists) {
      res.status(400).send("Student with the given ID not found");
    } else {
      res.send(data.data());
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.editStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    const student = req.body;
    await firestore.collection("students").doc(id).update(student);
    res.send("Student record update successfully...!!");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.removeStudent = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("students").doc(id).delete();
    res.send("Student record is deleted successfully...!!");
  } catch (err) {
    res.status(400).send(err.message);
  }
};
