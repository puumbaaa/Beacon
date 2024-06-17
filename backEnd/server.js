const express = require('express');
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "beacon"
});

function executeQuery(request, response, query) {
    pool.getConnection((err, connection) => {
        if (err) console.error(err);

        connection.query(query[0], (err, data) => {
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                return response.status(500).json({ error: "Query execution error", details: err.message });
            }

            return response.json(data);
        });
    });
}

function createApp(url, executor, ...args) {
    app.get(url, (req, res) => {
        executor(req, res, args)
    });
}


createApp("/users", executeQuery, "SELECT * FROM users");

createApp("/insert", executeQuery, "INSERT INTO users VALUES (null, 'MomoCrash', 10, '4f5sd4f9649sg499')")


app.listen(8081, () => {
    console.log("Listening on port 8081");
});