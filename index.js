"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const config = require("./config");
const studentRoute = require("./routes/student-route");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", studentRoute);

app.listen(config.port, () =>
  console.log("App is listing on url http://localhost:" + config.port)
);
