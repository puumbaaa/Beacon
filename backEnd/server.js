const express = require('express');
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "superuser",
    password: "ZmEUIgrj_7bA6WxI",
    database: "beacon"
});

app.get("/users", (req, res) => {
    const sql = "SELECT * FROM users";

    // Get a connection from the pool
    pool.getConnection((err, connection) => {
        if (err) console.error(err);

        // Execute the query
        connection.query(sql, (err, data) => {
            // Release the connection back to the pool
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                return res.status(500).json({ error: "Query execution error", details: err.message });
            }

            return res.json(data);
        });
    });
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});