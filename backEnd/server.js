const express = require('express');
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection( {
    "host": "localhost",
    "user": "superuser",
    "password": "ZmEUIgrj_7bA6WxI",
    "database": "beacon"
})

app.get("/", (req, res) => {
    return res.json("From Backend Side")
})

// Exmple of db query from backend to front
app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("Listening")
})