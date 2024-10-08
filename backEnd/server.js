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

app.post("/match/data/create/",
    async function (req, res){

        console.log(req.body.data)

        await executeQuery(req, res, "INSERT INTO matches (`id`, `data`) VALUES ('" + req.body.id + "', '" + JSON.stringify(req.body.data) + "')");

    })

app.post("/match/data/*",
    async function (req, res) {

        await executeQuery(req, res, "SELECT * FROM matches WHERE id='" + req.originalUrl.split("/")[3] + "'");

    })

app.post("/user/data",
    async function (req, res) {

        await executeQuery(req, res, "SELECT riotData FROM users WHERE mail='" + req.body.mail + "'");

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

        await executeQuery(req, res, "INSERT INTO `users` (`riotName`, `riotTag`, `riotPuuid`, `riotData`, `mail`, `hash`) VALUES ('" + req.body.riotUsername + "', '" + req.body.riotTag + "', '" + req.body.riotPuuid + "', '{}', '" + req.body.mail + "', '" + req.body.hash + "')")

    });

app.post("/champions/description",
    async function (req, res) {

        console.log(req.body.name);
        console.log(req.body.columns);

        await executeQuery(req, res, "SELECT " + req.body.columns + " FROM champions WHERE champName='" + req.body.name + "'")

    });