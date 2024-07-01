const express = require('express');
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require('body-parser');
const {response} = require("express");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(8081, () => {
    console.log("Listening on port 8081");
});

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "superuser",
    password: "ZmEUIgrj_7bA6WxI",
    database: "beacon"
});

async function executeQuery(request, response, query) {
    await pool.getConnection(async (err, connection) => {
        if (err) console.error(err);

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                response.status(500).json({ error: "Query execution error", details: err.message });
            } else {
                console.log('Query execution success ', data, data.length);
                if (data.length === 0) {
                    response.status(200).json({error: "Invalid credentials"})
                } else {
                    response.status(200).json(data);
                }
            }

        });
    });
}

async function getQueryResult( query) {
    let result = null;
    await pool.getConnection(async (err, connection) => {
        if (err) console.error(err);

        connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                return null;
            } else {
                console.log('Query execution success ', data, data.length);
                if (data.length === 0) {
                    return null;
                } else {
                    result = data;
                }
            }

        });
    });

    return result
}

app.post("/user/exist",
    async function (req, res) {

        await executeQuery(req, res, "SELECT * FROM users WHERE mail='" + req.body.mail + "'");

    });

app.post("/user/login",
    async function (req, res) {

        let response = await getQueryResult("SELECT * FROM users WHERE mail='" + req.body.mail + "'");
        console.log(response);

    });

app.post("/user/register",
    async function (req, res) {

        console.log(req.body.hash);

        await executeQuery(req, res, "INSERT INTO `users` (`id`, `riotName`, `riotPuuid`, `riotData`, `mail`, `hash`) VALUES (NULL, 'dd', 'dd', '{}', '" + req.body.mail + "', '" + req.body.hash + "')")

    });