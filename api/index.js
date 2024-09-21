const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const moment = require("moment");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose.connect(
    "mongodb+srv://ujjawal:ujjawal@cluster0.wciqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log("Connected to MongoDB");
}).catch(error => {
    console.log("Error Connecting to MongoDB", error);
})

app.listen(port, () => {
    console.log("Server running on Port 8000");
});