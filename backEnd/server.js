const express = require('express');
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require('body-parser');

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
    await pool.getConnection((err, connection) => {
        if (err) console.error(err);

        return connection.query(query, (err, data) => {
            connection.release();

            if (err) {
                console.error('Error executing query:', err);
                return response.status(500).json({ error: "Query execution error", details: err.message });
            } else {
                return response.status(200).json(data);
            }

        });
    });
}

app.post("/user/exist",
    async function (req, res) {

        console.log(req.body)
        console.log("aaa " + req.body)
        const mail = req.body.mail;

        console.log(mail)

        let request = null;

        await executeQuery(req, res, "SELECT * FROM users WHERE mail='" + mail + "'")
            .then(result => {
                console.log(result);
                request = result
            });

        return request;

    });

app.post("/user/login",
    async function (req, res) {
        res.send({title: "Salut les gens"});
    });

app.post("/user/register",
    async function (req, res) {



    });