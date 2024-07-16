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

app.post("/champions/data/*",
    async function (req, res) {

        console.log(req.originalUrl.split("/")[3])
        await executeQuery(req, res, "SELECT * FROM champions_global WHERE champName='" + req.originalUrl.split("/")[3] + "'");

    });

app.post("/champions/update/*",
    async function (req, res) {

        await executeQuery(req, res, "SELECT * FROM champions_global WHERE champName='" + req.originalUrl.split("/")[3] + "'");

    });

app.post("/user/data",
    async function (req, res) {

        await executeQuery(req, res, "SELECT riotData FROM users WHERE mail='" + req.body.mail + "'");

    });

app.post("/user/data/update",
    async function (req, res) {

        await executeQuery(req, res, "UPDATE users SET riotData='" + req.body.riotData + " WHERE mail='" + req.body.email + "'");

    });

app.post("/user/exist",
    async function (req, res) {

        await executeQuery(req, res, "SELECT mail FROM users WHERE mail='" + req.body.mail + "'");

    });

app.post("/user/login",
    async function (req, res) {

        await executeQuery(req, res, "SELECT mail, hash, riotPuuid, riotName, riotTag FROM users WHERE mail='" + req.body.mail + "'");

    });

app.post("/user/register",
    async function (req, res) {

        console.log(req.body.hash);

        await executeQuery(req, res, "INSERT INTO `users` (`id`, `riotName`, `riotTag`, `riotPuuid`, `riotData`, `mail`, `hash`) VALUES (NULL, '" + req.body.riotUsername + "', '" + req.body.riotTag + "', '" + req.body.riotPuuid + "', '{}', '" + req.body.mail + "', '" + req.body.hash + "')")

    });