import bcrypt from 'bcryptjs'
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
}

export class User {

    constructor(mail) {
        this.mail = mail;
    }

    async register(saltRounds, password) {
        await bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                let options = requestOptions
                options.body = '{"mail":"' + this.mail + '", "hash":"' + hash + '"}'
                fetch('http://localhost:8081/user/register', options)
                    .then(response => response.json())
                    .catch(err => console.log(err))
            });
        });
    }

    async login(password) {
        let options = requestOptions
        options.body = '{"mail":"' + this.mail + '"}'
        await fetch('http://localhost:8081/user/login', options)
            .then(response => response.json())
            .then(data => {
                bcrypt.compare(password, data[0].hash, function(err, result) {
                    if (result) {
                        localStorage.setItem("email", data[0].mail)
                        localStorage.setItem("riotTag", data[0].riotName)
                        localStorage.setItem("riotPuuid", data[0].riotPuuid)
                    }
                });
            }).catch(err => console.log(err))
    }

    getMail() {
        return this.mail
    }

}

export async function IsUserExist(user) {

    requestOptions.body = JSON.stringify({mail: user.getMail()});

    let playerExists = false

    await fetch('http://localhost:8081/user/exist', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                playerExists = true;
            }
        })
        .catch(err => console.log(err))

    console.log(playerExists)

    return playerExists

}

export function Disconnect() {

    localStorage.removeItem('email')
    localStorage.removeItem('riotPuuid')
    localStorage.removeItem('riotTag')

    let navigate = useNavigate()

    useEffect(() => {
        navigate("/");
    });

}

export async function TryToLogin(user, password) {

    let isUser = await IsUserExist(user);

    if (isUser) {
        console.log("Log user")
        await user.login(password)
    } else {
        console.log("Create user")
        await user.register(10, password)
    }

}