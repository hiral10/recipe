const express = require("express");
const cors = require("cors");
const routes = require("./routes/v1");

const app = express();

// set security HTTP headers - https://helmetjs.github.io/

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options("*", cors());
app.use('/images', express.static('images'));

app.use("/v1", routes);


module.exports = app;